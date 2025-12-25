/**
 * Utility functions for handling file paths
 */

import * as vscode from 'vscode';
import * as path from 'path';
import { PathFormat } from '../types';

/**
 * Format a file path based on the specified format
 * 
 * @param uri - VSCode URI of the file
 * @param format - Desired path format
 * @returns Formatted file path
 */
export function formatFilePath(uri: vscode.Uri, format: PathFormat): string {
    switch (format) {
        case PathFormat.ABSOLUTE:
            return uri.fsPath;
        
        case PathFormat.FILENAME_ONLY:
            return path.basename(uri.fsPath);
        
        case PathFormat.RELATIVE:
        default:
            return vscode.workspace.asRelativePath(uri);
    }
}

/**
 * Add line number information to a file path
 * 
 * @param filePath - The base file path
 * @param startLine - Starting line number (1-indexed)
 * @param endLine - Ending line number (1-indexed)
 * @returns File path with line numbers
 */
export function addLineNumbers(
    filePath: string,
    startLine?: number,
    endLine?: number
): string {
    if (!startLine) {
        return filePath;
    }

    if (!endLine || startLine === endLine) {
        return `${filePath}:${startLine}`;
    }

    return `${filePath}:${startLine}-${endLine}`;
}
