/**
 * Service for generating project structure tree
 * Follows Single Responsibility Principle - only handles project structure generation
 */

import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { ProjectStructureConfig, TreeNode } from '../types';
import { EXTENSION_CONFIG_KEY, DEFAULT_EXCLUDE_PATTERNS } from '../constants';

/**
 * Tree drawing characters for ASCII representation
 */
const TREE_CHARS = {
    BRANCH: '├── ',
    LAST_BRANCH: '└── ',
    VERTICAL: '│   ',
    EMPTY: '    ',
} as const;

/**
 * Service class for generating project structure trees
 */
export class ProjectStructureService {
    /**
     * Get the project structure configuration from settings
     *
     * @returns ProjectStructureConfig with current settings
     */
    public getConfig(): ProjectStructureConfig {
        const config = vscode.workspace.getConfiguration(EXTENSION_CONFIG_KEY);

        return {
            maxDepth: config.get<number>('structureMaxDepth', 5),
            includeFiles: config.get<boolean>('structureIncludeFiles', true),
            excludePatterns: config.get<string[]>('structureExcludePatterns', DEFAULT_EXCLUDE_PATTERNS),
        };
    }

    /**
     * Generate the project structure as a formatted string
     *
     * @param workspaceFolder - The workspace folder to generate structure for
     * @returns Formatted project structure string
     */
    public async generateStructure(workspaceFolder: vscode.WorkspaceFolder): Promise<string> {
        const config = this.getConfig();
        const rootPath = workspaceFolder.uri.fsPath;
        const rootName = workspaceFolder.name;

        const tree = await this.buildTree(rootPath, config, 0);
        const treeString = this.renderTree(tree, '', true);

        return `// Project Structure\n${rootName}/\n${treeString}`;
    }

    /**
     * Build a tree structure from the file system
     *
     * @param dirPath - Directory path to scan
     * @param config - Project structure configuration
     * @param currentDepth - Current recursion depth
     * @returns Array of TreeNode representing the directory contents
     */
    private async buildTree(
        dirPath: string,
        config: ProjectStructureConfig,
        currentDepth: number
    ): Promise<TreeNode[]> {
        if (currentDepth >= config.maxDepth) {
            return [];
        }

        let entries: fs.Dirent[];
        try {
            entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
        } catch {
            return [];
        }

        const nodes: TreeNode[] = [];

        // Sort: directories first, then files, both alphabetically
        const sortedEntries = entries.sort((a, b) => {
            if (a.isDirectory() && !b.isDirectory()) return -1;
            if (!a.isDirectory() && b.isDirectory()) return 1;
            return a.name.localeCompare(b.name);
        });

        for (const entry of sortedEntries) {
            // Skip if matches exclude pattern
            if (this.shouldExclude(entry.name, config.excludePatterns)) {
                continue;
            }

            const isDirectory = entry.isDirectory();

            // Skip files if includeFiles is false
            if (!isDirectory && !config.includeFiles) {
                continue;
            }

            const node: TreeNode = {
                name: entry.name,
                isDirectory,
            };

            if (isDirectory) {
                const childPath = path.join(dirPath, entry.name);
                node.children = await this.buildTree(childPath, config, currentDepth + 1);
            }

            nodes.push(node);
        }

        return nodes;
    }

    /**
     * Render the tree structure as an ASCII string
     *
     * @param nodes - Array of TreeNode to render
     * @param prefix - Current line prefix for indentation
     * @param isRoot - Whether this is the root level
     * @returns Formatted ASCII tree string
     */
    private renderTree(nodes: TreeNode[], prefix: string, isRoot: boolean): string {
        let result = '';

        nodes.forEach((node, index) => {
            const isLast = index === nodes.length - 1;
            const branch = isLast ? TREE_CHARS.LAST_BRANCH : TREE_CHARS.BRANCH;
            const name = node.isDirectory ? `${node.name}/` : node.name;

            result += `${prefix}${branch}${name}\n`;

            if (node.children && node.children.length > 0) {
                const childPrefix = prefix + (isLast ? TREE_CHARS.EMPTY : TREE_CHARS.VERTICAL);
                result += this.renderTree(node.children, childPrefix, false);
            }
        });

        return result;
    }

    /**
     * Check if a file/folder name should be excluded
     *
     * @param name - File or folder name to check
     * @param patterns - Array of exclude patterns
     * @returns True if should be excluded
     */
    private shouldExclude(name: string, patterns: string[]): boolean {
        return patterns.some(pattern => {
            // Handle glob patterns with wildcards
            if (pattern.includes('*')) {
                const regex = this.globToRegex(pattern);
                return regex.test(name);
            }
            // Exact match
            return name === pattern;
        });
    }

    /**
     * Convert a simple glob pattern to a regex
     *
     * @param glob - Glob pattern (supports * wildcard)
     * @returns RegExp for matching
     */
    private globToRegex(glob: string): RegExp {
        const escaped = glob
            .replace(/[.+^${}()|[\]\\]/g, '\\$&')
            .replace(/\*/g, '.*');
        return new RegExp(`^${escaped}$`);
    }
}
