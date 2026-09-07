(comment) @comment

(identifier) @variable
(property_identifier) @property
(type_identifier) @type
(predefined_type) @type.builtin
(shorthand_property_identifier_pattern) @variable

(function_declaration
  name: (identifier) @function)
(call_expression
  function: (identifier) @function.call)
(member_expression
  property: (property_identifier) @property)

(jsx_opening_element
  name: (identifier) @tag)
(jsx_closing_element
  name: (identifier) @tag)
(jsx_attribute
  (property_identifier) @attribute)

(string) @string
(template_string) @string
(string_fragment) @string
(number) @number
(true) @boolean
(false) @boolean
(null) @constant.builtin
(undefined) @constant.builtin

[
  "as"
  "async"
  "await"
  "break"
  "case"
  "catch"
  "class"
  "const"
  "continue"
  "default"
  "delete"
  "do"
  "else"
  "export"
  "extends"
  "finally"
  "for"
  "from"
  "function"
  "if"
  "import"
  "in"
  "interface"
  "let"
  "new"
  "of"
  "return"
  "switch"
  "throw"
  "try"
  "type"
  "typeof"
  "var"
  "void"
  "while"
  "with"
  "yield"
] @keyword

[
  "="
  "=="
  "==="
  "!="
  "!=="
  "=>"
  "+"
  "-"
  "*"
  "/"
  "%"
  "&&"
  "||"
  "!"
  "?"
  ":"
  "."
] @operator

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
  "<"
  ">"
] @punctuation.bracket
