import { c as gn, a as un, e as bn, j as Q, g as Re, d as pn } from "../chunks/define-element-BWC3wEPr.js";
import { a as ot } from "../chunks/hooks-D9_x-ckD.js";
import { t as fn } from "../chunks/scrollbar-styles-DNEW5KBr.js";
import "../chunks/z-copy-button-C2lZIbjB.js";
function hn(t) {
  const n = t.regex, r = {}, s = {
    begin: /\$\{/,
    end: /\}/,
    contains: [
      "self",
      {
        begin: /:-/,
        contains: [r]
      }
      // default values
    ]
  };
  Object.assign(r, {
    className: "variable",
    variants: [
      { begin: n.concat(
        /\$[\w\d#@][\w\d_]*/,
        // negative look-ahead tries to avoid matching patterns that are not
        // Perl at all like $ident$, @ident@, etc.
        "(?![\\w\\d])(?![$])"
      ) },
      s
    ]
  });
  const d = {
    className: "subst",
    begin: /\$\(/,
    end: /\)/,
    contains: [t.BACKSLASH_ESCAPE]
  }, p = t.inherit(
    t.COMMENT(),
    {
      match: [
        /(^|\s)/,
        /#.*$/
      ],
      scope: {
        2: "comment"
      }
    }
  ), v = {
    begin: /<<-?\s*(?=\w+)/,
    starts: { contains: [
      t.END_SAME_AS_BEGIN({
        begin: /(\w+)/,
        end: /(\w+)/,
        className: "string"
      })
    ] }
  }, m = {
    className: "string",
    begin: /"/,
    end: /"/,
    contains: [
      t.BACKSLASH_ESCAPE,
      r,
      d
    ]
  };
  d.contains.push(m);
  const f = {
    match: /\\"/
  }, y = {
    className: "string",
    begin: /'/,
    end: /'/
  }, x = {
    match: /\\'/
  }, A = {
    begin: /\$?\(\(/,
    end: /\)\)/,
    contains: [
      {
        begin: /\d+#[0-9a-f]+/,
        className: "number"
      },
      t.NUMBER_MODE,
      r
    ]
  }, w = [
    "fish",
    "bash",
    "zsh",
    "sh",
    "csh",
    "ksh",
    "tcsh",
    "dash",
    "scsh"
  ], k = t.SHEBANG({
    binary: `(${w.join("|")})`,
    relevance: 10
  }), C = {
    className: "function",
    begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
    returnBegin: !0,
    contains: [t.inherit(t.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
    relevance: 0
  }, T = [
    "if",
    "then",
    "else",
    "elif",
    "fi",
    "time",
    "for",
    "while",
    "until",
    "in",
    "do",
    "done",
    "case",
    "esac",
    "coproc",
    "function",
    "select"
  ], L = [
    "true",
    "false"
  ], H = { match: /(\/[a-z._-]+)+/ }, j = [
    "break",
    "cd",
    "continue",
    "eval",
    "exec",
    "exit",
    "export",
    "getopts",
    "hash",
    "pwd",
    "readonly",
    "return",
    "shift",
    "test",
    "times",
    "trap",
    "umask",
    "unset"
  ], Y = [
    "alias",
    "bind",
    "builtin",
    "caller",
    "command",
    "declare",
    "echo",
    "enable",
    "help",
    "let",
    "local",
    "logout",
    "mapfile",
    "printf",
    "read",
    "readarray",
    "source",
    "sudo",
    "type",
    "typeset",
    "ulimit",
    "unalias"
  ], te = [
    "autoload",
    "bg",
    "bindkey",
    "bye",
    "cap",
    "chdir",
    "clone",
    "comparguments",
    "compcall",
    "compctl",
    "compdescribe",
    "compfiles",
    "compgroups",
    "compquote",
    "comptags",
    "comptry",
    "compvalues",
    "dirs",
    "disable",
    "disown",
    "echotc",
    "echoti",
    "emulate",
    "fc",
    "fg",
    "float",
    "functions",
    "getcap",
    "getln",
    "history",
    "integer",
    "jobs",
    "kill",
    "limit",
    "log",
    "noglob",
    "popd",
    "print",
    "pushd",
    "pushln",
    "rehash",
    "sched",
    "setcap",
    "setopt",
    "stat",
    "suspend",
    "ttyctl",
    "unfunction",
    "unhash",
    "unlimit",
    "unsetopt",
    "vared",
    "wait",
    "whence",
    "where",
    "which",
    "zcompile",
    "zformat",
    "zftp",
    "zle",
    "zmodload",
    "zparseopts",
    "zprof",
    "zpty",
    "zregexparse",
    "zsocket",
    "zstyle",
    "ztcp"
  ], Z = [
    "chcon",
    "chgrp",
    "chown",
    "chmod",
    "cp",
    "dd",
    "df",
    "dir",
    "dircolors",
    "ln",
    "ls",
    "mkdir",
    "mkfifo",
    "mknod",
    "mktemp",
    "mv",
    "realpath",
    "rm",
    "rmdir",
    "shred",
    "sync",
    "touch",
    "truncate",
    "vdir",
    "b2sum",
    "base32",
    "base64",
    "cat",
    "cksum",
    "comm",
    "csplit",
    "cut",
    "expand",
    "fmt",
    "fold",
    "head",
    "join",
    "md5sum",
    "nl",
    "numfmt",
    "od",
    "paste",
    "ptx",
    "pr",
    "sha1sum",
    "sha224sum",
    "sha256sum",
    "sha384sum",
    "sha512sum",
    "shuf",
    "sort",
    "split",
    "sum",
    "tac",
    "tail",
    "tr",
    "tsort",
    "unexpand",
    "uniq",
    "wc",
    "arch",
    "basename",
    "chroot",
    "date",
    "dirname",
    "du",
    "echo",
    "env",
    "expr",
    "factor",
    // "false", // keyword literal already
    "groups",
    "hostid",
    "id",
    "link",
    "logname",
    "nice",
    "nohup",
    "nproc",
    "pathchk",
    "pinky",
    "printenv",
    "printf",
    "pwd",
    "readlink",
    "runcon",
    "seq",
    "sleep",
    "stat",
    "stdbuf",
    "stty",
    "tee",
    "test",
    "timeout",
    // "true", // keyword literal already
    "tty",
    "uname",
    "unlink",
    "uptime",
    "users",
    "who",
    "whoami",
    "yes"
  ];
  return {
    name: "Bash",
    aliases: [
      "sh",
      "zsh"
    ],
    keywords: {
      $pattern: /\b[a-z][a-z0-9._-]+\b/,
      keyword: T,
      literal: L,
      built_in: [
        ...j,
        ...Y,
        // Shell modifiers
        "set",
        "shopt",
        ...te,
        ...Z
      ]
    },
    contains: [
      k,
      // to catch known shells and boost relevancy
      t.SHEBANG(),
      // to catch unknown shells but still highlight the shebang
      C,
      A,
      p,
      v,
      H,
      m,
      f,
      y,
      x,
      r
    ]
  };
}
const mn = (t) => ({
  IMPORTANT: {
    scope: "meta",
    begin: "!important"
  },
  BLOCK_COMMENT: t.C_BLOCK_COMMENT_MODE,
  HEXCOLOR: {
    scope: "number",
    begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
  },
  FUNCTION_DISPATCH: {
    className: "built_in",
    begin: /[\w-]+(?=\()/
  },
  ATTRIBUTE_SELECTOR_MODE: {
    scope: "selector-attr",
    begin: /\[/,
    end: /\]/,
    illegal: "$",
    contains: [
      t.APOS_STRING_MODE,
      t.QUOTE_STRING_MODE
    ]
  },
  CSS_NUMBER_MODE: {
    scope: "number",
    begin: t.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
    relevance: 0
  },
  CSS_VARIABLE: {
    className: "attr",
    begin: /--[A-Za-z_][A-Za-z0-9_-]*/
  }
}), En = [
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "audio",
  "b",
  "blockquote",
  "body",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "dd",
  "del",
  "details",
  "dfn",
  "div",
  "dl",
  "dt",
  "em",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "mark",
  "menu",
  "nav",
  "object",
  "ol",
  "optgroup",
  "option",
  "p",
  "picture",
  "q",
  "quote",
  "samp",
  "section",
  "select",
  "source",
  "span",
  "strong",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "ul",
  "var",
  "video"
], _n = [
  "defs",
  "g",
  "marker",
  "mask",
  "pattern",
  "svg",
  "switch",
  "symbol",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feFlood",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMorphology",
  "feOffset",
  "feSpecularLighting",
  "feTile",
  "feTurbulence",
  "linearGradient",
  "radialGradient",
  "stop",
  "circle",
  "ellipse",
  "image",
  "line",
  "path",
  "polygon",
  "polyline",
  "rect",
  "text",
  "use",
  "textPath",
  "tspan",
  "foreignObject",
  "clipPath"
], yn = [
  ...En,
  ..._n
], vn = [
  "any-hover",
  "any-pointer",
  "aspect-ratio",
  "color",
  "color-gamut",
  "color-index",
  "device-aspect-ratio",
  "device-height",
  "device-width",
  "display-mode",
  "forced-colors",
  "grid",
  "height",
  "hover",
  "inverted-colors",
  "monochrome",
  "orientation",
  "overflow-block",
  "overflow-inline",
  "pointer",
  "prefers-color-scheme",
  "prefers-contrast",
  "prefers-reduced-motion",
  "prefers-reduced-transparency",
  "resolution",
  "scan",
  "scripting",
  "update",
  "width",
  // TODO: find a better solution?
  "min-width",
  "max-width",
  "min-height",
  "max-height"
].sort().reverse(), wn = [
  "active",
  "any-link",
  "blank",
  "checked",
  "current",
  "default",
  "defined",
  "dir",
  // dir()
  "disabled",
  "drop",
  "empty",
  "enabled",
  "first",
  "first-child",
  "first-of-type",
  "fullscreen",
  "future",
  "focus",
  "focus-visible",
  "focus-within",
  "has",
  // has()
  "host",
  // host or host()
  "host-context",
  // host-context()
  "hover",
  "indeterminate",
  "in-range",
  "invalid",
  "is",
  // is()
  "lang",
  // lang()
  "last-child",
  "last-of-type",
  "left",
  "link",
  "local-link",
  "not",
  // not()
  "nth-child",
  // nth-child()
  "nth-col",
  // nth-col()
  "nth-last-child",
  // nth-last-child()
  "nth-last-col",
  // nth-last-col()
  "nth-last-of-type",
  //nth-last-of-type()
  "nth-of-type",
  //nth-of-type()
  "only-child",
  "only-of-type",
  "optional",
  "out-of-range",
  "past",
  "placeholder-shown",
  "read-only",
  "read-write",
  "required",
  "right",
  "root",
  "scope",
  "target",
  "target-within",
  "user-invalid",
  "valid",
  "visited",
  "where"
  // where()
].sort().reverse(), Nn = [
  "after",
  "backdrop",
  "before",
  "cue",
  "cue-region",
  "first-letter",
  "first-line",
  "grammar-error",
  "marker",
  "part",
  "placeholder",
  "selection",
  "slotted",
  "spelling-error"
].sort().reverse(), kn = [
  "accent-color",
  "align-content",
  "align-items",
  "align-self",
  "alignment-baseline",
  "all",
  "anchor-name",
  "animation",
  "animation-composition",
  "animation-delay",
  "animation-direction",
  "animation-duration",
  "animation-fill-mode",
  "animation-iteration-count",
  "animation-name",
  "animation-play-state",
  "animation-range",
  "animation-range-end",
  "animation-range-start",
  "animation-timeline",
  "animation-timing-function",
  "appearance",
  "aspect-ratio",
  "backdrop-filter",
  "backface-visibility",
  "background",
  "background-attachment",
  "background-blend-mode",
  "background-clip",
  "background-color",
  "background-image",
  "background-origin",
  "background-position",
  "background-position-x",
  "background-position-y",
  "background-repeat",
  "background-size",
  "baseline-shift",
  "block-size",
  "border",
  "border-block",
  "border-block-color",
  "border-block-end",
  "border-block-end-color",
  "border-block-end-style",
  "border-block-end-width",
  "border-block-start",
  "border-block-start-color",
  "border-block-start-style",
  "border-block-start-width",
  "border-block-style",
  "border-block-width",
  "border-bottom",
  "border-bottom-color",
  "border-bottom-left-radius",
  "border-bottom-right-radius",
  "border-bottom-style",
  "border-bottom-width",
  "border-collapse",
  "border-color",
  "border-end-end-radius",
  "border-end-start-radius",
  "border-image",
  "border-image-outset",
  "border-image-repeat",
  "border-image-slice",
  "border-image-source",
  "border-image-width",
  "border-inline",
  "border-inline-color",
  "border-inline-end",
  "border-inline-end-color",
  "border-inline-end-style",
  "border-inline-end-width",
  "border-inline-start",
  "border-inline-start-color",
  "border-inline-start-style",
  "border-inline-start-width",
  "border-inline-style",
  "border-inline-width",
  "border-left",
  "border-left-color",
  "border-left-style",
  "border-left-width",
  "border-radius",
  "border-right",
  "border-right-color",
  "border-right-style",
  "border-right-width",
  "border-spacing",
  "border-start-end-radius",
  "border-start-start-radius",
  "border-style",
  "border-top",
  "border-top-color",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-top-style",
  "border-top-width",
  "border-width",
  "bottom",
  "box-align",
  "box-decoration-break",
  "box-direction",
  "box-flex",
  "box-flex-group",
  "box-lines",
  "box-ordinal-group",
  "box-orient",
  "box-pack",
  "box-shadow",
  "box-sizing",
  "break-after",
  "break-before",
  "break-inside",
  "caption-side",
  "caret-color",
  "clear",
  "clip",
  "clip-path",
  "clip-rule",
  "color",
  "color-interpolation",
  "color-interpolation-filters",
  "color-profile",
  "color-rendering",
  "color-scheme",
  "column-count",
  "column-fill",
  "column-gap",
  "column-rule",
  "column-rule-color",
  "column-rule-style",
  "column-rule-width",
  "column-span",
  "column-width",
  "columns",
  "contain",
  "contain-intrinsic-block-size",
  "contain-intrinsic-height",
  "contain-intrinsic-inline-size",
  "contain-intrinsic-size",
  "contain-intrinsic-width",
  "container",
  "container-name",
  "container-type",
  "content",
  "content-visibility",
  "counter-increment",
  "counter-reset",
  "counter-set",
  "cue",
  "cue-after",
  "cue-before",
  "cursor",
  "cx",
  "cy",
  "direction",
  "display",
  "dominant-baseline",
  "empty-cells",
  "enable-background",
  "field-sizing",
  "fill",
  "fill-opacity",
  "fill-rule",
  "filter",
  "flex",
  "flex-basis",
  "flex-direction",
  "flex-flow",
  "flex-grow",
  "flex-shrink",
  "flex-wrap",
  "float",
  "flood-color",
  "flood-opacity",
  "flow",
  "font",
  "font-display",
  "font-family",
  "font-feature-settings",
  "font-kerning",
  "font-language-override",
  "font-optical-sizing",
  "font-palette",
  "font-size",
  "font-size-adjust",
  "font-smooth",
  "font-smoothing",
  "font-stretch",
  "font-style",
  "font-synthesis",
  "font-synthesis-position",
  "font-synthesis-small-caps",
  "font-synthesis-style",
  "font-synthesis-weight",
  "font-variant",
  "font-variant-alternates",
  "font-variant-caps",
  "font-variant-east-asian",
  "font-variant-emoji",
  "font-variant-ligatures",
  "font-variant-numeric",
  "font-variant-position",
  "font-variation-settings",
  "font-weight",
  "forced-color-adjust",
  "gap",
  "glyph-orientation-horizontal",
  "glyph-orientation-vertical",
  "grid",
  "grid-area",
  "grid-auto-columns",
  "grid-auto-flow",
  "grid-auto-rows",
  "grid-column",
  "grid-column-end",
  "grid-column-start",
  "grid-gap",
  "grid-row",
  "grid-row-end",
  "grid-row-start",
  "grid-template",
  "grid-template-areas",
  "grid-template-columns",
  "grid-template-rows",
  "hanging-punctuation",
  "height",
  "hyphenate-character",
  "hyphenate-limit-chars",
  "hyphens",
  "icon",
  "image-orientation",
  "image-rendering",
  "image-resolution",
  "ime-mode",
  "initial-letter",
  "initial-letter-align",
  "inline-size",
  "inset",
  "inset-area",
  "inset-block",
  "inset-block-end",
  "inset-block-start",
  "inset-inline",
  "inset-inline-end",
  "inset-inline-start",
  "isolation",
  "justify-content",
  "justify-items",
  "justify-self",
  "kerning",
  "left",
  "letter-spacing",
  "lighting-color",
  "line-break",
  "line-height",
  "line-height-step",
  "list-style",
  "list-style-image",
  "list-style-position",
  "list-style-type",
  "margin",
  "margin-block",
  "margin-block-end",
  "margin-block-start",
  "margin-bottom",
  "margin-inline",
  "margin-inline-end",
  "margin-inline-start",
  "margin-left",
  "margin-right",
  "margin-top",
  "margin-trim",
  "marker",
  "marker-end",
  "marker-mid",
  "marker-start",
  "marks",
  "mask",
  "mask-border",
  "mask-border-mode",
  "mask-border-outset",
  "mask-border-repeat",
  "mask-border-slice",
  "mask-border-source",
  "mask-border-width",
  "mask-clip",
  "mask-composite",
  "mask-image",
  "mask-mode",
  "mask-origin",
  "mask-position",
  "mask-repeat",
  "mask-size",
  "mask-type",
  "masonry-auto-flow",
  "math-depth",
  "math-shift",
  "math-style",
  "max-block-size",
  "max-height",
  "max-inline-size",
  "max-width",
  "min-block-size",
  "min-height",
  "min-inline-size",
  "min-width",
  "mix-blend-mode",
  "nav-down",
  "nav-index",
  "nav-left",
  "nav-right",
  "nav-up",
  "none",
  "normal",
  "object-fit",
  "object-position",
  "offset",
  "offset-anchor",
  "offset-distance",
  "offset-path",
  "offset-position",
  "offset-rotate",
  "opacity",
  "order",
  "orphans",
  "outline",
  "outline-color",
  "outline-offset",
  "outline-style",
  "outline-width",
  "overflow",
  "overflow-anchor",
  "overflow-block",
  "overflow-clip-margin",
  "overflow-inline",
  "overflow-wrap",
  "overflow-x",
  "overflow-y",
  "overlay",
  "overscroll-behavior",
  "overscroll-behavior-block",
  "overscroll-behavior-inline",
  "overscroll-behavior-x",
  "overscroll-behavior-y",
  "padding",
  "padding-block",
  "padding-block-end",
  "padding-block-start",
  "padding-bottom",
  "padding-inline",
  "padding-inline-end",
  "padding-inline-start",
  "padding-left",
  "padding-right",
  "padding-top",
  "page",
  "page-break-after",
  "page-break-before",
  "page-break-inside",
  "paint-order",
  "pause",
  "pause-after",
  "pause-before",
  "perspective",
  "perspective-origin",
  "place-content",
  "place-items",
  "place-self",
  "pointer-events",
  "position",
  "position-anchor",
  "position-visibility",
  "print-color-adjust",
  "quotes",
  "r",
  "resize",
  "rest",
  "rest-after",
  "rest-before",
  "right",
  "rotate",
  "row-gap",
  "ruby-align",
  "ruby-position",
  "scale",
  "scroll-behavior",
  "scroll-margin",
  "scroll-margin-block",
  "scroll-margin-block-end",
  "scroll-margin-block-start",
  "scroll-margin-bottom",
  "scroll-margin-inline",
  "scroll-margin-inline-end",
  "scroll-margin-inline-start",
  "scroll-margin-left",
  "scroll-margin-right",
  "scroll-margin-top",
  "scroll-padding",
  "scroll-padding-block",
  "scroll-padding-block-end",
  "scroll-padding-block-start",
  "scroll-padding-bottom",
  "scroll-padding-inline",
  "scroll-padding-inline-end",
  "scroll-padding-inline-start",
  "scroll-padding-left",
  "scroll-padding-right",
  "scroll-padding-top",
  "scroll-snap-align",
  "scroll-snap-stop",
  "scroll-snap-type",
  "scroll-timeline",
  "scroll-timeline-axis",
  "scroll-timeline-name",
  "scrollbar-color",
  "scrollbar-gutter",
  "scrollbar-width",
  "shape-image-threshold",
  "shape-margin",
  "shape-outside",
  "shape-rendering",
  "speak",
  "speak-as",
  "src",
  // @font-face
  "stop-color",
  "stop-opacity",
  "stroke",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-width",
  "tab-size",
  "table-layout",
  "text-align",
  "text-align-all",
  "text-align-last",
  "text-anchor",
  "text-combine-upright",
  "text-decoration",
  "text-decoration-color",
  "text-decoration-line",
  "text-decoration-skip",
  "text-decoration-skip-ink",
  "text-decoration-style",
  "text-decoration-thickness",
  "text-emphasis",
  "text-emphasis-color",
  "text-emphasis-position",
  "text-emphasis-style",
  "text-indent",
  "text-justify",
  "text-orientation",
  "text-overflow",
  "text-rendering",
  "text-shadow",
  "text-size-adjust",
  "text-transform",
  "text-underline-offset",
  "text-underline-position",
  "text-wrap",
  "text-wrap-mode",
  "text-wrap-style",
  "timeline-scope",
  "top",
  "touch-action",
  "transform",
  "transform-box",
  "transform-origin",
  "transform-style",
  "transition",
  "transition-behavior",
  "transition-delay",
  "transition-duration",
  "transition-property",
  "transition-timing-function",
  "translate",
  "unicode-bidi",
  "user-modify",
  "user-select",
  "vector-effect",
  "vertical-align",
  "view-timeline",
  "view-timeline-axis",
  "view-timeline-inset",
  "view-timeline-name",
  "view-transition-name",
  "visibility",
  "voice-balance",
  "voice-duration",
  "voice-family",
  "voice-pitch",
  "voice-range",
  "voice-rate",
  "voice-stress",
  "voice-volume",
  "white-space",
  "white-space-collapse",
  "widows",
  "width",
  "will-change",
  "word-break",
  "word-spacing",
  "word-wrap",
  "writing-mode",
  "x",
  "y",
  "z-index",
  "zoom"
].sort().reverse();
function Sn(t) {
  const n = t.regex, r = mn(t), s = { begin: /-(webkit|moz|ms|o)-(?=[a-z])/ }, d = "and or not only", p = /@-?\w[\w]*(-\w+)*/, v = "[a-zA-Z-][a-zA-Z0-9_-]*", m = [
    t.APOS_STRING_MODE,
    t.QUOTE_STRING_MODE
  ];
  return {
    name: "CSS",
    case_insensitive: !0,
    illegal: /[=|'\$]/,
    keywords: { keyframePosition: "from to" },
    classNameAliases: {
      // for visual continuity with `tag {}` and because we
      // don't have a great class for this?
      keyframePosition: "selector-tag"
    },
    contains: [
      r.BLOCK_COMMENT,
      s,
      // to recognize keyframe 40% etc which are outside the scope of our
      // attribute value mode
      r.CSS_NUMBER_MODE,
      {
        className: "selector-id",
        begin: /#[A-Za-z0-9_-]+/,
        relevance: 0
      },
      {
        className: "selector-class",
        begin: "\\." + v,
        relevance: 0
      },
      r.ATTRIBUTE_SELECTOR_MODE,
      {
        className: "selector-pseudo",
        variants: [
          { begin: ":(" + wn.join("|") + ")" },
          { begin: ":(:)?(" + Nn.join("|") + ")" }
        ]
      },
      // we may actually need this (12/2020)
      // { // pseudo-selector params
      //   begin: /\(/,
      //   end: /\)/,
      //   contains: [ hljs.CSS_NUMBER_MODE ]
      // },
      r.CSS_VARIABLE,
      {
        className: "attribute",
        begin: "\\b(" + kn.join("|") + ")\\b"
      },
      // attribute values
      {
        begin: /:/,
        end: /[;}{]/,
        contains: [
          r.BLOCK_COMMENT,
          r.HEXCOLOR,
          r.IMPORTANT,
          r.CSS_NUMBER_MODE,
          ...m,
          // needed to highlight these as strings and to avoid issues with
          // illegal characters that might be inside urls that would tigger the
          // languages illegal stack
          {
            begin: /(url|data-uri)\(/,
            end: /\)/,
            relevance: 0,
            // from keywords
            keywords: { built_in: "url data-uri" },
            contains: [
              ...m,
              {
                className: "string",
                // any character other than `)` as in `url()` will be the start
                // of a string, which ends with `)` (from the parent mode)
                begin: /[^)]/,
                endsWithParent: !0,
                excludeEnd: !0
              }
            ]
          },
          r.FUNCTION_DISPATCH
        ]
      },
      {
        begin: n.lookahead(/@/),
        end: "[{;]",
        relevance: 0,
        illegal: /:/,
        // break on Less variables @var: ...
        contains: [
          {
            className: "keyword",
            begin: p
          },
          {
            begin: /\s/,
            endsWithParent: !0,
            excludeEnd: !0,
            relevance: 0,
            keywords: {
              $pattern: /[a-z-]+/,
              keyword: d,
              attribute: vn.join(" ")
            },
            contains: [
              {
                begin: /[a-z-]+(?=:)/,
                className: "attribute"
              },
              ...m,
              r.CSS_NUMBER_MODE
            ]
          }
        ]
      },
      {
        className: "selector-tag",
        begin: "\\b(" + yn.join("|") + ")\\b"
      }
    ]
  };
}
const at = "[A-Za-z$_][0-9A-Za-z$_]*", xn = [
  "as",
  // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends",
  // It's reached stage 3, which is "recommended for implementation":
  "using"
], Tn = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
], gt = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
], ut = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
], bt = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",
  "require",
  "exports",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
], An = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "global"
  // Node.js
], On = [].concat(
  bt,
  gt,
  ut
);
function Rn(t) {
  const n = t.regex, r = (O, { after: F }) => {
    const W = "</" + O[0].slice(1);
    return O.input.indexOf(W, F) !== -1;
  }, s = at, d = {
    begin: "<>",
    end: "</>"
  }, p = /<[A-Za-z0-9\\._:-]+\s*\/>/, v = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (O, F) => {
      const W = O[0].length + O.index, q = O.input[W];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        q === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        q === ","
      ) {
        F.ignoreMatch();
        return;
      }
      q === ">" && (r(O, { after: W }) || F.ignoreMatch());
      let re;
      const le = O.input.substring(W);
      if (re = le.match(/^\s*=/)) {
        F.ignoreMatch();
        return;
      }
      if ((re = le.match(/^\s+extends\s+/)) && re.index === 0) {
        F.ignoreMatch();
        return;
      }
    }
  }, m = {
    $pattern: at,
    keyword: xn,
    literal: Tn,
    built_in: On,
    "variable.language": An
  }, f = "[0-9](_?[0-9])*", y = `\\.(${f})`, x = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", A = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${x})((${y})|\\.)?|(${y}))[eE][+-]?(${f})\\b` },
      { begin: `\\b(${x})\\b((${y})\\b|\\.)?|(${y})\\b` },
      // DecimalBigIntegerLiteral
      { begin: "\\b(0|[1-9](_?[0-9])*)n\\b" },
      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" }
    ],
    relevance: 0
  }, w = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: m,
    contains: []
    // defined later
  }, k = {
    begin: ".?html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        t.BACKSLASH_ESCAPE,
        w
      ],
      subLanguage: "xml"
    }
  }, C = {
    begin: ".?css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        t.BACKSLASH_ESCAPE,
        w
      ],
      subLanguage: "css"
    }
  }, T = {
    begin: ".?gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        t.BACKSLASH_ESCAPE,
        w
      ],
      subLanguage: "graphql"
    }
  }, L = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      t.BACKSLASH_ESCAPE,
      w
    ]
  }, j = {
    className: "comment",
    variants: [
      t.COMMENT(
        /\/\*\*(?!\/)/,
        "\\*/",
        {
          relevance: 0,
          contains: [
            {
              begin: "(?=@[A-Za-z]+)",
              relevance: 0,
              contains: [
                {
                  className: "doctag",
                  begin: "@[A-Za-z]+"
                },
                {
                  className: "type",
                  begin: "\\{",
                  end: "\\}",
                  excludeEnd: !0,
                  excludeBegin: !0,
                  relevance: 0
                },
                {
                  className: "variable",
                  begin: s + "(?=\\s*(-)|$)",
                  endsParent: !0,
                  relevance: 0
                },
                // eat spaces (not newlines) so we can find
                // types or variables
                {
                  begin: /(?=[^\n])\s/,
                  relevance: 0
                }
              ]
            }
          ]
        }
      ),
      t.C_BLOCK_COMMENT_MODE,
      t.C_LINE_COMMENT_MODE
    ]
  }, Y = [
    t.APOS_STRING_MODE,
    t.QUOTE_STRING_MODE,
    k,
    C,
    T,
    L,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    A
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  w.contains = Y.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: m,
    contains: [
      "self"
    ].concat(Y)
  });
  const te = [].concat(j, w.contains), Z = te.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: m,
      contains: ["self"].concat(te)
    }
  ]), K = {
    className: "params",
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/,
    // to match the parms with
    end: /\)/,
    excludeBegin: !0,
    excludeEnd: !0,
    keywords: m,
    contains: Z
  }, ue = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          s,
          /\s+/,
          /extends/,
          /\s+/,
          n.concat(s, "(", n.concat(/\./, s), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          s
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      }
    ]
  }, ne = {
    relevance: 0,
    match: n.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...gt,
        ...ut
      ]
    }
  }, be = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  }, pe = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          s,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [K],
    illegal: /%/
  }, fe = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function Ee(O) {
    return n.concat("(?!", O.join("|"), ")");
  }
  const _e = {
    match: n.concat(
      /\b/,
      Ee([
        ...bt,
        "super",
        "import"
      ].map((O) => `${O}\\s*\\(`)),
      s,
      n.lookahead(/\s*\(/)
    ),
    className: "title.function",
    relevance: 0
  }, ie = {
    begin: n.concat(/\./, n.lookahead(
      n.concat(s, /(?![0-9A-Za-z$_(])/)
    )),
    end: s,
    excludeBegin: !0,
    keywords: "prototype",
    className: "property",
    relevance: 0
  }, ye = {
    match: [
      /get|set/,
      /\s+/,
      s,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      {
        // eat to avoid empty params
        begin: /\(\)/
      },
      K
    ]
  }, ce = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + t.UNDERSCORE_IDENT_RE + ")\\s*=>", ve = {
    match: [
      /const|var|let/,
      /\s+/,
      s,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      n.lookahead(ce)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      K
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: m,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS: Z, CLASS_REFERENCE: ne },
    illegal: /#(?![$_A-z])/,
    contains: [
      t.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      be,
      t.APOS_STRING_MODE,
      t.QUOTE_STRING_MODE,
      k,
      C,
      T,
      L,
      j,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      A,
      ne,
      {
        scope: "attr",
        match: s + n.lookahead(":"),
        relevance: 0
      },
      ve,
      {
        // "value" container
        begin: "(" + t.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          j,
          t.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: ce,
            returnBegin: !0,
            end: "\\s*=>",
            contains: [
              {
                className: "params",
                variants: [
                  {
                    begin: t.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: !0
                  },
                  {
                    begin: /(\s*)\(/,
                    end: /\)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    keywords: m,
                    contains: Z
                  }
                ]
              }
            ]
          },
          {
            // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          {
            // JSX
            variants: [
              { begin: d.begin, end: d.end },
              { match: p },
              {
                begin: v.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": v.isTrulyOpeningTag,
                end: v.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: v.begin,
                end: v.end,
                skip: !0,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      pe,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: "\\b(?!function)" + t.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        // end parens
        returnBegin: !0,
        label: "func.def",
        contains: [
          K,
          t.inherit(t.TITLE_MODE, { begin: s, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      ie,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: "\\$" + s,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [K]
      },
      _e,
      fe,
      ue,
      ye,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
function Mn(t) {
  const n = {
    className: "attr",
    begin: /"(\\.|[^\\"\r\n])*"(?=\s*:)/,
    relevance: 1.01
  }, r = {
    match: /[{}[\],:]/,
    className: "punctuation",
    relevance: 0
  }, s = [
    "true",
    "false",
    "null"
  ], d = {
    scope: "literal",
    beginKeywords: s.join(" ")
  };
  return {
    name: "JSON",
    aliases: ["jsonc"],
    keywords: {
      literal: s
    },
    contains: [
      n,
      r,
      t.QUOTE_STRING_MODE,
      d,
      t.C_NUMBER_MODE,
      t.C_LINE_COMMENT_MODE,
      t.C_BLOCK_COMMENT_MODE
    ],
    illegal: "\\S"
  };
}
function In(t) {
  const n = t.regex, r = {
    begin: /<\/?[A-Za-z_]/,
    end: ">",
    subLanguage: "xml",
    relevance: 0
  }, s = {
    begin: "^[-\\*]{3,}",
    end: "$"
  }, d = {
    className: "code",
    variants: [
      // TODO: fix to allow these to work with sublanguage also
      { begin: "(`{3,})[^`](.|\\n)*?\\1`*[ ]*" },
      { begin: "(~{3,})[^~](.|\\n)*?\\1~*[ ]*" },
      // needed to allow markdown as a sublanguage to work
      {
        begin: "```",
        end: "```+[ ]*$"
      },
      {
        begin: "~~~",
        end: "~~~+[ ]*$"
      },
      { begin: "`.+?`" },
      {
        begin: "(?=^( {4}|\\t))",
        // use contains to gobble up multiple lines to allow the block to be whatever size
        // but only have a single open/close tag vs one per line
        contains: [
          {
            begin: "^( {4}|\\t)",
            end: "(\\n)$"
          }
        ],
        relevance: 0
      }
    ]
  }, p = {
    className: "bullet",
    begin: "^[ 	]*([*+-]|(\\d+\\.))(?=\\s+)",
    end: "\\s+",
    excludeEnd: !0
  }, v = {
    begin: /^\[[^\n]+\]:/,
    returnBegin: !0,
    contains: [
      {
        className: "symbol",
        begin: /\[/,
        end: /\]/,
        excludeBegin: !0,
        excludeEnd: !0
      },
      {
        className: "link",
        begin: /:\s*/,
        end: /$/,
        excludeBegin: !0
      }
    ]
  }, m = /[A-Za-z][A-Za-z0-9+.-]*/, f = {
    variants: [
      // too much like nested array access in so many languages
      // to have any real relevance
      {
        begin: /\[.+?\]\[.*?\]/,
        relevance: 0
      },
      // popular internet URLs
      {
        begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
        relevance: 2
      },
      {
        begin: n.concat(/\[.+?\]\(/, m, /:\/\/.*?\)/),
        relevance: 2
      },
      // relative urls
      {
        begin: /\[.+?\]\([./?&#].*?\)/,
        relevance: 1
      },
      // whatever else, lower relevance (might not be a link at all)
      {
        begin: /\[.*?\]\(.*?\)/,
        relevance: 0
      }
    ],
    returnBegin: !0,
    contains: [
      {
        // empty strings for alt or link text
        match: /\[(?=\])/
      },
      {
        className: "string",
        relevance: 0,
        begin: "\\[",
        end: "\\]",
        excludeBegin: !0,
        returnEnd: !0
      },
      {
        className: "link",
        relevance: 0,
        begin: "\\]\\(",
        end: "\\)",
        excludeBegin: !0,
        excludeEnd: !0
      },
      {
        className: "symbol",
        relevance: 0,
        begin: "\\]\\[",
        end: "\\]",
        excludeBegin: !0,
        excludeEnd: !0
      }
    ]
  }, y = {
    className: "strong",
    contains: [],
    // defined later
    variants: [
      {
        begin: /_{2}(?!\s)/,
        end: /_{2}/
      },
      {
        begin: /\*{2}(?!\s)/,
        end: /\*{2}/
      }
    ]
  }, x = {
    className: "emphasis",
    contains: [],
    // defined later
    variants: [
      {
        begin: /\*(?![*\s])/,
        end: /\*/
      },
      {
        begin: /_(?![_\s])/,
        end: /_/,
        relevance: 0
      }
    ]
  }, A = t.inherit(y, { contains: [] }), w = t.inherit(x, { contains: [] });
  y.contains.push(w), x.contains.push(A);
  let k = [
    r,
    f
  ];
  return [
    y,
    x,
    A,
    w
  ].forEach((H) => {
    H.contains = H.contains.concat(k);
  }), k = k.concat(y, x), {
    name: "Markdown",
    aliases: [
      "md",
      "mkdown",
      "mkd"
    ],
    contains: [
      {
        className: "section",
        variants: [
          {
            begin: "^#{1,6}",
            end: "$",
            contains: k
          },
          {
            begin: "(?=^.+?\\n[=-]{2,}$)",
            contains: [
              { begin: "^[=-]*$" },
              {
                begin: "^",
                end: "\\n",
                contains: k
              }
            ]
          }
        ]
      },
      r,
      p,
      y,
      x,
      {
        className: "quote",
        begin: "^>\\s+",
        contains: k,
        end: "$"
      },
      d,
      s,
      f,
      v,
      {
        //https://spec.commonmark.org/0.31.2/#entity-references
        scope: "literal",
        match: /&([a-zA-Z0-9]+|#[0-9]{1,7}|#[Xx][0-9a-fA-F]{1,6});/
      }
    ]
  };
}
const Cn = (t) => ({
  IMPORTANT: {
    scope: "meta",
    begin: "!important"
  },
  BLOCK_COMMENT: t.C_BLOCK_COMMENT_MODE,
  HEXCOLOR: {
    scope: "number",
    begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
  },
  FUNCTION_DISPATCH: {
    className: "built_in",
    begin: /[\w-]+(?=\()/
  },
  ATTRIBUTE_SELECTOR_MODE: {
    scope: "selector-attr",
    begin: /\[/,
    end: /\]/,
    illegal: "$",
    contains: [
      t.APOS_STRING_MODE,
      t.QUOTE_STRING_MODE
    ]
  },
  CSS_NUMBER_MODE: {
    scope: "number",
    begin: t.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
    relevance: 0
  },
  CSS_VARIABLE: {
    className: "attr",
    begin: /--[A-Za-z_][A-Za-z0-9_-]*/
  }
}), Ln = [
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "audio",
  "b",
  "blockquote",
  "body",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "dd",
  "del",
  "details",
  "dfn",
  "div",
  "dl",
  "dt",
  "em",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "mark",
  "menu",
  "nav",
  "object",
  "ol",
  "optgroup",
  "option",
  "p",
  "picture",
  "q",
  "quote",
  "samp",
  "section",
  "select",
  "source",
  "span",
  "strong",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "ul",
  "var",
  "video"
], Dn = [
  "defs",
  "g",
  "marker",
  "mask",
  "pattern",
  "svg",
  "switch",
  "symbol",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feFlood",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMorphology",
  "feOffset",
  "feSpecularLighting",
  "feTile",
  "feTurbulence",
  "linearGradient",
  "radialGradient",
  "stop",
  "circle",
  "ellipse",
  "image",
  "line",
  "path",
  "polygon",
  "polyline",
  "rect",
  "text",
  "use",
  "textPath",
  "tspan",
  "foreignObject",
  "clipPath"
], Bn = [
  ...Ln,
  ...Dn
], zn = [
  "any-hover",
  "any-pointer",
  "aspect-ratio",
  "color",
  "color-gamut",
  "color-index",
  "device-aspect-ratio",
  "device-height",
  "device-width",
  "display-mode",
  "forced-colors",
  "grid",
  "height",
  "hover",
  "inverted-colors",
  "monochrome",
  "orientation",
  "overflow-block",
  "overflow-inline",
  "pointer",
  "prefers-color-scheme",
  "prefers-contrast",
  "prefers-reduced-motion",
  "prefers-reduced-transparency",
  "resolution",
  "scan",
  "scripting",
  "update",
  "width",
  // TODO: find a better solution?
  "min-width",
  "max-width",
  "min-height",
  "max-height"
].sort().reverse(), Un = [
  "active",
  "any-link",
  "blank",
  "checked",
  "current",
  "default",
  "defined",
  "dir",
  // dir()
  "disabled",
  "drop",
  "empty",
  "enabled",
  "first",
  "first-child",
  "first-of-type",
  "fullscreen",
  "future",
  "focus",
  "focus-visible",
  "focus-within",
  "has",
  // has()
  "host",
  // host or host()
  "host-context",
  // host-context()
  "hover",
  "indeterminate",
  "in-range",
  "invalid",
  "is",
  // is()
  "lang",
  // lang()
  "last-child",
  "last-of-type",
  "left",
  "link",
  "local-link",
  "not",
  // not()
  "nth-child",
  // nth-child()
  "nth-col",
  // nth-col()
  "nth-last-child",
  // nth-last-child()
  "nth-last-col",
  // nth-last-col()
  "nth-last-of-type",
  //nth-last-of-type()
  "nth-of-type",
  //nth-of-type()
  "only-child",
  "only-of-type",
  "optional",
  "out-of-range",
  "past",
  "placeholder-shown",
  "read-only",
  "read-write",
  "required",
  "right",
  "root",
  "scope",
  "target",
  "target-within",
  "user-invalid",
  "valid",
  "visited",
  "where"
  // where()
].sort().reverse(), Pn = [
  "after",
  "backdrop",
  "before",
  "cue",
  "cue-region",
  "first-letter",
  "first-line",
  "grammar-error",
  "marker",
  "part",
  "placeholder",
  "selection",
  "slotted",
  "spelling-error"
].sort().reverse(), $n = [
  "accent-color",
  "align-content",
  "align-items",
  "align-self",
  "alignment-baseline",
  "all",
  "anchor-name",
  "animation",
  "animation-composition",
  "animation-delay",
  "animation-direction",
  "animation-duration",
  "animation-fill-mode",
  "animation-iteration-count",
  "animation-name",
  "animation-play-state",
  "animation-range",
  "animation-range-end",
  "animation-range-start",
  "animation-timeline",
  "animation-timing-function",
  "appearance",
  "aspect-ratio",
  "backdrop-filter",
  "backface-visibility",
  "background",
  "background-attachment",
  "background-blend-mode",
  "background-clip",
  "background-color",
  "background-image",
  "background-origin",
  "background-position",
  "background-position-x",
  "background-position-y",
  "background-repeat",
  "background-size",
  "baseline-shift",
  "block-size",
  "border",
  "border-block",
  "border-block-color",
  "border-block-end",
  "border-block-end-color",
  "border-block-end-style",
  "border-block-end-width",
  "border-block-start",
  "border-block-start-color",
  "border-block-start-style",
  "border-block-start-width",
  "border-block-style",
  "border-block-width",
  "border-bottom",
  "border-bottom-color",
  "border-bottom-left-radius",
  "border-bottom-right-radius",
  "border-bottom-style",
  "border-bottom-width",
  "border-collapse",
  "border-color",
  "border-end-end-radius",
  "border-end-start-radius",
  "border-image",
  "border-image-outset",
  "border-image-repeat",
  "border-image-slice",
  "border-image-source",
  "border-image-width",
  "border-inline",
  "border-inline-color",
  "border-inline-end",
  "border-inline-end-color",
  "border-inline-end-style",
  "border-inline-end-width",
  "border-inline-start",
  "border-inline-start-color",
  "border-inline-start-style",
  "border-inline-start-width",
  "border-inline-style",
  "border-inline-width",
  "border-left",
  "border-left-color",
  "border-left-style",
  "border-left-width",
  "border-radius",
  "border-right",
  "border-right-color",
  "border-right-style",
  "border-right-width",
  "border-spacing",
  "border-start-end-radius",
  "border-start-start-radius",
  "border-style",
  "border-top",
  "border-top-color",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-top-style",
  "border-top-width",
  "border-width",
  "bottom",
  "box-align",
  "box-decoration-break",
  "box-direction",
  "box-flex",
  "box-flex-group",
  "box-lines",
  "box-ordinal-group",
  "box-orient",
  "box-pack",
  "box-shadow",
  "box-sizing",
  "break-after",
  "break-before",
  "break-inside",
  "caption-side",
  "caret-color",
  "clear",
  "clip",
  "clip-path",
  "clip-rule",
  "color",
  "color-interpolation",
  "color-interpolation-filters",
  "color-profile",
  "color-rendering",
  "color-scheme",
  "column-count",
  "column-fill",
  "column-gap",
  "column-rule",
  "column-rule-color",
  "column-rule-style",
  "column-rule-width",
  "column-span",
  "column-width",
  "columns",
  "contain",
  "contain-intrinsic-block-size",
  "contain-intrinsic-height",
  "contain-intrinsic-inline-size",
  "contain-intrinsic-size",
  "contain-intrinsic-width",
  "container",
  "container-name",
  "container-type",
  "content",
  "content-visibility",
  "counter-increment",
  "counter-reset",
  "counter-set",
  "cue",
  "cue-after",
  "cue-before",
  "cursor",
  "cx",
  "cy",
  "direction",
  "display",
  "dominant-baseline",
  "empty-cells",
  "enable-background",
  "field-sizing",
  "fill",
  "fill-opacity",
  "fill-rule",
  "filter",
  "flex",
  "flex-basis",
  "flex-direction",
  "flex-flow",
  "flex-grow",
  "flex-shrink",
  "flex-wrap",
  "float",
  "flood-color",
  "flood-opacity",
  "flow",
  "font",
  "font-display",
  "font-family",
  "font-feature-settings",
  "font-kerning",
  "font-language-override",
  "font-optical-sizing",
  "font-palette",
  "font-size",
  "font-size-adjust",
  "font-smooth",
  "font-smoothing",
  "font-stretch",
  "font-style",
  "font-synthesis",
  "font-synthesis-position",
  "font-synthesis-small-caps",
  "font-synthesis-style",
  "font-synthesis-weight",
  "font-variant",
  "font-variant-alternates",
  "font-variant-caps",
  "font-variant-east-asian",
  "font-variant-emoji",
  "font-variant-ligatures",
  "font-variant-numeric",
  "font-variant-position",
  "font-variation-settings",
  "font-weight",
  "forced-color-adjust",
  "gap",
  "glyph-orientation-horizontal",
  "glyph-orientation-vertical",
  "grid",
  "grid-area",
  "grid-auto-columns",
  "grid-auto-flow",
  "grid-auto-rows",
  "grid-column",
  "grid-column-end",
  "grid-column-start",
  "grid-gap",
  "grid-row",
  "grid-row-end",
  "grid-row-start",
  "grid-template",
  "grid-template-areas",
  "grid-template-columns",
  "grid-template-rows",
  "hanging-punctuation",
  "height",
  "hyphenate-character",
  "hyphenate-limit-chars",
  "hyphens",
  "icon",
  "image-orientation",
  "image-rendering",
  "image-resolution",
  "ime-mode",
  "initial-letter",
  "initial-letter-align",
  "inline-size",
  "inset",
  "inset-area",
  "inset-block",
  "inset-block-end",
  "inset-block-start",
  "inset-inline",
  "inset-inline-end",
  "inset-inline-start",
  "isolation",
  "justify-content",
  "justify-items",
  "justify-self",
  "kerning",
  "left",
  "letter-spacing",
  "lighting-color",
  "line-break",
  "line-height",
  "line-height-step",
  "list-style",
  "list-style-image",
  "list-style-position",
  "list-style-type",
  "margin",
  "margin-block",
  "margin-block-end",
  "margin-block-start",
  "margin-bottom",
  "margin-inline",
  "margin-inline-end",
  "margin-inline-start",
  "margin-left",
  "margin-right",
  "margin-top",
  "margin-trim",
  "marker",
  "marker-end",
  "marker-mid",
  "marker-start",
  "marks",
  "mask",
  "mask-border",
  "mask-border-mode",
  "mask-border-outset",
  "mask-border-repeat",
  "mask-border-slice",
  "mask-border-source",
  "mask-border-width",
  "mask-clip",
  "mask-composite",
  "mask-image",
  "mask-mode",
  "mask-origin",
  "mask-position",
  "mask-repeat",
  "mask-size",
  "mask-type",
  "masonry-auto-flow",
  "math-depth",
  "math-shift",
  "math-style",
  "max-block-size",
  "max-height",
  "max-inline-size",
  "max-width",
  "min-block-size",
  "min-height",
  "min-inline-size",
  "min-width",
  "mix-blend-mode",
  "nav-down",
  "nav-index",
  "nav-left",
  "nav-right",
  "nav-up",
  "none",
  "normal",
  "object-fit",
  "object-position",
  "offset",
  "offset-anchor",
  "offset-distance",
  "offset-path",
  "offset-position",
  "offset-rotate",
  "opacity",
  "order",
  "orphans",
  "outline",
  "outline-color",
  "outline-offset",
  "outline-style",
  "outline-width",
  "overflow",
  "overflow-anchor",
  "overflow-block",
  "overflow-clip-margin",
  "overflow-inline",
  "overflow-wrap",
  "overflow-x",
  "overflow-y",
  "overlay",
  "overscroll-behavior",
  "overscroll-behavior-block",
  "overscroll-behavior-inline",
  "overscroll-behavior-x",
  "overscroll-behavior-y",
  "padding",
  "padding-block",
  "padding-block-end",
  "padding-block-start",
  "padding-bottom",
  "padding-inline",
  "padding-inline-end",
  "padding-inline-start",
  "padding-left",
  "padding-right",
  "padding-top",
  "page",
  "page-break-after",
  "page-break-before",
  "page-break-inside",
  "paint-order",
  "pause",
  "pause-after",
  "pause-before",
  "perspective",
  "perspective-origin",
  "place-content",
  "place-items",
  "place-self",
  "pointer-events",
  "position",
  "position-anchor",
  "position-visibility",
  "print-color-adjust",
  "quotes",
  "r",
  "resize",
  "rest",
  "rest-after",
  "rest-before",
  "right",
  "rotate",
  "row-gap",
  "ruby-align",
  "ruby-position",
  "scale",
  "scroll-behavior",
  "scroll-margin",
  "scroll-margin-block",
  "scroll-margin-block-end",
  "scroll-margin-block-start",
  "scroll-margin-bottom",
  "scroll-margin-inline",
  "scroll-margin-inline-end",
  "scroll-margin-inline-start",
  "scroll-margin-left",
  "scroll-margin-right",
  "scroll-margin-top",
  "scroll-padding",
  "scroll-padding-block",
  "scroll-padding-block-end",
  "scroll-padding-block-start",
  "scroll-padding-bottom",
  "scroll-padding-inline",
  "scroll-padding-inline-end",
  "scroll-padding-inline-start",
  "scroll-padding-left",
  "scroll-padding-right",
  "scroll-padding-top",
  "scroll-snap-align",
  "scroll-snap-stop",
  "scroll-snap-type",
  "scroll-timeline",
  "scroll-timeline-axis",
  "scroll-timeline-name",
  "scrollbar-color",
  "scrollbar-gutter",
  "scrollbar-width",
  "shape-image-threshold",
  "shape-margin",
  "shape-outside",
  "shape-rendering",
  "speak",
  "speak-as",
  "src",
  // @font-face
  "stop-color",
  "stop-opacity",
  "stroke",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-width",
  "tab-size",
  "table-layout",
  "text-align",
  "text-align-all",
  "text-align-last",
  "text-anchor",
  "text-combine-upright",
  "text-decoration",
  "text-decoration-color",
  "text-decoration-line",
  "text-decoration-skip",
  "text-decoration-skip-ink",
  "text-decoration-style",
  "text-decoration-thickness",
  "text-emphasis",
  "text-emphasis-color",
  "text-emphasis-position",
  "text-emphasis-style",
  "text-indent",
  "text-justify",
  "text-orientation",
  "text-overflow",
  "text-rendering",
  "text-shadow",
  "text-size-adjust",
  "text-transform",
  "text-underline-offset",
  "text-underline-position",
  "text-wrap",
  "text-wrap-mode",
  "text-wrap-style",
  "timeline-scope",
  "top",
  "touch-action",
  "transform",
  "transform-box",
  "transform-origin",
  "transform-style",
  "transition",
  "transition-behavior",
  "transition-delay",
  "transition-duration",
  "transition-property",
  "transition-timing-function",
  "translate",
  "unicode-bidi",
  "user-modify",
  "user-select",
  "vector-effect",
  "vertical-align",
  "view-timeline",
  "view-timeline-axis",
  "view-timeline-inset",
  "view-timeline-name",
  "view-transition-name",
  "visibility",
  "voice-balance",
  "voice-duration",
  "voice-family",
  "voice-pitch",
  "voice-range",
  "voice-rate",
  "voice-stress",
  "voice-volume",
  "white-space",
  "white-space-collapse",
  "widows",
  "width",
  "will-change",
  "word-break",
  "word-spacing",
  "word-wrap",
  "writing-mode",
  "x",
  "y",
  "z-index",
  "zoom"
].sort().reverse();
function Hn(t) {
  const n = Cn(t), r = Pn, s = Un, d = "@[a-z-]+", p = "and or not only", m = {
    className: "variable",
    begin: "(\\$" + "[a-zA-Z-][a-zA-Z0-9_-]*" + ")\\b",
    relevance: 0
  };
  return {
    name: "SCSS",
    case_insensitive: !0,
    illegal: "[=/|']",
    contains: [
      t.C_LINE_COMMENT_MODE,
      t.C_BLOCK_COMMENT_MODE,
      // to recognize keyframe 40% etc which are outside the scope of our
      // attribute value mode
      n.CSS_NUMBER_MODE,
      {
        className: "selector-id",
        begin: "#[A-Za-z0-9_-]+",
        relevance: 0
      },
      {
        className: "selector-class",
        begin: "\\.[A-Za-z0-9_-]+",
        relevance: 0
      },
      n.ATTRIBUTE_SELECTOR_MODE,
      {
        className: "selector-tag",
        begin: "\\b(" + Bn.join("|") + ")\\b",
        // was there, before, but why?
        relevance: 0
      },
      {
        className: "selector-pseudo",
        begin: ":(" + s.join("|") + ")"
      },
      {
        className: "selector-pseudo",
        begin: ":(:)?(" + r.join("|") + ")"
      },
      m,
      {
        // pseudo-selector params
        begin: /\(/,
        end: /\)/,
        contains: [n.CSS_NUMBER_MODE]
      },
      n.CSS_VARIABLE,
      {
        className: "attribute",
        begin: "\\b(" + $n.join("|") + ")\\b"
      },
      { begin: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b" },
      {
        begin: /:/,
        end: /[;}{]/,
        relevance: 0,
        contains: [
          n.BLOCK_COMMENT,
          m,
          n.HEXCOLOR,
          n.CSS_NUMBER_MODE,
          t.QUOTE_STRING_MODE,
          t.APOS_STRING_MODE,
          n.IMPORTANT,
          n.FUNCTION_DISPATCH
        ]
      },
      // matching these here allows us to treat them more like regular CSS
      // rules so everything between the {} gets regular rule highlighting,
      // which is what we want for page and font-face
      {
        begin: "@(page|font-face)",
        keywords: {
          $pattern: d,
          keyword: "@page @font-face"
        }
      },
      {
        begin: "@",
        end: "[{;]",
        returnBegin: !0,
        keywords: {
          $pattern: /[a-z-]+/,
          keyword: p,
          attribute: zn.join(" ")
        },
        contains: [
          {
            begin: d,
            className: "keyword"
          },
          {
            begin: /[a-z-]+(?=:)/,
            className: "attribute"
          },
          m,
          t.QUOTE_STRING_MODE,
          t.APOS_STRING_MODE,
          n.HEXCOLOR,
          n.CSS_NUMBER_MODE
        ]
      },
      n.FUNCTION_DISPATCH
    ]
  };
}
const Ie = "[A-Za-z$_][0-9A-Za-z$_]*", pt = [
  "as",
  // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends",
  // It's reached stage 3, which is "recommended for implementation":
  "using"
], ft = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
], ht = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
], mt = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
], Et = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",
  "require",
  "exports",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
], _t = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "global"
  // Node.js
], yt = [].concat(
  Et,
  ht,
  mt
);
function Gn(t) {
  const n = t.regex, r = (O, { after: F }) => {
    const W = "</" + O[0].slice(1);
    return O.input.indexOf(W, F) !== -1;
  }, s = Ie, d = {
    begin: "<>",
    end: "</>"
  }, p = /<[A-Za-z0-9\\._:-]+\s*\/>/, v = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (O, F) => {
      const W = O[0].length + O.index, q = O.input[W];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        q === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        q === ","
      ) {
        F.ignoreMatch();
        return;
      }
      q === ">" && (r(O, { after: W }) || F.ignoreMatch());
      let re;
      const le = O.input.substring(W);
      if (re = le.match(/^\s*=/)) {
        F.ignoreMatch();
        return;
      }
      if ((re = le.match(/^\s+extends\s+/)) && re.index === 0) {
        F.ignoreMatch();
        return;
      }
    }
  }, m = {
    $pattern: Ie,
    keyword: pt,
    literal: ft,
    built_in: yt,
    "variable.language": _t
  }, f = "[0-9](_?[0-9])*", y = `\\.(${f})`, x = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", A = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${x})((${y})|\\.)?|(${y}))[eE][+-]?(${f})\\b` },
      { begin: `\\b(${x})\\b((${y})\\b|\\.)?|(${y})\\b` },
      // DecimalBigIntegerLiteral
      { begin: "\\b(0|[1-9](_?[0-9])*)n\\b" },
      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" }
    ],
    relevance: 0
  }, w = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: m,
    contains: []
    // defined later
  }, k = {
    begin: ".?html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        t.BACKSLASH_ESCAPE,
        w
      ],
      subLanguage: "xml"
    }
  }, C = {
    begin: ".?css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        t.BACKSLASH_ESCAPE,
        w
      ],
      subLanguage: "css"
    }
  }, T = {
    begin: ".?gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        t.BACKSLASH_ESCAPE,
        w
      ],
      subLanguage: "graphql"
    }
  }, L = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      t.BACKSLASH_ESCAPE,
      w
    ]
  }, j = {
    className: "comment",
    variants: [
      t.COMMENT(
        /\/\*\*(?!\/)/,
        "\\*/",
        {
          relevance: 0,
          contains: [
            {
              begin: "(?=@[A-Za-z]+)",
              relevance: 0,
              contains: [
                {
                  className: "doctag",
                  begin: "@[A-Za-z]+"
                },
                {
                  className: "type",
                  begin: "\\{",
                  end: "\\}",
                  excludeEnd: !0,
                  excludeBegin: !0,
                  relevance: 0
                },
                {
                  className: "variable",
                  begin: s + "(?=\\s*(-)|$)",
                  endsParent: !0,
                  relevance: 0
                },
                // eat spaces (not newlines) so we can find
                // types or variables
                {
                  begin: /(?=[^\n])\s/,
                  relevance: 0
                }
              ]
            }
          ]
        }
      ),
      t.C_BLOCK_COMMENT_MODE,
      t.C_LINE_COMMENT_MODE
    ]
  }, Y = [
    t.APOS_STRING_MODE,
    t.QUOTE_STRING_MODE,
    k,
    C,
    T,
    L,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    A
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  w.contains = Y.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: m,
    contains: [
      "self"
    ].concat(Y)
  });
  const te = [].concat(j, w.contains), Z = te.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: m,
      contains: ["self"].concat(te)
    }
  ]), K = {
    className: "params",
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/,
    // to match the parms with
    end: /\)/,
    excludeBegin: !0,
    excludeEnd: !0,
    keywords: m,
    contains: Z
  }, ue = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          s,
          /\s+/,
          /extends/,
          /\s+/,
          n.concat(s, "(", n.concat(/\./, s), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          s
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      }
    ]
  }, ne = {
    relevance: 0,
    match: n.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...ht,
        ...mt
      ]
    }
  }, be = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  }, pe = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          s,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [K],
    illegal: /%/
  }, fe = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function Ee(O) {
    return n.concat("(?!", O.join("|"), ")");
  }
  const _e = {
    match: n.concat(
      /\b/,
      Ee([
        ...Et,
        "super",
        "import"
      ].map((O) => `${O}\\s*\\(`)),
      s,
      n.lookahead(/\s*\(/)
    ),
    className: "title.function",
    relevance: 0
  }, ie = {
    begin: n.concat(/\./, n.lookahead(
      n.concat(s, /(?![0-9A-Za-z$_(])/)
    )),
    end: s,
    excludeBegin: !0,
    keywords: "prototype",
    className: "property",
    relevance: 0
  }, ye = {
    match: [
      /get|set/,
      /\s+/,
      s,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      {
        // eat to avoid empty params
        begin: /\(\)/
      },
      K
    ]
  }, ce = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + t.UNDERSCORE_IDENT_RE + ")\\s*=>", ve = {
    match: [
      /const|var|let/,
      /\s+/,
      s,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      n.lookahead(ce)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      K
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: m,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS: Z, CLASS_REFERENCE: ne },
    illegal: /#(?![$_A-z])/,
    contains: [
      t.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      be,
      t.APOS_STRING_MODE,
      t.QUOTE_STRING_MODE,
      k,
      C,
      T,
      L,
      j,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      A,
      ne,
      {
        scope: "attr",
        match: s + n.lookahead(":"),
        relevance: 0
      },
      ve,
      {
        // "value" container
        begin: "(" + t.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          j,
          t.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: ce,
            returnBegin: !0,
            end: "\\s*=>",
            contains: [
              {
                className: "params",
                variants: [
                  {
                    begin: t.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: !0
                  },
                  {
                    begin: /(\s*)\(/,
                    end: /\)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    keywords: m,
                    contains: Z
                  }
                ]
              }
            ]
          },
          {
            // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          {
            // JSX
            variants: [
              { begin: d.begin, end: d.end },
              { match: p },
              {
                begin: v.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": v.isTrulyOpeningTag,
                end: v.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: v.begin,
                end: v.end,
                skip: !0,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      pe,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: "\\b(?!function)" + t.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        // end parens
        returnBegin: !0,
        label: "func.def",
        contains: [
          K,
          t.inherit(t.TITLE_MODE, { begin: s, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      ie,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: "\\$" + s,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [K]
      },
      _e,
      fe,
      ue,
      ye,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
function jn(t) {
  const n = t.regex, r = Gn(t), s = Ie, d = [
    "any",
    "void",
    "number",
    "boolean",
    "string",
    "object",
    "never",
    "symbol",
    "bigint",
    "unknown"
  ], p = {
    begin: [
      /namespace/,
      /\s+/,
      t.IDENT_RE
    ],
    beginScope: {
      1: "keyword",
      3: "title.class"
    }
  }, v = {
    beginKeywords: "interface",
    end: /\{/,
    excludeEnd: !0,
    keywords: {
      keyword: "interface extends",
      built_in: d
    },
    contains: [r.exports.CLASS_REFERENCE]
  }, m = {
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use strict['"]/
  }, f = [
    "type",
    // "namespace",
    "interface",
    "public",
    "private",
    "protected",
    "implements",
    "declare",
    "abstract",
    "readonly",
    "enum",
    "override",
    "satisfies"
  ], y = {
    $pattern: Ie,
    keyword: pt.concat(f),
    literal: ft,
    built_in: yt.concat(d),
    "variable.language": _t
  }, x = {
    className: "meta",
    begin: "@" + s
  }, A = (T, L, H) => {
    const j = T.contains.findIndex((Y) => Y.label === L);
    if (j === -1)
      throw new Error("can not find mode to replace");
    T.contains.splice(j, 1, H);
  };
  Object.assign(r.keywords, y), r.exports.PARAMS_CONTAINS.push(x);
  const w = r.contains.find((T) => T.scope === "attr"), k = Object.assign(
    {},
    w,
    { match: n.concat(s, n.lookahead(/\s*\?:/)) }
  );
  r.exports.PARAMS_CONTAINS.push([
    r.exports.CLASS_REFERENCE,
    // class reference for highlighting the params types
    w,
    // highlight the params key
    k
    // Added for optional property assignment highlighting
  ]), r.contains = r.contains.concat([
    x,
    p,
    v,
    k
    // Added for optional property assignment highlighting
  ]), A(r, "shebang", t.SHEBANG()), A(r, "use_strict", m);
  const C = r.contains.find((T) => T.label === "func.def");
  return C.relevance = 0, Object.assign(r, {
    name: "TypeScript",
    aliases: [
      "ts",
      "tsx",
      "mts",
      "cts"
    ]
  }), r;
}
function Fn(t) {
  const n = t.regex, r = n.concat(/[\p{L}_]/u, n.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u), s = /[\p{L}0-9._:-]+/u, d = {
    className: "symbol",
    begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
  }, p = {
    begin: /\s/,
    contains: [
      {
        className: "keyword",
        begin: /#?[a-z_][a-z1-9_-]+/,
        illegal: /\n/
      }
    ]
  }, v = t.inherit(p, {
    begin: /\(/,
    end: /\)/
  }), m = t.inherit(t.APOS_STRING_MODE, { className: "string" }), f = t.inherit(t.QUOTE_STRING_MODE, { className: "string" }), y = {
    endsWithParent: !0,
    illegal: /</,
    relevance: 0,
    contains: [
      {
        className: "attr",
        begin: s,
        relevance: 0
      },
      {
        begin: /=\s*/,
        relevance: 0,
        contains: [
          {
            className: "string",
            endsParent: !0,
            variants: [
              {
                begin: /"/,
                end: /"/,
                contains: [d]
              },
              {
                begin: /'/,
                end: /'/,
                contains: [d]
              },
              { begin: /[^\s"'=<>`]+/ }
            ]
          }
        ]
      }
    ]
  };
  return {
    name: "HTML, XML",
    aliases: [
      "html",
      "xhtml",
      "rss",
      "atom",
      "xjb",
      "xsd",
      "xsl",
      "plist",
      "wsf",
      "svg"
    ],
    case_insensitive: !0,
    unicodeRegex: !0,
    contains: [
      {
        className: "meta",
        begin: /<![a-z]/,
        end: />/,
        relevance: 10,
        contains: [
          p,
          f,
          m,
          v,
          {
            begin: /\[/,
            end: /\]/,
            contains: [
              {
                className: "meta",
                begin: /<![a-z]/,
                end: />/,
                contains: [
                  p,
                  v,
                  f,
                  m
                ]
              }
            ]
          }
        ]
      },
      t.COMMENT(
        /<!--/,
        /-->/,
        { relevance: 10 }
      ),
      {
        begin: /<!\[CDATA\[/,
        end: /\]\]>/,
        relevance: 10
      },
      d,
      // xml processing instructions
      {
        className: "meta",
        end: /\?>/,
        variants: [
          {
            begin: /<\?xml/,
            relevance: 10,
            contains: [
              f
            ]
          },
          {
            begin: /<\?[a-z][a-z0-9]+/
          }
        ]
      },
      {
        className: "tag",
        /*
        The lookahead pattern (?=...) ensures that 'begin' only matches
        '<style' as a single word, followed by a whitespace or an
        ending bracket.
        */
        begin: /<style(?=\s|>)/,
        end: />/,
        keywords: { name: "style" },
        contains: [y],
        starts: {
          end: /<\/style>/,
          returnEnd: !0,
          subLanguage: [
            "css",
            "xml"
          ]
        }
      },
      {
        className: "tag",
        // See the comment in the <style tag about the lookahead pattern
        begin: /<script(?=\s|>)/,
        end: />/,
        keywords: { name: "script" },
        contains: [y],
        starts: {
          end: /<\/script>/,
          returnEnd: !0,
          subLanguage: [
            "javascript",
            "handlebars",
            "xml"
          ]
        }
      },
      // we need this for now for jSX
      {
        className: "tag",
        begin: /<>|<\/>/
      },
      // open tag
      {
        className: "tag",
        begin: n.concat(
          /</,
          n.lookahead(n.concat(
            r,
            // <tag/>
            // <tag>
            // <tag ...
            n.either(/\/>/, />/, /\s/)
          ))
        ),
        end: /\/?>/,
        contains: [
          {
            className: "name",
            begin: r,
            relevance: 0,
            starts: y
          }
        ]
      },
      // close tag
      {
        className: "tag",
        begin: n.concat(
          /<\//,
          n.lookahead(n.concat(
            r,
            />/
          ))
        ),
        contains: [
          {
            className: "name",
            begin: r,
            relevance: 0
          },
          {
            begin: />/,
            relevance: 0,
            endsParent: !0
          }
        ]
      }
    ]
  };
}
function Zn(t) {
  const n = "true false yes no null", r = "[\\w#;/?:@&=+$,.~*'()[\\]]+", s = {
    className: "attr",
    variants: [
      // added brackets support and special char support
      { begin: /[\w*@][\w*@ :()\./-]*:(?=[ \t]|$)/ },
      {
        // double quoted keys - with brackets and special char support
        begin: /"[\w*@][\w*@ :()\./-]*":(?=[ \t]|$)/
      },
      {
        // single quoted keys - with brackets and special char support
        begin: /'[\w*@][\w*@ :()\./-]*':(?=[ \t]|$)/
      }
    ]
  }, d = {
    className: "template-variable",
    variants: [
      {
        // jinja templates Ansible
        begin: /\{\{/,
        end: /\}\}/
      },
      {
        // Ruby i18n
        begin: /%\{/,
        end: /\}/
      }
    ]
  }, p = {
    className: "string",
    relevance: 0,
    begin: /'/,
    end: /'/,
    contains: [
      {
        match: /''/,
        scope: "char.escape",
        relevance: 0
      }
    ]
  }, v = {
    className: "string",
    relevance: 0,
    variants: [
      {
        begin: /"/,
        end: /"/
      },
      { begin: /\S+/ }
    ],
    contains: [
      t.BACKSLASH_ESCAPE,
      d
    ]
  }, m = t.inherit(v, { variants: [
    {
      begin: /'/,
      end: /'/,
      contains: [
        {
          begin: /''/,
          relevance: 0
        }
      ]
    },
    {
      begin: /"/,
      end: /"/
    },
    { begin: /[^\s,{}[\]]+/ }
  ] }), w = {
    className: "number",
    begin: "\\b" + "[0-9]{4}(-[0-9][0-9]){0,2}" + "([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?" + "(\\.[0-9]*)?" + "([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?" + "\\b"
  }, k = {
    end: ",",
    endsWithParent: !0,
    excludeEnd: !0,
    keywords: n,
    relevance: 0
  }, C = {
    begin: /\{/,
    end: /\}/,
    contains: [k],
    illegal: "\\n",
    relevance: 0
  }, T = {
    begin: "\\[",
    end: "\\]",
    contains: [k],
    illegal: "\\n",
    relevance: 0
  }, L = [
    s,
    {
      className: "meta",
      begin: "^---\\s*$",
      relevance: 10
    },
    {
      // multi line string
      // Blocks start with a | or > followed by a newline
      //
      // Indentation of subsequent lines must be the same to
      // be considered part of the block
      className: "string",
      begin: "[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*"
    },
    {
      // Ruby/Rails erb
      begin: "<%[%=-]?",
      end: "[%-]?%>",
      subLanguage: "ruby",
      excludeBegin: !0,
      excludeEnd: !0,
      relevance: 0
    },
    {
      // named tags
      className: "type",
      begin: "!\\w+!" + r
    },
    // https://yaml.org/spec/1.2/spec.html#id2784064
    {
      // verbatim tags
      className: "type",
      begin: "!<" + r + ">"
    },
    {
      // primary tags
      className: "type",
      begin: "!" + r
    },
    {
      // secondary tags
      className: "type",
      begin: "!!" + r
    },
    {
      // fragment id &ref
      className: "meta",
      begin: "&" + t.UNDERSCORE_IDENT_RE + "$"
    },
    {
      // fragment reference *ref
      className: "meta",
      begin: "\\*" + t.UNDERSCORE_IDENT_RE + "$"
    },
    {
      // array listing
      className: "bullet",
      // TODO: remove |$ hack when we have proper look-ahead support
      begin: "-(?=[ ]|$)",
      relevance: 0
    },
    t.HASH_COMMENT_MODE,
    {
      beginKeywords: n,
      keywords: { literal: n }
    },
    w,
    // numbers are any valid C-style number that
    // sit isolated from other words
    {
      className: "number",
      begin: t.C_NUMBER_RE + "\\b",
      relevance: 0
    },
    C,
    T,
    p,
    v
  ], H = [...L];
  return H.pop(), H.push(m), k.contains = H, {
    name: "YAML",
    case_insensitive: !0,
    aliases: ["yml"],
    contains: L
  };
}
function Kn(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var He, ct;
function Wn() {
  if (ct) return He;
  ct = 1;
  function t(e) {
    return e instanceof Map ? e.clear = e.delete = e.set = function() {
      throw new Error("map is read-only");
    } : e instanceof Set && (e.add = e.clear = e.delete = function() {
      throw new Error("set is read-only");
    }), Object.freeze(e), Object.getOwnPropertyNames(e).forEach((i) => {
      const a = e[i], E = typeof a;
      (E === "object" || E === "function") && !Object.isFrozen(a) && t(a);
    }), e;
  }
  class n {
    /**
     * @param {CompiledMode} mode
     */
    constructor(i) {
      i.data === void 0 && (i.data = {}), this.data = i.data, this.isMatchIgnored = !1;
    }
    ignoreMatch() {
      this.isMatchIgnored = !0;
    }
  }
  function r(e) {
    return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
  }
  function s(e, ...i) {
    const a = /* @__PURE__ */ Object.create(null);
    for (const E in e)
      a[E] = e[E];
    return i.forEach(function(E) {
      for (const D in E)
        a[D] = E[D];
    }), /** @type {T} */
    a;
  }
  const d = "</span>", p = (e) => !!e.scope, v = (e, { prefix: i }) => {
    if (e.startsWith("language:"))
      return e.replace("language:", "language-");
    if (e.includes(".")) {
      const a = e.split(".");
      return [
        `${i}${a.shift()}`,
        ...a.map((E, D) => `${E}${"_".repeat(D + 1)}`)
      ].join(" ");
    }
    return `${i}${e}`;
  };
  class m {
    /**
     * Creates a new HTMLRenderer
     *
     * @param {Tree} parseTree - the parse tree (must support `walk` API)
     * @param {{classPrefix: string}} options
     */
    constructor(i, a) {
      this.buffer = "", this.classPrefix = a.classPrefix, i.walk(this);
    }
    /**
     * Adds texts to the output stream
     *
     * @param {string} text */
    addText(i) {
      this.buffer += r(i);
    }
    /**
     * Adds a node open to the output stream (if needed)
     *
     * @param {Node} node */
    openNode(i) {
      if (!p(i)) return;
      const a = v(
        i.scope,
        { prefix: this.classPrefix }
      );
      this.span(a);
    }
    /**
     * Adds a node close to the output stream (if needed)
     *
     * @param {Node} node */
    closeNode(i) {
      p(i) && (this.buffer += d);
    }
    /**
     * returns the accumulated buffer
    */
    value() {
      return this.buffer;
    }
    // helpers
    /**
     * Builds a span element
     *
     * @param {string} className */
    span(i) {
      this.buffer += `<span class="${i}">`;
    }
  }
  const f = (e = {}) => {
    const i = { children: [] };
    return Object.assign(i, e), i;
  };
  class y {
    constructor() {
      this.rootNode = f(), this.stack = [this.rootNode];
    }
    get top() {
      return this.stack[this.stack.length - 1];
    }
    get root() {
      return this.rootNode;
    }
    /** @param {Node} node */
    add(i) {
      this.top.children.push(i);
    }
    /** @param {string} scope */
    openNode(i) {
      const a = f({ scope: i });
      this.add(a), this.stack.push(a);
    }
    closeNode() {
      if (this.stack.length > 1)
        return this.stack.pop();
    }
    closeAllNodes() {
      for (; this.closeNode(); ) ;
    }
    toJSON() {
      return JSON.stringify(this.rootNode, null, 4);
    }
    /**
     * @typedef { import("./html_renderer").Renderer } Renderer
     * @param {Renderer} builder
     */
    walk(i) {
      return this.constructor._walk(i, this.rootNode);
    }
    /**
     * @param {Renderer} builder
     * @param {Node} node
     */
    static _walk(i, a) {
      return typeof a == "string" ? i.addText(a) : a.children && (i.openNode(a), a.children.forEach((E) => this._walk(i, E)), i.closeNode(a)), i;
    }
    /**
     * @param {Node} node
     */
    static _collapse(i) {
      typeof i != "string" && i.children && (i.children.every((a) => typeof a == "string") ? i.children = [i.children.join("")] : i.children.forEach((a) => {
        y._collapse(a);
      }));
    }
  }
  class x extends y {
    /**
     * @param {*} options
     */
    constructor(i) {
      super(), this.options = i;
    }
    /**
     * @param {string} text
     */
    addText(i) {
      i !== "" && this.add(i);
    }
    /** @param {string} scope */
    startScope(i) {
      this.openNode(i);
    }
    endScope() {
      this.closeNode();
    }
    /**
     * @param {Emitter & {root: DataNode}} emitter
     * @param {string} name
     */
    __addSublanguage(i, a) {
      const E = i.root;
      a && (E.scope = `language:${a}`), this.add(E);
    }
    toHTML() {
      return new m(this, this.options).value();
    }
    finalize() {
      return this.closeAllNodes(), !0;
    }
  }
  function A(e) {
    return e ? typeof e == "string" ? e : e.source : null;
  }
  function w(e) {
    return T("(?=", e, ")");
  }
  function k(e) {
    return T("(?:", e, ")*");
  }
  function C(e) {
    return T("(?:", e, ")?");
  }
  function T(...e) {
    return e.map((a) => A(a)).join("");
  }
  function L(e) {
    const i = e[e.length - 1];
    return typeof i == "object" && i.constructor === Object ? (e.splice(e.length - 1, 1), i) : {};
  }
  function H(...e) {
    return "(" + (L(e).capture ? "" : "?:") + e.map((E) => A(E)).join("|") + ")";
  }
  function j(e) {
    return new RegExp(e.toString() + "|").exec("").length - 1;
  }
  function Y(e, i) {
    const a = e && e.exec(i);
    return a && a.index === 0;
  }
  const te = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
  function Z(e, { joinWith: i }) {
    let a = 0;
    return e.map((E) => {
      a += 1;
      const D = a;
      let B = A(E), g = "";
      for (; B.length > 0; ) {
        const l = te.exec(B);
        if (!l) {
          g += B;
          break;
        }
        g += B.substring(0, l.index), B = B.substring(l.index + l[0].length), l[0][0] === "\\" && l[1] ? g += "\\" + String(Number(l[1]) + D) : (g += l[0], l[0] === "(" && a++);
      }
      return g;
    }).map((E) => `(${E})`).join(i);
  }
  const K = /\b\B/, ue = "[a-zA-Z]\\w*", ne = "[a-zA-Z_]\\w*", be = "\\b\\d+(\\.\\d+)?", pe = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", fe = "\\b(0b[01]+)", Ee = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", _e = (e = {}) => {
    const i = /^#![ ]*\//;
    return e.binary && (e.begin = T(
      i,
      /.*\b/,
      e.binary,
      /\b.*/
    )), s({
      scope: "meta",
      begin: i,
      end: /$/,
      relevance: 0,
      /** @type {ModeCallback} */
      "on:begin": (a, E) => {
        a.index !== 0 && E.ignoreMatch();
      }
    }, e);
  }, ie = {
    begin: "\\\\[\\s\\S]",
    relevance: 0
  }, ye = {
    scope: "string",
    begin: "'",
    end: "'",
    illegal: "\\n",
    contains: [ie]
  }, ce = {
    scope: "string",
    begin: '"',
    end: '"',
    illegal: "\\n",
    contains: [ie]
  }, ve = {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
  }, O = function(e, i, a = {}) {
    const E = s(
      {
        scope: "comment",
        begin: e,
        end: i,
        contains: []
      },
      a
    );
    E.contains.push({
      scope: "doctag",
      // hack to avoid the space from being included. the space is necessary to
      // match here to prevent the plain text rule below from gobbling up doctags
      begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
      end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
      excludeBegin: !0,
      relevance: 0
    });
    const D = H(
      // list of common 1 and 2 letter words in English
      "I",
      "a",
      "is",
      "so",
      "us",
      "to",
      "at",
      "if",
      "in",
      "it",
      "on",
      // note: this is not an exhaustive list of contractions, just popular ones
      /[A-Za-z]+['](d|ve|re|ll|t|s|n)/,
      // contractions - can't we'd they're let's, etc
      /[A-Za-z]+[-][a-z]+/,
      // `no-way`, etc.
      /[A-Za-z][a-z]{2,}/
      // allow capitalized words at beginning of sentences
    );
    return E.contains.push(
      {
        // TODO: how to include ", (, ) without breaking grammars that use these for
        // comment delimiters?
        // begin: /[ ]+([()"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()":]?([.][ ]|[ ]|\))){3}/
        // ---
        // this tries to find sequences of 3 english words in a row (without any
        // "programming" type syntax) this gives us a strong signal that we've
        // TRULY found a comment - vs perhaps scanning with the wrong language.
        // It's possible to find something that LOOKS like the start of the
        // comment - but then if there is no readable text - good chance it is a
        // false match and not a comment.
        //
        // for a visual example please see:
        // https://github.com/highlightjs/highlight.js/issues/2827
        begin: T(
          /[ ]+/,
          // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
          "(",
          D,
          /[.]?[:]?([.][ ]|[ ])/,
          "){3}"
        )
        // look for 3 words in a row
      }
    ), E;
  }, F = O("//", "$"), W = O("/\\*", "\\*/"), q = O("#", "$"), re = {
    scope: "number",
    begin: be,
    relevance: 0
  }, le = {
    scope: "number",
    begin: pe,
    relevance: 0
  }, vt = {
    scope: "number",
    begin: fe,
    relevance: 0
  }, wt = {
    scope: "regexp",
    begin: /\/(?=[^/\n]*\/)/,
    end: /\/[gimuy]*/,
    contains: [
      ie,
      {
        begin: /\[/,
        end: /\]/,
        relevance: 0,
        contains: [ie]
      }
    ]
  }, Nt = {
    scope: "title",
    begin: ue,
    relevance: 0
  }, kt = {
    scope: "title",
    begin: ne,
    relevance: 0
  }, St = {
    // excludes method names from keyword processing
    begin: "\\.\\s*" + ne,
    relevance: 0
  };
  var Ne = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    APOS_STRING_MODE: ye,
    BACKSLASH_ESCAPE: ie,
    BINARY_NUMBER_MODE: vt,
    BINARY_NUMBER_RE: fe,
    COMMENT: O,
    C_BLOCK_COMMENT_MODE: W,
    C_LINE_COMMENT_MODE: F,
    C_NUMBER_MODE: le,
    C_NUMBER_RE: pe,
    END_SAME_AS_BEGIN: function(e) {
      return Object.assign(
        e,
        {
          /** @type {ModeCallback} */
          "on:begin": (i, a) => {
            a.data._beginMatch = i[1];
          },
          /** @type {ModeCallback} */
          "on:end": (i, a) => {
            a.data._beginMatch !== i[1] && a.ignoreMatch();
          }
        }
      );
    },
    HASH_COMMENT_MODE: q,
    IDENT_RE: ue,
    MATCH_NOTHING_RE: K,
    METHOD_GUARD: St,
    NUMBER_MODE: re,
    NUMBER_RE: be,
    PHRASAL_WORDS_MODE: ve,
    QUOTE_STRING_MODE: ce,
    REGEXP_MODE: wt,
    RE_STARTERS_RE: Ee,
    SHEBANG: _e,
    TITLE_MODE: Nt,
    UNDERSCORE_IDENT_RE: ne,
    UNDERSCORE_TITLE_MODE: kt
  });
  function xt(e, i) {
    e.input[e.index - 1] === "." && i.ignoreMatch();
  }
  function Tt(e, i) {
    e.className !== void 0 && (e.scope = e.className, delete e.className);
  }
  function At(e, i) {
    i && e.beginKeywords && (e.begin = "\\b(" + e.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", e.__beforeBegin = xt, e.keywords = e.keywords || e.beginKeywords, delete e.beginKeywords, e.relevance === void 0 && (e.relevance = 0));
  }
  function Ot(e, i) {
    Array.isArray(e.illegal) && (e.illegal = H(...e.illegal));
  }
  function Rt(e, i) {
    if (e.match) {
      if (e.begin || e.end) throw new Error("begin & end are not supported with match");
      e.begin = e.match, delete e.match;
    }
  }
  function Mt(e, i) {
    e.relevance === void 0 && (e.relevance = 1);
  }
  const It = (e, i) => {
    if (!e.beforeMatch) return;
    if (e.starts) throw new Error("beforeMatch cannot be used with starts");
    const a = Object.assign({}, e);
    Object.keys(e).forEach((E) => {
      delete e[E];
    }), e.keywords = a.keywords, e.begin = T(a.beforeMatch, w(a.begin)), e.starts = {
      relevance: 0,
      contains: [
        Object.assign(a, { endsParent: !0 })
      ]
    }, e.relevance = 0, delete a.beforeMatch;
  }, Ct = [
    "of",
    "and",
    "for",
    "in",
    "not",
    "or",
    "if",
    "then",
    "parent",
    // common variable name
    "list",
    // common variable name
    "value"
    // common variable name
  ], Lt = "keyword";
  function Fe(e, i, a = Lt) {
    const E = /* @__PURE__ */ Object.create(null);
    return typeof e == "string" ? D(a, e.split(" ")) : Array.isArray(e) ? D(a, e) : Object.keys(e).forEach(function(B) {
      Object.assign(
        E,
        Fe(e[B], i, B)
      );
    }), E;
    function D(B, g) {
      i && (g = g.map((l) => l.toLowerCase())), g.forEach(function(l) {
        const h = l.split("|");
        E[h[0]] = [B, Dt(h[0], h[1])];
      });
    }
  }
  function Dt(e, i) {
    return i ? Number(i) : Bt(e) ? 0 : 1;
  }
  function Bt(e) {
    return Ct.includes(e.toLowerCase());
  }
  const Ze = {}, de = (e) => {
    console.error(e);
  }, Ke = (e, ...i) => {
    console.log(`WARN: ${e}`, ...i);
  }, he = (e, i) => {
    Ze[`${e}/${i}`] || (console.log(`Deprecated as of ${e}. ${i}`), Ze[`${e}/${i}`] = !0);
  }, ke = new Error();
  function We(e, i, { key: a }) {
    let E = 0;
    const D = e[a], B = {}, g = {};
    for (let l = 1; l <= i.length; l++)
      g[l + E] = D[l], B[l + E] = !0, E += j(i[l - 1]);
    e[a] = g, e[a]._emit = B, e[a]._multi = !0;
  }
  function zt(e) {
    if (Array.isArray(e.begin)) {
      if (e.skip || e.excludeBegin || e.returnBegin)
        throw de("skip, excludeBegin, returnBegin not compatible with beginScope: {}"), ke;
      if (typeof e.beginScope != "object" || e.beginScope === null)
        throw de("beginScope must be object"), ke;
      We(e, e.begin, { key: "beginScope" }), e.begin = Z(e.begin, { joinWith: "" });
    }
  }
  function Ut(e) {
    if (Array.isArray(e.end)) {
      if (e.skip || e.excludeEnd || e.returnEnd)
        throw de("skip, excludeEnd, returnEnd not compatible with endScope: {}"), ke;
      if (typeof e.endScope != "object" || e.endScope === null)
        throw de("endScope must be object"), ke;
      We(e, e.end, { key: "endScope" }), e.end = Z(e.end, { joinWith: "" });
    }
  }
  function Pt(e) {
    e.scope && typeof e.scope == "object" && e.scope !== null && (e.beginScope = e.scope, delete e.scope);
  }
  function $t(e) {
    Pt(e), typeof e.beginScope == "string" && (e.beginScope = { _wrap: e.beginScope }), typeof e.endScope == "string" && (e.endScope = { _wrap: e.endScope }), zt(e), Ut(e);
  }
  function Ht(e) {
    function i(g, l) {
      return new RegExp(
        A(g),
        "m" + (e.case_insensitive ? "i" : "") + (e.unicodeRegex ? "u" : "") + (l ? "g" : "")
      );
    }
    class a {
      constructor() {
        this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
      }
      // @ts-ignore
      addRule(l, h) {
        h.position = this.position++, this.matchIndexes[this.matchAt] = h, this.regexes.push([h, l]), this.matchAt += j(l) + 1;
      }
      compile() {
        this.regexes.length === 0 && (this.exec = () => null);
        const l = this.regexes.map((h) => h[1]);
        this.matcherRe = i(Z(l, { joinWith: "|" }), !0), this.lastIndex = 0;
      }
      /** @param {string} s */
      exec(l) {
        this.matcherRe.lastIndex = this.lastIndex;
        const h = this.matcherRe.exec(l);
        if (!h)
          return null;
        const P = h.findIndex((we, De) => De > 0 && we !== void 0), z = this.matchIndexes[P];
        return h.splice(0, P), Object.assign(h, z);
      }
    }
    class E {
      constructor() {
        this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
      }
      // @ts-ignore
      getMatcher(l) {
        if (this.multiRegexes[l]) return this.multiRegexes[l];
        const h = new a();
        return this.rules.slice(l).forEach(([P, z]) => h.addRule(P, z)), h.compile(), this.multiRegexes[l] = h, h;
      }
      resumingScanAtSamePosition() {
        return this.regexIndex !== 0;
      }
      considerAll() {
        this.regexIndex = 0;
      }
      // @ts-ignore
      addRule(l, h) {
        this.rules.push([l, h]), h.type === "begin" && this.count++;
      }
      /** @param {string} s */
      exec(l) {
        const h = this.getMatcher(this.regexIndex);
        h.lastIndex = this.lastIndex;
        let P = h.exec(l);
        if (this.resumingScanAtSamePosition() && !(P && P.index === this.lastIndex)) {
          const z = this.getMatcher(0);
          z.lastIndex = this.lastIndex + 1, P = z.exec(l);
        }
        return P && (this.regexIndex += P.position + 1, this.regexIndex === this.count && this.considerAll()), P;
      }
    }
    function D(g) {
      const l = new E();
      return g.contains.forEach((h) => l.addRule(h.begin, { rule: h, type: "begin" })), g.terminatorEnd && l.addRule(g.terminatorEnd, { type: "end" }), g.illegal && l.addRule(g.illegal, { type: "illegal" }), l;
    }
    function B(g, l) {
      const h = (
        /** @type CompiledMode */
        g
      );
      if (g.isCompiled) return h;
      [
        Tt,
        // do this early so compiler extensions generally don't have to worry about
        // the distinction between match/begin
        Rt,
        $t,
        It
      ].forEach((z) => z(g, l)), e.compilerExtensions.forEach((z) => z(g, l)), g.__beforeBegin = null, [
        At,
        // do this later so compiler extensions that come earlier have access to the
        // raw array if they wanted to perhaps manipulate it, etc.
        Ot,
        // default to 1 relevance if not specified
        Mt
      ].forEach((z) => z(g, l)), g.isCompiled = !0;
      let P = null;
      return typeof g.keywords == "object" && g.keywords.$pattern && (g.keywords = Object.assign({}, g.keywords), P = g.keywords.$pattern, delete g.keywords.$pattern), P = P || /\w+/, g.keywords && (g.keywords = Fe(g.keywords, e.case_insensitive)), h.keywordPatternRe = i(P, !0), l && (g.begin || (g.begin = /\B|\b/), h.beginRe = i(h.begin), !g.end && !g.endsWithParent && (g.end = /\B|\b/), g.end && (h.endRe = i(h.end)), h.terminatorEnd = A(h.end) || "", g.endsWithParent && l.terminatorEnd && (h.terminatorEnd += (g.end ? "|" : "") + l.terminatorEnd)), g.illegal && (h.illegalRe = i(
        /** @type {RegExp | string} */
        g.illegal
      )), g.contains || (g.contains = []), g.contains = [].concat(...g.contains.map(function(z) {
        return Gt(z === "self" ? g : z);
      })), g.contains.forEach(function(z) {
        B(
          /** @type Mode */
          z,
          h
        );
      }), g.starts && B(g.starts, l), h.matcher = D(h), h;
    }
    if (e.compilerExtensions || (e.compilerExtensions = []), e.contains && e.contains.includes("self"))
      throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
    return e.classNameAliases = s(e.classNameAliases || {}), B(
      /** @type Mode */
      e
    );
  }
  function Xe(e) {
    return e ? e.endsWithParent || Xe(e.starts) : !1;
  }
  function Gt(e) {
    return e.variants && !e.cachedVariants && (e.cachedVariants = e.variants.map(function(i) {
      return s(e, { variants: null }, i);
    })), e.cachedVariants ? e.cachedVariants : Xe(e) ? s(e, { starts: e.starts ? s(e.starts) : null }) : Object.isFrozen(e) ? s(e) : e;
  }
  var jt = "11.11.1";
  class Ft extends Error {
    constructor(i, a) {
      super(i), this.name = "HTMLInjectionError", this.html = a;
    }
  }
  const Le = r, Ye = s, qe = Symbol("nomatch"), Zt = 7, Ve = function(e) {
    const i = /* @__PURE__ */ Object.create(null), a = /* @__PURE__ */ Object.create(null), E = [];
    let D = !0;
    const B = "Could not find the language '{}', did you forget to load/include a language module?", g = { disableAutodetect: !0, name: "Plain text", contains: [] };
    let l = {
      ignoreUnescapedHTML: !1,
      throwUnescapedHTML: !1,
      noHighlightRe: /^(no-?highlight)$/i,
      languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
      classPrefix: "hljs-",
      cssSelector: "pre code",
      languages: null,
      // beta configuration options, subject to change, welcome to discuss
      // https://github.com/highlightjs/highlight.js/issues/1086
      __emitter: x
    };
    function h(o) {
      return l.noHighlightRe.test(o);
    }
    function P(o) {
      let b = o.className + " ";
      b += o.parentNode ? o.parentNode.className : "";
      const S = l.languageDetectRe.exec(b);
      if (S) {
        const M = oe(S[1]);
        return M || (Ke(B.replace("{}", S[1])), Ke("Falling back to no-highlight mode for this block.", o)), M ? S[1] : "no-highlight";
      }
      return b.split(/\s+/).find((M) => h(M) || oe(M));
    }
    function z(o, b, S) {
      let M = "", U = "";
      typeof b == "object" ? (M = o, S = b.ignoreIllegals, U = b.language) : (he("10.7.0", "highlight(lang, code, ...args) has been deprecated."), he("10.7.0", `Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`), U = o, M = b), S === void 0 && (S = !0);
      const V = {
        code: M,
        language: U
      };
      xe("before:highlight", V);
      const ae = V.result ? V.result : we(V.language, V.code, S);
      return ae.code = V.code, xe("after:highlight", ae), ae;
    }
    function we(o, b, S, M) {
      const U = /* @__PURE__ */ Object.create(null);
      function V(c, u) {
        return c.keywords[u];
      }
      function ae() {
        if (!_.keywords) {
          $.addText(I);
          return;
        }
        let c = 0;
        _.keywordPatternRe.lastIndex = 0;
        let u = _.keywordPatternRe.exec(I), N = "";
        for (; u; ) {
          N += I.substring(c, u.index);
          const R = ee.case_insensitive ? u[0].toLowerCase() : u[0], G = V(_, R);
          if (G) {
            const [se, ln] = G;
            if ($.addText(N), N = "", U[R] = (U[R] || 0) + 1, U[R] <= Zt && (Oe += ln), se.startsWith("_"))
              N += u[0];
            else {
              const dn = ee.classNameAliases[se] || se;
              J(u[0], dn);
            }
          } else
            N += u[0];
          c = _.keywordPatternRe.lastIndex, u = _.keywordPatternRe.exec(I);
        }
        N += I.substring(c), $.addText(N);
      }
      function Te() {
        if (I === "") return;
        let c = null;
        if (typeof _.subLanguage == "string") {
          if (!i[_.subLanguage]) {
            $.addText(I);
            return;
          }
          c = we(_.subLanguage, I, !0, st[_.subLanguage]), st[_.subLanguage] = /** @type {CompiledMode} */
          c._top;
        } else
          c = Be(I, _.subLanguage.length ? _.subLanguage : null);
        _.relevance > 0 && (Oe += c.relevance), $.__addSublanguage(c._emitter, c.language);
      }
      function X() {
        _.subLanguage != null ? Te() : ae(), I = "";
      }
      function J(c, u) {
        c !== "" && ($.startScope(u), $.addText(c), $.endScope());
      }
      function tt(c, u) {
        let N = 1;
        const R = u.length - 1;
        for (; N <= R; ) {
          if (!c._emit[N]) {
            N++;
            continue;
          }
          const G = ee.classNameAliases[c[N]] || c[N], se = u[N];
          G ? J(se, G) : (I = se, ae(), I = ""), N++;
        }
      }
      function nt(c, u) {
        return c.scope && typeof c.scope == "string" && $.openNode(ee.classNameAliases[c.scope] || c.scope), c.beginScope && (c.beginScope._wrap ? (J(I, ee.classNameAliases[c.beginScope._wrap] || c.beginScope._wrap), I = "") : c.beginScope._multi && (tt(c.beginScope, u), I = "")), _ = Object.create(c, { parent: { value: _ } }), _;
      }
      function it(c, u, N) {
        let R = Y(c.endRe, N);
        if (R) {
          if (c["on:end"]) {
            const G = new n(c);
            c["on:end"](u, G), G.isMatchIgnored && (R = !1);
          }
          if (R) {
            for (; c.endsParent && c.parent; )
              c = c.parent;
            return c;
          }
        }
        if (c.endsWithParent)
          return it(c.parent, u, N);
      }
      function rn(c) {
        return _.matcher.regexIndex === 0 ? (I += c[0], 1) : ($e = !0, 0);
      }
      function sn(c) {
        const u = c[0], N = c.rule, R = new n(N), G = [N.__beforeBegin, N["on:begin"]];
        for (const se of G)
          if (se && (se(c, R), R.isMatchIgnored))
            return rn(u);
        return N.skip ? I += u : (N.excludeBegin && (I += u), X(), !N.returnBegin && !N.excludeBegin && (I = u)), nt(N, c), N.returnBegin ? 0 : u.length;
      }
      function on(c) {
        const u = c[0], N = b.substring(c.index), R = it(_, c, N);
        if (!R)
          return qe;
        const G = _;
        _.endScope && _.endScope._wrap ? (X(), J(u, _.endScope._wrap)) : _.endScope && _.endScope._multi ? (X(), tt(_.endScope, c)) : G.skip ? I += u : (G.returnEnd || G.excludeEnd || (I += u), X(), G.excludeEnd && (I = u));
        do
          _.scope && $.closeNode(), !_.skip && !_.subLanguage && (Oe += _.relevance), _ = _.parent;
        while (_ !== R.parent);
        return R.starts && nt(R.starts, c), G.returnEnd ? 0 : u.length;
      }
      function an() {
        const c = [];
        for (let u = _; u !== ee; u = u.parent)
          u.scope && c.unshift(u.scope);
        c.forEach((u) => $.openNode(u));
      }
      let Ae = {};
      function rt(c, u) {
        const N = u && u[0];
        if (I += c, N == null)
          return X(), 0;
        if (Ae.type === "begin" && u.type === "end" && Ae.index === u.index && N === "") {
          if (I += b.slice(u.index, u.index + 1), !D) {
            const R = new Error(`0 width match regex (${o})`);
            throw R.languageName = o, R.badRule = Ae.rule, R;
          }
          return 1;
        }
        if (Ae = u, u.type === "begin")
          return sn(u);
        if (u.type === "illegal" && !S) {
          const R = new Error('Illegal lexeme "' + N + '" for mode "' + (_.scope || "<unnamed>") + '"');
          throw R.mode = _, R;
        } else if (u.type === "end") {
          const R = on(u);
          if (R !== qe)
            return R;
        }
        if (u.type === "illegal" && N === "")
          return I += `
`, 1;
        if (Pe > 1e5 && Pe > u.index * 3)
          throw new Error("potential infinite loop, way more iterations than matches");
        return I += N, N.length;
      }
      const ee = oe(o);
      if (!ee)
        throw de(B.replace("{}", o)), new Error('Unknown language: "' + o + '"');
      const cn = Ht(ee);
      let Ue = "", _ = M || cn;
      const st = {}, $ = new l.__emitter(l);
      an();
      let I = "", Oe = 0, ge = 0, Pe = 0, $e = !1;
      try {
        if (ee.__emitTokens)
          ee.__emitTokens(b, $);
        else {
          for (_.matcher.considerAll(); ; ) {
            Pe++, $e ? $e = !1 : _.matcher.considerAll(), _.matcher.lastIndex = ge;
            const c = _.matcher.exec(b);
            if (!c) break;
            const u = b.substring(ge, c.index), N = rt(u, c);
            ge = c.index + N;
          }
          rt(b.substring(ge));
        }
        return $.finalize(), Ue = $.toHTML(), {
          language: o,
          value: Ue,
          relevance: Oe,
          illegal: !1,
          _emitter: $,
          _top: _
        };
      } catch (c) {
        if (c.message && c.message.includes("Illegal"))
          return {
            language: o,
            value: Le(b),
            illegal: !0,
            relevance: 0,
            _illegalBy: {
              message: c.message,
              index: ge,
              context: b.slice(ge - 100, ge + 100),
              mode: c.mode,
              resultSoFar: Ue
            },
            _emitter: $
          };
        if (D)
          return {
            language: o,
            value: Le(b),
            illegal: !1,
            relevance: 0,
            errorRaised: c,
            _emitter: $,
            _top: _
          };
        throw c;
      }
    }
    function De(o) {
      const b = {
        value: Le(o),
        illegal: !1,
        relevance: 0,
        _top: g,
        _emitter: new l.__emitter(l)
      };
      return b._emitter.addText(o), b;
    }
    function Be(o, b) {
      b = b || l.languages || Object.keys(i);
      const S = De(o), M = b.filter(oe).filter(et).map(
        (X) => we(X, o, !1)
      );
      M.unshift(S);
      const U = M.sort((X, J) => {
        if (X.relevance !== J.relevance) return J.relevance - X.relevance;
        if (X.language && J.language) {
          if (oe(X.language).supersetOf === J.language)
            return 1;
          if (oe(J.language).supersetOf === X.language)
            return -1;
        }
        return 0;
      }), [V, ae] = U, Te = V;
      return Te.secondBest = ae, Te;
    }
    function Kt(o, b, S) {
      const M = b && a[b] || S;
      o.classList.add("hljs"), o.classList.add(`language-${M}`);
    }
    function ze(o) {
      let b = null;
      const S = P(o);
      if (h(S)) return;
      if (xe(
        "before:highlightElement",
        { el: o, language: S }
      ), o.dataset.highlighted) {
        console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", o);
        return;
      }
      if (o.children.length > 0 && (l.ignoreUnescapedHTML || (console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."), console.warn("https://github.com/highlightjs/highlight.js/wiki/security"), console.warn("The element with unescaped HTML:"), console.warn(o)), l.throwUnescapedHTML))
        throw new Ft(
          "One of your code blocks includes unescaped HTML.",
          o.innerHTML
        );
      b = o;
      const M = b.textContent, U = S ? z(M, { language: S, ignoreIllegals: !0 }) : Be(M);
      o.innerHTML = U.value, o.dataset.highlighted = "yes", Kt(o, S, U.language), o.result = {
        language: U.language,
        // TODO: remove with version 11.0
        re: U.relevance,
        relevance: U.relevance
      }, U.secondBest && (o.secondBest = {
        language: U.secondBest.language,
        relevance: U.secondBest.relevance
      }), xe("after:highlightElement", { el: o, result: U, text: M });
    }
    function Wt(o) {
      l = Ye(l, o);
    }
    const Xt = () => {
      Se(), he("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
    };
    function Yt() {
      Se(), he("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
    }
    let Qe = !1;
    function Se() {
      function o() {
        Se();
      }
      if (document.readyState === "loading") {
        Qe || window.addEventListener("DOMContentLoaded", o, !1), Qe = !0;
        return;
      }
      document.querySelectorAll(l.cssSelector).forEach(ze);
    }
    function qt(o, b) {
      let S = null;
      try {
        S = b(e);
      } catch (M) {
        if (de("Language definition for '{}' could not be registered.".replace("{}", o)), D)
          de(M);
        else
          throw M;
        S = g;
      }
      S.name || (S.name = o), i[o] = S, S.rawDefinition = b.bind(null, e), S.aliases && Je(S.aliases, { languageName: o });
    }
    function Vt(o) {
      delete i[o];
      for (const b of Object.keys(a))
        a[b] === o && delete a[b];
    }
    function Qt() {
      return Object.keys(i);
    }
    function oe(o) {
      return o = (o || "").toLowerCase(), i[o] || i[a[o]];
    }
    function Je(o, { languageName: b }) {
      typeof o == "string" && (o = [o]), o.forEach((S) => {
        a[S.toLowerCase()] = b;
      });
    }
    function et(o) {
      const b = oe(o);
      return b && !b.disableAutodetect;
    }
    function Jt(o) {
      o["before:highlightBlock"] && !o["before:highlightElement"] && (o["before:highlightElement"] = (b) => {
        o["before:highlightBlock"](
          Object.assign({ block: b.el }, b)
        );
      }), o["after:highlightBlock"] && !o["after:highlightElement"] && (o["after:highlightElement"] = (b) => {
        o["after:highlightBlock"](
          Object.assign({ block: b.el }, b)
        );
      });
    }
    function en(o) {
      Jt(o), E.push(o);
    }
    function tn(o) {
      const b = E.indexOf(o);
      b !== -1 && E.splice(b, 1);
    }
    function xe(o, b) {
      const S = o;
      E.forEach(function(M) {
        M[S] && M[S](b);
      });
    }
    function nn(o) {
      return he("10.7.0", "highlightBlock will be removed entirely in v12.0"), he("10.7.0", "Please use highlightElement now."), ze(o);
    }
    Object.assign(e, {
      highlight: z,
      highlightAuto: Be,
      highlightAll: Se,
      highlightElement: ze,
      // TODO: Remove with v12 API
      highlightBlock: nn,
      configure: Wt,
      initHighlighting: Xt,
      initHighlightingOnLoad: Yt,
      registerLanguage: qt,
      unregisterLanguage: Vt,
      listLanguages: Qt,
      getLanguage: oe,
      registerAliases: Je,
      autoDetection: et,
      inherit: Ye,
      addPlugin: en,
      removePlugin: tn
    }), e.debugMode = function() {
      D = !1;
    }, e.safeMode = function() {
      D = !0;
    }, e.versionString = jt, e.regex = {
      concat: T,
      lookahead: w,
      either: H,
      optional: C,
      anyNumberOfTimes: k
    };
    for (const o in Ne)
      typeof Ne[o] == "object" && t(Ne[o]);
    return Object.assign(e, Ne), e;
  }, me = Ve({});
  return me.newInstance = () => Ve({}), He = me, me.HighlightJS = me, me.default = me, He;
}
var Xn = /* @__PURE__ */ Wn();
const Yn = /* @__PURE__ */ Kn(Xn), lt = {}, qn = "hljs-";
function Vn(t) {
  const n = Yn.newInstance();
  return t && p(t), {
    highlight: r,
    highlightAuto: s,
    listLanguages: d,
    register: p,
    registerAlias: v,
    registered: m
  };
  function r(f, y, x) {
    const A = x || lt, w = typeof A.prefix == "string" ? A.prefix : qn;
    if (!n.getLanguage(f))
      throw new Error("Unknown language: `" + f + "` is not registered");
    n.configure({ __emitter: Qn, classPrefix: w });
    const k = (
      /** @type {HighlightResult & {_emitter: HastEmitter}} */
      n.highlight(y, { ignoreIllegals: !0, language: f })
    );
    if (k.errorRaised)
      throw new Error("Could not highlight with `Highlight.js`", {
        cause: k.errorRaised
      });
    const C = k._emitter.root, T = (
      /** @type {RootData} */
      C.data
    );
    return T.language = k.language, T.relevance = k.relevance, C;
  }
  function s(f, y) {
    const A = (y || lt).subset || d();
    let w = -1, k = 0, C;
    for (; ++w < A.length; ) {
      const T = A[w];
      if (!n.getLanguage(T)) continue;
      const L = r(T, f, y);
      L.data && L.data.relevance !== void 0 && L.data.relevance > k && (k = L.data.relevance, C = L);
    }
    return C || {
      type: "root",
      children: [],
      data: { language: void 0, relevance: k }
    };
  }
  function d() {
    return n.listLanguages();
  }
  function p(f, y) {
    if (typeof f == "string")
      n.registerLanguage(f, y);
    else {
      let x;
      for (x in f)
        Object.hasOwn(f, x) && n.registerLanguage(x, f[x]);
    }
  }
  function v(f, y) {
    if (typeof f == "string")
      n.registerAliases(
        // Note: copy needed because hljs doesn’t accept readonly arrays yet.
        typeof y == "string" ? y : [...y],
        { languageName: f }
      );
    else {
      let x;
      for (x in f)
        if (Object.hasOwn(f, x)) {
          const A = f[x];
          n.registerAliases(
            // Note: copy needed because hljs doesn’t accept readonly arrays yet.
            typeof A == "string" ? A : [...A],
            { languageName: x }
          );
        }
    }
  }
  function m(f) {
    return !!n.getLanguage(f);
  }
}
class Qn {
  /**
   * @param {Readonly<HljsOptions>} options
   *   Configuration.
   * @returns
   *   Instance.
   */
  constructor(n) {
    this.options = n, this.root = {
      type: "root",
      children: [],
      data: { language: void 0, relevance: 0 }
    }, this.stack = [this.root];
  }
  /**
   * @param {string} value
   *   Text to add.
   * @returns {undefined}
   *   Nothing.
   *
   */
  addText(n) {
    if (n === "") return;
    const r = this.stack[this.stack.length - 1], s = r.children[r.children.length - 1];
    s && s.type === "text" ? s.value += n : r.children.push({ type: "text", value: n });
  }
  /**
   *
   * @param {unknown} rawName
   *   Name to add.
   * @returns {undefined}
   *   Nothing.
   */
  startScope(n) {
    this.openNode(String(n));
  }
  /**
   * @returns {undefined}
   *   Nothing.
   */
  endScope() {
    this.closeNode();
  }
  /**
   * @param {HastEmitter} other
   *   Other emitter.
   * @param {string} name
   *   Name of the sublanguage.
   * @returns {undefined}
   *   Nothing.
   */
  __addSublanguage(n, r) {
    const s = this.stack[this.stack.length - 1], d = (
      /** @type {Array<ElementContent>} */
      n.root.children
    );
    r ? s.children.push({
      type: "element",
      tagName: "span",
      properties: { className: [r] },
      children: d
    }) : s.children.push(...d);
  }
  /**
   * @param {string} name
   *   Name to add.
   * @returns {undefined}
   *   Nothing.
   */
  openNode(n) {
    const r = this, s = n.split(".").map(function(v, m) {
      return m ? v + "_".repeat(m) : r.options.classPrefix + v;
    }), d = this.stack[this.stack.length - 1], p = {
      type: "element",
      tagName: "span",
      properties: { className: s },
      children: []
    };
    d.children.push(p), this.stack.push(p);
  }
  /**
   * @returns {undefined}
   *   Nothing.
   */
  closeNode() {
    this.stack.pop();
  }
  /**
   * @returns {undefined}
   *   Nothing.
   */
  finalize() {
  }
  /**
   * @returns {string}
   *   Nothing.
   */
  toHTML() {
    return "";
  }
}
const je = Vn({
  typescript: jn,
  javascript: Rn,
  css: Sn,
  scss: Hn,
  json: Mn,
  bash: hn,
  xml: Fn,
  yaml: Zn,
  markdown: In
}), Jn = {
  ts: "typescript",
  tsx: "typescript",
  mts: "typescript",
  cts: "typescript",
  js: "javascript",
  jsx: "javascript",
  mjs: "javascript",
  cjs: "javascript",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  console: "bash",
  html: "xml",
  svg: "xml",
  vue: "xml",
  jsonc: "json",
  yml: "yaml"
}, ei = (t) => {
  const n = (t ?? "").trim().toLowerCase();
  if (!n) return null;
  const r = Jn[n] ?? n;
  return je.registered(r) ? r : null;
}, Ce = (t, n, r) => {
  var s;
  if (t.type === "text") {
    t.value && r.push({ className: n, value: t.value });
    return;
  }
  if (t.type === "element") {
    const d = (s = t.properties) == null ? void 0 : s.className, p = Array.isArray(d) ? d.join(" ") : "", v = n && p ? `${n} ${p}` : n || p;
    for (const m of t.children) Ce(m, v, r);
    return;
  }
  if (t.type === "root")
    for (const d of t.children) Ce(d, n, r);
}, Me = /([(){}\[\]<>.,;:=+\-*\/%!&|^~?]+)/g, dt = (t) => {
  const n = [];
  for (const r of t) {
    if (r.className) {
      n.push(r);
      continue;
    }
    let s = 0;
    Me.lastIndex = 0;
    for (let d = Me.exec(r.value); d; d = Me.exec(r.value))
      d.index > s && n.push({ className: "", value: r.value.slice(s, d.index) }), n.push({ className: "hljs-punctuation", value: d[0] }), s = Me.lastIndex;
    s < r.value.length && n.push({ className: "", value: r.value.slice(s) });
  }
  return n;
}, ti = (t, n) => {
  if (!t) return [];
  const r = ei(n);
  if (r) {
    const p = [];
    return Ce(je.highlight(r, t), "", p), dt(p);
  }
  const s = je.highlightAuto(t);
  if (s.children.length === 0) return [{ className: "", value: t }];
  const d = [];
  return Ce(s, "", d), dt(d);
}, ni = (t) => {
  const n = [[]];
  for (const r of t)
    r.value.split(`
`).forEach((d, p) => {
      p > 0 && n.push([]), d && n[n.length - 1].push({ className: r.className, value: d });
    });
  return n;
}, ii = gn`
	:host {
		display: block;
		--accent: var(--purple);
		width: 100%;
		min-width: 0;
	}

	:host([accent='sub']) {
		--accent: var(--pink);
	}

	:host([is-hidden]) {
		display: none;
	}

	.block {
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		background: var(--color-neutral-0);
		overflow: hidden;
		font-family: var(--font-mono);
	}

	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 0.5rem 0.75rem 0.5rem 0.875rem;
		border-bottom: 1px solid var(--border);
		background: var(--color-neutral-1);
	}

	.meta {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		min-width: 0;
	}

	.filename {
		font-size: var(--font-size-caption);
		color: var(--foreground);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.lang {
		font-size: var(--font-size-caption);
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--accent);
	}

	.copy {
		flex-shrink: 0;
	}

	.scroll {
		overflow: auto;
	}
	/* Firefox only — Chromium uses the arrow-less ::-webkit-scrollbar below; giving
	   it scrollbar-width would swap in the OS bar (arrows on Windows). */
	@supports not selector(::-webkit-scrollbar) {
		.scroll {
			scrollbar-width: thin;
			scrollbar-color: var(--color-neutral-3) transparent;
		}
	}
	.scroll::-webkit-scrollbar {
		height: 8px;
		width: 8px;
	}
	.scroll::-webkit-scrollbar-thumb {
		background: var(--color-neutral-3);
		border-radius: 999px;
	}
	.scroll::-webkit-scrollbar-button {
		display: none;
		width: 0;
		height: 0;
	}

	pre {
		margin: 0;
		padding: 0.875rem 1rem;
		font-size: var(--font-size-small);
		line-height: 1.6;
		color: var(--foreground);
		tab-size: 2;
		/* Code stays selectable even though the page default is user-select:none
		   — people need to copy snippets. The line-number gutter re-opts out
		   below so dragging a selection doesn't pick up the numbers. */
		user-select: text;
		-webkit-user-select: text;
	}

	/* ::selection doesn't cross shadow boundaries, so restate the page-wide
	   selection style (ink.css) here for code rendered inside this shadow root.
	   Shares the --selection-* tokens, so code and prose highlight identically. */
	pre ::selection {
		background: var(--selection-background);
		color: var(--selection-foreground);
	}
	pre ::-moz-selection {
		background: var(--selection-background);
		color: var(--selection-foreground);
	}

	.rows {
		display: table;
		min-width: 100%;
	}

	.line {
		display: table-row;
	}

	.gutter,
	.text {
		display: table-cell;
		white-space: pre;
	}

	.gutter {
		padding-right: 1rem;
		text-align: right;
		color: var(--muted-foreground);
		user-select: none;
		opacity: 0.6;
	}

	/*
	 * Annotation. These are table-rows, so a background has to be painted on
	 * the cells rather than the row — a table-row's background sits behind its
	 * cells and is invisible wherever a cell paints its own.
	 *
	 * The marker column is the existing gutter: with added-lines set it
	 * carries +/- instead of the line number, because a diff reader wants the
	 * sign more than the count.
	 */
	.line.is-added .gutter,
	.line.is-added .text {
		background: color-mix(in oklch, var(--success) 12%, transparent);
	}

	.line.is-added .gutter {
		color: var(--success);
		opacity: 1;
	}

	.line.is-removed .gutter,
	.line.is-removed .text {
		background: color-mix(in oklch, var(--destructive) 12%, transparent);
	}

	.line.is-removed .gutter {
		color: var(--destructive);
		opacity: 1;
	}

	/* Focus dims everything else rather than hiding it, so the surrounding
	   code still gives the excerpt somewhere to sit. */
	.line.is-dimmed {
		opacity: 0.35;
		transition: opacity 0.15s ease;
	}

	.block:hover .line.is-dimmed {
		opacity: 1;
	}

	/*
	 * highlight.js token classes mapped onto the zest --syntax-* palette.
	 * Ordering matters: highlight.js nests JSX content inside .hljs-tag (e.g.
	 * "hljs-tag hljs-attr"), so structural classes (.hljs-tag) are declared
	 * BEFORE content classes — equal-specificity ties go to the later rule, so
	 * the nested attr/name/string colors win over the dim tag brackets.
	 */
	.hljs-comment,
	.hljs-quote {
		color: var(--syntax-comment);
		font-style: italic;
	}
	/* JSX/HTML angle-bracket structure: <, >, /, = — kept dim. */
	.hljs-tag,
	.hljs-operator,
	.hljs-punctuation {
		color: var(--syntax-operator);
	}
	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-meta,
	.hljs-meta-keyword,
	.hljs-doctag {
		color: var(--syntax-keyword);
	}
	.hljs-string,
	.hljs-meta .hljs-string,
	.hljs-addition {
		color: var(--syntax-string);
	}
	.hljs-number {
		color: var(--syntax-number);
	}
	.hljs-literal,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-deletion {
		color: var(--syntax-constant);
	}
	.hljs-built_in,
	.hljs-type,
	.hljs-title.class_,
	.hljs-class .hljs-title,
	.hljs-selector-class {
		color: var(--syntax-class);
	}
	.hljs-attr,
	.hljs-attribute,
	.hljs-property,
	.hljs-selector-attr,
	.hljs-selector-pseudo {
		color: var(--syntax-property);
	}
	.hljs-variable,
	.hljs-template-variable,
	.hljs-params {
		color: var(--syntax-variable);
	}
	.hljs-title,
	.hljs-title.function_,
	.hljs-section,
	.hljs-selector-id {
		color: var(--syntax-function);
	}
	/* Tag/component name (declared after .hljs-tag so it wins in JSX). */
	.hljs-name {
		color: var(--syntax-tag);
	}
	.hljs-regexp {
		color: var(--syntax-regex);
	}
	.hljs-emphasis {
		font-style: italic;
	}
	.hljs-strong {
		font-weight: 700;
	}

	.rows {
		line-height: 1.75 !important;
		letter-spacing: 0.35px !important;
		font-family: var(--font-mono);
	}
`, Ge = (t) => {
  const n = /* @__PURE__ */ new Set();
  if (!t) return n;
  for (const r of t.split(",")) {
    const s = r.trim();
    if (!s) continue;
    const d = s.split("-"), p = Number(d[0]), v = d.length > 1 ? Number(d[1]) : p;
    if (Number.isFinite(p) && Number.isFinite(v))
      for (let f = Math.min(p, v); f <= Math.max(p, v); f += 1)
        n.add(f);
  }
  return n;
}, ri = (t, n) => {
  const r = ["line"];
  return n.added.has(t) && r.push("is-added"), n.removed.has(t) && r.push("is-removed"), n.focused.size > 0 && !n.focused.has(t) && r.push("is-dimmed"), r.join(" ");
}, si = (t, n) => n.added.has(t) ? "+" : n.removed.has(t) ? "-" : String(t), oi = un(
  (t) => {
    const n = t.code ?? "", r = t.language, s = ot(
      () => t.highlight ? ti(n.replace(/\n$/, ""), r) : [{ value: n.replace(/\n$/, ""), className: "" }],
      [n, r, t.highlight]
    ), d = ot(() => ni(s), [s]), p = {
      added: Ge(t.addedLines),
      removed: Ge(t.removedLines),
      focused: Ge(t.focusLines)
    }, v = p.added.size > 0 || p.removed.size > 0 || p.focused.size > 0, m = !!t.lineNumbers || v, f = p.added.size > 0 || p.removed.size > 0, y = (w, k) => w.className ? /* @__PURE__ */ Q("span", { class: w.className, children: w.value }, k) : w.value, x = (w) => {
      w.stopPropagation(), t.copy();
    }, A = t.filename || t.language || t.hasCopy;
    return /* @__PURE__ */ Q("host", { shadowDom: !0, children: /* @__PURE__ */ Re("div", { class: "block", children: [
      A && /* @__PURE__ */ Re("div", { class: "head", children: [
        /* @__PURE__ */ Re("div", { class: "meta", children: [
          t.language && /* @__PURE__ */ Q("span", { class: "lang", children: t.language }),
          t.filename && /* @__PURE__ */ Q("span", { class: "filename", children: t.filename })
        ] }),
        t.hasCopy && /* @__PURE__ */ Q("z-copy-button", { class: "copy", value: n, oncopy: x })
      ] }),
      /* @__PURE__ */ Q("div", { class: "scroll", children: /* @__PURE__ */ Q("pre", { children: m ? /* @__PURE__ */ Q("div", { class: "rows", children: d.map((w, k) => {
        const C = k + 1, T = f ? si(C, p) : String(C), L = !!t.lineNumbers || f;
        return /* @__PURE__ */ Re("div", { class: ri(C, p), children: [
          L && /* @__PURE__ */ Q("span", { class: "gutter", children: T }),
          /* @__PURE__ */ Q("span", { class: "text", children: w.length ? w.map(y) : " " })
        ] }, k);
      }) }) : /* @__PURE__ */ Q("code", { children: s.map(y) }) }) })
    ] }) });
  },
  {
    props: {
      code: String,
      language: String,
      filename: String,
      // Read by z-code-group to label this block's tab.
      label: String,
      lineNumbers: { type: Boolean, reflect: !0 },
      highlight: { type: Boolean, reflect: !0, value: () => !0 },
      addedLines: { type: String, reflect: !0 },
      removedLines: { type: String, reflect: !0 },
      focusLines: { type: String, reflect: !0 },
      hasCopy: { type: Boolean, reflect: !0, value: () => !0 },
      accent: { type: String, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      copy: bn({ bubbles: !0, composed: !0 })
    },
    styles: [fn, ii]
  }
);
pn("z-code-block", oi);
export {
  oi as ZCodeBlock
};
