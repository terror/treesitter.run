(comment) @comment @spell

"variable" @variable.parameter

[
  "viridis"
  "black"
  "bgnd"
  "background"
] @variable.parameter.builtin

(identifier) @variable

[
  "["
  "]"
  "("
  ")"
  "{"
  "}"
] @punctuation.bracket

(operator) @operator

[
  "="
  ","
  ":"

  "<<"
] @operator

"*" @character.special

(keyword_op) @keyword.operator

(ternary_op) @keyword.conditional.ternary

[
  "for"
  "in"
  "do"
  "while"
] @keyword.repeat

"cmd" @keyword

[
  "newhistogram"
  "newspiderplot"
  "keyentry"
] @keyword

[
  "inverse"
  "sample"
  "kw_fn"
] @keyword.function

"kw_cond" @keyword.conditional

[
  "front"
  "back"
  "depthorder"
  "clip"
  "zclip"
  "filled"
  "nofilled"

  "coord"
] @keyword.directive

"flag" @keyword.directive

"mod" @constant

[
  "degrees"
  "pi"
] @constant

"attr" @property

[

  "name"

  "sa"
  "dt"
  "fc"
  "fs"
  "lc"
  "lt"
  "ps"
  "pt"
  "tc"
  "skip"
  "expand"
  "title"

  "opt"
  "arg"
] @variable.member

[

  "axes_opts"

  "closed"
  "between"
  "above"
  "below"

  "pixels"
  "whiskerbars"
  "beginning"
  "long"

  "base"
  "begin"
  "center"
  "end"

  "clip1in"
  "clip4in"
  "c2c"
  "retrace"

  "whitespace"
  "tab"
  "comma"

  "push"
  "pop"

  "flipx"
  "flipy"
  "flipz"

  "binary"
  "format"
  "filetype"
  "record"
  "array"
  "origin"
  "dx"
  "dy"
  "level"
  "matrix"
  "columnheaders"
  "rowheaders"
  "nonuniform"
  "sparse"
  "volatile"
  "noautoscale"
  "zsort"
  "mask"
  "sharpen"
  "transpose"

  "endian"
  "little"
  "big"
  "swap"
  "swab"
  "middle"
  "pdp"

  "unitweights"
  "errors"

  "message"
  "status"
  "mouse"

  "append"
  "quiet"
  "numbers"
  "trim"
  "full"

  "axis"

  "cen"
  "lef"
  "rig"

  "angle"
  "length"
  "head"

  "offset"
  "scale"

  "range"
  "missing"
  "interpolate"

  "rotate"

  "restore"

  "scanorder"
  "position"

  "pattern"

  "variables"
  "datablocks"
  "commentschars"
  "functions"

  "changes"

  "rgbcolor"

  "default"

  "map"

  "model"

  "corners2color"
  "primary"
  "specular"
  "spec2"
  "rot_x"
  "rot_z"
  "Phong"

  "empty"

  "layout"
  "spacing"
  "frac"

  "point"

  "tics"

  "label"

  "units"

  "prefix"

  "margins"

  "palette"

] @variable.member

[
  "size"
  "monochrome"
  "color"
  "transparent"

  "RGB"
  "CMY"
  "HSV"
  "nobackground"
  "separator"
  (hull)
  "units_opt"

  "solid"

  "animate"
  "input"

  "st_opt"
  "plt_st"
] @attribute

(binary_options
  filetype: (identifier) @attribute)

(macro) @function.macro

(datablock) @module

[
  (datablock_start)
  (datablock_end)
] @label

(function
  name: (identifier) @function.call)

(def_func
  .
  (function
    name: (identifier) @function))

((function
  name: (identifier) @function.builtin)
  (#any-of? @function.builtin

    "abs" "acos" "acosh" "airy" "arg" "asin" "asinh" "atan" "atan2" "atanh" "besj0" "besj1" "besjn"
    "besy0" "besy1" "besyn" "besi0" "besi1" "besin" "cbrt" "ceil" "conj" "cos" "cosh" "exp" "floor"
    "imag" "int" "log" "log10" "norm" "rand" "real" "round" "sgn" "sin" "sinh" "sqrt" "tan" "tanh"

    "EllipticK" "EllipticE" "EllipticPi" "erf" "erfc" "expint" "gamma" "ibeta" "igamma" "inverf"
    "invibeta" "invigamma" "invnorm" "LambertW" "lambertw" "lgamma" "lnGamma" "Sign" "SynchrotronF"
    "uigamma" "voigt" "zeta"

    "cerf" "cdawson" "faddeeva" "erfi" "FresnelC" "FresnelS" "VP" "VP_fwhm"

    "Ai" "Bi" "BesselH1" "BesselH2" "BesselJ" "BesselY" "BesselI" "BesselK"

    "gprintf" "sprintf" "strlen" "strstrt" "substr" "split" "join" "trim" "word" "words" "system"

    "index"

    "time" "timecolumn" "strftime" "strptime" "tm_hour" "tm_mday" "tm_min" "tm_mon" "tm_sec"
    "tm_wday" "tm_week" "tm_yday" "tm_year" "weekdate_iso" "weekdate_cdc"

    "column" "columnhead" "stringcolumn" "strcol" "exists" "valid" "value" "hsv2rgb" "palette"
    "rgbcolor" "voxel"))

(columnheader) @function.builtin

((identifier) @constant.builtin
  (#any-of? @constant.builtin "pi" "NaN" "Inf" "I"))

((identifier) @variable.builtin
  (#match? @variable.builtin "^((GPVAL|MOUSE|FIT)_|ARG)\\w+$"))

((identifier) @variable.builtin
  (#any-of? @variable.builtin "GNUTERM" "VoxelDistance" "GridDistance"))

(def_array
  "array" @keyword.function)

(array
  name: (identifier) @function)

"NaN" @constant.builtin

(number) @number

(string_literal) @string

(escape_sequence) @string.escape

(format_specifier) @string.special

(plot_element
  target: (identifier) @variable.member)
