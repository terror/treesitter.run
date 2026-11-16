(comment) @comment

(word) @string
(raw_string) @string
(ansi_c_string) @string
(heredoc_body) @string
(regex) @string.special
(number) @number
(variable_name) @variable
(special_variable_name) @variable.builtin
(command_name) @function

(function_definition
  name: (word) @function)

[
  "always"
  "case"
  "do"
  "done"
  "elif"
  "else"
  "esac"
  "export"
  "fi"
  "for"
  "function"
  "if"
  "in"
  "integer"
  "local"
  "readonly"
  "select"
  "then"
  "typeset"
  "unset"
  "unsetenv"
  "until"
  "while"
] @keyword

[
  "$"
  "="
  "=="
  "!="
  "+"
  "-"
  "*"
  "/"
  "%"
  "&&"
  "||"
  "!"
  "<"
  ">"
  "|"
  "|&"
  "&"
] @operator

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket
