[(line_comment) (block_comment)] @comment

(string_value) @string

(escape_sequence) @string.escape

(color_value) @constant

(bool_value) @boolean

[
  (int_value)
  (float_value)
  (angle_value)
  (duration_value)
  (length_value)
  (physical_length_value)
  (percent_value)
  (relative_font_size_value)
] @number

[(builtin_type_identifier) (user_type_identifier)] @type

[(purity) (function_visibility) (property_visibility)] @keyword.modifier

(simple_identifier) @variable

(reference_identifier) @variable.builtin

(function_call
  name: (_) @function.call)

(function_definition
  name: (_) @function)

(property
  name: (simple_identifier) @property)

[
  (comparison_operator)
  (mult_prec_operator)
  (add_prec_operator)
  (unary_prec_operator)
  (assignment_prec_operator)
] @operator

[
  "animate"
  "callback"
  "component"
  "enum"
  "export"
  "for"
  "function"
  "global"
  "if"
  "else"
  "import"
  "in"
  "inherits"
  "property"
  "return"
  "struct"
] @keyword

["(" ")" "[" "]" "{" "}"] @punctuation.bracket

[";" "." "," ":"] @punctuation.delimiter
