/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/waredrobe.js":
/*!**************************!*\
  !*** ./src/waredrobe.js ***!
  \**************************/
/***/ (() => {

eval("const waredrobe = document.getElementById(\"waredrobe-item-list\");\r\n\r\n// waredrobe buttons\r\nconst hatsBtn = document.getElementById(\"hats-btn\");\r\nconst shirtsBtn = document.getElementById(\"shirts-btn\");\r\nconst pantsBtn = document.getElementById(\"pants-btn\");\r\nconst shoesBtn = document.getElementById(\"shoes-btn\");\r\nconst bgBtn = document.getElementById(\"backgrounds-btn\");\r\n\r\n// item lists\r\nlet hatsInvetory = [\"../resources/waredrobe/clothing/hats/tempBlueHat.png\"];\r\nlet shirtsInvetory = [];\r\nlet pantsInvetory = [];\r\nlet shoesInvetory = [];\r\nlet backgroundInvetory = [];\r\n\r\n// curr slots\r\nconst hatSlot = document.getElementById(\"hat-slot\");\r\nlet currHat = \"\";\r\n\r\nhatsBtn.addEventListener(\"click\", (e) => {\r\n    if (e.target.classList[0] === \"selected-wardrobe\") {\r\n        return;\r\n    }\r\n    else {\r\n        populateWardrobe(hatsInvetory);\r\n        e.target.classList.add(\"selected-wardrobe\");\r\n        console.log(e.target.classList[0]);\r\n    }\r\n});\r\n\r\nfunction populateWardrobe(inventory) {\r\n    let newIcon = document.createElement(\"img\");\r\n    newIcon.classList.add(\"waredrobe-item-icon\");\r\n    for (let i = 0; i < inventory.length; i++) {\r\n        newIcon.src = inventory[i];\r\n        newIcon.addEventListener(\"click\", () => {\r\n            equipItem(newIcon);\r\n        })\r\n        waredrobe.appendChild(newIcon);\r\n    }\r\n}\r\n\r\nfunction equipItem(item) {\r\n    if (hatSlot.getAttribute(\"src\") === \"\") {\r\n        hatSlot.src = item.src;\r\n    }\r\n    else {\r\n        hatSlot.src = \"\";\r\n    }\r\n}\n\n//# sourceURL=webpack://jivotnoclone/./src/waredrobe.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/waredrobe.js"]();
/******/ 	
/******/ })()
;