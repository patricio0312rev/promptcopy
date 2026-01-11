/**
 * VSCode command identifiers and messages
 */

/**
 * Command IDs registered by the extension
 */
export const COMMANDS = {
    COPY_WITH_PATH: 'promptcopy.copyWithPath',
    COPY_PROJECT_STRUCTURE: 'promptcopy.copyProjectStructure',
} as const;

/**
 * User-facing messages
 */
export const MESSAGES = {
    SUCCESS: 'Copied to clipboard',
    STRUCTURE_SUCCESS: 'Project structure copied to clipboard',
    NO_ACTIVE_EDITOR: 'No active editor found',
    NO_WORKSPACE: 'No workspace folder found',
    COPY_FAILED: 'Failed to copy code',
    STRUCTURE_FAILED: 'Failed to copy project structure',
} as const;

/**
 * Default exclude patterns for project structure
 */
export const DEFAULT_EXCLUDE_PATTERNS: string[] = [
    'node_modules',
    '.git',
    '.svn',
    '.hg',
    'dist',
    'out',
    'build',
    '.next',
    '.nuxt',
    'coverage',
    '.nyc_output',
    '__pycache__',
    '.pytest_cache',
    'venv',
    '.venv',
    'env',
    '.env',
    '*.log',
    '.DS_Store',
    'Thumbs.db',
    '.idea',
    '.vscode',
    '*.vsix',
];
