(escape_sequence) @constant.character.escape
(primitive_type) @type.builtin
(boolean_literal) @constant.builtin.boolean
(integer_literal) @constant.numeric.integer
(float_literal) @constant.numeric.float
(char_literal) @constant.character
[
  (string_literal)
  (raw_string_literal)
] @string
[
  (line_comment)
  (block_comment)
] @comment

(self) @variable.builtin
(enum_variant (identifier) @type.enum.variant)

(field_initializer
  (field_identifier) @variable.other.member)
(shorthand_field_initializer
  (identifier) @variable.other.member)
(shorthand_field_identifier) @variable.other.member

(loop_label
  "'" @label
  (identifier) @label)

[
  "::"
  "."
  ";"
  ","
] @punctuation.delimiter

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
  "#"
] @punctuation.bracket
(type_arguments
  [
    "<"
    ">"
  ] @punctuation.bracket)
(type_parameters
  [
    "<"
    ">"
  ] @punctuation.bracket)
(closure_parameters
  "|" @punctuation.bracket)

(let_declaration
  pattern: [
    ((identifier) @variable)
    ((tuple_pattern
      (identifier) @variable))
  ])

(_
 value: (field_expression
  value: (identifier)? @variable
  field: (field_identifier) @variable.other.member))

(parameter
  pattern: (identifier) @variable.parameter)
(closure_parameters
  (identifier) @variable.parameter)

(for_expression
  "for" @keyword.control.repeat)
((identifier) @keyword.control
  (#match? @keyword.control "^yield$"))

"in" @keyword.control

[
  "match"
  "if"
  "else"
] @keyword.control.conditional

[
  "while"
] @keyword.control.repeat

[
  "break"
  "continue"
  "return"
] @keyword.control.return

[
  "contract"
  "script"
  "predicate"
] @keyword.other

"use" @keyword.control.import
(mod_item "mod" @keyword.control.import !body)
(use_as_clause "as" @keyword.control.import)

(type_cast_expression "as" @keyword.operator)

[
  "as"
  "pub"
  "mod"
  "abi"
  "impl"
  "where"
  "trait"
  "for"
] @keyword

[
  "struct"
  "enum"
  "storage"
  "configurable"
] @keyword.storage.type

"let" @keyword.storage
"fn" @keyword.function
"abi" @keyword.function

(mutable_specifier) @keyword.storage.modifier.mut

(reference_type "&" @keyword.storage.modifier.ref)
(self_parameter "&" @keyword.storage.modifier.ref)

[
  "const"
  "ref"
  "deref"
  "move"
] @keyword.storage.modifier

((identifier) @constant
 (#match? @constant "^[A-Z][A-Z\\d_]*$"))

(call_expression
  function: [
    ((identifier) @type.enum.variant
      (#match? @type.enum.variant "^[A-Z]"))
    (scoped_identifier
      name: ((identifier) @type.enum.variant
        (#match? @type.enum.variant "^[A-Z]")))
  ])

(match_pattern
    (scoped_identifier
      name: (identifier) @constructor))
(tuple_struct_pattern
    type: [
      ((identifier) @constructor)
      (scoped_identifier
        name: (identifier) @constructor)
      ])
(struct_pattern
  type: [
    ((type_identifier) @constructor)
    (scoped_type_identifier
      name: (type_identifier) @constructor)
    ])

((identifier) @type
  (#match? @type "^[A-Z]"))

(call_expression
  function: [
    ((identifier) @function)
    (scoped_identifier
      name: (identifier) @function)
    (field_expression
      field: (field_identifier) @function)
  ])
(generic_function
  function: [
    ((identifier) @function)
    (scoped_identifier
      name: (identifier) @function)
    (field_expression
      field: (field_identifier) @function.method)
  ])

(function_item
  name: (identifier) @function)

(function_signature_item
  name: (identifier) @function)

[
  "*"
  "'"
  "->"
  "=>"
  "<="
  "="
  "=="
  "!"
  "!="
  "%"
  "%="
  "&"
  "&="
  "&&"
  "|"
  "|="
  "||"
  "^"
  "^="
  "*"
  "*="
  "-"
  "-="
  "+"
  "+="
  "/"
  "/="
  ">"
  "<"
  ">="
  ">>"
  "<<"
  ">>="
  "<<="
  "@"
  ".."
  "..="
  "'"
] @operator

(use_declaration
  argument: (identifier) @module)
(use_wildcard
  (identifier) @module)
(mod_item
  name: (identifier) @module)
(scoped_use_list
  path: (identifier)? @module)
(use_list
  (identifier) @module)
(use_as_clause
  path: (identifier)? @module
  alias: (identifier) @module)

(scoped_identifier
  path: (identifier)? @module
  name: (identifier) @module)
(scoped_type_identifier
  path: (identifier) @module)

"?" @special

(type_identifier) @type
(identifier) @variable
(field_identifier) @variable.other.member
