# PromptCopy Development Guide

## How to Test the Extension

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Compile TypeScript

```bash
pnpm run compile
```

### 3. Run in VSCode

1. Open this folder in VSCode
2. Press `F5` to open a new VSCode window with the extension loaded
3. Open any file (try `examples/TodoList.tsx`)
4. Select some code or leave cursor in file
5. Press `Cmd+C` (Mac) or `Ctrl+C` (Windows/Linux)
6. Paste the clipboard content to see the result!

> **Note:** This extension overrides the default copy behavior in the editor. Regular copy still works outside the editor.

## Expected Output

When you copy the `examples/TodoList.tsx` file, you should get:

```tsx
// examples/TodoList.tsx
import React, { useState } from "react";
// ... rest of the file
```

## Configuration

Open VSCode Settings (`Cmd+,`) and search for "PromptCopy" to customize:

### Path Format

- **Relative** (default): `src/components/Header.tsx`
- **Absolute**: `/Users/patricio/project/src/components/Header.tsx`
- **Filename Only**: `Header.tsx`

### Comment Style

- **Auto Detect** (default): Automatically uses the right comment for each language
- **Single Line**: Forces `//` comments
- **Hash**: Forces `#` comments
- **Double Dash**: Forces `--` comments
- **HTML**: Forces `<!-- -->` comments
- **Multi Line**: Forces `/* */` comments

### Include Line Numbers

When enabled and copying a selection, adds line numbers:

```typescript
// src/utils/helper.ts:15-23
function myFunction() {
  // selected code
}
```

### Custom Comment Prefix

Override everything with your own custom prefix:

```
Custom prefix: "File:"
Result: File: src/components/Header.tsx
```

## Architecture

The extension follows SOLID principles with a modular structure:

```
src/
├── constants/          # Language mappings, command IDs, messages
├── types/             # TypeScript interfaces and enums
├── utils/             # Pure utility functions (comment, path)
├── services/          # Business logic services
│   ├── configuration.service.ts    # Reads VSCode settings
│   ├── clipboard.service.ts        # Clipboard operations
│   ├── code-formatter.service.ts   # Formats code with path
│   └── copy.service.ts             # Orchestrates everything
└── extension.ts       # Entry point with DI setup
```

## Development Workflow

1. Make changes to source files
2. Run `pnpm run compile` (or `pnpm run watch` for auto-compile)
3. Reload the extension window (`Cmd+R` in the extension development host)
4. Test your changes

## Publishing

```bash
# Install vsce if you haven't
pnpm install -g @vscode/vsce

# Package the extension
vsce package

# Publish (requires publisher account)
vsce publish
```
