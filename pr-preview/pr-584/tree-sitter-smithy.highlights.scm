(control_key) @preproc

(namespace) @module

[
  "use"
] @include

(key_identifier) @property
(shape_member
  (field) @property)
(operation_field) @property
(operation_error_field) @property

(enum_member
  (enum_field) @constant)

(identifier) @type
(structure_resource
  (shape_id) @type)

(mixins
  (shape_id) @attribute)
(trait_statement
  (shape_id (#set! "priority" 105)) @attribute)

[
  "@"
  "-"
  "="
  ":="
] @operator

[
  "apply"
  "for"
  "metadata"
  "namespace"
  "with"

  "bigDecimal"
  "bigInteger"
  "blob"
  "boolean"
  "byte"
  "document"
  "double"
  "enum"
  "float"
  "intEnum"
  "integer"
  "list"
  "long"
  "map"
  "operation"
  "resource"
  "service"
  "set"
  "short"
  "string"
  "structure"
  "timestamp"
  "union"
] @keyword

(string) @string
(escape_sequence) @string.escape

(number) @number

(float) @number

(boolean) @boolean

(null) @constant.builtin

[
  "$"
  "#"
] @punctuation.special

["{" "}"] @punctuation.bracket

["(" ")"] @punctuation.bracket

["[" "]"] @punctuation.bracket

[
  ":"
  "."
] @punctuation.delimiter

[
  (comment)
  (documentation_comment)
] @spell @comment
