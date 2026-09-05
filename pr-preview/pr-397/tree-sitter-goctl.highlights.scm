"=" @operator

[
  "."
  ","
  ":"
  ";"
] @punctuation.delimiter

[
  "("
  ")"
  "{"
  "}"
  "["
  "]"
] @punctuation.bracket

[
  "syntax"
  "info"
  "service"
] @keyword

"import" @keyword.import

"returns" @keyword.return

[
  "type"
  "struct"
] @keyword.type

[
  "@doc"
  "@handler"
  "@server"
] @attribute

(serviceName) @type

(HTTPMETHOD) @keyword.operator

(fieldType) @type.builtin

(fieldName) @variable.member

(anonymousField) @variable.member

(handlerValue) @function.method

(VALUE) @string

(tag) @string.documentation

(PATH) @string.special.path

(comment) @comment @spell

(key) @variable.member

(identValue) @string

(DURATION) @number

(NUMBER) @number

(structNameId) @type

(body) @type
