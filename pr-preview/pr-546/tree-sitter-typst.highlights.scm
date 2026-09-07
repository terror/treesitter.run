"#" @punctuation.special

[
  ":"
  ";"
  ","
] @punctuation.delimiter

[
  "("
  ")"
  "{"
  "}"
  "["
  "]"
] @punctuation.bracket

[
  "-"
  "+"
  "*"
  "/"
  "=="
  "!="
  "<"
  "<="
  ">"
  ">="
  "="
  "in"
  "and"
  "or"
  "not"
] @operator

[
  "import"
  "include"
] @keyword.import

[
  "let"
  "set"
  "show"
] @keyword

[
  "for"
  "while"
  "break"
  "continue"
] @keyword.repeat

[
  "if"
  "else"
] @keyword.conditional

(for
  "in" @keyword.repeat)

(number) @number

(string) @string

(bool) @boolean

(ident) @constant

(tagged
  field: (ident) @variable.member)

(call
  item: (ident) @function.call)

(text) @spell

(heading
  "=" @markup.heading.1) @markup.heading.1

(heading
  "==" @markup.heading.2) @markup.heading.2

(heading
  "===" @markup.heading.3) @markup.heading.3

(heading
  "====" @markup.heading.4) @markup.heading.4

(heading
  "=====" @markup.heading.5) @markup.heading.5

(heading
  "======" @markup.heading.6) @markup.heading.6

(strong) @markup.strong

(emph) @markup.italic

(url) @markup.link.url

(call
  item: (ident) @_link
  (#eq? @_link "link")
  (group
    .
    (string) @markup.link.url
    (#offset! @markup.link.url 0 1 0 -1)))

(raw_span) @markup.raw

(raw_blck) @markup.raw

(raw_blck
  lang: (ident) @label)

(raw_blck
  (blob) @markup.raw.block)

(label) @markup.link.label

(ref) @markup.link

(math) @markup.math

(comment) @comment @spell
