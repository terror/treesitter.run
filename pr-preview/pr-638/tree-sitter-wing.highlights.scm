(identifier) @variable

(reference_identifier) @variable

(member_identifier) @variable.member

(custom_type) @type

(class_field
  name: (identifier) @variable.member)

(class_definition
  name: (identifier) @type)

(method_definition
  name: (identifier) @function.method)

(keyword_argument_key) @variable.parameter

(call
  caller: (reference
    (nested_identifier
      property: (member_identifier) @function.method.call)))

(call
  caller: (reference
    (reference_identifier) @function.method.call))

(number) @number

(duration) @constant

(string) @string

(bool) @boolean

(builtin_type) @type.builtin

(json_container_type) @type.builtin

(comment) @comment @spell

[
  "("
  ")"
  "{"
  "}"
] @punctuation.bracket

[
  "-"
  "+"
  "*"
  "/"
  "%"
  "<"
  "<="
  "="
  "=="
  "!"
  "!="
  ">"
  ">="
  "&&"
  "??"
  "||"
] @operator

[
  ";"
  "."
  ","
] @punctuation.delimiter

[
  "as"
  "bring"
  "class"
  "let"
  "new"
  (phase_specifier)
] @keyword

[
  "for"
  "in"
] @keyword.repeat

[
  "if"
  "else"
] @keyword.conditional

[
  "pub"
  "protected"
  "internal"
] @keyword.modifier

"return" @keyword.return
