(byte) @constant

[
  (hexadecimal)
  (integer)
  (section_address)
  (address)
] @number

(identifier) @variable
(disassembly_section_label
  (identifier)) @module

[
  "file" "format"
  "File" "Offset:"
  "discriminator"
] @string
"Disassembly of section " @string.title

(file_path) @string.special
(instruction) @function
(bad_instruction) @string.warning
(label) @label

["<" ">"] @punctuation.special
["(" ")"] @punctuation.bracket
["+" ":"] @punctuation.delimiter

(comment) @comment.documentation
