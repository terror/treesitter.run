(identifier) @variable

[
  (concrete_type)
  (tag_type)] @type

(module) @module

(argument_patterns                (identifier_pattern (identifier) @variable.parameter))
(argument_patterns (_             (identifier_pattern (identifier) @variable.parameter)))
(argument_patterns (_ (_          (identifier_pattern (identifier) @variable.parameter))))
(argument_patterns (_ (_ (_       (identifier_pattern (identifier) @variable.parameter)))))
(argument_patterns (_ (_ (_ (_    (identifier_pattern (identifier) @variable.parameter))))))
(argument_patterns (_ (_ (_ (_ (_ (identifier_pattern (identifier) @variable.parameter)))))))
(spread_pattern                                       (identifier) @variable.parameter)
(match_branch pattern: (_       (identifier_pattern (identifier) @variable.parameter)))
(tag_pattern
  (_)*
  (identifier_pattern (identifier) @variable.parameter))

(identifier_pattern (identifier) @variable.parameter)
(value_declaration
  (decl_left (identifier_pattern (identifier) @variable)))

(field_name)                         @variable.other.member

(field_access_expr      (identifier) @variable.other.member)

(variable_expr (module) (identifier) @variable.other.member)

(record_field_pattern (_ (identifier) @variable))

(inferred) @type.roc-special.inferred

(bound_variable) @type.parameter

(tag_type) @type.enum.variant

(opaque_type_def (_ (concrete_type) @type.definition))

((concrete_type) @type.builtin
  (#match? @type.builtin "^(Dec|F(32|64))"))
((concrete_type) @type.builtin
  (#match? @type.builtin "^[IU](8|16|32|64|128)"))
((concrete_type) @type.builtin
  (#match? @type.builtin "^(Bool|Box|Dec|Decode|Dict|Encode|Hash|Inspect|Int|List|Num|Result|Set|Str)"))

(app_header (packages_list (platform_ref ((package_uri) @string.special.url))))

(app_header (packages_list (platform_ref ((package_uri) @string.special.url))))

(string) @string
(multiline_string) @string
(const_pattern (string_pattern_capture)) @string

(import_expr (exposing ((ident) @special.roc-special.exposed)))

(app_header (packages_list ((platform_ref) @special.roc-special.package)))

(app_header (provides_list ((identifier) @special.roc-special.provided)))

[
  ","
  ":"
  (arrow)
] @punctuation.delimiter

[
  "("
  ")"
  "{"
  "}"
  "["
  "]"
  "|"
] @punctuation.bracket

[
  "="
  "."
  "&"

  "->"
  ".."
  "!"
  "*"
  "-"
  "^"
  (fat_arrow)
  (operator)
] @operator

(wildcard_pattern) @variable.builtin

[
   (suffix_operator)
  ] @keyword.operator

[(suffix_operator ) "return"]@keyword.control.return

[
  "for"
  "while"
] @keyword.control.repeat

[
  "import"
] @keyword.control.import

[
  "else"
  "if"

  (match)
] @keyword.control.conditional

[
  "app"
  (as)
  "as"
  (break_expr)
  "crash"
  "expect"
  "exposing"
  "hosted"
  "in"
  "module"
  "package"
  "packages"
  "platform"
  "provides"
  "requires"
  "targets"
  (to)
  "var"
  (where)
] @keyword.control

[
  "dbg"
] @function.builtin

(value_declaration (decl_left (identifier_pattern  (identifier) @function))
  (expr_body (anon_fun_expr)))
(value_declaration (decl_left (identifier_pattern  (identifier) @function))
  (expr_body
    (function_call_pnc_expr
      caller: (anon_fun_expr))))
(value_declaration (decl_left (identifier_pattern  (identifier) @function))
  (expr_body
    (bin_op_expr
      part: (function_call_pnc_expr
        caller: (anon_fun_expr)))))
(function_call_pnc_expr caller: (variable_expr     (identifier) @function))
(function_call_pnc_expr caller: (field_access_expr (identifier) @function .))
(bin_op_expr (operator "->") (variable_expr        (identifier) @function))
(annotation_type_def (annotation_pre_colon         (identifier) @function)
  (function_type))

  (tag (identifier)@constructor)

[
  (float)
] @constant.numeric.float

((number_with_suffix) @constant.numeric.float
  (#match? @constant.numeric.float "^[+-]?[0-9][0-9_]*(\\.[0-9]|[eE])"))

[
  (int)
  (xint)
] @constant.numeric.integer

((number_with_suffix) @constant.numeric.integer
  (#not-match? @constant.numeric.integer "^[+-]?[0-9][0-9_]*(\\.[0-9]|[eE])"))

(escape_char) @constant.character.escape

(char) @constant.character

[
  (literal_type_suffix)
  (record_builder_suffix)
] @type

(tag_expr(tag (module) @ignoreme.module "." (identifier)@constant.builtin.boolean)
  (#eq? @constant.builtin.boolean "True") (#eq? @ignoreme.module "Bool"))
(tag_expr (tag(module) @module "." (identifier)@constant.builtin.boolean)
  (#eq? @constant.builtin.boolean "False") (#eq? @module "Bool"))

(line_comment) @comment.line

(doc_comment) @comment.block.documentation

(record_field_type (field_name) @variable.other.member.roc-special.in-typedef)

(function_type "," @punctuation.delimiter.roc-special.in-typedef)
(record_type   "," @punctuation.delimiter.roc-special.in-typedef)
(tuple_type    "," @punctuation.delimiter.roc-special.in-typedef)

(parenthesized_type ["(" ")"] @punctuation.bracket.roc-special.in-typedef)
(record_type        ["{" "}"] @punctuation.bracket.roc-special.in-typedef)
(tags_type          ["[" "]"] @punctuation.bracket.roc-special.in-typedef)
(tuple_type         ["(" ")"] @punctuation.bracket.roc-special.in-typedef)

(static_dispatch_target
(identifier)@function.method)

((module) @module.roc-special.builtin
  (#match? @module.roc-special.builtin "^(Bool|Box|Decode|Dict|Encode|Hash|Inspect|List|Num|Result|Set|Str)"))

(interpolation_char
  "${" @punctuation.special
  "}" @punctuation.special)
(nominal_methods
  ".{" @punctuation.bracket
  "}" @punctuation.bracket)

(alias_type_def
  (apply_type (concrete_type) @type)
  ":" @operator)
(opaque_type_def
  (apply_type (concrete_type) @type)
  (double_colon) @operator)
(nominal_type_def
  (apply_type (concrete_type) @type)
  (colon_equals) @operator)
(string_pattern_capture
  "${" @punctuation.special
  "}" @punctuation.special)
