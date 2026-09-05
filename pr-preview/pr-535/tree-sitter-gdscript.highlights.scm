(comment) @comment

(string) @string
(string_name) @string.special
(node_path) @string.special
(escape_sequence) @string.escape
(integer) @number
(float) @number

[
  (true)
  (false)
] @boolean

(null) @constant.builtin
(identifier) @variable
(name) @variable
(type) @type

(function_definition
  name: (name) @function)

(call
  (identifier) @function.call)

[
  "and"
  "as"
  "await"
  "break"
  "class"
  "class_name"
  "const"
  "continue"
  "elif"
  "else"
  "enum"
  "export"
  "extends"
  "for"
  "func"
  "if"
  "in"
  "is"
  "match"
  "not"
  "onready"
  "or"
  "pass"
  "return"
  "signal"
  "var"
  "while"
] @keyword

(static_keyword) @keyword

[
  "="
  ":="
  "+"
  "-"
  "*"
  "/"
  "%"
  "**"
  "=="
  "!="
  "<"
  "<="
  ">"
  ">="
  "&&"
  "||"
  "!"
  "->"
] @operator

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket
