(ERROR) @error

[
 (line_comment)
 (block_comment)
 (shebang)
] @comment

(identifier) @variable
(import_path) @variable

(parameter_declaration
  name: (identifier) @variable.parameter)
(function_declaration
  name: (identifier) @function)
(function_declaration
  receiver: (receiver)
  name: (identifier) @function.method)

(short_lambda
  (reference_expression) @variable.parameter)
(call_expression
  name: (selector_expression
    field: (reference_expression) @function.method))

(type_reference_expression) @type
(pointer_type) @type
(array_type) @type

(field_name) @property
(selector_expression
  field: (reference_expression) @property)

(int_literal) @number
(interpreted_string_literal) @string
(rune_literal) @string
(escape_sequence) @string.escape

[
 "as"
 "asm"
 "assert"

 "break"
 "const"
 "continue"
 "defer"
 "else"
 "enum"
 "fn"
 "for"
 "$for"
 "go"
 "goto"
 "if"
 "$if"
 "implements"
 "import"
 "in"
 "!in"
 "interface"
 "is"
 "!is"
 "lock"
 "match"
 "module"
 "mut"
 "or"
 "pub"
 "return"
 "rlock"
 "select"
 "shared"
 "spawn"
 "static"
 "struct"
 "type"
 "union"
 "unsafe"
] @keyword

[
 (true)
 (false)
] @boolean

[
 "."
 ","
 ":"
 ";"
] @punctuation.delimiter

[
 "("
 ")"
 "{"
 "}"
 "["
 "]"
] @punctuation.bracket

(array_creation) @punctuation.bracket

[
 "++"
 "--"

 "+"
 "-"
 "*"
 "/"
 "%"

 "~"
 "&"
 "|"
 "^"

 "!"
 "&&"
 "||"
 "!="

 "<<"
 ">>"

 "<"
 ">"
 "<="
 ">="

 "+="
 "-="
 "*="
 "/="
 "&="
 "|="
 "^="
 "<<="
 ">>="

 "="
 ":="
 "=="

 "?"
 "<-"
 "$"
 ".."
 "..."
] @operator
