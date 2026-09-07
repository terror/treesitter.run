(comment) @comment

["module" "submodule"] @keyword

(statement_keyword) @keyword
(statement_keyword "import") @include
(extension_keyword) @function

(built_in_type) @type.builtin
(number) @number
(boolean) @boolean
(date) @number
(range (_ ".." @punctuation.special))
(range (_ "|" @punctuation.special))
(quoted_range "\"" @string.special)
(quoted_range "'" @string.special)
(yang_version) @constant.builtin
(identifier) @variable
(node_identifier) @variable
(string) @string
(string (escape_sequence) @string.escape)
(unquoted_string) @string
(keypath) @string.special

(enum_value) @string

(statement
  (statement_keyword ["when" "must"])
  (argument (string) @string.special))
(statement
  (statement_keyword ["when" "must"])
  (argument (string_concatenation (string) @string.special)))

(statement
  (statement_keyword ["pattern"])
  (argument (string) @string.regex))
(statement
  (statement_keyword ["pattern"])
  (argument (string_concatenation (string) @string.regex)))

(plus_symbol) @operator
["{" "}"] @punctuation.bracket
[";"] @punctuation.delimiter

(ERROR) @error
