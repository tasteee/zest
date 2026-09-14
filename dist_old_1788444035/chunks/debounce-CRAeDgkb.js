const r = (c, o) => {
  let e;
  const t = (...n) => {
    clearTimeout(e), e = setTimeout(() => c(...n), o);
  };
  return t.cancel = () => clearTimeout(e), t;
};
export {
  r as d
};
