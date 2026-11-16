[
  "select"
  "asc"
  "desc"
] @keyword

[
  "in"
  "match"
] @keyword.operator

[
  "=="
  "!="
  ">"
  ">="
  "<"
  "<="
  "&&"
  "||"
  "!"
  "+"
  "-"
  "*"
  "/"
  "%"
  "**"
  ".."
  "..."
  "=>"
  "->"
  "|"
] @operator

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket

[
  ","
  ":"
  "."
] @punctuation.delimiter

(string) @string

(number) @number

[
  (true)
  (false)
] @boolean

[
  (null)
  (star)
  (parent)
  (this)
] @constant.builtin

(identifier) @variable

(parameter
  "$" @variable.parameter
  (identifier) @variable.parameter)

(function_call
  (identifier) @function)

(order_function
  "order" @function.builtin)

(comment) @comment @spell

(pair
  (literal
    (string) @property))

(projection
  (identifier) @property)

(function_call
  (identifier) @function.builtin
  (#any-of? @function.builtin
    "count" "length" "defined" "references" "now" "dateTime" "coalesce" "unique" "max" "min" "sum"
    "avg" "round" "floor" "ceil" "abs" "sqrt" "upper" "lower" "string" "number" "boolean" "array"
    "object" "type" "global" "sanity" "path" "delta" "after" "before"))
