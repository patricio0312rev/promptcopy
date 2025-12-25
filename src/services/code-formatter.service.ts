/**
 * Service for formatting code with path comments
 * Follows Single Responsibility Principle - only handles code formatting
 */

import { CopyContext, PromptCopyConfig } from '../types';
import { getCommentPrefix, formatPathComment } from '../utils/comment.util';
import { formatFilePath, addLineNumbers } from '../utils/path.util';

/**
 * Service class for formatting code with context
 */
export class CodeFormatterService {
    /**
     * Format code with path comment based on configuration
     * 
     * @param context - Copy context containing code and metadata
     * @param config - Extension configuration
     * @returns Formatted code with path comment
     */
    public formatCodeWithPath(context: CopyContext, config: PromptCopyConfig): string {
        const commentPrefix = getCommentPrefix(
            context.languageId,
            config.commentStyle,
            config.customCommentPrefix
        );

        const formattedPath = this.formatPath(context, config);
        const pathComment = formatPathComment(formattedPath, commentPrefix);

        return `${pathComment}\n${context.code}`;
    }

    /**
     * Format the file path with optional line numbers
     * 
     * @param context - Copy context containing path and selection info
     * @param config - Extension configuration
     * @returns Formatted file path
     */
    private formatPath(context: CopyContext, config: PromptCopyConfig): string {
        // Get the base formatted path - we need to create a URI from the string path
        // Since context.filePath is already formatted, we use it directly
        let formattedPath = context.filePath;

        // Add line numbers if configured and selection exists
        if (config.includeLineNumbers && context.selection) {
            formattedPath = addLineNumbers(
                formattedPath,
                context.selection.start,
                context.selection.end
            );
        }

        return formattedPath;
    }
}
