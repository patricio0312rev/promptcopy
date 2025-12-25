/**
 * Service for managing extension configuration
 * Follows Single Responsibility Principle - only handles configuration
 */

import * as vscode from 'vscode';
import { PromptCopyConfig, PathFormat, CommentStyle } from '../types';
import { EXTENSION_CONFIG_KEY } from '../constants';

/**
 * Service class for managing extension configuration
 */
export class ConfigurationService {
    /**
     * Get the current extension configuration
     * 
     * @returns Current configuration object
     */
    public getConfig(): PromptCopyConfig {
        const config = vscode.workspace.getConfiguration(EXTENSION_CONFIG_KEY);

        return {
            pathFormat: this.getPathFormat(config),
            commentStyle: this.getCommentStyle(config),
            includeLineNumbers: config.get<boolean>('includeLineNumbers', false),
            customCommentPrefix: config.get<string>('customCommentPrefix'),
        };
    }

    /**
     * Get the path format setting
     * 
     * @param config - VSCode workspace configuration
     * @returns PathFormat enum value
     */
    private getPathFormat(config: vscode.WorkspaceConfiguration): PathFormat {
        const format = config.get<string>('pathFormat', PathFormat.RELATIVE);
        return this.isValidPathFormat(format) ? format : PathFormat.RELATIVE;
    }

    /**
     * Get the comment style setting
     * 
     * @param config - VSCode workspace configuration
     * @returns CommentStyle enum value
     */
    private getCommentStyle(config: vscode.WorkspaceConfiguration): CommentStyle {
        const style = config.get<string>('commentStyle', CommentStyle.AUTO_DETECT);
        return this.isValidCommentStyle(style) ? style : CommentStyle.AUTO_DETECT;
    }

    /**
     * Type guard for PathFormat
     */
    private isValidPathFormat(value: string): value is PathFormat {
        return Object.values(PathFormat).includes(value as PathFormat);
    }

    /**
     * Type guard for CommentStyle
     */
    private isValidCommentStyle(value: string): value is CommentStyle {
        return Object.values(CommentStyle).includes(value as CommentStyle);
    }
}
