(comment) @comment
(line_continuation_comment) @comment

(identifier) @variable
(scoped_identifier) @variable
(option_name) @property
(command_name) @function
(string_literal) @string
(integer_literal) @number
(float_literal) @number

(function_declaration
  name: (identifier) @function)
(call_expression
  (identifier) @function.call)

[
  "autocmd"
  "break"
  "call"
  "catch"
  "command"
  "const"
  "continue"
  "echo"
  "else"
  "elseif"
  "endfor"
  "endfunction"
  "endif"
  "endtry"
  "endwhile"
  "execute"
  "finally"
  "for"
  "function"
  "if"
  "in"
  "let"
  "return"
  "set"
  "throw"
  "try"
  "while"
] @keyword

[
  "="
  "=="
  "!="
  "+"
  "-"
  "*"
  "/"
  "%"
  "."
  "&&"
  "||"
  "!"
  "->"
] @operator

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket
