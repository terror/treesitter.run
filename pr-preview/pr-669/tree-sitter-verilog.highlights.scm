(comment) @comment

(simple_identifier) @variable
(escaped_identifier) @variable
(property_identifier) @property
(string_literal) @string
(decimal_number) @number
(real_number) @number
(integral_number) @number

(module_declaration
  (module_header
    (simple_identifier) @type))
(function_identifier) @function

[
  "always"
  "assign"
  "begin"
  "case"
  "class"
  "default"
  "else"
  "end"
  "endcase"
  "endmodule"
  "function"
  "genvar"
  "if"
  "initial"
  "input"
  "localparam"
  "logic"
  "module"
  "output"
  "parameter"
  "reg"
  "return"
  "wire"
] @keyword

[
  "="
  "=="
  "!="
  "+"
  "-"
  "*"
  "/"
  "%"
  "&&"
  "||"
  "!"
  "<"
  "<="
  ">"
  ">="
] @operator

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket
