(comment) @comment
(block_comment) @comment

(str_lit) @string
(char_lit) @character
(num_lit) @number
(complex_num_lit) @number
(nil_lit) @constant.builtin
(kwd_lit) @constant

(sym_lit) @variable
(kwd_symbol) @constant
(defun_keyword) @keyword.function

[
  "defun"
  "defmacro"
  "defgeneric"
  "defmethod"
  "if"
  "loop"
  "for"
  "in"
  "return"
  "while"
  "until"
  "when"
  "unless"
  "else"
  "and"
  "do"
] @keyword

[
  "'"
  "`"
  ","
  ",@"
] @operator

[
  "("
  ")"
  "{"
  "}"
] @punctuation.bracket
