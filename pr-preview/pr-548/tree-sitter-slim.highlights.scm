(comment) @comment @spell

(tag_id) @keyword.function

(tag_class) @keyword.type

(injector) @keyword.import

(directive_sign) @keyword.directive

[
  (string_start)
  (string_content)
  (string_end)
] @string

(bracket) @punctuation.bracket

[
  "#{"
  "}"
] @punctuation.special

(delimiter) @tag.delimiter

(parameter_name) @variable.parameter

(parameter_value) @tag.attribute

[
  (text_inline)
  (text_block)
] @string.raw.block

(tag_name) @tag

((tag_name) @tag.builtin
  (#any-of? @tag.builtin
    "doctype" "html" "head" "title" "base" "link" "meta" "style" "body" "article" "section" "nav"
    "aside" "hgroup" "footer" "address" "p" "hr" "pre" "blockquote" "menu" "figure" "figcaption"
    "main" "div" "small" "s" "cite" "q" "dfn" "abbr" "rt" "rp" "data" "time" "code" "var" "samp"
    "kbd" "sub" "sup" "u" "mark" "bdi" "bdo" "span" "br" "wbr" "ins" "del" "picture" "source" "img"
    "iframe" "embed" "object" "param" "video" "audio" "track" "map" "area" "table" "caption"
    "colgroup" "col" "tbody" "thead" "tfoot" "tr" "td" "th" "form" "label" "input" "button" "select"
    "datalist" "optgroup" "option" "textarea" "output" "progress" "meter" "fieldset" "legend"
    "details" "summary" "dialog" "script" "noscript" "template" "slot" "canvas"))

((tag_name) @string.strong
  (#any-of? @string.strong "b" "strong"))

((tag_name) @string.italic
  (#any-of? @string.italic "i" "em"))

((tag_name) @string.link
  (#any-of? @string.link "a"))

((tag_name) @string.heading
  (#any-of? @string.heading "header"))

((tag_name) @string.heading.1
  (#any-of? @string.heading.1 "h1"))

((tag_name) @string.heading.2
  (#any-of? @string.heading.2 "h2"))

((tag_name) @string.heading.3
  (#any-of? @string.heading.3 "h3"))

((tag_name) @string.heading.4
  (#any-of? @string.heading.4 "h4"))

((tag_name) @string.heading.5
  (#any-of? @string.heading.5 "h5"))

((tag_name) @string.heading.6
  (#any-of? @string.heading.6 "h6"))

((tag_name) @string.list
  (#any-of? @string.list "ul" "ol" "li" "dl" "dt" "dd"))
