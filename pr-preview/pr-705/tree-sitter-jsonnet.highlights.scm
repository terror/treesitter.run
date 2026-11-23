(id) @variable
(comment) @comment

; Literals
(null) @constant.builtin
(string) @string
(number) @number
[
  (true)
  (false)
] @boolean

; Keywords
"for" @repeat
"in" @keyword.operator
"function" @keyword.function
[
  "if"
  "then"
  "else"
] @conditional
[
  (local)
  (tailstrict)
  "function"
  "assert"
  "error"
] @keyword

[
  (dollar)
  (self)
  (super)
] @variable.builtin
((id) @variable.builtin
 (#eq? @variable.builtin "std"))

; Operators
[
  (multiplicative)
  (additive)
  (bitshift)
  (comparison)
  (equality)
  (bitand)
  (bitxor)
  (bitor)
  (and)
  (or)
  (unaryop)
] @operator

; Punctuation
[
  "["
  "]"
  "{"
  "}"
  "("
  ")"
] @punctuation.bracket

[
  "."
  ","
  ";"
  ":"
] @punctuation.delimiter

[
  "::"
  ":::"
] @punctuation.special

(field
  (fieldname) "+" @punctuation.special)

; Imports
[
  (import)
  (importstr)
] @include

(fieldname (id) @field)
(fieldname (string
             (string_start) @text.strong
             (string_content) @field
             (string_end) @text.strong
           ))

(field
  function: (fieldname (id) @function))
(field
  function: (fieldname
              (string
                (string_start) @text.strong
                (string_content) @function
                (string_end) @text.strong
              )))
(param
  identifier: (id) @parameter)

(bind (id) @define)
(bind function: (id) @function)

; Function call
(functioncall
  (fieldaccess
    last: (id) @function.call
  )?
  (fieldaccess_super
    (id) @function.call
  )?
  (id)? @function.call
  "("
  (args
    (named_argument
      (id) @parameter
    )
  )?
  ")"
)

; Emphasize implicit plus usage
(implicit_plus
  (_ "}"? @text.danger)
  (object
    "{" @text.danger
  )
)

; ERROR
(ERROR) @error
