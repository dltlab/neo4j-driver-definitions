require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = require("fs-extra");

/***/ },
/* 1 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = require("chalk");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __webpack_require__(0);
var Path = __webpack_require__(1);
function aggreateDefinitionFiles(files) {
    return new Promise(function (resolve, reject) {
        var path = Path.resolve('./internal');
        fs_extra_1.readdir(path, function (err, paths) {
            if (err)
                reject(err);
            var merged = [].concat.apply([], files.concat([paths.map(function (s) { return "/internal/" + s; })]));
            console.log(merged);
            var filtered = merged.filter(function (f, i) { return f.indexOf('.d.ts') !== -1; });
            var final = filtered.filter(function (s) { return s !== 'index.d.ts'; });
            resolve(final);
        });
    });
}
exports.aggreateDefinitionFiles = aggreateDefinitionFiles;


/***/ },
/* 4 */
/***/ function(module, exports) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function buildDefinitionFile(definitions) {
    return new Promise(function (resolve, reject) {
        var header = "// Type definitions for Neo4j Javascript Driver v1.1\r\n// Project: https://github.com/neo4j/neo4j-javascript-driver/\r\n// Definitions by: Gaston Ndanyuzwe <https://github.com/ngasst>\r\n// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped\r\n// Documentation : https://neo4j.com/docs/api/javascript-driver/current/";
        var references = "/// <reference types='node' />\r\n/// <reference types='ws' />";
        var open = "declare module \"neo4j-driver\" {\r\nimport * as WebSocket from 'ws';\r\nimport { Subscription } from '@reactivex/rxjs';";
        var close = "}";
        var final = header
            .concat("\r\n")
            .concat(references)
            .concat("\r\n")
            .concat(open)
            .concat("\r\n")
            .concat(definitions)
            .concat("\r\n")
            .concat(close);
        resolve(final);
    });
}
exports.buildDefinitionFile = buildDefinitionFile;


/***/ },
/* 5 */
/***/ function(module, exports) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cleanDefinitionFile(file) {
    return new Promise(function (resolve, reject) {
        var cleanOne = cleanImports(file);
        var cleanTwo = cleanDeclares(cleanOne);
        resolve(cleanTwo);
    });
}
exports.cleanDefinitionFile = cleanDefinitionFile;
function cleanImports(st) {
    var clean = st.replace(/(import[^;]+;\s+)/g, '');
    return clean;
}
function cleanDeclares(st) {
    var clean = st.replace(/(\sdeclare\s)/g, ' ');
    return clean;
}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __webpack_require__(0);
var chalk = __webpack_require__(2);
var Path = __webpack_require__(1);
function extractContentsFromFiles(names) {
    return new Promise(function (resolve, reject) {
        var p = names.map(function (f) {
            var c;
            var path = Path.join(process.cwd(), f);
            return new Promise(function (resolve, reject) {
                fs_extra_1.readFile(path, function (err, data) {
                    if (err)
                        reject(err);
                    c = {
                        file: f,
                        content: data.toString()
                    };
                    console.log(chalk.blue('[' + f + ']') + "=>" + chalk.magenta('OK'));
                    resolve(c);
                });
            });
        });
        Promise.all(p)
            .then(function (contents) {
            resolve(contents);
        })
            .catch(function (err) { return reject(err); });
    });
}
exports.extractContentsFromFiles = extractContentsFromFiles;


/***/ },
/* 7 */
/***/ function(module, exports) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mergeFilesIntoOne(contents) {
    return new Promise(function (resolve, reject) {
        var ordered = contents.sort(function (a, b) { return +(a.file > b.file) || +(a.file === b.file) - 1; });
        var defs = ordered.reduce(function (acc, val) { return acc.concat(("\r\n\r\n//" + val.file + "\r\n\r\n").concat(val.content)); }, "");
        resolve(defs);
    });
}
exports.mergeFilesIntoOne = mergeFilesIntoOne;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __webpack_require__(0);
var Path = __webpack_require__(1);
function writeDefinitionFile(file, path) {
    return new Promise(function (resolve, reject) {
        var resPath = Path.resolve(path);
        fs_extra_1.writeFile(resPath, file, function (err) {
            if (err)
                reject(err);
            resolve(resPath);
        });
    });
}
exports.writeDefinitionFile = writeDefinitionFile;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = __webpack_require__(2);
var fs_extra_1 = __webpack_require__(0);
var aggregate_definition_files_1 = __webpack_require__(3);
var extract_contents_from_files_1 = __webpack_require__(6);
var merge_files_into_one_1 = __webpack_require__(7);
var build_definition_file_1 = __webpack_require__(4);
var write_definition_file_1 = __webpack_require__(8);
var clean_definition_file_1 = __webpack_require__(5);
var Path = __webpack_require__(1);
generate('./index.d.ts')
    .then(function () {
    console.log(chalk.grey('Done!'));
})
    .catch(function (err) {
    console.error(chalk.red(err));
});
function generate(outPath) {
    return new Promise(function (resolve, reject) {
        var path = Path.resolve('.');
        fs_extra_1.readdir(path, function (err, files) {
            if (err)
                reject(err);
            Promise.resolve()
                .then(function () {
                return aggregate_definition_files_1.aggreateDefinitionFiles(files);
            })
                .then(function (filtered) {
                return extract_contents_from_files_1.extractContentsFromFiles(filtered);
            })
                .then(function (contents) {
                return merge_files_into_one_1.mergeFilesIntoOne(contents);
            })
                .then(function (file) {
                return clean_definition_file_1.cleanDefinitionFile(file);
            })
                .then(function (definitions) {
                return build_definition_file_1.buildDefinitionFile(definitions);
            })
                .then(function (file) {
                return write_definition_file_1.writeDefinitionFile(file, outPath);
            })
                .then(function (path) {
                console.log(chalk.yellow("Definitions file saved at: " + path));
                resolve(true);
            })
                .catch(function (err) { return reject(err); });
        });
    });
}


/***/ }
/******/ ]);
//# sourceMappingURL=generate.js.map