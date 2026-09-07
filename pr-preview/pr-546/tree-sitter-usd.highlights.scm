(None) @constant.builtin
(asset_path) @string.uri
(attribute_property) @property
(bool) @boolean
(comment) @spell @comment
(custom) @function.builtin
(float) @number
(integer) @number
(orderer) @function.call
(display_unit) @constant.builtin
(permission) @constant.builtin
(prim_path) @string.special
(relationship_type) @type
(uniform) @function.builtin
(varying) @function.builtin
(variant_set_definition) @keyword

[
  "edit"
  "write"
  "insert"
  "erase"
  "minsize"
  "resize"
  "maxsize"
  "fill"
  "to"
  "at"
] @keyword

(array_edit_append "append" @keyword)
(array_edit_prepend "prepend" @keyword)

(spline_curve_type) @keyword
(spline_tangent_algorithm) @keyword
[
  "pre"
  "post"
  "loop"
  "sloped"
  "repeat"
  "reset"
  "oscillate"
  "none"
  "held"
  "linear"
  "curve"
] @keyword

(identifier) @variable
(namespace_identifier) @module
(namespace_identifier
  (identifier) @module
)

[
  "class"
  "def"
  "over"
] @keyword.function

["(" ")" "[" "]" "{" "}"] @punctuation.bracket
[":" ";" "."] @punctuation.delimiter

[
  "="
] @operator

(attribute_type) @type
(

 (attribute_type) @type.builtin
 (#any-of? @type.builtin

  "asset" "asset[]"
  "bool" "bool[]"
  "double" "double[]"
  "float" "float[]"
  "half" "half[]"
  "int" "int[]"
  "int64" "int64[]"
  "string" "string[]"
  "timecode" "timecode[]"
  "token" "token[]"
  "uchar" "uchar[]"
  "uint" "uint[]"
  "uint64" "uint64[]"

  "double2" "double2[]"
  "double3" "double3[]"
  "double4" "double4[]"
  "float2" "float2[]"
  "float3" "float3[]"
  "float4" "float4[]"
  "half2" "half2[]"
  "half3" "half3[]"
  "half4" "half4[]"
  "int2" "int2[]"
  "int3" "int3[]"
  "int4" "int4[]"
  "matrix2d" "matrix2d[]"
  "matrix3d" "matrix3d[]"
  "matrix4d" "matrix4d[]"
  "quatd" "quatd[]"
  "quatf" "quatf[]"
  "quath" "quath[]"

  "color3f" "color3f[]"
  "normal3f" "normal3f[]"
  "point3f" "point3f[]"
  "texCoord2f" "texCoord2f[]"
  "vector3d" "vector3d[]"
  "vector3f" "vector3f[]"
  "vector3h" "vector3h[]"

  "dictionary"

  "EdgeIndex" "EdgeIndex[]"
  "FaceIndex" "FaceIndex[]"
  "Matrix4d" "Matrix4d[]"
  "PointIndex" "PointIndex[]"
  "PointFloat" "PointFloat[]"
  "Transform" "Transform[]"
  "Vec3f" "Vec3f[]"
 )
)

(string) @string

(metadata
 (comment)*
 .
 (string) @comment.documentation)
