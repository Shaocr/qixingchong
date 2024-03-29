(function(b) {
    var a = {};
    var c = {
        mode: "horizontal",
        slideSelector: "",
        infiniteLoop: true,
        hideControlOnEnd: false,
        speed: 500,
        easing: null,
        slideMargin: 0,
        startSlide: 0,
        randomStart: false,
        captions: false,
        ticker: false,
        tickerHover: false,
        adaptiveHeight: false,
        adaptiveHeightSpeed: 500,
        video: false,
        useCSS: true,
        preloadImages: "visible",
        responsive: true,
        slideZIndex: 50,
        wrapperClass: "bx-wrapper",
        touchEnabled: true,
        swipeThreshold: 50,
        oneToOneTouch: true,
        preventDefaultSwipeX: true,
        preventDefaultSwipeY: false,
        pager: true,
        pagerType: "full",
        pagerShortSeparator: " / ",
        pagerSelector: null,
        buildPager: null,
        pagerCustom: null,
        controls: true,
        nextText: "Next",
        prevText: "Prev",
        nextSelector: null,
        prevSelector: null,
        autoControls: false,
        startText: "Start",
        stopText: "Stop",
        autoControlsCombine: false,
        autoControlsSelector: null,
        auto: false,
        pause: 4000,
        autoStart: true,
        autoDirection: "next",
        autoHover: false,
        autoDelay: 0,
        autoSlideForOnePage: false,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 0,
        slideWidth: 0,
        onSliderLoad: function() {},
        onSlideBefore: function() {},
        onSlideAfter: function() {},
        onSlideNext: function() {},
        onSlidePrev: function() {},
        onSliderResize: function() {}
    };
    b.fn.bxSlider = function(s) {
        if (this.length == 0) {
            return this
        }
        if (this.length > 1) {
            this.each(function() {
                b(this).bxSlider(s)
            });
            return this
        }
        var j = {};
        var H = this;
        a.el = this;
        var J = b(window).width();
        var M = b(window).height();
        var C = function() {
            j.settings = b.extend({}, c, s);
            j.settings.slideWidth = parseInt(j.settings.slideWidth);
            j.children = H.children(j.settings.slideSelector);
            if (j.children.length < j.settings.minSlides) {
                j.settings.minSlides = j.children.length
            }
            if (j.children.length < j.settings.maxSlides) {
                j.settings.maxSlides = j.children.length
            }
            if (j.settings.randomStart) {
                j.settings.startSlide = Math.floor(Math.random() * j.children.length)
            }
            j.active = {
                index: j.settings.startSlide
            };
            j.carousel = j.settings.minSlides > 1 || j.settings.maxSlides > 1;
            if (j.carousel) {
                j.settings.preloadImages = "all"
            }
            j.minThreshold = (j.settings.minSlides * j.settings.slideWidth) + ((j.settings.minSlides - 1) * j.settings.slideMargin);
            j.maxThreshold = (j.settings.maxSlides * j.settings.slideWidth) + ((j.settings.maxSlides - 1) * j.settings.slideMargin);
            j.working = false;
            j.controls = {};
            j.interval = null;
            j.animProp = j.settings.mode == "vertical" ? "top" : "left";
            j.usingCSS = j.settings.useCSS && j.settings.mode != "fade" && (function() {
                var T = document.createElement("div");
                var S = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                for (var R in S) {
                    if (T.style[S[R]] !== undefined) {
                        j.cssPrefix = S[R].replace("Perspective", "").toLowerCase();
                        j.animProp = "-" + j.cssPrefix + "-transform";
                        return true
                    }
                }
                return false
            }());
            if (j.settings.mode == "vertical") {
                j.settings.maxSlides = j.settings.minSlides
            }
            H.data("origStyle", H.attr("style"));
            H.children(j.settings.slideSelector).each(function() {
                b(this).data("origStyle", b(this).attr("style"))
            });
            m()
        };
        var m = function() {
            H.wrap('<div class="' + j.settings.wrapperClass + '"><div class="bx-viewport"></div></div>');
            j.viewport = H.parent();
            j.loader = b('<div class="bx-loading" />');
            j.viewport.prepend(j.loader);
            H.css({
                width: j.settings.mode == "horizontal" ? (j.children.length * 100 + 215) + "%" : "auto",
                position: "relative"
            });
            if (j.usingCSS && j.settings.easing) {
                H.css("-" + j.cssPrefix + "-transition-timing-function", j.settings.easing)
            } else {
                if (!j.settings.easing) {
                    j.settings.easing = "swing"
                }
            }
            var R = A();
            j.viewport.css({
                width: "100%",
                overflow: "hidden",
                position: "relative"
            });
            j.viewport.parent().css({
                maxWidth: L()
            });
            if (!j.settings.pager) {
                j.viewport.parent().css({
                    margin: "0 auto 0px"
                })
            }
            j.children.css({
                "float": j.settings.mode == "horizontal" ? "left" : "none",
                listStyle: "none",
                position: "relative"
            });
            j.children.css("width", D());
            if (j.settings.mode == "horizontal" && j.settings.slideMargin > 0) {
                j.children.css("marginRight", j.settings.slideMargin)
            }
            if (j.settings.mode == "vertical" && j.settings.slideMargin > 0) {
                j.children.css("marginBottom", j.settings.slideMargin)
            }
            if (j.settings.mode == "fade") {
                j.children.css({
                    position: "absolute",
                    zIndex: 0,
                    display: "none"
                });
                j.children.eq(j.settings.startSlide).css({
                    zIndex: j.settings.slideZIndex,
                    display: "block"
                })
            }
            j.controls.el = b('<div class="bx-controls" />');
            if (j.settings.captions) {
                z()
            }
            j.active.last = j.settings.startSlide == v() - 1;
            if (j.settings.video) {
                H.fitVids()
            }
            var S = j.children.eq(j.settings.startSlide);
            if (j.settings.preloadImages == "all") {
                S = j.children
            }
            if (!j.settings.ticker) {
                if (j.settings.pager) {
                    O()
                }
                if (j.settings.controls) {
                    k()
                }
                if (j.settings.auto && j.settings.autoControls) {
                    K()
                }
                if (j.settings.controls || j.settings.autoControls || j.settings.pager) {
                    j.viewport.after(j.controls.el)
                }
            } else {
                j.settings.pager = false
            }
            d(S, t)
        };
        var d = function(R, U) {
            var T = R.find("img, iframe").length;
            if (T == 0) {
                U();
                return
            }
            var S = 0;
            R.find("img, iframe").each(function() {
                b(this).one("load", function() {
                    if (++S == T) {
                        U()
                    }
                }).each(function() {
                    if (this.complete) {
                        b(this).load()
                    }
                })
            })
        };
        var t = function() {
            if (j.settings.infiniteLoop && j.settings.mode != "fade" && !j.settings.ticker) {
                var T = j.settings.mode == "vertical" ? j.settings.minSlides : j.settings.maxSlides;
                var S = j.children.slice(0, T).clone().addClass("bx-clone");
                var R = j.children.slice(-T).clone().addClass("bx-clone");
                H.append(S).prepend(R)
            }
            j.loader.remove();
            h();
            if (j.settings.mode == "vertical") {
                j.settings.adaptiveHeight = true
            }
            j.viewport.height(o());
            H.redrawSlider();
            j.settings.onSliderLoad(j.active.index);
            j.initialized = true;
            if (j.settings.responsive) {
                b(window).bind("resize", n)
            }
            if (j.settings.auto && j.settings.autoStart && (v() > 1 || j.settings.autoSlideForOnePage)) {
                e()
            }
            if (j.settings.ticker) {
                F()
            }
            if (j.settings.pager) {
                Q(j.settings.startSlide)
            }
            if (j.settings.controls) {
                l()
            }
            if (j.settings.touchEnabled && !j.settings.ticker) {
                f()
            }
        };
        var o = function() {
            var R = 0;
            var T = b();
            if (j.settings.mode != "vertical" && !j.settings.adaptiveHeight) {
                T = j.children
            } else {
                if (!j.carousel) {
                    T = j.children.eq(j.active.index)
                } else {
                    var S = j.settings.moveSlides == 1 ? j.active.index : j.active.index * q();
                    T = j.children.eq(S);
                    for (i = 1; i <= j.settings.maxSlides - 1; i++) {
                        if (S + i >= j.children.length) {
                            T = T.add(j.children.eq(i - 1))
                        } else {
                            T = T.add(j.children.eq(S + i))
                        }
                    }
                }
            }
            if (j.settings.mode == "vertical") {
                T.each(function(U) {
                    R += b(this).outerHeight()
                });
                if (j.settings.slideMargin > 0) {
                    R += j.settings.slideMargin * (j.settings.minSlides - 1)
                }
            } else {
                R = Math.max.apply(Math, T.map(function() {
                    return b(this).outerHeight(false)
                }).get())
            }
            if (j.viewport.css("box-sizing") == "border-box") {
                R += parseFloat(j.viewport.css("padding-top")) + parseFloat(j.viewport.css("padding-bottom")) + parseFloat(j.viewport.css("border-top-width")) + parseFloat(j.viewport.css("border-bottom-width"))
            } else {
                if (j.viewport.css("box-sizing") == "padding-box") {
                    R += parseFloat(j.viewport.css("padding-top")) + parseFloat(j.viewport.css("padding-bottom"))
                }
            }
            return R
        };
        var L = function() {
            var R = "100%";
            if (j.settings.slideWidth > 0) {
                if (j.settings.mode == "horizontal") {
                    R = (j.settings.maxSlides * j.settings.slideWidth) + ((j.settings.maxSlides - 1) * j.settings.slideMargin)
                } else {
                    R = j.settings.slideWidth
                }
            }
            return R
        };
        var D = function() {
            var S = j.settings.slideWidth;
            var R = j.viewport.width();
            if (j.settings.slideWidth == 0 || (j.settings.slideWidth > R && !j.carousel) || j.settings.mode == "vertical") {
                S = R
            } else {
                if (j.settings.maxSlides > 1 && j.settings.mode == "horizontal") {
                    if (R > j.maxThreshold) {} else {
                        if (R < j.minThreshold) {
                            S = (R - (j.settings.slideMargin * (j.settings.minSlides - 1))) / j.settings.minSlides
                        }
                    }
                }
            }
            return S
        };
        var A = function() {
            var S = 1;
            if (j.settings.mode == "horizontal" && j.settings.slideWidth > 0) {
                if (j.viewport.width() < j.minThreshold) {
                    S = j.settings.minSlides
                } else {
                    if (j.viewport.width() > j.maxThreshold) {
                        S = j.settings.maxSlides
                    } else {
                        var R = j.children.first().width() + j.settings.slideMargin;
                        S = Math.floor((j.viewport.width() + j.settings.slideMargin) / R)
                    }
                }
            } else {
                if (j.settings.mode == "vertical") {
                    S = j.settings.minSlides
                }
            }
            return S
        };
        var v = function() {
            var S = 0;
            if (j.settings.moveSlides > 0) {
                if (j.settings.infiniteLoop) {
                    S = Math.ceil(j.children.length / q())
                } else {
                    var T = 0;
                    var R = 0;
                    while (T < j.children.length) {
                        ++S;
                        T = R + A();
                        R += j.settings.moveSlides <= A() ? j.settings.moveSlides : A()
                    }
                }
            } else {
                S = Math.ceil(j.children.length / A())
            }
            return S
        };
        var q = function() {
            if (j.settings.moveSlides > 0 && j.settings.moveSlides <= A()) {
                return j.settings.moveSlides
            }
            return A()
        };
        var h = function() {
            if (j.children.length > j.settings.maxSlides && j.active.last && !j.settings.infiniteLoop) {
                if (j.settings.mode == "horizontal") {
                    var T = j.children.last();
                    var R = T.position();
                    B(-(R.left - (j.viewport.width() - T.outerWidth())), "reset", 0)
                } else {
                    if (j.settings.mode == "vertical") {
                        var S = j.children.length - j.settings.minSlides;
                        var R = j.children.eq(S).position();
                        B(-R.top, "reset", 0)
                    }
                }
            } else {
                var R = j.children.eq(j.active.index * q()).position();
                if (j.active.index == v() - 1) {
                    j.active.last = true
                }
                if (R != undefined) {
                    if (j.settings.mode == "horizontal") {
                        B(-R.left, "reset", 0)
                    } else {
                        if (j.settings.mode == "vertical") {
                            B(-R.top, "reset", 0)
                        }
                    }
                }
            }
        };
        var B = function(T, S, U, W) {
            if (j.usingCSS) {
                var V = j.settings.mode == "vertical" ? "translate3d(0, " + T + "px, 0)" : "translate3d(" + T + "px, 0, 0)";
                H.css("-" + j.cssPrefix + "-transition-duration", U / 1000 + "s");
                if (S == "slide") {
                    H.css(j.animProp, V);
                    H.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                        H.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");
                        p()
                    })
                } else {
                    if (S == "reset") {
                        H.css(j.animProp, V)
                    } else {
                        if (S == "ticker") {
                            H.css("-" + j.cssPrefix + "-transition-timing-function", "linear");
                            H.css(j.animProp, V);
                            H.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                                H.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");
                                B(W.resetValue, "reset", 0);
                                u()
                            })
                        }
                    }
                }
            } else {
                var R = {};
                R[j.animProp] = T;
                if (S == "slide") {
                    H.animate(R, U, j.settings.easing, function() {
                        p()
                    })
                } else {
                    if (S == "reset") {
                        H.css(j.animProp, T)
                    } else {
                        if (S == "ticker") {
                            H.animate(R, speed, "linear", function() {
                                B(W.resetValue, "reset", 0);
                                u()
                            })
                        }
                    }
                }
            }
        };
        var r = function() {
            var U = "";
            var T = v();
            for (var S = 0; S < T; S++) {
                var R = "";
                if (j.settings.buildPager && b.isFunction(j.settings.buildPager)) {
                    R = j.settings.buildPager(S);
                    j.pagerEl.addClass("bx-custom-pager")
                } else {
                    R = S + 1;
                    j.pagerEl.addClass("bx-default-pager")
                }
                if (T > 1) {
                    U += '<a href="" data-slide-index="' + S + '" class="bx-pager-link"></a>'
                }
            }
            j.pagerEl.html(U)
        };
        var O = function() {
            if (!j.settings.pagerCustom) {
                j.pagerEl = b('<div class="bx-pager" />');
                if (j.settings.pagerSelector) {
                    b(j.settings.pagerSelector).html(j.pagerEl)
                } else {
                    j.controls.el.addClass("bx-has-pager").append(j.pagerEl)
                }
                r()
            } else {
                j.pagerEl = b(j.settings.pagerCustom)
            }
            j.pagerEl.on("click", "a", x)
        };
        var k = function() {
            if (j.settings.nextSelector) {
                b(j.settings.nextSelector).bind("click", g)
            }
            if (j.settings.prevSelector) {
                b(j.settings.prevSelector).bind("click", N)
            }
            if (!j.settings.nextSelector && !j.settings.prevSelector) {
                j.controls.directionEl = b('<div class="bx-controls-direction" />');
                j.controls.directionEl.append(j.controls.prev).append(j.controls.next);
                j.controls.el.addClass("bx-has-controls-direction").append(j.controls.directionEl)
            }
        };
        var K = function() {
            j.controls.start = b('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + j.settings.startText + "</a></div>");
            j.controls.stop = b('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + j.settings.stopText + "</a></div>");
            j.controls.autoEl = b('<div class="bx-controls-auto" />');
            j.controls.autoEl.on("click", ".bx-start", w);
            j.controls.autoEl.on("click", ".bx-stop", P);
            if (j.settings.autoControlsCombine) {
                j.controls.autoEl.append(j.controls.start)
            } else {
                j.controls.autoEl.append(j.controls.start).append(j.controls.stop)
            }
            if (j.settings.autoControlsSelector) {
                b(j.settings.autoControlsSelector).html(j.controls.autoEl)
            } else {
                j.controls.el.addClass("bx-has-controls-auto").append(j.controls.autoEl)
            }
            G(j.settings.autoStart ? "stop" : "start")
        };
        var z = function() {
            j.children.each(function(R) {
                var S = b(this).find("img:first").attr("title");
                if (S != undefined && ("" + S).length) {
                    b(this).append('<div class="bx-caption"><span>' + S + "</span></div>")
                }
            })
        };
        var g = function(R) {
            if (j.settings.auto) {
                H.stopAuto()
            }
            H.goToNextSlide();
            R.preventDefault()
        };
        var N = function(R) {
            if (j.settings.auto) {
                H.stopAuto()
            }
            H.goToPrevSlide();
            R.preventDefault()
        };
        var w = function(R) {
            H.startAuto();
            R.preventDefault()
        };
        var P = function(R) {
            H.stopAuto();
            R.preventDefault()
        };
        var x = function(T) {
            if (j.settings.auto) {
                H.stopAuto()
            }
            var S = b(T.currentTarget);
            if (S.attr("data-slide-index") !== undefined) {
                var R = parseInt(S.attr("data-slide-index"));
                if (R != j.active.index) {
                    H.goToSlide(R)
                }
                T.preventDefault()
            }
        };
        var Q = function(S) {
            var R = j.children.length;
            if (j.settings.pagerType == "short") {
                if (j.settings.maxSlides > 1) {
                    R = Math.ceil(j.children.length / j.settings.maxSlides)
                }
                j.pagerEl.html((S + 1) + j.settings.pagerShortSeparator + R);
                return
            }
            j.pagerEl.find("a").removeClass("active");
            j.pagerEl.each(function(T, U) {
                b(U).find("a").eq(S).addClass("active")
            })
        };
        var p = function() {
            if (j.settings.infiniteLoop) {
                var R = "";
                if (j.active.index == 0) {
                    R = j.children.eq(0).position()
                } else {
                    if (j.active.index == v() - 1 && j.carousel) {
                        R = j.children.eq((v() - 1) * q()).position()
                    } else {
                        if (j.active.index == j.children.length - 1) {
                            R = j.children.eq(j.children.length - 1).position()
                        }
                    }
                }
                if (R) {
                    if (j.settings.mode == "horizontal") {
                        B(-R.left, "reset", 0)
                    } else {
                        if (j.settings.mode == "vertical") {
                            B(-R.top, "reset", 0)
                        }
                    }
                }
            }
            j.working = false;
            j.settings.onSlideAfter(j.children.eq(j.active.index), j.oldIndex, j.active.index)
        };
        var G = function(R) {
            if (j.settings.autoControlsCombine) {
                j.controls.autoEl.html(j.controls[R])
            } else {
                j.controls.autoEl.find("a").removeClass("active");
                j.controls.autoEl.find("a:not(.bx-" + R + ")").addClass("active")
            }
        };
        var l = function() {
            if (v() == 1) {
                j.controls.prev.addClass("disabled");
                j.controls.next.addClass("disabled")
            } else {
                if (!j.settings.infiniteLoop && j.settings.hideControlOnEnd) {
                    if (j.active.index == 0) {
                        j.controls.prev.addClass("disabled");
                        j.controls.next.removeClass("disabled")
                    } else {
                        if (j.active.index == v() - 1) {
                            j.controls.next.addClass("disabled");
                            j.controls.prev.removeClass("disabled")
                        } else {
                            j.controls.prev.removeClass("disabled");
                            j.controls.next.removeClass("disabled")
                        }
                    }
                }
            }
        };
        var e = function() {
            if (j.settings.autoDelay > 0) {
                var R = setTimeout(H.startAuto, j.settings.autoDelay)
            } else {
                H.startAuto()
            }
            if (j.settings.autoHover) {
                H.hover(function() {
                    if (j.interval) {
                        H.stopAuto(true);
                        j.autoPaused = true
                    }
                }, function() {
                    if (j.autoPaused) {
                        H.startAuto(true);
                        j.autoPaused = null
                    }
                })
            }
        };
        var F = function() {
            var S = 0;
            if (j.settings.autoDirection == "next") {
                H.append(j.children.clone().addClass("bx-clone"))
            } else {
                H.prepend(j.children.clone().addClass("bx-clone"));
                var R = j.children.first().position();
                S = j.settings.mode == "horizontal" ? -R.left : -R.top
            }
            B(S, "reset", 0);
            j.settings.pager = false;
            j.settings.controls = false;
            j.settings.autoControls = false;
            if (j.settings.tickerHover && !j.usingCSS) {
                j.viewport.hover(function() {
                    H.stop()
                }, function() {
                    var W = 0;
                    j.children.each(function(X) {
                        W += j.settings.mode == "horizontal" ? b(this).outerWidth(true) : b(this).outerHeight(true)
                    });
                    var T = j.settings.speed / W;
                    var U = j.settings.mode == "horizontal" ? "left" : "top";
                    var V = T * (W - (Math.abs(parseInt(H.css(U)))));
                    u(V)
                })
            }
            u()
        };
        var u = function(W) {
            speed = W ? W : j.settings.speed;
            var R = {
                left: 0,
                top: 0
            };
            var U = {
                left: 0,
                top: 0
            };
            if (j.settings.autoDirection == "next") {
                R = H.find(".bx-clone").first().position()
            } else {
                U = j.children.first().position()
            }
            var T = j.settings.mode == "horizontal" ? -R.left : -R.top;
            var S = j.settings.mode == "horizontal" ? -U.left : -U.top;
            var V = {
                resetValue: S
            };
            B(T, "ticker", speed, V)
        };
        var f = function() {
            j.touch = {
                start: {
                    x: 0,
                    y: 0
                },
                end: {
                    x: 0,
                    y: 0
                }
            };
            j.viewport.bind("touchstart", E)
        };
        var E = function(R) {
            if (j.working) {
                R.preventDefault()
            } else {
                j.touch.originalPos = H.position();
                var S = R.originalEvent;
                j.touch.start.x = S.changedTouches[0].pageX;
                j.touch.start.y = S.changedTouches[0].pageY;
                j.viewport.bind("touchmove", I);
                j.viewport.bind("touchend", y)
            }
        };
        var I = function(S) {
            var W = S.originalEvent;
            var T = Math.abs(W.changedTouches[0].pageX - j.touch.start.x);
            var V = Math.abs(W.changedTouches[0].pageY - j.touch.start.y);
            if ((T * 3) > V && j.settings.preventDefaultSwipeX) {
                S.preventDefault()
            } else {
                if ((V * 3) > T && j.settings.preventDefaultSwipeY) {
                    S.preventDefault()
                }
            }
            if (j.settings.mode != "fade" && j.settings.oneToOneTouch) {
                var R = 0;
                if (j.settings.mode == "horizontal") {
                    var U = W.changedTouches[0].pageX - j.touch.start.x;
                    R = j.touch.originalPos.left + U
                } else {
                    var U = W.changedTouches[0].pageY - j.touch.start.y;
                    R = j.touch.originalPos.top + U
                }
                B(R, "reset", 0)
            }
        };
        var y = function(S) {
            j.viewport.unbind("touchmove", I);
            var U = S.originalEvent;
            var R = 0;
            j.touch.end.x = U.changedTouches[0].pageX;
            j.touch.end.y = U.changedTouches[0].pageY;
            if (j.settings.mode == "fade") {
                var T = Math.abs(j.touch.start.x - j.touch.end.x);
                if (T >= j.settings.swipeThreshold) {
                    j.touch.start.x > j.touch.end.x ? H.goToNextSlide() : H.goToPrevSlide();
                    H.stopAuto()
                }
            } else {
                var T = 0;
                if (j.settings.mode == "horizontal") {
                    T = j.touch.end.x - j.touch.start.x;
                    R = j.touch.originalPos.left
                } else {
                    T = j.touch.end.y - j.touch.start.y;
                    R = j.touch.originalPos.top
                }
                if (!j.settings.infiniteLoop && ((j.active.index == 0 && T > 0) || (j.active.last && T < 0))) {
                    B(R, "reset", 200)
                } else {
                    if (Math.abs(T) >= j.settings.swipeThreshold) {
                        T < 0 ? H.goToNextSlide() : H.goToPrevSlide();
                        H.stopAuto()
                    } else {
                        B(R, "reset", 200)
                    }
                }
            }
            j.viewport.unbind("touchend", y)
        };
        var n = function(S) {
            if (!j.initialized) {
                return
            }
            var R = b(window).width();
            var T = b(window).height();
            if (J != R || M != T) {
                J = R;
                M = T;
                H.redrawSlider();
                j.settings.onSliderResize.call(H, j.active.index)
            }
        };
        H.goToSlide = function(V, X) {
            if (j.working || j.active.index == V) {
                return
            }
            j.working = true;
            j.oldIndex = j.active.index;
            if (V < 0) {
                j.active.index = v() - 1
            } else {
                if (V >= v()) {
                    j.active.index = 0
                } else {
                    j.active.index = V
                }
            }
            j.settings.onSlideBefore(j.children.eq(j.active.index), j.oldIndex, j.active.index);
            if (X == "next") {
                j.settings.onSlideNext(j.children.eq(j.active.index), j.oldIndex, j.active.index)
            } else {
                if (X == "prev") {
                    j.settings.onSlidePrev(j.children.eq(j.active.index), j.oldIndex, j.active.index)
                }
            }
            j.active.last = j.active.index >= v() - 1;
            if (j.settings.pager) {
                Q(j.active.index)
            }
            if (j.settings.controls) {
                l()
            }
            if (j.settings.mode == "fade") {
                if (j.settings.adaptiveHeight && j.viewport.height() != o()) {
                    j.viewport.animate({
                        height: o()
                    }, j.settings.adaptiveHeightSpeed)
                }
                j.children.filter(":visible").fadeOut(j.settings.speed).css({
                    zIndex: 0
                });
                j.children.eq(j.active.index).css("zIndex", j.settings.slideZIndex + 1).fadeIn(j.settings.speed, function() {
                    b(this).css("zIndex", j.settings.slideZIndex);
                    p()
                })
            } else {
                if (j.settings.adaptiveHeight && j.viewport.height() != o()) {
                    j.viewport.animate({
                        height: o()
                    }, j.settings.adaptiveHeightSpeed)
                }
                var W = 0;
                var U = {
                    left: 0,
                    top: 0
                };
                if (!j.settings.infiniteLoop && j.carousel && j.active.last) {
                    if (j.settings.mode == "horizontal") {
                        var R = j.children.eq(j.children.length - 1);
                        U = R.position();
                        W = j.viewport.width() - R.outerWidth()
                    } else {
                        var T = j.children.length - j.settings.minSlides;
                        U = j.children.eq(T).position()
                    }
                } else {
                    if (j.carousel && j.active.last && X == "prev") {
                        var Z = j.settings.moveSlides == 1 ? j.settings.maxSlides - q() : ((v() - 1) * q()) - (j.children.length - j.settings.maxSlides);
                        var R = H.children(".bx-clone").eq(Z);
                        U = R.position()
                    } else {
                        if (X == "next" && j.active.index == 0) {
                            U = H.find("> .bx-clone").eq(j.settings.maxSlides).position();
                            j.active.last = false
                        } else {
                            if (V >= 0) {
                                var S = V * q();
                                U = j.children.eq(S).position()
                            }
                        }
                    }
                }
                if ("undefined" !== typeof(U)) {
                    var Y = j.settings.mode == "horizontal" ? -(U.left - W) : -U.top;
                    B(Y, "slide", j.settings.speed)
                }
            }
        };
        H.goToNextSlide = function() {
            if (!j.settings.infiniteLoop && j.active.last) {
                return
            }
            var R = parseInt(j.active.index) + 1;
            H.goToSlide(R, "next")
        };
        H.goToPrevSlide = function() {
            if (!j.settings.infiniteLoop && j.active.index == 0) {
                return
            }
            var R = parseInt(j.active.index) - 1;
            H.goToSlide(R, "prev")
        };
        H.startAuto = function(R) {
            if (j.interval) {
                return
            }
            j.interval = setInterval(function() {
                j.settings.autoDirection == "next" ? H.goToNextSlide() : H.goToPrevSlide()
            }, j.settings.pause);
            if (j.settings.autoControls && R != true) {
                G("stop")
            }
        };
        H.stopAuto = function(R) {
            if (!j.interval) {
                return
            }
            clearInterval(j.interval);
            j.interval = null;
            if (j.settings.autoControls && R != true) {
                G("start")
            }
        };
        H.getCurrentSlide = function() {
            return j.active.index
        };
        H.getCurrentSlideElement = function() {
            return j.children.eq(j.active.index)
        };
        H.getSlideCount = function() {
            return j.children.length
        };
        H.redrawSlider = function() {
            j.children.add(H.find(".bx-clone")).width(D());
            j.viewport.css("height", o());
            if (!j.settings.ticker) {
                h()
            }
            if (j.active.last) {
                j.active.index = v() - 1
            }
            if (j.active.index >= v()) {
                j.active.last = true
            }
            if (j.settings.pager && !j.settings.pagerCustom) {
                r();
                Q(j.active.index)
            }
        };
        H.destroySlider = function() {
            if (!j.initialized) {
                return
            }
            j.initialized = false;
            b(".bx-clone", this).remove();
            j.children.each(function() {
                b(this).data("origStyle") != undefined ? b(this).attr("style", b(this).data("origStyle")) : b(this).removeAttr("style")
            });
            b(this).data("origStyle") != undefined ? this.attr("style", b(this).data("origStyle")) : b(this).removeAttr("style");
            b(this).unwrap().unwrap();
            if (j.controls.el) {
                j.controls.el.remove()
            }
            if (j.controls.next) {
                j.controls.next.remove()
            }
            if (j.controls.prev) {
                j.controls.prev.remove()
            }
            if (j.pagerEl && j.settings.controls) {
                j.pagerEl.remove()
            }
            b(".bx-caption", this).remove();
            if (j.controls.autoEl) {
                j.controls.autoEl.remove()
            }
            clearInterval(j.interval);
            if (j.settings.responsive) {
                b(window).unbind("resize", n)
            }
        };
        H.reloadSlider = function(R) {
            if (R != undefined) {
                s = R
            }
            H.destroySlider();
            C()
        };
        C();
        return this
    }
})(jQuery);
