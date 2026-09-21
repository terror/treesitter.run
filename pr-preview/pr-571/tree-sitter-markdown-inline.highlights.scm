[
  (code_span)
  (link_title)
] @string.literal

[
  (emphasis_delimiter)
  (code_span_delimiter)
] @punctuation.delimiter

(emphasis) @string.emphasis

(strong_emphasis) @string.strong

[
  (link_destination)
  (uri_autolink)
] @string.uri

[
  (link_label)
  (link_text)
  (image_description)
] @string.reference

[
  (backslash_escape)
  (hard_line_break)
] @string.escape

(image
  [
    "!"
    "["
    "]"
    "("
    ")"
  ] @punctuation.delimiter)

(inline_link
  [
    "["
    "]"
    "("
    ")"
  ] @punctuation.delimiter)

(shortcut_link
  [
    "["
    "]"
  ] @punctuation.delimiter)
