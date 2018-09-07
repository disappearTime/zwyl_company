!function(a, b) {
    function c() {
        var b = f.getBoundingClientRect().width;
        b / i > 768 && (b = 768 * i);
        var c = b / 10;
        f.style.fontSize = c + "px",
        k.rem = a.rem = c
    }
    var d, e = a.document, f = e.documentElement, g = e.querySelector('meta[name="viewport"]'), h = e.querySelector('meta[name="flexible"]'), i = 0, j = 0, k = b.flexible || (b.flexible = {});
    if (g) {
        console.warn("将根据已有的meta标签来设置缩放比例");
        var l = g.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
        l && (j = parseFloat(l[1]),
        i = parseInt(1 / j))
    } else if (h) {
        var m = h.getAttribute("content");
        if (m) {
            var n = m.match(/initial\-dpr=([\d\.]+)/)
              , o = m.match(/maximum\-dpr=([\d\.]+)/);
            n && (i = parseFloat(n[1]),
            j = parseFloat((1 / i).toFixed(2))),
            o && (i = parseFloat(o[1]),
            j = parseFloat((1 / i).toFixed(2)))
        }
    }
    if (!i && !j) {
        var p = (a.navigator.appVersion.match(/android/gi),
        a.navigator.appVersion.match(/iphone/gi))
          , q = a.devicePixelRatio;
        i = p ? q >= 3 && (!i || i >= 3) ? 3 : q >= 2 && (!i || i >= 2) ? 2 : 1 : 1,
        j = 1 / i
    }
    if (f.setAttribute("data-dpr", i),
    !g)
        if (g = e.createElement("meta"),
        g.setAttribute("name", "viewport"),
        g.setAttribute("content", "initial-scale=" + j + ", maximum-scale=" + j + ", minimum-scale=" + j + ", user-scalable=no"),
        f.firstElementChild)
            f.firstElementChild.appendChild(g);
        else {
            var r = e.createElement("div");
            r.appendChild(g),
            e.write(r.innerHTML)
        }
    a.addEventListener("resize", function() {
        clearTimeout(d),
        d = setTimeout(c, 300)
    }, !1),
    a.addEventListener("pageshow", function(a) {
        a.persisted && (clearTimeout(d),
        d = setTimeout(c, 300))
    }, !1),
    "complete" === e.readyState ? e.body.style.fontSize = 12 * i + "px" : e.addEventListener("DOMContentLoaded", function() {
        e.body.style.fontSize = 12 * i + "px"
    }, !1),
    c(),
    k.dpr = a.dpr = i,
    k.refreshRem = c,
    k.rem2px = function(a) {
        var b = parseFloat(a) * this.rem;
        return "string" == typeof a && a.match(/rem$/) && (b += "px"),
        b
    }
    ,
    k.px2rem = function(a) {
        var b = parseFloat(a) / this.rem;
        return "string" == typeof a && a.match(/px$/) && (b += "rem"),
        b
    }
}(window, window.lib || (window.lib = {}));
//;(function(){function d(o,k){var p;k=k||{};this.trackingClick=false;this.trackingClickStart=0;this.targetElement=null;this.touchStartX=0;this.touchStartY=0;this.lastTouchIdentifier=0;this.touchBoundary=k.touchBoundary||10;this.layer=o;this.tapDelay=k.tapDelay||200;this.tapTimeout=k.tapTimeout||700;if(d.notNeeded(o)){return}function q(l,i){return function(){return l.apply(i,arguments)}}var j=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"];var n=this;for(var m=0,h=j.length;m<h;m++){n[j[m]]=q(n[j[m]],n)}if(b){o.addEventListener("mouseover",this.onMouse,true);o.addEventListener("mousedown",this.onMouse,true);o.addEventListener("mouseup",this.onMouse,true)}o.addEventListener("click",this.onClick,true);o.addEventListener("touchstart",this.onTouchStart,false);o.addEventListener("touchmove",this.onTouchMove,false);o.addEventListener("touchend",this.onTouchEnd,false);o.addEventListener("touchcancel",this.onTouchCancel,false);if(!Event.prototype.stopImmediatePropagation){o.removeEventListener=function(l,s,i){var r=Node.prototype.removeEventListener;if(l==="click"){r.call(o,l,s.hijacked||s,i)}else{r.call(o,l,s,i)}};o.addEventListener=function(r,s,l){var i=Node.prototype.addEventListener;if(r==="click"){i.call(o,r,s.hijacked||(s.hijacked=function(t){if(!t.propagationStopped){s(t)}}),l)}else{i.call(o,r,s,l)}}}if(typeof o.onclick==="function"){p=o.onclick;o.addEventListener("click",function(i){p(i)},false);o.onclick=null}}var c=navigator.userAgent.indexOf("Windows Phone")>=0;var b=navigator.userAgent.indexOf("Android")>0&&!c;var g=/iP(ad|hone|od)/.test(navigator.userAgent)&&!c;var e=g&&(/OS 4_\d(_\d)?/).test(navigator.userAgent);var f=g&&(/OS [6-7]_\d/).test(navigator.userAgent);var a=navigator.userAgent.indexOf("BB10")>0;d.prototype.needsClick=function(h){switch(h.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(h.disabled){return true}break;case"input":if((g&&h.type==="file")||h.disabled){return true}break;case"label":case"iframe":case"video":return true}return(/\bneedsclick\b/).test(h.className)};d.prototype.needsFocus=function(h){switch(h.nodeName.toLowerCase()){case"textarea":return true;case"select":return !b;case"input":switch(h.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return false}return !h.disabled&&!h.readOnly;default:return(/\bneedsfocus\b/).test(h.className)}};d.prototype.sendClick=function(i,j){var h,k;if(document.activeElement&&document.activeElement!==i){document.activeElement.blur()}k=j.changedTouches[0];h=document.createEvent("MouseEvents");h.initMouseEvent(this.determineEventType(i),true,true,window,1,k.screenX,k.screenY,k.clientX,k.clientY,false,false,false,false,0,null);h.forwardedTouchEvent=true;i.dispatchEvent(h)};d.prototype.determineEventType=function(h){if(b&&h.tagName.toLowerCase()==="select"){return"mousedown"}return"click"};d.prototype.focus=function(h){var i;if(g&&h.setSelectionRange&&h.type.indexOf("date")!==0&&h.type!=="time"&&h.type!=="month"&&h.type!=="email"){i=h.value.length;h.setSelectionRange(i,i)}else{h.focus()}};d.prototype.updateScrollParent=function(i){var j,h;j=i.fastClickScrollParent;if(!j||!j.contains(i)){h=i;do{if(h.scrollHeight>h.offsetHeight){j=h;i.fastClickScrollParent=h;break}h=h.parentElement}while(h)}if(j){j.fastClickLastScrollTop=j.scrollTop}};d.prototype.getTargetElementFromEventTarget=function(h){if(h.nodeType===Node.TEXT_NODE){return h.parentNode}return h};d.prototype.onTouchStart=function(j){var h,k,i;if(j.targetTouches.length>1){return true}h=this.getTargetElementFromEventTarget(j.target);k=j.targetTouches[0];if(g){i=window.getSelection();if(i.rangeCount&&!i.isCollapsed){return true}if(!e){if(k.identifier&&k.identifier===this.lastTouchIdentifier){j.preventDefault();return false}this.lastTouchIdentifier=k.identifier;this.updateScrollParent(h)}}this.trackingClick=true;this.trackingClickStart=j.timeStamp;this.targetElement=h;this.touchStartX=k.pageX;this.touchStartY=k.pageY;if((j.timeStamp-this.lastClickTime)<this.tapDelay){j.preventDefault()}return true};d.prototype.touchHasMoved=function(h){var j=h.changedTouches[0],i=this.touchBoundary;if(Math.abs(j.pageX-this.touchStartX)>i||Math.abs(j.pageY-this.touchStartY)>i){return true}return false};d.prototype.onTouchMove=function(h){if(!this.trackingClick){return true}if(this.targetElement!==this.getTargetElementFromEventTarget(h.target)||this.touchHasMoved(h)){this.trackingClick=false;this.targetElement=null}return true};d.prototype.findControl=function(h){if(h.control!==undefined){return h.control}if(h.htmlFor){return document.getElementById(h.htmlFor)}return h.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")};d.prototype.onTouchEnd=function(j){var l,k,i,n,m,h=this.targetElement;if(!this.trackingClick){return true}if((j.timeStamp-this.lastClickTime)<this.tapDelay){this.cancelNextClick=true;return true}if((j.timeStamp-this.trackingClickStart)>this.tapTimeout){return true}this.cancelNextClick=false;
//this.lastClickTime=j.timeStamp;k=this.trackingClickStart;this.trackingClick=false;this.trackingClickStart=0;if(f){m=j.changedTouches[0];h=document.elementFromPoint(m.pageX-window.pageXOffset,m.pageY-window.pageYOffset)||h;h.fastClickScrollParent=this.targetElement.fastClickScrollParent}i=h.tagName.toLowerCase();if(i==="label"){l=this.findControl(h);if(l){this.focus(h);if(b){return false}h=l}}else{if(this.needsFocus(h)){if((j.timeStamp-k)>100||(g&&window.top!==window&&i==="input")){this.targetElement=null;return false}this.focus(h);this.sendClick(h,j);if(!g||i!=="select"){this.targetElement=null;j.preventDefault()}return false}}if(g&&!e){n=h.fastClickScrollParent;if(n&&n.fastClickLastScrollTop!==n.scrollTop){return true}}if(!this.needsClick(h)){j.preventDefault();this.sendClick(h,j)}return false};d.prototype.onTouchCancel=function(){this.trackingClick=false;this.targetElement=null};d.prototype.onMouse=function(h){if(!this.targetElement){return true}if(h.forwardedTouchEvent){return true}if(!h.cancelable){return true}if(!this.needsClick(this.targetElement)||this.cancelNextClick){if(h.stopImmediatePropagation){h.stopImmediatePropagation()}else{h.propagationStopped=true}h.stopPropagation();h.preventDefault();return false}return true};d.prototype.onClick=function(h){var i;if(this.trackingClick){this.targetElement=null;this.trackingClick=false;return true}if(h.target.type==="submit"&&h.detail===0){return true}i=this.onMouse(h);if(!i){this.targetElement=null}return i};d.prototype.destroy=function(){var h=this.layer;if(b){h.removeEventListener("mouseover",this.onMouse,true);h.removeEventListener("mousedown",this.onMouse,true);h.removeEventListener("mouseup",this.onMouse,true)}h.removeEventListener("click",this.onClick,true);h.removeEventListener("touchstart",this.onTouchStart,false);h.removeEventListener("touchmove",this.onTouchMove,false);h.removeEventListener("touchend",this.onTouchEnd,false);h.removeEventListener("touchcancel",this.onTouchCancel,false)};d.notNeeded=function(i){var h;var l;var k;var j;if(typeof window.ontouchstart==="undefined"){return true}l=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1];if(l){if(b){h=document.querySelector("meta[name=viewport]");if(h){if(h.content.indexOf("user-scalable=no")!==-1){return true}if(l>31&&document.documentElement.scrollWidth<=window.outerWidth){return true}}}else{return true}}if(a){k=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);if(k[1]>=10&&k[2]>=3){h=document.querySelector("meta[name=viewport]");if(h){if(h.content.indexOf("user-scalable=no")!==-1){return true}if(document.documentElement.scrollWidth<=window.outerWidth){return true}}}}if(i.style.msTouchAction==="none"||i.style.touchAction==="manipulation"){return true}j=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1];if(j>=27){h=document.querySelector("meta[name=viewport]");if(h&&(h.content.indexOf("user-scalable=no")!==-1||document.documentElement.scrollWidth<=window.outerWidth)){return true}}if(i.style.touchAction==="none"||i.style.touchAction==="manipulation"){return true}return false};d.attach=function(i,h){return new d(i,h)};if(typeof define==="function"&&typeof define.amd==="object"&&define.amd){define(function(){return d})}else{if(typeof module!=="undefined"&&module.exports){module.exports=d.attach;module.exports.FastClick=d}else{window.FastClick=d}}}());


;(function () {
	'use strict';

	/**
	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	 *
	 * @codingstandard ftlabs-jsv2
	 * @copyright The Financial Times Limited [All Rights Reserved]
	 * @license MIT License (see LICENSE.txt)
	 */

	/*jslint browser:true, node:true*/
	/*global define, Event, Node*/


	/**
	 * Instantiate fast-clicking listeners on the specified layer.
	 *
	 * @constructor
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};

		/**
		 * Whether a click is currently being tracked.
		 *
		 * @type boolean
		 */
		this.trackingClick = false;


		/**
		 * Timestamp for when click tracking started.
		 *
		 * @type number
		 */
		this.trackingClickStart = 0;


		/**
		 * The element being tracked for a click.
		 *
		 * @type EventTarget
		 */
		this.targetElement = null;


		/**
		 * X-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartX = 0;


		/**
		 * Y-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartY = 0;


		/**
		 * ID of the last touch, retrieved from Touch.identifier.
		 *
		 * @type number
		 */
		this.lastTouchIdentifier = 0;


		/**
		 * Touchmove boundary, beyond which a click will be cancelled.
		 *
		 * @type number
		 */
		this.touchBoundary = options.touchBoundary || 10;


		/**
		 * The FastClick layer.
		 *
		 * @type Element
		 */
		this.layer = layer;

		/**
		 * The minimum time between tap(touchstart and touchend) events
		 *
		 * @type number
		 */
		this.tapDelay = options.tapDelay || 200;

		/**
		 * The maximum time for a tap
		 *
		 * @type number
		 */
		this.tapTimeout = options.tapTimeout || 700;

		if (FastClick.notNeeded(layer)) {
			return;
		}

		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function() { return method.apply(context, arguments); };
		}


		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
		// layer when they are cancelled.
		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function(type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function(type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if (typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function(event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	/**
	* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	*
	* @type boolean
	*/
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
	 * Android requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


	/**
	 * iOS requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


	/**
	 * iOS 4 requires an exception for select elements.
	 *
	 * @type boolean
	 */
	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


	/**
	 * iOS 6.0-7.* requires the target element to be manually derived
	 *
	 * @type boolean
	 */
	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

	/**
	 * BlackBerry requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
	 * Determine whether a given element requires a native click.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element needs a native click
	 */
	FastClick.prototype.needsClick = function(target) {
		switch (target.nodeName.toLowerCase()) {

		// Don't send a synthetic click to disabled inputs (issue #62)
		case 'button':
		case 'select':
		case 'textarea':
			if (target.disabled) {
				return true;
			}

			break;
		case 'input':

			// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
			if ((deviceIsIOS && target.type === 'file') || target.disabled) {
				return true;
			}

			break;
		case 'label':
		case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
		case 'video':
			return true;
		}
        var pn = target.parentNode;
        while(pn){
            var pname = pn.nodeName.toLowerCase();
            if (pname == 'label') {
                return true;
            }
            pn = pn.parentNode;
        }
		return (/\bneedsclick\b/).test(target.className);
	};


	/**
	 * Determine whether a given element requires a call to focus to simulate click into element.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
	 */
	FastClick.prototype.needsFocus = function(target) {
		switch (target.nodeName.toLowerCase()) {
		case 'textarea':
			return true;
		case 'select':
			return !deviceIsAndroid;
		case 'input':
			switch (target.type) {
			case 'button':
			case 'checkbox':
			case 'file':
			case 'image':
			case 'radio':
			case 'submit':
				return false;
			}

			// No point in attempting to focus disabled inputs
			return !target.disabled && !target.readOnly;
		default:
			return (/\bneedsfocus\b/).test(target.className);
		}
	};


	/**
	 * Send a click event to the specified element.
	 *
	 * @param {EventTarget|Element} targetElement
	 * @param {Event} event
	 */
	FastClick.prototype.sendClick = function(targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function(targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};


	/**
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.focus = function(targetElement) {
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month' && targetElement.type !== 'email') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};


	/**
	 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
	 *
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.updateScrollParent = function(targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
		// target element was moved to another parent.
		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// Always update the scroll top tracker if possible.
		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};


	/**
	 * @param {EventTarget} targetElement
	 * @returns {Element|EventTarget}
	 */
	FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};


	/**
	 * On touch start, record the position and scroll offset.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchStart = function(event) {
		var targetElement, touch, selection;

		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
		if (event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		if (deviceIsIOS) {

			// Only trusted events will deselect text on iOS (issue #49)
			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if (!deviceIsIOS4) {

				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
				// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
				// 1) the user does a fling scroll on the scrollable layer
				// 2) the user stops the fling scroll with another tap
				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			event.preventDefault();
		}

		return true;
	};


	/**
	 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.touchHasMoved = function(event) {
		var touch = event.changedTouches[0], boundary = this.touchBoundary;

		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};


	/**
	 * Update the last position.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchMove = function(event) {
		if (!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};


	/**
	 * Attempt to find the labelled control for the given label element.
	 *
	 * @param {EventTarget|HTMLLabelElement} labelElement
	 * @returns {Element|null}
	 */
	FastClick.prototype.findControl = function(labelElement) {

		// Fast path for newer browsers supporting the HTML5 control attribute
		if (labelElement.control !== undefined) {
			return labelElement.control;
		}

		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		// If no for attribute exists, attempt to retrieve the first labellable descendant element
		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};


	/**
	 * On touch end, determine whether to send a click event at once.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchEnd = function(event) {
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
		// is performing a transition or scroll, and has to be re-detected manually. Note that
		// for this to function correctly, it must be called *after* the event target is checked!
		// See issue #57; also filed as rdar://13048589 .
		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {

			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
			if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {

			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};


	/**
	 * On touch cancel, stop tracking the click.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.onTouchCancel = function() {
		this.trackingClick = false;
		this.targetElement = null;
	};


	/**
	 * Determine mouse events which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onMouse = function(event) {

		// If a target element was never set (because a touch event was never fired) allow the event
		if (!this.targetElement) {
			return true;
		}

		if (event.forwardedTouchEvent) {
			return true;
		}

		// Programmatically generated events targeting a specific element should be permitted
		if (!event.cancelable) {
			return true;
		}

		// Derive and check the target element to see whether the mouse event needs to be permitted;
		// unless explicitly enabled, prevent non-touch click events from triggering actions,
		// to prevent ghost/doubleclicks.
		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

			// Prevent any user-added listeners declared on FastClick element from being fired.
			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
				event.propagationStopped = true;
			}

			// Cancel the event
			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		// If the mouse event is permitted, return true for the action to go through.
		return true;
	};


	/**
	 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
	 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
	 * an actual click which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onClick = function(event) {
		var permitted;

		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
		if (!permitted) {
			this.targetElement = null;
		}

		// If clicks are permitted, return true for the action to go through.
		return permitted;
	};


	/**
	 * Remove all FastClick's event listeners.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.destroy = function() {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};


	/**
	 * Check whether FastClick is needed.
	 *
	 * @param {Element} layer The layer to listen on
	 */
	FastClick.notNeeded = function(layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

			// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};


	/**
	 * Factory method for creating a FastClick object
	 *
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	FastClick.attach = function(layer, options) {
		return new FastClick(layer, options);
	};


	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

		// AMD. Register as an anonymous module.
		define(function() {
			return FastClick;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
}());



(function (){
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function(){
            FastClick.attach(document.body);
        }, false);
    }  
})();