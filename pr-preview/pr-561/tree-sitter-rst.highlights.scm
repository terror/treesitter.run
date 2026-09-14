[
  ".."
  "|"
  "--"
  "__"
  ":"
  "::"
  (transition)
] @punctuation.special

"bullet" @string.list

(doctest_block) @none

(directive
  name: (type) @function)

(directive
  body: (body
    (arguments) @variable.parameter))

((directive
  name: (type) @keyword.import)
  (#eq? @keyword.import "include"))

(directive
  name: (type) @function.builtin
  (#any-of? @function.builtin

    "attention" "caution" "danger" "error" "hint" "important" "note" "tip" "warning" "admonition"
    "image" "figure" "topic" "sidebar" "line-block" "parsed-literal" "code" "math" "rubric"
    "epigraph" "highlights" "pull-quote" "compound" "container" "table" "csv-table" "list-table"
    "contents" "sectnum" "section-numbering" "header" "footer" "target-notes" "meta" "replace"
    "unicode" "date" "raw" "class" "role" "default-role" "title" "restructuredtext-test-directive"))

[
  (literal_block)
  (line_block)
] @string.raw.block

(block_quote
  (attribution)? @string.italic) @string.quote

(substitution_definition
  name: (substitution) @constant)

(footnote
  name: (label) @constant)

(citation
  name: (label) @constant)

(target
  name: (name)? @string.link.label
  link: (_)? @string.link)

(list_item
  (term) @string.strong
  (classifier)? @string.italic)

(field
  (field_name) @constant)

(emphasis) @string.italic

(strong) @string.strong

(standalone_hyperlink) @string.special.url @nospell

(role) @function

((role) @function.builtin
  (#any-of? @function.builtin

    ":emphasis:" ":literal:" ":code:" ":math:" ":pep-reference:" ":PEP:" ":rfc-reference:" ":RFC:"
    ":strong:" ":subscript:" ":sub:" ":superscript:" ":sup:" ":title-reference:" ":title:" ":t:"
    ":raw:"))

[
  "interpreted_text"
  (literal)
] @string.raw

((interpreted_text
  (role) @_role
  "interpreted_text" @string.italic)
  (#eq? @_role ":emphasis:"))

((interpreted_text
  (role) @_role
  "interpreted_text" @string.strong)
  (#eq? @_role ":strong:"))

((interpreted_text
  (role) @_role
  "interpreted_text" @none)
  (#eq? @_role ":math:"))

((interpreted_text
  "interpreted_text" @string.italic
  (role) @_role)
  (#eq? @_role ":emphasis:"))

((interpreted_text
  "interpreted_text" @string.strong
  (role) @_role)
  (#eq? @_role ":strong:"))

((interpreted_text
  "interpreted_text" @none
  (role) @_role)
  (#eq? @_role ":math:"))

[
  (inline_target)
  (substitution_reference)
  (footnote_reference)
  (citation_reference)
  (reference)
] @string.link @nospell

[
  (title)
  "adornment"
] @string.heading

(comment) @comment @spell

(comment
  "..") @comment

(directive
  name: (type) @_directive
  body: (body
    (content) @spell
    (#not-any-of? @_directive "code" "code-block" "sourcecode")))

(paragraph) @spell
