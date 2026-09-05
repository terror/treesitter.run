(comment) @comment

(identifier) @variable
(field_identifier) @property
(type_identifier) @type
(primitive_type) @type.builtin
(number_literal) @number
(string_literal) @string
(char_literal) @character
(true) @boolean
(false) @boolean
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
  "class"
  "const"
  "continue"
  "do"
  "else"
  "enum"
  "for"
  "if"
  "inline"
  "return"
  "static"
  "struct"
  "switch"
  "typedef"
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
