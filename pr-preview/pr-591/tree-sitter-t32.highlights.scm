[
  "="
  "^^"
  "||"
  "&&"
  "+"
  "-"
  "*"
  "/"
  "%"
  "|"
  "^"
  "=="
  "!="
  ">"
  ">="
  "<="
  "<"
  "<<"
  ">>"
  ".."
  "--"
  "++"
  "~"
  "!"
  "&"
  "->"
  "-="
  "+="
  "*="
  "/="
  "%="
  "|="
  "&="
  "^="
  ">>="
  "<<="
] @operator

[
  "("
  ")"
  "{"
  "}"
  "["
  "]"
] @punctuation.bracket

[
  ","
  "."
] @punctuation.delimiter

[
  "enum"
  "struct"
  "union"
] @keyword

"sizeof" @keyword.operator

[
  "const"
  "volatile"
] @type.qualifier

(hll_comma_expression
  "," @operator)

(hll_conditional_expression
  [
    "?"
    ":"
  ] @conditional.ternary)

(access_class) @constant.builtin

[
  (address)
  (bitmask)
  (file_handle)
  (integer)
  (hll_number_literal)
] @number

[
  (float)
  (frequency)
  (percentage)
  (time)
] @number

[
  (string)
  (hll_string_literal)
] @string

(hll_escape_sequence) @string.escape

(path) @string.special

[
  (character)
  (hll_char_literal)
] @character

[
  (hll_type_identifier)
  (hll_type_descriptor)
] @type

(hll_type_qualifier) @type.qualifier

(hll_primitive_type) @type.builtin

(identifier) @variable

(symbol) @variable

((symbol) @constant
  (#match? @constant "^\\\\\\\\\\\\[^\\\\]*(\\\\\\\\[^\\\\]*)?(\\\\[^\\\\]*)?$"))

((symbol) @constant
  (#match? @constant "^\\\\\\\\[^\\\\]*(\\\\[^\\\\]*)?$"))

(hll_field_identifier) @property

(hll_call_expression
  function: (identifier) @function.call)

(hll_call_expression
  function: (hll_field_expression
    field: (hll_field_identifier) @function.call))

(command_expression
  command: (identifier) @keyword)

(macro_definition
  command: (identifier) @keyword)

(call_expression
  function: (identifier) @function.builtin)

((command_expression
  command: (identifier) @keyword.return)
  (#match? @keyword.return "^[eE][nN][dD]([dD][oO])?$"))

((command_expression
  command: (identifier) @keyword.return)
  (#match? @keyword.return "^[rR][eE][tT][uU][rR][nN]$"))

(subroutine_call_expression
  command: (identifier) @keyword
  subroutine: (identifier) @function.call)

(macro) @variable.builtin

(argument_list
  (identifier) @constant.builtin)

((argument_list
  (identifier) @constant.builtin)
  (#match? @constant.builtin "^[%/][a-zA-Z][a-zA-Z0-9.]*$"))

((command_expression
  command: (identifier) @keyword
  arguments: (argument_list
    .
    (identifier) @label))
  (#match? @keyword "^[gG][oO][tT][oO]$"))

(labeled_expression
  label: (identifier) @label)

(option_expression
  (identifier) @constant.builtin)

(format_expression
  (identifier) @constant.builtin)

(subroutine_block
  command: (identifier) @keyword.function
  subroutine: (identifier) @function)

(labeled_expression
  label: (identifier) @function
  (block))

(parameter_declaration
  command: (identifier) @keyword
  (identifier)? @constant.builtin
  macro: (macro)+ @variable.parameter)

(if_block
  command: (identifier) @conditional)

(elif_block
  command: (identifier) @conditional)

(else_block
  command: (identifier) @conditional)

(while_block
  command: (identifier) @repeat)

(repeat_block
  command: (identifier) @repeat)

(comment) @comment
