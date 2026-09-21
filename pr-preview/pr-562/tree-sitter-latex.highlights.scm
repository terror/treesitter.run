(command_name) @function

(_ command: _ @function)

(placeholder) @variable

(path) @string.special.path

(argc) @number

[
  (line_comment)
  (block_comment)
  (comment_environment)
] @comment

(begin
  name: (curly_group_text
    (text) @type))

(end
  name: (curly_group_text
    (text) @type))

(key_value_pair
  key: (_) @property)

[
  (operator)
  "="
  "_"
  "^"
] @operator

(math_delimiter
  left_command: _ @punctuation.delimiter
  left_delimiter: _ @punctuation.delimiter
  right_command: _ @punctuation.delimiter
  right_delimiter: _ @punctuation.delimiter)

["[" "]" "{" "}"] @punctuation.bracket
