((identifier) @constant
 (#match? @constant "^[A-Z][A-Z\\d_]+$'"))

(function_definition
  name: (identifier) @function)
(function_declaration
  name: (identifier) @function)
(parameter_declaration
  name: (identifier) @variable.parameter)

(field_access
  field: (identifier) @property)

(call_expression
  function: (identifier) @function)
(call_expression
  function: (field_access
    field: (identifier) @function.method.call))

(builtin_type) @type.builtin
(type (identifier) @type)
(any_type) @type

(variable_storage_class) @keyword.storage
(variable_declaration
  name: (identifier) @variable)
(old_variable_declaration
  name: (identifier) @variable)

(preproc_include) @include
(preproc_tryinclude) @include
(system_lib_string) @string
(string_literal) @string

(preproc_assert) @preproc
(preproc_pragma) @preproc
(preproc_arg) @constant
(preproc_macro) @function.macro
(macro_param) @variable.parameter
(preproc_if) @preproc
(preproc_else) @preproc
(preproc_elseif) @preproc
(preproc_endif) @preproc
(preproc_endinput) @preproc
(preproc_define) @define
(preproc_define
  name: (identifier) @constant)
(preproc_undefine) @define
(preproc_undefine
  name: (identifier) @constant)
(preproc_error) @function.macro
(preproc_warning) @function.macro

(for_statement) @repeat
(condition_statement) @conditional
(while_statement) @repeat
(do_while_statement) @repeat
(switch_statement) @conditional
(switch_case) @conditional
(ternary_expression) @conditional.ternary

(view_as) @function.builtin
(sizeof_expression) @function.macro
(this) @variable.builtin

(hardcoded_symbol) @variable.builtin

(comment) @comment

(parameter_declaration
  defaultValue: (identifier) @constant)
(fixed_dimension) @punctuation.bracket
(dimension) @punctuation.bracket
(array_indexed_access) @punctuation.bracket
(escape_sequence) @string.escape

(new_expression
  class: (identifier) @type
  arguments: (call_arguments) @constructor)

(methodmap) @type.definition
(methodmap
  name: (identifier) @type)
(methodmap
  inherits: (identifier) @type)
(methodmap_method_constructor
  name: (identifier) @constructor)
(methodmap_method
  name: (identifier) @function.method)
(methodmap_native
  name: (identifier) @function.method)
(methodmap_property
  name: (identifier) @property)
(methodmap_property_getter) @function.method
(methodmap_property_setter) @function.method

(enum_struct) @type.definition
(enum_struct
  name: (identifier) @type)
(enum_struct_field
  name: (identifier) @property)
(enum_struct_method
  name: (identifier) @function.method)

(variable_storage_class) @keyword.storage
(visibility) @keyword.storage
(visibility) @keyword.storage
(assertion) @function.builtin
(function_declaration_kind) @keyword.function
[
  "new"
  "delete"
] @keyword.operator
[
  "."
  ","
] @punctuation.delimiter

[
  "+"
  "-"
  "..."
  "*"
  "/"
  "%"
  "++"
  "--"
  "="
  "+="
  "-="
  "*="
  "/="
  "=="
  "!="
  "<"
  ">"
  ">="
  "<="
  "!"
  "&&"
  "||"
  "&"
  "|"
  "~"
  "^"
  "<<"
  ">>"
  ">>>"
  "|="
  "&="
  "^="
  "~="
  "<<="
  ">>="
] @operator
(ignore_argument) @operator
(scope_access) @operator
(rest_operator) @operator

(struct_declaration
  name: (identifier) @variable.builtin)

(typeset) @type.definition
(typedef) @type.definition
(functag) @type.definition
(funcenum) @type.definition
(typedef_expression) @keyword.function

(enum) @type.definition
(enum
  name: (identifier) @type)
(enum_entry
  name: (identifier) @constant)
(enum_entry
  value: (_) @constant)

(int_literal) @number
(char_literal) @character
(float_literal) @number
(string_literal) @string
(array_literal) @punctuation.bracket
[
  (bool_literal)
  (null)
] @constant.builtin
((identifier) @constant
  (#match? @constant "INVALID_HANDLE"))

((comment) @string.todo
  (#match? @string.todo "^\/[\/\*][\t ]TODO"))
((comment) @string.note
  (#match? @string.note "^\/[\/\*][\t ]NOTE"))
((comment) @string.warning
  (#match? @string.warning "^\/[\/\*][\t ]WARNING"))

[
  "__nullable__"
  "break"
  "case"
  "const"
  "continue"
  "default"
  "delete"
  "do"
  "else"
  "enum"
  "for"
  "forward"
  "funcenum"
  "functag"
  "get"
  "if"
  "methodmap"
  "native"
  "new"
  "property"
  "public"
  "return"
  "set"
  "static"
  "stock"
  "struct"
  "switch"
  "typedef"
  "typeset"
  "void"
  "while"
] @keyword

(identifier) @variable
