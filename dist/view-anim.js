(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ViewAnimation"] = factory();
	else
		root["ViewAnimation"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(1).default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _debounce = __webpack_require__(2);

var _debounce2 = _interopRequireDefault(_debounce);

var _viewElement = __webpack_require__(4);

var _viewElement2 = _interopRequireDefault(_viewElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewAnimation = function () {
    function ViewAnimation(options) {
        _classCallCheck(this, ViewAnimation);

        this.options = options ? Object.assign(this.getDefaults(), this.check(options)) : this.getDefaults();
        this.viewElements = [];
    }

    _createClass(ViewAnimation, [{
        key: 'init',
        value: function init() {
            var _this = this;

            var elements = document.querySelectorAll('[data-animation]');
            for (var i = elements.length - 1; i >= 0; i--) {
                this.registerElement(elements[i]);
            }

            this.log('Registered: ' + this.viewElements.length);

            this.scrollListener = window.addEventListener('scroll', (0, _debounce2.default)(16, function () {
                return _this.checkViewAnimations();
            }));
            this.resizeListener = window.addEventListener('resize', function () {
                return _this.viewElements.forEach(function (el) {
                    return el.setSize();
                });
            });
            return this;
        }
    }, {
        key: 'registerElement',
        value: function registerElement(element) {
            if (element.hasAttribute('data-animation') && this.checkCompatibility(element)) {
                var delay = element.getAttribute('data-delay'),
                    offset = element.getAttribute('data-offset'),
                    viewClass = element.getAttribute('data-animation'),
                    full = element.getAttribute('data-full'),
                    repeat = element.hasAttribute('data-repeat');

                if (delay) {
                    element.style.animationDelay = delay + "ms";
                }

                if (offset) {
                    offset = parseInt(offset);
                }

                element.style.animationFillMode = "backwards";

                var viewElement = new _viewElement2.default(element, offset, repeat, viewClass);
                this.viewElements.push(viewElement);
                return viewElement;
            } else {
                this.log("Attemted to register element without a data-animation attribute. " + element);
            }
        }
    }, {
        key: 'checkViewAnimations',
        value: function checkViewAnimations() {
            for (var i = this.viewElements.length - 1; i >= 0; i--) {
                var el = this.viewElements[i],
                    animated = el.animated;
                if (this.isElementInViewport(el.element, el.element.getBoundingClientRect(), el.offset)) {
                    if (!animated) {
                        el.animate();
                    }
                    // remove if the element shouldn't repeat
                    if (!el.repeat) {
                        this.viewElements.splice(i, 1);
                        if (!this.viewElements) document.removeEventListener(this.scrollListener);
                    }
                } else if (animated && el.repeat) {
                    // reset animation
                    el.reset();
                }
            }
        }
    }, {
        key: 'check',
        value: function check(options) {
            for (option in options) {
                switch (options[option]) {
                    case 'checkHorizontal':
                    case 'debug':
                        if (typeof option !== "boolean") options[option] = this.getDefaults()[option];
                        break;
                }
            }
            return options;
        }
    }, {
        key: 'getDefaults',
        value: function getDefaults() {
            return {
                checkHorizontal: false,
                debug: true
            };
        }
    }, {
        key: 'checkCompatibility',
        value: function checkCompatibility(element) {
            // this script does not support SVG in IE
            if ((navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) && element instanceof SVGElement) {
                element.setAttribute("class", element.getAttribute("class") + " " + element.getAttribute("data-animation"));
                element.style.animationFillMode = "forwards";
                this.log("SVG element detected on Internet Explorer " + element);
                return false;
            }
            return true;
        }
    }, {
        key: 'isElementInViewport',
        value: function isElementInViewport(element, rect) {
            var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            var inViewHorizontal = this.options.checkHorizontal ? rect.left >= 0 && rect.right <= (window.innerWidth || document.documentElement.clientWidth) : true;
            console.log(window.pageYOffset + ' is width: ' + window.innerHeight);
            return rect.top + window.pageYOffset <= window.pageYOffset + window.innerHeight && rect.bottom + window.pageYOffset >= window.pageYOffset && inViewHorizontal;
        }
    }, {
        key: 'isInteger',
        value: function isInteger(value) {
            return value && value % 1 === 0;
        }

        /**
         * Prints the given message to the console if this.options.debug is true.
         * 
         * @param {*} msg 
         */

    }, {
        key: 'log',
        value: function log(msg) {
            this.options.debug && console.log(msg);
        }
    }]);

    return ViewAnimation;
}();

exports.default = ViewAnimation;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-undefined */

var throttle = __webpack_require__(3);

/**
 * Debounce execution of a function. Debouncing, unlike throttling,
 * guarantees that a function is only executed a single time, either at the
 * very beginning of a series of calls, or at the very end.
 *
 * @param  {Number}   delay         A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}  atBegin       Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed `delay` milliseconds
 *                                  after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
 *                                  (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
 * @param  {Function} callback      A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                  to `callback` when the debounced-function is executed.
 *
 * @return {Function} A new, debounced function.
 */
module.exports = function ( delay, atBegin, callback ) {
	return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/* eslint-disable no-undefined,no-param-reassign,no-shadow */

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param  {Number}    delay          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}   noTrailing     Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
 *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
 *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
 *                                    the internal counter is reset)
 * @param  {Function}  callback       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                    to `callback` when the throttled-function is executed.
 * @param  {Boolean}   debounceMode   If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
 *                                    schedule `callback` to execute after `delay` ms.
 *
 * @return {Function}  A new, throttled, function.
 */
module.exports = function ( delay, noTrailing, callback, debounceMode ) {

	// After wrapper has stopped being called, this timeout ensures that
	// `callback` is executed at the proper times in `throttle` and `end`
	// debounce modes.
	var timeoutID;

	// Keep track of the last time `callback` was executed.
	var lastExec = 0;

	// `noTrailing` defaults to falsy.
	if ( typeof noTrailing !== 'boolean' ) {
		debounceMode = callback;
		callback = noTrailing;
		noTrailing = undefined;
	}

	// The `wrapper` function encapsulates all of the throttling / debouncing
	// functionality and when executed will limit the rate at which `callback`
	// is executed.
	function wrapper () {

		var self = this;
		var elapsed = Number(new Date()) - lastExec;
		var args = arguments;

		// Execute `callback` and update the `lastExec` timestamp.
		function exec () {
			lastExec = Number(new Date());
			callback.apply(self, args);
		}

		// If `debounceMode` is true (at begin) this is used to clear the flag
		// to allow future `callback` executions.
		function clear () {
			timeoutID = undefined;
		}

		if ( debounceMode && !timeoutID ) {
			// Since `wrapper` is being called for the first time and
			// `debounceMode` is true (at begin), execute `callback`.
			exec();
		}

		// Clear any existing timeout.
		if ( timeoutID ) {
			clearTimeout(timeoutID);
		}

		if ( debounceMode === undefined && elapsed > delay ) {
			// In throttle mode, if `delay` time has been exceeded, execute
			// `callback`.
			exec();

		} else if ( noTrailing !== true ) {
			// In trailing throttle mode, since `delay` time has not been
			// exceeded, schedule `callback` to execute `delay` ms after most
			// recent execution.
			//
			// If `debounceMode` is true (at begin), schedule `clear` to execute
			// after `delay` ms.
			//
			// If `debounceMode` is false (at end), schedule `callback` to
			// execute after `delay` ms.
			timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
		}

	}

	// Return the wrapper function.
	return wrapper;

};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewElement = function () {
	function ViewElement(element, offset, repeat, viewClass) {
		_classCallCheck(this, ViewElement);

		this.element = element;
		this.offset = offset;
		this.repeat = repeat;
		this.viewClass = viewClass;
		this.animated = false;
		this.setSize();
	}

	_createClass(ViewElement, [{
		key: "setSize",
		value: function setSize() {
			var bounds = this.element.getBoundingClientRect(),
			    offsetTop = bounds.top + window.pageYOffset - document.documentElement.clientTop;
			if (!this.bounds) {
				this.bounds = {
					top: offsetTop,
					right: bounds.right,
					bottom: offsetTop + bounds.height,
					left: bounds.left
				};
			} else {
				this.bounds.top = offsetTop, this.bounds.right = bounds.right, this.bounds.bottom = offsetTop + bounds.height, this.bounds.left = bounds.left;
			}
		}
	}, {
		key: "animate",
		value: function animate() {
			this.element.style.animationFillMode = "forwards";
			this.element.classList.add(this.viewClass);
			this.animated = true;
		}
	}, {
		key: "reset",
		value: function reset() {
			this.element.classList.remove(this.viewClass);
			this.element.style.animationFillMode = "backwards";
			this.animated = false;
		}
	}]);

	return ViewElement;
}();

exports.default = ViewElement;

/***/ })
/******/ ]);
});