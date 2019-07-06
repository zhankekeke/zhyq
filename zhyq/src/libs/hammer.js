module.exports=function(t, e, n, i) {
    "use strict";
    function r(t, e, n) {
        return setTimeout(h(t, n), e)
    }
    function a(t, e, n) {
        return Array.isArray(t) ? (o(t, n[e], n),
        !0) : !1
    }
    function o(t, e, n) {
        var r;
        if (t)
            if (t.forEach)
                t.forEach(e, n);
            else if (t.length !== i)
                for (r = 0; r < t.length; )
                    e.call(n, t[r], r, t),
                    r++;
            else
                for (r in t)
                    t.hasOwnProperty(r) && e.call(n, t[r], r, t)
    }
    function s(e, n, i) {
        var r = "DEPRECATED METHOD: " + n + "\n" + i + " AT \n";
        return function() {
            var n = new Error("get-stack-trace")
              , i = n && n.stack ? n.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace"
              , a = t.console && (t.console.warn || t.console.log);
            return a && a.call(t.console, r, i),
            e.apply(this, arguments)
        }
    }
    function l(t, e, n) {
        var i, r = e.prototype;
        i = t.prototype = Object.create(r),
        i.constructor = t,
        i._super = r,
        n && se(i, n)
    }
    function h(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    }
    function c(t, e) {
        return typeof t == ce ? t.apply(e ? e[0] || i : i, e) : t
    }
    function u(t, e) {
        return t === i ? e : t
    }
    function d(t, e, n) {
        o(g(e), function(e) {
            t.addEventListener(e, n, !1)
        })
    }
    function p(t, e, n) {
        o(g(e), function(e) {
            t.removeEventListener(e, n, !1)
        })
    }
    function f(t, e) {
        for (; t; ) {
            if (t == e)
                return !0;
            t = t.parentNode
        }
        return !1
    }
    function m(t, e) {
        return t.indexOf(e) > -1
    }
    function g(t) {
        return t.trim().split(/\s+/g)
    }
    function y(t, e, n) {
        if (t.indexOf && !n)
            return t.indexOf(e);
        for (var i = 0; i < t.length; ) {
            if (n && t[i][n] == e || !n && t[i] === e)
                return i;
            i++
        }
        return -1
    }
    function v(t) {
        return Array.prototype.slice.call(t, 0)
    }
    function b(t, e, n) {
        for (var i = [], r = [], a = 0; a < t.length; ) {
            var o = e ? t[a][e] : t[a];
            y(r, o) < 0 && i.push(t[a]),
            r[a] = o,
            a++
        }
        return n && (i = e ? i.sort(function(t, n) {
            return t[e] > n[e]
        }) : i.sort()),
        i
    }
    function V(t, e) {
        for (var n, r, a = e[0].toUpperCase() + e.slice(1), o = 0; o < le.length; ) {
            if (n = le[o],
            r = n ? n + a : e,
            r in t)
                return r;
            o++
        }
        return i
    }
    function U() {
        return ge++
    }
    function x(e) {
        var n = e.ownerDocument || e;
        return n.defaultView || n.parentWindow || t
    }
    function k(t, e) {
        var n = this;
        this.manager = t,
        this.callback = e,
        this.element = t.element,
        this.target = t.options.inputTarget,
        this.domHandler = function(e) {
            c(t.options.enable, [t]) && n.handler(e)
        }
        ,
        this.init()
    }
    function _(t) {
        var e, n = t.options.inputClass;
        return new (e = n ? n : be ? F : Ve ? N : ve ? $ : K)(t,w)
    }
    function w(t, e, n) {
        var i = n.pointers.length
          , r = n.changedPointers.length
          , a = e & Le && i - r === 0
          , o = e & (Ie | Se) && i - r === 0;
        n.isFirst = !!a,
        n.isFinal = !!o,
        a && (t.session = {}),
        n.eventType = e,
        L(t, n),
        t.emit("hammer.input", n),
        t.recognize(n),
        t.session.prevInput = n
    }
    function L(t, e) {
        var n = t.session
          , i = e.pointers
          , r = i.length;
        n.firstInput || (n.firstInput = S(e)),
        r > 1 && !n.firstMultiple ? n.firstMultiple = S(e) : 1 === r && (n.firstMultiple = !1);
        var a = n.firstInput
          , o = n.firstMultiple
          , s = o ? o.center : a.center
          , l = e.center = W(i);
        e.timeStamp = pe(),
        e.deltaTime = e.timeStamp - a.timeStamp,
        e.angle = D(s, l),
        e.distance = M(s, l),
        C(n, e),
        e.offsetDirection = E(e.deltaX, e.deltaY);
        var h = T(e.deltaTime, e.deltaX, e.deltaY);
        e.overallVelocityX = h.x,
        e.overallVelocityY = h.y,
        e.overallVelocity = de(h.x) > de(h.y) ? h.x : h.y,
        e.scale = o ? A(o.pointers, i) : 1,
        e.rotation = o ? X(o.pointers, i) : 0,
        e.maxPointers = n.prevInput ? e.pointers.length > n.prevInput.maxPointers ? e.pointers.length : n.prevInput.maxPointers : e.pointers.length,
        I(n, e);
        var c = t.element;
        f(e.srcEvent.target, c) && (c = e.srcEvent.target),
        e.target = c
    }
    function C(t, e) {
        var n = e.center
          , i = t.offsetDelta || {}
          , r = t.prevDelta || {}
          , a = t.prevInput || {};
        (e.eventType === Le || a.eventType === Ie) && (r = t.prevDelta = {
            x: a.deltaX || 0,
            y: a.deltaY || 0
        },
        i = t.offsetDelta = {
            x: n.x,
            y: n.y
        }),
        e.deltaX = r.x + (n.x - i.x),
        e.deltaY = r.y + (n.y - i.y)
    }
    function I(t, e) {
        var n, r, a, o, s = t.lastInterval || e, l = e.timeStamp - s.timeStamp;
        if (e.eventType != Se && (l > we || s.velocity === i)) {
            var h = e.deltaX - s.deltaX
              , c = e.deltaY - s.deltaY
              , u = T(l, h, c);
            r = u.x,
            a = u.y,
            n = de(u.x) > de(u.y) ? u.x : u.y,
            o = E(h, c),
            t.lastInterval = e
        } else
            n = s.velocity,
            r = s.velocityX,
            a = s.velocityY,
            o = s.direction;
        e.velocity = n,
        e.velocityX = r,
        e.velocityY = a,
        e.direction = o
    }
    function S(t) {
        for (var e = [], n = 0; n < t.pointers.length; )
            e[n] = {
                clientX: ue(t.pointers[n].clientX),
                clientY: ue(t.pointers[n].clientY)
            },
            n++;
        return {
            timeStamp: pe(),
            pointers: e,
            center: W(e),
            deltaX: t.deltaX,
            deltaY: t.deltaY
        }
    }
    function W(t) {
        var e = t.length;
        if (1 === e)
            return {
                x: ue(t[0].clientX),
                y: ue(t[0].clientY)
            };
        for (var n = 0, i = 0, r = 0; e > r; )
            n += t[r].clientX,
            i += t[r].clientY,
            r++;
        return {
            x: ue(n / e),
            y: ue(i / e)
        }
    }
    function T(t, e, n) {
        return {
            x: e / t || 0,
            y: n / t || 0
        }
    }
    function E(t, e) {
        return t === e ? We : de(t) >= de(e) ? 0 > t ? Te : Ee : 0 > e ? Me : De
    }
    function M(t, e, n) {
        n || (n = Fe);
        var i = e[n[0]] - t[n[0]]
          , r = e[n[1]] - t[n[1]];
        return Math.sqrt(i * i + r * r)
    }
    function D(t, e, n) {
        n || (n = Fe);
        var i = e[n[0]] - t[n[0]]
          , r = e[n[1]] - t[n[1]];
        return 180 * Math.atan2(r, i) / Math.PI
    }
    function X(t, e) {
        return D(e[1], e[0], Pe) + D(t[1], t[0], Pe)
    }
    function A(t, e) {
        return M(e[0], e[1], Pe) / M(t[0], t[1], Pe)
    }
    function K() {
        this.evEl = Ne,
        this.evWin = ze,
        this.allow = !0,
        this.pressed = !1,
        k.apply(this, arguments)
    }
    function F() {
        this.evEl = Re,
        this.evWin = Be,
        k.apply(this, arguments),
        this.store = this.manager.session.pointerEvents = []
    }
    function P() {
        this.evTarget = Ge,
        this.evWin = Ye,
        this.started = !1,
        k.apply(this, arguments)
    }
    function O(t, e) {
        var n = v(t.touches)
          , i = v(t.changedTouches);
        return e & (Ie | Se) && (n = b(n.concat(i), "identifier", !0)),
        [n, i]
    }
    function N() {
        this.evTarget = qe,
        this.targetIds = {},
        k.apply(this, arguments)
    }
    function z(t, e) {
        var n = v(t.touches)
          , i = this.targetIds;
        if (e & (Le | Ce) && 1 === n.length)
            return i[n[0].identifier] = !0,
            [n, n];
        var r, a, o = v(t.changedTouches), s = [], l = this.target;
        if (a = n.filter(function(t) {
            return f(t.target, l)
        }),
        e === Le)
            for (r = 0; r < a.length; )
                i[a[r].identifier] = !0,
                r++;
        for (r = 0; r < o.length; )
            i[o[r].identifier] && s.push(o[r]),
            e & (Ie | Se) && delete i[o[r].identifier],
            r++;
        return s.length ? [b(a.concat(s), "identifier", !0), s] : void 0
    }
    function $() {
        k.apply(this, arguments);
        var t = h(this.handler, this);
        this.touch = new N(this.manager,t),
        this.mouse = new K(this.manager,t)
    }
    function J(t, e) {
        this.manager = t,
        this.set(e)
    }
    function R(t) {
        if (m(t, rn))
            return rn;
        var e = m(t, an)
          , n = m(t, on);
        return e && n ? rn : e || n ? e ? an : on : m(t, nn) ? nn : en
    }
    function B(t) {
        this.options = se({}, this.defaults, t || {}),
        this.id = U(),
        this.manager = null,
        this.options.enable = u(this.options.enable, !0),
        this.state = sn,
        this.simultaneous = {},
        this.requireFail = []
    }
    function H(t) {
        return t & dn ? "cancel" : t & cn ? "end" : t & hn ? "move" : t & ln ? "start" : ""
    }
    function G(t) {
        return t == De ? "down" : t == Me ? "up" : t == Te ? "left" : t == Ee ? "right" : ""
    }
    function Y(t, e) {
        var n = e.manager;
        return n ? n.get(t) : t
    }
    function j() {
        B.apply(this, arguments)
    }
    function q() {
        j.apply(this, arguments),
        this.pX = null,
        this.pY = null
    }
    function Q() {
        j.apply(this, arguments)
    }
    function Z() {
        B.apply(this, arguments),
        this._timer = null,
        this._input = null
    }
    function te() {
        j.apply(this, arguments)
    }
    function ee() {
        j.apply(this, arguments)
    }
    function ne() {
        B.apply(this, arguments),
        this.pTime = !1,
        this.pCenter = !1,
        this._timer = null,
        this._input = null,
        this.count = 0
    }
    function ie(t, e) {
        return e = e || {},
        e.recognizers = u(e.recognizers, ie.defaults.preset),
        new re(t,e)
    }
    function re(t, e) {
        this.options = se({}, ie.defaults, e || {}),
        this.options.inputTarget = this.options.inputTarget || t,
        this.handlers = {},
        this.session = {},
        this.recognizers = [],
        this.element = t,
        this.input = _(this),
        this.touchAction = new J(this,this.options.touchAction),
        ae(this, !0),
        o(this.options.recognizers, function(t) {
            var e = this.add(new t[0](t[1]));
            t[2] && e.recognizeWith(t[2]),
            t[3] && e.requireFailure(t[3])
        }, this)
    }
    function ae(t, e) {
        var n = t.element;
        n.style && o(t.options.cssProps, function(t, i) {
            n.style[V(n.style, i)] = e ? t : ""
        })
    }
    function oe(t, n) {
        var i = e.createEvent("Event");
        i.initEvent(t, !0, !0),
        i.gesture = n,
        n.target.dispatchEvent(i)
    }
    var se, le = ["", "webkit", "Moz", "MS", "ms", "o"], he = e.createElement("div"), ce = "function", ue = Math.round, de = Math.abs, pe = Date.now;
    se = "function" != typeof Object.assign ? function(t) {
        if (t === i || null === t)
            throw new TypeError("Cannot convert undefined or null to object");
        for (var e = Object(t), n = 1; n < arguments.length; n++) {
            var r = arguments[n];
            if (r !== i && null !== r)
                for (var a in r)
                    r.hasOwnProperty(a) && (e[a] = r[a])
        }
        return e
    }
    : Object.assign;
    var fe = s(function(t, e, n) {
        for (var r = Object.keys(e), a = 0; a < r.length; )
            (!n || n && t[r[a]] === i) && (t[r[a]] = e[r[a]]),
            a++;
        return t
    }, "extend", "Use `assign`.")
      , me = s(function(t, e) {
        return fe(t, e, !0)
    }, "merge", "Use `assign`.")
      , ge = 1
      , ye = /mobile|tablet|ip(ad|hone|od)|android/i
      , ve = "ontouchstart"in t
      , be = V(t, "PointerEvent") !== i
      , Ve = ve && ye.test(navigator.userAgent)
      , Ue = "touch"
      , xe = "pen"
      , ke = "mouse"
      , _e = "kinect"
      , we = 25
      , Le = 1
      , Ce = 2
      , Ie = 4
      , Se = 8
      , We = 1
      , Te = 2
      , Ee = 4
      , Me = 8
      , De = 16
      , Xe = Te | Ee
      , Ae = Me | De
      , Ke = Xe | Ae
      , Fe = ["x", "y"]
      , Pe = ["clientX", "clientY"];
    k.prototype = {
        handler: function() {},
        init: function() {
            this.evEl && d(this.element, this.evEl, this.domHandler),
            this.evTarget && d(this.target, this.evTarget, this.domHandler),
            this.evWin && d(x(this.element), this.evWin, this.domHandler)
        },
        destroy: function() {
            this.evEl && p(this.element, this.evEl, this.domHandler),
            this.evTarget && p(this.target, this.evTarget, this.domHandler),
            this.evWin && p(x(this.element), this.evWin, this.domHandler)
        }
    };
    var Oe = {
        mousedown: Le,
        mousemove: Ce,
        mouseup: Ie
    }
      , Ne = "mousedown"
      , ze = "mousemove mouseup";
    l(K, k, {
        handler: function(t) {
            var e = Oe[t.type];
            e & Le && 0 === t.button && (this.pressed = !0),
            e & Ce && 1 !== t.which && (e = Ie),
            this.pressed && this.allow && (e & Ie && (this.pressed = !1),
            this.callback(this.manager, e, {
                pointers: [t],
                changedPointers: [t],
                pointerType: ke,
                srcEvent: t
            }))
        }
    });
    var $e = {
        pointerdown: Le,
        pointermove: Ce,
        pointerup: Ie,
        pointercancel: Se,
        pointerout: Se
    }
      , Je = {
        2: Ue,
        3: xe,
        4: ke,
        5: _e
    }
      , Re = "pointerdown"
      , Be = "pointermove pointerup pointercancel";
    t.MSPointerEvent && !t.PointerEvent && (Re = "MSPointerDown",
    Be = "MSPointerMove MSPointerUp MSPointerCancel"),
    l(F, k, {
        handler: function(t) {
            var e = this.store
              , n = !1
              , i = t.type.toLowerCase().replace("ms", "")
              , r = $e[i]
              , a = Je[t.pointerType] || t.pointerType
              , o = a == Ue
              , s = y(e, t.pointerId, "pointerId");
            r & Le && (0 === t.button || o) ? 0 > s && (e.push(t),
            s = e.length - 1) : r & (Ie | Se) && (n = !0),
            0 > s || (e[s] = t,
            this.callback(this.manager, r, {
                pointers: e,
                changedPointers: [t],
                pointerType: a,
                srcEvent: t
            }),
            n && e.splice(s, 1))
        }
    });
    var He = {
        touchstart: Le,
        touchmove: Ce,
        touchend: Ie,
        touchcancel: Se
    }
      , Ge = "touchstart"
      , Ye = "touchstart touchmove touchend touchcancel";
    l(P, k, {
        handler: function(t) {
            var e = He[t.type];
            if (e === Le && (this.started = !0),
            this.started) {
                var n = O.call(this, t, e);
                e & (Ie | Se) && n[0].length - n[1].length === 0 && (this.started = !1),
                this.callback(this.manager, e, {
                    pointers: n[0],
                    changedPointers: n[1],
                    pointerType: Ue,
                    srcEvent: t
                })
            }
        }
    });
    var je = {
        touchstart: Le,
        touchmove: Ce,
        touchend: Ie,
        touchcancel: Se
    }
      , qe = "touchstart touchmove touchend touchcancel";
    l(N, k, {
        handler: function(t) {
            var e = je[t.type]
              , n = z.call(this, t, e);
            n && this.callback(this.manager, e, {
                pointers: n[0],
                changedPointers: n[1],
                pointerType: Ue,
                srcEvent: t
            })
        }
    }),
    l($, k, {
        handler: function(t, e, n) {
            var i = n.pointerType == Ue
              , r = n.pointerType == ke;
            if (i)
                this.mouse.allow = !1;
            else if (r && !this.mouse.allow)
                return;
            e & (Ie | Se) && (this.mouse.allow = !0),
            this.callback(t, e, n)
        },
        destroy: function() {
            this.touch.destroy(),
            this.mouse.destroy()
        }
    });
    var Qe = V(he.style, "touchAction")
      , Ze = Qe !== i
      , tn = "compute"
      , en = "auto"
      , nn = "manipulation"
      , rn = "none"
      , an = "pan-x"
      , on = "pan-y";
    J.prototype = {
        set: function(t) {
            t == tn && (t = this.compute()),
            Ze && this.manager.element.style && (this.manager.element.style[Qe] = t),
            this.actions = t.toLowerCase().trim()
        },
        update: function() {
            this.set(this.manager.options.touchAction)
        },
        compute: function() {
            var t = [];
            return o(this.manager.recognizers, function(e) {
                c(e.options.enable, [e]) && (t = t.concat(e.getTouchAction()))
            }),
            R(t.join(" "))
        },
        preventDefaults: function(t) {
            if (!Ze) {
                var e = t.srcEvent
                  , n = t.offsetDirection;
                if (this.manager.session.prevented)
                    return void e.preventDefault();
                var i = this.actions
                  , r = m(i, rn)
                  , a = m(i, on)
                  , o = m(i, an);
                if (r) {
                    var s = 1 === t.pointers.length
                      , l = t.distance < 2
                      , h = t.deltaTime < 250;
                    if (s && l && h)
                        return
                }
                if (!o || !a)
                    return r || a && n & Xe || o && n & Ae ? this.preventSrc(e) : void 0
            }
        },
        preventSrc: function(t) {
            this.manager.session.prevented = !0,
            t.preventDefault()
        }
    };
    var sn = 1
      , ln = 2
      , hn = 4
      , cn = 8
      , un = cn
      , dn = 16
      , pn = 32;
    B.prototype = {
        defaults: {},
        set: function(t) {
            return se(this.options, t),
            this.manager && this.manager.touchAction.update(),
            this
        },
        recognizeWith: function(t) {
            if (a(t, "recognizeWith", this))
                return this;
            var e = this.simultaneous;
            return t = Y(t, this),
            e[t.id] || (e[t.id] = t,
            t.recognizeWith(this)),
            this
        },
        dropRecognizeWith: function(t) {
            return a(t, "dropRecognizeWith", this) ? this : (t = Y(t, this),
            delete this.simultaneous[t.id],
            this)
        },
        requireFailure: function(t) {
            if (a(t, "requireFailure", this))
                return this;
            var e = this.requireFail;
            return t = Y(t, this),
            -1 === y(e, t) && (e.push(t),
            t.requireFailure(this)),
            this
        },
        dropRequireFailure: function(t) {
            if (a(t, "dropRequireFailure", this))
                return this;
            t = Y(t, this);
            var e = y(this.requireFail, t);
            return e > -1 && this.requireFail.splice(e, 1),
            this
        },
        hasRequireFailures: function() {
            return this.requireFail.length > 0
        },
        canRecognizeWith: function(t) {
            return !!this.simultaneous[t.id]
        },
        emit: function(t) {
            function e(e) {
                n.manager.emit(e, t)
            }
            var n = this
              , i = this.state;
            cn > i && e(n.options.event + H(i)),
            e(n.options.event),
            t.additionalEvent && e(t.additionalEvent),
            i >= cn && e(n.options.event + H(i))
        },
        tryEmit: function(t) {
            return this.canEmit() ? this.emit(t) : void (this.state = pn)
        },
        canEmit: function() {
            for (var t = 0; t < this.requireFail.length; ) {
                if (!(this.requireFail[t].state & (pn | sn)))
                    return !1;
                t++
            }
            return !0
        },
        recognize: function(t) {
            var e = se({}, t);
            return c(this.options.enable, [this, e]) ? (this.state & (un | dn | pn) && (this.state = sn),
            this.state = this.process(e),
            void (this.state & (ln | hn | cn | dn) && this.tryEmit(e))) : (this.reset(),
            void (this.state = pn))
        },
        process: function() {},
        getTouchAction: function() {},
        reset: function() {}
    },
    l(j, B, {
        defaults: {
            pointers: 1
        },
        attrTest: function(t) {
            var e = this.options.pointers;
            return 0 === e || t.pointers.length === e
        },
        process: function(t) {
            var e = this.state
              , n = t.eventType
              , i = e & (ln | hn)
              , r = this.attrTest(t);
            return i && (n & Se || !r) ? e | dn : i || r ? n & Ie ? e | cn : e & ln ? e | hn : ln : pn
        }
    }),
    l(q, j, {
        defaults: {
            event: "pan",
            threshold: 10,
            pointers: 1,
            direction: Ke
        },
        getTouchAction: function() {
            var t = this.options.direction
              , e = [];
            return t & Xe && e.push(on),
            t & Ae && e.push(an),
            e
        },
        directionTest: function(t) {
            var e = this.options
              , n = !0
              , i = t.distance
              , r = t.direction
              , a = t.deltaX
              , o = t.deltaY;
            return r & e.direction || (e.direction & Xe ? (r = 0 === a ? We : 0 > a ? Te : Ee,
            n = a != this.pX,
            i = Math.abs(t.deltaX)) : (r = 0 === o ? We : 0 > o ? Me : De,
            n = o != this.pY,
            i = Math.abs(t.deltaY))),
            t.direction = r,
            n && i > e.threshold && r & e.direction
        },
        attrTest: function(t) {
            return j.prototype.attrTest.call(this, t) && (this.state & ln || !(this.state & ln) && this.directionTest(t))
        },
        emit: function(t) {
            this.pX = t.deltaX,
            this.pY = t.deltaY;
            var e = G(t.direction);
            e && (t.additionalEvent = this.options.event + e),
            this._super.emit.call(this, t)
        }
    }),
    l(Q, j, {
        defaults: {
            event: "pinch",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [rn]
        },
        attrTest: function(t) {
            return this._super.attrTest.call(this, t) && (Math.abs(t.scale - 1) > this.options.threshold || this.state & ln)
        },
        emit: function(t) {
            if (1 !== t.scale) {
                var e = t.scale < 1 ? "in" : "out";
                t.additionalEvent = this.options.event + e
            }
            this._super.emit.call(this, t)
        }
    }),
    l(Z, B, {
        defaults: {
            event: "press",
            pointers: 1,
            time: 251,
            threshold: 9
        },
        getTouchAction: function() {
            return [en]
        },
        process: function(t) {
            var e = this.options
              , n = t.pointers.length === e.pointers
              , i = t.distance < e.threshold
              , a = t.deltaTime > e.time;
            if (this._input = t,
            !i || !n || t.eventType & (Ie | Se) && !a)
                this.reset();
            else if (t.eventType & Le)
                this.reset(),
                this._timer = r(function() {
                    this.state = un,
                    this.tryEmit()
                }, e.time, this);
            else if (t.eventType & Ie)
                return un;
            return pn
        },
        reset: function() {
            clearTimeout(this._timer)
        },
        emit: function(t) {
            this.state === un && (t && t.eventType & Ie ? this.manager.emit(this.options.event + "up", t) : (this._input.timeStamp = pe(),
            this.manager.emit(this.options.event, this._input)))
        }
    }),
    l(te, j, {
        defaults: {
            event: "rotate",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [rn]
        },
        attrTest: function(t) {
            return this._super.attrTest.call(this, t) && (Math.abs(t.rotation) > this.options.threshold || this.state & ln)
        }
    }),
    l(ee, j, {
        defaults: {
            event: "swipe",
            threshold: 10,
            velocity: .3,
            direction: Xe | Ae,
            pointers: 1
        },
        getTouchAction: function() {
            return q.prototype.getTouchAction.call(this)
        },
        attrTest: function(t) {
            var e, n = this.options.direction;
            return n & (Xe | Ae) ? e = t.overallVelocity : n & Xe ? e = t.overallVelocityX : n & Ae && (e = t.overallVelocityY),
            this._super.attrTest.call(this, t) && n & t.offsetDirection && t.distance > this.options.threshold && t.maxPointers == this.options.pointers && de(e) > this.options.velocity && t.eventType & Ie
        },
        emit: function(t) {
            var e = G(t.offsetDirection);
            e && this.manager.emit(this.options.event + e, t),
            this.manager.emit(this.options.event, t)
        }
    }),
    l(ne, B, {
        defaults: {
            event: "tap",
            pointers: 1,
            taps: 1,
            interval: 300,
            time: 250,
            threshold: 9,
            posThreshold: 10
        },
        getTouchAction: function() {
            return [nn]
        },
        process: function(t) {
            var e = this.options
              , n = t.pointers.length === e.pointers
              , i = t.distance < e.threshold
              , a = t.deltaTime < e.time;
            if (this.reset(),
            t.eventType & Le && 0 === this.count)
                return this.failTimeout();
            if (i && a && n) {
                if (t.eventType != Ie)
                    return this.failTimeout();
                var o = this.pTime ? t.timeStamp - this.pTime < e.interval : !0
                  , s = !this.pCenter || M(this.pCenter, t.center) < e.posThreshold;
                this.pTime = t.timeStamp,
                this.pCenter = t.center,
                s && o ? this.count += 1 : this.count = 1,
                this._input = t;
                var l = this.count % e.taps;
                if (0 === l)
                    return this.hasRequireFailures() ? (this._timer = r(function() {
                        this.state = un,
                        this.tryEmit()
                    }, e.interval, this),
                    ln) : un
            }
            return pn
        },
        failTimeout: function() {
            return this._timer = r(function() {
                this.state = pn
            }, this.options.interval, this),
            pn
        },
        reset: function() {
            clearTimeout(this._timer)
        },
        emit: function() {
            this.state == un && (this._input.tapCount = this.count,
            this.manager.emit(this.options.event, this._input))
        }
    }),
    ie.VERSION = "2.0.6",
    ie.defaults = {
        domEvents: !1,
        touchAction: tn,
        enable: !0,
        inputTarget: null,
        inputClass: null,
        preset: [[te, {
            enable: !1
        }], [Q, {
            enable: !1
        }, ["rotate"]], [ee, {
            direction: Xe
        }], [q, {
            direction: Xe
        }, ["swipe"]], [ne], [ne, {
            event: "doubletap",
            taps: 2
        }, ["tap"]], [Z]],
        cssProps: {
            userSelect: "none",
            touchSelect: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    };
    var fn = 1
      , mn = 2;
    re.prototype = {
        set: function(t) {
            return se(this.options, t),
            t.touchAction && this.touchAction.update(),
            t.inputTarget && (this.input.destroy(),
            this.input.target = t.inputTarget,
            this.input.init()),
            this
        },
        stop: function(t) {
            this.session.stopped = t ? mn : fn
        },
        recognize: function(t) {
            var e = this.session;
            if (!e.stopped) {
                this.touchAction.preventDefaults(t);
                var n, i = this.recognizers, r = e.curRecognizer;
                (!r || r && r.state & un) && (r = e.curRecognizer = null);
                for (var a = 0; a < i.length; )
                    n = i[a],
                    e.stopped === mn || r && n != r && !n.canRecognizeWith(r) ? n.reset() : n.recognize(t),
                    !r && n.state & (ln | hn | cn) && (r = e.curRecognizer = n),
                    a++
            }
        },
        get: function(t) {
            if (t instanceof B)
                return t;
            for (var e = this.recognizers, n = 0; n < e.length; n++)
                if (e[n].options.event == t)
                    return e[n];
            return null
        },
        add: function(t) {
            if (a(t, "add", this))
                return this;
            var e = this.get(t.options.event);
            return e && this.remove(e),
            this.recognizers.push(t),
            t.manager = this,
            this.touchAction.update(),
            t
        },
        remove: function(t) {
            if (a(t, "remove", this))
                return this;
            if (t = this.get(t)) {
                var e = this.recognizers
                  , n = y(e, t);
                -1 !== n && (e.splice(n, 1),
                this.touchAction.update())
            }
            return this
        },
        on: function(t, e) {
            var n = this.handlers;
            return o(g(t), function(t) {
                n[t] = n[t] || [],
                n[t].push(e)
            }),
            this
        },
        off: function(t, e) {
            var n = this.handlers;
            return o(g(t), function(t) {
                e ? n[t] && n[t].splice(y(n[t], e), 1) : delete n[t]
            }),
            this
        },
        emit: function(t, e) {
            this.options.domEvents && oe(t, e);
            var n = this.handlers[t] && this.handlers[t].slice();
            if (n && n.length) {
                e.type = t,
                e.preventDefault = function() {
                    e.srcEvent.preventDefault()
                }
                ;
                for (var i = 0; i < n.length; )
                    n[i](e),
                    i++
            }
        },
        destroy: function() {
            this.element && ae(this, !1),
            this.handlers = {},
            this.session = {},
            this.input.destroy(),
            this.element = null
        }
    },
    se(ie, {
        INPUT_START: Le,
        INPUT_MOVE: Ce,
        INPUT_END: Ie,
        INPUT_CANCEL: Se,
        STATE_POSSIBLE: sn,
        STATE_BEGAN: ln,
        STATE_CHANGED: hn,
        STATE_ENDED: cn,
        STATE_RECOGNIZED: un,
        STATE_CANCELLED: dn,
        STATE_FAILED: pn,
        DIRECTION_NONE: We,
        DIRECTION_LEFT: Te,
        DIRECTION_RIGHT: Ee,
        DIRECTION_UP: Me,
        DIRECTION_DOWN: De,
        DIRECTION_HORIZONTAL: Xe,
        DIRECTION_VERTICAL: Ae,
        DIRECTION_ALL: Ke,
        Manager: re,
        Input: k,
        TouchAction: J,
        TouchInput: N,
        MouseInput: K,
        PointerEventInput: F,
        TouchMouseInput: $,
        SingleTouchInput: P,
        Recognizer: B,
        AttrRecognizer: j,
        Tap: ne,
        Pan: q,
        Swipe: ee,
        Pinch: Q,
        Rotate: te,
        Press: Z,
        on: d,
        off: p,
        each: o,
        merge: me,
        extend: fe,
        assign: se,
        inherit: l,
        bindFn: h,
        prefixed: V
    });
    var gn = "undefined" != typeof t ? t : "undefined" != typeof self ? self : {};
    gn.Hammer = ie,
    "function" == typeof define && define.amd ? define(function() {
        return ie
    }) : "undefined" != typeof module && module.exports ? module.exports = ie : t[n] = ie
}(window, document, "Hammer");
