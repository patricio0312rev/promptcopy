/**
 * Language-specific comment syntax mappings
 */

/**
 * Map of language IDs to their single-line comment prefixes
 */
export const LANGUAGE_COMMENT_MAP: Record<string, string> = {
    // C-style languages
    javascript: '//',
    typescript: '//',
    typescriptreact: '//',
    javascriptreact: '//',
    java: '//',
    c: '//',
    cpp: '//',
    csharp: '//',
    go: '//',
    rust: '//',
    swift: '//',
    kotlin: '//',
    scala: '//',
    php: '//',
    dart: '//',
    objectivec: '//',
    
    // Hash-based languages
    python: '#',
    ruby: '#',
    perl: '#',
    r: '#',
    shell: '#',
    bash: '#',
    zsh: '#',
    fish: '#',
    yaml: '#',
    toml: '#',
    coffeescript: '#',
    powershell: '#',
    makefile: '#',
    dockerfile: '#',
    
    // HTML/XML-style languages
    html: '<!--',
    xml: '<!--',
    markdown: '<!--',
    vue: '<!--',
    svelte: '<!--',
    
    // CSS-style languages
    css: '/*',
    scss: '//',
    less: '//',
    sass: '//',
    stylus: '//',
    
    // SQL and database languages
    sql: '--',
    plsql: '--',
    tsql: '--',
    
    // Functional languages
    haskell: '--',
    elm: '--',
    purescript: '--',
    
    // Lisp-family languages
    clojure: ';;',
    lisp: ';;',
    scheme: ';;',
    racket: ';;',
    
    // Other languages
    lua: '--',
    erlang: '%',
    latex: '%',
    matlab: '%',
    vb: "'",
    vba: "'",
    bat: 'REM',
    ini: ';',
};

/**
 * Default comment prefix for unknown languages
 */
export const DEFAULT_COMMENT_PREFIX = '//';

/**
 * Extension configuration key
 */
export const EXTENSION_CONFIG_KEY = 'promptcopy';
