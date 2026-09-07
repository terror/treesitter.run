(identifier) @variable

(local_variable
  "$" @attribute.builtin)

(game_variable
  [
    "%"
    ".%"
  ] @attribute.builtin)

(constant_variable
  "^" @attribute.builtin)

(parameter
  (local_variable
    name: (identifier) @variable.parameter))

(script
  trigger: (identifier) @keyword.directive
  subject: (identifier) @function)

(call
  [
    "~"
    "@"
  ]? @attribute.builtin
  callee: (identifier) @function.call)

((literal) @boolean
  (#any-of? @boolean "true" "false"))

(literal
  "null" @constant.builtin)

(integer_literal) @number

(coord_literal) @string.special

(comment) @comment @spell

[
  (string_fragment)
  "\""
] @string

(escape_sequence) @string.escape

(string_interpolation
  [
    "<"
    ">"
  ] @punctuation.special)

(string_tag) @punctuation.special

(type) @type

(parameter_type) @type

[
  ";"
  ":"
  ","
] @punctuation.delimiter

[
  "("
  ")"
  "{"
  "}"
] @punctuation.bracket

[
  "["
  "]"
] @punctuation.special

[
  "*"
  "/"
  "+"
  "-"
  "&"
  "|"
  ">"
  ">="
  "<"
  "<="
  "="
  "!"
] @operator

(arithmetic
  "%" @operator)

[
  (def_type_keyword)
  (switch_type_keyword)
] @keyword.modifier

"return" @keyword.return

"while" @keyword.repeat

[
  "default"
  "if"
  "else"
  "case"
] @keyword.conditional

"calc" @keyword
