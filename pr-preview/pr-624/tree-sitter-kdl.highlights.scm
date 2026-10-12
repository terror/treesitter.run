; Types

(node (identifier) @type)

(type) @type

((type name: (identifier) @type.builtin)
  (#any-of? @type.builtin
    "i8" "i16" "i32" "i64" "i128"
    "u8" "u16" "u32" "u64" "u128"
    "isize" "usize" "f32" "f64" "decimal64" "decimal128"
    "date-time" "time" "date" "duration" "decimal" "currency"
    "country-2" "country-3" "country-subdivision"
    "email" "idn-email" "hostname" "idn-hostname"
    "ipv4" "ipv6" "url" "url-reference" "irl" "irl-reference"
    "url-template" "uuid" "regex" "base64" "base85"))

; Properties

(prop (identifier) @property)

; Variables

(identifier) @variable

; Operators
"=" @operator

; Literals

(string) @string

(escape) @string.escape

(number) @number

(number (decimal) @float)
(number (exponent) @float)

(boolean) @boolean

"null" @constant.builtin

; Punctuation

["{" "}"] @punctuation.bracket

["(" ")"] @punctuation.bracket

[
  ";"
] @punctuation.delimiter

; Comments

[
  (single_line_comment)
  (multi_line_comment)
] @comment @spell

(node (node_comment) (#set! "priority" 105)) @comment
(node (node_field (node_field_comment) (#set! "priority" 105)) @comment)
(node_children_comment (#set! "priority" 105)) @comment
