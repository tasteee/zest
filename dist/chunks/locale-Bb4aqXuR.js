import { u as n, b as r } from "./define-element-BZUk-KLk.js";
const l = {
  close: "Close",
  dismiss: "Dismiss",
  clear: "Clear",
  notifications: "Notifications",
  dismissNotification: "Dismiss notification",
  noData: "No data",
  noOptions: "No options",
  noMatches: "No matches",
  options: "Options",
  selectPlaceholder: "Select…",
  searchPlaceholder: "Search…",
  decreaseValue: "Decrease value",
  increaseValue: "Increase value",
  invalidValue: "Invalid value.",
  selectOneOfTheseOptions: "Please select one of these options.",
  selectAnItemInTheList: "Please select an item in the list.",
  enterANumber: "Please enter a number.",
  valueAtLeast: "Value must be greater than or equal to {min}.",
  valueAtMost: "Value must be less than or equal to {max}.",
  valueOnStep: "Please enter a valid value. The nearest valid values are {low} and {high}.",
  enterTheCode: "Please enter all {length} characters.",
  digitOf: "Digit {index} of {length}",
  lowerValue: "Lower value",
  upperValue: "Upper value",
  rangeSeparator: "to",
  row: "row",
  column: "column",
  selectAxis: "Select {axis}",
  insertAxisAfter: "Insert {axis} after",
  removeAxis: "Remove {axis}",
  cancel: "Cancel",
  confirm: "Confirm",
  learnMore: "Learn more",
  remove: "Remove",
  previousSlide: "Previous slide",
  nextSlide: "Next slide",
  files: "Files",
  chooseColor: "Choose color",
  saturationAndBrightness: "Saturation and brightness",
  hue: "Hue",
  commandSearch: "Command search",
  commandResults: "Commands",
  commandPlaceholder: "Type a command or search…",
  commandEmpty: "No results found.",
  removeSelectedFiles: "Remove selected files",
  pagination: "Pagination",
  previousPage: "Previous page",
  nextPage: "Next page",
  colorTheme: "Color theme",
  themeLight: "Light",
  themeDark: "Dark",
  themeSystem: "System",
  switchToLight: "Switch to light theme",
  switchToDark: "Switch to dark theme",
  dropFilesHere: "Drop files here or click to browse",
  filesSelected: "{count} files selected",
  goToSlide: "Go to slide {index}",
  showMore: "Show more",
  showLess: "Show less",
  loading: "Loading",
  copyValue: "Value to copy",
  copy: "Copy",
  copied: "Copied",
  copyLine: "Copy line",
  copySelection: "Copy selection",
  replay: "Replay",
  linkTo: 'Link to "{title}"'
};
let i = {};
const a = /* @__PURE__ */ new Set(), c = (o, e) => e ? o.replace(/\{(\w+)\}/g, (s, t) => t in e ? String(e[t]) : s) : o, d = (o) => {
  i = { ...o };
  for (const e of a) e();
}, m = () => ({ ...l, ...i }), h = (o, e) => c(i[o] ?? l[o], e), p = () => {
  const o = n();
  return r(() => {
    const e = () => {
      var s, t;
      (t = (s = o.current).update) == null || t.call(s);
    };
    return a.add(e), () => {
      a.delete(e);
    };
  }, []), h;
};
export {
  m as a,
  l as e,
  h as g,
  d as s,
  p as u
};
