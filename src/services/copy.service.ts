/**
 * Service for orchestrating copy operations
 * Follows Single Responsibility Principle - coordinates between services
 */

import * as vscode from 'vscode';
import { CopyContext } from '../types';
import { ConfigurationService } from './configuration.service';
import { ClipboardService } from './clipboard.service';
import { CodeFormatterService } from './code-formatter.service';
import { formatFilePath } from '../utils/path.util';

/**
 * Main service class for copy operations
 * Orchestrates configuration, formatting, and clipboard services
 */
export class CopyService {
    constructor(
        private readonly configService: ConfigurationService,
        private readonly clipboardService: ClipboardService,
        private readonly formatterService: CodeFormatterService
    ) {}

    /**
     * Execute copy operation with path for the active editor
     * 
     * @param editor - VSCode text editor instance
     * @returns Promise that resolves when copy is complete
     * @throws Error if copy operation fails
     */
    public async copyWithPath(editor: vscode.TextEditor): Promise<void> {
        const config = this.configService.getConfig();
        const context = this.createCopyContext(editor, config);
        const formattedCode = this.formatterService.formatCodeWithPath(context, config);
        
        await this.clipboardService.copyToClipboard(formattedCode);
    }

    /**
     * Create copy context from editor state
     * 
     * @param editor - VSCode text editor
     * @param config - Extension configuration
     * @returns Copy context object
     */
    private createCopyContext(
        editor: vscode.TextEditor,
        config: any
    ): CopyContext {
        const document = editor.document;
        const selection = editor.selection;
        
        // Determine if we're copying a selection or the entire document
        const isEmpty = selection.isEmpty;
        const code = isEmpty
            ? document.getText()
            : document.getText(selection);

        // Format the file path according to configuration
        const filePath = formatFilePath(document.uri, config.pathFormat);

        // Create selection info if there is a selection
        const selectionInfo = !isEmpty
            ? {
                start: selection.start.line + 1, // VSCode lines are 0-indexed
                end: selection.end.line + 1,
            }
            : undefined;

        return {
            code,
            filePath,
            languageId: document.languageId,
            selection: selectionInfo,
        };
    }
}
