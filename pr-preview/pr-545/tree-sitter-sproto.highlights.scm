(comment) @comment

[
  "."
  ":"
  "*"
  "request"
  "response"
] @keyword

(type_definition
  name: (identifier) @type)

(type_specifier) @type

(protocol_definition
  name: (identifier) @function)

(field_definition
  name: (identifier) @property)

(field_definition
  tag: (integer) @number)
(protocol_definition
  tag: (integer) @number)

[
  "("
  ")"
  "{"
  "}"
] @punctuation.bracket
