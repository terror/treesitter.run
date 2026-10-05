(comment) @comment

(php_tag) @keyword
(name) @variable
(variable_name) @variable
(primitive_type) @type.builtin
(integer) @number
(float) @number
(string) @string
(encapsed_string) @string
(escape_sequence) @string.escape
(boolean) @boolean
(null) @constant.builtin

(function_definition
  name: (name) @function)

[
  "abstract"
  "and"
  "array"
  "as"
  "break"
  "case"
  "catch"
  "class"
  "clone"
  "const"
  "continue"
  "declare"
  "default"
  "do"
  "echo"
  "else"
  "elseif"
  "enddeclare"
  "endfor"
  "endforeach"
  "endif"
  "endswitch"
  "endwhile"
  "exit"
  "extends"
  "final"
  "finally"
  "fn"
  "for"
  "foreach"
  "function"
  "global"
  "goto"
  "if"
  "implements"
  "include"
  "include_once"
  "instanceof"
  "insteadof"
  "interface"
  "list"
  "match"
  "namespace"
  "new"
  "or"
  "print"
  "private"
  "protected"
  "public"
  "require"
  "require_once"
  "return"
  "static"
  "switch"
  "throw"
  "trait"
  "try"
  "unset"
  "use"
  "while"
  "xor"
  "yield"
] @keyword

[
  "="
  "=="
  "==="
  "!="
  "!=="
  "+"
  "-"
  "*"
  "/"
  "%"
  "."
  "&&"
  "||"
  "!"
  "->"
  "=>"
  "::"
] @operator

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket
