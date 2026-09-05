(text) @none

(comment) @comment @spell

(attribute_name) @tag.attribute

(quoted_attribute_value) @string

[
  (start_block)
  (end_block)
  (subblock)
] @keyword

[
  "<"
  ">"
  "</"
  "/>"
  "{"
  "}"
  "<!--"
  "-->"
  "{!--"
  "--}"
] @tag.delimiter

(tag_name) @tag

(component_name) @type

(directive_name) @keyword

"=" @operator
