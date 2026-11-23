(comment) @comment

(identifier) @variable
(numeric_lit) @number
(bool_lit) @boolean
(null_lit) @constant.builtin
(string_lit) @string
(template_literal) @string
(heredoc_template) @string

(block
  (identifier) @keyword)
(attribute
  (identifier) @property)
(function_call
  (identifier) @function.call)

[
  "true"
  "false"
  "for"
  "in"
  "if"
  "else"
  "endif"
  "endfor"
] @keyword

[
  "="
  "=>"
  "?"
  ":"
  "+"
  "-"
  "*"
  "/"
  "%"
  "!"
  "=="
  "!="
  "<"
  "<="
  ">"
  ">="
  "&&"
  "||"
] @operator

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket
