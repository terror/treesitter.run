(list (symbol) @variable)

(cons (symbol) @variable)

(scope (symbol) @variable)

(symbind (symbol) @variable)

(list
  . (symbol) @function)

(keyword) @constructor

(symbind
  (symbol) @module
  . (keyword))

((symbol) @include
  (#any-of? @include "use" "import" "load"))

((symbol) @keyword
  (#any-of? @keyword "do" "doc"))

((list
  . (symbol) @keyword.function
  . (symbol) @function
  (symbol)? @variable.parameter)
  (#any-of? @keyword.function "def" "defop" "defn"))

((cons
  . (symbol) @keyword.function
  . (symbol) @function
  (symbol)? @variable.parameter)
  (#any-of? @keyword.function "def" "defop" "defn"))

((symbol) @keyword.function
  (#any-of? @keyword.function "def" "defop" "defn"))

((symbol) @function.builtin
  (#any-of? @function.builtin "dump" "mkfs" "json" "log" "error" "now" "cons" "wrap" "unwrap" "eval" "make-scope" "bind" "meta" "with-meta" "null?" "ignore?" "boolean?" "number?" "string?" "symbol?" "scope?" "sink?" "source?" "list?" "pair?" "applicative?" "operative?" "combiner?" "path?" "empty?" "thunk?" "+" "*" "quot" "-" "max" "min" "=" ">" ">=" "<" "<=" "list->source" "across" "emit" "next" "reduce-kv" "assoc" "symbol->string" "string->symbol" "str" "substring" "trim" "scope->list" "string->fs-path" "string->cmd-path" "string->dir" "subpath" "path-name" "path-stem" "with-image" "with-dir" "with-cmd" "with-args" "with-entrypoint" "with-default-args" "with-entrypoint-args" "with-stdin" "with-env" "with-insecure" "with-label" "with-port" "with-tls" "with-mount" "thunk-cmd" "thunk-args" "resolve" "start" "addr" "wait" "read" "cache-dir" "binds?" "write" "publish" "export" "only-globs" "except-globs" "recall-memo" "store-memo" "mask" "list" "list*" "first" "rest" "length" "second" "third" "map" "map-pairs" "foldr" "foldl" "concat" "append" "filter" "conj" "list->scope" "merge" "apply" "id" "always" "vals" "keys" "memo" "succeeds?" "run" "last" "take" "collect" "take-all" "insecure!" "from" "cd" "wrap-cmd" "docker-build" "oci-load" "mkfile" "path-base" "not"))

((symbol) @function.macro
  (#any-of? @function.macro "op" "fn" "current-scope" "quote" "let" "provide" "module" "or" "and" "->" "curryfn" "assert" "refute" "for" "$" "$$" "linux" "glob"))

((symbol) @conditional
  (#any-of? @conditional "if" "case" "cond" "when"))

((symbol) @repeat
  (#any-of? @repeat "each"))

((symbol) @operator (#any-of? @operator "&" "*" "+" "-" "<" "<=" "=" ">" ">="))

(list
  .
  (symbol) @function.macro
  (#eq? @function.macro "->")
  .
  (_)
  (symbol) @function)

(list
  .
  (symbol) @function.macro
  (#eq? @function.macro "->")
  .
  (symbol) @variable.parameter
  (symbol) @function)

[ "(" ")" ] @punctuation.bracket

[ "{" "}" ] @punctuation.bracket

[ "[" "]" ] @punctuation.bracket

((symbol) @punctuation.delimiter
  (#eq? @punctuation.delimiter "->"))

(string) @string

(escape_sequence) @string.escape

(path) @string.uri @string.special
(command) @string.special

(number) @number

(boolean) @boolean

[
  (ignore)
  (null)
] @constant.builtin

[
  "^"
] @character.special

(comment) @comment @spell
