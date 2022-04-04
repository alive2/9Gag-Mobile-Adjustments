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
                console.log("removed promotion");
            }
        }
        const signUpListBanner = document.querySelectorAll("#stream-2 > div.post-signup-list-banner");
        for (const banner of signUpListBanner) {
            if (banner.style.display === "none")
                return;
            banner.style.display = "none";
            console.log("removed sign up list banner");
        }
    };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtJQUMxQyxNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO1FBQ2xDLElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxVQUFVLEVBQUU7WUFDdEMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzFCLDRCQUE0QixFQUFFLENBQUM7WUFDL0IsaUNBQWlDLEVBQUUsQ0FBQztZQUNwQyw0QkFBNEIsRUFBRSxDQUFDO1lBQy9CLGdCQUFnQixFQUFFLENBQUM7WUFDbkIsUUFBUSxFQUFFLENBQUM7U0FDWjtJ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QUssRUFBRSxZQUFZLENBQUMsQ0FBQztZQUNqRCxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxNQUFNLEVBQUU7Z0JBQ2pELFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztnQkFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2FBQ2xDO1NBQ0Y7UUFFRCxNQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FDaEQseUNBQXlDLENBQzFDLENBQUM7UUFDRixLQUFLLE1BQU0sTUFBTSxJQUFJLGdCQUFnQixFQUFFO1lBQ3JDLElBQUssTUFBeUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLE1BQU07Z0JBQUUsT0FBTztZQUMvRCxNQUF5QixDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztTQUM1QztJQUNILENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxTQUFTLFVBQVUsQ0FBQyxFQUFXLEVBQUUsUUFBZ0I7SUFDL0MsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztJQUM5QixPQUFPLE1BQU0sRUFBRTtRQUNiLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM1QixPQUFPLE1BQU0sQ0FBQztTQUNmO1FBQ0QsTUFBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7S0FDL0I7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUMiLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2FwcC9jb250ZW50LnRzXCIpO1xuIiwiY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe30sIChyZXNwb25zZSkgPT4ge1xyXG4gIGNvbnN0IGNoZWNrUmVhZHkgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiKSB7XHJcbiAgICAgIGNsZWFySW50ZXJ2YWwoY2hlY2tSZWFkeSk7XHJcbiAgICAgIGRldGVjdEhpc3RvcnlDaGFuZ2VBbmRVcGRhdGUoKTtcclxuICAgICAgZGV0ZWN0TmF2U3R5bGVDaGFuZ2VBbmRSZXBvc2l0aW9uKCk7XHJcbiAgICAgIGRldGVjdFNjcm9sbEFuZFJlbW92ZUZpbGxlcnMoKTtcclxuICAgICAgbWFrZVN0eWxlQ2xhc3NlcygpO1xyXG4gICAgICB1cGRhdGVVSSgpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVVJKCkge1xyXG4gIHByZXNzQ29udGludWVJbkNocm9tZSgpO1xyXG4gIHByZXNzQ2xvc2VPbk9wZW5BcHBQb3B1cCgpO1xyXG4gIG1vdmVOYXZUb3AoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZVN0eWxlQ2xhc3NlcygpIHtcclxuICBjb25zdCBoZWFkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImhlYWRcIik7XHJcbiAgaGVhZC5pbm5lckhUTUwgKz0gYFxyXG4gICAgPHN0eWxlPlxyXG4gICAgICAucHQtNDlweCB7XHJcbiAgICAgICAgcGFkZGluZy10b3A6IDQ5cHggIWltcG9ydGFudDtcclxuICAgICAgfVxyXG4gICAgICAucHQtOTZweCB7XHJcbiAgICAgICAgcGFkZGluZy10b3A6IDk2cHggIWltcG9ydGFudDtcclxuICAgICAgfVxyXG4gICAgPC9zdHlsZT5cclxuICBgO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwcmVzc0NvbnRpbnVlSW5DaHJvbWUoKSB7XHJcbiAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgXCIjanNpZC1hcHAgPiBkaXYub3ZlcmxheS5vdmVybGF5LWJvdHRvbS1zaGVldC5ib3R0b20tc2hlZXQub3Blbi1pbi1hcHAgPiBkaXYgPiBkaXYgPiBkaXYgPiB1bCA+IGxpOm50aC1jaGlsZCg0KSA+IGFcIlxyXG4gICk7XHJcbiAgaWYgKGVsKSB7XHJcbiAgICAoZWwgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpLmNsaWNrKCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwcmVzc0Nsb3NlT25PcGVuQXBwUG9wdXAoKSB7XHJcbiAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgXCIjanNpZC1hcHAgPiBkaXY6bnRoLWNoaWxkKDIpID4gZGl2ID4gZGl2LmNvbnRlbnQtd3JhcCA+IGRpdi5saXN0LXZpZXcgPiBkaXYuZm9vdGVyID4gZGl2ID4gYSA+IGRpdi5kb3dubG9hZC1hcHAtY2xvc2VcIlxyXG4gICk7XHJcbiAgaWYgKGVsKSB7XHJcbiAgICAoZWwgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpLmNsaWNrKCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBtb3ZlTmF2VG9wKCkge1xyXG4gIGNvbnN0IGlzUG9zdCA9IGxvY2F0aW9uLnBhdGhuYW1lLnN0YXJ0c1dpdGgoXCIvZ2FnL1wiKTtcclxuXHJcbiAgY29uc3QgZWwxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqc2lkLWFwcCA+IGRpdjpudGgtY2hpbGQoMSlcIik7XHJcbiAgaWYgKGVsMSkge1xyXG4gICAgKGVsMSBhcyBIVE1MRGl2RWxlbWVudCkuc3R5bGUudG9wID0gXCIwcHhcIjtcclxuICB9XHJcbiAgY29uc3QgZWwyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqc2lkLWFwcCA+IGRpdjpudGgtY2hpbGQoMilcIik7XHJcbiAgaWYgKGVsMikge1xyXG4gICAgaWYgKGlzUG9zdCkge1xyXG4gICAgICAoZWwyIGFzIEhUTUxEaXZFbGVtZW50KS5jbGFzc0xpc3QucmVtb3ZlKFwicHQtOTZweFwiKTtcclxuICAgICAgKGVsMiBhcyBIVE1MRGl2RWxlbWVudCkuY2xhc3NMaXN0LmFkZChcInB0LTQ5cHhcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAoZWwyIGFzIEhUTUxEaXZFbGVtZW50KS5jbGFzc0xpc3QucmVtb3ZlKFwicHQtNDlweFwiKTtcclxuICAgICAgKGVsMiBhcyBIVE1MRGl2RWxlbWVudCkuY2xhc3NMaXN0LmFkZChcInB0LTk2cHhcIik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGNvbnN0IGVsMyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjanNpZC1hZC1jb250YWluZXItcGFnZV9hZGhlc2lvblwiKTtcclxuICBpZiAoZWwzKSB7XHJcbiAgICAoZWwzIGFzIEhUTUxEaXZFbGVtZW50KS5zdHlsZS5taW5IZWlnaHQgPSBcIjBweFwiO1xyXG4gICAgKGVsMyBhcyBIVE1MRGl2RWxlbWVudCkuc3R5bGUubWF4SGVpZ2h0ID0gXCIwcHhcIjtcclxuICB9XHJcblxyXG4gIGlmIChpc1Bvc3QpIHtcclxuICAgIGNvbnN0IHVzZUFwcEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiI2pzaWQtYXBwID4gZGl2Om50aC1jaGlsZCgxKSA+IGhlYWRlciA+IGRpdi5yaWdodC51c2UtYXBwID4gYVwiXHJcbiAgICApO1xyXG4gICAgaWYgKHVzZUFwcEJ0bikge1xyXG4gICAgICB1c2VBcHBCdG4ucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZXRlY3ROYXZTdHlsZUNoYW5nZUFuZFJlcG9zaXRpb24oKSB7XHJcbiAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XHJcbiAgICBtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAobXV0YXRpb25SZWNvcmQpIHtcclxuICAgICAgY29uc3QgZWwgPSBtdXRhdGlvblJlY29yZC50YXJnZXQgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgIGlmIChlbCkge1xyXG4gICAgICAgIGlmICghZWwuc3R5bGUudG9wLnN0YXJ0c1dpdGgoXCItXCIpKSB7XHJcbiAgICAgICAgICBlbC5zdHlsZS50b3AgPSBcIjBweFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjanNpZC1hcHAgPiBkaXY6bnRoLWNoaWxkKDEpXCIpO1xyXG4gIGlmICh0YXJnZXQpIHtcclxuICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0LCB7IGF0dHJpYnV0ZXM6IHRydWUsIGF0dHJpYnV0ZUZpbHRlcjogW1wic3R5bGVcIl0gfSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZXRlY3RIaXN0b3J5Q2hhbmdlQW5kVXBkYXRlKCkge1xyXG4gIGxldCBsYXN0U3RhdGUgPSBsb2NhdGlvbi5wYXRobmFtZTtcclxuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XHJcbiAgYm9keS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYgKGxhc3RTdGF0ZSA9PT0gbG9jYXRpb24ucGF0aG5hbWUpIHJldHVybjtcclxuICAgICAgbGFzdFN0YXRlID0gbG9jYXRpb24ucGF0aG5hbWU7XHJcbiAgICAgIHVwZGF0ZVVJKCk7XHJcbiAgICB9LCAyMDApO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZXRlY3RTY3JvbGxBbmRSZW1vdmVGaWxsZXJzKCkge1xyXG4gIGxldCBkaXN0YW5jZVNjcm9sbGVkID0gMDtcclxuICBjb25zdCB0aHJlc2hvbGQgPSAzMDA7XHJcbiAgd2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLmFicyhcclxuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCAtIGRpc3RhbmNlU2Nyb2xsZWRcclxuICAgICk7XHJcbiAgICBpZiAoZGlzdGFuY2UgPCB0aHJlc2hvbGQpIHJldHVybjtcclxuICAgIGRpc3RhbmNlU2Nyb2xsZWQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG5cclxuICAgIGNvbnN0IHByb21vdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxyXG4gICAgICAnYXJ0aWNsZSBhW2hyZWY9XCJodHRwczovLzlnYWcuY29tL2FkdmVydGlzZT9yZWY9cG9zdC1zZWN0aW9uXCJdJ1xyXG4gICAgKTtcclxuICAgIGZvciAoY29uc3QgcHJvbW8gb2YgcHJvbW90aW9ucykge1xyXG4gICAgICBjb25zdCBwYXJlbnRFbCA9IGZpbmRQYXJlbnQocHJvbW8sIFwiLnBvc3QtY2VsbFwiKTtcclxuICAgICAgaWYgKHBhcmVudEVsICYmIHBhcmVudEVsLnN0eWxlLmRpc3BsYXkgIT09IFwibm9uZVwiKSB7XHJcbiAgICAgICAgcGFyZW50RWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVtb3ZlZCBwcm9tb3Rpb25cIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzaWduVXBMaXN0QmFubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcclxuICAgICAgXCIjc3RyZWFtLTIgPiBkaXYucG9zdC1zaWdudXAtbGlzdC1iYW5uZXJcIlxyXG4gICAgKTtcclxuICAgIGZvciAoY29uc3QgYmFubmVyIG9mIHNpZ25VcExpc3RCYW5uZXIpIHtcclxuICAgICAgaWYgKChiYW5uZXIgYXMgSFRNTERpdkVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPT09IFwibm9uZVwiKSByZXR1cm47XHJcbiAgICAgIChiYW5uZXIgYXMgSFRNTERpdkVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgY29uc29sZS5sb2coXCJyZW1vdmVkIHNpZ24gdXAgbGlzdCBiYW5uZXJcIik7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmluZFBhcmVudChlbDogRWxlbWVudCwgc2VsZWN0b3I6IHN0cmluZykge1xyXG4gIGxldCBwYXJlbnQgPSBlbC5wYXJlbnRFbGVtZW50O1xyXG4gIHdoaWxlIChwYXJlbnQpIHtcclxuICAgIGlmIChwYXJlbnQubWF0Y2hlcyhzZWxlY3RvcikpIHtcclxuICAgICAgcmV0dXJuIHBhcmVudDtcclxuICAgIH1cclxuICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xyXG4gIH1cclxuICByZXR1cm4gbnVsbDtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9