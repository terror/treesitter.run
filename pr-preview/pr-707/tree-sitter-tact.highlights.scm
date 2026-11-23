(identifier) @variable

(destruct_bind
  name: (identifier) @comment
  bind: (identifier) @variable)

(self) @variable.builtin

(parameter
  name: (identifier) @variable.parameter)

[
  ";"
  ","
  "."
  ":"
  "?"
] @punctuation.delimiter

[
  "("
  ")"
  "{"
  "}"
] @punctuation.bracket

[
  "~"
  "-"
  "-="
  "+"
  "+="
  "*"
  "*="
  "/"
  "/="
  "%"
  "%="
  "="
  "=="
  "!"
  "!="
  "!!"
  "<"
  "<="
  "<<"
  "<<="
  ">"
  ">="
  ">>"
  ">>="
  "&"
  "&="
  "|"
  "|="
  "^"
  "^="
  "&&"
  "&&="
  "||"
  "||="
  "->"
  ".."
] @operator

(instance_expression
  name: (identifier) @constructor)

(initOf
  name: (identifier) @constructor)

(codeOf
  name: (identifier) @constructor)

(type_identifier) @type

(tlb_serialization
  "as" @keyword
  type: (identifier) @type)

(tlb_serialization
  type: (identifier) @type.builtin
  (#match? @type.builtin
    "^(coins|remaining|bytes32|bytes64|int257|u?int(?:2[0-5][0-6]|1[0-9][0-9]|[1-9][0-9]?))$"))

((type_identifier) @type.builtin
  (#match? @type.builtin "^(Address|Bool|Builder|Cell|Int|Slice|String|StringBuilder)$"))

(map_type
  "map" @type.builtin
  "<" @punctuation.bracket
  ">" @punctuation.bracket)

(set_type
  "set" @type.builtin
  "<" @punctuation.bracket
  ">" @punctuation.bracket)

(bounced_type
  "bounced" @type.builtin
  "<" @punctuation.bracket
  ">" @punctuation.bracket)

(generic_parameter_list
  "<" @punctuation.bracket
  ">" @punctuation.bracket)

(string) @string

(import
  name: (string) @string.special)

(escape_sequence) @string.special

(global_constant
  name: (identifier) @constant)

(storage_constant
  name: (identifier) @constant)

[
  (boolean)
  (null)
] @constant.builtin

((identifier) @constant.builtin
  (#match? @constant.builtin
    "^(SendDefaultMode|SendBounceIfActionFail|SendPayGasSeparately|SendPayFwdFeesSeparately|SendIgnoreErrors|SendDestroyIfZero|SendRemainingValue|SendRemainingBalance|SendOnlyEstimateFee|ReserveExact|ReserveAllExcept|ReserveAtMost|ReserveAddOriginalBalance|ReserveInvertSign|ReserveBounceIfActionFail|TactExitCodeNullReferenceException|TactExitCodeInvalidSerializationPrefix|TactExitCodeInvalidIncomingMessage|TactExitCodeConstraintsError|TactExitCodeAccessDenied|TactExitCodeContractStopped|TactExitCodeInvalidArgument|TactExitCodeContractCodeNotFound|TactExitCodeInvalidStandardAddress|TactExitCodeNotBasechainAddress)$")
  (#is-not? local))

(instance_argument
  name: (identifier) @property)

(field_access_expression
  name: (identifier) @property)

(field
  name: (identifier) @property)

(storage_variable
  name: (identifier) @property)

(integer) @number

(foreach_statement
  .
  (_)
  .
  (_)
  .
  "in" @keyword)

[
  "get"
  "mutates"
  "extends"
  "virtual"
  "override"
  "inline"
  "abstract"
  "contract"
  "trait"
  "struct"
  "message"
  "with"
  "const"
  "let"
  "fun"
  "native"
  "asm"
  "primitive"
  "import"
  "if"
  "else"
  "while"
  "repeat"
  "do"
  "until"
  "foreach"
  "try"
  "catch"
  "return"
  "initOf"
  "codeOf"

] @keyword

(storage_function
  name: (identifier) @function)

(native_function
  name: (identifier) @function)

(asm_function
  name: (identifier) @function)

(global_function
  name: (identifier) @function)

(static_call_expression
  name: (identifier) @function.call)

(init_function
  "init" @function)

(receive_function
  "receive" @function)

(bounced_function
  "bounced" @function)

(external_function
  "external" @function)

(func_identifier) @function

(method_call_expression
  name: (identifier) @function.call)

(tvm_instruction) @function.call

(asm_integer) @number

(asm_string) @string

(asm_control_register) @string.special.symbol

(asm_stack_register) @string.special.symbol

(asm_hex_bitstring) @function.macro

(asm_bin_bitstring) @function.macro

(asm_boc_hex) @function.macro

(asm_cont_name) @variable

[
  "<{"
  "}>"
  "}>c"
  "}>s"
  "}>CONT"
] @punctuation.bracket

[
  "@name"
  "@interface"
] @attribute

(comment) @comment
