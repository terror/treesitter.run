[
  "eval"
  "let"
] @keyword

(function) @function

(method) @function.method

(parameter) @variable.parameter

(identifier) @variable

[
  "\\"
  "->"
  "="
  (step)
] @operator

["(" ")"] @punctuation.bracket

":" @punctuation.delimiter

(comment) @comment
