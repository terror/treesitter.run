(line_comment) @comment @spell

(block_comment) @comment @spell

(argument
  name: (identifier) @variable.parameter)

"..." @variable.parameter

(named_argument
  name: (identifier) @variable.parameter)

(local_var
  name: (identifier) @variable)

(environment_var
  name: (identifier) @variable.builtin)

(builtin_var) @constant.builtin

(function_definition
  name: (variable) @function)

(function_call
  name: (_) @function.method.call)

(associative_item
  (identifier) @property)

(class) @type

(parent_class) @type

(instance_method_name) @function.method

(class_method_name) @function.method

(bool) @boolean

(number) @number

(float) @number.float

(string) @string

(escape_sequence) @string.escape

(symbol) @string.special.symbol

[
  "?"
  "!?"
  "??"
] @keyword.conditional

((function_call
  name: (_) @keyword.conditional)
  (#any-of? @keyword.conditional "if" "while" "case" "switch" "try" "protect"))

((function_call
  name: (_) @keyword.repeat)
  (#any-of? @keyword.repeat "for" "forBy"))

"!" @keyword.repeat

".." @operator

[
  "&&"
  "||"
  "&"
  "|"
  "^"
  "=="
  "!="
  "==="
  "!=="
  "<"
  "<="
  ">"
  ">="
  "<<"
  ">>"
  "+"
  "-"
  "*"
  "/"
  "%"
  "="
  "@"
  "|@|"
  "@@"
  "@|@"
  "++"
  "+/+"
] @operator

[
  "arg"
  "classvar"
  "const"
  "var"
] @keyword

((local_var
  name: (identifier) @variable.builtin)
  (#any-of? @variable.builtin "this" "super"))

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
  "|"
] @punctuation.bracket

[
  ";"
  "."
  ","
] @punctuation.delimiter
