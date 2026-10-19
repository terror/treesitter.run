(comment) @comment

(simple_word) @variable
(id) @variable
(number) @number
(braced_word) @string
(quoted_word) @string

(procedure
  name: (simple_word) @function)
(command
  name: (simple_word) @function.call)
(variable_substitution
  (id) @variable)

[
  "proc"
  "if"
  "else"
  "elseif"
  "foreach"
  "while"
  "set"
  "catch"
] @keyword

[
  "$"
  ";"
] @operator

[
  "("
  ")"
  "{"
  "}"
] @punctuation.bracket
