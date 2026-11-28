var it = Object.defineProperty;
var ct = (s, t, e) => t in s ? it(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var $ = (s, t, e) => ct(s, typeof t != "symbol" ? t + "" : t, e);
const y = (s) => Symbol.for(`atomico/${s}`), G = (s) => ({ current: s });
function at(s, t) {
  const e = s.length;
  if (e !== t.length) return !1;
  for (let n = 0; n < e; n++)
    if (s[n] !== t[n]) return !1;
  return !0;
}
const C = (s) => typeof s == "function", O = (s) => s !== null && typeof s == "object", { isArray: Y } = Array;
function X(s, t, e = !1) {
  let n;
  const o = (c) => {
    for (let a = 0; a < c.length; a++) {
      const h = c[a];
      if (h && Y(h))
        o(h);
      else {
        const i = typeof h, r = i === "function";
        if (!e && (h == null || r || i === "boolean") || r)
          continue;
        if (i === "string" || i === "number")
          n = (n ?? "") + h;
        else {
          const l = h === !0 ? "" : h || "";
          n != null && (t(n), n = null), t(l);
        }
      }
    }
  };
  o(s), n != null && t(n);
}
const J = (s, t, e, n) => (s.addEventListener(t, e, n), () => s.removeEventListener(t, e)), I = y("hooks");
globalThis[I] = globalThis[I] || {};
let N = globalThis[I];
const W = "unmount", ft = y("hook/suspense"), z = (s) => {
  const { i: t, hooks: e } = N.c, n = e[t] = e[t] || {};
  return n.value = s(n.value), N.c.i++, e[t].value;
}, L = (s, t) => {
  const { i: e, hooks: n } = N.c;
  n[s] = n[s] || {}, n[s][e] = t, N.c.i++;
}, lt = (s) => z((t = G(s)) => t), K = () => z((s = G(N.c.host)) => s), Jt = () => N.c.update, ut = (s, t, e = 0) => {
  let n = {}, o = !1;
  return { render: (i) => {
    N.c = { host: t, hooks: n, update: s, i: 0, id: e };
    let r;
    try {
      o = !1, r = i();
    } catch (l) {
      if (l !== ft) throw l;
      o = !0;
    } finally {
      N.c = null;
    }
    return r;
  }, dispatch: (i, r) => {
    const l = n[i];
    for (const d in l) l[d](r);
  }, isSuspense: () => o };
}, q = "effect", Z = "layoutEffect", H = "insertionEffect", j = (s) => (t, e) => {
  const n = lt({});
  L(s, () => {
    var c;
    const { current: o } = n;
    if (!o.args || !at(o.args, e)) {
      o.args = e, (c = o.clean) == null || c.call(o);
      const a = t();
      a && (o.clean = a);
    }
  }), L(W, () => {
    n.current.clean && (n.current.clean(), n.current = {});
  });
}, v = j(H), Wt = j(Z), zt = j(q), ht = "formAssociated", x = "formDisabled", Q = "formReset", V = (s) => (t) => L(s, (e) => t(e)), Kt = V(x), qt = V(Q), dt = {
  checked: 1,
  value: 1,
  selected: 1
}, mt = {
  list: 1,
  type: 1,
  size: 1,
  form: 1,
  width: 1,
  height: 1,
  src: 1,
  href: 1,
  slot: 1
}, pt = {
  shadowDom: 1,
  staticNode: 1,
  cloneNode: 1,
  children: 1,
  key: 1
}, _ = {}, D = [], Et = 0, P = 1, A = 2;
class M extends Text {
}
const Nt = y("id"), w = y("ref"), bt = () => {
}, tt = (s, t, ...e) => {
  const n = t || _;
  let { children: o } = n;
  return o = o ?? (e.length ? e : D), s === bt ? o : !s.prototype && s instanceof Function ? s(
    o != D ? { children: o, ...n } : n
  ) : {
    type: s,
    props: n,
    key: n.key
  };
};
function st(s, t, e = Nt, n, o) {
  let c;
  const a = !o;
  o = a ? [] : o;
  const h = t && t[e];
  if (h && h.vnode == s) return t;
  const { type: i, props: r = _ } = s;
  n = n || s.type == "svg";
  const l = i instanceof Node ? P : i.prototype instanceof HTMLElement ? A : Et;
  c = i != "host" && (l == P ? (t && r.cloneNode ? t[w] : t) != i : l == A ? !(t instanceof i) : t ? t[w] || t.localName != i : !t), c && (l == P && r.cloneNode ? (t = i.cloneNode(!0), t[w] = i) : t = l == P ? i : l == A ? new i() : n ? document.createElementNS(
    "http://www.w3.org/2000/svg",
    i
  ) : document.createElement(
    i,
    r.is ? { is: r.is } : void 0
  ));
  const d = h || _, { vnode: m = _, cycle: f = 0 } = d;
  let { fragment: u, handlers: T = {} } = c ? {} : d;
  const { props: b = _ } = c ? _ : m, { children: k = D } = b;
  if (r.staticNode && !c) return t;
  if (r.shadowDom && !t.shadowRoot && t.attachShadow({ mode: "open", ...r.shadowDom }), r != b && _t(t, b, r, T, n, o), r.children !== k) {
    const E = r.shadowDom ? t.shadowRoot : t;
    u = St(
      r.children,
      u,
      E,
      e,
      // add support to foreignObject, children will escape from svg
      n && s.type == "foreignObject" ? !1 : n,
      o
    );
  }
  if (t[e] = { vnode: s, handlers: T, fragment: u, cycle: f + 1 }, a)
    for (let E = 0; E < o.length; E++) o[E]();
  return t;
}
function gt(s) {
  const t = new M(""), e = new M("");
  return s.append(t, e), {
    markStart: t,
    markEnd: e
  };
}
function St(s, t, e, n, o, c) {
  s = s == null ? null : Y(s) ? s : [s];
  const a = t || gt(e), { markStart: h, markEnd: i, keyes: r } = a;
  let l;
  const d = r && /* @__PURE__ */ new Set(), m = r && "moveBefore" in e;
  let f = h;
  if (s && X(
    s,
    (u) => {
      const T = typeof u, b = T === "string";
      if (!(T == "object" && "type" in u && "props" in u) && !b)
        return;
      const E = u.key, B = r && E != null && r.get(E);
      f != i && f === B ? d.delete(f) : f = f == i ? i : f.nextSibling;
      const g = r ? B : f;
      let p = g;
      if (b) {
        const S = u + "";
        !(p instanceof Text) || p instanceof M ? p = new Text(S) : p.data != S && (p.data = S);
      } else
        p = st(
          u,
          // @ts-ignore
          g,
          n,
          o,
          c
        );
      if (p != f) {
        r && d.delete(p);
        const S = m && (p || g).isConnected ? "moveBefore" : "insertBefore";
        !g || r ? (e[S](p, f), r && f != i && d.add(f)) : g == i ? e[S](p, i) : (e.replaceChild(p, g), f = p);
      }
      E != null && (l = l || /* @__PURE__ */ new Map(), l.set(E, p));
    },
    !r
  ), f = f == i ? i : f.nextSibling, t && f != i)
    for (; f != i; ) {
      const u = f;
      f = f.nextSibling, u.remove();
    }
  return d && d.forEach((u) => u.remove()), a.keyes = l, a;
}
function _t(s, t, e, n, o, c) {
  for (const a in t)
    a in e || U(
      s,
      a,
      t[a],
      null,
      n,
      o,
      c
    );
  for (const a in e)
    U(
      s,
      a,
      t[a],
      e[a],
      n,
      o,
      c
    );
}
function U(s, t, e, n, o, c, a) {
  if (t = t == "class" && !c ? "className" : t, e = e ?? null, n = n ?? null, t in s && dt[t] && (e = s[t]), n === e || pt[t] || t[0] == "_") return;
  if (s.localName === "slot" && t === "assignNode" && "assign" in s) {
    a.push(() => s.assign(n));
    return;
  }
  const h = C(e), i = C(n);
  if (t.startsWith("on") && (i || h)) {
    Tt(s, t.slice(2), n, o);
    return;
  }
  if (t === "ref") {
    n && (i ? a.push(() => n(s)) : n.current = s);
    return;
  }
  if (t === "style" && "style" in s) {
    const { style: d } = s, m = e && O(e), f = n && O(n);
    if (m && f) {
      for (const u in e)
        u in n || R(d, u, null);
      for (const u in n)
        e[u] !== n[u] && R(d, u, n[u]);
    } else if (f)
      for (const u in n) R(d, u, n[u]);
    else
      d.cssText = n || "";
    return;
  }
  const r = t.startsWith("$") ? t.slice(1) : t;
  r === t && (!c && !mt[t] && t in s || i || h) ? s[t] = n ?? "" : n == null ? s.removeAttribute(r) : s.setAttribute(
    r,
    O(n) ? JSON.stringify(n) : n
  );
}
function Tt(s, t, e, n) {
  if (!n) return;
  n.handleEvent || (n.handleEvent = function(c) {
    const a = n[c.type];
    if (C(a)) return a.call(s, c);
  });
  const o = !!n[t];
  if (e) {
    const a = e.capture || e.once || e.passive ? {
      capture: !!e.capture,
      once: !!e.once,
      passive: !!e.passive
    } : void 0;
    o || s.addEventListener(t, n.handleEvent, a), n[t] = e;
  } else o && (s.removeEventListener(t, n.handleEvent), delete n[t]);
}
function R(s, t, e) {
  if (t[0] === "-") {
    e == null ? s.removeProperty(t) : s.setProperty(t, e);
    return;
  }
  s[t] = e;
}
class et {
  /**
   *
   * @param {HTMLElement} target
   * @param {string} message
   * @param {string} value
   */
  constructor(t, e, n) {
    this.message = e, this.target = t, this.value = n;
  }
}
class Ot extends et {
}
class yt extends et {
}
const nt = y("event"), Pt = null, Ct = { true: 1, "": 1, 1: 1 };
function At(s, t, e, n, o) {
  const {
    type: c,
    reflect: a,
    value: h,
    attr: i = wt(t)
  } = O(e) && e != Pt ? e : { type: e };
  Object.defineProperty(s, t, {
    configurable: !0,
    
    set(r) {
      const l = this[t];
      h && r == null && (r = h.call({ self: this, prop: t }));
      const { error: d, value: m } = It(c, r);
      if (d && m != null)
        throw new Ot(
          this,
          `The value defined for prop '${t}' must be of type '${c.name}'`,
          m
        );
      l != m && (this._props[t] = m ?? void 0, this.update(), this.updated.then(() => {
        a && (this._ignoreAttr = i, Rt(this, c, i, this[t]), this._ignoreAttr = null);
      }));
    },
    
    get() {
      return this._props[t];
    }
  }), h && (o[t] = null), n[i] = { prop: t, type: c };
}
const ot = (s, { type: t, base: e = CustomEvent, ...n }) => s.dispatchEvent(new e(t, n)), wt = (s) => s.replace(/([A-Z])/g, "-$1").toLowerCase(), Rt = (s, t, e, n) => n == null || t == Boolean && !n ? s.removeAttribute(e) : s.setAttribute(
  e,
  O(n) ? JSON.stringify(n) : t == Boolean ? "" : n.toString()
), Ft = (s, t) => s == Boolean ? !!Ct[t] : s == Number ? Number(t) : s == String ? t : s == Array || s == Object ? JSON.parse(t) : (
  // TODO: If when defining reflect the prop can also be of type string?
  new s(t)
), It = (s, t) => s == null || t == null ? { value: t, error: !1 } : s != String && t === "" ? { value: void 0, error: !1 } : s == Object || s == Array || s == Symbol ? {
  value: t,
  error: {}.toString.call(t) !== `[object ${s.name}]`
} : t instanceof s ? {
  value: t,
  error: s == Number && Number.isNaN(t.valueOf())
} : s == String || s == Number || s == Boolean ? {
  value: t,
  error: s == Number ? typeof t != "number" || Number.isNaN(t) : s == String ? typeof t != "string" : typeof t != "boolean"
} : { value: t, error: !0 }, Zt = (s) => ({
  type: Function,
  value() {
    const t = (e) => ot(this.self, {
      ...s,
      type: this.prop,
      detail: e || (s == null ? void 0 : s.detail)
    });
    return t[nt] = !0, t;
  }
}), Ht = (s) => s;
let Lt = 0;
const Dt = (s, t) => {
  const e = {}, n = {}, { props: o, styles: c, form: a } = {
    props: {},
    ...t
  };
  class h extends HTMLElement {
    constructor() {
      super(), this._setup(), this._render = () => s(
        //@ts-ignore
        { ...this._props }
      );
      for (const r in n) this[r] = n[r];
    }
    async _setup() {
      this._props = this._props || {}, this.symbolId = this.symbolId || Symbol(), this._hooks = this._hooks || ut(() => this.update(), this, "c" + Lt++);
      let r = new Promise((m) => this._mount = m), l, d = !0;
      this.update = () => {
        if (l) return;
        l = !0;
        const m = this._hooks;
        this.updated = r.then(() => {
          try {
            const f = m.render(this._render);
            m.dispatch(H), f && st(f, this, this.symbolId), l = !1, d && !m.isSuspense() && (d = !1, Mt(this)), m.dispatch(Z);
          } finally {
            l = !1;
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
    
    attributeChangedCallback(r, l, d) {
      if (e[r]) {
        if (r === this._ignoreAttr || l === d) return;
        const { prop: m, type: f } = e[r];
        try {
          this[m] = Ft(f, d);
        } catch {
          throw new yt(
            this,
            `The value defined as attr '${r}' cannot be parsed by type '${f.name}'`,
            d
          );
        }
      }
    }
    static get observedAttributes() {
      for (const r in o)
        At(this.prototype, r, o[r], e, n);
      return Object.keys(e);
    }
    static get styles() {
      return [c];
    }
    static get props() {
      return o;
    }
    async formResetCallback() {
      await this.updated, this._hooks.dispatch(Q);
    }
    async formAssociatedCallback(r) {
      await this.updated, this._hooks.dispatch(ht, r);
    }
    async formDisabledCallback(r) {
      await this.updated, this._hooks.dispatch(x, r);
    }
  }
  return $(h, "formAssociated", a), h;
};
function Mt(s) {
  const { styles: t } = s.constructor, { shadowRoot: e } = s;
  if (e && t.length) {
    const n = [];
    X(t, (o) => n.push(o)), n.length && (e.adoptedStyleSheets = n);
  }
}
const jt = (s, t = {}) => {
  const e = K();
  return e[s] || (e[s] = (n = t.detail) => {
    const o = e.current[s];
    C(o) && o[nt] ? o(n) : ot(e.current, {
      type: s,
      ...t,
      detail: n
    });
  }), e[s];
};
new Promise((s) => {
  document.readyState === "loading" ? J(document, "DOMContentLoaded", s) : s();
});
const kt = tt("host", { style: "display: contents" }), rt = "value", Bt = "ChangedValue", $t = "ConnectContext", vt = (s, t) => {
  const e = K(), n = jt(Bt);
  v(() => {
    n();
  }, [t]), v(
    () => J(
      e.current,
      $t,
      
      (o) => {
        o.composedPath().at(0) !== o.currentTarget && s === o.detail.id && (o.stopPropagation(), o.detail.connect(e.current));
      }
    ),
    [s]
  ), e.current[rt] = t;
}, Ut = (s) => {
  const t = Dt(
    ({ value: e }) => (vt(t, e), kt),
    {
      props: {
        value: {
          type: Object,
          value: () => s
        }
      }
    }
  );
  return t[rt] = s, t;
}, F = {};
function xt(s, ...t) {
  const e = (s.raw || s).reduce(
    (n, o, c) => n + o + (t[c] || ""),
    ""
  );
  return F[e] || (F[e] = Gt(e));
}
function Gt(s) {
  const t = new CSSStyleSheet();
  return t.replaceSync(s), t;
}
Ut({
  /**
   *
   * @param {string} type
   * @param {string} id
   */
  dispatch(s, t) {
  }
});
const Yt = (s, t, e) => (t == null ? t = { key: e } : t.key = e, tt(s, t)), Qt = Yt, Vt = (s, t) => {
  typeof customElements > "u" || customElements.get(s) || customElements.define(s, t);
};
export {
  bt as F,
  Ot as P,
  Dt as a,
  zt as b,
  xt as c,
  Vt as d,
  Zt as e,
  lt as f,
  Qt as g,
  z as h,
  C as i,
  Yt as j,
  Jt as k,
  at as l,
  Kt as m,
  qt as n,
  Wt as o,
  J as p,
  Ht as t,
  K as u
};
