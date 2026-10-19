[
  (line_comment)
  (block_comment)
] @comment @spell

(string_literal) @string

(escape_sequence) @string.escape

(integer_literal) @number

(boolean_literal) @boolean

(identifier) @variable

(args_keyword) @variable.builtin

(argn_identifier) @variable.builtin

(retval_identifier) @variable.builtin

(scratch_variable) @variable

(map_variable) @variable

(script_parameter) @variable.parameter

(macro_definition
  (identifier) @function.macro)

(probe
  provider: (_) @type.builtin
  module: (wildcard_identifier) @module
  function: (wildcard_identifier) @property)

(probe
  provider: (_) @type.builtin
  function: (wildcard_identifier) @property)

(probe
  provider: (uprobe_uretprobe_provider) @type.builtin
  binary: (file_identifier) @string.special.path
  function: (wildcard_identifier) @property)

(probe
  provider: (_) @type.builtin
  subsys: (wildcard_identifier) @module
  event: (wildcard_identifier) @property)

(probe
  provider: (_) @type.builtin
  event: (identifier_with_dash) @property
  count: (integer_literal) @number)

(probe
  provider: (_) @type.builtin
  event: (identifier_with_dash) @property)

(probe
  provider: (bench_test_provider) @type.builtin
  function: (identifier) @property)

(probe
  provider: (profile_interval_provider) @type.builtin
  unit: (time_unit) @string.special
  count: (integer_literal) @property)

(probe
  provider: (profile_interval_provider) @type.builtin
  count: (integer_literal) @number)

(probe
  provider: (iter_provider) @type.builtin
  object: (identifier) @module
  pin: (file_identifier) @property)

(probe
  provider: (iter_provider) @type.builtin
  object: (identifier) @module)

(probe
  provider: (ustd_provider) @type.builtin
  binary: (file_identifier) @string.special.path
  namespace: (wildcard_identifier) @variable
  function: (wildcard_identifier) @property)

(probe
  provider: (ustd_provider) @type.builtin
  binary: (file_identifier) @string.special.path
  function: (wildcard_identifier) @property)

(probe
  provider: (watchpoint_provider) @type.builtin
  address: (integer_literal) @number
  length: (integer_literal) @number
  mode: (watchpoint_mode) @property)

(type_specifier) @type

(integer_type) @type.builtin

[
  "BEGIN"
  "begin"
  "END"
  "end"
] @type.builtin

(hashbang) @keyword.directive

(return_statement) @keyword.return

[
  "config"
  "let"
  "macro"
  "offsetof"
  "sizeof"
] @keyword

[
  "if"
  "else"
] @keyword.conditional

[
  "for"
  "unroll"
  "while"
  (break_statement)
  (continue_statement)
] @keyword.repeat

"import" @keyword.import

(field_expression
  field: (identifier) @property)

(call_expression
  function: (identifier) @function.call)

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
  ";"
  ":"
  "."
] @punctuation.delimiter

[

  "->"

  ".."

  "="
  "<<="
  ">>="
  "+="
  "-="
  "*="
  "/="
  "%="
  "&="
  "|="
  "^="

  "--"
  "++"

  "%"
  "+"
  "-"
  "*"
  "/"

  "<="
  "<"
  ">="
  ">"
  "=="
  "!="

  "&"
  "^"
  "|"
  "~"
  "<<"
  ">>"

  "&&"
  "||"
  "!"
] @operator

(conditional_expression
  [
    "?"
    ":"
  ] @keyword.conditional.ternary)

(predicate
  "/" @punctuation.delimiter)
