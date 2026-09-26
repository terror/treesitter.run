(comment) @comment

[
  (binary_condition_identifier)
  (unary_condition_identifier)
  (ask)
] @keyword

(condition_negation) @operator

(binary_condition_expression
  (identifier) @string.regexp)

(command
  . (word) @function)

(string) @string

["," "=" ";"] @punctuation.delimiter
