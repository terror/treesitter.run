(name) @function

; flow control
((name) @function.builtin
  (#any-of? @function.builtin
    "Fork" "Magic" "Subsection" "ConditionalJump"
    "Label" "Comment" "Register" "Return"))

(string) @string

key: (string) @property

(number) @number

(boolean) @boolean

[
  "/disabled"
  "/breakpoint"
] @attribute

[
  "("
  ")"
  ","
  "{"
  "}"
  ":"
] @punctuation.delimiter
