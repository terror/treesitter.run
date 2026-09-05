(terminal) @string.grammar

(special_sequence) @string.special.grammar

(integer) @number

(comment) @comment.block

((identifier) @string.special.grammar.upper
 (#match? @string.special.grammar.upper "^[A-Z][A-Z0-9_]+$"))

((identifier) @string.special.grammar.lower
 (#match? @string.special.grammar.lower "^[a-z][a-z0-9_]+$"))
((identifier) @string.special.grammar.pascal
 (#match? @string.special.grammar.pascal "^[A-Z]"))

((identifier) @string.special.grammar.camel
 (#match? @string.special.grammar.camel "^[a-z]"))

(identifier) @string.special.grammar

[
 ";"
 ","
] @punctuation.delimiter

[
 "|"
 "*"
 "-"
] @operator

"=" @keyword.operator

[
 "("
 ")"
 "["
 "]"
 "{"
 "}"
] @punctuation.bracket
