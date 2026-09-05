[
  "group_uniforms"
  "uniform"
  "const"
  "varying"
  "discard"
  "render_mode"
  "shader_type"
  "return"
  "while"
  "do"
  "break"
  "continue"
  "if"
  "else"
  "switch"
  "case"
  "default"
  "struct"
  "for"
] @keyword

(parameter_qualifier) @keyword

(interpolation_specifier) @keyword

(precision_specifier) @keyword

(scope) @keyword

[
  ";"
  "."
  ":"
  ","
] @punctuation.delimiter

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket

[
  "="
  "-"
  "*"
  "/"
  "+"
  "%"
  "~"
  "|"
  "&"
  "^"
  "<<"
  ">>"
  "<"
  "<="
  ">="
  ">"
  "=="
  "!="
  "!"
  "&&"
  "||"
  "-="
  "+="
  "*="
  "/="
  "%="
  "|="
  "&="
  "^="
  ">>="
  "<<="
  "--"
  "++"
  "?"
  ":"
] @operator

(comma_expression
  operator: "," @operator)

(primitive_type) @type.builtin

(type_identifier) @type

(number) @number

(boolean) @boolean

(case_statement
  value: (identifier) @constant)

(source_file

  (shader_type_statement
    (shader_type) @_shader_type)
  (#eq? @_shader_type "spatial")
  (render_mode_statement
    (render_mode) @keyword)
  (#any-of? @keyword
    "blend_mix" "blend_add" "blend_sub" "blend_mul" "blend_premul_alpha" "depth_draw_opaque"
    "depth_draw_always" "depth_draw_never" "depth_prepass_alpha" "depth_test_disabled"
    "sss_mode_skin" "cull_back" "cull_front" "cull_disabled" "unshaded" "wireframe"
    "debug_shadow_splits" "diffuse_burley" "diffuse_lambert" "diffuse_lambert_wrap" "diffuse_toon"
    "specular_schlick_ggx" "specular_toon" "specular_disabled" "skip_vertex_transform"
    "world_vertex_coords" "ensure_correct_normals" "shadows_disabled" "ambient_light_disabled"
    "shadow_to_opacity" "vertex_lighting" "particle_trails" "alpha_to_coverage"
    "alpha_to_coverage_and_one" "fog_disabled"))

(source_file
  (shader_type_statement
    (shader_type) @_shader_type)
  (#eq? @_shader_type "canvas_item")
  (render_mode_statement
    (render_mode) @keyword)
  (#any-of? @keyword
    "blend_mix" "blend_add" "blend_sub" "blend_mul" "blend_premul_alpha" "blend_disabled" "unshaded"
    "light_only" "skip_vertex_transform" "world_vertex_coords"))

(source_file
  (shader_type_statement
    (shader_type) @_shader_type)
  (#eq? @_shader_type "particle")
  (render_mode_statement
    (render_mode) @keyword)
  (#any-of? @keyword "keep_data" "disable_force" "disable_velocity" "collision_use_scale"))

(source_file
  (shader_type_statement
    (shader_type) @_shader_type)
  (#eq? @_shader_type "sky")
  (render_mode_statement
    (render_mode) @keyword)
  (#any-of? @keyword "use_half_res_pass" "use_quarter_res_pass" "disable_fog"))

(shader_type_statement
  (shader_type) @keyword
  (#any-of? @keyword "spatial" "canvas_item" "particle" "sky" "fog"))

(identifier) @variable

(struct_definition
  name: (identifier) @type)

(struct_definition
  (struct_fields
    (field_definition
      declarator: [
        (identifier) @variable.member
        (array_declarator
          declarator: (identifier) @variable.member)
      ])))

[
  "#undef"
  "#include"
  "#if"
  "#ifdef"
  "#ifndef"
  "#elif"
  "#else"
  "#endif"
  "#define"
] @keyword

(preproc_include
  path: (_) @string)

(preproc_undef
  argument: (identifier) @constant)

(comment) @comment

((comment) @comment.documentation
  (#match? @comment.documentation "^/\\*\\*[^/]"))

(parameter_declaration
  declarator: [
    (identifier) @variable.parameter
    (array_declarator
      declarator: (identifier) @variable.parameter)
  ])

(function_definition
  declarator: (identifier) @function)

(field_expression
  field: (_) @property)

(call_expression
  function: (identifier) @function)

(method_expression
  method: (_) @function)

((call_expression
  function: (identifier) @function.builtin)
  (#any-of? @function.builtin

    "radians" "degrees" "sin" "cos" "tan" "asin" "acos" "atan" "sinh" "cosh" "tanh" "asinh" "acosh"
    "atanh"

    "pow" "exp" "exp2" "log" "log2" "sqrt" "inversesqrt" "abs" "sign" "floor" "round" "roundEven"
    "trunc" "ceil" "fract" "mod" "modf" "min" "max" "clamp" "mix" "fma" "step" "smoothstep" "isnan"
    "isinf" "floatBitsToInt" "floatBitsToUint" "intBitsToFloat" "uintBitsToFloat"

    "length" "distance" "dot" "cross" "normalize" "reflect" "refract" "faceforward" "matrixCompMult"
    "outerProduct" "transpose" "determinant" "inverse"

    "lessThan" "greaterThan" "lessThanEqual" "equal" "notEqual" "any" "all" "not"

    "textureSize" "textureQueryLod" "textureQueryLevels" "texture" "textureProj" "textureLod"
    "textureProjLod" "textureGrad" "textureProjGrad" "texelFetch" "textureGather" "dFdx"
    "dFdxCoarse" "dFdxFine" "dFdy" "dFdyCoarse" "dFdyFine" "fwidth" "fwidthCoarse" "fwidthFine"

    "packHalf2x16" "unpackHalf2x16" "packUnorm2x16" "unpackUnorm2x16" "packSnorm2x16"
    "unpackSnorm2x16" "packUnorm4x8" "unpackUnorm4x8" "packSnorm4x8" "unpackSnorm4x8"

    "bitfieldExtract" "bitfieldInsert" "bitfieldReverse" "bitCount" "findLSB" "findMSB" "imulExtend"
    "umulExtend" "uaddCarry" "usubBorrow" "ldexp" "frexp"))

((identifier) @constant
  (#match? @constant "^[A-Z][A-Z_0-9]*$"))

((identifier) @constant.builtin
  (#any-of? @constant.builtin

    "PI" "E" "TAU" "CURRENT_RENDERER" "RENDERER_COMPATIBILITY" "RENDERER_MOBILE"
    "RENDERER_FORWARD_PLUS"
    ))

((identifier) @variable.builtin
  (#any-of? @variable.builtin "TIME"))

(type_hint
  [
    (identifier) @attribute
    (call_expression
      function: (_) @attribute)
  ])
