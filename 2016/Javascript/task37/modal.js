"use strict";

var Util = function () {
    var myEvent = function () {
        var cache = {},
            _listen,
            _remove,
            _trigger;
        _listen = function _listen(key, fn) {
            if (cache[key] == undefined) {
                cache[key] = [fn];
            } else {
                cache[key].push(fn);
            }
        };
        _remove = function _remove(key) {
            if (cache[key]) {
                delete cache[key];
            }
        };
        _trigger = function _trigger(key) {
            if (cache[key]) {
                for (var i = 0; i < cache[key].length; i++) {
                    cache[key][i]();
                }
            }
        };
        return {
            listen: function listen(key, fn) {
                _listen(key, fn);
            },
            remove: function remove(key) {
                _remove(key);
            },
            trigger: function trigger(key) {
                _trigger(key);
            }
        };
    }();

    var addClass = function addClass(element, newClassName) {
        var classNames = element.className.split(/\s+/);
        classNames.push(newClassName);
        element.className = classNames.join(" ");
    };

    var EventUtil = {
        addHandler: function addHandler(ele, type, handler) {
            if (ele.addEventListener) {
                ele.addEventListener(type, handler, false);
            } else if (ele.attachEvent) {
                ele.attachEvent("on" + type, handler);
            }
        },
        getEvent: function getEvent(event) {
            return event ? event : window.event;
        },
        getTarget: function getTarget(event) {
            return event.target || event.srcElement;
        },
        preventDefault: function preventDefault(event) {
            //阻止浏览器默认行为
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },
        removeHandler: function removeHandler(ele, type, handler) {
            if (ele.removeEventListener) {
                ele.removeEventListener(type.handler, false);
            } else if (ele.detachEvent) {
                ele.detachEvent("on" + type, handler);
            } else {
                ele["on" + type] = null;
            }
        },
        stopPropagation: function stopPropagation(event) {
            //阻止事件冒泡
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        }
    };

    var modal = {
        domReady: false,
        addCon: function addCon(element, con) {
            if (con) {
                element.textContent = con;
            }
        },
        createEle: function createEle(tag, parent, classy, con) {
            var newTag = document.createElement(tag);
            parent.appendChild(newTag);
            addClass(newTag, classy);
            this.addCon(newTag, con);
            return newTag;
        },
        renderDom: function renderDom(modalBox) {
            var container = this.createEle('div', modalBox, 'modal-container');
            var title = this.createEle('div', container, 'modal-title', modalConfig.titleText);
            var con = this.createEle('div', container, 'modal-con', modalConfig.conText);
            var btn = this.createEle('div', container, 'modal-btn');
            this.createEle('button', btn, 'modal-btn-yes', '确认');
            this.createEle('button', btn, 'modal-btn-no', '取消');
            this.domReady = true;
        },
        bindBtn: function bindBtn(success, cancel) {
            var yes = document.getElementsByClassName('modal-btn-yes')[0],
                no = document.getElementsByClassName('modal-btn-no')[0];

            // EventUtil.addHandler('click', yes, success);
            // EventUtil.addHandler('click', no, cancel);

            yes.addEventListener('click', function () {
                success();
            }, false);
            no.addEventListener('click', function () {
                cancel();
            }, false);
        },
        drag: function drag(targetEle) {
            console.log('drag函数执行');
            var params = {
                left: targetEle.style.left,
                top: targetEle.style.top,
                currentX: 0,
                currentY: 0,
                isDrag: false
            };

            targetEle.addEventListener('mousedown', function (e) {
                console.log(e);
                params.currentX = e.clientX;
                params.currentY = e.clientY;
                params.isDrag = true;
            }, false);

            targetEle.addEventListener('mousemove', function (e) {
                e = event ? event : window.event;
                if (params.isDrag) {
                    var nowX = e.clientX,
                        nowY = e.clientY;
                    var disX = nowX - params.currentX,
                        disY = nowY - params.currentY;

                    targetEle.style.left = Number(params.left) + disX + "px";
                    targetEle.style.top = Number(params.top) + disY + "px";
                }
            }, false);

            targetEle.addEventListener('mouseup', function () {
                params.isDrag = false;
            }, false);
        }
    };

    return {
        myEvent: myEvent,
        modal: modal,
        EventUtil: EventUtil
    };
}();

var Modal = function Modal(config) {
    var _config = {
        modalBox: config.modalBox,
        backgroundScroll: config.backgroundScroll || true,
        titleText: config.titleText || "浮出层的标题",
        conText: config.conText || "我是浮出层的内容",
        success: config.success || success,
        cancel: config.cancel || cancel,
        dragWrap: config.dragWrap || false
    };

    var event = Util.myEvent;
    var modal = Util.modal;

    event.listen('init', function () {
        modal.renderDom(_config.modalBox);
        modal.bindBtn(_config.success, _config.cancel);
    });
    event.listen('drag', function () {
        if (_config.dragWrap) {
            if (modal.domReady) {
                var _modal = document.getElementsByClassName('modal-container')[0];
                modal.drag(_modal);
            }
        }
    });

    return {
        init: function init() {
            event.trigger('init');
        },
        drag: function drag() {
            event.trigger('drag');
        },
        addFun: function addFun(eventName, fn) {
            event.listen(eventName, fn);
            event.trigger(eventName);
        },
        removeFun: function removeFun(eventName) {
            event.remove(eventName);
            event.trigger(eventName);
        }
    };
};
