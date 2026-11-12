import { u as O, m as R, n as I, b as p, d as M } from "./define-element-BZUk-KLk.js";
import { u as w } from "./hooks-DEFT8qqt.js";
import { u as k } from "./locale-Bb4aqXuR.js";
const m = Symbol.for("zest/form-control/internals"), g = Symbol.for("zest/form-control/custom-message"), V = Symbol.for("zest/form-control/restore"), E = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "tooLong",
  "tooShort",
  "rangeUnderflow",
  "rangeOverflow",
  "stepMismatch",
  "badInput"
], S = (e) => {
  if (e[m] !== void 0) return e[m];
  const r = typeof e.attachInternals == "function";
  return e[m] = r ? e.attachInternals() : null, e[m];
}, L = (e) => {
  const r = {}, s = e;
  if (!(s != null && s.validity)) return { flags: r, message: "" };
  for (const a of E) s.validity[a] && (r[a] = !0);
  return { flags: r, message: s.validationMessage ?? "" };
}, h = (e) => Object.values(e).some(Boolean), z = (e) => {
  var u;
  const r = O(), [s, a] = w(!1), o = S(r.current), t = k();
  R((n) => a(n)), I(() => e.onReset()), r.current[V] = e.onRestore, p(() => {
    var f, y, b, v;
    if (!o) return;
    const n = e.isDisabled || s || e.isReadonly;
    if (e.isDisabled || s ? o.setFormValue(null) : o.setFormValue(e.value, e.value), n) {
      o.setValidity({});
      return;
    }
    const c = L((f = e.control) == null ? void 0 : f.current), d = r.current[g], l = { ...c.flags, ...(y = e.validity) == null ? void 0 : y.flags };
    d && (l.customError = !0);
    const D = d || ((b = e.validity) == null ? void 0 : b.message) || c.message || (h(l) ? t("invalidValue") : ""), F = (v = e.control) == null ? void 0 : v.current;
    h(l) ? o.setValidity(l, D, F) : o.setValidity({});
  });
  const i = () => {
    const n = o == null ? void 0 : o.form;
    n && n.requestSubmit();
  };
  return p(() => {
    var d;
    if (!e.submitsOnEnter) return;
    const n = (d = e.control) == null ? void 0 : d.current;
    if (!n) return;
    const c = (l) => {
      l.key !== "Enter" || l.isComposing || l.defaultPrevented || e.isDisabled || s || e.isReadonly || (l.preventDefault(), i());
    };
    return n.addEventListener("keydown", c), () => n.removeEventListener("keydown", c);
  }, [(u = e.control) == null ? void 0 : u.current, e.submitsOnEnter, e.isDisabled, s, e.isReadonly]), { internals: o, isFormDisabled: s, requestSubmit: i };
}, A = () => {
  const e = { valid: !0 };
  for (const r of E) e[r] = !1;
  return e.customError = !1, e;
}, C = () => document.createDocumentFragment().childNodes, P = (e, r) => {
  const s = r.prototype, a = (t) => S(t);
  Object.getOwnPropertyDescriptor(s, "checkValidity") || Object.defineProperties(s, {
    form: { get() {
      var t;
      return ((t = a(this)) == null ? void 0 : t.form) ?? null;
    }, configurable: !0 },
    validity: { get() {
      var t;
      return ((t = a(this)) == null ? void 0 : t.validity) ?? A();
    }, configurable: !0 },
    validationMessage: { get() {
      var t;
      return ((t = a(this)) == null ? void 0 : t.validationMessage) ?? "";
    }, configurable: !0 },
    willValidate: { get() {
      var t;
      return ((t = a(this)) == null ? void 0 : t.willValidate) ?? !1;
    }, configurable: !0 },
    labels: { get() {
      var t;
      return ((t = a(this)) == null ? void 0 : t.labels) ?? C();
    }, configurable: !0 },
    checkValidity: { value() {
      var t;
      return ((t = a(this)) == null ? void 0 : t.checkValidity()) ?? !0;
    }, configurable: !0 },
    reportValidity: { value() {
      var t;
      return ((t = a(this)) == null ? void 0 : t.reportValidity()) ?? !0;
    }, configurable: !0 },
    setCustomValidity: {
      value(t) {
        var i;
        this[g] = t ? String(t) : "", (i = this.update) == null || i.call(this);
      },
      configurable: !0
    },
    formStateRestoreCallback: {
      value(t, i) {
        var u;
        (u = this[V]) == null || u.call(this, t, i);
      },
      configurable: !0
    }
  }), M(e, r);
};
export {
  P as d,
  z as u
};
