/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app/content.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/content.ts":
/*!****************************!*\
  !*** ./src/app/content.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

chrome.runtime.sendMessage({}, (response) => {
    const checkReady = setInterval(() => {
        if (document.readyState === "complete") {
            clearInterval(checkReady);
            detectHistoryChangeAndUpdate();
            detectNavStyleChangeAndReposition();
            detectScrollAndRemoveFillers();
            makeStyleClasses();
            updateUI();
        }
    });
});
function updateUI() {
    pressContinueInChrome();
    pressCloseOnOpenAppPopup();
    moveNavTop();
    hidePostTopAd();
}
function makeStyleClasses() {
    const head = document.querySelector("head");
    head.innerHTML += `
    <style>
      .pt-49px {
        padding-top: 49px !important;
      }
      .pt-96px {
        padding-top: 96px !important;
      }
    </style>
  `;
}
function pressContinueInChrome() {
    const el = document.querySelector("#jsid-app > div.overlay.overlay-bottom-sheet.bottom-sheet.open-in-app > div > div > div > ul > li:nth-child(4) > a");
    if (el) {
        el.click();
    }
}
function pressCloseOnOpenAppPopup() {
    const el = document.querySelector("#jsid-app > div:nth-child(2) > div > div.content-wrap > div.list-view > div.footer > div > a > div.download-app-close");
    if (el) {
        el.click();
    }
}
function moveNavTop() {
    const isPost = location.pathname.startsWith("/gag/");
    const el1 = document.querySelector("#jsid-app > div:nth-child(1)");
    if (el1) {
        el1.style.top = "0px";
    }
    const el2 = document.querySelector("#jsid-app > div:nth-child(2)");
    if (el2) {
        if (isPost) {
            el2.classList.remove("pt-96px");
            el2.classList.add("pt-49px");
        }
        else {
            el2.classList.remove("pt-49px");
            el2.classList.add("pt-96px");
        }
    }
    const el3 = document.querySelector("#jsid-ad-container-page_adhesion");
    if (el3) {
        el3.style.minHeight = "0px";
        el3.style.maxHeight = "0px";
    }
    if (isPost) {
        const useAppBtn = document.querySelector("#jsid-app > div:nth-child(1) > header > div.right.use-app > a");
        if (useAppBtn) {
            useAppBtn.remove();
        }
    }
}
function detectNavStyleChangeAndReposition() {
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutationRecord) {
            const el = mutationRecord.target;
            if (el) {
                if (!el.style.top.startsWith("-")) {
                    el.style.top = "0px";
                }
            }
        });
    });
    const target = document.querySelector("#jsid-app > div:nth-child(1)");
    if (target) {
        observer.observe(target, { attributes: true, attributeFilter: ["style"] });
    }
}
function detectHistoryChangeAndUpdate() {
    let lastState = location.pathname;
    const body = document.querySelector("body");
    body.addEventListener("click", function (event) {
        setTimeout(() => {
            if (lastState === location.pathname)
                return;
            lastState = location.pathname;
            updateUI();
        }, 200);
    });
}
function detectScrollAndRemoveFillers() {
    let distanceScrolled = 0;
    const threshold = 300;
    window.onscroll = function () {
        const distance = Math.abs(document.documentElement.scrollTop - distanceScrolled);
        if (distance < threshold)
            return;
        distanceScrolled = document.documentElement.scrollTop;
        const promotions = document.querySelectorAll('article a[href="https://9gag.com/advertise?ref=post-section"]');
        for (const promo of promotions) {
            const parentEl = findParent(promo, ".post-cell");
            if (parentEl && parentEl.style.display !== "none") {
                parentEl.style.display = "none";
            }
        }
        const signUpListBanner = document.querySelectorAll("div > div.post-signup-list-banner");
        for (const banner of signUpListBanner) {
            if (banner.style.display === "none")
                return;
            banner.style.display = "none";
        }
        const ads = document.querySelectorAll('div > section.salt-container');
        for (const ad of ads) {
            if (ad.style.display === "none")
                return;
            ad.style.display = "none";
        }
    };
}
function hidePostTopAd() {
    const isPost = location.pathname.startsWith("/gag/");
    if (!isPost)
        return;
    const el = document.querySelector("#jsid-app > div > div > div.content-wrap > div:nth-child(2) > div > section.salt-container.above-comment");
    if (el) {
        el.style.display = "none";
    }
}
function findParent(el, selector) {
    let parent = el.parentElement;
    while (parent) {
        if (parent.matches(selector)) {
            return parent;
        }
        parent = parent.parentElement;
    }
    return null;
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtJQUMxQyxNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO1FBQ2xDLElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxVQUFVLEVBQUU7WUFDdEMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzFCLDRCQUE0QixFQUFFLENBQUM7WUFDL0IsaUNBQWlDLEVBQUUsQ0FBQztZQUNwQyw0QkFBNEIsRUFBRSxDQUFDO1lBQy9CLGdCQUFnQixFQUFFLENBQUM7WUFDbkIsUUFBUSxFQUFFLENBQUM7U0FDWjtJ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LE1BQU0sR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDO0lBQzlCLE9BQU8sTUFBTSxFQUFFO1FBQ2IsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzVCLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7UUFDRCxNQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztLQUMvQjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyIsImZpbGUiOiJjb250ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYXBwL2NvbnRlbnQudHNcIik7XG4iLCJjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7fSwgKHJlc3BvbnNlKSA9PiB7XHJcbiAgY29uc3QgY2hlY2tSZWFkeSA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIpIHtcclxuICAgICAgY2xlYXJJbnRlcnZhbChjaGVja1JlYWR5KTtcclxuICAgICAgZGV0ZWN0SGlzdG9yeUNoYW5nZUFuZFVwZGF0ZSgpO1xyXG4gICAgICBkZXRlY3ROYXZTdHlsZUNoYW5nZUFuZFJlcG9zaXRpb24oKTtcclxuICAgICAgZGV0ZWN0U2Nyb2xsQW5kUmVtb3ZlRmlsbGVycygpO1xyXG4gICAgICBtYWtlU3R5bGVDbGFzc2VzKCk7XHJcbiAgICAgIHVwZGF0ZVVJKCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlVUkoKSB7XHJcbiAgcHJlc3NDb250aW51ZUluQ2hyb21lKCk7XHJcbiAgcHJlc3NDbG9zZU9uT3BlbkFwcFBvcHVwKCk7XHJcbiAgbW92ZU5hdlRvcCgpO1xyXG4gIGhpZGVQb3N0VG9wQWQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZVN0eWxlQ2xhc3NlcygpIHtcclxuICBjb25zdCBoZWFkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImhlYWRcIik7XHJcbiAgaGVhZC5pbm5lckhUTUwgKz0gYFxyXG4gICAgPHN0eWxlPlxyXG4gICAgICAucHQtNDlweCB7XHJcbiAgICAgICAgcGFkZGluZy10b3A6IDQ5cHggIWltcG9ydGFudDtcclxuICAgICAgfVxyXG4gICAgICAucHQtOTZweCB7XHJcbiAgICAgICAgcGFkZGluZy10b3A6IDk2cHggIWltcG9ydGFudDtcclxuICAgICAgfVxyXG4gICAgPC9zdHlsZT5cclxuICBgO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwcmVzc0NvbnRpbnVlSW5DaHJvbWUoKSB7XHJcbiAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgXCIjanNpZC1hcHAgPiBkaXYub3ZlcmxheS5vdmVybGF5LWJvdHRvbS1zaGVldC5ib3R0b20tc2hlZXQub3Blbi1pbi1hcHAgPiBkaXYgPiBkaXYgPiBkaXYgPiB1bCA+IGxpOm50aC1jaGlsZCg0KSA+IGFcIlxyXG4gICk7XHJcbiAgaWYgKGVsKSB7XHJcbiAgICAoZWwgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpLmNsaWNrKCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwcmVzc0Nsb3NlT25PcGVuQXBwUG9wdXAoKSB7XHJcbiAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgXCIjanNpZC1hcHAgPiBkaXY6bnRoLWNoaWxkKDIpID4gZGl2ID4gZGl2LmNvbnRlbnQtd3JhcCA+IGRpdi5saXN0LXZpZXcgPiBkaXYuZm9vdGVyID4gZGl2ID4gYSA+IGRpdi5kb3dubG9hZC1hcHAtY2xvc2VcIlxyXG4gICk7XHJcbiAgaWYgKGVsKSB7XHJcbiAgICAoZWwgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpLmNsaWNrKCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBtb3ZlTmF2VG9wKCkge1xyXG4gIGNvbnN0IGlzUG9zdCA9IGxvY2F0aW9uLnBhdGhuYW1lLnN0YXJ0c1dpdGgoXCIvZ2FnL1wiKTtcclxuXHJcbiAgY29uc3QgZWwxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqc2lkLWFwcCA+IGRpdjpudGgtY2hpbGQoMSlcIik7XHJcbiAgaWYgKGVsMSkge1xyXG4gICAgKGVsMSBhcyBIVE1MRGl2RWxlbWVudCkuc3R5bGUudG9wID0gXCIwcHhcIjtcclxuICB9XHJcbiAgY29uc3QgZWwyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqc2lkLWFwcCA+IGRpdjpudGgtY2hpbGQoMilcIik7XHJcbiAgaWYgKGVsMikge1xyXG4gICAgaWYgKGlzUG9zdCkge1xyXG4gICAgICAoZWwyIGFzIEhUTUxEaXZFbGVtZW50KS5jbGFzc0xpc3QucmVtb3ZlKFwicHQtOTZweFwiKTtcclxuICAgICAgKGVsMiBhcyBIVE1MRGl2RWxlbWVudCkuY2xhc3NMaXN0LmFkZChcInB0LTQ5cHhcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAoZWwyIGFzIEhUTUxEaXZFbGVtZW50KS5jbGFzc0xpc3QucmVtb3ZlKFwicHQtNDlweFwiKTtcclxuICAgICAgKGVsMiBhcyBIVE1MRGl2RWxlbWVudCkuY2xhc3NMaXN0LmFkZChcInB0LTk2cHhcIik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGNvbnN0IGVsMyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjanNpZC1hZC1jb250YWluZXItcGFnZV9hZGhlc2lvblwiKTtcclxuICBpZiAoZWwzKSB7XHJcbiAgICAoZWwzIGFzIEhUTUxEaXZFbGVtZW50KS5zdHlsZS5taW5IZWlnaHQgPSBcIjBweFwiO1xyXG4gICAgKGVsMyBhcyBIVE1MRGl2RWxlbWVudCkuc3R5bGUubWF4SGVpZ2h0ID0gXCIwcHhcIjtcclxuICB9XHJcblxyXG4gIGlmIChpc1Bvc3QpIHtcclxuICAgIGNvbnN0IHVzZUFwcEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiI2pzaWQtYXBwID4gZGl2Om50aC1jaGlsZCgxKSA+IGhlYWRlciA+IGRpdi5yaWdodC51c2UtYXBwID4gYVwiXHJcbiAgICApO1xyXG4gICAgaWYgKHVzZUFwcEJ0bikge1xyXG4gICAgICB1c2VBcHBCdG4ucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZXRlY3ROYXZTdHlsZUNoYW5nZUFuZFJlcG9zaXRpb24oKSB7XHJcbiAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XHJcbiAgICBtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAobXV0YXRpb25SZWNvcmQpIHtcclxuICAgICAgY29uc3QgZWwgPSBtdXRhdGlvblJlY29yZC50YXJnZXQgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgIGlmIChlbCkge1xyXG4gICAgICAgIGlmICghZWwuc3R5bGUudG9wLnN0YXJ0c1dpdGgoXCItXCIpKSB7XHJcbiAgICAgICAgICBlbC5zdHlsZS50b3AgPSBcIjBweFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjanNpZC1hcHAgPiBkaXY6bnRoLWNoaWxkKDEpXCIpO1xyXG4gIGlmICh0YXJnZXQpIHtcclxuICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0LCB7IGF0dHJpYnV0ZXM6IHRydWUsIGF0dHJpYnV0ZUZpbHRlcjogW1wic3R5bGVcIl0gfSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZXRlY3RIaXN0b3J5Q2hhbmdlQW5kVXBkYXRlKCkge1xyXG4gIGxldCBsYXN0U3RhdGUgPSBsb2NhdGlvbi5wYXRobmFtZTtcclxuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XHJcbiAgYm9keS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYgKGxhc3RTdGF0ZSA9PT0gbG9jYXRpb24ucGF0aG5hbWUpIHJldHVybjtcclxuICAgICAgbGFzdFN0YXRlID0gbG9jYXRpb24ucGF0aG5hbWU7XHJcbiAgICAgIHVwZGF0ZVVJKCk7XHJcbiAgICB9LCAyMDApO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZXRlY3RTY3JvbGxBbmRSZW1vdmVGaWxsZXJzKCkge1xyXG4gIGxldCBkaXN0YW5jZVNjcm9sbGVkID0gMDtcclxuICBjb25zdCB0aHJlc2hvbGQgPSAzMDA7XHJcbiAgd2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLmFicyhcclxuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCAtIGRpc3RhbmNlU2Nyb2xsZWRcclxuICAgICk7XHJcbiAgICBpZiAoZGlzdGFuY2UgPCB0aHJlc2hvbGQpIHJldHVybjtcclxuICAgIGRpc3RhbmNlU2Nyb2xsZWQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG5cclxuICAgIGNvbnN0IHByb21vdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxyXG4gICAgICAnYXJ0aWNsZSBhW2hyZWY9XCJodHRwczovLzlnYWcuY29tL2FkdmVydGlzZT9yZWY9cG9zdC1zZWN0aW9uXCJdJ1xyXG4gICAgKTtcclxuICAgIGZvciAoY29uc3QgcHJvbW8gb2YgcHJvbW90aW9ucykge1xyXG4gICAgICBjb25zdCBwYXJlbnRFbCA9IGZpbmRQYXJlbnQocHJvbW8sIFwiLnBvc3QtY2VsbFwiKTtcclxuICAgICAgaWYgKHBhcmVudEVsICYmIHBhcmVudEVsLnN0eWxlLmRpc3BsYXkgIT09IFwibm9uZVwiKSB7XHJcbiAgICAgICAgcGFyZW50RWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2lnblVwTGlzdEJhbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXHJcbiAgICAgIFwiZGl2ID4gZGl2LnBvc3Qtc2lnbnVwLWxpc3QtYmFubmVyXCJcclxuICAgICk7XHJcbiAgICBmb3IgKGNvbnN0IGJhbm5lciBvZiBzaWduVXBMaXN0QmFubmVyKSB7XHJcbiAgICAgIGlmICgoYmFubmVyIGFzIEhUTUxEaXZFbGVtZW50KS5zdHlsZS5kaXNwbGF5ID09PSBcIm5vbmVcIikgcmV0dXJuO1xyXG4gICAgICAoYmFubmVyIGFzIEhUTUxEaXZFbGVtZW50KS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2ID4gc2VjdGlvbi5zYWx0LWNvbnRhaW5lcicpXHJcbiAgICBmb3IgKGNvbnN0IGFkIG9mIGFkcykge1xyXG4gICAgICBpZiAoKGFkIGFzIEhUTUxEaXZFbGVtZW50KS5zdHlsZS5kaXNwbGF5ID09PSBcIm5vbmVcIikgcmV0dXJuO1xyXG4gICAgICAoYWQgYXMgSFRNTERpdkVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH1cclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBoaWRlUG9zdFRvcEFkKCkge1xyXG4gIGNvbnN0IGlzUG9zdCA9IGxvY2F0aW9uLnBhdGhuYW1lLnN0YXJ0c1dpdGgoXCIvZ2FnL1wiKTtcclxuICBpZiAoIWlzUG9zdCkgcmV0dXJuO1xyXG4gIGNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgIFwiI2pzaWQtYXBwID4gZGl2ID4gZGl2ID4gZGl2LmNvbnRlbnQtd3JhcCA+IGRpdjpudGgtY2hpbGQoMikgPiBkaXYgPiBzZWN0aW9uLnNhbHQtY29udGFpbmVyLmFib3ZlLWNvbW1lbnRcIlxyXG4gICk7XHJcbiAgaWYgKGVsKSB7XHJcbiAgICAoZWwgYXMgSFRNTERpdkVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRQYXJlbnQoZWw6IEVsZW1lbnQsIHNlbGVjdG9yOiBzdHJpbmcpIHtcclxuICBsZXQgcGFyZW50ID0gZWwucGFyZW50RWxlbWVudDtcclxuICB3aGlsZSAocGFyZW50KSB7XHJcbiAgICBpZiAocGFyZW50Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XHJcbiAgICAgIHJldHVybiBwYXJlbnQ7XHJcbiAgICB9XHJcbiAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcclxuICB9XHJcbiAgcmV0dXJuIG51bGw7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==