# Changelog

All notable changes to the PromptCopy extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-01-10

### Added

- **Copy Project Structure** - New command `PromptCopy: Copy Project Structure` that generates an ASCII tree representation of your project's file and folder hierarchy
- Project structure configuration options:
  - `promptcopy.structureMaxDepth` - Control how deep the tree traversal goes (default: 5, max: 20)
  - `promptcopy.structureIncludeFiles` - Toggle between full tree or directories only
  - `promptcopy.structureExcludePatterns` - Customize which files/folders to exclude (supports wildcards)
- Default exclusions for common directories: `node_modules`, `.git`, `dist`, `out`, `build`, `.next`, `coverage`, `__pycache__`, `.venv`, `.DS_Store`, `*.log`, `*.vsix`

### Example Output

```
// Project Structure
my-project/
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   └── Header.tsx
│   ├── utils/
│   │   └── helpers.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

## [0.1.4] - 2025-01-09

### Changed

- Display message on status bar instead of notification popup

### Fixed

- Refactored deployment scripts

## [0.1.3] - 2025-01-08

### Added

- Initial release
- Copy with file path as comment (`Cmd+C` / `Ctrl+C`)
- Smart language detection for 50+ languages
- Configurable path formats (relative, absolute, filename only)
- Configurable comment styles (auto-detect, single-line, hash, double-dash, HTML, multi-line)
- Optional line number inclusion for selections
- Custom comment prefix support
