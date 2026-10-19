[
  "default"
  "pool"
  "rule"
  "build"
] @keyword

[
  "include"
  "subninja"
] @include

[
  ":"
] @punctuation.delimiter

[
  "="
  "|"
  "||"
  "|@"
] @operator

[
  "$"
  "{"
  "}"
] @punctuation.special

(pool      name: (identifier) @type)
(rule      name: (identifier) @function)
(let       name: (identifier) @constant)
(expansion       (identifier) @constant)
(build     rule: (identifier) @function)

(path) @string.special
(text) @string

(pool  name: (identifier) @type.builtin
                (#any-of? @type.builtin "console"))
(build rule: (identifier) @function.builtin
                (#any-of? @function.builtin "phony" "dyndep"))

(manifest
  (let name: ((identifier) @constant.builtin
                 (#any-of? @constant.builtin "builddir"
                                             "ninja_required_version"))))

(rule
  (body
    (let name: (identifier)  @constant.builtin
               (#not-any-of? @constant.builtin "command"
                                               "depfile"
                                               "deps"
                                               "msvc_deps_prefix"
                                               "description"
                                               "dyndep"
                                               "generator"
                                               "in"
                                               "in_newline"
                                               "out"
                                               "restat"
                                               "rspfile"
                                               "rspfile_content"
                                               "pool"))))

(expansion
  (identifier) @constant.macro
     (#any-of? @constant.macro "in" "out"))

(quote) @string.escape

[
 (split)
 (comment)
] @comment
