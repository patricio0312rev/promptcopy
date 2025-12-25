/**
 * Utility functions for handling comments
 */

import { LANGUAGE_COMMENT_MAP, DEFAULT_COMMENT_PREFIX } from '../constants';
import { CommentStyle } from '../types';

/**
 * Get the appropriate comment prefix for a given language
 * 
 * @param languageId - VSCode language identifier
 * @param commentStyle - Optional override for comment style
 * @param customPrefix - Optional custom comment prefix
 * @returns Comment prefix string
 */
export function getCommentPrefix(
    languageId: string,
    commentStyle: CommentStyle = CommentStyle.AUTO_DETECT,
    customPrefix?: string
): string {
    // Use custom prefix if provided
    if (customPrefix) {
        return customPrefix;
    }

    // Handle specific comment styles
    switch (commentStyle) {
        case CommentStyle.SINGLE_LINE:
            return '//';
        case CommentStyle.HASH:
            return '#';
        case CommentStyle.DOUBLE_DASH:
            return '--';
        case CommentStyle.HTML:
            return '<!--';
        case CommentStyle.MULTI_LINE:
            return '/*';
        case CommentStyle.AUTO_DETECT:
        default:
            return LANGUAGE_COMMENT_MAP[languageId] || DEFAULT_COMMENT_PREFIX;
    }
}

/**
 * Check if a comment needs a closing tag
 * 
 * @param commentPrefix - The comment prefix
 * @returns True if closing tag is needed
 */
export function needsClosingTag(commentPrefix: string): boolean {
    return commentPrefix === '<!--' || commentPrefix === '/*';
}

/**
 * Get the closing tag for a comment if needed
 * 
 * @param commentPrefix - The comment prefix
 * @returns Closing tag or empty string
 */
export function getClosingTag(commentPrefix: string): string {
    if (commentPrefix === '<!--') {
        return ' -->';
    }
    if (commentPrefix === '/*') {
        return ' */';
    }
    return '';
}

/**
 * Format a file path as a comment
 * 
 * @param filePath - The file path to format
 * @param commentPrefix - The comment prefix to use
 * @returns Formatted comment string
 */
export function formatPathComment(filePath: string, commentPrefix: string): string {
    const closingTag = getClosingTag(commentPrefix);
    return `${commentPrefix} ${filePath}${closingTag}`;
}
