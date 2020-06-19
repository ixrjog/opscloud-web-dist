(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[21],{

/***/ "./src/views/system/function/redirect/index.js":
/*!*****************************************************!*\
  !*** ./src/views/system/function/redirect/index.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.replace */ \"./node_modules/core-js/modules/es.string.replace.js\");\n/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  beforeRouteEnter: function beforeRouteEnter(to, from, next) {\n    next(function (instance) {\n      return instance.$router.replace(JSON.parse(from.params.route));\n    });\n  },\n  render: function render(h) {\n    return h();\n  }\n});\n\n//# sourceURL=webpack:///./src/views/system/function/redirect/index.js?");

/***/ })

}]);