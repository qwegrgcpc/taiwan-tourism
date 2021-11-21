class Scroll {
    static get top() {
        return Math.max(document.documentElement.scrollTop || document.body.scrollTop);
    }
    static get clientHeight() {
        return Math.max(document.documentElement.clientHeight || document.body.clientHeight);
    }
    static get clientWidth() {
        return Math.max(document.documentElement.clientWidth || document.body.clientWidth);
    }
    static get height() {
        return Math.max(document.documentElement.scrollHeight || document.body.scrollHeight);
    }
    static get width() {
        return Math.max(document.documentElement.scrollWidth || document.body.scrollWidth);
    }
    static get bottom() {
        return Scroll.height - Scroll.clientHeight - Scroll.top;
    }
}

const on = (function () {
    if (document.addEventListener) {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();

/**
 * 降低事件執行頻率
 */
const downsampler = (function () {
    let result = null;
    return function (time, func) {
        if (!result) {
            result = setTimeout(function () {
                func();
                result = null;
            }, time);
        }
    }
})();



export default {
    install: (app) => {
        app.directive("infinite-scroll", (el, binding) => {
            on(window, 'scroll', function () {
                if (typeof binding.value === "function" && Scroll.bottom <= 50) {   // 小於50就觸發
                    downsampler(50, binding.value);  // 降低觸發頻率
                }
            })
        });
    }
}