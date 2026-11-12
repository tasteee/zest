const e = (r) => ({ isCopied: !1, error: new Error(r) }), i = { isCopied: !0, error: null }, o = () => typeof navigator < "u" ? !!navigator.clipboard : !1, s = async (r) => {
  if (!o()) return e("clipboard unavailable in this context");
  try {
    return await navigator.clipboard.writeText(r), i;
  } catch (a) {
    return a instanceof Error ? { isCopied: !1, error: a } : e("clipboard write rejected");
  }
}, c = 1600;
export {
  c as C,
  o as a,
  s as c
};
