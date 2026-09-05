(op) @keyword.operator
"..." @keyword.operator

[
  "open"
  "def"
  "let"
  "if"
  "then"
  "elsif"
  "else"
  "begin"
  "end"
  "while"
  "do"
  "to"
  "for"
  "fun"
  "try"
  "catch"
] @keyword

["and" "or"] @conditional
(inline_if [ "?" ":" ] @conditional.ternary)

[
  "%ifdef"
  "%ifndef"
  "%ifencoder"
  "%ifnencoder"
  "%ifversion"
  "%else"
  "%endif"
  "%argsof"
  "%include"
] @preproc

(encoder_name) @constant.builtin

(anonymous_argument (var) @variable.parameter)
(labeled_argument label: (var) @variable.parameter)

"." @punctuation.delimiter

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
]  @punctuation.bracket

(app name: (var) @function.call)
(method) @function.method
(method_app) @function.method.call

(method) @function.method
(var) @variable
(string) @string
(integer) @number
(float) @number
(bool) @boolean
((var) @constant.builtin (#eq? @constant.builtin "null"))
(comment) @comment
(regexp) @string.regex
(type) @type
