(comment) @comment

(identifier) @variable
(field_identifier) @property
(type_identifier) @type
(primitive_type) @type.builtin
(number_literal) @number
(string_literal) @string
(system_lib_string) @string
(char_literal) @character
(null) @constant.builtin

(function_declarator
  declarator: (identifier) @function)
(call_expression
  function: (identifier) @function.call)

[
  "#define"
  "#elif"
  "#else"
  "#endif"
  "#if"
  "#ifdef"
  "#ifndef"
  "#include"
] @keyword.directive

[
  "break"
  "case"
  "cbuffer"
  "class"
  "const"
  "continue"
  "discard"
  "do"
  "else"
  "enum"
  "for"
  "if"
  "inline"
  "in"
  "inout"
  "out"
  "return"
  "static"
  "struct"
  "switch"
  "typedef"
  "uniform"
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
  "<"
  "<="
  ">"
  ">="
  "&"
  "|"
  "^"
  "~"
] @operator

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket
