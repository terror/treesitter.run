(ERROR) @error

(comment) @comment

[
  "+"
  "-"
  "*"
  "/"
  "%"
  "||"
  "&&"
  "=="
  "!="
  "=~"
  ">"
  "<"
  ">="
  "<="
  "!"
  "?."
  "?:"
] @operator

(ternary_expression
  ["?" ":"] @operator)

[ ":" "." "," ] @punctuation.delimiter

[ "{" "}" "[" "]" "(" ")" ] @punctuation.bracket

(number (float)) @constant.numeric.float

(number (integer)) @constant.numeric.integer

(boolean) @constant.builtin.boolean

(escape_sequence) @constant.character.escape

(string_interpolation
  "${" @punctuation.special
  "}" @punctuation.special)

[ (string_fragment) "\"" "'" "`" ] @string

(keyword) @attribute

(function_call
  name: (ident) @function.call)

(ident) @variable

(array
  (symbol) @variable)

(list .
  ((symbol) @tag.builtin
    (#match? @tag.builtin "^(box|button|calendar|centerbox|checkbox|circular-progress|color-button|color-chooser|combo-box-text|eventbox|expander|graph|image|input|label|literal|overlay|progress|revealer|scale|scroll|transform)$")))

(list .
  ((symbol) @keyword
    (#match? @keyword "^(defwindow|defwidget|defvar|defpoll|deflisten|geometry|children|struts)$")))

(list .
  ((symbol) @keyword.control.import
    (#eq? @keyword.control.import "include")))

(loop_widget . "for" @keyword.control.repeat . (symbol) @variable . "in" @keyword.operator . (symbol) @variable)

(loop_widget . "for" @keyword.control.repeat . (symbol) @variable . "in" @keyword.operator)

(list
  (symbol) @tag)

(ident) @variable
(index) @variable
