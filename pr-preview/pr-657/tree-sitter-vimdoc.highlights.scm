(h1
  (delimiter) @string.heading.1
  (heading) @string.heading.1)

(h2
  (delimiter) @string.heading.2
  (heading) @string.heading.2)

(h3
  (heading) @string.heading.3)

(column_heading
  (heading) @string.heading.4)

(column_heading
  (delimiter) @string.heading.4.marker
  (#set! conceal ""))

(tag
  "*" @string.heading.5.marker
  (#set! conceal "")
  text: (_) @label)

(taglink
  "|" @string.link
  (#set! conceal "")
  text: (_) @string.link)

(optionlink
  text: (_) @string.link)

(codespan
  "`" @string.raw
  (#set! conceal "")
  text: (_) @string.raw)

((codeblock) @string.raw.block
  (#set! "priority" 90))

(codeblock
  [
    ">"
    (language)
  ] @string.raw.block
  (#set! conceal ""))

(block
  "<" @string.raw.block
  (#set! conceal ""))

(argument) @variable.parameter

(keycode) @string.special

(url) @string.special.url

(modeline) @keyword.directive

((note) @comment.hint
  (#any-of? @comment.hint "Note:" "NOTE:" "Notes:"))

((note) @comment.warning
  (#any-of? @comment.warning "Warning:" "WARNING:"))

((note) @comment.error
  (#any-of? @comment.error "Deprecated:" "DEPRECATED:"))
