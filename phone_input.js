(() => {
  function h(n) {
    n.directive(
      "mask",
      (e, { value: t, expression: u }, { effect: f, evaluateLater: c }) => {
        let r = () => u,
          l = "";
        queueMicrotask(() => {
          if (["function", "dynamic"].includes(t)) {
            let o = c(u);
            f(() => {
              (r = (a) => {
                let s;
                return (
                  n.dontAutoEvaluateFunctions(() => {
                    o(
                      (p) => {
                        s = typeof p == "function" ? p(a) : p;
                      },
                      { scope: { $input: a, $money: m.bind({ el: e }) } }
                    );
                  }),
                  s
                );
              }),
                i(e, !1);
            });
          } else i(e, !1);
          e._x_model && e._x_model.set(e.value);
        }),
          e.addEventListener("click", () => {
            if (!e.value) {
              e.value = "+38(0";
              e.setAttribute("data-init-click", true);
            }
          });
        e.addEventListener("input", () => i(e)),
          e.addEventListener("blur", () => i(e, !1));
        function i(o, a = !0) {
          if (
            !o.value.startsWith("+38(0") &&
            e.getAttribute("data-init-click")
          ) {
            o.value = "+38(0";
          }
          let s = o.value,
            p = r(s);
          if (!p || p === "false") return !1;
          if (l.length - o.value.length === 1) return (l = o.value);
          let g = (isBlur = false) => {
            const pattern = new RegExp("^" + o.pattern + "$");
            if (!pattern.test(o.value) && isBlur) {
              o.value = "";
            } else {
              l = o.value = d(s, p);
            }
          };
          a
            ? k(o, p, () => {
                g();
              })
            : g((isBlur = true));
        }
        function d(o, a) {
          if (o === "") return "";
          let s = v(a, o);
          return b(a, s);
        }
      }
    ).before("model");
  }
  function k(n, e, t) {
    let u = n.selectionStart,
      f = n.value;
    t();
    let c = f.slice(0, u),
      r = b(e, v(e, c)).length;
    n.setSelectionRange(r, r);
  }
  function v(n, e) {
    let t = e,
      u = "",
      f = { 9: /[0-9]/, a: /[a-zA-Z]/, "*": /[a-zA-Z0-9]/ },
      c = "";
    for (let r = 0; r < n.length; r++) {
      if (["9", "a", "*"].includes(n[r])) {
        c += n[r];
        continue;
      }
      for (let l = 0; l < t.length; l++)
        if (t[l] === n[r]) {
          t = t.slice(0, l) + t.slice(l + 1);
          break;
        }
    }
    for (let r = 0; r < c.length; r++) {
      let l = !1;
      for (let i = 0; i < t.length; i++)
        if (f[c[r]].test(t[i])) {
          (u += t[i]), (t = t.slice(0, i) + t.slice(i + 1)), (l = !0);
          break;
        }
      if (!l) break;
    }
    return u;
  }
  function b(n, e) {
    let t = Array.from(e),
      u = "";
    for (let f = 0; f < n.length; f++) {
      if (!["9", "a", "*"].includes(n[f])) {
        u += n[f];
        continue;
      }
      if (t.length === 0) break;
      u += t.shift();
    }
    return u;
  }
  function m(n, e = ".", t, u = 2) {
    if (n === "-") return "-";
    if (/^\D+$/.test(n)) return "9";
    t = t ?? (e === "," ? "." : ",");
    let f = (i, d) => {
        let o = "",
          a = 0;
        for (let s = i.length - 1; s >= 0; s--)
          i[s] !== d &&
            (a === 3 ? ((o = i[s] + d + o), (a = 0)) : (o = i[s] + o), a++);
        return o;
      },
      c = n.startsWith("-") ? "-" : "",
      r = n.replaceAll(new RegExp(`[^0-9\\${e}]`, "g"), ""),
      l = Array.from({ length: r.split(e)[0].length })
        .fill("9")
        .join("");
    return (
      (l = `${c}${f(l, t)}`),
      u > 0 && n.includes(e) && (l += `${e}` + "9".repeat(u)),
      queueMicrotask(() => {
        this.el.value.endsWith(e) ||
          (this.el.value[this.el.selectionStart - 1] === e &&
            this.el.setSelectionRange(
              this.el.selectionStart - 1,
              this.el.selectionStart - 1
            ));
      }),
      l
    );
  }
  document.addEventListener("alpine:init", () => {
    window.Alpine.plugin(h);
  });
})();
