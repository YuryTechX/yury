{
  const t = () => {
    document.documentElement.style.setProperty(
      "--body-scroll-width",
      window.innerWidth - document.documentElement.clientWidth + "px"
    );
  };
  window.addEventListener("resize", t), t();
}
feather.replace({ class: "icon" });
{
  const t = $(window),
    e = (e) => {
      const o = t.height() || 0,
        a = e.height() || 0,
        n = (e.offset() || { top: 0 }).top,
        s = n + a,
        i = t.scrollTop() || 0,
        l = i + o,
        r = a - (Math.max(s, l) - Math.min(n, i) - o);
      return r <= 0 ? 0 : r / a;
    },
    o = 0.25,
    a = $("[data-viewport-dark]")
      .toArray()
      .map((t) => ({
        ratio: parseFloat(t.getAttribute("data-viewport-dark") || "") || o,
        $el: $(t),
      }));
  if (a.length) {
    const o = () => {
      const t = a.some((t) => e(t.$el) > t.ratio);
      setDarkMode(t);
    };
    t.on("scroll resize load", o), o();
  }
}
{
  const t = new URLSearchParams(location.search).get("tab-id");
  if (t) {
    const e = new URLSearchParams(location.search).get("tab-index"),
      o = UIkit.tab("#" + t);
    o && o.show(e);
  }
}
{
  const t = new URLSearchParams(location.search).get("switcher-id");
  if (t) {
    const e = new URLSearchParams(location.search).get("switcher-index"),
      o = UIkit.switcher("#" + t);
    o && o.show(e);
  }
}
document.body.classList.toggle(
  "uni-is-login",
  "1" === localStorage.getItem("is-login")
),
  document
    .querySelectorAll(".uni-login-form, .uni-signup-form")
    .forEach((t) => {
      t.addEventListener("submit", (t) => {
        localStorage.setItem("is-login", "1");
      });
    }),
  document.querySelectorAll(".uni-logout-link").forEach((t) => {
    t.addEventListener("click", async (t) => {
      t.preventDefault(),
        localStorage.removeItem("is-login"),
        location.reload();
    });
  });
{
  class t {
    constructor(t) {
      (this.dd = t),
        (this.placeholder = this.dd.find("span")),
        (this.opts = this.dd.find(".uk-droplist-dropdown li")),
        (this.val = ""),
        (this.index = -1),
        this.initEvents(),
        (this.onChangeHandlers = new Set());
    }
    initEvents() {
      const t = this;
      t.dd.on("click", function (t) {
        t.preventDefault(),
          t.stopPropagation(),
          $(this).toggleClass("uk-active");
      }),
        t.opts
          .on("click", function () {
            const e = $(this);
            (t.val = e.text()),
              (t.index = e.index()),
              t.placeholder.text(t.val),
              e.siblings().removeClass("uk-active"),
              e.filter(':contains("' + t.val + '")').addClass("uk-active"),
              t.dd.trigger("change");
          })
          .trigger("change"),
        $(document).on("click", function () {
          t.dd.removeClass("uk-active");
        });
    }
    get options() {
      return this.opts;
    }
    get value() {
      return this.val;
    }
    get selectedIndex() {
      return this.index;
    }
  }
  $(function () {
    document.querySelectorAll(".uk-droplist").forEach((e) => {
      const o = new t($(e));
      e.classList.contains("uk-droplist-filter") &&
        o.dd.on("change", () => {
          const t = o.options[o.selectedIndex];
          UIkit.filter(o.dd.closest("[data-uk-filter]")).apply(t);
        });
    });
  });
}
{
  const t = document.querySelectorAll("[data-image-hover-revealer]"),
    e = 17,
    o = 400,
    a = !0,
    n = document.createElement("img");
  let s, i;
  (n.alt = ""), (n.className = "image-hover-revealer"), document.body.append(n);
  let l = !1;
  t.forEach((t) => {
    if (!(t instanceof HTMLElement)) return;
    if (!(n instanceof Image)) return;
    const r = t.getAttribute("data-image-hover-revealer");
    t.addEventListener("mouseover", () => {
      n.setAttribute("src", r),
        n.classList.add("uk-active"),
        (s = Date.now()),
        (l = !0),
        clearTimeout(i);
    }),
      window.addEventListener("mousemove", (t) => {
        if (!l) return;
        let o = t.pageX,
          s = t.pageY;
        const i = n.clientWidth,
          r = n.clientHeight;
        o + i >= window.scrollX + window.innerWidth - e &&
          (a ? (o -= i) : (o = window.innerWidth - e - i)),
          s + r >= window.scrollY + window.innerHeight &&
            (a ? (s -= r) : (s = window.scrollY + window.innerHeight - r)),
          n.style.setProperty("--move-x", o + "px"),
          n.style.setProperty("--move-y", s + "px");
      }),
      t.addEventListener("mouseleave", () => {
        const t = Date.now() - s;
        i = setTimeout(() => {
          n.classList.remove("uk-active"),
            (i = setTimeout(() => {
              (l = !1),
                n.style.setProperty("--move-x", "0px"),
                n.style.setProperty("--move-y", "0px");
            }, o));
        }, Math.max(0, o - t));
      });
  });
}
const stickyItemContrast = (t, e, o, a = {}) => {
    a = Object.assign({ black: "contrast-black", white: "contrast-white" }, a);
    const n = ((t) => {
        const e = {};
        return (o) => {
          if (null != e[o]) return e[o];
          {
            const a = t(o);
            return (e[o] = a), a;
          }
        };
      })((t) => {
        if (!t.startsWith("rgb(")) return "black";
        const e = t.slice(4, -1).split(",").map(Number);
        return (299 * e[0] + 587 * e[1] + 114 * e[2]) / 1e3 >= 128
          ? "black"
          : "white";
      }),
      s = $(window);
    let i = "";
    const l = () => {
      const s = "function" == typeof o ? o(e) : o,
        l = t
          .map(
            (t) => t instanceof HTMLElement && window.scrollY + s >= t.offsetTop
          )
          .lastIndexOf(!0);
      if (-1 === l) return;
      const r = ((t) => {
          let e = "";
          for (
            ;
            t &&
            ((e = window
              .getComputedStyle(t, null)
              .getPropertyValue("background-color")),
            /rgba\(.*?,\s*0\)$/.test(e));

          )
            t = t.parentElement;
          return e;
        })(t[l]),
        d = n(r);
      i !== d && a[i] && e.classList.remove(a[i]),
        a[d] && e.classList.add(a[d]),
        (i = d);
    };
    s.on("scroll resize load darkmodechange", l), l();
  },
  getElementParents = (t) => {
    const e = [];
    for (; (t = t.parentNode); ) e.push(t);
    return e;
  },
  stickyItemsDarkMode = (t, e) => {
    const o = [
        ...document.querySelectorAll('.uk-section, [class*="uk-section-"]'),
      ],
      a = [...document.querySelectorAll(t)];
    for (const t of a)
      stickyItemContrast(o, t, e, { black: "", white: "uk-dark" });
  };
stickyItemsDarkMode(
  ".uni-header, .uni-sticky-menu, .uni-header-social",
  (t) => t.offsetTop + t.clientHeight / 2
),
  stickyItemsDarkMode(
    ".uni-header-location, .uni-header-section-indicator",
    () => window.innerHeight / 2
  );
{
  const t = document.querySelector(".uni-header-section-indicator");
  if (t) {
    const e = [...t.querySelectorAll("li[data-selector]")].map((t) =>
        document.querySelector(t.getAttribute("data-selector"))
      ),
      o = $(window);
    let a = 0;
    const n = () => {
      const o = window.innerHeight / 2,
        n = e
          .map(
            (t) => t instanceof HTMLElement && window.scrollY + o >= t.offsetTop
          )
          .lastIndexOf(!0);
      -1 !== n &&
        a !== n &&
        ((a = n), t.style.setProperty("--section-indicator-index", a + ""));
    };
    o.on("scroll resize load darkmodechange", n), n();
  }
}
document.querySelectorAll("[data-darkmode-toggle] input").forEach((t) => {
  t.addEventListener("change", () => {
    setDarkMode(!isDarkMode());
    const t = isDarkMode();
    localStorage.setItem("darkMode", t ? "1" : "0");
  }),
    (t.checked = isDarkMode());
}),
  $("[data-uk-modal] [data-uk-scrollspy-nav] a").on("click", function () {
    UIkit.toggle($(this).closest("[data-uk-modal].uk-open")).toggle();
  }),
  $(".uk-horizontal-scroll").each(function (t, e) {
    e.addEventListener("wheel", (t) => {
      t.preventDefault(), e.scrollBy(t.deltaY, 0);
    });
  }),
  UIkit.util.on('a[href="#remove_product_from_cart"]', "click", function (t) {
    t.preventDefault();
    const e = t.target;
    e.blur();
    const o = e.getAttribute("data-product-id");
    UIkit.modal.dialog(
      `\n        <div class="uk-modal-body uk-margin-remove uk-padding-small uk-text-center">\n            <p class="uk-padding-small uk-margin-small">Are you sure you want to remove this item from the cart?</p>\n            <footer class="uk-flex uk-flex-middle">\n                <button type="button" class="uk-modal-close uk-button uk-button-default uk-width-expand">No</button>\n                <button type="button" class="uk-modal-close uk-button uk-button-primary uk-width-expand uk-margin-xsmall-left dark:uk-button-invert" id="remove_product_from_cart" data-product-id="${o}">Yes</button>\n            </footer>\n        </div>\n    `,
      {
        stack: !0,
        "cls-page": "uk-modal-page-active",
        "cls-panel": "uk-modal-dialog-active",
      }
    );
  }),
  UIkit.util.on('a[href="#uni_add_to_cart"]', "click", function (t) {
    t.preventDefault();
    const e = t.target;
    e.blur();
    const o = e.getAttribute("data-product-id");
    UIkit.modal.dialog(
      `\n        <div class="uk-modal-body uk-padding-small uk-margin-remove uk-text-center">\n            <p class="uk-padding uk-margin-remove">Are you sure you want to remove this item from the cart?</p>\n            <footer class="uk-flex uk-flex-middle">\n                <button type="button" class="uk-modal-close uk-button uk-button-default uk-width-expand">No</button>\n                <button type="button" class="uk-modal-close uk-button uk-button-danger uk-width-expand uk-margin-xsmall-left" id="remove_product_from_cart" data-product-id="${o}">Yes</button>\n            </footer>\n        </div>\n    `,
      {
        stack: !0,
        "cls-page": "uk-modal-page-active",
        "cls-panel": "uk-modal-dialog-active",
      }
    );
  }),
  UIkit.util.on(document, "click", "#remove_product_from_cart", function (t) {
    const e = t.target.getAttribute("data-product-id");
    console.warn("remove product", e, "confirmed!");
  });
{
  const t = (t, e = 1) => {
      let o;
      return function (...a) {
        clearTimeout(o), (o = setTimeout(() => t.call(this, ...a), e));
      };
    },
    e = $(document);
  $(".search-form").each(function () {
    const o = $(this),
      a = o.find('input[name="s"]'),
      n = o.find(".search-clear"),
      s = o.find(".search-results"),
      i = s.find(".search-results-content"),
      l = s.find(".search-results-loading");
    let r,
      d = "",
      c = !1;
    const u = () => {
        c && ((c = !1), l.addClass("uk-hidden"), i.removeClass("uk-hidden"));
      },
      m = t(() => {
        if (!g) return;
        const t = a.val() + "";
        if (d === t) return void u();
        r && r.abort();
        const e = Date.now();
        (d = t),
          (r = $.ajax({
            type: o.attr("method"),
            url: o.attr("action"),
            data: o.serialize(),
          })
            .done(function (o) {
              a.val() === t &&
                setTimeout(() => {
                  a.val() === t && (i.html(o), u(), (r = null));
                }, Math.max(0, 500 - (Date.now() - e)));
            })
            .fail(function (t) {}));
      }, 250);
    let g = !s.hasClass("uk-hidden");
    const h = () => {
        s.addClass("uk-hidden"), e.off("click mousedown scroll", k), (g = !1);
      },
      k = (t) => {
        $(t.target).parents(".search-results, .search-form").length || h();
      },
      p = () => {
        s.removeClass("uk-hidden"), e.on("click mousedown scroll", k), (g = !0);
      };
    o
      .on("submit", (t) => {
        t.preventDefault();
      })
      .on("input", (t) => {
        const e = a.val();
        c || ((c = !0), l.removeClass("uk-hidden"), i.addClass("uk-hidden")),
          m(),
          e ? n.removeClass("uk-hidden") : n.addClass("uk-hidden"),
          !g && e ? p() : g && !e && (h(), i.addClass("uk-hidden"));
      }),
      n.on("click", (t) => {
        a.val("").trigger("input");
      }),
      a.on("focus", (t) => {
        a.val() && (g || p());
      });
  });
}
document.addEventListener("DOMContentLoaded", (t) => {
  $("[data-toggle-active]").on("click", function (t) {
    t.preventDefault();
    const e = $(this);
    e.toggleClass("active").hasClass("active")
      ? (e.removeClass(e.attr("data-not-active-class")),
        e.addClass(e.attr("data-active-class")))
      : (e.removeClass(e.attr("data-active-class")),
        e.addClass(e.attr("data-not-active-class")));
  });
}),
  $("[data-toggle-loading]").on("click", function (t) {
    t.preventDefault();
    const e = this,
      o = $(this);
    if (
      o.hasClass("loading") ||
      o.hasClass("no-more-loading") ||
      !e.toggleLoadingClick ||
      !e.toggleLoadingInsertData
    )
      return;
    o.addClass("loading"),
      o.addClass(o.attr("data-loading-class")),
      o.removeClass(o.attr("data-not-loading-class"));
    const a = e.toggleLoadingClick();
    setTimeout(() => {
      a.then((t) => {
        e.toggleLoadingInsertData(t)
          ? (o.attr("disabled", ""),
            o.removeClass("loading"),
            o.addClass("no-more-loading"),
            o.removeClass(o.attr("data-loading-class")),
            o.addClass(o.attr("data-no-more-loading-class")))
          : (o.removeClass("loading"),
            o.removeClass(o.attr("data-loading-class")),
            o.addClass(o.attr("data-not-loading-class")));
      });
    }, 500);
  }),
  document.querySelectorAll("[data-load-more]").forEach((t) => {
    const e = t,
      o = document.querySelector(e.getAttribute("data-load-more-container")),
      a = e.getAttribute("data-load-more");
    let n = 1;
    (e.toggleLoadingClick = () => (
      console.log("url", a),
      fetch(a.replace(/%page%/g, ++n + "")).then((t) => t.text())
    )),
      (e.toggleLoadingInsertData = (t) => {
        if (
          ((t = t.replace(
            /<script type="module" src="\/@vite\/client"><\/script>/,
            ""
          )),
          o.insertAdjacentHTML("beforeend", t),
          !t.trim())
        )
          return !0;
      });
  });
var playing = !1;
$("#uni-audio-play-pause").on("click", function (t) {
  t.preventDefault(),
    $(this).find(".uni-icon-bars").toggleClass("playing"),
    0 == playing
      ? (document.getElementById("uni-background-audio").play(), (playing = !0))
      : (document.getElementById("uni-background-audio").pause(),
        (playing = !1));
});

//for social media 

const express = require('express');
const app = express();

const links = require('./link.js');

app.get('/whatsapp', (req, res) => {
  res.redirect(links.whatsapp);
});

app.get('/instagram', (req, res) => {
  res.redirect(links.instagram);
});

app.get('/linkedin', (req, res) => {
  res.redirect(links.linkedin);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});