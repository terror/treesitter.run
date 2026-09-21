(erroneous_end_tag_name) @tag.error
(doctype) @constant
(comment) @comment

((tag_name) @special
  (#any-of? @special "super" "extend"))
(tag_name) @tag

(
  (element
    (start_tag
      (attribute
        (attribute_name) @attribute
        [
          (attribute_value) @string.link.url
          (quoted_attribute_value (attribute_value) @string.link.url)
        ]))
    (element
      (start_tag
        (tag_name) @tag)))
  (#eq? @tag "super")
  (#eq? @attribute "id")
)

(
  (element
    (start_tag
      (tag_name) @special
      (attribute
        (attribute_name) @error)+))
  (#eq? @special "super")
)

(attribute_name) @attribute

[
  "\""
  (attribute_value)
] @string

[
  "<"
  ">"
  "</"
  "/>"
  "<!"
] @punctuation.bracket

"=" @punctuation.delimiter
