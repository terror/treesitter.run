(comment) @comment
(shebang) @comment

(string) @string
(docstring) @string.documentation
(escape_sequence) @string.escape
(number) @number
(nil) @constant.builtin
(boolean) @boolean

(symbol) @variable
(symbol_binding) @variable
(multi_symbol) @variable
(multi_symbol_method) @function.method

[
  (fn_form)
  (lambda_form)
  (macro_form)
] @function

[
  "true"
  "false"
] @boolean

[
  "#"
  "'"
  "`"
  ","
] @operator

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket
