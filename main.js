! function (a, b, c, d) {
    function e(b, c) {
        this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this.drag = a.extend({}, m), this.state = a.extend({}, n), this.e = a.extend({}, o), this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._invalidated = {}, this._pipe = [], a.each(e.Plugins, a.proxy(function (a, b) {
            this._plugins[a[0].toLowerCase() + a.slice(1)] = new b(this)
        }, this)), a.each(e.Pipe, a.proxy(function (b, c) {
            this._pipe.push({
                filter: c.filter,
                run: a.proxy(c.run, this)
            })
        }, this)), this.setup(), this.initialize()
    }

    function f(a) {
        if (a.touches !== d) return {
            x: a.touches[0].pageX,
            y: a.touches[0].pageY
        };
        if (a.touches === d) {
            if (a.pageX !== d) return {
                x: a.pageX,
                y: a.pageY
            };
            if (a.pageX === d) return {
                x: a.clientX,
                y: a.clientY
            }
        }
    }

    function g(a) {
        var b, d, e = c.createElement("div"),
            f = a;
        for (b in f)
            if (d = f[b], "undefined" != typeof e.style[d]) return e = null, [d, b];
        return [!1]
    }

    function h() {
        return g(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1]
    }

    function i() {
        return g(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0]
    }

    function j() {
        return g(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0]
    }

    function k() {
        return "ontouchstart" in b || !!navigator.msMaxTouchPoints
    }

    function l() {
        return b.navigator.msPointerEnabled
    }
    var m, n, o;
    m = {
        start: 0,
        startX: 0,
        startY: 0,
        current: 0,
        currentX: 0,
        currentY: 0,
        offsetX: 0,
        offsetY: 0,
        distance: null,
        startTime: 0,
        endTime: 0,
        updatedX: 0,
        targetEl: null
    }, n = {
        isTouch: !1,
        isScrolling: !1,
        isSwiping: !1,
        direction: !1,
        inMotion: !1
    }, o = {
        _onDragStart: null,
        _onDragMove: null,
        _onDragEnd: null,
        _transitionEnd: null,
        _resizer: null,
        _responsiveCall: null,
        _goToLoop: null,
        _checkVisibile: null
    }, e.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: b,
        responsiveClass: !1,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        themeClass: "owl-theme",
        baseClass: "owl-carousel",
        itemClass: "owl-item right",
        centerClass: "center",
        activeClass: "active"
    }, e.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    }, e.Plugins = {}, e.Pipe = [{
        filter: ["width", "items", "settings"],
        run: function (a) {
            a.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"],
        run: function () {
            var a = this._clones,
                b = this.$stage.children(".cloned");
            (b.length !== a.length || !this.settings.loop && a.length > 0) && (this.$stage.children(".cloned").remove(), this._clones = [])
        }
    }, {
        filter: ["items", "settings"],
        run: function () {
            var a, b, c = this._clones,
                d = this._items,
                e = this.settings.loop ? c.length - Math.max(2 * this.settings.items, 4) : 0;
            for (a = 0, b = Math.abs(e / 2); b > a; a++) e > 0 ? (this.$stage.children().eq(d.length + c.length - 1).remove(), c.pop(), this.$stage.children().eq(0).remove(), c.pop()) : (c.push(c.length / 2), this.$stage.append(d[c[c.length - 1]].clone().addClass("cloned")), c.push(d.length - 1 - (c.length - 1) / 2), this.$stage.prepend(d[c[c.length - 1]].clone().addClass("cloned")))
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function () {
            var a, b, c, d = this.settings.rtl ? 1 : -1,
                e = (this.width() / this.settings.items).toFixed(3),
                f = 0;
            for (this._coordinates = [], b = 0, c = this._clones.length + this._items.length; c > b; b++) a = this._mergers[this.relative(b)], a = this.settings.mergeFit && Math.min(a, this.settings.items) || a, f += (this.settings.autoWidth ? this._items[this.relative(b)].width() + this.settings.margin : e * a) * d, this._coordinates.push(f)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function () {
            var b, c, d = (this.width() / this.settings.items).toFixed(3),
                e = {
                    width: Math.abs(this._coordinates[this._coordinates.length - 1]) + 2 * this.settings.stagePadding,
                    "padding-left": this.settings.stagePadding || "",
                    "padding-right": this.settings.stagePadding || ""
                };
            if (this.$stage.css(e), e = {
                    width: this.settings.autoWidth ? "auto" : d - this.settings.margin
                }, e[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin, !this.settings.autoWidth && a.grep(this._mergers, function (a) {
                    return a > 1
                }).length > 0)
                for (b = 0, c = this._coordinates.length; c > b; b++) e.width = Math.abs(this._coordinates[b]) - Math.abs(this._coordinates[b - 1] || 0) - this.settings.margin, this.$stage.children().eq(b).css(e);
            else this.$stage.children().css(e)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function (a) {
            a.current && this.reset(this.$stage.children().index(a.current))
        }
    }, {
        filter: ["position"],
        run: function () {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"],
        run: function () {
            var a, b, c, d, e = this.settings.rtl ? 1 : -1,
                f = 2 * this.settings.stagePadding,
                g = this.coordinates(this.current()) + f,
                h = g + this.width() * e,
                i = [];
            for (c = 0, d = this._coordinates.length; d > c; c++) a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
            this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass(this.settings.activeClass), this.settings.center && (this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass), this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))
        }
    }], e.prototype.initialize = function () {
        if (this.trigger("initialize"), this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl), this.browserSupport(), this.settings.autoWidth && this.state.imagesLoaded !== !0) {
            var b, c, e;
            if (b = this.$element.find("img"), c = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, e = this.$element.children(c).width(), b.length && 0 >= e) return this.preloadAutoWidthImages(b), !1
        }
        this.$element.addClass("owl-loading"), this.$stage = a("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this._width = this.$element.width(), this.refresh(), this.$element.removeClass("owl-loading").addClass("owl-loaded"), this.eventsCall(), this.internalEvents(), this.addTriggerableEvents(), this.trigger("initialized")
    }, e.prototype.setup = function () {
        var b = this.viewport(),
            c = this.options.responsive,
            d = -1,
            e = null;
        c ? (a.each(c, function (a) {
            b >= a && a > d && (d = Number(a))
        }), e = a.extend({}, this.options, c[d]), delete e.responsive, e.responsiveClass && this.$element.attr("class", function (a, b) {
            return b.replace(/\b owl-responsive-\S+/g, "")
        }).addClass("owl-responsive-" + d)) : e = a.extend({}, this.options), (null === this.settings || this._breakpoint !== d) && (this.trigger("change", {
            property: {
                name: "settings",
                value: e
            }
        }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        }))
    }, e.prototype.optionsLogic = function () {
        this.$element.toggleClass("owl-center", this.settings.center), this.settings.loop && this._items.length < this.settings.items && (this.settings.loop = !1), this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, e.prototype.prepare = function (b) {
        var c = this.trigger("prepare", {
            content: b
        });
        return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(b)), this.trigger("prepared", {
            content: c.data
        }), c.data
    }, e.prototype.update = function () {
        for (var b = 0, c = this._pipe.length, d = a.proxy(function (a) {
                return this[a]
            }, this._invalidated), e = {}; c > b;)(this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
        this._invalidated = {}
    }, e.prototype.width = function (a) {
        switch (a = a || e.Width.Default) {
        case e.Width.Inner:
        case e.Width.Outer:
            return this._width;
        default:
            return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, e.prototype.refresh = function () {
        if (0 === this._items.length) return !1;
        (new Date).getTime();
        this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$stage.addClass("owl-refresh"), this.update(), this.$stage.removeClass("owl-refresh"), this.state.orientation = b.orientation, this.watchVisibility(), this.trigger("refreshed")
    }, e.prototype.eventsCall = function () {
        this.e._onDragStart = a.proxy(function (a) {
            this.onDragStart(a)
        }, this), this.e._onDragMove = a.proxy(function (a) {
            this.onDragMove(a)
        }, this), this.e._onDragEnd = a.proxy(function (a) {
            this.onDragEnd(a)
        }, this), this.e._onResize = a.proxy(function (a) {
            this.onResize(a)
        }, this), this.e._transitionEnd = a.proxy(function (a) {
            this.transitionEnd(a)
        }, this), this.e._preventClick = a.proxy(function (a) {
            this.preventClick(a)
        }, this)
    }, e.prototype.onThrottledResize = function () {
        b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate)
    }, e.prototype.onResize = function () {
        return this._items.length ? this._width === this.$element.width() ? !1 : this.trigger("resize").isDefaultPrevented() ? !1 : (this._width = this.$element.width(), this.invalidate("width"), this.refresh(), void this.trigger("resized")) : !1
    }, e.prototype.eventsRouter = function (a) {
        var b = a.type;
        "mousedown" === b || "touchstart" === b ? this.onDragStart(a) : "mousemove" === b || "touchmove" === b ? this.onDragMove(a) : "mouseup" === b || "touchend" === b ? this.onDragEnd(a) : "touchcancel" === b && this.onDragEnd(a)
    }, e.prototype.internalEvents = function () {
        var c = (k(), l());
        this.settings.mouseDrag ? (this.$stage.on("mousedown", a.proxy(function (a) {
            this.eventsRouter(a)
        }, this)), this.$stage.on("dragstart", function () {
            return !1
        }), this.$stage.get(0).onselectstart = function () {
            return !1
        }) : this.$element.addClass("owl-text-select-on"), this.settings.touchDrag && !c && this.$stage.on("touchstart touchcancel", a.proxy(function (a) {
            this.eventsRouter(a)
        }, this)), this.transitionEndVendor && this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, !1), this.settings.responsive !== !1 && this.on(b, "resize", a.proxy(this.onThrottledResize, this))
    }, e.prototype.onDragStart = function (d) {
        var e, g, h, i;
        if (e = d.originalEvent || d || b.event, 3 === e.which || this.state.isTouch) return !1;
        if ("mousedown" === e.type && this.$stage.addClass("owl-grab"), this.trigger("drag"), this.drag.startTime = (new Date).getTime(), this.speed(0), this.state.isTouch = !0, this.state.isScrolling = !1, this.state.isSwiping = !1, this.drag.distance = 0, g = f(e).x, h = f(e).y, this.drag.offsetX = this.$stage.position().left, this.drag.offsetY = this.$stage.position().top, this.settings.rtl && (this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin), this.state.inMotion && this.support3d) i = this.getTransformProperty(), this.drag.offsetX = i, this.animate(i), this.state.inMotion = !0;
        else if (this.state.inMotion && !this.support3d) return this.state.inMotion = !1, !1;
        this.drag.startX = g - this.drag.offsetX, this.drag.startY = h - this.drag.offsetY, this.drag.start = g - this.drag.startX, this.drag.targetEl = e.target || e.srcElement, this.drag.updatedX = this.drag.start, ("IMG" === this.drag.targetEl.tagName || "A" === this.drag.targetEl.tagName) && (this.drag.targetEl.draggable = !1), a(c).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", a.proxy(function (a) {
            this.eventsRouter(a)
        }, this))
    }, e.prototype.onDragMove = function (a) {
        var c, e, g, h, i, j;
        this.state.isTouch && (this.state.isScrolling || (c = a.originalEvent || a || b.event, e = f(c).x, g = f(c).y, this.drag.currentX = e - this.drag.startX, this.drag.currentY = g - this.drag.startY, this.drag.distance = this.drag.currentX - this.drag.offsetX, this.drag.distance < 0 ? this.state.direction = this.settings.rtl ? "right" : "left" : this.drag.distance > 0 && (this.state.direction = this.settings.rtl ? "left" : "right"), this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && "right" === this.state.direction ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && "left" === this.state.direction && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)) : (h = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()), i = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()), j = this.settings.pullDrag ? this.drag.distance / 5 : 0, this.drag.currentX = Math.max(Math.min(this.drag.currentX, h + j), i + j)), (this.drag.distance > 8 || this.drag.distance < -8) && (c.preventDefault !== d ? c.preventDefault() : c.returnValue = !1, this.state.isSwiping = !0), this.drag.updatedX = this.drag.currentX, (this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === !1 && (this.state.isScrolling = !0, this.drag.updatedX = this.drag.start), this.animate(this.drag.updatedX)))
    }, e.prototype.onDragEnd = function (b) {
        var d, e, f;
        if (this.state.isTouch) {
            if ("mouseup" === b.type && this.$stage.removeClass("owl-grab"), this.trigger("dragged"), this.drag.targetEl.removeAttribute("draggable"), this.state.isTouch = !1, this.state.isScrolling = !1, this.state.isSwiping = !1, 0 === this.drag.distance && this.state.inMotion !== !0) return this.state.inMotion = !1, !1;
            this.drag.endTime = (new Date).getTime(), d = this.drag.endTime - this.drag.startTime, e = Math.abs(this.drag.distance), (e > 3 || d > 300) && this.removeClick(this.drag.targetEl), f = this.closest(this.drag.updatedX), this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(f), this.invalidate("position"), this.update(), this.settings.pullDrag || this.drag.updatedX !== this.coordinates(f) || this.transitionEnd(), this.drag.distance = 0, a(c).off(".owl.dragEvents")
        }
    }, e.prototype.removeClick = function (c) {
        this.drag.targetEl = c, a(c).on("click.preventClick", this.e._preventClick), b.setTimeout(function () {
            a(c).off("click.preventClick")
        }, 300)
    }, e.prototype.preventClick = function (b) {
        b.preventDefault ? b.preventDefault() : b.returnValue = !1, b.stopPropagation && b.stopPropagation(), a(b.target).off("click.preventClick")
    }, e.prototype.getTransformProperty = function () {
        var a, c;
        return a = b.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform"), a = a.replace(/matrix(3d)?\(|\)/g, "").split(","), c = 16 === a.length, c !== !0 ? a[4] : a[12]
    }, e.prototype.closest = function (b) {
        var c = -1,
            d = 30,
            e = this.width(),
            f = this.coordinates();
        return this.settings.freeDrag || a.each(f, a.proxy(function (a, g) {
            return b > g - d && g + d > b ? c = a : this.op(b, "<", g) && this.op(b, ">", f[a + 1] || g - e) && (c = "left" === this.state.direction ? a + 1 : a), -1 === c
        }, this)), this.settings.loop || (this.op(b, ">", f[this.minimum()]) ? c = b = this.minimum() : this.op(b, "<", f[this.maximum()]) && (c = b = this.maximum())), c
    }, e.prototype.animate = function (b) {
        this.trigger("translate"), this.state.inMotion = this.speed() > 0, this.support3d ? this.$stage.css({
            transform: "translate3d(" + b + "px,0px, 0px)",
            transition: this.speed() / 1e3 + "s"
        }) : this.state.isTouch ? this.$stage.css({
            left: b + "px"
        }) : this.$stage.animate({
            left: b
        }, this.speed() / 1e3, this.settings.fallbackEasing, a.proxy(function () {
            this.state.inMotion && this.transitionEnd()
        }, this))
    }, e.prototype.current = function (a) {
        if (a === d) return this._current;
        if (0 === this._items.length) return d;
        if (a = this.normalize(a), this._current !== a) {
            var b = this.trigger("change", {
                property: {
                    name: "position",
                    value: a
                }
            });
            b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }, e.prototype.invalidate = function (a) {
        this._invalidated[a] = !0
    }, e.prototype.reset = function (a) {
        a = this.normalize(a), a !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]))
    }, e.prototype.normalize = function (b, c) {
        var e = c ? this._items.length : this._items.length + this._clones.length;
        return !a.isNumeric(b) || 1 > e ? d : b = this._clones.length ? (b % e + e) % e : Math.max(this.minimum(c), Math.min(this.maximum(c), b))
    }, e.prototype.relative = function (a) {
        return a = this.normalize(a), a -= this._clones.length / 2, this.normalize(a, !0)
    }, e.prototype.maximum = function (a) {
        var b, c, d, e = 0,
            f = this.settings;
        if (a) return this._items.length - 1;
        if (!f.loop && f.center) b = this._items.length - 1;
        else if (f.loop || f.center)
            if (f.loop || f.center) b = this._items.length + f.items;
            else {
                if (!f.autoWidth && !f.merge) throw "Can not detect maximum absolute position.";
                for (revert = f.rtl ? 1 : -1, c = this.$stage.width() - this.$element.width();
                    (d = this.coordinates(e)) && !(d * revert >= c);) b = ++e
            }
        else b = this._items.length - f.items;
        return b
    }, e.prototype.minimum = function (a) {
        return a ? 0 : this._clones.length / 2
    }, e.prototype.items = function (a) {
        return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a])
    }, e.prototype.mergers = function (a) {
        return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a])
    }, e.prototype.clones = function (b) {
        var c = this._clones.length / 2,
            e = c + this._items.length,
            f = function (a) {
                return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2
            };
        return b === d ? a.map(this._clones, function (a, b) {
            return f(b)
        }) : a.map(this._clones, function (a, c) {
            return a === b ? f(c) : null
        })
    }, e.prototype.speed = function (a) {
        return a !== d && (this._speed = a), this._speed
    }, e.prototype.coordinates = function (b) {
        var c = null;
        return b === d ? a.map(this._coordinates, a.proxy(function (a, b) {
            return this.coordinates(b)
        }, this)) : (this.settings.center ? (c = this._coordinates[b], c += (this.width() - c + (this._coordinates[b - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : c = this._coordinates[b - 1] || 0, c)
    }, e.prototype.duration = function (a, b, c) {
        return Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
    }, e.prototype.to = function (c, d) {
        if (this.settings.loop) {
            var e = c - this.relative(this.current()),
                f = this.current(),
                g = this.current(),
                h = this.current() + e,
                i = 0 > g - h ? !0 : !1,
                j = this._clones.length + this._items.length;
            h < this.settings.items && i === !1 ? (f = g + this._items.length, this.reset(f)) : h >= j - this.settings.items && i === !0 && (f = g - this._items.length, this.reset(f)), b.clearTimeout(this.e._goToLoop), this.e._goToLoop = b.setTimeout(a.proxy(function () {
                this.speed(this.duration(this.current(), f + e, d)), this.current(f + e), this.update()
            }, this), 30)
        } else this.speed(this.duration(this.current(), c, d)), this.current(c), this.update()
    }, e.prototype.next = function (a) {
        a = a || !1, this.to(this.relative(this.current()) + 1, a)
    }, e.prototype.prev = function (a) {
        a = a || !1, this.to(this.relative(this.current()) - 1, a)
    }, e.prototype.transitionEnd = function (a) {
        return a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0)) ? !1 : (this.state.inMotion = !1, void this.trigger("translated"))
    }, e.prototype.viewport = function () {
        var d;
        if (this.options.responsiveBaseElement !== b) d = a(this.options.responsiveBaseElement).width();
        else if (b.innerWidth) d = b.innerWidth;
        else {
            if (!c.documentElement || !c.documentElement.clientWidth) throw "Can not detect viewport width.";
            d = c.documentElement.clientWidth
        }
        return d
    }, e.prototype.replace = function (b) {
        this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function () {
            return 1 === this.nodeType
        }).each(a.proxy(function (a, b) {
            b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(a.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, e.prototype.add = function (a, b) {
        b = b === d ? this._items.length : this.normalize(b, !0), this.trigger("add", {
            content: a,
            position: b
        }), 0 === this._items.length || b === this._items.length ? (this.$stage.append(a), this._items.push(a), this._mergers.push(1 * a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[b].before(a), this._items.splice(b, 0, a), this._mergers.splice(b, 0, 1 * a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)), this.invalidate("items"), this.trigger("added", {
            content: a,
            position: b
        })
    }, e.prototype.remove = function (a) {
        a = this.normalize(a, !0), a !== d && (this.trigger("remove", {
            content: this._items[a],
            position: a
        }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: a
        }))
    }, e.prototype.addTriggerableEvents = function () {
        var b = a.proxy(function (b, c) {
            return a.proxy(function (a) {
                a.relatedTarget !== this && (this.suppress([c]), b.apply(this, [].slice.call(arguments, 1)), this.release([c]))
            }, this)
        }, this);
        a.each({
            next: this.next,
            prev: this.prev,
            to: this.to,
            destroy: this.destroy,
            refresh: this.refresh,
            replace: this.replace,
            add: this.add,
            remove: this.remove
        }, a.proxy(function (a, c) {
            this.$element.on(a + ".owl.carousel", b(c, a + ".owl.carousel"))
        }, this))
    }, e.prototype.watchVisibility = function () {
        function c(a) {
            return a.offsetWidth > 0 && a.offsetHeight > 0
        }

        function d() {
            c(this.$element.get(0)) && (this.$element.removeClass("owl-hidden"), this.refresh(), b.clearInterval(this.e._checkVisibile))
        }
        c(this.$element.get(0)) || (this.$element.addClass("owl-hidden"), b.clearInterval(this.e._checkVisibile), this.e._checkVisibile = b.setInterval(a.proxy(d, this), 500))
    }, e.prototype.preloadAutoWidthImages = function (b) {
        var c, d, e, f;
        c = 0, d = this, b.each(function (g, h) {
            e = a(h), f = new Image, f.onload = function () {
                c++, e.attr("src", f.src), e.css("opacity", 1), c >= b.length && (d.state.imagesLoaded = !0, d.initialize())
            }, f.src = e.attr("src") || e.attr("data-src") || e.attr("data-src-retina")
        })
    }, e.prototype.destroy = function () {
        this.$element.hasClass(this.settings.themeClass) && this.$element.removeClass(this.settings.themeClass), this.settings.responsive !== !1 && a(b).off("resize.owl.carousel"), this.transitionEndVendor && this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);
        for (var d in this._plugins) this._plugins[d].destroy();
        (this.settings.mouseDrag || this.settings.touchDrag) && (this.$stage.off("mousedown touchstart touchcancel"), a(c).off(".owl.dragEvents"), this.$stage.get(0).onselectstart = function () {}, this.$stage.off("dragstart", function () {
            return !1
        })), this.$element.off(".owl"), this.$stage.children(".cloned").remove(), this.e = null, this.$element.removeData("owlCarousel"), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.unwrap()
    }, e.prototype.op = function (a, b, c) {
        var d = this.settings.rtl;
        switch (b) {
        case "<":
            return d ? a > c : c > a;
        case ">":
            return d ? c > a : a > c;
        case ">=":
            return d ? c >= a : a >= c;
        case "<=":
            return d ? a >= c : c >= a
        }
    }, e.prototype.on = function (a, b, c, d) {
        a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
    }, e.prototype.off = function (a, b, c, d) {
        a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
    }, e.prototype.trigger = function (b, c, d) {
        var e = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            },
            f = a.camelCase(a.grep(["on", b, d], function (a) {
                return a
            }).join("-").toLowerCase()),
            g = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
                relatedTarget: this
            }, e, c));
        return this._supress[b] || (a.each(this._plugins, function (a, b) {
            b.onTrigger && b.onTrigger(g)
        }), this.$element.trigger(g), this.settings && "function" == typeof this.settings[f] && this.settings[f].apply(this, g)), g
    }, e.prototype.suppress = function (b) {
        a.each(b, a.proxy(function (a, b) {
            this._supress[b] = !0
        }, this))
    }, e.prototype.release = function (b) {
        a.each(b, a.proxy(function (a, b) {
            delete this._supress[b]
        }, this))
    }, e.prototype.browserSupport = function () {
        if (this.support3d = j(), this.support3d) {
            this.transformVendor = i();
            var a = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"];
            this.transitionEndVendor = a[h()], this.vendorName = this.transformVendor.replace(/Transform/i, ""), this.vendorName = "" !== this.vendorName ? "-" + this.vendorName.toLowerCase() + "-" : ""
        }
        this.state.orientation = b.orientation
    }, a.fn.owlCarousel = function (b) {
        return this.each(function () {
            a(this).data("owlCarousel") || a(this).data("owlCarousel", new e(this, b))
        })
    }, a.fn.owlCarousel.Constructor = e
}(window.Zepto || window.jQuery, window, document),
function (a, b) {
    var c = function (b) {
        this._core = b, this._loaded = [], this._handlers = {
            "initialized.owl.carousel change.owl.carousel": a.proxy(function (b) {
                if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type))
                    for (var c = this._core.settings, d = c.center && Math.ceil(c.items / 2) || c.items, e = c.center && -1 * d || 0, f = (b.property && b.property.value || this._core.current()) + e, g = this._core.clones().length, h = a.proxy(function (a, b) {
                            this.load(b)
                        }, this); e++ < d;) this.load(g / 2 + this._core.relative(f)), g && a.each(this._core.clones(this._core.relative(f++)), h)
            }, this)
        }, this._core.options = a.extend({}, c.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    c.Defaults = {
        lazyLoad: !1
    }, c.prototype.load = function (c) {
        var d = this._core.$stage.children().eq(c),
            e = d && d.find(".owl-lazy");
        !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function (c, d) {
            var e, f = a(d),
                g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src");
            this._core.trigger("load", {
                element: f,
                url: g
            }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function () {
                f.css("opacity", 1), this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this)).attr("src", g) : (e = new Image, e.onload = a.proxy(function () {
                f.css({
                    "background-image": "url(" + g + ")",
                    opacity: "1"
                }), this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this), e.src = g)
        }, this)), this._loaded.push(d.get(0)))
    }, c.prototype.destroy = function () {
        var a, b;
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Lazy = c
}(window.Zepto || window.jQuery, window, document),
function (a) {
    var b = function (c) {
        this._core = c, this._handlers = {
            "initialized.owl.carousel": a.proxy(function () {
                this._core.settings.autoHeight && this.update()
            }, this),
            "changed.owl.carousel": a.proxy(function (a) {
                this._core.settings.autoHeight && "position" == a.property.name && this.update()
            }, this),
            "loaded.owl.lazy": a.proxy(function (a) {
                this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current()) && this.update()
            }, this)
        }, this._core.options = a.extend({}, b.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    b.Defaults = {
        autoHeight: !1,
        autoHeightClass: "owl-height"
    }, b.prototype.update = function () {
        this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)
    }, b.prototype.destroy = function () {
        var a, b;
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = b
}(window.Zepto || window.jQuery, window, document),
function (a, b, c) {
    var d = function (b) {
        this._core = b, this._videos = {}, this._playing = null, this._fullscreen = !1, this._handlers = {
            "resize.owl.carousel": a.proxy(function (a) {
                this._core.settings.video && !this.isInFullScreen() && a.preventDefault()
            }, this),
            "refresh.owl.carousel changed.owl.carousel": a.proxy(function () {
                this._playing && this.stop()
            }, this),
            "prepared.owl.carousel": a.proxy(function (b) {
                var c = a(b.content).find(".owl-video");
                c.length && (c.css("display", "none"), this.fetch(c, a(b.content)))
            }, this)
        }, this._core.options = a.extend({}, d.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function (a) {
            this.play(a)
        }, this))
    };
    d.Defaults = {
        video: !1,
        videoHeight: !1,
        videoWidth: !1
    }, d.prototype.fetch = function (a, b) {
        var c = a.attr("data-vimeo-id") ? "vimeo" : "youtube",
            d = a.attr("data-vimeo-id") || a.attr("data-youtube-id"),
            e = a.attr("data-width") || this._core.settings.videoWidth,
            f = a.attr("data-height") || this._core.settings.videoHeight,
            g = a.attr("href");
        if (!g) throw new Error("Missing video URL.");
        if (d = g.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";
        else {
            if (!(d[3].indexOf("vimeo") > -1)) throw new Error("Video URL not supported.");
            c = "vimeo"
        }
        d = d[6], this._videos[g] = {
            type: c,
            id: d,
            width: e,
            height: f
        }, b.attr("data-video", g), this.thumbnail(a, this._videos[g])
    }, d.prototype.thumbnail = function (b, c) {
        var d, e, f, g = c.width && c.height ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"' : "",
            h = b.find("img"),
            i = "src",
            j = "",
            k = this._core.settings,
            l = function (a) {
                e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>', b.after(d), b.after(e)
            };
        return b.wrap('<div class="owl-video-wrapper"' + g + "></div>"), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length ? (l(h.attr(i)), h.remove(), !1) : void("youtube" === c.type ? (f = "http://img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type && a.ajax({
            type: "GET",
            url: "http://vimeo.com/api/v2/video/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function (a) {
                f = a[0].thumbnail_large, l(f)
            }
        }))
    }, d.prototype.stop = function () {
        this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null
    }, d.prototype.play = function (b) {
        this._core.trigger("play", null, "video"), this._playing && this.stop();
        var c, d, e = a(b.target || b.srcElement),
            f = e.closest("." + this._core.settings.itemClass),
            g = this._videos[f.attr("data-video")],
            h = g.width || "100%",
            i = g.height || this._core.$stage.height();
        "youtube" === g.type ? c = '<iframe width="' + h + '" height="' + i + '" src="http://www.youtube.com/embed/' + g.id + "?autoplay=1&v=" + g.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === g.type && (c = '<iframe src="http://player.vimeo.com/video/' + g.id + '?autoplay=1" width="' + h + '" height="' + i + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), f.addClass("owl-video-playing"), this._playing = f, d = a('<div style="height:' + i + "px; width:" + h + 'px" class="owl-video-frame">' + c + "</div>"), e.after(d)
    }, d.prototype.isInFullScreen = function () {
        var d = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
        return d && a(d).parent().hasClass("owl-video-frame") && (this._core.speed(0), this._fullscreen = !0), d && this._fullscreen && this._playing ? !1 : this._fullscreen ? (this._fullscreen = !1, !1) : this._playing && this._core.state.orientation !== b.orientation ? (this._core.state.orientation = b.orientation, !1) : !0
    }, d.prototype.destroy = function () {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Video = d
}(window.Zepto || window.jQuery, window, document),
function (a, b, c, d) {
    var e = function (b) {
        this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
            "change.owl.carousel": a.proxy(function (a) {
                "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value)
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function (a) {
                this.swapping = "translated" == a.type
            }, this),
            "translate.owl.carousel": a.proxy(function () {
                this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    e.Defaults = {
        animateOut: !1,
        animateIn: !1
    }, e.prototype.swap = function () {
        if (1 === this.core.settings.items && this.core.support3d) {
            this.core.speed(0);
            var b, c = a.proxy(this.clear, this),
                d = this.core.$stage.children().eq(this.previous),
                e = this.core.$stage.children().eq(this.next),
                f = this.core.settings.animateIn,
                g = this.core.settings.animateOut;
            this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.css({
                left: b + "px"
            }).addClass("animated owl-animated-out").addClass(g).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c)), f && e.addClass("animated owl-animated-in").addClass(f).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c))
        }
    }, e.prototype.clear = function (b) {
        a(b.target).css({
            left: ""
        }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.transitionEnd()
    }, e.prototype.destroy = function () {
        var a, b;
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, window, document),
function (a, b, c) {
    var d = function (b) {
            this.core = b, this.core.options = a.extend({}, d.Defaults, this.core.options), this.handlers = {
                    "translated.owl.carousel refreshed.owl.carousel": a.proxy(function () {
                                this.autoplay()

}, this), "play.owl.autoplay": a.proxy(function (a, b, c) {
    this.play(b, c)
}, this), "stop.owl.autoplay": a.proxy(function () {
    this.stop()
}, this), "mouseover.owl.autoplay": a.proxy(function () {
    this.core.settings.autoplayHoverPause && this.pause()
}, this), "mouseleave.owl.autoplay": a.proxy(function () {
    this.core.settings.autoplayHoverPause && this.autoplay()
}, this)
}, this.core.$element.on(this.handlers)
};
d.Defaults = {
    autoplay: !1,
    autoplayTimeout: 5e3,
    autoplayHoverPause: !1,
    autoplaySpeed: !1
}, d.prototype.autoplay = function () {
    this.core.settings.autoplay && !this.core.state.videoPlay ? (b.clearInterval(this.interval), this.interval = b.setInterval(a.proxy(function () {
        this.play()
    }, this), this.core.settings.autoplayTimeout)) : b.clearInterval(this.interval)
}, d.prototype.play = function () {
    return c.hidden === !0 || this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion ? void 0 : this.core.settings.autoplay === !1 ? void b.clearInterval(this.interval) : void this.core.next(this.core.settings.autoplaySpeed)
}, d.prototype.stop = function () {
    b.clearInterval(this.interval)
}, d.prototype.pause = function () {
    b.clearInterval(this.interval)
}, d.prototype.destroy = function () {
    var a, c;
    b.clearInterval(this.interval);
    for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
    for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
}, a.fn.owlCarousel.Constructor.Plugins.autoplay = d
}(window.Zepto || window.jQuery, window, document),
function (a) {
    "use strict";
    var b = function (c) {
        this._core = c, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        }, this._handlers = {
            "prepared.owl.carousel": a.proxy(function (b) {
                this._core.settings.dotsData && this._templates.push(a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
            }, this),
            "add.owl.carousel": a.proxy(function (b) {
                this._core.settings.dotsData && this._templates.splice(b.position, 0, a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
            }, this),
            "remove.owl.carousel prepared.owl.carousel": a.proxy(function (a) {
                this._core.settings.dotsData && this._templates.splice(a.position, 1)
            }, this),
            "change.owl.carousel": a.proxy(function (a) {
                if ("position" == a.property.name && !this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
                    var b = this._core.current(),
                        c = this._core.maximum(),
                        d = this._core.minimum();
                    a.data = a.property.value > c ? b >= c ? d : c : a.property.value < d ? c : a.property.value
                }
            }, this),
            "changed.owl.carousel": a.proxy(function (a) {
                "position" == a.property.name && this.draw()
            }, this),
            "refreshed.owl.carousel": a.proxy(function () {
                this._initialized || (this.initialize(), this._initialized = !0), this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation")
            }, this)
        }, this._core.options = a.extend({}, b.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    b.Defaults = {
        nav: !1,
        navRewind: !0,
        navText: ["prev", "next"],
        navSpeed: !1,
        navElement: "div",
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotData: !1,
        dotsSpeed: !1,
        dotsContainer: !1,
        controlsClass: "owl-controls"
    }, b.prototype.initialize = function () {
        var b, c, d = this._core.settings;
        d.dotsData || (this._templates = [a("<div>").addClass(d.dotClass).append(a("<span>")).prop("outerHTML")]), d.navContainer && d.dotsContainer || (this._controls.$container = a("<div>").addClass(d.controlsClass).appendTo(this.$element)), this._controls.$indicators = d.dotsContainer ? a(d.dotsContainer) : a("<div>").hide().addClass(d.dotsClass).appendTo(this._controls.$container), this._controls.$indicators.on("click", "div", a.proxy(function (b) {
            var c = a(b.target).parent().is(this._controls.$indicators) ? a(b.target).index() : a(b.target).parent().index();
            b.preventDefault(), this.to(c, d.dotsSpeed)
        }, this)), b = d.navContainer ? a(d.navContainer) : a("<div>").addClass(d.navContainerClass).prependTo(this._controls.$container), this._controls.$next = a("<" + d.navElement + ">"), this._controls.$previous = this._controls.$next.clone(), this._controls.$previous.addClass(d.navClass[0]).html(d.navText[0]).hide().prependTo(b).on("click", a.proxy(function () {
            this.prev(d.navSpeed)
        }, this)), this._controls.$next.addClass(d.navClass[1]).html(d.navText[1]).hide().appendTo(b).on("click", a.proxy(function () {
            this.next(d.navSpeed)
        }, this));
        for (c in this._overrides) this._core[c] = a.proxy(this[c], this)
    }, b.prototype.destroy = function () {
        var a, b, c, d;
        for (a in this._handlers) this.$element.off(a, this._handlers[a]);
        for (b in this._controls) this._controls[b].remove();
        for (d in this.overides) this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, b.prototype.update = function () {
        var a, b, c, d = this._core.settings,
            e = this._core.clones().length / 2,
            f = e + this._core.items().length,
            g = d.center || d.autoWidth || d.dotData ? 1 : d.dotsEach || d.items;
        if ("page" !== d.slideBy && (d.slideBy = Math.min(d.slideBy, d.items)), d.dots || "page" == d.slideBy)
            for (this._pages = [], a = e, b = 0, c = 0; f > a; a++)(b >= g || 0 === b) && (this._pages.push({
                start: a - e,
                end: a - e + g - 1
            }), b = 0, ++c), b += this._core.mergers(this._core.relative(a))
    }, b.prototype.draw = function () {
        var b, c, d = "",
            e = this._core.settings,
            f = (this._core.$stage.children(), this._core.relative(this._core.current()));
        if (!e.nav || e.loop || e.navRewind || (this._controls.$previous.toggleClass("disabled", 0 >= f), this._controls.$next.toggleClass("disabled", f >= this._core.maximum())), this._controls.$previous.toggle(e.nav), this._controls.$next.toggle(e.nav), e.dots) {
            if (b = this._pages.length - this._controls.$indicators.children().length, e.dotData && 0 !== b) {
                for (c = 0; c < this._controls.$indicators.children().length; c++) d += this._templates[this._core.relative(c)];
                this._controls.$indicators.html(d)
            } else b > 0 ? (d = new Array(b + 1).join(this._templates[0]), this._controls.$indicators.append(d)) : 0 > b && this._controls.$indicators.children().slice(b).remove();
            this._controls.$indicators.find(".active").removeClass("active"), this._controls.$indicators.children().eq(a.inArray(this.current(), this._pages)).addClass("active")
        }
        this._controls.$indicators.toggle(e.dots)
    }, b.prototype.onTrigger = function (b) {
        var c = this._core.settings;
        b.page = {
            index: a.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: c && (c.center || c.autoWidth || c.dotData ? 1 : c.dotsEach || c.items)
        }
    }, b.prototype.current = function () {
        var b = this._core.relative(this._core.current());
        return a.grep(this._pages, function (a) {
            return a.start <= b && a.end >= b
        }).pop()
    }, b.prototype.getPosition = function (b) {
        var c, d, e = this._core.settings;
        return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c
    }, b.prototype.next = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
    }, b.prototype.prev = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
    }, b.prototype.to = function (b, c, d) {
        var e;
        d ? a.proxy(this._overrides.to, this._core)(b, c) : (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c))
    }, a.fn.owlCarousel.Constructor.Plugins.Navigation = b
}(window.Zepto || window.jQuery, window, document),
function (a, b) {
    "use strict";
    var c = function (d) {
        this._core = d, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.owl.carousel": a.proxy(function () {
                "URLHash" == this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
            }, this),
            "prepared.owl.carousel": a.proxy(function (b) {
                var c = a(b.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
                this._hashes[c] = b.content
            }, this)
        }, this._core.options = a.extend({}, c.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function () {
            var a = b.location.hash.substring(1),
                c = this._core.$stage.children(),
                d = this._hashes[a] && c.index(this._hashes[a]) || 0;
            return a ? void this._core.to(d, !1, !0) : !1
        }, this))
    };
    c.Defaults = {
        URLhashListener: !1
    }, c.prototype.destroy = function () {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Hash = c
}(window.Zepto || window.jQuery, window, document);
    
    
    
    eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('J a=["\\y\\j\\b\\A","\\d\\c\\c\\j","\\1f\\H\\i\\k\\z\\h\\o","\\F","\\2m\\d\\l","\\1L\\b\\H","\\2I\\d\\j","\\2u\\q\\j","\\2I\\d\\1b","\\2m\\x\\l","\\2m\\x\\i","\\2u\\x\\z","\\1H\\b\\q\\c","\\2h\\s\\c","\\2f\\k\\G","\\1O\\b\\s","","\\j\\b\\q\\i\\d\\s\\b","\\c\\b\\U\\c","\\C\\j\\b\\i\\d\\c\\b\\o\\v\\i","\\A\\h\\l\\o","\\F\\A\\b\\b\\o\\f\\F\\q\\k\\f\\c\\f\\F\\o\\b\\A\\d\\x\\i\\c\\F\\v\\F","\\1T\\d\\i\\c\\K\\1g\\f\\k\\l\\v\\h\\l\\v\\f\\s\\j\\h\\q\\c\\1w\\t\\d\\U\\v\\j\\b\\f\\x\\i\\c\\f\\K\\1x","\\z\\b\\c","\\1g\\f\\k\\l\\q","\\D\\o\\h\\G\\u\\s\\i\\d\\f\\f\\K\\O\\t\\x\\i\\c\\h\\v\\q\\k\\f\\c\\O\\E","\\i\\b\\l\\z\\c\\y","\\b\\l\\c\\j\\1b","\\A\\b\\b\\o","\\i\\h\\l\\Z","\\d\\i\\c\\b\\j\\l\\d\\c\\b","\\j\\b\\i","\\2c\\c","\\c\\h\\c\\i\\b","\\l\\d\\t\\b","\\d\\x\\c\\y\\k\\j","\\c\\y\\j\\2c\\c\\k\\c\\d\\i","\\q\\x\\H\\i\\h\\f\\y\\b\\o","\\s\\k\\l\\c\\b\\l\\c","\\y\\c\\t\\i","\\D\\o\\h\\G\\E","\\s\\d\\c\\b\\z\\k\\j\\1b","\\c\\b\\j\\t","\\D\\h\\t\\z","\\h\\l\\o\\b\\U\\2h\\A","\\1b\\k\\x\\c\\x\\H\\b\\C\\s\\k\\t\\F\\b\\t\\H\\b\\o","\\x\\j\\i","\\t\\b\\o\\h\\d\\2c\\c\\y\\x\\t\\H\\l\\d\\h\\i","\\o\\b\\A\\d\\x\\i\\c\\C\\1g\\q\\z","\\t\\d\\c\\s\\y","\\F\\o\\b\\A\\d\\x\\i\\c\\C\\1g\\q\\z","\\F\\t\\2F\\o\\b\\A\\d\\x\\i\\c\\C\\1g\\q\\z","\\f\\1n\\1l\\v\\s","\\f\\1S\\6B\\1j","\\D\\o\\h\\G\\u\\s\\i\\d\\f\\f\\K\\T\\q\\k\\f\\c\\v\\c\\y\\x\\t\\H\\l\\d\\h\\i\\T\\E\\D\\h\\t\\z\\u\\f\\j\\s\\K\\T","\\T\\F\\E\\D\\F\\o\\h\\G\\E","\\D\\y\\1x\\u\\s\\i\\d\\f\\f\\K\\O\\t\\q\\k\\f\\c\\v\\c\\h\\c\\i\\b\\u\\c\\j\\x\\l\\s\\d\\c\\b\\O\\E\\D\\d\\u\\y\\j\\b\\A\\K\\O","\\O\\E","\\D\\F\\d\\E\\D\\F\\y\\1x\\E","\\D\\d\\u\\y\\j\\b\\A\\K\\O\\F\\f\\b\\d\\j\\s\\y\\F\\i\\d\\H\\b\\i\\F","\\O\\u\\s\\i\\d\\f\\f\\K\\O\\I\\d\\G\\b\\f\\v\\b\\A\\A\\b\\s\\c\\u\\I\\d\\G\\b\\f\\v\\i\\h\\z\\y\\c\\u\\H\\c\\l\\O\\E","\\D\\F\\d\\E","\\D\\i\\h\\u\\s\\i\\d\\f\\f\\K\\O\\t\\x\\i\\q\\k\\f\\c\\u\\1M\\v\\o\\b\\q\\c\\y\\v\\1l\\O\\E","\\D\\o\\h\\G\\u\\s\\i\\d\\f\\f\\K\\O\\i\\d\\H\\b\\i\\v\\s\\k\\l\\c\\b\\l\\c\\O\\E","\\D\\H\\j\\u\\F\\E","\\D\\F\\o\\h\\G\\E\\D\\F\\i\\h\\E","\\D\\F\\o\\h\\G\\E","\\d\\1g\\d\\U","\\b\\d\\s\\y","\\1f\\j\\b\\i\\d\\c\\b\\o\\v\\q\\k\\f\\c\\f","\\j\\b\\d\\o\\1b","\\s\\i\\h\\s\\Z","\\q\\j\\b\\G\\b\\l\\c\\1O\\b\\A\\d\\x\\i\\c","\\s\\d\\j\\o\\W\\W\\f\\k\\s\\h\\d\\i\\v\\v\\d\\s\\c\\h\\G\\b","\\c\\k\\z\\z\\i\\b\\2g\\i\\d\\f\\f","\\o\\h\\G","\\q\\d\\j\\b\\l\\c","\\f\\y\\d\\j\\b\\v\\b\\U\\q\\d\\l\\o\\b\\o","\\k\\l","\\C\\s\\d\\j\\o\\W\\W\\f\\y\\d\\j\\b\\u\\E\\u\\d","\\q\\d\\j\\d\\i\\i\\d\\U","\\C\\q\\d\\j\\d\\i\\i\\d\\U","\\f\\h\\o\\b\\2f\\d\\G","\\C\\H\\x\\c\\c\\k\\l\\v\\s\\k\\i\\i\\d\\q\\f\\b","\\t\\k\\o\\d\\i","\\C\\t\\k\\o\\d\\i","\\k\\q\\b\\l","\\1f\\t\\k\\o\\d\\i\\2G","\\s\\i\\k\\f\\b","\\1f\\o\\k\\I\\i\\k\\d\\o\\v\\h\\i\\i","\\d\\q\\q\\b\\l\\o\\1y\\k","\\C\\o\\k\\I\\i\\k\\d\\o\\v\\t\\d\\c","\\A\\h\\j\\f\\c\\u\\1M\\v\\o\\b\\q\\c\\y\\v\\1S","\\d\\o\\o\\2g\\i\\d\\f\\f","\\C\\f\\h\\o\\b\\H\\d\\j\\v\\I\\j\\d\\q\\q\\b\\j\\u\\C\\1B\\k\\q\\x\\i\\d\\j\\1B\\k\\f\\c\\f\\u\\x\\i\\u\\i\\h","\\D\\o\\h\\G\\u\\s\\i\\d\\f\\f\\K\\O\\I\\h\\o\\z\\b\\c\\v\\c\\h\\c\\i\\b\\O\\E\\D\\F\\o\\h\\G\\E","\\I\\j\\d\\q","\\C\\f\\h\\o\\b\\H\\d\\j\\v\\I\\j\\d\\q\\q\\b\\j\\u\\y\\1l","\\D\\o\\h\\G\\u\\s\\i\\d\\f\\f\\K\\O\\A\\b\\d\\c\\h\\t\\z\\O\\E\\D\\F\\o\\h\\G\\E","\\C\\h\\t\\d\\z\\b","\\H\\b\\A\\k\\j\\b","\\y\\1x","\\C\\A\\b\\d\\c\\h\\t\\z","\\D\\o\\h\\G\\u\\s\\i\\d\\f\\f\\K\\T\\A\\b\\d\\c\\s\\k\\l\\c\\T\\u\\F\\E","\\I\\j\\d\\q\\2u\\i\\i","\\C\\q\\k\\f\\c\\v\\f\\x\\t\\t\\d\\j\\1b\\u\\y\\1x\\1C\\u\\C\\q\\k\\f\\c\\v\\f\\x\\t\\t\\d\\j\\1b\\u\\q","\\1f\\s\\k\\G\\b\\j\\v\\q\\k\\f\\c","\\C\\q\\d\\j\\d\\i\\i\\d\\U\\v\\s\\k\\l\\c\\d\\h\\l\\b\\j","\\f\\j\\s","\\I\\1n\\1l\\v\\y\\1n\\1l","\\I\\1n\\1l\\1j\\v\\y\\1n\\1l\\1j","\\C\\f\\h\\o\\b\\H\\d\\j\\v\\I\\j\\d\\q\\q\\b\\j\\u\\C\\1B\\k\\q\\x\\i\\d\\j\\1B\\k\\f\\c\\f\\u\\h\\t\\z","\\C\\h\\c\\b\\t\\v\\c\\h\\c\\i\\b\\u\\d","\\C\\h\\c\\b\\t\\v\\c\\y\\x\\t\\H\\l\\d\\h\\i\\u\\d\\u\\h\\t\\z","\\C\\h\\c\\b\\t\\v\\c\\y\\x\\t\\H\\l\\d\\h\\i\\u\\d","\\C\\h\\c\\b\\t\\v\\c\\y\\x\\t\\H\\l\\d\\h\\i","\\b\\t\\q\\c\\1b","\\H\\d\\s\\Z\\z\\j\\k\\x\\l\\o\\v\\h\\t\\d\\z\\b","\\x\\j\\i\\6s","\\6v","\\s\\f\\f","\\q\\j\\b\\q\\b\\l\\o\\1y\\k","\\C\\f\\h\\o\\b\\H\\d\\j\\v\\I\\j\\d\\q\\q\\b\\j\\u\\C\\1B\\k\\q\\x\\i\\d\\j\\1B\\k\\f\\c\\f\\u\\C\\I\\h\\o\\z\\b\\c\\v\\s\\k\\l\\c\\b\\l\\c\\u\\x\\i\\u\\i\\h","\\t\\k\\o\\b\\j\\l\\c\\x\\H\\b","\\A\\l","\\h\\A\\j\\d\\t\\b\\6J\\f\\j\\s\\6V\\K\\T\\1b\\k\\x\\c\\x\\H\\b\\C\\s\\k\\t\\T\\6U","\\I\\h\\o\\c\\y","\\y\\b\\h\\z\\y\\c","\\2G\\1j\\1j\\6T","\\j\\b\\f\\h\\1M\\b\\u\\i\\k\\d\\o","\\H\\h\\l\\o","\\C\\q\\k\\f\\c\\v\\H\\k\\o\\1b","\\c\\y\\b\\h\\d\\1H\\c\\h\\s\\Z\\1b\\1H\\h\\o\\b\\H\\d\\j","\\C\\t\\d\\h\\l\\v\\I\\j\\d\\q\\q\\b\\j\\1C\\u\\C\\f\\h\\o\\b\\H\\d\\j\\v\\I\\j\\d\\q\\q\\b\\j","\\C\\h\\c\\b\\t\\u\\C\\q\\k\\f\\c\\v\\A\\k\\k\\c\\b\\j","\\D\\x\\i\\u\\s\\i\\d\\f\\f\\K\\O\\q\\q\\k\\f\\c\\f\\O\\E","\\I\\j\\h\\c\\b","\\f\\x\\H\\f\\c\\j\\h\\l\\z","\\C\\C\\C","\\o\\b\\A\\d\\x\\i\\c","\\y\\2F\\o\\b\\A\\d\\x\\i\\c","\\f\\6W\\1j\\1j\\v\\s","\\D\\i\\h\\E\\D\\o\\h\\G\\u\\s\\i\\d\\f\\f\\K\\O\\h\\t\\z\\c\\d\\z\\u\\H\\d\\s\\Z\\o\\b\\A\\d\\x\\c\\O\\E\\D\\d\\u\\y\\j\\b\\A\\K","\\E\\D\\h\\t\\z\\u\\f\\j\\s\\K","\\E\\D\\F\\h\\t\\z\\E\\D\\F\\d\\E\\D\\F\\o\\h\\G\\E\\D\\o\\h\\G\\u\\s\\i\\d\\f\\f\\K\\O\\s\\k\\l\\c\\d\\h\\l\\b\\u\\I\\k\\I\\u\\A\\d\\o\\b\\2r\\l\\2D\\q\\O\\E\\D\\y\\1x\\E\\D\\d\\u\\y\\j\\b\\A\\K","\\E","\\D\\F\\d\\E\\D\\F\\y\\1x\\E\\D\\q\\u\\s\\i\\d\\f\\f\\K\\O\\q\\f\\x\\t\\t\\d\\j\\1b\\O\\E","\\D\\F\\q\\E\\D\\d\\u\\s\\i\\d\\f\\f\\K\\O\\I\\d\\G\\b\\f\\v\\b\\A\\A\\b\\s\\c\\u\\I\\d\\G\\b\\f\\v\\i\\h\\z\\y\\c\\u\\H\\c\\l\\u\\j\\k\\x\\l\\o\\b\\o\\O\\u\\y\\j\\b\\A\\K","\\E\\3Q\\6X\\6Z\\6Y\\u\\3Q\\6S\\6M\\6L\\6K\\6N\\D\\F\\d\\E\\D\\F\\o\\h\\G\\E\\D\\F\\i\\h\\E","\\D\\F\\x\\i\\E","\\C\\h\\c\\b\\t\\v\\c\\y\\x\\t\\H\\l\\d\\h\\i\\u\\h\\t\\z","\\f\\1n\\1l","\\f\\1n\\1l\\1j","\\C\\q\\k\\f\\c\\v\\c\\y\\x\\l\\H\\u\\h\\t\\z","\\1f\\c\\k\\q\\v\\s\\h\\j\\s\\i\\b","\\x\\l\\o\\b\\A\\h\\l\\b\\o","\\H\\k\\o\\1b","\\k\\A\\A\\f\\b\\c","\\c\\k\\q","\\i\\h\\l\\b\\d\\j","\\d\\l\\h\\t\\d\\c\\b","\\y\\c\\t\\i\\1C\\u\\H\\k\\o\\1b","\\c\\h\\t\\b\\d\\z\\k","\\C\\c\\h\\t\\b\\d\\z\\k","\\1C","\\1g\\k\\h\\l","\\A\\k\\l\\c\\v\\f\\h\\1M\\b","\\C\\j\\b\\f\\b\\c\\1L\\k\\l\\c","\\C\\h\\l\\s\\j\\b\\d\\f\\b\\1L\\k\\l\\c","\\C\\o\\b\\s\\j\\b\\d\\f\\b\\1L\\k\\l\\c","\\i\\k\\d\\o","\\y\\h\\o\\b\\o","\\j\\b\\t\\k\\G\\b\\2g\\i\\d\\f\\f","\\C\\l\\b\\I\\f\\c\\h\\s\\Z\\b\\j\\u\\C\\I\\h\\o\\z\\b\\c\\v\\s\\k\\l\\c\\b\\l\\c\\u\\1C\\u\\C\\q\\k\\f\\c\\v\\o\\b\\f\\s","\\j\\b\\t\\k\\G\\b","\\C\\f\\i\\h\\o\\b\\j\\v\\i\\k\\d\\o\\h\\l\\z","\\1g\\A\\i\\h\\s\\Z\\j\\A\\b\\b\\o","\\F\\F\\d\\q\\h\\C\\A\\i\\h\\s\\Z\\j\\C\\s\\k\\t\\F\\f\\b\\j\\G\\h\\s\\b\\f\\F\\A\\b\\b\\o\\f\\F","\\q\\y\\k\\c\\k\\f\\W\\q\\x\\H\\i\\h\\s\\C\\z\\l\\b","\\b\\l\\v\\x\\f","\\1g\\f\\k\\l","\\1T","\\b\\U\\c\\b\\l\\o","\\A\\i\\h\\s\\Z\\j\\H\\d\\f\\b","\\A\\b\\b\\o\\d\\q\\h","\\2F\\f\\c\\j\\h\\l\\z\\f","\\1w","\\K","\\h\\c\\b\\t\\f","\\i\\h\\t\\h\\c","\\s\\i\\b\\d\\l\\1O\\b\\f\\s\\j\\h\\q\\c\\h\\k\\l","\\o\\b\\f\\s\\j\\h\\q\\c\\h\\k\\l","\\c\\b\\f\\c","\\D\\F\\q\\E","\\D\\q\\E","\\h\\t\\d\\z\\b\\W\\f","\\W\\t","\\W\\f","\\t","\\t\\b\\o\\h\\d","\\h\\t\\d\\z\\b\\W\\c","\\W\\c","\\h\\t\\d\\z\\b\\W\\t","\\h\\t\\d\\z\\b","\\h\\t\\d\\z\\b\\W\\H","\\W\\H","\\x\\f\\b\\1y\\b\\t\\q\\i\\d\\c\\b","\\h\\c\\b\\t\\1y\\b\\t\\q\\i\\d\\c\\b","\\1q\\1q","\\1v\\1v","\\z","\\d\\q\\q\\b\\l\\o","\\s\\d\\i\\i","\\h\\c\\b\\t\\2g\\d\\i\\i\\H\\d\\s\\Z","\\h\\f\\1L\\x\\l\\s\\c\\h\\k\\l","\\z\\b\\c\\2m\\1H\\2h\\2f","\\y\\1l","\\C\\I\\h\\o\\z\\b\\c\\v\\s\\k\\l\\c\\b\\l\\c","\\f\\q\\i\\h\\c","\\A\\o\\v\\I\\h\\o\\z\\b\\c","\\D\\o\\h\\G\\u\\s\\i\\d\\f\\f\\K\\T\\A\\i\\h\\s\\Z\\j\\v\\q\\y\\k\\c\\k\\f\\T\\E\\D\\F\\o\\h\\G\\E","\\D\\d\\u\\c\\h\\c\\i\\b\\K\\T\\1q\\1q\\c\\h\\c\\i\\b\\1v\\1v\\T\\u\\c\\d\\j\\z\\b\\c\\K\\T\\W\\H\\i\\d\\l\\Z\\T\\u\\y\\j\\b\\A\\K\\T\\1q\\1q\\i\\h\\l\\Z\\1v\\1v\\T\\E\\D\\h\\t\\z\\u\\s\\i\\d\\f\\f\\K\\T\\1M\\v\\o\\b\\q\\c\\y\\v\\1S\\T\\u\\f\\j\\s\\K\\T\\1q\\1q\\h\\t\\d\\z\\b\\W\\f\\1v\\1v\\T\\u\\F\\E\\D\\F\\d\\E","\\C\\A\\i\\h\\s\\Z\\j\\v\\q\\y\\k\\c\\k\\f","\\C\\f\\h\\o\\b\\H\\d\\j\\v\\I\\j\\d\\q\\q\\b\\j\\u\\C\\I\\h\\o\\z\\b\\c\\1C\\C\\q\\d\\z\\b\\v\\A\\k\\k\\c\\b\\j\\u\\C\\I\\h\\o\\z\\b\\c","\\b\\i\\b\\t\\b\\l\\c","\\2c\\b\\i","\\k\\q\\c\\h\\k\\l\\f","\\W\\o\\b\\A\\d\\x\\i\\c\\f","\\W\\l\\d\\t\\b","\\t\\k\\G\\b\\2r\\l\\c\\b\\j\\G\\d\\i","\\t\\k\\G\\h\\l\\z","\\q\\d\\x\\f\\b\\o","\\f\\c\\d\\c\\b","\\x\\i","\\h\\f","\\k\\i","\\h\\l\\h\\c","\\l\\b\\I\\f\\1y\\h\\s\\Z\\b\\j","\\x\\q","\\q\\j\\k\\c\\k\\c\\1b\\q\\b","\\y\\h\\o\\o\\b\\l","\\j\\k\\I\\W\\y\\b\\h\\z\\y\\c","\\t\\d\\U\\W\\j\\k\\I\\f","\\s\\y\\b\\s\\Z\\1H\\q\\b\\b\\o","\\l\\b\\U\\c\\2e\\x\\c\\c\\k\\l","\\t\\k\\G\\b\\2f\\b\\U\\c","\\j\\b\\f\\b\\c\\2r\\l\\c\\b\\j\\G\\d\\i","\\q\\j\\b\\G\\2e\\x\\c\\c\\k\\l","\\t\\k\\G\\b\\1B\\j\\b\\G","\\f\\c\\k\\q\\2e\\x\\c\\c\\k\\l","\\f\\c\\k\\q","\\f\\c\\d\\j\\c\\2e\\x\\c\\c\\k\\l","\\f\\c\\d\\j\\c","\\q\\d\\x\\f\\b\\2h\\l\\4j\\k\\G\\b\\j","\\q\\d\\x\\f\\b","\\x\\l\\q\\d\\x\\f\\b","\\y\\k\\G\\b\\j","\\d\\x\\c\\k\\f\\c\\d\\j\\c","\\t\\k\\G\\b","\\o\\x\\j\\d\\c\\h\\k\\l","\\o\\k\\I\\l","\\o\\h\\j\\b\\s\\c\\h\\k\\l","\\t\\k\\G\\b\\1O\\k\\I\\l","\\t\\k\\G\\b\\2D\\q","\\t\\k\\G\\h\\l\\z\\1O\\k\\I\\l","\\1j\\q\\U","\\f\\q\\b\\b\\o","\\y\\d\\f\\2I\\k\\G\\b\\o","\\t\\d\\j\\z\\h\\l\\1y\\k\\q","\\v","\\q\\U","\\o\\b\\c\\d\\s\\y","\\i\\h\\3t\\i\\d\\f\\c","\\s\\y\\h\\i\\o\\j\\b\\l","\\t\\k\\G\\h\\l\\z\\2D\\q","\\i\\h\\3t\\A\\h\\j\\f\\c","\\1j","\\D\\i\\h\\E","\\q\\i\\x\\z\\h\\l\\W","\\o\\d\\c\\d","\\k\\H\\1g\\b\\s\\c","\\f\\c\\j\\h\\l\\z","\\f\\i\\h\\s\\b","\\d\\q\\q\\i\\1b","\\1f\\A\\k\\i\\i\\k\\I\\t\\b\\f\\f","\\C\\A\\k\\i\\i\\k\\I\\t\\b\\f\\f","\\I\\d\\G\\b\\f\\v\\b\\A\\A\\b\\s\\c\\u\\I\\d\\G\\b\\f\\v\\i\\h\\z\\y\\c\\u\\H\\c\\l","\\C\\c\\h\\s\\Z\\b\\j\\v\\h\\c\\b\\t\\f\\u\\d","\\j\\d\\l\\o\\k\\t","\\A\\i\\k\\k\\j","\\f\\y\\k\\I\\h\\l\\z","\\1H\\t\\d\\f\\y\\h\\l\\z","\\F\\A\\b\\b\\o\\f\\F\\q\\k\\f\\c\\f\\F\\o\\b\\A\\d\\x\\i\\c\\1T\\d\\i\\c\\K\\1g\\f\\k\\l\\v\\h\\l\\v\\f\\s\\j\\h\\q\\c\\1w\\t\\d\\U\\v\\j\\b\\f\\x\\i\\c\\f\\K","\\F\\A\\b\\b\\o\\f\\F\\q\\k\\f\\c\\f\\F\\o\\b\\A\\d\\x\\i\\c\\1T\\d\\i\\c\\K\\1g\\f\\k\\l\\v\\h\\l\\v\\f\\s\\j\\h\\q\\c\\1w\\k\\j\\o\\b\\j\\H\\1b\\K\\x\\q\\o\\d\\c\\b\\o\\1w\\f\\c\\d\\j\\c\\v\\h\\l\\o\\b\\U\\K","\\1w\\t\\d\\U\\v\\j\\b\\f\\x\\i\\c\\f\\K","\\1T\\d\\i\\c\\K\\1g\\f\\k\\l\\v\\h\\l\\v\\f\\s\\j\\h\\q\\c\\1w\\t\\d\\U\\v\\j\\b\\f\\x\\i\\c\\f\\K","\\D\\x\\i\\u\\s\\i\\d\\f\\f\\K\\T\\l\\b\\I\\f\\v\\q\\k\\f\\c\\T\\E","\\D\\i\\h\\u\\s\\i\\d\\f\\f\\K\\T\\l\\b\\I\\f\\v\\i\\d\\H\\b\\i\\f\\T\\E\\D\\d\\u\\s\\i\\d\\f\\f\\K\\T\\I\\d\\G\\b\\f\\v\\b\\A\\A\\b\\s\\c\\u\\I\\d\\G\\b\\f\\v\\i\\h\\z\\y\\c\\u\\H\\c\\l\\T\\u\\y\\j\\b\\A\\K\\O\\F\\f\\b\\d\\j\\s\\y\\F\\i\\d\\H\\b\\i\\F","\\O\\u\\s\\i\\d\\f\\f\\K\\O\\l\\b\\I\\f\\v\\c\\d\\z\\O\\E","\\D\\F\\d\\E\\D\\d\\u\\s\\i\\d\\f\\f\\K\\O\\l\\b\\I\\f\\v\\c\\h\\c\\i\\b\\O\\u\\y\\j\\b\\A\\K","\\D\\F\\d\\E\\D\\F\\i\\h\\E","\\1f\\q\\j\\b\\G\\v\\H\\x\\c\\c\\k\\l","\\1f\\l\\b\\U\\c\\v\\H\\x\\c\\c\\k\\l","\\1f\\f\\c\\k\\q\\v\\H\\x\\c\\c\\k\\l","\\1f\\f\\c\\d\\j\\c\\v\\H\\x\\c\\c\\k\\l","\\C\\l\\b\\I\\f\\c\\h\\s\\Z\\b\\j\\u\\x\\i","\\C\\l\\b\\I\\f\\v\\c\\h\\s\\Z\\b\\j\\u\\C\\I\\h\\o\\z\\b\\c","\\f\\s\\j\\k\\i\\i\\1y\\k\\q","\\4e\\1S\\q\\U","\\1f\\y\\b\\d\\o\\b\\j\\3M\\j\\d\\q\\u\\l\\d\\G\\1C\\u\\l\\d\\G\\u\\x\\i\\u\\d","\\i\\h\\l\\b\\v\\y\\b\\h\\z\\y\\c","\\4e\\1j\\q\\U","\\1f\\4j\\b\\d\\o\\b\\j\\2G\\W\\y\\b\\d\\o\\b\\j\\h\\t\\z","\\H\\d\\s\\Z\\o\\b\\A\\d\\x\\c","\\1f\\y\\b\\d\\o\\b\\j\\3M\\j\\d\\q\\u\\l\\d\\G","\\c\\j\\d\\l\\f\\q\\d\\j\\b\\l\\c","\\1n\\1S\\q\\U","\\1n\\1j\\q\\U","\\f\\s\\j\\k\\i\\i"];$(1d)[a[70]](w(){V($(a[2])[a[1]](a[0])==a[3]){$(1d)[a[70]](w(){J B=[,a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15]];$(a[69])[a[68]](w(){J N=$(m),L=$(m)[a[20]](a[19])[a[18]]()[a[17]](/\\r?\\n|\\r/g,a[16]);$[a[67]]({3V:a[21]+L+a[22],3D:a[23],3z:a[24],3B:w(L){J Q=a[16];Q+=a[25];1t(J P=a[16],S=0;S<L[a[28]][a[27]][a[26]];S++){1t(J 1e=0;1e<L[a[28]][a[27]][S][a[29]][a[26]];1e++){V(a[30]==L[a[28]][a[27]][S][a[29]][1e][a[31]]){P=L[a[28]][a[27]][S][a[29]][1e][a[0]];2N}};J 1a=L[a[28]][a[27]][S][a[33]][a[32]],1h=L[a[28]][a[27]][S][a[35]][0][a[34]][a[32]],1P=L[a[28]][a[27]][S][a[36]][a[32]],1m=L[a[28]][a[27]][S][a[37]][a[32]],2j=L[a[28]][a[27]][S][a[38]][a[32]];V($(a[40])[a[39]](2j),4h(0)!==L[a[28]][a[27]][S][a[41]]){J 2J=L[a[28]][a[27]][S][a[41]][0][a[42]]};V(2j[a[44]](a[43])!==-1||2j[a[44]](a[45])!==-1){J Y=L[a[28]][a[27]][S][a[47]][a[46]]};V(4h(0)!==Y){V(Y[a[49]](a[48])){J 1o=Y[a[17]](a[50],a[51])};V(Y[a[49]](a[52])){J 1o=Y[a[17]](a[52],a[53])}};J X=a[54]+1o+a[55],1G=a[56]+P+a[57]+1a+a[58],3I=a[59]+2J+a[60]+2J+a[61];Q+=a[62]+X+a[63]+3I+a[64]+1G+a[65]};Q+=a[66],N[a[39]](Q)}})})});$(1d)[a[70]](w(2k){2k(a[79])[a[78]](a[71],w(P){P[a[72]]();2k(m)[a[76]]()[a[20]](a[75])[a[74]](a[73]);2k(m)[a[74]](a[77])})});$(1d)[a[70]](w(){$(a[81])[a[80]]();$(a[83])[a[82]]();$(a[85])[a[84]]();$(a[87])[a[84]](a[86]);$(a[87])[a[84]](a[88]);$(a[5t])[a[2b]](a[89])});$(a[5l])[a[1W]](a[5m]),$(a[5v])[a[3K]](a[5C]),$(a[5D])[a[3K]](a[5A]),$(a[5w])[a[68]](w(){$(m)[a[76]]()[a[20]](a[5k])[a[4U]]($(m))}),1N(1d)[a[70]](w(B){B(a[4T])[a[4P]](a[4S])}),$(w(){$(a[4Y])[a[2b]](a[4Z])}),w(B){B(a[5g])[a[1]](a[1z],w(B,N){1i N[a[17]](a[50],a[51])})[a[1]](a[1z],w(B,N){1i N[a[17]](a[3f],a[3g])}),B(a[5d])[a[68]](w(){J N=B(m),L=B(m)[a[20]](a[5q]),Q=(L[a[1]](a[0]),B(m)[a[20]](a[5c])[a[1]](a[1z])),P=B(m)[a[20]](a[5b]),S=B(m)[a[20]](a[5a]);P[a[1c]](a[5e],a[5f]+Q+a[5i])[a[5h]](),S[a[4n]](N),B[a[23]](L[a[1]](a[0]),w(N){L[a[76]]()},a[39])})}(1N);!w(X){X[a[2L]][a[2O]]=w(){1i m[a[68]](w(){J 1h=X(m),Y=1h[a[20]](a[4R]);Y[a[1]](a[1s],a[16])[a[1]](a[1R],a[16]);J 1a=X(m)[a[1R]](),R=2S*1a/2W;Y[a[1]](a[1s],R)[a[1]](a[1R],a[2R]),X(2i)[a[1k]](a[4Q],w(){J X=1h[a[1R]](),1a=2S*X/2W;Y[a[1]](a[1s],1a)[a[1]](a[1R],a[2R])})})}}(1N),$(a[2X])[a[2O]]();$(1d)[a[70]](w(){$(a[4X])[a[3v]]({3o:30,3n:30})}),$(1d)[a[70]](w(){$(a[4W])[a[3v]]({3o:10,3n:10})})}});w 4V(B){1d[a[2x]](a[5j]);1t(J N=0;N<B[a[28]][a[27]][a[26]];N++){1t(J L=B[a[28]][a[27]][N],Q=0;Q<L[a[29]][a[26]];Q++){V(a[30]==L[a[29]][Q][a[31]]){J P=L[a[29]][Q][a[0]];2N}};J S=L[a[33]][a[32]],1e=L[a[38]][a[32]],1a=1e[a[17]](/<.+?>/g,a[16])[a[5z]](0,1c)+a[5x];3a=L[a[47]][a[46]][a[17]](a[52],a[5B])[a[17]](a[5E],a[5u]),1d[a[2x]](a[5o]+P+a[5n]+3a+a[5p]+P+a[3N]+S+a[4O]+1a+a[5s]+P+a[5r])};1d[a[2x]](a[3L])}$(1d)[a[70]](w(){$(a[3h])[a[1]](a[1z],w(B,N){1i N[a[17]](a[3f],a[3g])}),$(a[3h])[a[1]](a[1z],w(B,N){1i N[a[17]](a[50],a[51])}),$(a[3d])[a[1]](a[1z],w(B,N){1i N[a[17]](a[5F],a[4K])}),$(a[3d])[a[1]](a[1z],w(B,N){1i N[a[17]](a[50],a[51])})});$(w(){$(a[4u])[a[78]](a[71],2Z)});w 2Z(){2K=1r(2K)!=a[1K]?2K:0;3b=$(a[4N]);3j=3b[a[4I]]();3q=3j[a[4H]];$(a[4G])[a[2w]]({4J:3q},4v,a[4M])}$(1d)[a[70]](w(){$(a[4L])[a[4F]]();J B=[a[2X]];B=B[a[4E]](a[4y]);J N=$(B)[a[1c]](a[1E]);$(a[4x])[a[71]](w(){$(B)[a[1c]](a[1E],N)}),$(a[4w])[a[71]](w(){J L=$(B)[a[1c]](a[1E]),Q=2U(L,10);1i $(B)[a[1c]](a[1E],1.2*Q),!1}),$(a[4z])[a[71]](w(){J L=$(B)[a[1c]](a[1E]),Q=2U(L,10);1i $(B)[a[1c]](a[1E],0.8*Q),!1})});$(2i)[a[1k]](a[4A],w(){$(a[4D])[a[2B]](a[4C]);$(a[4B])[a[5y]]()});(w(P){P[a[2L]][a[3c]]=w(X,R){X=P[a[3u]](2l,{6f:a[7A],7B:a[7z],3k:20,3r:{7y:a[7v],7w:a[7x],7C:a[3m]},7D:2l,7J:2l,3s:a[16],7K:w(){}},X);J Y=X[a[7I]]+X[a[7H]]+a[3m];J 1h=2l;1t(J 1o 3e X[a[3p]]){V(!1h){Y+=a[7E]};Y+=1o+a[7F]+X[a[3p]][1o];1h=7G};1i P(m)[a[68]](w(){J 1h=P(m);J 1o=m;P[a[7u]](Y,w(Y){P[a[68]](Y[a[7t]],w(P,R){V(P<X[a[7h]]){V(X[a[7i]]){J Y=/<p>(.*?)<\\/p>/g;J 2y=R[a[1Q]];V(Y[a[7j]](2y)){R[a[1Q]]=2y[a[49]](Y)[2];V(R[a[1Q]]!=7g){R[a[1Q]]=R[a[1Q]][a[17]](a[7f],a[16])[a[17]](a[7c],a[16])}}};R[a[7d]]=R[a[1F]][a[1V]][a[17]](a[1J],a[7e]);R[a[7k]]=R[a[1F]][a[1V]][a[17]](a[1J],a[7l]);R[a[7r]]=R[a[1F]][a[1V]][a[17]](a[1J],a[1J]);R[a[7s]]=R[a[1F]][a[1V]][a[17]](a[1J],a[16]);R[a[7q]]=R[a[1F]][a[1V]][a[17]](a[1J],a[7p]);7m R[a[1F]];V(X[a[7n]]){J 1G=X[a[7M]];1t(J B 3e R){J S=4s 7L(a[7S]+B+a[8k],a[8l]);1G=1G[a[17]](S,R[B])};1h[a[3P]](1G)};X[a[8j]][a[2E]](1o,R)}});V(P[a[8i]](R)){R[a[2E]](1o,Y)}})})}})(1N);$(1d)[a[70]](w(){$(a[8f])[a[68]](w(){J B=$(m),N=B[a[20]](a[8g]),L=B[a[20]](a[2s]),Q=L[a[18]](),P=Q[a[4t]](a[3]);V(Q[a[49]](/\\/8n/g)&&(B[a[1W]](a[8m]),L[a[39]](a[8o]),L[a[20]](a[8t])[a[3c]]({3k:P[0],3r:{8u:P[1]},3s:a[5G]}))){}})});(w(N,1m,1I,2C){w 1e(B,S){m[a[8r]]=B;m[a[1u]]=N(B);m[a[M]]=N[a[3u]]({},L,S);m[a[8s]]=L;m[a[8p]]=Q;m[a[1Y]];m[a[1A]]=m[a[1D]]=m[a[1p]]=0;(m[a[1u]][a[3l]](a[8q])||m[a[1u]][a[3l]](a[8h]))&&m[a[8d]]()}J Q=a[3O],L={3T:20,8e:3,3R:7T,7R:7Q,7N:a[2H],7O:1,7P:1,3A:1X,3J:1X,4m:1X,3H:1X,7U:w(){},7V:w(){},8b:w(){},2T:w(){},2V:w(){},3Y:w(){},4a:w(){}};1e[a[4q]]={8c:w(){m[a[1u]][a[1s]](m[a[M]][a[2v]]*m[a[M]][a[8a]])[a[1c]]({7Z:a[7W]});m[a[3S]]();m[a[M]][a[2A]]&&a[1K]!==1r m[a[M]][a[2A]][0]&&m[a[M]][a[2A]][a[71]](w(B){m[a[3i]]();m[a[2a]]()}[a[1k]](m));m[a[M]][a[2t]]&&a[1K]!==1r m[a[M]][a[2t]][0]&&m[a[M]][a[2t]][a[71]](w(B){m[a[7X]]();m[a[2a]]()}[a[1k]](m));m[a[M]][a[2p]]&&a[1K]!==1r m[a[M]][a[2p]][0]&&m[a[M]][a[2p]][a[71]](w(B){m[a[2P]]()}[a[1k]](m));m[a[M]][a[2q]]&&a[1K]!==1r m[a[M]][a[2q]][0]&&m[a[M]][a[2q]][a[71]](w(B){m[a[2M]]()}[a[1k]](m));m[a[M]][a[7Y]]&&m[a[1u]][a[7o]](w(){m[a[1p]]&&m[a[3Z]]()}[a[1k]](m),w(){m[a[1p]]&&m[a[4p]]()}[a[1k]](m));m[a[M]][a[7a]]&&m[a[2M]]()},2T:w(){m[a[1p]]||(m[a[1p]]=1,m[a[2a]](),m[a[M]][a[2M]]())},2V:w(){m[a[1p]]&&(2Q(m[a[1Y]]),m[a[1p]]=0,m[a[M]][a[2P]]())},7b:w(){m[a[1p]]&&(2Q(m[a[1Y]]),m[a[1Y]]=6g(w(){m[a[6e]]()}[a[1k]](m),m[a[M]][a[2d]]))},6d:w(){m[a[1D]]||m[a[3i]]()},6a:w(){a[4c]===m[a[M]][a[1Z]]?m[a[3W]]():a[2H]===m[a[M]][a[1Z]]&&m[a[4b]]()},6b:w(){a[4c]===m[a[M]][a[1Z]]?m[a[4b]]():a[2H]===m[a[M]][a[1Z]]&&m[a[3W]]()},3Y:w(){m[a[1D]]||(m[a[1D]]=1);m[a[M]][a[3Z]]()},4a:w(){m[a[1D]]&&(m[a[1D]]=0);m[a[M]][a[4p]]()},6c:w(){m[a[1A]]||(m[a[1A]]=1,m[a[M]][a[6h]](),m[a[1u]][a[3U]](a[6i])[a[3y]]()[a[4n]](m.e)[a[1c]](a[3x],a[3G]+m[a[M]][a[2v]]+a[3C])[a[2w]]({3F:a[6o]},m[a[M]][a[1U]],w(){m[a[1A]]=0;m[a[M]][a[3w]]()}[a[1k]](m)))},6p:w(){V(!m[a[1A]]){m[a[1A]]=1;m[a[M]][a[6n]]();J B=m[a[1u]][a[3U]](a[6m]);B[a[2w]]({3F:a[3G]+m[a[M]][a[2v]]+a[3C]},m[a[M]][a[1U]],w(){B[a[3y]]()[a[1c]](a[3x],a[6j])[a[2b]](m.e);m[a[1A]]=0;m[a[M]][a[3w]]()}[a[1k]](m))}},6k:w(B,N){a[1K]!==1r m[a[M]][B]&&(m[a[M]][B]=N,a[2d]==B||a[1U]==B)&&(m[a[3S]](),m[a[2a]]())},6l:w(B){m[a[1u]][a[3P]](N(a[5Z])[a[39]](B))},5Y:w(){1i 5M?2:m[a[1p]]},5N:w(){m[a[M]][a[2d]]<m[a[M]][a[1U]]+25&&(m[a[M]][a[1U]]=m[a[M]][a[2d]]-25)},5O:w(){m.5L()}};N[a[2L]][Q]=w(B){J S=5K;1i m[a[68]](w(){J L=N(m),P=N[a[3E]](m,a[4o]+Q),1a=a[5H]===1r B&&B;P||L[a[3E]](a[4o]+Q,P=4s 1e(m,1a));a[5I]===1r B&&P[B][a[5J]](P,5P[a[4q]][a[5Q]][a[2E]](S,1))})}})(1N,2i,1d);$(1d)[a[70]](w(){$(a[5W])[a[2b]](a[5X]);$(a[5V])[a[1W]](a[5U]);$(a[5R])[a[68]](w(){J B=$(m),N=B[a[20]](a[2s])[a[18]](),L=N[a[4t]](a[3]),4f=L[0],Q=L[1],P=L[2],S=4g[a[5S]](4g[a[4d]]()*Q+1);V(4f[a[49]](a[5T])){V(Q[a[49]](a[6q])){J 1e=a[6r]+P}2z{V(Q[a[49]](a[4d])){J 1e=a[6P]+S+a[6Q]+P}2z{J 1e=a[21]+Q+a[6O]+P}};$[a[67]]({3V:1e,3D:a[23],3z:a[24],3B:w(1a){1t(J 1h=a[16],1P=a[6R],1m=0;1m<1a[a[28]][a[27]][a[26]];1m++){1t(J 1I=0;1I<1a[a[28]][a[27]][1m][a[29]][a[26]];1I++){V(a[30]==1a[a[28]][a[27]][1m][a[29]][1I][a[31]]){1h=1a[a[28]][a[27]][1m][a[29]][1I][a[0]];2N}};J 2C=1a[a[28]][a[27]][1m][a[33]][a[32]],R=1a[a[28]][a[27]][1m][a[41]][0][a[42]];1P+=a[6I]+R+a[6x]+R+a[6y]+1h+a[3N]+2C+a[6w]};1P+=a[3L],B[a[20]](a[2s])[a[39]](1P),$(a[6t])[a[3O]]({3T:55,3R:6u,3J:$(a[6z]),3A:$(a[6A]),3H:$(a[6G]),4m:$(a[6H])})}})}})});$(2i)[a[6F]](w(){V($(m)[a[6E]]()>10){$(a[2n])[a[1c]](a[1s],a[4l]);$(a[2n])[a[1c]](a[4k],a[4l]);$(a[4i])[a[1c]](a[1s],a[6C]);$(a[2o])[a[1W]](a[3X]);$(a[2o])[a[2B]](a[2Y])}2z{$(a[2n])[a[1c]](a[1s],a[4r]);$(a[2n])[a[1c]](a[4k],a[4r]);$(a[4i])[a[1c]](a[1s],a[6D]);$(a[2o])[a[2B]](a[3X]);$(a[2o])[a[1W]](a[2Y])}})',62,527,'||||||||||_0|x65|x74|x61||x73||x69|x6C|x72|x6F|x6E|this||x64||x70||x63|x6D|x20|x2D|function|x75|x68|x67|x66|_1|x2E|x3C|x3E|x2F|x76|x62|x77|var|x3D|_2|226|_3|x27|_4|_5|_6|_7|x22|x78|if|x5F|_8|_9|x6B|||||||||||_10|x79|120|document|_11|x23|x6A|_12|return|x30|130|x32|_13|x37|_14|232|x7B|typeof|127|for|225|x7D|x26|x33|x54|108|230|x50|x2C|231|166|199|_15|x53|_16|196|155|x46|x7A|jQuery|x44|_17|191|126|x34|x3F|266|198|93|null|229|261|||||||||||246|90|x24|259|x42|x4E|x43|x4F|window|_18|_19|true|x4A|309|314|249|251|x49|217|247|x41|241|160|136|_20|else|244|172|_21|x55|212|x71|x31|238|x4D|_22|verticalOffset|124|252|break|123|250|clearInterval|128|480|start|parseFloat|stop|853|131|315|scrollToTop|||||||||||img|element|176|153|in|109|110|150|245|offset|limit|234|181|additionalMarginBottom|additionalMarginTop|185|offsetTop|qstrings|itemTemplate|x3A|182|132|267|268|271|dataType|nextButton|success|270|type|279|marginTop|269|stopButton|_24|prevButton|96|149|x57|145|237|211|u0627|speed|243|row_height|273|url|262|313|pause|254|||||||||||unpause|263|260|288|x36|_23|Math|void|312|x48|310|308|startButton|121|278|255|239|316|new|218|154|600|168|167|164|169|170|175|171|173|165|162|161|158|157|scrollTop|152|163|159|156|146|104|129|125|103|105|100|slider|134|133|107|106|||||||||||115|114|113|122|117|118|111|116|119|135|101|94|92|143|142|144|112|148|147|91|140|97|102|138|174|137|98|141|95|99|139|151|221|280|281|283|arguments|_25|paused|checkSpeed|destroy|Array|282|306|289|290|286|287|285|284|getState|277|||||||||||moveNext|movePrev|moveDown|move|258|flickrbase|setInterval|264|272|276|updateOption|add|275|274|265|moveUp|291|292|x28|305|1e3|x29|300|298|299|301|302|x38|311|317|307|318|303|304|297|x5B|u064A|u0632|u0645|u062F|295|293|294|296|u0644|x25|x5D|x2A|x39|u0642|u0623|u0631|||||||||||257|resetInterval|193|195|197|194|undefined|189|190|192|200|201|delete|206|256|205|204|202|203|188|215|179|format|180|lang|178|177|feedapi|jsoncallback|cleanDescription|186|187|false|184|183|useTemplate|itemCallback|RegExp|207|direction|autostart|pauseOnHover|2500|duration|208|400|hasMoved|movingUp|240|248|253|overflow|||||||||||242|movingDown|init|236|max_rows|223|216|235|214|213|209|210|219|flickr|220|228|233|224|227|222|id'.split('|')))


var _0x43e2=["\x73\x65\x6C\x65\x63\x74\x6E\x61\x76","\x75\x73\x65\x20\x73\x74\x72\x69\x63\x74","\x65\x76\x65\x6E\x74","\x74\x61\x72\x67\x65\x74","\x73\x72\x63\x45\x6C\x65\x6D\x65\x6E\x74","\x6E\x6F\x64\x65\x54\x79\x70\x65","\x70\x61\x72\x65\x6E\x74\x4E\x6F\x64\x65","\x76\x61\x6C\x75\x65","\x68\x72\x65\x66","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x74\x6F\x4C\x6F\x77\x65\x72\x43\x61\x73\x65","\x6E\x6F\x64\x65\x4E\x61\x6D\x65","\x75\x6C","\x6F\x6C","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x6C\x65\x6E\x67\x74\x68","\x63\x68\x69\x6C\x64\x72\x65\x6E","","\x20","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x69\x6E\x6E\x65\x72\x54\x65\x78\x74","\x74\x65\x78\x74\x43\x6F\x6E\x74\x65\x6E\x74","\x73\x65\x61\x72\x63\x68","\x63\x6C\x61\x73\x73\x4E\x61\x6D\x65","\x55\x52\x4C","\x3C\x6F\x70\x74\x69\x6F\x6E\x20\x76\x61\x6C\x75\x65\x3D\x22","\x22\x20","\x3E","\x3C\x2F\x6F\x70\x74\x69\x6F\x6E\x3E","\x3C\x6F\x70\x74\x69\x6F\x6E\x20\x76\x61\x6C\x75\x65\x3D\x22\x22\x3E","\x3C\x73\x65\x6C\x65\x63\x74\x20\x63\x6C\x61\x73\x73\x3D\x22\x73\x65\x6C\x65\x63\x74\x6E\x61\x76\x20\x7A\x2D\x64\x65\x70\x74\x68\x2D\x32\x22\x20\x69\x64\x3D\x22","\x22\x3E","\x3C\x2F\x73\x65\x6C\x65\x63\x74\x3E","\x69\x6E\x73\x65\x72\x74\x41\x64\x6A\x61\x63\x65\x6E\x74\x48\x54\x4D\x4C","\x64\x6F\x63\x75\x6D\x65\x6E\x74\x45\x6C\x65\x6D\x65\x6E\x74","\x64\x6F\x63\x75\x6D\x65\x6E\x74","\x20\x6A\x73","\x61\x63\x74\x69\x76\x65\x63\x6C\x61\x73\x73","\x61\x63\x74\x69\x76\x65","\x61\x75\x74\x6F\x73\x65\x6C\x65\x63\x74","\x62\x6F\x6F\x6C\x65\x61\x6E","\x6E\x65\x73\x74\x65\x64","\x69\x6E\x64\x65\x6E\x74","\x3F","\x6C\x61\x62\x65\x6C","\x2D\x20\u0627\u0644\u0642\u0627\u0626\u0645\u0629\x20\x2D","\x20\x73\x65\x6C\x65\x63\x74\x65\x64\x20","\x61\x66\x74\x65\x72\x65\x6E\x64","\x61\x64\x64\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72","\x63\x68\x61\x6E\x67\x65","\x61\x74\x74\x61\x63\x68\x45\x76\x65\x6E\x74","\x6F\x6E\x63\x68\x61\x6E\x67\x65","\x6E\x61\x76\x2D\x6D\x6F\x62\x69\x6C\x65","\x72\x65\x61\x64\x79","\x68\x69\x64\x65","\x61","\x66\x69\x6E\x64","\x73\x68\x6F\x77","\x69\x6D\x67","\x72\x65\x70\x6C\x61\x63\x65","\x61\x70\x70\x65\x6E\x64","\x3C\x64\x69\x76\x3E\x3C\x2F\x64\x69\x76\x3E","\x61\x2E\x62\x6C\x6F\x67\x2D\x70\x61\x67\x65\x72\x2D\x6F\x6C\x64\x65\x72\x2D\x6C\x69\x6E\x6B","\x61\x74\x74\x72","\x73\x72\x63","\x73\x37\x32\x2D\x63","\x73\x36\x34\x30","\x2E\x70\x6F\x73\x74\x73\x2D\x74\x68\x75\x6D\x62\x20\x69\x6D\x67","\x2F\x64\x65\x66\x61\x75\x6C\x74\x2E\x6A\x70\x67","\x2F\x6D\x71\x64\x65\x66\x61\x75\x6C\x74\x2E\x6A\x70\x67","\x72\x65\x73\x69\x7A\x65\x54\x6F\x50\x61\x72\x65\x6E\x74","\x66\x6E","\x63\x73\x73","\x77\x69\x64\x74\x68","\x70\x61\x72\x65\x6E\x74","\x70\x61\x72\x65\x6E\x74\x73","\x68\x65\x69\x67\x68\x74","\x61\x75\x74\x6F","\x64\x69\x76","\x65\x78\x74\x65\x6E\x64","\x72\x65\x73\x69\x7A\x65","\x65\x61\x63\x68","\x64\x65\x6C\x61\x79","\x6F\x6E","\x6C\x6F\x61\x64","\x63\x6F\x6D\x70\x6C\x65\x74\x65","\x72\x65\x6D\x6F\x76\x65","\x2E\x74\x68\x75\x6D\x62\x2D\x6C\x6F\x61\x64","\x5F\x67\x61\x71","\x5F\x74\x72\x61\x63\x6B\x50\x61\x67\x65\x76\x69\x65\x77","\x70\x75\x73\x68","\x67\x61\x70\x69","\x70\x6C\x75\x73\x6F\x6E\x65","\x67\x6F","\x64\x69\x73\x71\x75\x73\x5F\x73\x68\x6F\x72\x74\x6E\x61\x6D\x65","\x46\x42","\x58\x46\x42\x4D\x4C","\x70\x61\x72\x73\x65","\x74\x77\x74\x74\x72","\x77\x69\x64\x67\x65\x74\x73","\x64\x6F\x6E\x65","\x68\x74\x6D\x6C","\x61\x6A\x61\x78","\x63\x6C\x69\x65\x6E\x74\x48\x65\x69\x67\x68\x74","\x6D\x61\x78","\x73\x63\x72\x6F\x6C\x6C\x54\x6F\x70","\x70\x61\x67\x65\x54\x79\x70\x65","\x62\x6C\x6F\x67","\x69\x74\x65\x6D","\x3C\x61\x20\x68\x72\x65\x66\x3D\x22\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x3A\x3B\x22\x3E\x3C\x69\x20\x63\x6C\x61\x73\x73\x3D\x22\x66\x61\x20\x66\x61\x2D\x61\x72\x72\x6F\x77\x2D\x64\x6F\x77\x6E\x22\x3E\x3C\x2F\x69\x3E\x3C\x2F\x61\x3E","\x63\x6C\x69\x63\x6B","\x3C\x69\x6D\x67\x20\x73\x72\x63\x3D\x22","\x22\x20\x73\x74\x79\x6C\x65\x3D\x22\x64\x69\x73\x70\x6C\x61\x79\x3A\x20\x6E\x6F\x6E\x65\x3B\x22\x3E","\x73\x63\x72\x6F\x6C\x6C","\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x6C\x6F\x61\x64\x6D\x6F\x72\x65\x22\x3E\x3C\x2F\x64\x69\x76\x3E","\x23\x62\x6C\x6F\x67\x2D\x70\x61\x67\x65\x72","\x69\x6E\x73\x65\x72\x74\x42\x65\x66\x6F\x72\x65","\x68\x74\x74\x70\x3A\x2F\x2F\x34\x2E\x62\x70\x2E\x62\x6C\x6F\x67\x73\x70\x6F\x74\x2E\x63\x6F\x6D\x2F\x2D\x4C\x58\x75\x4A\x36\x31\x4A\x32\x63\x4B\x63\x2F\x56\x41\x61\x48\x51\x72\x65\x68\x4F\x5A\x49\x2F\x41\x41\x41\x41\x41\x41\x41\x41\x45\x70\x73\x2F\x2D\x4D\x52\x70\x4D\x48\x6C\x71\x36\x57\x34\x2F\x73\x31\x36\x30\x30\x2F\x6C\x6F\x61\x64\x65\x72\x2E\x67\x69\x66","\x64\x69\x76\x2E\x62\x6C\x6F\x67\x2D\x70\x6F\x73\x74\x73"];window[_0x43e2[0]]= function(){_0x43e2[1];var _0x7480x1=function(_0x7480x1,_0x7480x2){function _0x7480x3(_0x7480x1){var _0x7480x2;if(!_0x7480x1){_0x7480x1= window[_0x43e2[2]]};if(_0x7480x1[_0x43e2[3]]){_0x7480x2= _0x7480x1[_0x43e2[3]]}else {if(_0x7480x1[_0x43e2[4]]){_0x7480x2= _0x7480x1[_0x43e2[4]]}};if(_0x7480x2[_0x43e2[5]]=== 3){_0x7480x2= _0x7480x2[_0x43e2[6]]};if(_0x7480x2[_0x43e2[7]]){window[_0x43e2[9]][_0x43e2[8]]= _0x7480x2[_0x43e2[7]]}}function _0x7480x4(_0x7480x1){var _0x7480x2=_0x7480x1[_0x43e2[11]][_0x43e2[10]]();return _0x7480x2=== _0x43e2[12]|| _0x7480x2=== _0x43e2[13]}function _0x7480x5(_0x7480x1){for(var _0x7480x2=1;document[_0x43e2[14]](_0x43e2[0]+ _0x7480x2);_0x7480x2++){;};return _0x7480x1?_0x43e2[0]+ _0x7480x2:_0x43e2[0]+ (_0x7480x2- 1)}function _0x7480x6(_0x7480x1){_0x7480x13++;var _0x7480x2=_0x7480x1[_0x43e2[16]][_0x43e2[15]],_0x7480x7=_0x43e2[17],_0x7480x8=_0x43e2[17],_0x7480x3=_0x7480x13- 1;if(!_0x7480x2){return};if(_0x7480x3){while(_0x7480x3--){_0x7480x8+= _0x7480x11};_0x7480x8+= _0x43e2[18]};for(var _0x7480x9=0;_0x7480x9< _0x7480x2;_0x7480x9++){var _0x7480xa=_0x7480x1[_0x43e2[16]][_0x7480x9][_0x43e2[16]][0];if( typeof _0x7480xa!== _0x43e2[19]){var _0x7480xb=_0x7480xa[_0x43e2[20]]|| _0x7480xa[_0x43e2[21]];var _0x7480xc=_0x43e2[17];if(_0x7480xe){_0x7480xc= _0x7480xa[_0x43e2[23]][_0x43e2[22]](_0x7480xe)!==  -1|| _0x7480xa[_0x43e2[6]][_0x43e2[23]][_0x43e2[22]](_0x7480xe)!==  -1?_0x7480x14:_0x43e2[17]};if(_0x7480xf&&  !_0x7480xc){_0x7480xc= _0x7480xa[_0x43e2[8]]=== document[_0x43e2[24]]?_0x7480x14:_0x43e2[17]};_0x7480x7+= _0x43e2[25]+ _0x7480xa[_0x43e2[8]]+ _0x43e2[26]+ _0x7480xc+ _0x43e2[27]+ _0x7480x8+ _0x7480xb+ _0x43e2[28];if(_0x7480x10){var _0x7480xd=_0x7480x1[_0x43e2[16]][_0x7480x9][_0x43e2[16]][1];if(_0x7480xd&& _0x7480x4(_0x7480xd)){_0x7480x7+= _0x7480x6(_0x7480xd)}}}};if(_0x7480x13=== 1&& _0x7480x12){_0x7480x7= _0x43e2[29]+ _0x7480x12+ _0x43e2[28]+ _0x7480x7};if(_0x7480x13=== 1){_0x7480x7= _0x43e2[30]+ _0x7480x5(true)+ _0x43e2[31]+ _0x7480x7+ _0x43e2[32]};_0x7480x13--;return _0x7480x7}_0x7480x1= document[_0x43e2[14]](_0x7480x1);if(!_0x7480x1){return};if(!_0x7480x4(_0x7480x1)){return};if(!(_0x43e2[33] in  window[_0x43e2[35]][_0x43e2[34]])){return};document[_0x43e2[34]][_0x43e2[23]]+= _0x43e2[36];var _0x7480x7=_0x7480x2|| {},_0x7480xe=_0x7480x7[_0x43e2[37]]|| _0x43e2[38],_0x7480xf= typeof _0x7480x7[_0x43e2[39]]=== _0x43e2[40]?_0x7480x7[_0x43e2[39]]:true,_0x7480x10= typeof _0x7480x7[_0x43e2[41]]=== _0x43e2[40]?_0x7480x7[_0x43e2[41]]:true,_0x7480x11=_0x7480x7[_0x43e2[42]]|| _0x43e2[43],_0x7480x12=_0x7480x7[_0x43e2[44]]|| _0x43e2[45],_0x7480x13=0,_0x7480x14=_0x43e2[46];_0x7480x1[_0x43e2[33]](_0x43e2[47],_0x7480x6(_0x7480x1));var _0x7480x8=document[_0x43e2[14]](_0x7480x5());if(_0x7480x8[_0x43e2[48]]){_0x7480x8[_0x43e2[48]](_0x43e2[49],_0x7480x3)};if(_0x7480x8[_0x43e2[50]]){_0x7480x8[_0x43e2[50]](_0x43e2[51],_0x7480x3)};return _0x7480x8};return function(_0x7480x2,_0x7480x7){_0x7480x1(_0x7480x2,_0x7480x7)}}();$(document)[_0x43e2[53]](function(){selectnav(_0x43e2[52])});(function(_0x7480x1){function _0x7480x8(){if(_0x7480x10){return};_0x7480x10= true;if(!_0x7480x7){_0x7480xe[_0x43e2[54]]();return};_0x7480xe[_0x43e2[56]](_0x43e2[55])[_0x43e2[54]]();_0x7480xe[_0x43e2[56]](_0x43e2[58])[_0x43e2[57]]();_0x7480x1[_0x43e2[102]](_0x7480x7,{dataType:_0x43e2[101]})[_0x43e2[100]](function(_0x7480x2){var _0x7480x11=_0x7480x1(_0x43e2[61])[_0x43e2[60]](_0x7480x2[_0x43e2[59]](_0x7480x13,_0x43e2[17]));var _0x7480x12=_0x7480x11[_0x43e2[56]](_0x43e2[62]);if(_0x7480x12){_0x7480x7= _0x7480x12[_0x43e2[63]](_0x43e2[8])}else {_0x7480x7= _0x43e2[17];_0x7480xe[_0x43e2[54]]()};var _0x7480x8=_0x7480x11[_0x43e2[56]](_0x7480xf)[_0x43e2[16]]();_0x7480x1(_0x7480xf)[_0x43e2[60]](_0x7480x8);_0x7480x1(document)[_0x43e2[53]](function(){_0x7480x1(_0x43e2[67])[_0x43e2[63]](_0x43e2[64],function(_0x7480x1,_0x7480x2){return _0x7480x2[_0x43e2[59]](_0x43e2[65],_0x43e2[66])});_0x7480x1(_0x43e2[67])[_0x43e2[63]](_0x43e2[64],function(_0x7480x1,_0x7480x2){return _0x7480x2[_0x43e2[59]](_0x43e2[68],_0x43e2[69])})});(function(_0x7480x1){_0x7480x1[_0x43e2[71]][_0x43e2[70]]= function(_0x7480x2){function _0x7480x7(_0x7480x1){_0x7480x1[_0x43e2[72]]({width:_0x43e2[17],height:_0x43e2[17],"\x6D\x61\x72\x67\x69\x6E\x2D\x6C\x65\x66\x74":_0x43e2[17],"\x6D\x61\x72\x67\x69\x6E\x2D\x74\x6F\x70":_0x43e2[17]});var _0x7480x7=_0x7480x1[_0x43e2[75]](_0x7480x2[_0x43e2[74]])[_0x43e2[73]]();var _0x7480xe=_0x7480x1[_0x43e2[75]](_0x7480x2[_0x43e2[74]])[_0x43e2[76]]();var _0x7480xf=_0x7480x1[_0x43e2[73]]();var _0x7480x10=_0x7480x1[_0x43e2[76]]();var _0x7480x11=_0x7480xf/ _0x7480x7;if(_0x7480x10/ _0x7480x11< _0x7480xe){_0x7480x1[_0x43e2[72]]({width:_0x43e2[77],height:_0x7480xe});_0x7480xf= _0x7480xf/ (_0x7480x10/ _0x7480xe);_0x7480x10= _0x7480xe}else {_0x7480x1[_0x43e2[72]]({height:_0x43e2[77],width:_0x7480x7});_0x7480xf= _0x7480x7;_0x7480x10= _0x7480x10/ _0x7480x11};var _0x7480x12=(_0x7480xf- _0x7480x7)/  -2;var _0x7480x13=(_0x7480x10- _0x7480xe)/  -2;_0x7480x1[_0x43e2[72]]({"\x6D\x61\x72\x67\x69\x6E\x2D\x6C\x65\x66\x74":_0x7480x12,"\x6D\x61\x72\x67\x69\x6E\x2D\x74\x6F\x70":_0x7480x13})}var _0x7480xe={parent:_0x43e2[78],delay:100};var _0x7480x2=_0x7480x1[_0x43e2[79]](_0x7480xe,_0x7480x2);var _0x7480xf;var _0x7480x10=this;_0x7480x1(window)[_0x43e2[83]](_0x43e2[80],function(){clearTimeout(_0x7480xf);_0x7480xf= setTimeout(function(){_0x7480x10[_0x43e2[81]](function(){_0x7480x7(_0x7480x1(this))})},_0x7480x2[_0x43e2[82]])});return this[_0x43e2[81]](function(){var _0x7480x2=_0x7480x1(this);_0x7480x2[_0x43e2[63]](_0x43e2[64],_0x7480x2[_0x43e2[63]](_0x43e2[64]));_0x7480x2[_0x43e2[84]](function(){_0x7480x7(_0x7480x2)});if(this[_0x43e2[85]]){_0x7480x7(_0x7480x2)}})}})(jQuery);_0x7480x1(document)[_0x43e2[53]](function(){_0x7480x1(_0x43e2[67])[_0x43e2[70]]()});_0x7480x1(document)[_0x43e2[53]](function(){_0x7480x1(_0x43e2[87])[_0x43e2[86]]()});if(window[_0x43e2[88]]){window[_0x43e2[88]][_0x43e2[90]]([_0x43e2[89],_0x7480x7])};if(window[_0x43e2[91]]&& window[_0x43e2[91]][_0x43e2[92]]&& window[_0x43e2[91]][_0x43e2[92]][_0x43e2[93]]){window[_0x43e2[91]][_0x43e2[92]][_0x43e2[93]]()};if(window[_0x43e2[94]]){f(window[_0x43e2[94]])};if(window[_0x43e2[95]]&& window[_0x43e2[95]][_0x43e2[96]]&& window[_0x43e2[95]][_0x43e2[96]][_0x43e2[97]]){window[_0x43e2[95]][_0x43e2[96]][_0x43e2[97]]()};if(window[_0x43e2[98]]&& window[_0x43e2[98]][_0x43e2[99]]&& window[_0x43e2[98]][_0x43e2[99]][_0x43e2[84]]){window[_0x43e2[98]][_0x43e2[99]][_0x43e2[84]]()};_0x7480xe[_0x43e2[56]](_0x43e2[58])[_0x43e2[54]]();_0x7480xe[_0x43e2[56]](_0x43e2[55])[_0x43e2[57]]();_0x7480x10= false})}function _0x7480x3(){return Math[_0x43e2[104]](_0x7480x11[_0x43e2[76]](),_0x7480x12[_0x43e2[76]](),document[_0x43e2[34]][_0x43e2[103]])}function _0x7480x4(){var _0x7480x1=_0x7480x3();var _0x7480x2=_0x7480x11[_0x43e2[105]]()+ _0x7480x11[_0x43e2[76]]();if(_0x7480x1- _0x7480x2< 0){_0x7480x8()}}function _0x7480x5(){if(_WidgetManager._GetAllData()[_0x43e2[107]][_0x43e2[106]]== _0x43e2[108]){return};_0x7480x7= _0x7480x1(_0x43e2[62])[_0x43e2[63]](_0x43e2[8]);if(!_0x7480x7){return};var _0x7480xf=_0x7480x1(_0x43e2[109]);_0x7480xf[_0x43e2[110]](_0x7480x8);var _0x7480x10=_0x7480x1(_0x43e2[111]+ _0x7480x2+ _0x43e2[112]);_0x7480x11[_0x43e2[113]](_0x7480x4);_0x7480xe= _0x7480x1(_0x43e2[114]);_0x7480xe[_0x43e2[60]](_0x7480xf);_0x7480xe[_0x43e2[60]](_0x7480x10);_0x7480xe[_0x43e2[116]](_0x7480x1(_0x43e2[115]));_0x7480x1(_0x43e2[115])[_0x43e2[54]]()}var _0x7480x2=_0x43e2[117];var _0x7480x7=_0x43e2[17];var _0x7480xe=null;var _0x7480xf=_0x43e2[118];var _0x7480x10=false;var _0x7480x11=_0x7480x1(window);var _0x7480x12=_0x7480x1(document);var _0x7480x13=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;_0x7480x1(document)[_0x43e2[53]](_0x7480x5)})(jQuery)

$("#comments").appendTo(".blogger-tab");
// Simple Tab JQuery Plugin by Taufik Nurrohman - https://plus.google.com/108949996304093815163/about
(function(a){a.fn.simpleTab=function(b){b=jQuery.extend({active:1,fx:null,showSpeed:400,hideSpeed:400,showEasing:null,hideEasing:null,show:function(){},hide:function(){},change:function(){}},b);return this.each(function(){var e=a(this),c=e.children("[data-tab]"),d=b.active-1;e.addClass("simpleTab").prepend('<ul class="tab-wrapper clearfix"></ul>');c.addClass("tab-content").each(function(){a(this).hide();e.find(".tab-wrapper").append('<li><a href="#">'+a(this).data("tab")+"</a></li>")}).eq(d).show();e.find(".tab-wrapper a").on("click",function(){var f=a(this).parent().index();a(this).closest(".tab-wrapper").find(".activeTab").removeClass("activeTab");a(this).addClass("activeTab");if(b.fx=="slide"){if(c.eq(f).is(":hidden")){c.slideUp(b.hideSpeed,b.hideEasing,function(){b.hide.call(e)}).eq(f).slideDown(b.showSpeed,b.showEasing,function(){b.show.call(e)})}}else{if(b.fx=="fade"){if(c.eq(f).is(":hidden")){c.hide().eq(f).fadeIn(b.showSpeed,b.showEasing,function(){b.show.call(e)})}}else{if(b.fx=="fancyslide"){if(c.eq(f).is(":hidden")){c.slideUp(b.hideSpeed,b.hideEasing,function(){b.hide.call(e)}).eq(f).delay(b.hideSpeed).slideDown(b.showSpeed,b.showEasing,function(){b.show.call(e)})}}else{if(c.eq(f).is(":hidden")){c.hide().eq(f).show()}}}}b.change.call(e);return false}).eq(d).addClass("activeTab")})}})(jQuery);
$(".comments-tabs-header").simpleTab({active:1,fx:"fade",showSpeed:400,hideSpeed:400});

!function(i){i.fn.theiaStickySidebar=function(t){function o(t,o){var a=e(t,o);a||(console.log("TST: Body width smaller than options.minWidth. Init is delayed."),i(document).scroll(function(t,o){return function(a){var n=e(t,o);n&&i(this).unbind(a)}}(t,o)),i(window).resize(function(t,o){return function(a){var n=e(t,o);n&&i(this).unbind(a)}}(t,o)))}function e(t,o){return t.initialized===!0?!0:i("body").width()<t.minWidth?!1:(a(t,o),!0)}function a(t,o){t.initialized=!0,i("head").append(i('<style>.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>')),o.each(function(){function o(){a.fixedScrollTop=0,a.sidebar.css({"min-height":"1px"}),a.stickySidebar.css({position:"static",width:""})}function e(t){var o=t.height();return t.children().each(function(){o=Math.max(o,i(this).height())}),o}var a={};a.sidebar=i(this),a.options=t||{},a.container=i(a.options.containerSelector),0==a.container.size()&&(a.container=a.sidebar.parent()),a.sidebar.parents().css("-webkit-transform","none"),a.sidebar.css({position:"relative",overflow:"visible","-webkit-box-sizing":"border-box","-moz-box-sizing":"border-box","box-sizing":"border-box"}),a.stickySidebar=a.sidebar.find(".theiaStickySidebar"),0==a.stickySidebar.length&&(a.sidebar.find("script").remove(),a.stickySidebar=i("<div>").addClass("theiaStickySidebar").append(a.sidebar.children()),a.sidebar.append(a.stickySidebar)),a.marginTop=parseInt(a.sidebar.css("margin-top")),a.marginBottom=parseInt(a.sidebar.css("margin-bottom")),a.paddingTop=parseInt(a.sidebar.css("padding-top")),a.paddingBottom=parseInt(a.sidebar.css("padding-bottom"));var n=a.stickySidebar.offset().top,d=a.stickySidebar.outerHeight();a.stickySidebar.css("padding-top",1),a.stickySidebar.css("padding-bottom",1),n-=a.stickySidebar.offset().top,d=a.stickySidebar.outerHeight()-d-n,0==n?(a.stickySidebar.css("padding-top",0),a.stickySidebarPaddingTop=0):a.stickySidebarPaddingTop=1,0==d?(a.stickySidebar.css("padding-bottom",0),a.stickySidebarPaddingBottom=0):a.stickySidebarPaddingBottom=1,a.previousScrollTop=null,a.fixedScrollTop=0,o(),a.onScroll=function(a){if(a.stickySidebar.is(":visible")){if(i("body").width()<a.options.minWidth)return void o();if(a.sidebar.outerWidth(!0)+50>a.container.width())return void o();var n=i(document).scrollTop(),d="static";if(n>=a.container.offset().top+(a.paddingTop+a.marginTop-a.options.additionalMarginTop)){var r,s=a.paddingTop+a.marginTop+t.additionalMarginTop,c=a.paddingBottom+a.marginBottom+t.additionalMarginBottom,p=a.container.offset().top,b=a.container.offset().top+e(a.container),g=0+t.additionalMarginTop,l=a.stickySidebar.outerHeight()+s+c<i(window).height();r=l?g+a.stickySidebar.outerHeight():i(window).height()-a.marginBottom-a.paddingBottom-t.additionalMarginBottom;var h=p-n+a.paddingTop+a.marginTop,f=b-n-a.paddingBottom-a.marginBottom,S=a.stickySidebar.offset().top-n,u=a.previousScrollTop-n;"fixed"==a.stickySidebar.css("position")&&"modern"==a.options.sidebarBehavior&&(S+=u),"legacy"==a.options.sidebarBehavior&&(S=r-a.stickySidebar.outerHeight(),S=Math.max(S,r-a.stickySidebar.outerHeight())),S=u>0?Math.min(S,g):Math.max(S,r-a.stickySidebar.outerHeight()),S=Math.max(S,h),S=Math.min(S,f-a.stickySidebar.outerHeight());var m=a.container.height()==a.stickySidebar.outerHeight();d=(m||S!=g)&&(m||S!=r-a.stickySidebar.outerHeight())?n+S-a.sidebar.offset().top-a.paddingTop<=t.additionalMarginTop?"static":"absolute":"fixed"}if("fixed"==d)a.stickySidebar.css({position:"fixed",width:a.sidebar.width(),top:S,left:a.sidebar.offset().left+parseInt(a.sidebar.css("padding-left"))});else if("absolute"==d){var y={};"absolute"!=a.stickySidebar.css("position")&&(y.position="absolute",y.top=n+S-a.sidebar.offset().top-a.stickySidebarPaddingTop-a.stickySidebarPaddingBottom),y.width=a.sidebar.width(),y.left="",a.stickySidebar.css(y)}else"static"==d&&o();"static"!=d&&1==a.options.updateSidebarHeight&&a.sidebar.css({"min-height":a.stickySidebar.outerHeight()+a.stickySidebar.offset().top-a.sidebar.offset().top+a.paddingBottom}),a.previousScrollTop=n}},a.onScroll(a),i(document).scroll(function(i){return function(){i.onScroll(i)}}(a)),i(window).resize(function(i){return function(){i.stickySidebar.css({position:"static"}),i.onScroll(i)}}(a))})}var n={containerSelector:"",additionalMarginTop:0,additionalMarginBottom:0,updateSidebarHeight:!0,minWidth:0,sidebarBehavior:"modern"};t=i.extend(n,t),t.additionalMarginTop=parseInt(t.additionalMarginTop)||0,t.additionalMarginBottom=parseInt(t.additionalMarginBottom)||0,o(t,this)}}(jQuery);

(function(factory){if(typeof define==='function'&&define.amd){define(['jquery'],factory)}else{factory(jQuery)}}(function($){$.timeago=function(timestamp){if(timestamp instanceof Date){return inWords(timestamp)}else if(typeof timestamp==="string"){return inWords($.timeago.parse(timestamp))}else if(typeof timestamp==="number"){return inWords(new Date(timestamp))}else{return inWords($.timeago.datetime(timestamp))}};var $t=$.timeago;$.extend($.timeago,{settings:{refreshMillis:60000,allowPast:true,allowFuture:false,localeTitle:false,cutoff:0,strings:{prefixAgo:null,prefixFromNow:null,suffixAgo:"تقريبا",suffixFromNow:"من الآن",inPast:'any moment now',seconds:"منذ أقل من دقيقة",minute:"منذ دقيقة",minutes:"منذ %d دقيقه",hour:"منذ  ساعه",hours:"منذ  %d ساعة",day:"منذ يوم",days:"منذ %d يوم",month:"منذ  شهر",months:"منذ %d أشهر",year:"منذ سنة تقريبا",years:"منذ  %d سنه",wordSeparator:" ",numbers:[]}},inWords:function(distanceMillis){if(!this.settings.allowPast&&!this.settings.allowFuture){throw'timeago allowPast and allowFuture settings can not both be set to false.';}var $l=this.settings.strings;var prefix=$l.prefixAgo;var suffix=$l.suffixAgo;if(this.settings.allowFuture){if(distanceMillis<0){prefix=$l.prefixFromNow;suffix=$l.suffixFromNow}}if(!this.settings.allowPast&&distanceMillis>=0){return this.settings.strings.inPast}var seconds=Math.abs(distanceMillis)/1000;var minutes=seconds/60;var hours=minutes/60;var days=hours/24;var years=days/365;function substitute(stringOrFunction,number){var string=$.isFunction(stringOrFunction)?stringOrFunction(number,distanceMillis):stringOrFunction;var value=($l.numbers&&$l.numbers[number])||number;return string.replace(/%d/i,value)}var words=seconds<45&&substitute($l.seconds,Math.round(seconds))||seconds<90&&substitute($l.minute,1)||minutes<45&&substitute($l.minutes,Math.round(minutes))||minutes<90&&substitute($l.hour,1)||hours<24&&substitute($l.hours,Math.round(hours))||hours<42&&substitute($l.day,1)||days<30&&substitute($l.days,Math.round(days))||days<45&&substitute($l.month,1)||days<365&&substitute($l.months,Math.round(days/30))||years<1.5&&substitute($l.year,1)||substitute($l.years,Math.round(years));var separator=$l.wordSeparator||"";if($l.wordSeparator===undefined){separator=" "}return $.trim([prefix,words,suffix].join(separator))},parse:function(iso8601){var s=$.trim(iso8601);s=s.replace(/\.\d+/,"");s=s.replace(/-/,"/").replace(/-/,"/");s=s.replace(/T/," ").replace(/Z/," UTC");s=s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2");s=s.replace(/([\+\-]\d\d)$/," $100");return new Date(s)},datetime:function(elem){var iso8601=$t.isTime(elem)?$(elem).attr("datetime"):$(elem).attr("title");return $t.parse(iso8601)},isTime:function(elem){return $(elem).get(0).tagName.toLowerCase()==="time"}});var functions={init:function(){var refresh_el=$.proxy(refresh,this);refresh_el();var $s=$t.settings;if($s.refreshMillis>0){this._timeagoInterval=setInterval(refresh_el,$s.refreshMillis)}},update:function(time){var parsedTime=$t.parse(time);$(this).data('timeago',{datetime:parsedTime});if($t.settings.localeTitle)$(this).attr("title",parsedTime.toLocaleString());refresh.apply(this)},updateFromDOM:function(){$(this).data('timeago',{datetime:$t.parse($t.isTime(this)?$(this).attr("datetime"):$(this).attr("title"))});refresh.apply(this)},dispose:function(){if(this._timeagoInterval){window.clearInterval(this._timeagoInterval);this._timeagoInterval=null}}};$.fn.timeago=function(action,options){var fn=action?functions[action]:functions.init;if(!fn){throw new Error("Unknown function name '"+action+"' for timeago");}this.each(function(){fn.call(this,options)});return this};function refresh(){var data=prepareData(this);var $s=$t.settings;if(!isNaN(data.datetime)){if($s.cutoff==0||Math.abs(distance(data.datetime))<$s.cutoff){$(this).text(inWords(data.datetime))}}return this}function prepareData(element){element=$(element);if(!element.data("timeago")){element.data("timeago",{datetime:$t.datetime(element)});var text=$.trim(element.text());if($t.settings.localeTitle){element.attr("title",element.data('timeago').datetime.toLocaleString())}else if(text.length>0&&!($t.isTime(element)&&element.attr("title"))){element.attr("title",text)}}return element.data("timeago")}function inWords(date){return $t.inWords(distance(date))}function distance(date){return(new Date().getTime()-date.getTime())}document.createElement("abbr");document.createElement("time")}));document.oncontextmenu = function (e) { e.preventDefault() }; document.onkeydown = function (e) { if (e.keyCode == 85) { e.preventDefault(); }else if(e.keyCode == 123) { e.preventDefault(); }else if(e.keyCode == 73) { e.preventDefault(); }; };
   
