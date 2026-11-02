(((command) @keyword
  (label) @constant.builtin
  (message)? @comment)
 (#match? @keyword "^(p|pick|r|reword|e|edit|s|squash|d|drop)$"))

(((command) @function
  (label) @constant
  (message)? @comment)
 (#match? @function "^(l|label|t|reset)$"))

((command) @keyword
 (#match? @keyword "^(x|exec|b|break)$"))

(((command) @attribute
  (label) @constant.builtin
  (message)? @comment)
 (#match? @attribute "^(f|fixup)$"))

(((command) @keyword
  (label) @constant.builtin
  (label) @constant
  (message) @string)
 (#match? @keyword "^(m|merge)$"))

(option) @operator

(comment) @comment
