import { Extension } from '@codemirror/state';

export type Language =
  | 'agda'
  | 'arduino'
  | 'bash'
  | 'beancount'
  | 'bicep'
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
  | 'java'
  | 'javascript'
  | 'jsdoc'
  | 'json'
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
  | 'verilog'
  | 'yaml'
  | 'toml'
  | 'xml'
  | 'sql'
  | 'ssh-config'
  | 'tsx'
  | 'zig';

export interface LanguageConfig {
  name: Language;
  displayName: string;
  wasmPath: string;
  sampleCode: string;
  extension: Extension;
}

export interface ParserMetadata {
  repository: string;
  revision: string;
  sourcePath?: string;
}

export interface SyntaxNode {
  id?: number;
  type: string;
  text: string;
  isNamed: boolean;
  isExtra: boolean;
  isError: boolean;
  isMissing: boolean;
  hasError: boolean;
  startPosition: { row: number; column: number };
  endPosition: { row: number; column: number };
  childCount: number;
  children: SyntaxNode[];
}
