(comment) @comment

(identifier) @variable

(string) @string

(escape_sequence) @string.escape

[(integer) (float)] @number

[(true) (false)] @boolean

(none) @constant.builtin

(function_definition
  name: (identifier) @function)

(class_definition
  name: (identifier) @type)

(call
  function: (identifier) @function.call)

(attribute
  attribute: (identifier) @property)

(directive
  name: _ @keyword)

[
  (rule_definition name: (identifier) @function)
  (checkpoint_definition name: (identifier) @function)
  (module_definition name: (identifier) @module)
]

(wildcard
  (identifier) @variable)

["rule" "checkpoint" "module" "use" "include" "configfile"] @keyword

["def" "class" "return" "if" "else" "elif" "for" "in" "import" "from" "as" "with"] @keyword

["(" ")" "[" "]" "{" "}"] @punctuation.bracket

[":" "," "."] @punctuation.delimiter
