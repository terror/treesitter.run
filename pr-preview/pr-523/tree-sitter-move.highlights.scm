(comment) @comment

(identifier) @variable
(field_identifier) @property
(type_identifier) @type
(primitive_type) @type.builtin
(hex_address) @number
(integer_literal) @number
(float_literal) @number
(boolean_literal) @boolean

(function_item
  name: (identifier) @function)
(call_expression
  (identifier) @function.call)

[
  "as"
  "break"
  "const"
  "continue"
  "else"
  "false"
  "for"
  "fun"
  "if"
  "let"
  "loop"
  "match"
  "module"
  "public"
  "return"
  "static"
  "struct"
  "true"
  "type"
  "use"
  "while"
] @keyword

[
  "="
  "=="
  "!="
  "+"
  "-"
  "*"
  "/"
  "%"
  "&&"
  "||"
  "!"
  "::"
] @operator

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket
