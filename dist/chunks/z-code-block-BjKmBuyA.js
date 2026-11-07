import { c as bn, a as hn, e as mn, j as X, g as Ee, d as En } from "./define-element-BZUk-KLk.js";
import { u as at, a as ct } from "./hooks-DEFT8qqt.js";
import { t as _n } from "./scrollbar-styles-Csqxxw2V.js";
import { o as yn } from "./prop-types-B3Bpi956.js";
import { u as vn } from "./locale-DUDaH1Ni.js";
function wn(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Ge, lt;
function Nn() {
  if (lt) return Ge;
  lt = 1;
  function t(e) {
    return e instanceof Map ? e.clear = e.delete = e.set = function() {
      throw new Error("map is read-only");
    } : e instanceof Set && (e.add = e.clear = e.delete = function() {
      throw new Error("set is read-only");
    }), Object.freeze(e), Object.getOwnPropertyNames(e).forEach((r) => {
      const a = e[r], _ = typeof a;
      (_ === "object" || _ === "function") && !Object.isFrozen(a) && t(a);
    }), e;
  }
  class n {
    /**
     * @param {CompiledMode} mode
     */
    constructor(r) {
      r.data === void 0 && (r.data = {}), this.data = r.data, this.isMatchIgnored = !1;
    }
    ignoreMatch() {
      this.isMatchIgnored = !0;
    }
  }
  function i(e) {
    return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
  }
  function o(e, ...r) {
    const a = /* @__PURE__ */ Object.create(null);
    for (const _ in e)
      a[_] = e[_];
    return r.forEach(function(_) {
      for (const B in _)
        a[B] = _[B];
    }), /** @type {T} */
    a;
  }
  const l = "</span>", h = (e) => !!e.scope, u = (e, { prefix: r }) => {
    if (e.startsWith("language:"))
      return e.replace("language:", "language-");
    if (e.includes(".")) {
      const a = e.split(".");
      return [
        `${r}${a.shift()}`,
        ...a.map((_, B) => `${_}${"_".repeat(B + 1)}`)
      ].join(" ");
    }
    return `${r}${e}`;
  };
  class p {
    /**
     * Creates a new HTMLRenderer
     *
     * @param {Tree} parseTree - the parse tree (must support `walk` API)
     * @param {{classPrefix: string}} options
     */
    constructor(r, a) {
      this.buffer = "", this.classPrefix = a.classPrefix, r.walk(this);
    }
    /**
     * Adds texts to the output stream
     *
     * @param {string} text */
    addText(r) {
      this.buffer += i(r);
    }
    /**
     * Adds a node open to the output stream (if needed)
     *
     * @param {Node} node */
    openNode(r) {
      if (!h(r)) return;
      const a = u(
        r.scope,
        { prefix: this.classPrefix }
      );
      this.span(a);
    }
    /**
     * Adds a node close to the output stream (if needed)
     *
     * @param {Node} node */
    closeNode(r) {
      h(r) && (this.buffer += l);
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
    span(r) {
      this.buffer += `<span class="${r}">`;
    }
  }
  const m = (e = {}) => {
    const r = { children: [] };
    return Object.assign(r, e), r;
  };
  class v {
    constructor() {
      this.rootNode = m(), this.stack = [this.rootNode];
    }
    get top() {
      return this.stack[this.stack.length - 1];
    }
    get root() {
      return this.rootNode;
    }
    /** @param {Node} node */
    add(r) {
      this.top.children.push(r);
    }
    /** @param {string} scope */
    openNode(r) {
      const a = m({ scope: r });
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
    walk(r) {
      return this.constructor._walk(r, this.rootNode);
    }
    /**
     * @param {Renderer} builder
     * @param {Node} node
     */
    static _walk(r, a) {
      return typeof a == "string" ? r.addText(a) : a.children && (r.openNode(a), a.children.forEach((_) => this._walk(r, _)), r.closeNode(a)), r;
    }
    /**
     * @param {Node} node
     */
    static _collapse(r) {
      typeof r != "string" && r.children && (r.children.every((a) => typeof a == "string") ? r.children = [r.children.join("")] : r.children.forEach((a) => {
        v._collapse(a);
      }));
    }
  }
  class k extends v {
    /**
     * @param {*} options
     */
    constructor(r) {
      super(), this.options = r;
    }
    /**
     * @param {string} text
     */
    addText(r) {
      r !== "" && this.add(r);
    }
    /** @param {string} scope */
    startScope(r) {
      this.openNode(r);
    }
    endScope() {
      this.closeNode();
    }
    /**
     * @param {Emitter & {root: DataNode}} emitter
     * @param {string} name
     */
    __addSublanguage(r, a) {
      const _ = r.root;
      a && (_.scope = `language:${a}`), this.add(_);
    }
    toHTML() {
      return new p(this, this.options).value();
    }
    finalize() {
      return this.closeAllNodes(), !0;
    }
  }
  function T(e) {
    return e ? typeof e == "string" ? e : e.source : null;
  }
  function w(e) {
    return A("(?=", e, ")");
  }
  function x(e) {
    return A("(?:", e, ")*");
  }
  function D(e) {
    return A("(?:", e, ")?");
  }
  function A(...e) {
    return e.map((a) => T(a)).join("");
  }
  function L(e) {
    const r = e[e.length - 1];
    return typeof r == "object" && r.constructor === Object ? (e.splice(e.length - 1, 1), r) : {};
  }
  function $(...e) {
    return "(" + (L(e).capture ? "" : "?:") + e.map((_) => T(_)).join("|") + ")";
  }
  function G(e) {
    return new RegExp(e.toString() + "|").exec("").length - 1;
  }
  function C(e, r) {
    const a = e && e.exec(r);
    return a && a.index === 0;
  }
  const Z = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
  function j(e, { joinWith: r }) {
    let a = 0;
    return e.map((_) => {
      a += 1;
      const B = a;
      let z = T(_), g = "";
      for (; z.length > 0; ) {
        const d = Z.exec(z);
        if (!d) {
          g += z;
          break;
        }
        g += z.substring(0, d.index), z = z.substring(d.index + d[0].length), d[0][0] === "\\" && d[1] ? g += "\\" + String(Number(d[1]) + B) : (g += d[0], d[0] === "(" && a++);
      }
      return g;
    }).map((_) => `(${_})`).join(r);
  }
  const W = /\b\B/, se = "[a-zA-Z]\\w*", ne = "[a-zA-Z_]\\w*", fe = "\\b\\d+(\\.\\d+)?", pe = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", be = "\\b(0b[01]+)", _e = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", ye = (e = {}) => {
    const r = /^#![ ]*\//;
    return e.binary && (e.begin = A(
      r,
      /.*\b/,
      e.binary,
      /\b.*/
    )), o({
      scope: "meta",
      begin: r,
      end: /$/,
      relevance: 0,
      /** @type {ModeCallback} */
      "on:begin": (a, _) => {
        a.index !== 0 && _.ignoreMatch();
      }
    }, e);
  }, ie = {
    begin: "\\\\[\\s\\S]",
    relevance: 0
  }, ve = {
    scope: "string",
    begin: "'",
    end: "'",
    illegal: "\\n",
    contains: [ie]
  }, le = {
    scope: "string",
    begin: '"',
    end: '"',
    illegal: "\\n",
    contains: [ie]
  }, we = {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
  }, O = function(e, r, a = {}) {
    const _ = o(
      {
        scope: "comment",
        begin: e,
        end: r,
        contains: []
      },
      a
    );
    _.contains.push({
      scope: "doctag",
      // hack to avoid the space from being included. the space is necessary to
      // match here to prevent the plain text rule below from gobbling up doctags
      begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
      end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
      excludeBegin: !0,
      relevance: 0
    });
    const B = $(
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
    return _.contains.push(
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
        begin: A(
          /[ ]+/,
          // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
          "(",
          B,
          /[.]?[:]?([.][ ]|[ ])/,
          "){3}"
        )
        // look for 3 words in a row
      }
    ), _;
  }, Y = O("//", "$"), q = O("/\\*", "\\*/"), V = O("#", "$"), re = {
    scope: "number",
    begin: fe,
    relevance: 0
  }, de = {
    scope: "number",
    begin: pe,
    relevance: 0
  }, xt = {
    scope: "number",
    begin: be,
    relevance: 0
  }, St = {
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
  }, At = {
    scope: "title",
    begin: se,
    relevance: 0
  }, Tt = {
    scope: "title",
    begin: ne,
    relevance: 0
  }, Ot = {
    // excludes method names from keyword processing
    begin: "\\.\\s*" + ne,
    relevance: 0
  };
  var xe = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    APOS_STRING_MODE: ve,
    BACKSLASH_ESCAPE: ie,
    BINARY_NUMBER_MODE: xt,
    BINARY_NUMBER_RE: be,
    COMMENT: O,
    C_BLOCK_COMMENT_MODE: q,
    C_LINE_COMMENT_MODE: Y,
    C_NUMBER_MODE: de,
    C_NUMBER_RE: pe,
    END_SAME_AS_BEGIN: function(e) {
      return Object.assign(
        e,
        {
          /** @type {ModeCallback} */
          "on:begin": (r, a) => {
            a.data._beginMatch = r[1];
          },
          /** @type {ModeCallback} */
          "on:end": (r, a) => {
            a.data._beginMatch !== r[1] && a.ignoreMatch();
          }
        }
      );
    },
    HASH_COMMENT_MODE: V,
    IDENT_RE: se,
    MATCH_NOTHING_RE: W,
    METHOD_GUARD: Ot,
    NUMBER_MODE: re,
    NUMBER_RE: fe,
    PHRASAL_WORDS_MODE: we,
    QUOTE_STRING_MODE: le,
    REGEXP_MODE: St,
    RE_STARTERS_RE: _e,
    SHEBANG: ye,
    TITLE_MODE: At,
    UNDERSCORE_IDENT_RE: ne,
    UNDERSCORE_TITLE_MODE: Tt
  });
  function Rt(e, r) {
    e.input[e.index - 1] === "." && r.ignoreMatch();
  }
  function Mt(e, r) {
    e.className !== void 0 && (e.scope = e.className, delete e.className);
  }
  function It(e, r) {
    r && e.beginKeywords && (e.begin = "\\b(" + e.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", e.__beforeBegin = Rt, e.keywords = e.keywords || e.beginKeywords, delete e.beginKeywords, e.relevance === void 0 && (e.relevance = 0));
  }
  function Ct(e, r) {
    Array.isArray(e.illegal) && (e.illegal = $(...e.illegal));
  }
  function Lt(e, r) {
    if (e.match) {
      if (e.begin || e.end) throw new Error("begin & end are not supported with match");
      e.begin = e.match, delete e.match;
    }
  }
  function Dt(e, r) {
    e.relevance === void 0 && (e.relevance = 1);
  }
  const Bt = (e, r) => {
    if (!e.beforeMatch) return;
    if (e.starts) throw new Error("beforeMatch cannot be used with starts");
    const a = Object.assign({}, e);
    Object.keys(e).forEach((_) => {
      delete e[_];
    }), e.keywords = a.keywords, e.begin = A(a.beforeMatch, w(a.begin)), e.starts = {
      relevance: 0,
      contains: [
        Object.assign(a, { endsParent: !0 })
      ]
    }, e.relevance = 0, delete a.beforeMatch;
  }, zt = [
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
  ], Ut = "keyword";
  function Ze(e, r, a = Ut) {
    const _ = /* @__PURE__ */ Object.create(null);
    return typeof e == "string" ? B(a, e.split(" ")) : Array.isArray(e) ? B(a, e) : Object.keys(e).forEach(function(z) {
      Object.assign(
        _,
        Ze(e[z], r, z)
      );
    }), _;
    function B(z, g) {
      r && (g = g.map((d) => d.toLowerCase())), g.forEach(function(d) {
        const E = d.split("|");
        _[E[0]] = [z, Pt(E[0], E[1])];
      });
    }
  }
  function Pt(e, r) {
    return r ? Number(r) : $t(e) ? 0 : 1;
  }
  function $t(e) {
    return zt.includes(e.toLowerCase());
  }
  const Ke = {}, ue = (e) => {
    console.error(e);
  }, Xe = (e, ...r) => {
    console.log(`WARN: ${e}`, ...r);
  }, he = (e, r) => {
    Ke[`${e}/${r}`] || (console.log(`Deprecated as of ${e}. ${r}`), Ke[`${e}/${r}`] = !0);
  }, Se = new Error();
  function We(e, r, { key: a }) {
    let _ = 0;
    const B = e[a], z = {}, g = {};
    for (let d = 1; d <= r.length; d++)
      g[d + _] = B[d], z[d + _] = !0, _ += G(r[d - 1]);
    e[a] = g, e[a]._emit = z, e[a]._multi = !0;
  }
  function Ht(e) {
    if (Array.isArray(e.begin)) {
      if (e.skip || e.excludeBegin || e.returnBegin)
        throw ue("skip, excludeBegin, returnBegin not compatible with beginScope: {}"), Se;
      if (typeof e.beginScope != "object" || e.beginScope === null)
        throw ue("beginScope must be object"), Se;
      We(e, e.begin, { key: "beginScope" }), e.begin = j(e.begin, { joinWith: "" });
    }
  }
  function Gt(e) {
    if (Array.isArray(e.end)) {
      if (e.skip || e.excludeEnd || e.returnEnd)
        throw ue("skip, excludeEnd, returnEnd not compatible with endScope: {}"), Se;
      if (typeof e.endScope != "object" || e.endScope === null)
        throw ue("endScope must be object"), Se;
      We(e, e.end, { key: "endScope" }), e.end = j(e.end, { joinWith: "" });
    }
  }
  function jt(e) {
    e.scope && typeof e.scope == "object" && e.scope !== null && (e.beginScope = e.scope, delete e.scope);
  }
  function Ft(e) {
    jt(e), typeof e.beginScope == "string" && (e.beginScope = { _wrap: e.beginScope }), typeof e.endScope == "string" && (e.endScope = { _wrap: e.endScope }), Ht(e), Gt(e);
  }
  function Zt(e) {
    function r(g, d) {
      return new RegExp(
        T(g),
        "m" + (e.case_insensitive ? "i" : "") + (e.unicodeRegex ? "u" : "") + (d ? "g" : "")
      );
    }
    class a {
      constructor() {
        this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
      }
      // @ts-ignore
      addRule(d, E) {
        E.position = this.position++, this.matchIndexes[this.matchAt] = E, this.regexes.push([E, d]), this.matchAt += G(d) + 1;
      }
      compile() {
        this.regexes.length === 0 && (this.exec = () => null);
        const d = this.regexes.map((E) => E[1]);
        this.matcherRe = r(j(d, { joinWith: "|" }), !0), this.lastIndex = 0;
      }
      /** @param {string} s */
      exec(d) {
        this.matcherRe.lastIndex = this.lastIndex;
        const E = this.matcherRe.exec(d);
        if (!E)
          return null;
        const H = E.findIndex((Ne, Be) => Be > 0 && Ne !== void 0), U = this.matchIndexes[H];
        return E.splice(0, H), Object.assign(E, U);
      }
    }
    class _ {
      constructor() {
        this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
      }
      // @ts-ignore
      getMatcher(d) {
        if (this.multiRegexes[d]) return this.multiRegexes[d];
        const E = new a();
        return this.rules.slice(d).forEach(([H, U]) => E.addRule(H, U)), E.compile(), this.multiRegexes[d] = E, E;
      }
      resumingScanAtSamePosition() {
        return this.regexIndex !== 0;
      }
      considerAll() {
        this.regexIndex = 0;
      }
      // @ts-ignore
      addRule(d, E) {
        this.rules.push([d, E]), E.type === "begin" && this.count++;
      }
      /** @param {string} s */
      exec(d) {
        const E = this.getMatcher(this.regexIndex);
        E.lastIndex = this.lastIndex;
        let H = E.exec(d);
        if (this.resumingScanAtSamePosition() && !(H && H.index === this.lastIndex)) {
          const U = this.getMatcher(0);
          U.lastIndex = this.lastIndex + 1, H = U.exec(d);
        }
        return H && (this.regexIndex += H.position + 1, this.regexIndex === this.count && this.considerAll()), H;
      }
    }
    function B(g) {
      const d = new _();
      return g.contains.forEach((E) => d.addRule(E.begin, { rule: E, type: "begin" })), g.terminatorEnd && d.addRule(g.terminatorEnd, { type: "end" }), g.illegal && d.addRule(g.illegal, { type: "illegal" }), d;
    }
    function z(g, d) {
      const E = (
        /** @type CompiledMode */
        g
      );
      if (g.isCompiled) return E;
      [
        Mt,
        // do this early so compiler extensions generally don't have to worry about
        // the distinction between match/begin
        Lt,
        Ft,
        Bt
      ].forEach((U) => U(g, d)), e.compilerExtensions.forEach((U) => U(g, d)), g.__beforeBegin = null, [
        It,
        // do this later so compiler extensions that come earlier have access to the
        // raw array if they wanted to perhaps manipulate it, etc.
        Ct,
        // default to 1 relevance if not specified
        Dt
      ].forEach((U) => U(g, d)), g.isCompiled = !0;
      let H = null;
      return typeof g.keywords == "object" && g.keywords.$pattern && (g.keywords = Object.assign({}, g.keywords), H = g.keywords.$pattern, delete g.keywords.$pattern), H = H || /\w+/, g.keywords && (g.keywords = Ze(g.keywords, e.case_insensitive)), E.keywordPatternRe = r(H, !0), d && (g.begin || (g.begin = /\B|\b/), E.beginRe = r(E.begin), !g.end && !g.endsWithParent && (g.end = /\B|\b/), g.end && (E.endRe = r(E.end)), E.terminatorEnd = T(E.end) || "", g.endsWithParent && d.terminatorEnd && (E.terminatorEnd += (g.end ? "|" : "") + d.terminatorEnd)), g.illegal && (E.illegalRe = r(
        /** @type {RegExp | string} */
        g.illegal
      )), g.contains || (g.contains = []), g.contains = [].concat(...g.contains.map(function(U) {
        return Kt(U === "self" ? g : U);
      })), g.contains.forEach(function(U) {
        z(
          /** @type Mode */
          U,
          E
        );
      }), g.starts && z(g.starts, d), E.matcher = B(E), E;
    }
    if (e.compilerExtensions || (e.compilerExtensions = []), e.contains && e.contains.includes("self"))
      throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
    return e.classNameAliases = o(e.classNameAliases || {}), z(
      /** @type Mode */
      e
    );
  }
  function Ye(e) {
    return e ? e.endsWithParent || Ye(e.starts) : !1;
  }
  function Kt(e) {
    return e.variants && !e.cachedVariants && (e.cachedVariants = e.variants.map(function(r) {
      return o(e, { variants: null }, r);
    })), e.cachedVariants ? e.cachedVariants : Ye(e) ? o(e, { starts: e.starts ? o(e.starts) : null }) : Object.isFrozen(e) ? o(e) : e;
  }
  var Xt = "11.11.2";
  class Wt extends Error {
    constructor(r, a) {
      super(r), this.name = "HTMLInjectionError", this.html = a;
    }
  }
  const De = i, qe = o, Je = Symbol("nomatch"), Yt = 7, Ve = function(e) {
    const r = /* @__PURE__ */ Object.create(null), a = /* @__PURE__ */ Object.create(null), _ = [];
    let B = !0;
    const z = "Could not find the language '{}', did you forget to load/include a language module?", g = { disableAutodetect: !0, name: "Plain text", contains: [] };
    let d = {
      ignoreUnescapedHTML: !1,
      throwUnescapedHTML: !1,
      noHighlightRe: /^(no-?highlight)$/i,
      languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
      classPrefix: "hljs-",
      cssSelector: "pre code",
      languages: null,
      // beta configuration options, subject to change, welcome to discuss
      // https://github.com/highlightjs/highlight.js/issues/1086
      __emitter: k
    };
    function E(s) {
      return d.noHighlightRe.test(s);
    }
    function H(s) {
      let b = s.className + " ";
      b += s.parentNode ? s.parentNode.className : "";
      const S = d.languageDetectRe.exec(b);
      if (S) {
        const M = ae(S[1]);
        return M || (Xe(z.replace("{}", S[1])), Xe("Falling back to no-highlight mode for this block.", s)), M ? S[1] : "no-highlight";
      }
      return b.split(/\s+/).find((M) => E(M) || ae(M));
    }
    function U(s, b, S) {
      let M = "", P = "";
      typeof b == "object" ? (M = s, S = b.ignoreIllegals, P = b.language) : (he("10.7.0", "highlight(lang, code, ...args) has been deprecated."), he("10.7.0", `Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`), P = s, M = b), S === void 0 && (S = !0);
      const Q = {
        code: M,
        language: P
      };
      Te("before:highlight", Q);
      const ce = Q.result ? Q.result : Ne(Q.language, Q.code, S);
      return ce.code = Q.code, Te("after:highlight", ce), ce;
    }
    function Ne(s, b, S, M) {
      const P = /* @__PURE__ */ Object.create(null);
      function Q(c, f) {
        return c.keywords[f];
      }
      function ce() {
        if (!y.keywords) {
          F.addText(I);
          return;
        }
        let c = 0;
        y.keywordPatternRe.lastIndex = 0;
        let f = y.keywordPatternRe.exec(I), N = "";
        for (; f; ) {
          N += I.substring(c, f.index);
          const R = te.case_insensitive ? f[0].toLowerCase() : f[0], K = Q(y, R);
          if (K) {
            const [oe, fn] = K;
            if (F.addText(N), N = "", P[R] = (P[R] || 0) + 1, P[R] <= Yt && (Me += fn), oe.startsWith("_"))
              N += f[0];
            else {
              const pn = te.classNameAliases[oe] || oe;
              ee(f[0], pn);
            }
          } else
            N += f[0];
          c = y.keywordPatternRe.lastIndex, f = y.keywordPatternRe.exec(I);
        }
        N += I.substring(c), F.addText(N);
      }
      function Oe() {
        if (I === "") return;
        let c = null;
        if (typeof y.subLanguage == "string") {
          if (!r[y.subLanguage]) {
            F.addText(I);
            return;
          }
          c = Ne(y.subLanguage, I, !0, st[y.subLanguage]), st[y.subLanguage] = /** @type {CompiledMode} */
          c._top;
        } else
          c = ze(I, y.subLanguage.length ? y.subLanguage : null);
        y.relevance > 0 && (Me += c.relevance), F.__addSublanguage(c._emitter, c.language);
      }
      function J() {
        y.subLanguage != null ? Oe() : ce(), I = "";
      }
      function ee(c, f) {
        c !== "" && (F.startScope(f), F.addText(c), F.endScope());
      }
      function nt(c, f) {
        let N = 1;
        const R = f.length - 1;
        for (; N <= R; ) {
          if (!c._emit[N]) {
            N++;
            continue;
          }
          const K = te.classNameAliases[c[N]] || c[N], oe = f[N];
          K ? ee(oe, K) : (I = oe, ce(), I = ""), N++;
        }
      }
      function it(c, f) {
        return c.scope && typeof c.scope == "string" && F.openNode(te.classNameAliases[c.scope] || c.scope), c.beginScope && (c.beginScope._wrap ? (ee(I, te.classNameAliases[c.beginScope._wrap] || c.beginScope._wrap), I = "") : c.beginScope._multi && (nt(c.beginScope, f), I = "")), y = Object.create(c, { parent: { value: y } }), y;
      }
      function rt(c, f, N) {
        let R = C(c.endRe, N);
        if (R) {
          if (c["on:end"]) {
            const K = new n(c);
            c["on:end"](f, K), K.isMatchIgnored && (R = !1);
          }
          if (R) {
            for (; c.endsParent && c.parent; )
              c = c.parent;
            return c;
          }
        }
        if (c.endsWithParent)
          return rt(c.parent, f, N);
      }
      function cn(c) {
        return y.matcher.regexIndex === 0 ? (I += c[0], 1) : (He = !0, 0);
      }
      function ln(c) {
        const f = c[0], N = c.rule, R = new n(N), K = [N.__beforeBegin, N["on:begin"]];
        for (const oe of K)
          if (oe && (oe(c, R), R.isMatchIgnored))
            return cn(f);
        return N.skip ? I += f : (N.excludeBegin && (I += f), J(), !N.returnBegin && !N.excludeBegin && (I = f)), it(N, c), N.returnBegin ? 0 : f.length;
      }
      function dn(c) {
        const f = c[0], N = b.substring(c.index), R = rt(y, c, N);
        if (!R)
          return Je;
        const K = y;
        y.endScope && y.endScope._wrap ? (J(), ee(f, y.endScope._wrap)) : y.endScope && y.endScope._multi ? (J(), nt(y.endScope, c)) : K.skip ? I += f : (K.returnEnd || K.excludeEnd || (I += f), J(), K.excludeEnd && (I = f));
        do
          y.scope && F.closeNode(), !y.skip && !y.subLanguage && (Me += y.relevance), y = y.parent;
        while (y !== R.parent);
        return R.starts && it(R.starts, c), K.returnEnd ? 0 : f.length;
      }
      function un() {
        const c = [];
        for (let f = y; f !== te; f = f.parent)
          f.scope && c.unshift(f.scope);
        c.forEach((f) => F.openNode(f));
      }
      let Re = {};
      function ot(c, f) {
        const N = f && f[0];
        if (I += c, N == null)
          return J(), 0;
        if (Re.type === "begin" && f.type === "end" && Re.index === f.index && N === "") {
          if (I += b.slice(f.index, f.index + 1), !B) {
            const R = new Error(`0 width match regex (${s})`);
            throw R.languageName = s, R.badRule = Re.rule, R;
          }
          return 1;
        }
        if (Re = f, f.type === "begin")
          return ln(f);
        if (f.type === "illegal" && !S) {
          const R = new Error('Illegal lexeme "' + N + '" for mode "' + (y.scope || "<unnamed>") + '"');
          throw R.mode = y, R;
        } else if (f.type === "end") {
          const R = dn(f);
          if (R !== Je)
            return R;
        }
        if (f.type === "illegal" && N === "")
          return f.index === b.length || (I += `
`), 1;
        if ($e > 1e5 && $e > f.index * 3)
          throw new Error("potential infinite loop, way more iterations than matches");
        return I += N, N.length;
      }
      const te = ae(s);
      if (!te)
        throw ue(z.replace("{}", s)), new Error('Unknown language: "' + s + '"');
      const gn = Zt(te);
      let Pe = "", y = M || gn;
      const st = {}, F = new d.__emitter(d);
      un();
      let I = "", Me = 0, ge = 0, $e = 0, He = !1;
      try {
        if (te.__emitTokens)
          te.__emitTokens(b, F);
        else {
          for (y.matcher.considerAll(); ; ) {
            $e++, He ? He = !1 : y.matcher.considerAll(), y.matcher.lastIndex = ge;
            const c = y.matcher.exec(b);
            if (!c) break;
            const f = b.substring(ge, c.index), N = ot(f, c);
            ge = c.index + N;
          }
          ot(b.substring(ge));
        }
        return F.finalize(), Pe = F.toHTML(), {
          language: s,
          value: Pe,
          relevance: Me,
          illegal: !1,
          _emitter: F,
          _top: y
        };
      } catch (c) {
        if (c.message && c.message.includes("Illegal"))
          return {
            language: s,
            value: De(b),
            illegal: !0,
            relevance: 0,
            _illegalBy: {
              message: c.message,
              index: ge,
              context: b.slice(ge - 100, ge + 100),
              mode: c.mode,
              resultSoFar: Pe
            },
            _emitter: F
          };
        if (B)
          return {
            language: s,
            value: De(b),
            illegal: !1,
            relevance: 0,
            errorRaised: c,
            _emitter: F,
            _top: y
          };
        throw c;
      }
    }
    function Be(s) {
      const b = {
        value: De(s),
        illegal: !1,
        relevance: 0,
        _top: g,
        _emitter: new d.__emitter(d)
      };
      return b._emitter.addText(s), b;
    }
    function ze(s, b) {
      b = b || d.languages || Object.keys(r);
      const S = Be(s), M = b.filter(ae).filter(tt).map(
        (J) => Ne(J, s, !1)
      );
      M.unshift(S);
      const P = M.sort((J, ee) => {
        if (J.relevance !== ee.relevance) return ee.relevance - J.relevance;
        if (J.language && ee.language) {
          if (ae(J.language).supersetOf === ee.language)
            return 1;
          if (ae(ee.language).supersetOf === J.language)
            return -1;
        }
        return 0;
      }), [Q, ce] = P, Oe = Q;
      return Oe.secondBest = ce, Oe;
    }
    function qt(s, b, S) {
      const M = b && a[b] || S;
      s.classList.add("hljs"), s.classList.add(`language-${M}`);
    }
    function Ue(s) {
      let b = null;
      const S = H(s);
      if (E(S)) return;
      if (Te(
        "before:highlightElement",
        { el: s, language: S }
      ), s.dataset.highlighted) {
        console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", s);
        return;
      }
      if (s.children.length > 0 && (d.ignoreUnescapedHTML || (console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."), console.warn("https://github.com/highlightjs/highlight.js/wiki/security"), console.warn("The element with unescaped HTML:"), console.warn(s)), d.throwUnescapedHTML))
        throw new Wt(
          "One of your code blocks includes unescaped HTML.",
          s.innerHTML
        );
      b = s;
      const M = b.textContent, P = S ? U(M, { language: S, ignoreIllegals: !0 }) : ze(M);
      s.innerHTML = P.value, s.dataset.highlighted = "yes", qt(s, S, P.language), s.result = {
        language: P.language,
        // TODO: remove with version 11.0
        re: P.relevance,
        relevance: P.relevance
      }, P.secondBest && (s.secondBest = {
        language: P.secondBest.language,
        relevance: P.secondBest.relevance
      }), Te("after:highlightElement", { el: s, result: P, text: M });
    }
    function Jt(s) {
      d = qe(d, s);
    }
    const Vt = () => {
      Ae(), he("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
    };
    function Qt() {
      Ae(), he("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
    }
    let Qe = !1;
    function Ae() {
      function s() {
        Ae();
      }
      if (document.readyState === "loading") {
        Qe || window.addEventListener("DOMContentLoaded", s, !1), Qe = !0;
        return;
      }
      document.querySelectorAll(d.cssSelector).forEach(Ue);
    }
    function en(s, b) {
      let S = null;
      try {
        S = b(e);
      } catch (M) {
        if (ue("Language definition for '{}' could not be registered.".replace("{}", s)), B)
          ue(M);
        else
          throw M;
        S = g;
      }
      S.name || (S.name = s), r[s] = S, S.rawDefinition = b.bind(null, e), S.aliases && et(S.aliases, { languageName: s });
    }
    function tn(s) {
      delete r[s];
      for (const b of Object.keys(a))
        a[b] === s && delete a[b];
    }
    function nn() {
      return Object.keys(r);
    }
    function ae(s) {
      return s = (s || "").toLowerCase(), r[s] || r[a[s]];
    }
    function et(s, { languageName: b }) {
      typeof s == "string" && (s = [s]), s.forEach((S) => {
        a[S.toLowerCase()] = b;
      });
    }
    function tt(s) {
      const b = ae(s);
      return b && !b.disableAutodetect;
    }
    function rn(s) {
      s["before:highlightBlock"] && !s["before:highlightElement"] && (s["before:highlightElement"] = (b) => {
        s["before:highlightBlock"](
          Object.assign({ block: b.el }, b)
        );
      }), s["after:highlightBlock"] && !s["after:highlightElement"] && (s["after:highlightElement"] = (b) => {
        s["after:highlightBlock"](
          Object.assign({ block: b.el }, b)
        );
      });
    }
    function on(s) {
      rn(s), _.push(s);
    }
    function sn(s) {
      const b = _.indexOf(s);
      b !== -1 && _.splice(b, 1);
    }
    function Te(s, b) {
      const S = s;
      _.forEach(function(M) {
        M[S] && M[S](b);
      });
    }
    function an(s) {
      return he("10.7.0", "highlightBlock will be removed entirely in v12.0"), he("10.7.0", "Please use highlightElement now."), Ue(s);
    }
    Object.assign(e, {
      highlight: U,
      highlightAuto: ze,
      highlightAll: Ae,
      highlightElement: Ue,
      // TODO: Remove with v12 API
      highlightBlock: an,
      configure: Jt,
      initHighlighting: Vt,
      initHighlightingOnLoad: Qt,
      registerLanguage: en,
      unregisterLanguage: tn,
      listLanguages: nn,
      getLanguage: ae,
      registerAliases: et,
      autoDetection: tt,
      inherit: qe,
      addPlugin: on,
      removePlugin: sn
    }), e.debugMode = function() {
      B = !1;
    }, e.safeMode = function() {
      B = !0;
    }, e.versionString = Xt, e.regex = {
      concat: A,
      lookahead: w,
      either: $,
      optional: D,
      anyNumberOfTimes: x
    };
    for (const s in xe)
      typeof xe[s] == "object" && t(xe[s]);
    return Object.assign(e, xe), e;
  }, me = Ve({});
  return me.newInstance = () => Ve({}), Ge = me, me.HighlightJS = me, me.default = me, Ge;
}
var kn = /* @__PURE__ */ Nn();
const xn = /* @__PURE__ */ wn(kn), dt = {}, Sn = "hljs-";
function An(t) {
  const n = xn.newInstance();
  return t && h(t), {
    highlight: i,
    highlightAuto: o,
    listLanguages: l,
    register: h,
    registerAlias: u,
    registered: p
  };
  function i(m, v, k) {
    const T = k || dt, w = typeof T.prefix == "string" ? T.prefix : Sn;
    if (!n.getLanguage(m))
      throw new Error("Unknown language: `" + m + "` is not registered");
    n.configure({ __emitter: Tn, classPrefix: w });
    const x = (
      /** @type {HighlightResult & {_emitter: HastEmitter}} */
      n.highlight(v, { ignoreIllegals: !0, language: m })
    );
    if (x.errorRaised)
      throw new Error("Could not highlight with `Highlight.js`", {
        cause: x.errorRaised
      });
    const D = x._emitter.root, A = (
      /** @type {RootData} */
      D.data
    );
    return A.language = x.language, A.relevance = x.relevance, D;
  }
  function o(m, v) {
    const T = (v || dt).subset || l();
    let w = -1, x = 0, D;
    for (; ++w < T.length; ) {
      const A = T[w];
      if (!n.getLanguage(A)) continue;
      const L = i(A, m, v);
      L.data && L.data.relevance !== void 0 && L.data.relevance > x && (x = L.data.relevance, D = L);
    }
    return D || {
      type: "root",
      children: [],
      data: { language: void 0, relevance: x }
    };
  }
  function l() {
    return n.listLanguages();
  }
  function h(m, v) {
    if (typeof m == "string")
      n.registerLanguage(m, v);
    else {
      let k;
      for (k in m)
        Object.hasOwn(m, k) && n.registerLanguage(k, m[k]);
    }
  }
  function u(m, v) {
    if (typeof m == "string")
      n.registerAliases(
        // Note: copy needed because hljs doesn’t accept readonly arrays yet.
        typeof v == "string" ? v : [...v],
        { languageName: m }
      );
    else {
      let k;
      for (k in m)
        if (Object.hasOwn(m, k)) {
          const T = m[k];
          n.registerAliases(
            // Note: copy needed because hljs doesn’t accept readonly arrays yet.
            typeof T == "string" ? T : [...T],
            { languageName: k }
          );
        }
    }
  }
  function p(m) {
    return !!n.getLanguage(m);
  }
}
class Tn {
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
    const i = this.stack[this.stack.length - 1], o = i.children[i.children.length - 1];
    o && o.type === "text" ? o.value += n : i.children.push({ type: "text", value: n });
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
  __addSublanguage(n, i) {
    const o = this.stack[this.stack.length - 1], l = (
      /** @type {Array<ElementContent>} */
      n.root.children
    );
    i ? o.children.push({
      type: "element",
      tagName: "span",
      properties: { className: [i] },
      children: l
    }) : o.children.push(...l);
  }
  /**
   * @param {string} name
   *   Name to add.
   * @returns {undefined}
   *   Nothing.
   */
  openNode(n) {
    const i = this, o = n.split(".").map(function(u, p) {
      return p ? u + "_".repeat(p) : i.options.classPrefix + u;
    }), l = this.stack[this.stack.length - 1], h = {
      type: "element",
      tagName: "span",
      properties: { className: o },
      children: []
    };
    l.children.push(h), this.stack.push(h);
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
const Le = "[A-Za-z$_][0-9A-Za-z$_]*", bt = [
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
], ht = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
], mt = [
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
], Et = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
], _t = [
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
], yt = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "self",
  "global"
  // Node.js
], vt = [].concat(
  _t,
  mt,
  Et
);
function On(t) {
  const n = t.regex, i = (O, { after: Y }) => {
    const q = "</" + O[0].slice(1);
    return O.input.indexOf(q, Y) !== -1;
  }, o = Le, l = {
    begin: "<>",
    end: "</>"
  }, h = /<[A-Za-z0-9\\._:-]+\s*\/>/, u = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (O, Y) => {
      const q = O[0].length + O.index, V = O.input[q];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        V === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        V === ","
      ) {
        Y.ignoreMatch();
        return;
      }
      V === ">" && (i(O, { after: q }) || Y.ignoreMatch());
      let re;
      const de = O.input.substring(q);
      if (re = de.match(/^\s*=/)) {
        Y.ignoreMatch();
        return;
      }
      if ((re = de.match(/^\s+extends\s+/)) && re.index === 0) {
        Y.ignoreMatch();
        return;
      }
    }
  }, p = {
    $pattern: Le,
    keyword: bt,
    literal: ht,
    built_in: vt,
    "variable.language": yt
  }, m = "[0-9](_?[0-9])*", v = `\\.(${m})`, k = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", T = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${k})((${v})|\\.)?|(${v}))[eE][+-]?(${m})\\b` },
      { begin: `\\b(${k})\\b((${v})\\b|\\.)?|(${v})\\b` },
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
    keywords: p,
    contains: []
    // defined later
  }, x = {
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
  }, D = {
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
  }, A = {
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
  }, G = {
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
                  begin: o + "(?=\\s*(-)|$)",
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
  }, C = [
    t.APOS_STRING_MODE,
    t.QUOTE_STRING_MODE,
    x,
    D,
    A,
    L,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    T
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  w.contains = C.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: p,
    contains: [
      "self"
    ].concat(C)
  });
  const Z = [].concat(G, w.contains), j = Z.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: p,
      contains: ["self"].concat(Z)
    }
  ]), W = {
    className: "params",
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/,
    // to match the parms with
    end: /\)/,
    excludeBegin: !0,
    excludeEnd: !0,
    keywords: p,
    contains: j
  }, se = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          o,
          /\s+/,
          /extends/,
          /\s+/,
          n.concat(o, "(", n.concat(/\./, o), ")*")
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
          o
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
        ...mt,
        ...Et
      ]
    }
  }, fe = {
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
          o,
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
    contains: [W],
    illegal: /%/
  }, be = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function _e(O) {
    return n.concat("(?!", O.join("|"), ")");
  }
  const ye = {
    match: n.concat(
      /\b/,
      _e([
        ..._t,
        "super",
        "import",
        "await"
      ].map((O) => `${O}\\s*\\(`)),
      o,
      n.lookahead(/\s*\(/)
    ),
    className: "title.function",
    relevance: 0
  }, ie = {
    begin: n.concat(/\./, n.lookahead(
      n.concat(o, /(?![0-9A-Za-z$_(])/)
    )),
    end: o,
    excludeBegin: !0,
    keywords: "prototype",
    className: "property",
    relevance: 0
  }, ve = {
    match: [
      /get|set/,
      /\s+/,
      o,
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
      W
    ]
  }, le = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + t.UNDERSCORE_IDENT_RE + ")\\s*=>", we = {
    match: [
      /const|var|let/,
      /\s+/,
      o,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      n.lookahead(le)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      W
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: p,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS: j, CLASS_REFERENCE: ne },
    illegal: /#(?![$_A-Za-z])/,
    contains: [
      t.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      fe,
      t.APOS_STRING_MODE,
      t.QUOTE_STRING_MODE,
      x,
      D,
      A,
      L,
      G,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      T,
      ne,
      {
        scope: "attr",
        match: o + n.lookahead(":"),
        relevance: 0
      },
      we,
      {
        // "value" container
        begin: "(" + t.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          G,
          t.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: le,
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
                    keywords: p,
                    contains: j
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
              { begin: l.begin, end: l.end },
              { match: h },
              {
                begin: u.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": u.isTrulyOpeningTag,
                end: u.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: u.begin,
                end: u.end,
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
          W,
          t.inherit(t.TITLE_MODE, { begin: o, className: "title.function" })
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
        match: "\\$" + o,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [W]
      },
      ye,
      be,
      se,
      ve,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
function Rn(t) {
  const n = t.regex, i = On(t), o = Le, l = [
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
  ], h = {
    begin: [
      /namespace/,
      /\s+/,
      t.IDENT_RE
    ],
    beginScope: {
      1: "keyword",
      3: "title.class"
    }
  }, u = {
    beginKeywords: "interface",
    end: /\{/,
    excludeEnd: !0,
    keywords: {
      keyword: "interface extends",
      built_in: l
    },
    contains: [i.exports.CLASS_REFERENCE]
  }, p = {
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use strict['"]/
  }, m = [
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
  ], v = {
    $pattern: Le,
    keyword: bt.concat(m),
    literal: ht,
    built_in: vt.concat(l),
    "variable.language": yt
  }, k = {
    className: "meta",
    begin: "@" + o
  }, T = (A, L, $) => {
    const G = A.contains.findIndex((C) => C.label === L);
    if (G === -1)
      throw new Error("can not find mode to replace");
    A.contains.splice(G, 1, $);
  };
  Object.assign(i.keywords, v), i.exports.PARAMS_CONTAINS.push(k);
  const w = i.contains.find((A) => A.scope === "attr"), x = Object.assign(
    {},
    w,
    { match: n.concat(o, n.lookahead(/\s*\?:/)) }
  );
  i.exports.PARAMS_CONTAINS.push([
    i.exports.CLASS_REFERENCE,
    // class reference for highlighting the params types
    w,
    // highlight the params key
    x
    // Added for optional property assignment highlighting
  ]), i.contains = i.contains.concat([
    k,
    h,
    u,
    x
    // Added for optional property assignment highlighting
  ]), T(i, "shebang", t.SHEBANG()), T(i, "use_strict", p);
  const D = i.contains.find((A) => A.label === "func.def");
  return D.relevance = 0, Object.assign(i, {
    name: "TypeScript",
    aliases: [
      "ts",
      "tsx",
      "mts",
      "cts"
    ]
  }), i;
}
const ut = "[A-Za-z$_][0-9A-Za-z$_]*", Mn = [
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
], In = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
], wt = [
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
], Nt = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
], kt = [
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
], Cn = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "self",
  "global"
  // Node.js
], Ln = [].concat(
  kt,
  wt,
  Nt
);
function Dn(t) {
  const n = t.regex, i = (O, { after: Y }) => {
    const q = "</" + O[0].slice(1);
    return O.input.indexOf(q, Y) !== -1;
  }, o = ut, l = {
    begin: "<>",
    end: "</>"
  }, h = /<[A-Za-z0-9\\._:-]+\s*\/>/, u = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (O, Y) => {
      const q = O[0].length + O.index, V = O.input[q];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        V === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        V === ","
      ) {
        Y.ignoreMatch();
        return;
      }
      V === ">" && (i(O, { after: q }) || Y.ignoreMatch());
      let re;
      const de = O.input.substring(q);
      if (re = de.match(/^\s*=/)) {
        Y.ignoreMatch();
        return;
      }
      if ((re = de.match(/^\s+extends\s+/)) && re.index === 0) {
        Y.ignoreMatch();
        return;
      }
    }
  }, p = {
    $pattern: ut,
    keyword: Mn,
    literal: In,
    built_in: Ln,
    "variable.language": Cn
  }, m = "[0-9](_?[0-9])*", v = `\\.(${m})`, k = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", T = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${k})((${v})|\\.)?|(${v}))[eE][+-]?(${m})\\b` },
      { begin: `\\b(${k})\\b((${v})\\b|\\.)?|(${v})\\b` },
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
    keywords: p,
    contains: []
    // defined later
  }, x = {
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
  }, D = {
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
  }, A = {
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
  }, G = {
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
                  begin: o + "(?=\\s*(-)|$)",
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
  }, C = [
    t.APOS_STRING_MODE,
    t.QUOTE_STRING_MODE,
    x,
    D,
    A,
    L,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    T
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  w.contains = C.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: p,
    contains: [
      "self"
    ].concat(C)
  });
  const Z = [].concat(G, w.contains), j = Z.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: p,
      contains: ["self"].concat(Z)
    }
  ]), W = {
    className: "params",
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/,
    // to match the parms with
    end: /\)/,
    excludeBegin: !0,
    excludeEnd: !0,
    keywords: p,
    contains: j
  }, se = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          o,
          /\s+/,
          /extends/,
          /\s+/,
          n.concat(o, "(", n.concat(/\./, o), ")*")
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
          o
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
        ...wt,
        ...Nt
      ]
    }
  }, fe = {
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
          o,
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
    contains: [W],
    illegal: /%/
  }, be = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function _e(O) {
    return n.concat("(?!", O.join("|"), ")");
  }
  const ye = {
    match: n.concat(
      /\b/,
      _e([
        ...kt,
        "super",
        "import",
        "await"
      ].map((O) => `${O}\\s*\\(`)),
      o,
      n.lookahead(/\s*\(/)
    ),
    className: "title.function",
    relevance: 0
  }, ie = {
    begin: n.concat(/\./, n.lookahead(
      n.concat(o, /(?![0-9A-Za-z$_(])/)
    )),
    end: o,
    excludeBegin: !0,
    keywords: "prototype",
    className: "property",
    relevance: 0
  }, ve = {
    match: [
      /get|set/,
      /\s+/,
      o,
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
      W
    ]
  }, le = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + t.UNDERSCORE_IDENT_RE + ")\\s*=>", we = {
    match: [
      /const|var|let/,
      /\s+/,
      o,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      n.lookahead(le)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      W
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: p,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS: j, CLASS_REFERENCE: ne },
    illegal: /#(?![$_A-Za-z])/,
    contains: [
      t.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      fe,
      t.APOS_STRING_MODE,
      t.QUOTE_STRING_MODE,
      x,
      D,
      A,
      L,
      G,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      T,
      ne,
      {
        scope: "attr",
        match: o + n.lookahead(":"),
        relevance: 0
      },
      we,
      {
        // "value" container
        begin: "(" + t.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          G,
          t.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: le,
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
                    keywords: p,
                    contains: j
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
              { begin: l.begin, end: l.end },
              { match: h },
              {
                begin: u.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": u.isTrulyOpeningTag,
                end: u.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: u.begin,
                end: u.end,
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
          W,
          t.inherit(t.TITLE_MODE, { begin: o, className: "title.function" })
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
        match: "\\$" + o,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [W]
      },
      ye,
      be,
      se,
      ve,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
const Bn = (t) => ({
  IMPORTANT: {
    scope: "meta",
    begin: "!important"
  },
  BLOCK_COMMENT: t.C_BLOCK_COMMENT_MODE,
  HEXCOLOR: {
    scope: "number",
    begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
  },
  UNICODE_RANGE: {
    scope: "number",
    begin: /\b[Uu]\+[0-9A-Fa-f][0-9A-Fa-f?]{0,5}(-[0-9A-Fa-f][0-9A-Fa-f]{0,5})?/
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
}), zn = [
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
], Un = [
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
], Pn = [
  ...zn,
  ...Un
], $n = [
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
].sort().reverse(), Hn = [
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
].sort().reverse(), Gn = [
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
].sort().reverse(), jn = [
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
  "corner-bottom-left-shape",
  "corner-bottom-right-shape",
  "corner-shape",
  "corner-top-left-shape",
  "corner-top-right-shape",
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
  "unicode-range",
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
function Fn(t) {
  const n = t.regex, i = Bn(t), o = { begin: /-(webkit|moz|ms|o)-(?=[a-z])/ }, l = "and or not only", h = /@-?\w[\w]*(-\w+)*/, u = "[a-zA-Z-][a-zA-Z0-9_-]*", p = [
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
      i.BLOCK_COMMENT,
      o,
      // to recognize keyframe 40% etc which are outside the scope of our
      // attribute value mode
      i.CSS_NUMBER_MODE,
      {
        className: "selector-id",
        begin: /#[A-Za-z0-9_-]+/,
        relevance: 0
      },
      {
        className: "selector-class",
        begin: "\\." + u,
        relevance: 0
      },
      i.ATTRIBUTE_SELECTOR_MODE,
      {
        className: "selector-pseudo",
        variants: [
          { begin: ":(" + Hn.join("|") + ")" },
          { begin: ":(:)?(" + Gn.join("|") + ")" }
        ]
      },
      // we may actually need this (12/2020)
      // { // pseudo-selector params
      //   begin: /\(/,
      //   end: /\)/,
      //   contains: [ hljs.CSS_NUMBER_MODE ]
      // },
      i.CSS_VARIABLE,
      {
        className: "attribute",
        begin: "\\b(" + jn.join("|") + ")\\b"
      },
      // attribute values
      {
        begin: /:/,
        end: /[;}{]/,
        contains: [
          i.BLOCK_COMMENT,
          i.HEXCOLOR,
          i.IMPORTANT,
          i.CSS_NUMBER_MODE,
          i.UNICODE_RANGE,
          ...p,
          // needed to highlight these as strings and to avoid issues with
          // illegal characters that might be inside urls that would trigger the
          // languages illegal stack
          {
            begin: /(url|data-uri)\(/,
            end: /\)/,
            relevance: 0,
            // from keywords
            keywords: { built_in: "url data-uri" },
            contains: [
              ...p,
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
          i.FUNCTION_DISPATCH
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
            begin: h
          },
          {
            begin: /\s/,
            endsWithParent: !0,
            excludeEnd: !0,
            relevance: 0,
            keywords: {
              $pattern: /[a-z-]+/,
              keyword: l,
              attribute: $n.join(" ")
            },
            contains: [
              {
                begin: /[a-z-]+(?=:)/,
                className: "attribute"
              },
              ...p,
              i.CSS_NUMBER_MODE
            ]
          }
        ]
      },
      {
        className: "selector-tag",
        begin: "\\b(" + Pn.join("|") + ")\\b"
      }
    ]
  };
}
const Zn = (t) => ({
  IMPORTANT: {
    scope: "meta",
    begin: "!important"
  },
  BLOCK_COMMENT: t.C_BLOCK_COMMENT_MODE,
  HEXCOLOR: {
    scope: "number",
    begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
  },
  UNICODE_RANGE: {
    scope: "number",
    begin: /\b[Uu]\+[0-9A-Fa-f][0-9A-Fa-f?]{0,5}(-[0-9A-Fa-f][0-9A-Fa-f]{0,5})?/
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
}), Kn = [
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
], Xn = [
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
], Wn = [
  ...Kn,
  ...Xn
], Yn = [
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
].sort().reverse(), qn = [
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
].sort().reverse(), Jn = [
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
].sort().reverse(), Vn = [
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
  "corner-bottom-left-shape",
  "corner-bottom-right-shape",
  "corner-shape",
  "corner-top-left-shape",
  "corner-top-right-shape",
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
  "unicode-range",
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
function Qn(t) {
  const n = Zn(t), i = Jn, o = qn, l = "@[a-z-]+", h = "and or not only", p = {
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
        begin: "\\b(" + Wn.join("|") + ")\\b",
        // was there, before, but why?
        relevance: 0
      },
      {
        className: "selector-pseudo",
        begin: ":(" + o.join("|") + ")"
      },
      {
        className: "selector-pseudo",
        begin: ":(:)?(" + i.join("|") + ")"
      },
      p,
      {
        // pseudo-selector params
        begin: /\(/,
        end: /\)/,
        contains: [n.CSS_NUMBER_MODE]
      },
      n.CSS_VARIABLE,
      {
        className: "attribute",
        begin: "\\b(" + Vn.join("|") + ")\\b"
      },
      { begin: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b" },
      {
        begin: /:/,
        end: /[;}{]/,
        relevance: 0,
        contains: [
          n.BLOCK_COMMENT,
          p,
          n.HEXCOLOR,
          n.CSS_NUMBER_MODE,
          n.UNICODE_RANGE,
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
          $pattern: l,
          keyword: "@page @font-face"
        }
      },
      {
        begin: "@",
        end: "[{;]",
        returnBegin: !0,
        keywords: {
          $pattern: /[a-z-]+/,
          keyword: h,
          attribute: Yn.join(" ")
        },
        contains: [
          {
            begin: l,
            className: "keyword"
          },
          {
            begin: /[a-z-]+(?=:)/,
            className: "attribute"
          },
          p,
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
const ei = "([-+]?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)|NaN|[-+]?Infinity", ti = {
  scope: "number",
  match: ei,
  relevance: 0
};
function ni(t) {
  const n = {
    className: "attr",
    begin: /(("(\\.|[^\\"\r\n])*")|('(\\.|[^\\'\r\n])*'))(?=\s*:)/,
    relevance: 1.01
  }, i = {
    match: /[{}[\],:]/,
    className: "punctuation",
    relevance: 0
  }, o = [
    "true",
    "false",
    "null"
  ], l = {
    scope: "literal",
    beginKeywords: o.join(" ")
  };
  return {
    name: "JSON",
    aliases: ["jsonc", "json5"],
    keywords: {
      literal: o
    },
    contains: [
      n,
      i,
      t.APOS_STRING_MODE,
      t.QUOTE_STRING_MODE,
      l,
      ti,
      t.C_LINE_COMMENT_MODE,
      t.C_BLOCK_COMMENT_MODE
    ],
    illegal: "\\S"
  };
}
function ii(t) {
  const n = t.regex, i = {}, o = {
    begin: /\$\{/,
    end: /\}/,
    contains: [
      "self",
      {
        begin: /:-/,
        contains: [i]
      }
      // default values
    ]
  };
  Object.assign(i, {
    className: "variable",
    variants: [
      { begin: n.concat(
        /\$[\w\d#@][\w\d_]*/,
        // negative look-ahead tries to avoid matching patterns that are not
        // Perl at all like $ident$, @ident@, etc.
        "(?![\\w\\d])(?![$])"
      ) },
      o
    ]
  });
  const l = {
    className: "subst",
    begin: /\$\(/,
    end: /\)/,
    contains: [t.BACKSLASH_ESCAPE]
  }, h = t.inherit(
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
  ), u = {
    begin: /<<-?\s*(?=\w+)/,
    starts: { contains: [
      t.END_SAME_AS_BEGIN({
        begin: /(\w+)/,
        end: /(\w+)/,
        className: "string"
      })
    ] }
  }, p = {
    className: "string",
    begin: /"/,
    end: /"/,
    contains: [
      t.BACKSLASH_ESCAPE,
      i,
      l
    ]
  };
  l.contains.push(p);
  const m = {
    match: /\\"/
  }, v = {
    className: "string",
    begin: /'/,
    end: /'/
  }, k = {
    match: /\\'/
  }, T = {
    begin: /\$?\(\(/,
    end: /\)\)/,
    contains: [
      {
        begin: /\d+#[0-9a-f]+/,
        className: "number"
      },
      t.NUMBER_MODE,
      i
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
  ], x = t.SHEBANG({
    binary: `(${w.join("|")})`,
    relevance: 10
  }), D = {
    className: "function",
    begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
    returnBegin: !0,
    contains: [t.inherit(t.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
    relevance: 0
  }, A = [
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
  ], $ = { match: /(\/[a-z._-]+)+/ }, G = [
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
  ], C = [
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
  ], Z = [
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
  ], j = [
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
      keyword: A,
      literal: L,
      built_in: [
        ...G,
        ...C,
        // Shell modifiers
        "set",
        "shopt",
        ...Z,
        ...j
      ]
    },
    contains: [
      x,
      // to catch known shells and boost relevancy
      t.SHEBANG(),
      // to catch unknown shells but still highlight the shebang
      D,
      T,
      h,
      u,
      $,
      p,
      m,
      v,
      k,
      i
    ]
  };
}
function ri(t) {
  const n = t.regex, i = n.concat(/[\p{L}_]/u, n.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u), o = /[\p{L}0-9._:-]+/u, l = {
    className: "symbol",
    begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
  }, h = {
    begin: /\s/,
    contains: [
      {
        className: "keyword",
        begin: /#?[a-z_][a-z1-9_-]+/,
        illegal: /\n/
      }
    ]
  }, u = t.inherit(h, {
    begin: /\(/,
    end: /\)/
  }), p = t.inherit(t.APOS_STRING_MODE, { className: "string" }), m = t.inherit(t.QUOTE_STRING_MODE, { className: "string" }), v = {
    endsWithParent: !0,
    illegal: /</,
    relevance: 0,
    contains: [
      {
        className: "attr",
        begin: o,
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
                contains: [l]
              },
              {
                begin: /'/,
                end: /'/,
                contains: [l]
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
          h,
          m,
          p,
          u,
          {
            begin: /\[/,
            end: /\]/,
            contains: [
              {
                className: "meta",
                begin: /<![a-z]/,
                end: />/,
                contains: [
                  h,
                  u,
                  m,
                  p
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
      l,
      // xml processing instructions
      {
        className: "meta",
        end: /\?>/,
        variants: [
          {
            begin: /<\?xml/,
            relevance: 10,
            contains: [
              m
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
        contains: [v],
        starts: {
          end: /<\/style>/,
          returnEnd: !0,
          subLanguage: "css"
        }
      },
      {
        className: "tag",
        // See the comment in the <style tag about the lookahead pattern
        begin: /<script(?=\s|>)/,
        end: />/,
        keywords: { name: "script" },
        contains: [v],
        starts: {
          end: /<\/script>/,
          returnEnd: !0,
          subLanguage: "javascript"
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
            i,
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
            begin: i,
            relevance: 0,
            starts: v
          }
        ]
      },
      // close tag
      {
        className: "tag",
        begin: n.concat(
          /<\//,
          n.lookahead(n.concat(
            i,
            />/
          ))
        ),
        contains: [
          {
            className: "name",
            begin: i,
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
function oi(t) {
  const n = "true false yes no null", i = "[\\w#;/?:@&=+$,.~*'()[\\]]+", o = {
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
  }, l = {
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
  }, h = {
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
  }, u = {
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
      l
    ]
  }, p = t.inherit(u, { variants: [
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
  }, x = {
    end: ",",
    endsWithParent: !0,
    excludeEnd: !0,
    keywords: n,
    relevance: 0
  }, D = {
    begin: /\{/,
    end: /\}/,
    contains: [x],
    illegal: "\\n",
    relevance: 0
  }, A = {
    begin: "\\[",
    end: "\\]",
    contains: [x],
    illegal: "\\n",
    relevance: 0
  }, L = [
    o,
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
      begin: "!\\w+!" + i
    },
    // https://yaml.org/spec/1.2/spec.html#id2784064
    {
      // verbatim tags
      className: "type",
      begin: "!<" + i + ">"
    },
    {
      // primary tags
      className: "type",
      begin: "!" + i
    },
    {
      // secondary tags
      className: "type",
      begin: "!!" + i
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
    D,
    A,
    h,
    u
  ], $ = [...L];
  return $.pop(), $.push(p), x.contains = $, {
    name: "YAML",
    case_insensitive: !0,
    aliases: ["yml"],
    contains: L
  };
}
function si(t) {
  const n = t.regex, i = {
    begin: /<\/?[A-Za-z_]/,
    end: ">",
    subLanguage: "xml",
    relevance: 0
  }, o = { match: /^ {0,3}([-*_])[ \t]*(?:\1[ \t]*){2,}$/ }, l = {
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
  }, h = {
    className: "bullet",
    begin: "^[ 	]*([*+-]|(\\d+\\.))(?=\\s+)",
    end: "\\s+",
    excludeEnd: !0
  }, u = {
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
  }, p = /[A-Za-z][A-Za-z0-9+.-]*/, m = {
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
        begin: n.concat(/\[.+?\]\(/, p, /:\/\/.*?\)/),
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
  }, v = {
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
  }, k = {
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
  }, T = t.inherit(v, { contains: [] }), w = t.inherit(k, { contains: [] });
  v.contains.push(w), k.contains.push(T);
  let x = [
    i,
    m
  ];
  return [
    v,
    k,
    T,
    w
  ].forEach(($) => {
    $.contains = $.contains.concat(x);
  }), x = x.concat(v, k), {
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
            contains: x
          },
          {
            begin: "(?=^.+?\\n[=-]{2,}$)",
            contains: [
              { begin: "^[=-]*$" },
              {
                begin: "^",
                end: "\\n",
                contains: x
              }
            ]
          }
        ]
      },
      i,
      h,
      // must come before BOLD/ITALIC so that a `***` or `___` thematic break
      // isn't mistaken for the start of bold text
      o,
      v,
      k,
      {
        className: "quote",
        begin: "^>\\s+",
        contains: x,
        end: "$"
      },
      l,
      m,
      u,
      {
        //https://spec.commonmark.org/0.31.2/#entity-references
        scope: "literal",
        match: /&([a-zA-Z0-9]+|#[0-9]{1,7}|#[Xx][0-9a-fA-F]{1,6});/
      }
    ]
  };
}
const ai = /\b[a-z][a-z0-9]*(?:-[a-z0-9]+)+\b(?=\s*[{,:>+~.[]|\s+[a-z*#])/, ci = (t) => {
  const n = Fn(t), i = { className: "selector-tag", begin: ai }, o = n.contains ?? [], l = o.findIndex((u) => typeof u != "string" && u.className === "selector-tag"), h = l === -1 ? o.length : l;
  return { ...n, contains: [...o.slice(0, h), i, ...o.slice(h)] };
}, Ce = An({
  typescript: Rn,
  javascript: Dn,
  css: ci,
  scss: Qn,
  json: ni,
  bash: ii,
  xml: ri,
  yaml: oi,
  markdown: si
}), li = {
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
}, di = (t) => {
  const n = (t ?? "").trim().toLowerCase();
  if (!n) return null;
  const i = li[n] ?? n;
  return Ce.registered(i) ? i : null;
}, ui = /* @__PURE__ */ new Set(["tsx", "jsx"]), gi = (t, n) => {
  const i = (n ?? "").trim().toLowerCase();
  return ui.has(i) ? /^\s*<[A-Za-z>]/.test(t) : !1;
}, gt = "(<>", ft = "</>)", fi = (t, n, i) => {
  const o = t.map((u) => ({ className: u.className, value: u.value }));
  let l = n;
  for (const u of o) {
    const p = Math.min(l, u.value.length);
    if (u.value = u.value.slice(p), l -= p, l === 0) break;
  }
  let h = i;
  for (const u of [...o].reverse()) {
    const p = Math.min(h, u.value.length);
    if (u.value = u.value.slice(0, u.value.length - p), h -= p, h === 0) break;
  }
  return o.filter((u) => u.value.length > 0);
}, ke = (t, n, i) => {
  var o;
  if (t.type === "text") {
    t.value && i.push({ className: n, value: t.value });
    return;
  }
  if (t.type === "element") {
    const l = (o = t.properties) == null ? void 0 : o.className, h = Array.isArray(l) ? l.join(" ") : "", u = n && h ? `${n} ${h}` : n || h;
    for (const p of t.children) ke(p, u, i);
    return;
  }
  if (t.type === "root")
    for (const l of t.children) ke(l, n, i);
}, Ie = new RegExp("([(){}\\[\\]<>.,;:=+*\\/%!&|^~?]+|(?<![A-Za-z0-9_])-+|-+(?![A-Za-z0-9_]))", "g"), je = (t) => {
  const n = [];
  for (const i of t) {
    if (i.className) {
      n.push(i);
      continue;
    }
    let o = 0;
    Ie.lastIndex = 0;
    for (let l = Ie.exec(i.value); l; l = Ie.exec(i.value))
      l.index > o && n.push({ className: "", value: i.value.slice(o, l.index) }), n.push({ className: "hljs-punctuation", value: l[0] }), o = Ie.lastIndex;
    o < i.value.length && n.push({ className: "", value: i.value.slice(o) });
  }
  return n;
}, pi = (t, n) => {
  if (!t) return [];
  const i = di(n);
  if (i && gi(t, n)) {
    const h = [];
    return ke(Ce.highlight(i, gt + t + ft), "", h), je(fi(h, gt.length, ft.length));
  }
  if (i) {
    const h = [];
    return ke(Ce.highlight(i, t), "", h), je(h);
  }
  const o = Ce.highlightAuto(t);
  if (o.children.length === 0) return [{ className: "", value: t }];
  const l = [];
  return ke(o, "", l), je(l);
}, bi = (t) => {
  const n = [[]];
  for (const i of t)
    i.value.split(`
`).forEach((l, h) => {
      h > 0 && n.push([]), l && n[n.length - 1].push({ className: i.className, value: l });
    });
  return n;
}, pt = (t) => ({ isCopied: !1, error: new Error(t) }), hi = { isCopied: !0, error: null }, mi = () => typeof navigator < "u" ? !!navigator.clipboard : !1, Ei = async (t) => {
  if (!mi()) return pt("clipboard unavailable in this context");
  try {
    return await navigator.clipboard.writeText(t), hi;
  } catch (i) {
    return i instanceof Error ? { isCopied: !1, error: i } : pt("clipboard write rejected");
  }
}, Mi = 1600, _i = bn`
	:host {
		display: block;
		--accent: var(--primary);
		width: 100%;
		min-width: 0;
	}

	:host([tone='secondary']) {
		--accent: var(--purple);
	}

	:host([tone='tertiary']) {
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

	:host([is-flush]) .block {
		border: 0;
		border-radius: 0;
		background: transparent;
	}

	.tabs {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		min-width: 0;
		overflow-x: auto;
		scrollbar-width: none;
	}

	.file-tab {
		position: relative;
		padding: 0.3125rem 0.625rem;
		background: transparent;
		border: 0;
		border-radius: var(--radius-sm);
		color: var(--muted-foreground);
		font-family: var(--font-mono);
		font-size: var(--font-size-caption);
		white-space: nowrap;
		cursor: pointer;
		transition:
			color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}

	.file-tab:hover {
		color: var(--foreground);
	}

	.file-tab.is-active {
		color: var(--foreground);
		background: color-mix(in oklch, var(--foreground) 8%, transparent);
	}

	.file-tab:focus-visible {
		outline: 3px solid var(--focus-ring);
		outline-offset: 1px;
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
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		flex-shrink: 0;
		padding: 0.25rem 0.5rem;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		color: var(--muted-foreground);
		font-family: inherit;
		font-size: var(--font-size-caption);
		cursor: pointer;
		transition:
			color var(--motion-fast) var(--ease-enter),
			border-color var(--motion-fast) var(--ease-enter),
			background-color var(--motion-fast) var(--ease-enter);
	}

	.copy:hover {
		color: var(--foreground);
		border-color: color-mix(in oklch, var(--foreground) 30%, transparent);
	}

	.copy:focus-visible {
		outline: 3px solid var(--focus-ring);
		outline-offset: 2px;
	}

	.copy.is-copied {
		color: var(--success);
		border-color: color-mix(in oklch, var(--success) 50%, transparent);
	}

	.copy svg {
		width: 0.875rem;
		height: 0.875rem;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}

	.scroll {
		overflow: auto;
	}
	/* Firefox only: Chromium uses the arrow-less ::-webkit-scrollbar below; giving
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
		/* Code stays selectable even though the page default is user-select:none,
		   people need to copy snippets. The line-number gutter re-opts out
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
		padding-inline-end: 1rem;
		text-align: end;
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
		transition: opacity var(--motion-fast) var(--ease-enter);
	}

	.block:hover .line.is-dimmed {
		opacity: 1;
	}

	/*
	 * highlight.js token classes mapped onto the zest --syntax-* palette.
	 * Ordering matters: highlight.js nests JSX content inside .hljs-tag (e.g.
	 * "hljs-tag hljs-attr"), so structural classes (.hljs-tag) are declared
	 * BEFORE content classes, equal-specificity ties go to the later rule, so
	 * the nested attr/name/string colors win over the dim tag brackets.
	 */
	.hljs-comment,
	.hljs-quote {
		color: var(--syntax-comment);
		font-style: italic;
	}
	/* JSX/HTML angle-bracket structure: <, >, /, =, kept dim. */
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
`, yi = (t) => {
  var n, i;
  return (i = (n = t.match(/\.([a-z0-9]+)$/i)) == null ? void 0 : n[1]) == null ? void 0 : i.toLowerCase();
}, vi = (t, n, i) => {
  const o = t.replace(/\n$/, "");
  return i ? [{ value: o, className: "" }] : pi(o, n);
}, Fe = (t) => {
  const n = /* @__PURE__ */ new Set();
  if (!t) return n;
  for (const i of t.split(",")) {
    const o = i.trim();
    if (!o) continue;
    const l = o.split("-"), h = Number(l[0]), u = l.length > 1 ? Number(l[1]) : h;
    if (Number.isFinite(h) && Number.isFinite(u))
      for (let m = Math.min(h, u); m <= Math.max(h, u); m += 1)
        n.add(m);
  }
  return n;
}, wi = (t, n) => {
  const i = ["line"];
  return n.added.has(t) && i.push("is-added"), n.removed.has(t) && i.push("is-removed"), n.focused.size > 0 && !n.focused.has(t) && i.push("is-dimmed"), i.join(" ");
}, Ni = (t, n) => n.added.has(t) ? "+" : n.removed.has(t) ? "-" : String(t), ki = hn(
  (t) => {
    const n = vn(), [i, o] = at(!1), [l, h] = at(0), u = Array.isArray(t.files) ? t.files : [], p = u.length ? u[Math.min(l, u.length - 1)] : void 0, m = p ? p.code : t.code ?? "", v = p ? p.language || yi(p.name) : t.language, k = ct(
      () => vi(m, v, !!t.isPlain),
      [m, v, t.isPlain]
    ), T = ct(() => bi(k), [k]), w = {
      added: Fe(t.addedLines),
      removed: Fe(t.removedLines),
      focused: Fe(t.focusLines)
    }, x = w.added.size > 0 || w.removed.size > 0 || w.focused.size > 0, D = !!t.hasLineNumbers || x, A = w.added.size > 0 || w.removed.size > 0, L = (C, Z) => C.className ? /* @__PURE__ */ X("span", { class: C.className, children: C.value }, Z) : C.value, $ = async () => {
      (await Ei(m)).isCopied && (o(!0), t.copy(), setTimeout(() => o(!1), 1600));
    }, G = !t.isHeaderHidden && (u.length > 0 || t.filename || t.language || !t.isCopyHidden);
    return /* @__PURE__ */ X("host", { shadowDom: !0, children: /* @__PURE__ */ Ee("div", { class: "block", children: [
      G && /* @__PURE__ */ Ee("div", { class: "head", children: [
        u.length > 0 ? /* @__PURE__ */ X("div", { class: "tabs", role: "tablist", "aria-label": n("files"), children: u.map((C, Z) => /* @__PURE__ */ X(
          "button",
          {
            type: "button",
            role: "tab",
            "aria-selected": C === p ? "true" : "false",
            class: C === p ? "file-tab is-active" : "file-tab",
            onclick: () => h(Z),
            children: C.name
          },
          C.name
        )) }) : /* @__PURE__ */ Ee("div", { class: "meta", children: [
          t.language && /* @__PURE__ */ X("span", { class: "lang", children: t.language }),
          t.filename && /* @__PURE__ */ X("span", { class: "filename", children: t.filename })
        ] }),
        !t.isCopyHidden && /* @__PURE__ */ Ee("button", { type: "button", class: i ? "copy is-copied" : "copy", onclick: $, children: [
          i ? /* @__PURE__ */ X("svg", { viewBox: "0 0 24 24", children: /* @__PURE__ */ X("polyline", { points: "4 12 10 18 20 6" }) }) : /* @__PURE__ */ Ee("svg", { viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ X("rect", { x: "9", y: "9", width: "11", height: "11", rx: "2" }),
            /* @__PURE__ */ X("path", { d: "M5 15V5a2 2 0 0 1 2-2h10" })
          ] }),
          n(i ? "copied" : "copy")
        ] })
      ] }),
      /* @__PURE__ */ X("div", { class: "scroll", children: /* @__PURE__ */ X("pre", { children: D ? /* @__PURE__ */ X("div", { class: "rows", children: T.map((C, Z) => {
        const j = Z + 1, W = A ? Ni(j, w) : String(j), se = !!t.hasLineNumbers || A;
        return /* @__PURE__ */ Ee("div", { class: wi(j, w), children: [
          se && /* @__PURE__ */ X("span", { class: "gutter", children: W }),
          /* @__PURE__ */ X("span", { class: "text", children: C.length ? C.map(L) : " " })
        ] }, Z);
      }) }) : /* @__PURE__ */ X("code", { children: k.map(L) }) }) })
    ] }) });
  },
  {
    props: {
      code: String,
      files: { type: Array },
      language: String,
      filename: String,
      hasLineNumbers: { type: Boolean, reflect: !0 },
      isCopyHidden: { type: Boolean, reflect: !0 },
      isFlush: { type: Boolean, reflect: !0 },
      isHeaderHidden: { type: Boolean, reflect: !0 },
      isPlain: { type: Boolean, reflect: !0 },
      addedLines: { type: String, reflect: !0 },
      removedLines: { type: String, reflect: !0 },
      focusLines: { type: String, reflect: !0 },
      tone: { type: yn("primary", "secondary", "tertiary"), reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      copy: mn({ bubbles: !0, composed: !0 })
    },
    styles: [_n, _i]
  }
);
En("z-code-block", ki);
export {
  Mi as C,
  ki as Z,
  Ei as a,
  mi as c
};
