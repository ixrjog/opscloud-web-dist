(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./node_modules/brace/mode/yaml.js":
/*!*****************************************!*\
  !*** ./node_modules/brace/mode/yaml.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("ace.define(\"ace/mode/yaml_highlight_rules\",[\"require\",\"exports\",\"module\",\"ace/lib/oop\",\"ace/mode/text_highlight_rules\"], function(acequire, exports, module) {\n\"use strict\";\n\nvar oop = acequire(\"../lib/oop\");\nvar TextHighlightRules = acequire(\"./text_highlight_rules\").TextHighlightRules;\n\nvar YamlHighlightRules = function() {\n    this.$rules = {\n        \"start\" : [\n            {\n                token : \"comment\",\n                regex : \"#.*$\"\n            }, {\n                token : \"list.markup\",\n                regex : /^(?:-{3}|\\.{3})\\s*(?=#|$)/\n            },  {\n                token : \"list.markup\",\n                regex : /^\\s*[\\-?](?:$|\\s)/\n            }, {\n                token: \"constant\",\n                regex: \"!![\\\\w//]+\"\n            }, {\n                token: \"constant.language\",\n                regex: \"[&\\\\*][a-zA-Z0-9-_]+\"\n            }, {\n                token: [\"meta.tag\", \"keyword\"],\n                regex: /^(\\s*\\w.*?)(:(?=\\s|$))/\n            },{\n                token: [\"meta.tag\", \"keyword\"],\n                regex: /(\\w+?)(\\s*:(?=\\s|$))/\n            }, {\n                token : \"keyword.operator\",\n                regex : \"<<\\\\w*:\\\\w*\"\n            }, {\n                token : \"keyword.operator\",\n                regex : \"-\\\\s*(?=[{])\"\n            }, {\n                token : \"string\", // single line\n                regex : '[\"](?:(?:\\\\\\\\.)|(?:[^\"\\\\\\\\]))*?[\"]'\n            }, {\n                token : \"string\", // multi line string start\n                regex : /[|>][-+\\d\\s]*$/,\n                onMatch: function(val, state, stack, line) {\n                    var indent = /^\\s*/.exec(line)[0];\n                    if (stack.length < 1) {\n                        stack.push(this.next);\n                    } else {\n                        stack[0] = \"mlString\";\n                    }\n\n                    if (stack.length < 2) {\n                        stack.push(indent.length);\n                    }\n                    else {\n                        stack[1] = indent.length;\n                    }\n                    return this.token;\n                },\n                next : \"mlString\"\n            }, {\n                token : \"string\", // single quoted string\n                regex : \"['](?:(?:\\\\\\\\.)|(?:[^'\\\\\\\\]))*?[']\"\n            }, {\n                token : \"constant.numeric\", // float\n                regex : /(\\b|[+\\-\\.])[\\d_]+(?:(?:\\.[\\d_]*)?(?:[eE][+\\-]?[\\d_]+)?)(?=[^\\d-\\w]|$)/\n            }, {\n                token : \"constant.numeric\", // other number\n                regex : /[+\\-]?\\.inf\\b|NaN\\b|0x[\\dA-Fa-f_]+|0b[10_]+/\n            }, {\n                token : \"constant.language.boolean\",\n                regex : \"\\\\b(?:true|false|TRUE|FALSE|True|False|yes|no)\\\\b\"\n            }, {\n                token : \"paren.lparen\",\n                regex : \"[[({]\"\n            }, {\n                token : \"paren.rparen\",\n                regex : \"[\\\\])}]\"\n            }, {\n                token : \"text\",\n                regex : /[^\\s,:\\[\\]\\{\\}]+/\n            }\n        ],\n        \"mlString\" : [\n            {\n                token : \"indent\",\n                regex : /^\\s*$/\n            }, {\n                token : \"indent\",\n                regex : /^\\s*/,\n                onMatch: function(val, state, stack) {\n                    var curIndent = stack[1];\n\n                    if (curIndent >= val.length) {\n                        this.next = \"start\";\n                        stack.splice(0);\n                    }\n                    else {\n                        this.next = \"mlString\";\n                    }\n                    return this.token;\n                },\n                next : \"mlString\"\n            }, {\n                token : \"string\",\n                regex : '.+'\n            }\n        ]};\n    this.normalizeRules();\n\n};\n\noop.inherits(YamlHighlightRules, TextHighlightRules);\n\nexports.YamlHighlightRules = YamlHighlightRules;\n});\n\nace.define(\"ace/mode/matching_brace_outdent\",[\"require\",\"exports\",\"module\",\"ace/range\"], function(acequire, exports, module) {\n\"use strict\";\n\nvar Range = acequire(\"../range\").Range;\n\nvar MatchingBraceOutdent = function() {};\n\n(function() {\n\n    this.checkOutdent = function(line, input) {\n        if (! /^\\s+$/.test(line))\n            return false;\n\n        return /^\\s*\\}/.test(input);\n    };\n\n    this.autoOutdent = function(doc, row) {\n        var line = doc.getLine(row);\n        var match = line.match(/^(\\s*\\})/);\n\n        if (!match) return 0;\n\n        var column = match[1].length;\n        var openBracePos = doc.findMatchingBracket({row: row, column: column});\n\n        if (!openBracePos || openBracePos.row == row) return 0;\n\n        var indent = this.$getIndent(doc.getLine(openBracePos.row));\n        doc.replace(new Range(row, 0, row, column-1), indent);\n    };\n\n    this.$getIndent = function(line) {\n        return line.match(/^\\s*/)[0];\n    };\n\n}).call(MatchingBraceOutdent.prototype);\n\nexports.MatchingBraceOutdent = MatchingBraceOutdent;\n});\n\nace.define(\"ace/mode/folding/coffee\",[\"require\",\"exports\",\"module\",\"ace/lib/oop\",\"ace/mode/folding/fold_mode\",\"ace/range\"], function(acequire, exports, module) {\n\"use strict\";\n\nvar oop = acequire(\"../../lib/oop\");\nvar BaseFoldMode = acequire(\"./fold_mode\").FoldMode;\nvar Range = acequire(\"../../range\").Range;\n\nvar FoldMode = exports.FoldMode = function() {};\noop.inherits(FoldMode, BaseFoldMode);\n\n(function() {\n\n    this.getFoldWidgetRange = function(session, foldStyle, row) {\n        var range = this.indentationBlock(session, row);\n        if (range)\n            return range;\n\n        var re = /\\S/;\n        var line = session.getLine(row);\n        var startLevel = line.search(re);\n        if (startLevel == -1 || line[startLevel] != \"#\")\n            return;\n\n        var startColumn = line.length;\n        var maxRow = session.getLength();\n        var startRow = row;\n        var endRow = row;\n\n        while (++row < maxRow) {\n            line = session.getLine(row);\n            var level = line.search(re);\n\n            if (level == -1)\n                continue;\n\n            if (line[level] != \"#\")\n                break;\n\n            endRow = row;\n        }\n\n        if (endRow > startRow) {\n            var endColumn = session.getLine(endRow).length;\n            return new Range(startRow, startColumn, endRow, endColumn);\n        }\n    };\n    this.getFoldWidget = function(session, foldStyle, row) {\n        var line = session.getLine(row);\n        var indent = line.search(/\\S/);\n        var next = session.getLine(row + 1);\n        var prev = session.getLine(row - 1);\n        var prevIndent = prev.search(/\\S/);\n        var nextIndent = next.search(/\\S/);\n\n        if (indent == -1) {\n            session.foldWidgets[row - 1] = prevIndent!= -1 && prevIndent < nextIndent ? \"start\" : \"\";\n            return \"\";\n        }\n        if (prevIndent == -1) {\n            if (indent == nextIndent && line[indent] == \"#\" && next[indent] == \"#\") {\n                session.foldWidgets[row - 1] = \"\";\n                session.foldWidgets[row + 1] = \"\";\n                return \"start\";\n            }\n        } else if (prevIndent == indent && line[indent] == \"#\" && prev[indent] == \"#\") {\n            if (session.getLine(row - 2).search(/\\S/) == -1) {\n                session.foldWidgets[row - 1] = \"start\";\n                session.foldWidgets[row + 1] = \"\";\n                return \"\";\n            }\n        }\n\n        if (prevIndent!= -1 && prevIndent < indent)\n            session.foldWidgets[row - 1] = \"start\";\n        else\n            session.foldWidgets[row - 1] = \"\";\n\n        if (indent < nextIndent)\n            return \"start\";\n        else\n            return \"\";\n    };\n\n}).call(FoldMode.prototype);\n\n});\n\nace.define(\"ace/mode/yaml\",[\"require\",\"exports\",\"module\",\"ace/lib/oop\",\"ace/mode/text\",\"ace/mode/yaml_highlight_rules\",\"ace/mode/matching_brace_outdent\",\"ace/mode/folding/coffee\"], function(acequire, exports, module) {\n\"use strict\";\n\nvar oop = acequire(\"../lib/oop\");\nvar TextMode = acequire(\"./text\").Mode;\nvar YamlHighlightRules = acequire(\"./yaml_highlight_rules\").YamlHighlightRules;\nvar MatchingBraceOutdent = acequire(\"./matching_brace_outdent\").MatchingBraceOutdent;\nvar FoldMode = acequire(\"./folding/coffee\").FoldMode;\n\nvar Mode = function() {\n    this.HighlightRules = YamlHighlightRules;\n    this.$outdent = new MatchingBraceOutdent();\n    this.foldingRules = new FoldMode();\n    this.$behaviour = this.$defaultBehaviour;\n};\noop.inherits(Mode, TextMode);\n\n(function() {\n\n    this.lineCommentStart = [\"#\", \"//\"];\n    \n    this.getNextLineIndent = function(state, line, tab) {\n        var indent = this.$getIndent(line);\n\n        if (state == \"start\") {\n            var match = line.match(/^.*[\\{\\(\\[]\\s*$/);\n            if (match) {\n                indent += tab;\n            }\n        }\n\n        return indent;\n    };\n\n    this.checkOutdent = function(state, line, input) {\n        return this.$outdent.checkOutdent(line, input);\n    };\n\n    this.autoOutdent = function(state, doc, row) {\n        this.$outdent.autoOutdent(doc, row);\n    };\n\n\n    this.$id = \"ace/mode/yaml\";\n}).call(Mode.prototype);\n\nexports.Mode = Mode;\n\n});\n\n\n//# sourceURL=webpack:///./node_modules/brace/mode/yaml.js?");

/***/ }),

/***/ "./node_modules/brace/theme/kuroir.js":
/*!********************************************!*\
  !*** ./node_modules/brace/theme/kuroir.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("ace.define(\"ace/theme/kuroir\",[\"require\",\"exports\",\"module\",\"ace/lib/dom\"], function(acequire, exports, module) {\n\nexports.isDark = false;\nexports.cssClass = \"ace-kuroir\";\nexports.cssText = \"\\\n.ace-kuroir .ace_gutter {\\\nbackground: #e8e8e8;\\\ncolor: #333;\\\n}\\\n.ace-kuroir .ace_print-margin {\\\nwidth: 1px;\\\nbackground: #e8e8e8;\\\n}\\\n.ace-kuroir {\\\nbackground-color: #E8E9E8;\\\ncolor: #363636;\\\n}\\\n.ace-kuroir .ace_cursor {\\\ncolor: #202020;\\\n}\\\n.ace-kuroir .ace_marker-layer .ace_selection {\\\nbackground: rgba(245, 170, 0, 0.57);\\\n}\\\n.ace-kuroir.ace_multiselect .ace_selection.ace_start {\\\nbox-shadow: 0 0 3px 0px #E8E9E8;\\\n}\\\n.ace-kuroir .ace_marker-layer .ace_step {\\\nbackground: rgb(198, 219, 174);\\\n}\\\n.ace-kuroir .ace_marker-layer .ace_bracket {\\\nmargin: -1px 0 0 -1px;\\\nborder: 1px solid rgba(0, 0, 0, 0.29);\\\n}\\\n.ace-kuroir .ace_marker-layer .ace_active-line {\\\nbackground: rgba(203, 220, 47, 0.22);\\\n}\\\n.ace-kuroir .ace_gutter-active-line {\\\nbackground-color: rgba(203, 220, 47, 0.22);\\\n}\\\n.ace-kuroir .ace_marker-layer .ace_selected-word {\\\nborder: 1px solid rgba(245, 170, 0, 0.57);\\\n}\\\n.ace-kuroir .ace_invisible {\\\ncolor: #BFBFBF\\\n}\\\n.ace-kuroir .ace_fold {\\\nborder-color: #363636;\\\n}\\\n.ace-kuroir .ace_constant{color:#CD6839;}.ace-kuroir .ace_constant.ace_numeric{color:#9A5925;}.ace-kuroir .ace_support{color:#104E8B;}.ace-kuroir .ace_support.ace_function{color:#005273;}.ace-kuroir .ace_support.ace_constant{color:#CF6A4C;}.ace-kuroir .ace_storage{color:#A52A2A;}.ace-kuroir .ace_invalid.ace_illegal{color:#FD1224;\\\nbackground-color:rgba(255, 6, 0, 0.15);}.ace-kuroir .ace_invalid.ace_deprecated{text-decoration:underline;\\\nfont-style:italic;\\\ncolor:#FD1732;\\\nbackground-color:#E8E9E8;}.ace-kuroir .ace_string{color:#639300;}.ace-kuroir .ace_string.ace_regexp{color:#417E00;\\\nbackground-color:#C9D4BE;}.ace-kuroir .ace_comment{color:rgba(148, 148, 148, 0.91);\\\nbackground-color:rgba(220, 220, 220, 0.56);}.ace-kuroir .ace_variable{color:#009ACD;}.ace-kuroir .ace_meta.ace_tag{color:#005273;}.ace-kuroir .ace_markup.ace_heading{color:#B8012D;\\\nbackground-color:rgba(191, 97, 51, 0.051);}.ace-kuroir .ace_markup.ace_list{color:#8F5B26;}\\\n\";\n\nvar dom = acequire(\"../lib/dom\");\ndom.importCssString(exports.cssText, exports.cssClass);\n});\n\n\n//# sourceURL=webpack:///./node_modules/brace/theme/kuroir.js?");

/***/ })

}]);