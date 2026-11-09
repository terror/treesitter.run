((command_name) @keyword.import
  (#eq? @keyword.import "import"))

[
  "arguments"
  "end"
  "events"
  "global"
  "methods"
  "persistent"
  "properties"
] @keyword

"enumeration" @keyword.type

(class_definition
  [
    "classdef"
    "end"
  ] @keyword.type)

(if_statement
  [
    "if"
    "end"
  ] @keyword.conditional)

(elseif_clause
  "elseif" @keyword.conditional)

(else_clause
  "else" @keyword.conditional)

(switch_statement
  [
    "switch"
    "end"
  ] @keyword.conditional)

(case_clause
  "case" @keyword.conditional)

(otherwise_clause
  "otherwise" @keyword.conditional)

(break_statement) @keyword.conditional

(for_statement
  [
    "for"
    "parfor"
    "end"
  ] @keyword.repeat)

(while_statement
  [
    "while"
    "end"
  ] @keyword.repeat)

(continue_statement) @keyword.repeat

(try_statement
  [
    "try"
    "end"
  ] @keyword.exception)

(catch_clause
  "catch" @keyword.exception)

(identifier) @variable

(events
  (identifier) @constant)

(attribute
  (identifier) @constant)

"~" @constant.builtin

(field_expression
  field: (identifier) @variable.member)

(superclass
  "."
  (identifier) @variable.member)

(property_name
  "."
  (identifier) @variable.member)

(property
  name: (identifier) @variable.member)

(class_definition
  name: (identifier) @type)

(attributes
  (identifier) @constant)

(enum
  .
  (identifier) @type)

((identifier) @type
  (#lua-match? @type "^_*[A-Z][a-zA-Z0-9_]+$"))

(function_definition
  "function" @keyword.function
  name: (identifier) @function
  [
    "end"
    "endfunction"
  ]? @keyword.function)

(function_signature
  name: (identifier) @function)

(function_call
  name: (identifier) @function.call)

(handle_operator
  (identifier) @function)

(validation_functions
  (identifier) @function)

(command
  (command_name) @function.call)

(command_argument) @variable.parameter

(return_statement) @keyword.return

(function_arguments
  (identifier) @variable.parameter)

[
  ";"
  ","
  "."
] @punctuation.delimiter

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket

[
  "+"
  ".+"
  "-"
  ".*"
  "*"
  "/"
  "./"
  "\\"
  ".\\"
  "^"
  ".^"
  "'"
  ".'"
  "|"
  "&"
  "?"
  "@"
  "<"
  "<="
  ">"
  ">="
  "=="
  "~="
  "="
  "&&"
  "||"
  ":"
] @operator

(string) @string

(escape_sequence) @string.escape

(formatting_sequence) @string.special

(number) @number

((identifier) @boolean
  (#eq? @boolean "true"))

((identifier) @boolean
  (#eq? @boolean "false"))

(comment) @comment @spell

(line_continuation) @punctuation.special

((comment) @keyword.directive
  (#lua-match? @keyword.directive "^%%%% "))
