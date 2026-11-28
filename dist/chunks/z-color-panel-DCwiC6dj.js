import { c as Lo, a as Io, e as ht, u as Ro, f as H, b as pt, j as m, g as P } from "./define-element-BZUk-KLk.js";
import { u as le } from "./use-prop-C0_HeSQ9.js";
import { u as Ht } from "./hooks-DEFT8qqt.js";
import { u as To, d as Mo } from "./form-control-B69z9f8A.js";
import { i as Po } from "./interaction-styles-C6mMacCu.js";
import { u as Oo } from "./locale-BNhgEFKA.js";
import { o as ue } from "./prop-types-CSJu2W-0.js";
import { c as Ho, C as Fo } from "./clipboard-x9gcxjll.js";
import { h as de, s as _o, a as Do, c as Bo, b as Eo } from "./overlay-DCHYaOiA.js";
const ft = ["hex", "rgb", "hsl", "hsb", "hwb", "oklch", "oklab", "lch", "lab", "p3"], No = ["standard", "perceptual", "wideGamut"], Ut = 1e-6, V = 1e-4, $t = 360, g = (t, e, o) => Math.min(o, Math.max(e, t)), B = (t) => {
  const e = t % $t;
  return e < 0 ? e + $t : e;
}, R = (t, e) => {
  const o = t[0][0] * e[0] + t[0][1] * e[1] + t[0][2] * e[2], r = t[1][0] * e[0] + t[1][1] * e[1] + t[1][2] * e[2], s = t[2][0] * e[0] + t[2][1] * e[1] + t[2][2] * e[2];
  return [o, r, s];
}, w = (t, e) => {
  const o = 10 ** e, r = Math.round(t * o) / o;
  return Object.is(r, -0) ? 0 : r;
}, Ft = (t) => {
  const e = Math.abs(t);
  return e <= 0.04045 ? t / 12.92 : Math.sign(t) * ((e + 0.055) / 1.055) ** 2.4;
}, _t = (t) => {
  const e = Math.abs(t);
  return e <= 31308e-7 ? t * 12.92 : Math.sign(t) * (1.055 * e ** (1 / 2.4) - 0.055);
}, Ce = [
  [0.41239079926595934, 0.357584339383878, 0.1804807884018343],
  [0.21263900587151027, 0.715168678767756, 0.07219231536073371],
  [0.01933081871559182, 0.11919477979462598, 0.9505321522496607]
], Le = [
  [3.2409699419045226, -1.537383177570094, -0.4986107602930034],
  [-0.9692436362808796, 1.8759675015077202, 0.04155505740717559],
  [0.05563007969699366, -0.20397695888897652, 1.0569715142428786]
], zo = [
  [0.4865709486482162, 0.26566769316909306, 0.1982172852343625],
  [0.2289745640697488, 0.6917385218365064, 0.079286914093745],
  [0, 0.04511338185890264, 1.043944368900976]
], $o = [
  [2.493496911941425, -0.9313836179191239, -0.40271078445071684],
  [-0.8294889695615747, 1.7626640603183463, 0.023624685841943577],
  [0.03584583024378447, -0.07617238926804182, 0.9568845240076872]
], Ko = [
  [1.0479298208405488, 0.022946793341019088, -0.05019222954313557],
  [0.029627815688159344, 0.990434484573249, -0.01707382502938514],
  [-0.009243058152591178, 0.015055144896577895, 0.7518742899580008]
], Go = [
  [0.9554734527042182, -0.023098536874261423, 0.0632593086610217],
  [-0.028369706963208136, 1.0099954580058226, 0.021041398966943008],
  [0.012314001688319899, -0.020507696433477912, 1.3303659366080753]
], U = [0.3457 / 0.3585, 1, (1 - 0.3457 - 0.3585) / 0.3585], Xt = 216 / 24389, bt = 24389 / 27, Wo = [
  [0.4122214708, 0.5363325363, 0.0514459929],
  [0.2119034982, 0.6806995451, 0.1073969566],
  [0.0883024619, 0.2817188376, 0.6299787005]
], Vo = [
  [0.2104542553, 0.793617785, -0.0040720468],
  [1.9779984951, -2.428592205, 0.4505937099],
  [0.0259040371, 0.7827717662, -0.808675766]
], Yo = [
  [1, 0.3963377774, 0.2158037573],
  [1, -0.1055613458, -0.0638541728],
  [1, -0.0894841775, -1.291485548]
], Uo = [
  [4.0767416621, -3.3077115913, 0.2309699292],
  [-1.2684380046, 2.6097574011, -0.3413193965],
  [-0.0041960863, -0.7034186147, 1.707614701]
], gt = (t) => [Ft(t[0]), Ft(t[1]), Ft(t[2])], vt = (t) => [_t(t[0]), _t(t[1]), _t(t[2])], Xo = (t) => {
  const e = R(Ce, gt(t));
  return vt(R($o, e));
}, jo = (t) => {
  const e = R(zo, gt(t));
  return vt(R(Le, e));
}, Ie = (t, e, o) => o < Ut ? 0 : e === t[0] ? B((t[1] - t[2]) / o * 60) : e === t[1] ? B(((t[2] - t[0]) / o + 2) * 60) : B(((t[0] - t[1]) / o + 4) * 60), qo = (t) => {
  const e = Math.max(t[0], t[1], t[2]), o = Math.min(t[0], t[1], t[2]), r = e - o, s = Ie(t, e, r), u = e < Ut ? 0 : r / e;
  return [s, u, e];
}, Zo = (t) => {
  const e = (o) => {
    const r = (o + t[0] / 60) % 6, s = Math.max(0, Math.min(r, 4 - r, 1));
    return t[2] - t[2] * t[1] * s;
  };
  return [e(5), e(3), e(1)];
}, Jo = (t) => {
  const e = Math.max(t[0], t[1], t[2]), o = Math.min(t[0], t[1], t[2]), r = e - o, s = Ie(t, e, r), i = (e + o) / 2;
  if (r < Ut) return [s, 0, i];
  const d = r / (1 - Math.abs(2 * i - 1));
  return [s, d, i];
}, Qo = (t) => {
  const e = t[1] * Math.min(t[2], 1 - t[2]), o = (r) => {
    const s = (r + t[0] / 30) % 12, i = Math.max(-1, Math.min(s - 3, 9 - s, 1));
    return t[2] - e * i;
  };
  return [o(0), o(8), o(4)];
}, tn = (t) => {
  const e = (1 - t[1]) * t[2], o = 1 - t[2];
  return [t[0], e, o];
}, en = (t) => {
  const e = t[1] + t[2];
  if (e >= 1) return [t[0], 0, t[1] / e];
  const r = 1 - t[2], s = 1 - t[1] / r;
  return [t[0], s, r];
}, Dt = (t) => t > Xt ? Math.cbrt(t) : (bt * t + 16) / 116, he = (t) => {
  const e = t ** 3;
  return e > Xt ? e : (116 * t - 16) / bt;
}, pe = (t) => {
  const e = R(Ce, gt(t)), o = R(Ko, e), r = Dt(o[0] / U[0]), s = Dt(o[1] / U[1]), i = Dt(o[2] / U[2]);
  return [116 * s - 16, 500 * (r - s), 200 * (s - i)];
}, me = (t) => {
  const e = (t[0] + 16) / 116, o = t[1] / 500 + e, r = e - t[2] / 200, i = t[0] > bt * Xt ? e ** 3 : t[0] / bt, u = [he(o) * U[0], i * U[1], he(r) * U[2]], d = R(Go, u);
  return vt(R(Le, d));
}, fe = (t) => {
  const e = R(Wo, gt(t)), o = [Math.cbrt(e[0]), Math.cbrt(e[1]), Math.cbrt(e[2])];
  return R(Vo, o);
}, be = (t) => {
  const e = R(Yo, t), o = [e[0] ** 3, e[1] ** 3, e[2] ** 3];
  return vt(R(Uo, o));
}, Kt = (t) => {
  const e = Math.hypot(t[1], t[2]), o = B(Math.atan2(t[2], t[1]) * 180 / Math.PI);
  return [t[0], e, o];
}, Gt = (t) => {
  const e = t[2] * Math.PI / 180;
  return [t[0], t[1] * Math.cos(e), t[1] * Math.sin(e)];
}, xt = (t, e) => t === "hsv" ? Zo(e) : t === "hsl" ? Qo(e) : t === "lab" ? me(e) : t === "lch" ? me(Gt(e)) : be(t === "oklab" ? e : Gt(e)), on = (t, e) => t === "hsv" ? qo(e) : t === "hsl" ? Jo(e) : t === "lab" ? pe(e) : t === "lch" ? Kt(pe(e)) : t === "oklab" ? fe(e) : Kt(fe(e)), nn = {
  hsv: { hueIndex: 0, strengthIndex: 1, threshold: 1e-4 },
  hsl: { hueIndex: 0, strengthIndex: 1, threshold: 1e-4 },
  lch: { hueIndex: 2, strengthIndex: 1, threshold: 0.02 },
  oklch: { hueIndex: 2, strengthIndex: 1, threshold: 2e-4 },
  lab: null,
  oklab: null
}, rn = (t, e, o) => {
  if (!(o !== null && o.space === t)) return e;
  const s = nn[t];
  if (!s) return e;
  const i = [e[0], e[1], e[2]];
  return e[s.strengthIndex] < s.threshold && (i[s.hueIndex] = o.coords[s.hueIndex]), t === "hsv" && e[2] < 1e-4 && (i[1] = o.coords[1]), t === "hsl" && (e[2] < 1e-4 || e[2] > 1 - 1e-4) && (i[1] = o.coords[1]), i;
}, jt = (t) => {
  const e = t[0] >= -V && t[0] <= 1 + V, o = t[1] >= -V && t[1] <= 1 + V, r = t[2] >= -V && t[2] <= 1 + V;
  return e && o && r;
}, qt = (t) => [g(t[0], 0, 1), g(t[1], 0, 1), g(t[2], 0, 1)], ge = (t, e) => {
  const o = Array.from({ length: 18 }, (i, u) => u);
  let r = 0, s = e[1];
  for (const i of o) {
    const u = (r + s) / 2, d = [e[0], u, e[2]], f = jt(xt(t, d));
    f && (r = u), f || (s = u);
  }
  return r;
}, Y = (t) => {
  const e = xt(t.space, t.coords);
  if (jt(e)) return t;
  if (t.space === "lch" || t.space === "oklch") {
    const i = t.space, u = ge(i, t.coords);
    return { ...t, coords: [t.coords[0], u, t.coords[2]] };
  }
  if (t.space === "lab" || t.space === "oklab") {
    const i = t.space === "lab" ? "lch" : "oklch", u = Kt(t.coords), d = ge(i, u), f = Gt([u[0], d, u[2]]);
    return { ...t, coords: f };
  }
  return t;
}, K = (t) => {
  const e = qt(xt(t.space, t.coords));
  return { red: e[0], green: e[1], blue: e[2], alpha: t.alpha };
}, yt = (t, e, o = null) => {
  const r = [t.red, t.green, t.blue], s = rn(e, on(e, r), o);
  return { space: e, coords: s, alpha: t.alpha };
}, F = (t, e, o = null) => t.space === e ? t : yt(K(t), e, o), et = { key: "hue", symbol: "H", min: 0, max: 360, step: 1, precision: 1 }, D = (t, e) => ({ key: t, symbol: e, min: 0, max: 100, step: 1, precision: 1 }), Bt = (t, e) => ({ key: t, symbol: e, min: 0, max: 255, step: 1, precision: 0 }), Et = (t, e) => ({ key: t, symbol: e, min: 0, max: 1, step: 0.01, precision: 4 }), ot = {
  hex: { format: "hex", label: "HEX", group: "standard", space: "hsv", channels: [] },
  rgb: {
    format: "rgb",
    label: "RGB",
    group: "standard",
    space: "hsv",
    channels: [Bt("red", "R"), Bt("green", "G"), Bt("blue", "B")]
  },
  hsl: {
    format: "hsl",
    label: "HSL",
    group: "standard",
    space: "hsl",
    channels: [et, D("saturation", "S"), D("lightness", "L")]
  },
  hsb: {
    format: "hsb",
    label: "HSB",
    group: "standard",
    space: "hsv",
    channels: [et, D("saturation", "S"), D("brightness", "B")]
  },
  hwb: {
    format: "hwb",
    label: "HWB",
    group: "standard",
    space: "hsv",
    channels: [et, D("whiteness", "W"), D("blackness", "B")]
  },
  oklch: {
    format: "oklch",
    label: "OKLCH",
    group: "perceptual",
    space: "oklch",
    channels: [
      D("lightness", "L"),
      { key: "chroma", symbol: "C", min: 0, max: 0.4, step: 5e-3, precision: 3 },
      et
    ]
  },
  oklab: {
    format: "oklab",
    label: "OKLAB",
    group: "perceptual",
    space: "oklab",
    channels: [
      D("lightness", "L"),
      { key: "greenRed", symbol: "a", min: -0.4, max: 0.4, step: 5e-3, precision: 3 },
      { key: "blueYellow", symbol: "b", min: -0.4, max: 0.4, step: 5e-3, precision: 3 }
    ]
  },
  lch: {
    format: "lch",
    label: "LCH",
    group: "perceptual",
    space: "lch",
    channels: [
      { key: "lightness", symbol: "L", min: 0, max: 100, step: 1, precision: 2 },
      { key: "chroma", symbol: "C", min: 0, max: 150, step: 1, precision: 2 },
      et
    ]
  },
  lab: {
    format: "lab",
    label: "LAB",
    group: "perceptual",
    space: "lab",
    channels: [
      { key: "lightness", symbol: "L", min: 0, max: 100, step: 1, precision: 2 },
      { key: "greenRed", symbol: "a", min: -125, max: 125, step: 1, precision: 2 },
      { key: "blueYellow", symbol: "b", min: -125, max: 125, step: 1, precision: 2 }
    ]
  },
  p3: {
    format: "p3",
    label: "P3",
    group: "wideGamut",
    space: "hsv",
    channels: [Et("red", "R"), Et("green", "G"), Et("blue", "B")]
  }
}, sn = { key: "alpha", symbol: "A", min: 0, max: 100, step: 1, precision: 0 }, an = (t) => ft.includes(t), $ = (t) => ot[t].space, cn = (t) => [t.red, t.green, t.blue], Re = (t, e) => {
  const o = $(e), r = F(t, o), s = cn(K(r)), i = r.coords;
  if (e === "rgb" || e === "hex") return [s[0] * 255, s[1] * 255, s[2] * 255];
  if (e === "p3") return Xo(s);
  if (e === "hwb") {
    const h = tn(i);
    return [h[0], h[1] * 100, h[2] * 100];
  }
  return e === "hsl" || e === "hsb" ? [i[0], i[1] * 100, i[2] * 100] : e === "oklch" ? [i[0] * 100, i[1], i[2]] : e === "oklab" ? [i[0] * 100, i[1], i[2]] : [i[0], i[1], i[2]];
}, ve = (t, e, o) => {
  const r = qt(t), s = { red: r[0], green: r[1], blue: r[2], alpha: e };
  return yt(s, "hsv", o);
}, st = (t, e, o, r = null) => {
  if (t === "rgb" || t === "hex") return ve([e[0] / 255, e[1] / 255, e[2] / 255], o, r);
  if (t === "p3") return ve(jo([e[0], e[1], e[2]]), o, r);
  if (t === "hwb") {
    const h = [B(e[0]), g(e[1] / 100, 0, 1), g(e[2] / 100, 0, 1)];
    return { space: "hsv", coords: en(h), alpha: o };
  }
  if (t === "hsl" || t === "hsb") {
    const h = $(t), S = [B(e[0]), g(e[1] / 100, 0, 1), g(e[2] / 100, 0, 1)];
    return { space: h, coords: S, alpha: o };
  }
  if (t === "oklch") {
    const h = [g(e[0] / 100, 0, 1), Math.max(0, e[1]), B(e[2])];
    return Y({ space: "oklch", coords: h, alpha: o });
  }
  if (t === "oklab") {
    const h = [g(e[0] / 100, 0, 1), e[1], e[2]];
    return Y({ space: "oklab", coords: h, alpha: o });
  }
  if (t === "lch") {
    const h = [g(e[0], 0, 100), Math.max(0, e[1]), B(e[2])];
    return Y({ space: "lch", coords: h, alpha: o });
  }
  const y = [g(e[0], 0, 100), e[1], e[2]];
  return Y({ space: "lab", coords: y, alpha: o });
}, mt = (t) => Math.round(g(t, 0, 1) * 255).toString(16).padStart(2, "0").toUpperCase(), ln = (t) => t >= 1 ? "" : ` / ${w(t * 100, 1)}%`, X = (t) => {
  const e = `#${mt(t.red)}${mt(t.green)}${mt(t.blue)}`;
  return t.alpha >= 1 ? e : `${e}${mt(t.alpha)}`;
}, nt = (t, e) => {
  const o = K(t);
  if (e === "hex") return X(o);
  const s = Re(t, e), i = ln(t.alpha);
  if (e === "rgb") {
    const h = s.map((S) => Math.round(S));
    return `rgb(${h[0]} ${h[1]} ${h[2]}${i})`;
  }
  if (e === "p3") {
    const h = s.map((S) => w(g(S, 0, 1), 4));
    return `color(display-p3 ${h[0]} ${h[1]} ${h[2]}${i})`;
  }
  if (e === "hsl" || e === "hsb" || e === "hwb") {
    const h = w(s[0], 1), S = w(s[1], 1), O = w(s[2], 1);
    return `${e}(${h} ${S}% ${O}%${i})`;
  }
  if (e === "oklch") {
    const h = w(s[0], 2), S = w(s[1], 4), O = w(s[2], 2);
    return `oklch(${h}% ${S} ${O}${i})`;
  }
  if (e === "oklab") {
    const h = w(s[0], 2), S = w(s[1], 4), O = w(s[2], 4);
    return `oklab(${h}% ${S} ${O}${i})`;
  }
  const y = s.map((h) => w(h, 2));
  return `${e}(${y[0]} ${y[1]} ${y[2]}${i})`;
}, un = /^#?([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, dn = /^([a-z-]+)\(\s*(.*)\s*\)$/i, hn = (t) => t.length <= 4 ? t.split("").map((o) => `${o}${o}`).join("") : t, Te = (t) => {
  const e = t.match(un);
  if (!e) return null;
  const o = hn(e[1]), r = (u) => parseInt(o.slice(u, u + 2), 16) / 255, i = o.length === 8 ? r(6) : 1;
  return { red: r(0), green: r(2), blue: r(4), alpha: i };
}, Zt = (t, e) => {
  if (t === "none") return 0;
  const r = t.match(/^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)(%|deg|rad|grad|turn)?$/i);
  if (!r) return null;
  const s = parseFloat(r[1]), i = (r[2] || "").toLowerCase();
  return i === "%" ? s / 100 * e : i === "rad" ? s * 180 / Math.PI : i === "grad" ? s * 0.9 : i === "turn" ? s * $t : s;
}, pn = (t) => {
  var d;
  if (t.includes(",")) {
    const f = t.split(",").map((y) => y.trim());
    if (!(f.length === 3 || f.length === 4)) return null;
    const T = f[3] ?? null;
    return { channels: f.slice(0, 3), alpha: T };
  }
  const o = t.split("/");
  if (!(o.length <= 2)) return null;
  const s = o[0].trim().split(/\s+/), i = (d = o[1]) == null ? void 0 : d.trim();
  return { channels: s, alpha: i || null };
}, Me = (t) => {
  if (t === null) return 1;
  const o = Zt(t, 1);
  return o === null ? null : g(o, 0, 1);
}, mn = {
  rgb: { format: "rgb", scales: [255, 255, 255] },
  rgba: { format: "rgb", scales: [255, 255, 255] },
  hsl: { format: "hsl", scales: [1, 100, 100] },
  hsla: { format: "hsl", scales: [1, 100, 100] },
  hsb: { format: "hsb", scales: [1, 100, 100] },
  hsba: { format: "hsb", scales: [1, 100, 100] },
  hsv: { format: "hsb", scales: [1, 100, 100] },
  hsva: { format: "hsb", scales: [1, 100, 100] },
  hwb: { format: "hwb", scales: [1, 100, 100] },
  lab: { format: "lab", scales: [100, 125, 125] },
  lch: { format: "lch", scales: [100, 150, 1] },
  oklab: { format: "oklab", scales: [100, 0.4, 0.4] },
  oklch: { format: "oklch", scales: [100, 0.4, 1] }
}, fn = (t, e, o) => !(t === "oklab" || t === "oklch") || e.endsWith("%") ? o : o * 100, bn = (t, e) => {
  if (t === "color") return gn(e);
  const r = mn[t];
  if (!r || !(e.channels.length === 3)) return null;
  const i = e.channels.map((S, O) => Zt(S, r.scales[O]));
  if (i.some((S) => S === null)) return null;
  const d = Me(e.alpha);
  if (d === null) return null;
  const v = i, y = [fn(r.format, e.channels[0], v[0]), v[1], v[2]], h = st(r.format, y, d);
  return { format: r.format, state: h };
}, gn = (t) => {
  const e = t.channels[0];
  if (!(e === "display-p3" || e === "srgb")) return null;
  const r = t.channels.slice(1);
  if (!(r.length === 3)) return null;
  const i = r.map((h) => Zt(h, 1));
  if (i.some((h) => h === null)) return null;
  const d = Me(t.alpha);
  if (d === null) return null;
  const v = i;
  if (e === "display-p3") return { format: "p3", state: st("p3", v, d) };
  const y = v.map((h) => h * 255);
  return { format: "rgb", state: st("rgb", y, d) };
}, vn = (t) => {
  var d, f;
  if (!/^[a-z]+$/i.test(t) || !(typeof document < "u")) return null;
  const r = (f = (d = document.createElement("canvas")).getContext) == null ? void 0 : f.call(d, "2d");
  if (!r) return null;
  r.fillStyle = "#010203", r.fillStyle = t;
  const s = String(r.fillStyle);
  if (s === "#010203") return null;
  const u = Te(s);
  return u ? { format: "hex", state: yt(u, "hsv") } : null;
}, rt = (t) => {
  const e = String(t ?? "").trim().toLowerCase();
  if (e === "") return null;
  const r = Te(e);
  if (r) return { format: "hex", state: yt(r, "hsv") };
  const s = e.match(dn);
  if (!s) return vn(e);
  const i = pn(s[2]);
  return i ? bn(s[1], i) : null;
}, j = {
  hsv: {
    areaX: { coordIndex: 1, min: 0, max: 1, isWrapping: !1 },
    areaY: { coordIndex: 2, min: 0, max: 1, isWrapping: !1 },
    slider: { coordIndex: 0, min: 0, max: 360, isWrapping: !0 },
    areaLabelKey: "saturationAndBrightness",
    sliderLabelKey: "hue"
  },
  hsl: {
    areaX: { coordIndex: 1, min: 0, max: 1, isWrapping: !1 },
    areaY: { coordIndex: 2, min: 0, max: 1, isWrapping: !1 },
    slider: { coordIndex: 0, min: 0, max: 360, isWrapping: !0 },
    areaLabelKey: "saturationAndLightness",
    sliderLabelKey: "hue"
  },
  lch: {
    areaX: { coordIndex: 1, min: 0, max: 135, isWrapping: !1 },
    areaY: { coordIndex: 0, min: 0, max: 100, isWrapping: !1 },
    slider: { coordIndex: 2, min: 0, max: 360, isWrapping: !0 },
    areaLabelKey: "chromaAndLightness",
    sliderLabelKey: "hue"
  },
  oklch: {
    areaX: { coordIndex: 1, min: 0, max: 0.33, isWrapping: !1 },
    areaY: { coordIndex: 0, min: 0, max: 1, isWrapping: !1 },
    slider: { coordIndex: 2, min: 0, max: 360, isWrapping: !0 },
    areaLabelKey: "chromaAndLightness",
    sliderLabelKey: "hue"
  },
  lab: {
    areaX: { coordIndex: 1, min: -112, max: 112, isWrapping: !1 },
    areaY: { coordIndex: 2, min: -112, max: 112, isWrapping: !1 },
    slider: { coordIndex: 0, min: 0, max: 100, isWrapping: !1 },
    areaLabelKey: "colorAxes",
    sliderLabelKey: "lightness"
  },
  oklab: {
    areaX: { coordIndex: 1, min: -0.32, max: 0.32, isWrapping: !1 },
    areaY: { coordIndex: 2, min: -0.32, max: 0.32, isWrapping: !1 },
    slider: { coordIndex: 0, min: 0, max: 1, isWrapping: !1 },
    areaLabelKey: "colorAxes",
    sliderLabelKey: "lightness"
  }
}, Wt = (t, e) => g((e - t.min) / (t.max - t.min), 0, 1), Vt = (t, e) => t.min + g(e, 0, 1) * (t.max - t.min), xe = (t) => {
  const e = j[t.space], o = Wt(e.areaX, t.coords[e.areaX.coordIndex]), r = 1 - Wt(e.areaY, t.coords[e.areaY.coordIndex]);
  return { x: o, y: r };
}, Pe = (t, e) => {
  const o = j[t.space], r = [t.coords[0], t.coords[1], t.coords[2]];
  return r[o.areaX.coordIndex] = Vt(o.areaX, e.x), r[o.areaY.coordIndex] = Vt(o.areaY, 1 - e.y), { ...t, coords: r };
}, ye = (t, e) => Y(Pe(t, e)), we = (t) => {
  const e = j[t.space];
  return Wt(e.slider, t.coords[e.slider.coordIndex]);
}, Yt = (t, e) => {
  const o = j[t.space], r = [t.coords[0], t.coords[1], t.coords[2]];
  return r[o.slider.coordIndex] = Vt(o.slider, e), Y({ ...t, coords: r });
}, xn = (t, e) => {
  const o = Pe(t, e), r = xt(o.space, o.coords);
  return jt(r) ? qt(r) : null;
}, yn = {
  hsv: [0, 1, 1],
  hsl: [0, 1, 0.5],
  lch: [70, 60, 0],
  oklch: [0.75, 0.15, 0],
  lab: [0, 0, 0],
  oklab: [0, 0, 0]
}, Se = 13, wn = (t) => {
  const r = j[t.space].sliderLabelKey === "hue" ? { space: t.space, coords: yn[t.space], alpha: 1 } : { ...t, alpha: 1 };
  return Array.from({ length: Se }, (i, u) => u).map((i) => {
    const u = i / (Se - 1), d = Yt(r, u);
    return X(K(d));
  });
}, Sn = "#BF40BF", kn = (t) => {
  if (!Array.isArray(t)) return ft;
  const o = ft.filter((s) => t.includes(s));
  return o.length > 0 ? o : ft;
}, An = (t, e, o) => an(t) && o.includes(t) ? t : e !== null && o.includes(e) ? e : o[0], Cn = (t, e, o) => {
  const s = rt(String(t ?? "")) ?? rt(Sn), i = An(e, s.format, o), u = F(s.state, $(i)), d = nt(u, i);
  return { format: i, state: u, text: d };
}, Nt = (t, e) => {
  const o = nt(t, e), r = X(K(t));
  return { value: o, format: e, hex: r, alpha: t.alpha };
}, Ln = Lo`
	:host {
		display: block;
		min-width: 14rem;
		--tone: var(--accent-primary);
	}

	:host([tone='secondary']) {
		--tone: var(--accent-secondary);
	}

	:host([tone='tertiary']) {
		--tone: var(--accent-tertiary);
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([is-disabled]) {
		opacity: var(--control-disabled-opacity);
		pointer-events: none;
	}

	.color-panel {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		color: var(--text-primary);
		font-family: var(--font-sans);
		font-size: var(--font-size-sm);
	}

	.color-area {
		position: relative;
		height: 9rem;
		border-radius: var(--radius-sm);
		background: var(--surface-subtle);
		cursor: crosshair;
		touch-action: none;
		outline: none;
	}

	.color-area-canvas {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: inherit;
	}

	.color-area::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		border: 1px solid color-mix(in oklch, var(--text-primary) 10%, transparent);
		pointer-events: none;
	}

	.color-area:focus-visible,
	.color-track:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 2px;
	}

	/* Thumbs sit on raw color, not on a themed surface, so their
	   ring is absolute white with a hairline of absolute black. */
	.color-thumb {
		position: absolute;
		width: 0.875rem;
		height: 0.875rem;
		border-radius: var(--radius-full);
		background: var(--thumb-color);
		border: 2px solid #fff;
		outline: 1px solid rgb(0 0 0 / 0.35);
		transform: translate(-50%, -50%);
		pointer-events: none;
		box-sizing: border-box;
	}

	.color-sliders-row {
		display: flex;
		align-items: center;
		gap: var(--space-2-5);
	}

	.color-sliders {
		display: flex;
		flex: 1;
		min-width: 0;
		flex-direction: column;
		gap: var(--space-2-5);
	}

	.color-track {
		position: relative;
		height: 0.75rem;
		border-radius: var(--radius-full);
		cursor: pointer;
		touch-action: none;
		outline: none;
		background: var(--track-fill);
	}

	.color-track.isAlpha {
		background:
			linear-gradient(to right, transparent, var(--track-color)),
			repeating-conic-gradient(var(--surface-strong) 0 25%, var(--surface-default) 0 50%) 0 0 / 0.5rem 0.5rem;
	}

	.color-track::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		border: 1px solid color-mix(in oklch, var(--text-primary) 10%, transparent);
		pointer-events: none;
	}

	/* Track thumbs travel inside the track, so 0% and 100%
	   sit flush with its ends instead of hanging past them. */
	.color-track {
		--thumb-size: 1rem;
	}

	.color-track .color-thumb {
		top: 50%;
		left: calc(var(--thumb-size) / 2 + var(--position) * (100% - var(--thumb-size)));
		width: var(--thumb-size);
		height: var(--thumb-size);
	}

	.color-icon-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 1.75rem;
		height: 1.75rem;
		padding: 0;
		border: 0;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--text-secondary);
		cursor: pointer;
		transition:
			color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}

	.color-icon-button:hover {
		color: var(--text-primary);
		background: var(--surface-subtle);
	}

	.color-icon-button:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: -2px;
	}

	.color-icon-button.isConfirmed {
		color: var(--tone);
	}

	.color-icon {
		width: 0.875rem;
		height: 0.875rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.75;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.color-value-row {
		display: flex;
		align-items: center;
		height: var(--control-height-sm);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-sm);
		transition: border-color var(--motion-fast) var(--ease-enter);
	}

	.color-value-row:focus-within {
		border-color: var(--tone);
	}

	.color-format-button {
		display: inline-flex;
		align-items: center;
		gap: var(--space-1);
		flex-shrink: 0;
		height: 100%;
		padding-inline: var(--space-2-5) var(--space-2);
		border: 0;
		border-inline-end: 1px solid var(--border-default);
		border-radius: var(--radius-sm) 0 0 var(--radius-sm);
		background: transparent;
		color: var(--text-secondary);
		font-family: var(--font-sans);
		font-size: var(--font-size-2xs);
		font-weight: var(--font-weight-semibold);
		letter-spacing: 0.06em;
		cursor: pointer;
		transition:
			color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}

	.color-format-button:hover,
	.color-format-button.isOpen {
		color: var(--text-primary);
		background: var(--surface-subtle);
	}

	.color-format-button:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: -2px;
	}

	.color-format-button.isStatic {
		cursor: default;
		background: transparent;
		color: var(--text-secondary);
	}

	.color-format-chevron {
		width: 0.625rem;
		height: 0.625rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		transition: rotate var(--motion-fast) var(--ease-enter);
	}

	.color-format-button.isOpen .color-format-chevron {
		rotate: 180deg;
	}

	.color-value-input {
		flex: 1;
		min-width: 0;
		height: 100%;
		padding-inline: var(--space-2-5);
		border: 0;
		background: transparent;
		color: var(--text-primary);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		outline: none;
		text-overflow: ellipsis;
	}

	.color-value-row .color-icon-button {
		width: var(--control-height-sm);
		height: 100%;
		border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
	}

	.color-format-menu {
		position: fixed;
		inset: auto;
		top: 0;
		left: 0;
		margin: 0;
		box-sizing: border-box;
		min-width: 13rem;
		padding: var(--space-1);
		background: var(--surface-overlay);
		color: var(--text-primary);
		border: 1px solid var(--border-strong);
		border-radius: var(--radius-md);
		opacity: 0;
		translate: 0 calc(var(--motion-distance-sm) * var(--motion-travel) * -0.5);
		transition:
			opacity var(--motion-exit-fast) var(--ease-exit),
			translate var(--motion-exit-fast) var(--ease-exit);
	}

	.color-format-menu[data-state='open'] {
		opacity: 1;
		translate: 0 0;
		transition:
			opacity var(--motion-fast) var(--ease-enter),
			translate var(--motion-fast) var(--ease-enter);
	}

	.color-format-group + .color-format-group {
		margin-top: var(--space-1);
		padding-top: var(--space-1);
		border-top: 1px solid var(--border-default);
	}

	.color-format-group-label {
		padding: var(--space-1-5) var(--space-2) var(--space-1);
		color: var(--text-tertiary);
		font-size: var(--font-size-2xs);
		font-weight: var(--font-weight-medium);
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.color-format-option {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		width: 100%;
		height: 1.75rem;
		padding-inline: var(--space-2);
		border: 0;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--text-primary);
		font-family: var(--font-sans);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		letter-spacing: 0.04em;
		text-align: start;
		cursor: pointer;
		outline: none;
	}

	.color-format-option:hover,
	.color-format-option:focus-visible {
		background: var(--surface-subtle);
	}

	.color-format-option.isSelected {
		color: var(--tone);
	}

	.color-format-option-preview {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		color: var(--text-tertiary);
		font-family: var(--font-mono);
		font-size: var(--font-size-2xs);
		font-weight: var(--font-weight-regular);
		letter-spacing: 0;
		text-align: end;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.color-channels {
		display: grid;
		grid-auto-columns: minmax(0, 1fr);
		grid-auto-flow: column;
		gap: var(--space-1-5);
	}

	.color-channel {
		display: flex;
		align-items: center;
		height: var(--control-height-sm);
		min-width: 0;
		border: 1px solid var(--border-default);
		border-radius: var(--radius-sm);
		transition: border-color var(--motion-fast) var(--ease-enter);
	}

	.color-channel:focus-within {
		border-color: var(--tone);
	}

	.color-channel-symbol {
		flex-shrink: 0;
		padding-inline: var(--space-2) var(--space-1);
		color: var(--text-tertiary);
		font-size: var(--font-size-2xs);
		font-weight: var(--font-weight-semibold);
		cursor: ew-resize;
		touch-action: none;
		user-select: none;
	}

	.color-channel-input {
		width: 100%;
		min-width: 0;
		height: 100%;
		padding-inline: 0 var(--space-1-5);
		border: 0;
		background: transparent;
		color: var(--text-primary);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		font-variant-numeric: tabular-nums;
		text-align: end;
		outline: none;
	}

	.color-swatches {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(1.25rem, 1fr));
		gap: var(--space-1-5);
		padding-top: var(--space-3);
		border-top: 1px solid var(--border-default);
	}

	.color-swatch-button {
		aspect-ratio: 1;
		padding: 0;
		border: 0;
		border-radius: var(--radius-sm);
		background:
			linear-gradient(var(--swatch-color), var(--swatch-color)),
			repeating-conic-gradient(var(--surface-strong) 0 25%, var(--surface-default) 0 50%) 0 0 / 0.5rem 0.5rem;
		outline: 1px solid color-mix(in oklch, var(--text-primary) 14%, transparent);
		outline-offset: -1px;
		cursor: pointer;
		transition: scale var(--motion-instant) var(--ease-enter);
	}

	.color-swatch-button:hover {
		scale: 1.1;
	}

	.color-swatch-button:focus-visible {
		outline: 2px solid var(--border-focus);
		outline-offset: 1px;
	}

	.color-swatch-button.isSelected {
		outline: 2px solid var(--text-primary);
		outline-offset: 1px;
	}
`, In = {
  standard: "colorFormatsStandard",
  perceptual: "colorFormatsPerceptual",
  wideGamut: "colorFormatsWideGamut"
}, Rn = {
  red: "channelRed",
  green: "channelGreen",
  blue: "channelBlue",
  hue: "hue",
  saturation: "channelSaturation",
  lightness: "lightness",
  brightness: "channelBrightness",
  whiteness: "channelWhiteness",
  blackness: "channelBlackness",
  chroma: "channelChroma",
  greenRed: "channelGreenRed",
  blueYellow: "channelBlueYellow",
  alpha: "opacity"
}, ke = 0.01, Tn = 1 / 360, Mn = 0.01, zt = 10, Pn = () => typeof window < "u" ? window.EyeDropper ?? null : null, Oe = (t) => Array.from({ length: t }, (e, o) => o), On = (t, e, o, r, s) => {
  const i = o / Math.max(1, s - 1);
  for (const u of Oe(r)) {
    const d = u / Math.max(1, r - 1), f = xn(e, { x: d, y: i });
    if (!f) continue;
    const v = (o * r + u) * 4;
    t[v] = Math.round(f[0] * 255), t[v + 1] = Math.round(f[1] * 255), t[v + 2] = Math.round(f[2] * 255), t[v + 3] = 255;
  }
}, Ae = (t, e) => {
  const o = Math.min(2, window.devicePixelRatio || 1), r = Math.round(t.clientWidth * o), s = Math.round(t.clientHeight * o);
  if (!(r > 0 && s > 0)) return;
  const u = t.getContext("2d");
  if (!u) return;
  t.width = r, t.height = s;
  const d = u.createImageData(r, s);
  for (const f of Oe(s)) On(d.data, e, f, r, s);
  u.putImageData(d, 0, 0);
}, Hn = (t, e) => t ? "color-format-button isStatic" : e ? "color-format-button isOpen" : "color-format-button", Fn = () => /* @__PURE__ */ P("svg", { class: "color-icon", viewBox: "0 0 16 16", "aria-hidden": "true", children: [
  /* @__PURE__ */ m("rect", { x: "5.5", y: "5.5", width: "8", height: "8", rx: "1.5" }),
  /* @__PURE__ */ m("path", { d: "M10.5 5.5V3.5a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" })
] }), _n = () => /* @__PURE__ */ m("svg", { class: "color-icon", viewBox: "0 0 16 16", "aria-hidden": "true", children: /* @__PURE__ */ m("path", { d: "M3.5 8.5l3 3 6-7" }) }), Dn = () => /* @__PURE__ */ P("svg", { class: "color-icon", viewBox: "0 0 16 16", "aria-hidden": "true", children: [
  /* @__PURE__ */ m("path", { d: "M10.5 2.5l3 3-1.5 1.5-3-3z" }),
  /* @__PURE__ */ m("path", { d: "M9.5 5l1.5 1.5-6 6H3.5V11z" })
] }), Bn = () => /* @__PURE__ */ m("svg", { class: "color-format-chevron", viewBox: "0 0 10 10", "aria-hidden": "true", children: /* @__PURE__ */ m("path", { d: "M2.5 4l2.5 2.5L7.5 4" }) }), En = Io(
  (t) => {
    const e = Oo(), o = Ro(), [r, s] = le("value"), [i, u] = le("format"), [d, f] = Ht(null), [v, T] = Ht(!1), [y, h] = Ht(!1), S = H(r), O = H(), wt = H(), St = H(), kt = H(), Jt = H(), at = H(null), q = H(null), At = H(null), Z = kn(t.formats), it = Cn(r, i, Z), I = it.format, E = $(I), J = ot[I], p = d !== null && d.space === E && nt(d, I) === it.text ? d : it.state, N = it.text;
    at.current = p;
    const { isFormDisabled: He } = To({
      value: N,
      isDisabled: t.isDisabled,
      control: O,
      onReset: () => s(S.current),
      onRestore: (n) => {
        typeof n == "string" && n !== "" && s(n);
      }
    }), C = !!(t.isDisabled || He), Qt = (n) => t.input(n), Ct = (n) => t.change(n), M = (n, a) => {
      const c = Nt(n, I);
      f(n), s(c.value), Qt(c), a && Ct(c);
    }, Fe = (n) => {
      const a = $(n), c = F(p, a, d), l = nt(c, n);
      f(c), u(n), s(l), t.formatchange({ value: l, format: n });
    }, _e = (n) => {
      const a = n.currentTarget, c = a.getBoundingClientRect(), l = a.classList.contains("color-track"), b = a.querySelector(".color-thumb"), x = l && b ? b.offsetWidth / 2 : 0, k = Math.max(1, c.width - x * 2), L = g((n.clientX - c.left - x) / k, 0, 1), A = g((n.clientY - c.top) / c.height, 0, 1);
      return { x: L, y: A };
    }, te = (n, a) => {
      var k;
      const c = ((k = q.current) == null ? void 0 : k.state) ?? p, l = _e(a);
      return n === "area" ? ye(p, l) : n === "slider" ? Yt(c, l.x) : { ...p, alpha: w(l.x, 3) };
    }, Lt = (n) => (a) => {
      if (C) return;
      const c = a.currentTarget;
      c.setPointerCapture(a.pointerId), c.focus(), q.current = { state: p, value: N }, M(te(n, a), !1);
    }, It = (n) => (a) => {
      a.currentTarget.hasPointerCapture(a.pointerId) && M(te(n, a), !1);
    }, z = () => {
      const n = q.current;
      if (q.current = null, !n) return;
      const a = at.current ?? p, c = Nt(a, I);
      c.value !== n.value && Ct(c);
    }, Rt = (n, a) => {
      const c = n.shiftKey ? a * zt : a;
      return {
        ArrowLeft: { x: -c, y: 0 },
        ArrowRight: { x: c, y: 0 },
        ArrowUp: { x: 0, y: -c },
        ArrowDown: { x: 0, y: c }
      }[n.key] ?? null;
    }, De = (n) => {
      const a = Rt(n, ke);
      if (!a) return;
      n.preventDefault();
      const c = xe(p), l = { x: g(c.x + a.x, 0, 1), y: g(c.y + a.y, 0, 1) };
      M(ye(p, l), !0);
    }, Q = j[E], ct = Q.sliderLabelKey === "hue", Be = ct ? Tn : Mn, Ee = (n) => {
      const a = Rt(n, Be);
      if (!a) return;
      n.preventDefault();
      const c = a.x - a.y, l = g(we(p) + c, 0, 1);
      M(Yt(p, l), !0);
    }, Ne = (n) => {
      const a = Rt(n, ke);
      if (!a) return;
      n.preventDefault();
      const c = a.x - a.y, l = w(g(p.alpha + c, 0, 1), 3);
      M({ ...p, alpha: l }, !0);
    }, ze = (n) => {
      n.stopPropagation();
      const a = n.target, c = rt(a.value);
      if (!c) {
        a.value = N;
        return;
      }
      const l = Z.includes(c.format), b = c.format !== I, x = l && b, k = x ? c.format : I, L = F(c.state, $(k), d), A = Nt(L, k);
      f(L), x && u(k), s(A.value), a.value = A.value, x && t.formatchange({ value: A.value, format: k }), Qt(A), Ct(A);
    }, ee = (n) => n.stopPropagation();
    pt(() => {
      if (!y) return;
      const n = setTimeout(() => h(!1), Fo);
      return () => clearTimeout(n);
    }, [y]);
    const $e = async () => {
      var a;
      if (!(await Ho(N)).isCopied) {
        (a = Jt.current) == null || a.select();
        return;
      }
      h(!0), t.copy({ value: N });
    }, Tt = Pn(), Ke = !!t.hasEyedropper && Tt !== null, Ge = async () => {
      if (!Tt) return;
      const a = await new Tt().open().catch(() => null);
      if (!a) return;
      const c = rt(a.sRGBHex);
      if (!c) return;
      const l = F({ ...c.state, alpha: p.alpha }, E, d);
      M(l, !0);
    }, Mt = Re(p, I), oe = (n, a, c) => {
      const l = g(c, n.min, n.max);
      if (n.key === "alpha") {
        M({ ...p, alpha: w(l / 100, 3) }, !0);
        return;
      }
      const x = Mt.map((L, A) => A === a ? l : L), k = st(I, x, p.alpha, p);
      M(F(k, E, p), !0);
    }, lt = (n, a) => n.key === "alpha" ? p.alpha * 100 : Mt[a], We = (n, a) => (c) => {
      c.stopPropagation();
      const l = c.target, b = parseFloat(l.value);
      if (!Number.isFinite(b)) {
        l.value = String(w(lt(n, a), n.precision));
        return;
      }
      oe(n, a, b);
    }, Ve = (n, a) => (c) => {
      const b = { ArrowUp: 1, ArrowDown: -1 }[c.key];
      if (!b) return;
      c.preventDefault();
      const x = c.shiftKey ? n.step * zt : n.step;
      oe(n, a, lt(n, a) + b * x);
    }, Ye = (n, a) => (c) => {
      if (C) return;
      c.currentTarget.setPointerCapture(c.pointerId), At.current = { startX: c.clientX, startValue: lt(n, a) }, q.current = { state: p, value: N };
    }, Ue = (n, a) => (c) => {
      const l = At.current;
      if (!l) return;
      const b = c.clientX - l.startX, x = c.shiftKey ? n.step * zt : n.step, k = g(l.startValue + b * x, n.min, n.max);
      if (n.key === "alpha") {
        M({ ...p, alpha: w(k / 100, 3) }, !1);
        return;
      }
      const A = Mt.map((W, tt) => tt === a ? k : W), _ = st(I, A, p.alpha, p);
      M(F(_, E, p), !1);
    }, ne = () => {
      At.current = null, z();
    }, G = Z.length === 1, Xe = () => {
      const n = kt.current;
      return n ? [...n.querySelectorAll(".color-format-option")] : [];
    }, Pt = (n) => {
      var a;
      T(!1), n && ((a = St.current) == null || a.focus());
    }, je = (n) => {
      Pt(!0), n !== I && Fe(n);
    }, qe = (n) => {
      var _;
      if (n.key === "Escape") {
        n.preventDefault(), n.stopPropagation(), Pt(!0);
        return;
      }
      if (n.key === "Tab") {
        Pt(!1);
        return;
      }
      const l = Xe(), b = l.findIndex((W) => {
        var tt;
        return W === ((tt = o.current.shadowRoot) == null ? void 0 : tt.activeElement);
      }), x = l.length - 1, L = {
        ArrowDown: b >= x ? 0 : b + 1,
        ArrowUp: b <= 0 ? x : b - 1,
        Home: 0,
        End: x
      }[n.key];
      L !== void 0 && (n.preventDefault(), (_ = l[L]) == null || _.focus());
    }, Ze = (n) => {
      n.key === "ArrowDown" && (n.preventDefault(), T(!0));
    };
    pt(() => {
      const n = kt.current, a = St.current;
      if (!!!(n && a && n.showPopover)) return;
      const l = n, b = a;
      if (!v) {
        de(l);
        return;
      }
      _o(l);
      const k = Do(b, l, () => {
        const _ = Bo(b, l, { placement: "bottom-start", offset: 6 });
        Eo(l, _);
      }), L = l.querySelector(".color-format-option.isSelected");
      L == null || L.focus();
      const A = (_) => {
        const W = _.composedPath();
        W.includes(l) || W.includes(b) || T(!1);
      };
      return document.addEventListener("pointerdown", A), () => {
        k(), document.removeEventListener("pointerdown", A), de(l);
      };
    }, [v]);
    const re = p.coords[Q.slider.coordIndex], Je = `${E}:${re}`;
    pt(() => {
      const n = wt.current;
      if (!n) return;
      const a = requestAnimationFrame(() => {
        const c = at.current;
        c && Ae(n, c);
      });
      return () => cancelAnimationFrame(a);
    }, [Je]), pt(() => {
      const n = wt.current;
      if (!n || !(typeof ResizeObserver < "u")) return;
      const c = new ResizeObserver(() => {
        const l = at.current;
        l && Ae(n, l);
      });
      return c.observe(n), () => c.disconnect();
    }, []);
    const se = K(p), ut = X({ ...se, alpha: 1 }), dt = xe(p), ae = we(p), Ot = wn(p), Qe = `linear-gradient(to right, ${Ot.join(", ")})`, to = Math.round(ae * (Ot.length - 1)), eo = ct ? Ot[to] : ut, oo = ct ? 1 : 100 / Q.slider.max, no = Math.round(re * oo), ro = ct ? 360 : 100, so = Math.round(p.alpha * 100), ao = e(Q.areaLabelKey), io = e(Q.sliderLabelKey), co = `${Math.round(dt.x * 100)}%, ${Math.round((1 - dt.y) * 100)}%`, ie = !!t.hasAlpha, lo = J.channels.length > 0, uo = !t.isChannelsHidden && lo, ho = ie ? [...J.channels, sn] : J.channels, po = !t.isCopyHidden, mo = e(y ? "copied" : "copy"), ce = Array.isArray(t.swatches) ? t.swatches : [], fo = ce.length > 0, bo = Hn(G, v), go = G ? void 0 : v ? "true" : "false", vo = G ? void 0 : "listbox", xo = [J.label, e("colorFormat")].join(", "), yo = y ? "color-icon-button isConfirmed" : "color-icon-button", wo = No.filter((n) => Z.some((a) => ot[a].group === n)), So = (n) => {
      const a = n === I, c = a ? "color-format-option isSelected" : "color-format-option", l = nt(F(p, $(n)), n);
      return /* @__PURE__ */ P(
        "button",
        {
          type: "button",
          class: c,
          role: "option",
          tabindex: "-1",
          "aria-selected": a ? "true" : "false",
          onclick: () => je(n),
          children: [
            /* @__PURE__ */ m("span", { children: ot[n].label }),
            /* @__PURE__ */ m("span", { class: "color-format-option-preview", "aria-hidden": "true", children: l })
          ]
        }
      );
    }, ko = (n) => {
      const a = Z.filter((l) => ot[l].group === n), c = e(In[n]);
      return /* @__PURE__ */ P("div", { class: "color-format-group", role: "group", "aria-label": c, children: [
        /* @__PURE__ */ m("div", { class: "color-format-group-label", "aria-hidden": "true", children: c }),
        a.map(So)
      ] });
    }, Ao = (n, a) => {
      const c = w(lt(n, a), n.precision), l = e(Rn[n.key]);
      return /* @__PURE__ */ P("label", { class: "color-channel", children: [
        /* @__PURE__ */ m(
          "span",
          {
            class: "color-channel-symbol",
            "aria-hidden": "true",
            onpointerdown: Ye(n, a),
            onpointermove: Ue(n, a),
            onpointerup: ne,
            onlostpointercapture: ne,
            children: n.symbol
          }
        ),
        /* @__PURE__ */ m(
          "input",
          {
            class: "color-channel-input",
            type: "text",
            inputmode: "decimal",
            spellcheck: !1,
            autocomplete: "off",
            "aria-label": l,
            value: String(c),
            disabled: C,
            oninput: ee,
            onchange: We(n, a),
            onkeydown: Ve(n, a)
          }
        )
      ] });
    }, Co = (n) => {
      const a = rt(n), c = a !== null && X(K(a.state)) === X(se);
      return /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          class: c ? "color-swatch-button isSelected" : "color-swatch-button",
          style: { "--swatch-color": n },
          "aria-label": n,
          "aria-pressed": c ? "true" : "false",
          disabled: C,
          onclick: () => {
            a && M(F(a.state, E, d), !0);
          }
        }
      );
    };
    return /* @__PURE__ */ m("host", { shadowDom: { delegatesFocus: !0 }, children: /* @__PURE__ */ P("div", { class: "color-panel", children: [
      /* @__PURE__ */ P(
        "div",
        {
          ref: O,
          class: "color-area",
          role: "slider",
          tabindex: C ? "-1" : "0",
          "aria-label": ao,
          "aria-valuetext": co,
          "aria-disabled": C ? "true" : void 0,
          onpointerdown: Lt("area"),
          onpointermove: It("area"),
          onpointerup: z,
          onlostpointercapture: z,
          onkeydown: De,
          children: [
            /* @__PURE__ */ m("canvas", { ref: wt, class: "color-area-canvas", "aria-hidden": "true" }),
            /* @__PURE__ */ m(
              "span",
              {
                class: "color-thumb",
                style: { left: `${dt.x * 100}%`, top: `${dt.y * 100}%`, "--thumb-color": ut }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ P("div", { class: "color-sliders-row", children: [
        Ke && /* @__PURE__ */ m("button", { type: "button", class: "color-icon-button", "aria-label": e("pickFromScreen"), disabled: C, onclick: Ge, children: /* @__PURE__ */ m(Dn, {}) }),
        /* @__PURE__ */ P("div", { class: "color-sliders", children: [
          /* @__PURE__ */ m(
            "div",
            {
              class: "color-track",
              style: { "--track-fill": Qe },
              role: "slider",
              tabindex: C ? "-1" : "0",
              "aria-label": io,
              "aria-valuemin": "0",
              "aria-valuemax": String(ro),
              "aria-valuenow": String(no),
              "aria-disabled": C ? "true" : void 0,
              onpointerdown: Lt("slider"),
              onpointermove: It("slider"),
              onpointerup: z,
              onlostpointercapture: z,
              onkeydown: Ee,
              children: /* @__PURE__ */ m("span", { class: "color-thumb", style: { "--position": String(ae), "--thumb-color": eo } })
            }
          ),
          ie && /* @__PURE__ */ m(
            "div",
            {
              class: "color-track isAlpha",
              style: { "--track-color": ut },
              role: "slider",
              tabindex: C ? "-1" : "0",
              "aria-label": e("opacity"),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-valuenow": String(so),
              "aria-disabled": C ? "true" : void 0,
              onpointerdown: Lt("alpha"),
              onpointermove: It("alpha"),
              onpointerup: z,
              onlostpointercapture: z,
              onkeydown: Ne,
              children: /* @__PURE__ */ m("span", { class: "color-thumb", style: { "--position": String(p.alpha), "--thumb-color": ut } })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ P("div", { class: "color-value-row", children: [
        /* @__PURE__ */ P(
          "button",
          {
            ref: St,
            type: "button",
            class: bo,
            "aria-label": xo,
            "aria-haspopup": vo,
            "aria-expanded": go,
            disabled: C || G,
            onclick: () => T(!v),
            onkeydown: Ze,
            children: [
              J.label,
              !G && /* @__PURE__ */ m(Bn, {})
            ]
          }
        ),
        /* @__PURE__ */ m(
          "input",
          {
            ref: Jt,
            class: "color-value-input",
            type: "text",
            spellcheck: !1,
            autocomplete: "off",
            "aria-label": e("colorValue"),
            value: N,
            disabled: C,
            oninput: ee,
            onchange: ze
          }
        ),
        po && /* @__PURE__ */ m("button", { type: "button", class: yo, "aria-label": mo, disabled: C, onclick: $e, children: y ? /* @__PURE__ */ m(_n, {}) : /* @__PURE__ */ m(Fn, {}) })
      ] }),
      !G && /* @__PURE__ */ m(
        "div",
        {
          ref: kt,
          class: "color-format-menu",
          popover: "manual",
          role: "listbox",
          "aria-label": e("colorFormat"),
          onkeydown: qe,
          children: wo.map(ko)
        }
      ),
      uo && /* @__PURE__ */ m("div", { class: "color-channels", role: "group", "aria-label": e("colorChannels"), children: ho.map(Ao) }),
      fo && /* @__PURE__ */ m("div", { class: "color-swatches", role: "group", "aria-label": e("colorSwatches"), children: ce.map(Co) })
    ] }) });
  },
  {
    props: {
      value: { type: String, reflect: !0 },
      format: { type: ue("hex", "rgb", "hsl", "hsb", "hwb", "oklch", "oklab", "lch", "lab", "p3"), reflect: !0 },
      formats: { type: Array },
      swatches: { type: Array },
      name: { type: String, reflect: !0 },
      tone: { type: ue("primary", "secondary", "tertiary"), reflect: !0 },
      hasAlpha: { type: Boolean, reflect: !0 },
      hasEyedropper: { type: Boolean, reflect: !0 },
      isChannelsHidden: { type: Boolean, reflect: !0 },
      isCopyHidden: { type: Boolean, reflect: !0 },
      isDisabled: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      input: ht({ bubbles: !0, composed: !0 }),
      change: ht({ bubbles: !0, composed: !0 }),
      formatchange: ht({ bubbles: !0, composed: !0 }),
      copy: ht({ bubbles: !0, composed: !0 })
    },
    styles: [Ln, Po],
    form: !0
  }
);
Mo("z-color-panel", En);
export {
  En as Z,
  Cn as a,
  kn as r
};
