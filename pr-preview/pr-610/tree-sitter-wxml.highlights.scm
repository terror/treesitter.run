(comment) @comment

(tag_name) @tag

((tag_name) @tag.builtin
  (#any-of? @tag.builtin "wxs" "template" "import" "include" "slot" "block"))

(attribute_name) @tag.attribute
(attribute_value) @string
(quoted_attribute_value) @string

((attribute_name) @keyword.directive
  (#match? @keyword.directive "^wx:"))

((attribute_name) @keyword.conditional
  (#any-of? @keyword.conditional "wx:if" "wx:elif" "wx:else"))

((attribute_name) @keyword.repeat
  (#any-of? @keyword.repeat "wx:for" "wx:for-index" "wx:for-item"))

((attribute_name) @keyword
  (#match? @keyword "^(bind|catch|mut-bind|model:|data-)"))

(entity) @character.special

(interpolation_start) @punctuation.special
(interpolation_end) @punctuation.special

[
  "<"
  ">"
  "</"
  "/>"
] @tag.delimiter

"=" @operator
