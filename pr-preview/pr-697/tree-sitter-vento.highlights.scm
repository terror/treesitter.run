(comment) @comment @spell

(front_matter_delimiter) @punctuation.delimiter

(if_tag_start) @keyword.control.conditional
(if_tag_end) @keyword.control.conditional
(else_if_tag) @keyword.control.conditional
(else_tag) @keyword.control.conditional
(for_tag_start) @keyword.control.repeat
(for_tag_end) @keyword.control.repeat

(layout_tag_start) @keyword.control
(layout_tag_end) @keyword.control
(slot_tag_start) @keyword
(slot_tag_end) @keyword
(default_tag_start) @keyword
(default_tag_end) @keyword

(set_tag) @keyword
(set_tag_start) @keyword
(set_tag_end) @keyword
(echo_tag) @keyword

(import_tag) @keyword.control.import
(export_tag) @keyword.control.export
(export_tag_start) @keyword.control.export
(export_tag_end) @keyword.control.export
(include_tag) @keyword.control.import

(function_tag_start) @keyword.function
(function_tag_end) @keyword.function

(fragment_tag_start) @keyword
(fragment_tag_end) @keyword

(javascript_tag) @keyword

"if" @keyword.control.conditional
"/if" @keyword.control.conditional
"else" @keyword.control.conditional
"for" @keyword.control.repeat
"/for" @keyword.control.repeat
"await" @keyword.control
"of" @keyword.control

"layout" @keyword.control
"/layout" @keyword.control
"slot" @keyword
"/slot" @keyword
"default" @keyword
"/default" @keyword

"set" @keyword
"/set" @keyword
"echo" @keyword

"import" @keyword.control.import
"from" @keyword.control.import
"export" @keyword.control.export
"/export" @keyword.control.export
"include" @keyword.control.import

"function" @keyword.function
"/function" @keyword.function
"async" @keyword.function

"fragment" @keyword
"/fragment" @keyword

["{{" "{{-" "{{>" "{{->" "{{#" "{{#-"] @punctuation.bracket
["}}" "-}}" "#}}" "-#}}"] @punctuation.bracket

("|>") @operator
["=" ","] @operator

(identifier) @variable

(code) @none

(filter (code) @function)
