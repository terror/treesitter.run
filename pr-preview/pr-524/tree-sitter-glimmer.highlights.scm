((tag_name) @constructor
  (#match? @constructor "^[A-Z]"))

((tag_name) @tag
  (#match? @tag "^:?[a-z]"))

(attribute_name) @attribute

(string_literal) @string

(number_literal) @number

(boolean_literal) @boolean

(concat_statement) @string

(block_statement_start) @tag.delimiter

(block_statement_end) @tag.delimiter

(block_statement_start
  path: (identifier) @keyword)

(block_statement_end
  path: (identifier) @keyword)

((block_statement_start
  (identifier) @keyword.conditional)
  (#eq? @keyword.conditional "if"))

((block_statement_end
  (identifier) @keyword.conditional)
  (#eq? @keyword.conditional "if"))

((mustache_statement
  (identifier) @keyword.conditional)
  (#eq? @keyword.conditional "else"))

(mustache_statement) @tag.delimiter

((mustache_statement
  [
    (path_expression
      (identifier) @variable)
    (identifier) @variable
  ])
  (#not-any-of? @variable "yield" "outlet" "this" "else"))

(block_statement_start
  argument: [
    (path_expression
      (identifier) @variable)
    (identifier) @variable
  ])

(block_params
  (identifier) @variable)

((helper_invocation
  argument: [
    (path_expression
      (identifier) @variable)
    (identifier) @variable
  ])
  (#not-eq? @variable "this"))

((identifier) @variable.builtin
  (#eq? @variable.builtin "this"))

((mustache_statement
  (identifier) @keyword)
  (#any-of? @keyword "yield" "outlet"))

((helper_invocation
  helper: [
    (path_expression
      (identifier) @function)
    (identifier) @function
  ])
  (#not-any-of? @function "if" "yield"))

((helper_invocation
  helper: (identifier) @keyword.conditional)
  (#eq? @keyword.conditional "if"))

((helper_invocation
  helper: (identifier) @keyword)
  (#eq? @keyword "yield"))

(hash_pair
  key: (identifier) @property)

(comment_statement) @comment

(attribute_node
  "=" @operator)

(block_params
  "as" @keyword)

(block_params
  "|" @operator)

[
  "<"
  ">"
  "</"
  "/>"
] @tag.delimiter
