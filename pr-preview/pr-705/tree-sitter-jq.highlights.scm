(identifier) @property
(string) @string
(number) @number
(comment) @comment

(funcname) @function
(index
  (identifier) @property)

[
  "and"
  "as"
  "break"
  "catch"
  "def"
  "else"
  "end"
  "false"
  "foreach"
  "if"
  "import"
  "include"
  "label"
  "module"
  "null"
  "or"
  "reduce"
  "then"
  "true"
  "try"
] @keyword

[
  "."
  "|"
  "="
  "=="
  "!="
  "+"
  "-"
  "*"
  "/"
  "%"
  "?"
] @operator

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket
