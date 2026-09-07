(line_comment) @comment
(block_comment) @comment

(identifier) @variable
(type_declaration) @type
(texel_format) @type
(address_space) @type.qualifier
(access_mode) @type.qualifier
(int_literal) @number
(float_literal) @number
(bool_literal) @boolean

(function_declaration
  name: (identifier) @function)
(attribute
  (identifier) @attribute)

[
  "array"
  "bitcast"
  "break"
  "case"
  "continue"
  "continuing"
  "default"
  "discard"
  "else"
  "enable"
  "fallthrough"
  "fn"
  "for"
  "if"
  "let"
  "loop"
  "override"
  "return"
  "struct"
  "switch"
  "type"
  "var"
  "while"
] @keyword

[
  "bool"
  "f16"
  "f32"
  "i32"
  "u32"
  "vec2"
  "vec3"
  "vec4"
  "mat2x2"
  "mat3x3"
  "mat4x4"
] @type.builtin

[
  "@"
  "="
  "=="
  "!="
  "+"
  "-"
  "*"
  "/"
  "%"
  "&&"
  "||"
  "!"
  "->"
  "<"
  ">"
] @operator

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket
