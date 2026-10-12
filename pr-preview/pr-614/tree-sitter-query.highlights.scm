(comment) @comment

(identifier) @variable
(capture
  name: (identifier) @attribute)
(named_node
  name: (identifier) @type)
(field_definition
  name: (identifier) @property)
(string) @string
(escape_sequence) @string.escape
(predicate) @function
(predicate_type) @function.builtin

[
  "@"
  "#"
  "."
  "+"
  "*"
  "?"
  "!"
] @operator

[
  "("
  ")"
  "["
  "]"
] @punctuation.bracket
