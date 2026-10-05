(identifier) @variable

(function_statement
  name: (identifier) @function)

(sub_statement
  name: (identifier) @function)

[
  (sub_start)
  (function_start)
  (end_sub)
  (end_function)
] @keyword.function

(parameter
  name: (identifier) @variable.parameter)

(type_specifier) @type

(variable_declarator
  (prefix_exp
    (identifier) @variable
    (#not-has-ancestor? @variable prefix_exp)))

(variable_declarator
  (prefix_exp)
  (identifier) @property)

(multiplicative_expression
  operator: (_) @keyword.operator)

(logical_not_expression
  operator: (_) @keyword.operator)

(logical_expression
  operator: (_) @keyword.operator)

(prefix_exp
  .
  (identifier) @variable
  (#not-has-ancestor? @variable prefix_exp))

(prefix_exp
  (prefix_exp)
  (identifier) @property)

(function_call
  function: (prefix_exp
    (identifier) @function.call))

[
  (if_start)
  (else)
  (else_if)
  (end_if)
  (then)
  (conditional_compl_end_if)
] @keyword.conditional

[
  (for_start)
  (while_start)
  (for_each)
  (for_in)
  (for_to)
  (for_step)
  (end_for)
  (end_while)
  (exit_while_statement)
  (exit_for_statement)
] @keyword.repeat

[
  (try_start)
  (try_catch)
  (throw)
  (end_try)
] @keyword.exception

(return) @keyword.return

(print) @function.builtin

(constant) @constant

[
  "="
  "<>"
  "<"
  "<="
  ">"
  ">="
  "+"
  "-"
  "*"
  "/"
] @operator

(boolean) @boolean

(number) @number

(string) @string

(invalid) @constant.builtin

(comment) @comment @spell

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
  "?["
] @punctuation.bracket

[
  "."
  ","
  "?."
] @punctuation.delimiter

(library_statement) @keyword.import

(library_statement
  path: (string) @module)

(array) @constructor

(assoc_array) @constructor

(assoc_array_element
  key: (identifier) @property)

[
  (prefix_increment_expression)
  (prefix_decrement_expression)
  (postfix_increment_expression)
  (postfix_decrement_expression)
] @operator

(comparison_expression
  [
    "="
    "<>"
    "<"
    "<="
    ">"
    ">="
  ] @operator)

(as) @keyword.operator
