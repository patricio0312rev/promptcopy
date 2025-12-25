/**
 * VSCode command identifiers and messages
 */

/**
 * Command IDs registered by the extension
 */
export const COMMANDS = {
    COPY_WITH_PATH: 'promptcopy.copyWithPath',
} as const;

/**
 * User-facing messages
 */
export const MESSAGES = {
    SUCCESS: 'Code copied with path!',
    NO_ACTIVE_EDITOR: 'No active editor found',
    COPY_FAILED: 'Failed to copy code',
} as const;
