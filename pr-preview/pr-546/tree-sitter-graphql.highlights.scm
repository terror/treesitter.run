(comment) @comment

(name) @variable
(string_value) @string
(int_value) @number
(float_value) @number
(boolean_value) @boolean
(null_value) @constant.builtin

(operation_type) @keyword
(named_type) @type
(directive
  (name) @attribute)
(fragment_name) @constant

[
  "directive"
  "enum"
  "extend"
  "fragment"
  "implements"
  "input"
  "interface"
  "mutation"
  "on"
  "query"
  "repeatable"
  "scalar"
  "schema"
  "subscription"
  "type"
  "union"
] @keyword

[
  "!"
  "$"
  "&"
  "..."
  "@"
  "="
  "|"
] @operator

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket
