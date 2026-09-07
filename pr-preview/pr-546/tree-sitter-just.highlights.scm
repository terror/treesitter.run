(comment) @comment

(identifier) @variable
(text) @string
(string) @string
(interpolation) @embedded

(recipe_header
  name: (identifier) @function)
(parameter
  (identifier) @parameter)

[
  "alias"
  "else"
  "export"
  "if"
  "import"
  "mod"
  "set"
] @keyword

[
  ":"
  ":="
  "="
  "+"
] @operator
