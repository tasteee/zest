var nt = Object.defineProperty;
var ot = (s, t, n) => t in s ? nt(s, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : s[t] = n;
var B = (s, t, n) => ot(s, typeof t != "symbol" ? t + "" : t, n);
const P = (s) => Symbol.for(`atomico/${s}`), G = (s) => ({ current: s });
function rt(s, t) {
  const n = s.length;
  if (n !== t.length) return !1;
  for (let e = 0; e < n; e++)
    if (s[e] !== t[e]) return !1;
  return !0;
}
const C = (s) => typeof s == "function", O = (s) => s !== null && typeof s == "object", { isArray: Y } = Array;
function X(s, t, n = !1) {
  let e;
  const o = (c) => {
    for (let f = 0; f < c.length; f++) {
      const h = c[f];
      if (h && Y(h))
        o(h);
      else {
        const i = typeof h, r = i === "function";
        if (!n && (h == null || r || i === "boolean") || r)
          continue;
        if (i === "string" || i === "number")
          e = (e ?? "") + h;
        else {
          const a = h === !0 ? "" : h || "";
          e != null && (t(e), e = null), t(a);
        }
      }
    }
  };
  o(s), e != null && t(e);
}
const J = (s, t, n, e) => (s.addEventListener(t, n, e), () => s.removeEventListener(t, n)), I = P("hooks");
globalThis[I] = globalThis[I] || {};
let N = globalThis[I];
const W = "unmount", it = P("hook/suspense"), z = (s) => {
  const { i: t, hooks: n } = N.c, e = n[t] = n[t] || {};
  return e.value = s(e.value), N.c.i++, n[t].value;
}, $ = (s, t) => {
  const { i: n, hooks: e } = N.c;
  e[s] = e[s] || {}, e[s][n] = t, N.c.i++;
}, ct = (s) => z((t = G(s)) => t), K = () => z((s = G(N.c.host)) => s), Xt = () => N.c.update, ft = (s, t, n = 0) => {
  let e = {}, o = !1;
  return { render: (i) => {
    N.c = { host: t, hooks: e, update: s, i: 0, id: n };
    let r;
    try {
      o = !1, r = i();
    } catch (a) {
      if (a !== it) throw a;
      o = !0;
    } finally {
      N.c = null;
    }
    return r;
  }, dispatch: (i, r) => {
    const a = e[i];
    for (const d in a) a[d](r);
  }, isSuspense: () => o };
}, q = "effect", Z = "layoutEffect", H = "insertionEffect", j = (s) => (t, n) => {
  const e = ct({});
  $(s, () => {
    var c;
    const { current: o } = e;
    if (!o.args || !rt(o.args, n)) {
      o.args = n, (c = o.clean) == null || c.call(o);
      const f = t();
      f && (o.clean = f);
    }
  }), $(W, () => {
    e.current.clean && (e.current.clean(), e.current = {});
  });
}, v = j(H), Jt = j(Z), Wt = j(q), lt = "formAssociated", at = "formDisabled", ut = "formReset", ht = {
  checked: 1,
  value: 1,
  selected: 1
}, dt = {
  list: 1,
  type: 1,
  size: 1,
  form: 1,
  width: 1,
  height: 1,
  src: 1,
  href: 1,
  slot: 1
}, mt = {
  shadowDom: 1,
  staticNode: 1,
  cloneNode: 1,
  children: 1,
  key: 1
}, _ = {}, L = [], pt = 0, y = 1, A = 2;
class D extends Text {
}
const Et = P("id"), w = P("ref"), Nt = () => {
}, x = (s, t, ...n) => {
  const e = t || _;
  let { children: o } = e;
  return o = o ?? (n.length ? n : L), s === Nt ? o : !s.prototype && s instanceof Function ? s(
    o != L ? { children: o, ...e } : e
  ) : {
    type: s,
    props: e,
    key: e.key
  };
};
function Q(s, t, n = Et, e, o) {
  let c;
  const f = !o;
  o = f ? [] : o;
  const h = t && t[n];
  if (h && h.vnode == s) return t;
  const { type: i, props: r = _ } = s;
  e = e || s.type == "svg";
  const a = i instanceof Node ? y : i.prototype instanceof HTMLElement ? A : pt;
  c = i != "host" && (a == y ? (t && r.cloneNode ? t[w] : t) != i : a == A ? !(t instanceof i) : t ? t[w] || t.localName != i : !t), c && (a == y && r.cloneNode ? (t = i.cloneNode(!0), t[w] = i) : t = a == y ? i : a == A ? new i() : e ? document.createElementNS(
    "http://www.w3.org/2000/svg",
    i
  ) : document.createElement(
    i,
    r.is ? { is: r.is } : void 0
  ));
  const d = h || _, { vnode: m = _, cycle: l = 0 } = d;
  let { fragment: u, handlers: T = {} } = c ? {} : d;
  const { props: b = _ } = c ? _ : m, { children: M = L } = b;
  if (r.staticNode && !c) return t;
  if (r.shadowDom && !t.shadowRoot && t.attachShadow({ mode: "open", ...r.shadowDom }), r != b && St(t, b, r, T, e, o), r.children !== M) {
    const E = r.shadowDom ? t.shadowRoot : t;
    u = gt(
      r.children,
      u,
      E,
      n,
      // add support to foreignObject, children will escape from svg
      e && s.type == "foreignObject" ? !1 : e,
      o
    );
  }
  if (t[n] = { vnode: s, handlers: T, fragment: u, cycle: l + 1 }, f)
    for (let E = 0; E < o.length; E++) o[E]();
  return t;
}
function bt(s) {
  const t = new D(""), n = new D("");
  return s.append(t, n), {
    markStart: t,
    markEnd: n
  };
}
function gt(s, t, n, e, o, c) {
  s = s == null ? null : Y(s) ? s : [s];
  const f = t || bt(n), { markStart: h, markEnd: i, keyes: r } = f;
  let a;
  const d = r && /* @__PURE__ */ new Set(), m = r && "moveBefore" in n;
  let l = h;
  if (s && X(
    s,
    (u) => {
      const T = typeof u, b = T === "string";
      if (!(T == "object" && "type" in u && "props" in u) && !b)
        return;
      const E = u.key, k = r && E != null && r.get(E);
      l != i && l === k ? d.delete(l) : l = l == i ? i : l.nextSibling;
      const g = r ? k : l;
      let p = g;
      if (b) {
        const S = u + "";
        !(p instanceof Text) || p instanceof D ? p = new Text(S) : p.data != S && (p.data = S);
      } else
        p = Q(
          u,
          // @ts-ignore
          g,
          e,
          o,
          c
        );
      if (p != l) {
        r && d.delete(p);
        const S = m && (p || g).isConnected ? "moveBefore" : "insertBefore";
        !g || r ? (n[S](p, l), r && l != i && d.add(l)) : g == i ? n[S](p, i) : (n.replaceChild(p, g), l = p);
      }
      E != null && (a = a || /* @__PURE__ */ new Map(), a.set(E, p));
    },
    !r
  ), l = l == i ? i : l.nextSibling, t && l != i)
    for (; l != i; ) {
      const u = l;
      l = l.nextSibling, u.remove();
    }
  return d && d.forEach((u) => u.remove()), f.keyes = a, f;
}
function St(s, t, n, e, o, c) {
  for (const f in t)
    f in n || U(
      s,
      f,
      t[f],
      null,
      e,
      o,
      c
    );
  for (const f in n)
    U(
      s,
      f,
      t[f],
      n[f],
      e,
      o,
      c
    );
}
function U(s, t, n, e, o, c, f) {
  if (t = t == "class" && !c ? "className" : t, n = n ?? null, e = e ?? null, t in s && ht[t] && (n = s[t]), e === n || mt[t] || t[0] == "_") return;
  if (s.localName === "slot" && t === "assignNode" && "assign" in s) {
    f.push(() => s.assign(e));
    return;
  }
  const h = C(n), i = C(e);
  if (t.startsWith("on") && (i || h)) {
    _t(s, t.slice(2), e, o);
    return;
  }
  if (t === "ref") {
    e && (i ? f.push(() => e(s)) : e.current = s);
    return;
  }
  if (t === "style" && "style" in s) {
    const { style: d } = s, m = n && O(n), l = e && O(e);
    if (m && l) {
      for (const u in n)
        u in e || R(d, u, null);
      for (const u in e)
        n[u] !== e[u] && R(d, u, e[u]);
    } else if (l)
      for (const u in e) R(d, u, e[u]);
    else
      d.cssText = e || "";
    return;
  }
  const r = t.startsWith("$") ? t.slice(1) : t;
  r === t && (!c && !dt[t] && t in s || i || h) ? s[t] = e ?? "" : e == null ? s.removeAttribute(r) : s.setAttribute(
    r,
    O(e) ? JSON.stringify(e) : e
  );
}
function _t(s, t, n, e) {
  if (!e) return;
  e.handleEvent || (e.handleEvent = function(c) {
    const f = e[c.type];
    if (C(f)) return f.call(s, c);
  });
  const o = !!e[t];
  if (n) {
    const f = n.capture || n.once || n.passive ? {
      capture: !!n.capture,
      once: !!n.once,
      passive: !!n.passive
    } : void 0;
    o || s.addEventListener(t, e.handleEvent, f), e[t] = n;
  } else o && (s.removeEventListener(t, e.handleEvent), delete e[t]);
}
function R(s, t, n) {
  if (t[0] === "-") {
    n == null ? s.removeProperty(t) : s.setProperty(t, n);
    return;
  }
  s[t] = n;
}
class V {
  /**
   *
   * @param {HTMLElement} target
   * @param {string} message
   * @param {string} value
   */
  constructor(t, n, e) {
    this.message = n, this.target = t, this.value = e;
  }
}
class Tt extends V {
}
class Ot extends V {
}
const tt = P("event"), Pt = null, yt = { true: 1, "": 1, 1: 1 };
function Ct(s, t, n, e, o) {
  const {
    type: c,
    reflect: f,
    value: h,
    attr: i = At(t)
  } = O(n) && n != Pt ? n : { type: n };
  Object.defineProperty(s, t, {
    configurable: !0,
    /**
     * @this {import("dom").AtomicoThisInternal}
     * @param {any} newValue
     */
    set(r) {
      const a = this[t];
      h && r == null && (r = h.call({ self: this, prop: t }));
      const { error: d, value: m } = Ft(c, r);
      if (d && m != null)
        throw new Tt(
          this,
          `The value defined for prop '${t}' must be of type '${c.name}'`,
          m
        );
      a != m && (this._props[t] = m ?? void 0, this.update(), this.updated.then(() => {
        f && (this._ignoreAttr = i, wt(this, c, i, this[t]), this._ignoreAttr = null);
      }));
    },
    /**
     * @this {import("dom").AtomicoThisInternal}
     */
    get() {
      return this._props[t];
    }
  }), h && (o[t] = null), e[i] = { prop: t, type: c };
}
const st = (s, { type: t, base: n = CustomEvent, ...e }) => s.dispatchEvent(new n(t, e)), At = (s) => s.replace(/([A-Z])/g, "-$1").toLowerCase(), wt = (s, t, n, e) => e == null || t == Boolean && !e ? s.removeAttribute(n) : s.setAttribute(
  n,
  O(e) ? JSON.stringify(e) : t == Boolean ? "" : e.toString()
), Rt = (s, t) => s == Boolean ? !!yt[t] : s == Number ? Number(t) : s == String ? t : s == Array || s == Object ? JSON.parse(t) : (
  // TODO: If when defining reflect the prop can also be of type string?
  new s(t)
), Ft = (s, t) => s == null || t == null ? { value: t, error: !1 } : s != String && t === "" ? { value: void 0, error: !1 } : s == Object || s == Array || s == Symbol ? {
  value: t,
  error: {}.toString.call(t) !== `[object ${s.name}]`
} : t instanceof s ? {
  value: t,
  error: s == Number && Number.isNaN(t.valueOf())
} : s == String || s == Number || s == Boolean ? {
  value: t,
  error: s == Number ? typeof t != "number" || Number.isNaN(t) : s == String ? typeof t != "string" : typeof t != "boolean"
} : { value: t, error: !0 }, zt = (s) => ({
  type: Function,
  value() {
    const t = (n) => st(this.self, {
      ...s,
      type: this.prop,
      detail: n || (s == null ? void 0 : s.detail)
    });
    return t[tt] = !0, t;
  }
});
let It = 0;
const Lt = (s, t) => {
  const n = {}, e = {}, { props: o, styles: c, form: f } = {
    props: {},
    ...t
  };
  class h extends HTMLElement {
    constructor() {
      super(), this._setup(), this._render = () => s(
        //@ts-ignore
        { ...this._props }
      );
      for (const r in e) this[r] = e[r];
    }
    async _setup() {
      this._props = this._props || {}, this.symbolId = this.symbolId || Symbol(), this._hooks = this._hooks || ft(() => this.update(), this, "c" + It++);
      let r = new Promise((m) => this._mount = m), a, d = !0;
      this.update = () => {
        if (a) return;
        a = !0;
        const m = this._hooks;
        this.updated = r.then(() => {
          try {
            const l = m.render(this._render);
            m.dispatch(H), l && Q(l, this, this.symbolId), a = !1, d && !m.isSuspense() && (d = !1, Dt(this)), m.dispatch(Z);
          } finally {
            a = !1;
          }
        }).then(() => {
          m.dispatch(q);
        });
      }, this.update();
    }
    /***
     * A highly important method, as it allows evaluating the mount and unmount lifecycle.
     * Note that this process, to avoid duplicating effects, verifies that:
     * 1. The parent is different from the one in the previous mount.
     * 2. The node is connected.
     */
    connectedCallback() {
      this._unmount = () => {
        (!this.isConnected || this.lastParentNode != this.parentNode) && this._hooks.dispatch(W), this.parentNode || (this.lastParentNode = this.parentNode);
      }, this.lastParentNode != this.parentNode && (this._mount(), this.update()), this.lastParentNode = this.parentNode;
    }
    disconnectedCallback() {
      this._unmount();
    }
    /**
     * @this {import("dom").AtomicoThisInternal}
     * @param {string} attr
     * @param {(string|null)} oldValue
     * @param {(string|null)} value
     */
    attributeChangedCallback(r, a, d) {
      if (n[r]) {
        if (r === this._ignoreAttr || a === d) return;
        const { prop: m, type: l } = n[r];
        try {
          this[m] = Rt(l, d);
        } catch {
          throw new Ot(
            this,
            `The value defined as attr '${r}' cannot be parsed by type '${l.name}'`,
            d
          );
        }
      }
    }
    static get observedAttributes() {
      for (const r in o)
        Ct(this.prototype, r, o[r], n, e);
      return Object.keys(n);
    }
    static get styles() {
      return [c];
    }
    static get props() {
      return o;
    }
    async formResetCallback() {
      await this.updated, this._hooks.dispatch(ut);
    }
    async formAssociatedCallback(r) {
      await this.updated, this._hooks.dispatch(lt, r);
    }
    async formDisabledCallback(r) {
      await this.updated, this._hooks.dispatch(at, r);
    }
  }
  return B(h, "formAssociated", f), h;
};
function Dt(s) {
  const { styles: t } = s.constructor, { shadowRoot: n } = s;
  if (n && t.length) {
    const e = [];
    X(t, (o) => e.push(o)), e.length && (n.adoptedStyleSheets = e);
  }
}
const jt = (s, t = {}) => {
  const n = K();
  return n[s] || (n[s] = (e = t.detail) => {
    const o = n.current[s];
    C(o) && o[tt] ? o(e) : st(n.current, {
      type: s,
      ...t,
      detail: e
    });
  }), n[s];
};
new Promise((s) => {
  document.readyState === "loading" ? J(document, "DOMContentLoaded", s) : s();
});
const Mt = x("host", { style: "display: contents" }), et = "value", kt = "ChangedValue", Bt = "ConnectContext", $t = (s, t) => {
  const n = K(), e = jt(kt);
  v(() => {
    e();
  }, [t]), v(
    () => J(
      n.current,
      Bt,
      /**
       * @param {CustomEvent<import("context").DetailConnectContext>} event
       */
      (o) => {
        o.composedPath().at(0) !== o.currentTarget && s === o.detail.id && (o.stopPropagation(), o.detail.connect(n.current));
      }
    ),
    [s]
  ), n.current[et] = t;
}, vt = (s) => {
  const t = Lt(
    ({ value: n }) => ($t(t, n), Mt),
    {
      props: {
        value: {
          type: Object,
          value: () => s
        }
      }
    }
  );
  return t[et] = s, t;
}, F = {};
function Kt(s, ...t) {
  const n = (s.raw || s).reduce(
    (e, o, c) => e + o + (t[c] || ""),
    ""
  );
  return F[n] || (F[n] = Ut(n));
}
function Ut(s) {
  const t = new CSSStyleSheet();
  return t.replaceSync(s), t;
}
vt({
  /**
   *
   * @param {string} type
   * @param {string} id
   */
  dispatch(s, t) {
  }
});
const Gt = (s, t, n) => (t == null ? t = { key: n } : t.key = n, x(s, t)), qt = Gt, Zt = (s, t) => {
  typeof customElements > "u" || customElements.get(s) || customElements.define(s, t);
};
export {
  Nt as F,
  Tt as P,
  Lt as a,
  Wt as b,
  Kt as c,
  Zt as d,
  zt as e,
  ct as f,
  qt as g,
  z as h,
  C as i,
  Gt as j,
  Xt as k,
  rt as l,
  Jt as m,
  J as n,
  K as u
};
