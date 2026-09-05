(comment) @comment

(key_value
    keyword: (identifier) @function
)
(dict
    key: (identifier) @type
)

(macro
    "$" @conditional
    (prev_scope)* @conditional
    (identifier)* @module
)

"#" @conditional
(preproc_call
    directive: (identifier)* @conditional
    argument: (identifier)* @module
)
(
    (preproc_call
        argument: (identifier)* @module
    ) @conditional
    (#match? @conditional "ifeq")
)

(
    (preproc_call) @conditional
    (#match? @conditional "(else|endif)")
)

(number_literal) @number
(string_literal) @string
(escape_sequence) @escape
(boolean) @boolean

(dimensions dimension: (identifier) @number)

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
  "#{"
  "#}"
  ";"
] @punctuation

((identifier) @attribute
  (#match? @attribute "^(uniform|non-uniform|and|or)$"))
