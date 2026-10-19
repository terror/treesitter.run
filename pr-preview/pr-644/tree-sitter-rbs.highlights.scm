(use_clause
  [
    (type_name)
    (simple_type_name)
  ] @type)

[
  "true"
  "false"
] @boolean

"nil" @constant.builtin

[
  "use"
  "as"
  "class"
  "module"
  "interface"
  "type"
  "def"
  "attr_reader"
  "attr_writer"
  "attr_accessor"
  "end"
  "alias"
] @keyword

"def" @keyword.function

[
 "include"
 "extend"
 "prepend"
] @function.method

(visibility) @type.qualifier

(comment) @comment @spell

(method_member
  (method_name
    [
     (identifier)
     (identifier_suffix)
     (constant)
     (constant_suffix)
     (operator)
     (setter)
     (constant_setter)
    ] @function.method))

(attribute_member
  (method_name
    [
     (identifier)
     (identifier_suffix)
     (constant)
     (constant_suffix)
     (operator)
     (setter)
     (constant_setter)
    ] @function.method))

[(ivar_name) (cvar_name)] @property

(alias_member (method_name) @function)

(class_name (constant) @type)
(module_name (constant) @type)
(interface_name (interface) @type)
(alias_name (identifier) @type)
(type_variable) @constant
(namespace (constant) @module)

(builtin_type) @type.builtin

(const_name (constant) @constant)
(global_name) @property

[
  (generics_unchecked)
  (generics_variance)
] @keyword

(parameter (var_name) @variable.parameter)
(unnamed_parameter) @variable.parameter

(keyword) @variable.parameter

(self) @variable.builtin

(type (symbol_literal) @string.special)

(type (string_literal (escape_sequence) @string.escape))
(type (string_literal) @string)

(type (integer_literal) @number)

(type (record_type key: (record_key) @string.special))

(annotation_text) @attribute

[
 "="
 "->"
 "<"
 "**"
 "*"
 "&"
 "|"
 "^"
 "?"
 (rest_operator)
 (block_operator)
 (optional_block_operator)
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
 "."
 ] @punctuation.delimiter

(inline_prefix) @comment

(inline_class_annotation) @keyword
(inline_doc (var_name) @variable.parameter)
(inline_doc_comment) @comment
(inline_generic) @keyword
(inline_override) @keyword
(inline_skip) @keyword
