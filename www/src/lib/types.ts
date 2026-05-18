export type Language =
  | 'agda'
  | 'arduino'
  | 'bash'
  | 'beancount'
  | 'bicep'
  | 'bibtex'
  | 'c'
  | 'c-sharp'
  | 'chatito'
  | 'cmake'
  | 'commonlisp'
  | 'cpp'
  | 'css'
  | 'cuda'
  | 'cyberchef'
  | 'dart'
  | 'diff'
  | 'dockerfile'
  | 'elixir'
  | 'elm'
  | 'embedded-template'
  | 'fennel'
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
