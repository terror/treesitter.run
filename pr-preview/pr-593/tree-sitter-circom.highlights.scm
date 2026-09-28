(identifier) @variable

(pragma_directive) @tag

(include_directive) @include

(string) @string
(int_literal) @number
(comment) @comment

(function_definition
  name:  (identifier) @function)

(template_definition
  name:  (identifier) @function)

(main_component_definition) @constructor

(call_expression . (identifier) @function)

(parameter name: (identifier) @variable.parameter)

(member_expression property: (property_identifier) @property)

[
 "public"
 "signal"
 "var"
 "include"
 "input"
 "output"
 "public"
 "component"
] @keyword

[
 "for"
 "while"
] @repeat

[
 "if"
 "else"
] @conditional

[
 "return"
] @keyword.return

[
  "function"
  "template"
] @keyword.function

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket

[
  "."
  ","
] @punctuation.delimiter

[
  "&&"
  "||"
  ">>"
  "<<"
  "&"
  "^"
  "|"
  "+"
  "-"
  "*"
  "/"
  "%"
  "**"
  "<"
  "<="
  "=="
  "!="
  ">="
  ">"
  "!"
  "~"
  "-"
  "+"
  "++"
  "--"
] @operator

[
  "<=="
  "==>"
  "<--"
  "-->"
  "==="
] @assignment
