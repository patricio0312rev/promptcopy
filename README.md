# PromptCopy

<img width="400" height="400" alt="promptcopy" src="https://github.com/user-attachments/assets/37ce7f3c-56b7-4cfd-bf46-336a5772b995" />

Copy code with context for AI agents. Never lose track of file paths when working with Claude, ChatGPT, or other AI coding assistants.

> **⚠️ IMPORTANT: This extension overrides the default `Cmd+C` / `Ctrl+C` behavior in the editor**
>
> When you copy code in the editor, PromptCopy automatically adds the file path as a comment. If you want to disable this and use regular copy, you can:
>
> - Use `Cmd+C` / `Ctrl+C` outside the editor (in sidebar, terminal, etc.)
> - Disable the extension temporarily
> - Customize the keybinding in VSCode settings (see below)

## Features

- **Copy with Path**: Automatically prepend file paths as comments when copying code
- **Copy Project Structure**: Generate an ASCII tree of your project's file/folder hierarchy
- **Smart Comment Detection**: Automatically uses the correct comment syntax for each language
- **Keyboard Shortcut**: `Cmd+C` (Mac) or `Ctrl+C` (Windows/Linux) in the editor
- **Configurable Paths**: Choose between relative paths, absolute paths, or filename only
- **Customizable**: Change keybindings, comment styles, and more

## Usage

1. Select code in your editor (or place cursor in file to copy entire file)
2. Press `Cmd+C` (Mac) or `Ctrl+C` (Windows/Linux)
3. Paste into your AI chat with full context!

![Demo](https://github.com/user-attachments/assets/7e27e873-37ca-49ad-aa54-8fdeab00b1f4)

   
**Example output:**

```typescript
// src/components/TodoList.tsx
import React, { useState } from "react";
// ... your code
```

### Copy Project Structure

Share your project's file structure with AI assistants to give them context about your codebase organization.

1. Open Command Palette (`Cmd+Shift+P` or `Ctrl+Shift+P`)
2. Run **"PromptCopy: Copy Project Structure"**
3. Paste the tree into your AI chat!

**Example output:**

```
// Project Structure
my-project/
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   └── Header.tsx
│   ├── services/
│   │   └── api.service.ts
│   ├── utils/
│   │   └── helpers.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

## Extension Settings

### Configuration Options

Open VSCode Settings (`Cmd+,` or `Ctrl+,`) and search for "PromptCopy":

- **`promptcopy.pathFormat`**: Choose how file paths are displayed

  - `relative` (default): Path relative to workspace (e.g., `src/components/Header.tsx`)
  - `absolute`: Full file path (e.g., `/Users/you/project/src/components/Header.tsx`)
  - `filenameOnly`: Just the filename (e.g., `Header.tsx`)

- **`promptcopy.commentStyle`**: Choose comment style

  - `autoDetect` (default): Automatically uses the right comment for each language
  - `singleLine`: Forces `//` style
  - `hash`: Forces `#` style
  - `doubleDash`: Forces `--` style
  - `html`: Forces `<!-- -->` style
  - `multiLine`: Forces `/* */` style

- **`promptcopy.includeLineNumbers`**: Include line numbers when copying selections

  - `false` (default): `// src/file.ts`
  - `true`: `// src/file.ts:10-25`

- **`promptcopy.customCommentPrefix`**: Use a custom comment prefix
  - Default: (empty, uses auto-detection)
  - Example: `File:` → `File: src/components/Header.tsx`

### Project Structure Settings

- **`promptcopy.structureMaxDepth`**: Maximum depth for tree traversal
  - Default: `5`
  - Range: 1-20
  - Tip: Use a lower value for large projects to keep output concise

- **`promptcopy.structureIncludeFiles`**: Include files in the tree
  - `true` (default): Show both files and directories
  - `false`: Show directories only

- **`promptcopy.structureExcludePatterns`**: Patterns to exclude from the tree
  - Supports exact names and wildcards (`*`)
  - Default excludes: `node_modules`, `.git`, `dist`, `out`, `build`, `.next`, `coverage`, `__pycache__`, `.venv`, `.DS_Store`, `*.log`, `*.vsix`

**Customizing exclude patterns in `settings.json`:**

```json
{
  "promptcopy.structureExcludePatterns": [
    "node_modules",
    ".git",
    "dist",
    "*.log",
    "*.min.js",
    ".env*",
    "coverage",
    "__pycache__"
  ]
}
```

<img width="823" height="487" alt="imagen" src="https://github.com/user-attachments/assets/1c9c6823-2239-41f3-b93d-7a6e78dfcd36" />


### Customizing the Keybinding

If you don't want to override `Cmd+C`, you can change the keybinding:

1. Open **Keyboard Shortcuts** (`Cmd+K Cmd+S`)
2. Search for "PromptCopy: Copy with Path"
3. Click the pencil icon and set your preferred shortcut
4. Common alternatives:
   - `Cmd+Shift+C` / `Ctrl+Shift+C`
   - `Cmd+Alt+C` / `Ctrl+Alt+C`
   - `Cmd+K C` (chord command)

Or edit `keybindings.json` directly:

```json
{
  "key": "cmd+shift+c",
  "command": "promptcopy.copyWithPath",
  "when": "editorTextFocus"
}
```

## Known Issues

None yet! Report issues on [GitHub](https://github.com/patricio0312rev/promptcopy).

## Release Notes

### 0.2.0

- Added **Copy Project Structure** command to generate ASCII tree of your project
- New settings: `structureMaxDepth`, `structureIncludeFiles`, `structureExcludePatterns`
- Smart default exclusions for common directories (node_modules, .git, dist, etc.)

### 0.1.0

Initial release of PromptCopy

## License

MIT

---

Enjoy! 💜

Made with love by [Patricio Marroquin](https://www.patriciomarroquin.dev)
