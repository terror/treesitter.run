export type Language =
  | 'agda'
  | 'arduino'
  | 'astro'
  | 'awk'
  | 'bash'
  | 'beancount'
  | 'bicep'
  | 'bibtex'
  | 'bitbake'
  | 'c'
  | 'c-sharp'
  | 'cairo'
  | 'capnp'
  | 'chatito'
  | 'clojure'
  | 'cmake'
  | 'commonlisp'
  | 'cpon'
  | 'cpp'
  | 'css'
  | 'cuda'
  | 'cyberchef'
  | 'd'
  | 'dart'
  | 'diff'
  | 'dockerfile'
  | 'dot'
  | 'eex'
  | 'elixir'
  | 'elm'
  | 'embedded-template'
  | 'erlang'
  | 'fennel'
  | 'firrtl'
  | 'fortran'
  | 'gdscript'
  | 'gitattributes'
  | 'gleam'
  | 'glsl'
  | 'go'
  | 'go-sum'
  | 'gpg-config'
  | 'graphql'
  | 'haskell'
  | 'hcl'
  | 'hlsl'
  | 'html'
  | 'hyprlang'
  | 'ini'
  | 'ispc'
  | 'java'
  | 'javascript'
  | 'jsdoc'
  | 'json'
  | 'json5'
  | 'julia'
  | 'just'
  | 'kconfig'
  | 'kotlin'
  | 'llvm'
  | 'lua'
  | 'luau'
  | 'make'
  | 'markdown'
  | 'meson'
  | 'nginx'
  | 'nix'
  | 'objc'
  | 'ocaml'
  | 'odin'
  | 'pem'
  | 'php'
  | 'poe-filter'
  | 'powershell'
  | 'printf'
  | 'prisma'
  | 'properties'
  | 'puppet'
  | 'purescript'
  | 'pymanifest'
  | 'python'
  | 'ql'
  | 'ql-dbscheme'
  | 'qmljs'
  | 'query'
  | 'r'
  | 'racket'
  | 'readline'
  | 'regex'
  | 'requirements'
  | 'rescript'
  | 'ruby'
  | 'rust'
  | 'scala'
  | 'slang'
  | 'solidity'
  | 'svelte'
  | 'typescript'
  | 'udev'
  | 'verilog'
  | 'vim'
  | 'wgsl-bevy'
  | 'xcompose'
  | 'yaml'
  | 'toml'
  | 'xml'
  | 'sql'
  | 'ssh-config'
  | 'starlark'
  | 'tcl'
  | 'tsx'
  | 'zig';

export interface LanguageConfig {
  name: Language;
  displayName: string;
  wasmPath: string;
  sampleCode: string;
}

export interface ParserMetadata {
  repository: string;
  revision: string;
  sourcePath?: string;
}

export interface SyntaxNode {
  id?: number;
  typeId: number;
  grammarId: number;
  grammarType: string;
  type: string;
  text: string;
  isNamed: boolean;
  isExtra: boolean;
  isError: boolean;
  isMissing: boolean;
  hasError: boolean;
  hasChanges: boolean;
  startIndex: number;
  endIndex: number;
  startPosition: { row: number; column: number };
  endPosition: { row: number; column: number };
  parseState: number;
  nextParseState: number;
  childCount: number;
  namedChildCount: number;
  descendantCount: number;
  parent: SyntaxNode | null;
  children: SyntaxNode[];
  child: (index: number) => SyntaxNode | null;
  equals: (other: SyntaxNode) => boolean;
  fieldNameForChild: (index: number) => string | null;
}

export interface SyntaxRange {
  from: number;
  to: number;
}

export interface QueryCapture {
  name: string;
  node: SyntaxNode;
  range: SyntaxRange;
}
