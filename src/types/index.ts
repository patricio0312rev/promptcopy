/**
 * Configuration types for PromptCopy extension
 */

/**
 * Path format options for file paths in copied code
 */
export enum PathFormat {
    RELATIVE = 'relative',
    ABSOLUTE = 'absolute',
    FILENAME_ONLY = 'filenameOnly',
}

/**
 * Comment style options
 */
export enum CommentStyle {
    AUTO_DETECT = 'autoDetect',
    SINGLE_LINE = 'singleLine',
    HASH = 'hash',
    DOUBLE_DASH = 'doubleDash',
    HTML = 'html',
    MULTI_LINE = 'multiLine',
}

/**
 * Configuration interface for the extension
 */
export interface PromptCopyConfig {
    pathFormat: PathFormat;
    commentStyle: CommentStyle;
    includeLineNumbers: boolean;
    customCommentPrefix?: string;
}

/**
 * Copy context containing all necessary information
 */
export interface CopyContext {
    code: string;
    filePath: string;
    languageId: string;
    selection?: {
        start: number;
        end: number;
    };
}
