(line_comment) @comment
(block_comment) @comment
(xml_doc) @comment.documentation

(identifier) @variable
(op_identifier) @operator
(long_identifier) @variable

(string) @string
(verbatim_string) @string
(triple_quoted_string) @string
(format_string) @string
(char) @character

[
  (int)
  (xint)
  (sbyte)
  (byte)
  (int16)
  (uint16)
  (int32)
  (uint32)
  (int64)
  (uint64)
  (float)
  (ieee32)
  (ieee64)
  (decimal)
  (bignum)
] @number

(bool) @boolean
(unit) @constant.builtin

[
  "and"
  "as"
  "begin"
  "class"
  "do"
  "else"
  "end"
  "exception"
  "extern"
  "for"
  "fun"
  "function"
  "if"
  "in"
  "inherit"
  "interface"
  "let"
  "let!"
  "match"
  "module"
  "mutable"
  "namespace"
  "new"
  "of"
  "open"
  "override"
  "rec"
  "return"
  "return!"
  "static"
  "struct"
  "then"
  "try"
  "type"
  "use"
  "use!"
  "val"
  "while"
  "with"
  "yield"
  "yield!"
] @keyword

[
  "="
  "->"
  "<-"
  "::"
  ":>"
  ":?>"
  "+"
  "-"
  "*"
  "/"
  "%"
  ">"
  "<"
  "&"
  "|"
] @operator

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket
