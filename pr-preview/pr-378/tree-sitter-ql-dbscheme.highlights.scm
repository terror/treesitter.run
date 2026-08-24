(line_comment) @comment
(block_comment) @comment
(qldoc) @comment.documentation
(dbtype) @type
(simpleId) @variable
(tableName) @type
(string) @string
(integer) @number

[
  (int)
  (float)
  (boolean)
  (date)
  (varchar)
  (unique)
] @type.builtin

[
  "="
  "|"
  ";"
] @operator

[
  "("
  ")"
  "["
  "]"
] @punctuation.bracket
