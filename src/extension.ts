/**
 * PromptCopy Extension Entry Point
 * Follows Dependency Injection and Separation of Concerns
 */

import * as vscode from 'vscode';
import {
    ConfigurationService,
    ClipboardService,
    CodeFormatterService,
    CopyService,
    ProjectStructureService,
} from './services';
import { COMMANDS, MESSAGES } from './constants';

/**
 * Extension activation function
 * Called when extension is activated
 */
export function activate(context: vscode.ExtensionContext): void {
    console.log('PromptCopy extension is now active');

    // Initialize services following Dependency Injection pattern
    const configService = new ConfigurationService();
    const clipboardService = new ClipboardService();
    const formatterService = new CodeFormatterService();
    const copyService = new CopyService(
        configService,
        clipboardService,
        formatterService
    );
    const projectStructureService = new ProjectStructureService();

    // Register copy with path command
    const copyWithPathCommand = vscode.commands.registerCommand(
        COMMANDS.COPY_WITH_PATH,
        async () => {
            await handleCopyWithPath(copyService);
        }
    );

    // Register copy project structure command
    const copyStructureCommand = vscode.commands.registerCommand(
        COMMANDS.COPY_PROJECT_STRUCTURE,
        async () => {
            await handleCopyProjectStructure(projectStructureService, clipboardService);
        }
    );

    context.subscriptions.push(copyWithPathCommand, copyStructureCommand);
}

/**
 * Extension deactivation function
 * Called when extension is deactivated
 */
export function deactivate(): void {
    // Cleanup if needed
}

/**
 * Handle the copy with path command
 * Separates command handling from service logic
 */
async function handleCopyWithPath(copyService: CopyService): Promise<void> {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        vscode.window.showWarningMessage(MESSAGES.NO_ACTIVE_EDITOR);
        return;
    }

    try {
        await copyService.copyWithPath(editor);
        vscode.window.setStatusBarMessage(MESSAGES.SUCCESS, 3000);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        vscode.window.showErrorMessage(`${MESSAGES.COPY_FAILED}: ${errorMessage}`);
    }
}

/**
 * Handle the copy project structure command
 * Separates command handling from service logic
 */
async function handleCopyProjectStructure(
    projectStructureService: ProjectStructureService,
    clipboardService: ClipboardService
): Promise<void> {
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showWarningMessage(MESSAGES.NO_WORKSPACE);
        return;
    }

    try {
        const workspaceFolder = workspaceFolders[0];
        const structure = await projectStructureService.generateStructure(workspaceFolder);
        await clipboardService.copyToClipboard(structure);
        vscode.window.setStatusBarMessage(MESSAGES.STRUCTURE_SUCCESS, 3000);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        vscode.window.showErrorMessage(`${MESSAGES.STRUCTURE_FAILED}: ${errorMessage}`);
    }
}
