(comment) @comment @spell
(annot_atom doc: (static_string) @spell)

[
  "forall"
  "in"
  "let"
  "default"
  "doc"
  "rec"
  "optional"
  "priority"
  "force"
  "not_exported"
] @keyword

"fun" @keyword.function

"import" @include

[ "if" "then" "else" ] @keyword.conditional
"match" @keyword.conditional

(types) @type
"Array" @type.builtin

(bool) @boolean
"null" @constant.builtin
(enum_tag) @constant

(num_literal) @number
[
 (infix_op)
 "|>"
 "="
 "&"
 "=="
 "/"
 "!="
 "<"
 ">"
] @operator

(type_atom) @type

(chunk_literal_single) @string
(chunk_literal_multi) @string
(str_literal) @string
(mult_str_literal) @string

(str_esc_char) @string.escape

[
 "{" "}"
 "(" ")"
 "[|" "|]"
 "[" "]"
] @punctuation.bracket

[
 ","
 "."
 ":"
 "|"
 "->"
 "+"
 "-"
 "*"
] @punctuation.delimiter

(multstr_start) @punctuation.bracket
(multstr_end) @punctuation.bracket
(interpolation_start) @punctuation.special
(interpolation_end) @punctuation.special

(builtin) @function.builtin

(fun_expr
  (pattern_fun
    (ident) @variable.parameter
  )
)

(applicative t1:
  (applicative . (record_operand (atom (ident))) @function)
)

(applicative t1:
  (applicative . (record_operand (record_operation_chain)) @function)
)
(str_chunks) @string

(_
  (interpolation_start)
  (term) @string.special
)

(field_path_elem)  @property

(infix_expr
  op: (infix_b_op_6)
  t2: (infix_expr (applicative . (record_operand (record_operation_chain) @function )))
)
