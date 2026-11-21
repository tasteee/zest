function ln(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var $e, rt;
function dn() {
  if (rt) return $e;
  rt = 1;
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
  function o(e, ...i) {
    const a = /* @__PURE__ */ Object.create(null);
    for (const E in e)
      a[E] = e[E];
    return i.forEach(function(E) {
      for (const L in E)
        a[L] = E[L];
    }), /** @type {T} */
    a;
  }
  const d = "</span>", h = (e) => !!e.scope, b = (e, { prefix: i }) => {
    if (e.startsWith("language:"))
      return e.replace("language:", "language-");
    if (e.includes(".")) {
      const a = e.split(".");
      return [
        `${i}${a.shift()}`,
        ...a.map((E, L) => `${E}${"_".repeat(L + 1)}`)
      ].join(" ");
    }
    return `${i}${e}`;
  };
  class p {
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
      if (!h(i)) return;
      const a = b(
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
      h(i) && (this.buffer += d);
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
  const y = (e = {}) => {
    const i = { children: [] };
    return Object.assign(i, e), i;
  };
  class N {
    constructor() {
      this.rootNode = y(), this.stack = [this.rootNode];
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
      const a = y({ scope: i });
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
        N._collapse(a);
      }));
    }
  }
  class A extends N {
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
      return new p(this, this.options).value();
    }
    finalize() {
      return this.closeAllNodes(), !0;
    }
  }
  function x(e) {
    return e ? typeof e == "string" ? e : e.source : null;
  }
  function k(e) {
    return T("(?=", e, ")");
  }
  function S(e) {
    return T("(?:", e, ")*");
  }
  function B(e) {
    return T("(?:", e, ")?");
  }
  function T(...e) {
    return e.map((a) => x(a)).join("");
  }
  function C(e) {
    const i = e[e.length - 1];
    return typeof i == "object" && i.constructor === Object ? (e.splice(e.length - 1, 1), i) : {};
  }
  function G(...e) {
    return "(" + (C(e).capture ? "" : "?:") + e.map((E) => x(E)).join("|") + ")";
  }
  function F(e) {
    return new RegExp(e.toString() + "|").exec("").length - 1;
  }
  function Y(e, i) {
    const a = e && e.exec(i);
    return a && a.index === 0;
  }
  const ee = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
  function K(e, { joinWith: i }) {
    let a = 0;
    return e.map((E) => {
      a += 1;
      const L = a;
      let D = x(E), g = "";
      for (; D.length > 0; ) {
        const l = ee.exec(D);
        if (!l) {
          g += D;
          break;
        }
        g += D.substring(0, l.index), D = D.substring(l.index + l[0].length), l[0][0] === "\\" && l[1] ? g += "\\" + String(Number(l[1]) + L) : (g += l[0], l[0] === "(" && a++);
      }
      return g;
    }).map((E) => `(${E})`).join(i);
  }
  const j = /\b\B/, ge = "[a-zA-Z]\\w*", te = "[a-zA-Z_]\\w*", ue = "\\b\\d+(\\.\\d+)?", fe = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", be = "\\b(0b[01]+)", Ee = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", _e = (e = {}) => {
    const i = /^#![ ]*\//;
    return e.binary && (e.begin = T(
      i,
      /.*\b/,
      e.binary,
      /\b.*/
    )), o({
      scope: "meta",
      begin: i,
      end: /$/,
      relevance: 0,
      /** @type {ModeCallback} */
      "on:begin": (a, E) => {
        a.index !== 0 && E.ignoreMatch();
      }
    }, e);
  }, ne = {
    begin: "\\\\[\\s\\S]",
    relevance: 0
  }, ye = {
    scope: "string",
    begin: "'",
    end: "'",
    illegal: "\\n",
    contains: [ne]
  }, ae = {
    scope: "string",
    begin: '"',
    end: '"',
    illegal: "\\n",
    contains: [ne]
  }, Ne = {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
  }, O = function(e, i, a = {}) {
    const E = o(
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
    const L = G(
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
          L,
          /[.]?[:]?([.][ ]|[ ])/,
          "){3}"
        )
        // look for 3 words in a row
      }
    ), E;
  }, Z = O("//", "$"), W = O("/\\*", "\\*/"), q = O("#", "$"), ie = {
    scope: "number",
    begin: ue,
    relevance: 0
  }, ce = {
    scope: "number",
    begin: fe,
    relevance: 0
  }, _t = {
    scope: "number",
    begin: be,
    relevance: 0
  }, yt = {
    scope: "regexp",
    begin: /\/(?=[^/\n]*\/)/,
    end: /\/[gimuy]*/,
    contains: [
      ne,
      {
        begin: /\[/,
        end: /\]/,
        relevance: 0,
        contains: [ne]
      }
    ]
  }, Nt = {
    scope: "title",
    begin: ge,
    relevance: 0
  }, vt = {
    scope: "title",
    begin: te,
    relevance: 0
  }, wt = {
    // excludes method names from keyword processing
    begin: "\\.\\s*" + te,
    relevance: 0
  };
  var Se = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    APOS_STRING_MODE: ye,
    BACKSLASH_ESCAPE: ne,
    BINARY_NUMBER_MODE: _t,
    BINARY_NUMBER_RE: be,
    COMMENT: O,
    C_BLOCK_COMMENT_MODE: W,
    C_LINE_COMMENT_MODE: Z,
    C_NUMBER_MODE: ce,
    C_NUMBER_RE: fe,
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
    IDENT_RE: ge,
    MATCH_NOTHING_RE: j,
    METHOD_GUARD: wt,
    NUMBER_MODE: ie,
    NUMBER_RE: ue,
    PHRASAL_WORDS_MODE: Ne,
    QUOTE_STRING_MODE: ae,
    REGEXP_MODE: yt,
    RE_STARTERS_RE: Ee,
    SHEBANG: _e,
    TITLE_MODE: Nt,
    UNDERSCORE_IDENT_RE: te,
    UNDERSCORE_TITLE_MODE: vt
  });
  function St(e, i) {
    e.input[e.index - 1] === "." && i.ignoreMatch();
  }
  function At(e, i) {
    e.className !== void 0 && (e.scope = e.className, delete e.className);
  }
  function kt(e, i) {
    i && e.beginKeywords && (e.begin = "\\b(" + e.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", e.__beforeBegin = St, e.keywords = e.keywords || e.beginKeywords, delete e.beginKeywords, e.relevance === void 0 && (e.relevance = 0));
  }
  function Tt(e, i) {
    Array.isArray(e.illegal) && (e.illegal = G(...e.illegal));
  }
  function xt(e, i) {
    if (e.match) {
      if (e.begin || e.end) throw new Error("begin & end are not supported with match");
      e.begin = e.match, delete e.match;
    }
  }
  function Ot(e, i) {
    e.relevance === void 0 && (e.relevance = 1);
  }
  const Rt = (e, i) => {
    if (!e.beforeMatch) return;
    if (e.starts) throw new Error("beforeMatch cannot be used with starts");
    const a = Object.assign({}, e);
    Object.keys(e).forEach((E) => {
      delete e[E];
    }), e.keywords = a.keywords, e.begin = T(a.beforeMatch, k(a.begin)), e.starts = {
      relevance: 0,
      contains: [
        Object.assign(a, { endsParent: !0 })
      ]
    }, e.relevance = 0, delete a.beforeMatch;
  }, Mt = [
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
  ], It = "keyword";
  function He(e, i, a = It) {
    const E = /* @__PURE__ */ Object.create(null);
    return typeof e == "string" ? L(a, e.split(" ")) : Array.isArray(e) ? L(a, e) : Object.keys(e).forEach(function(D) {
      Object.assign(
        E,
        He(e[D], i, D)
      );
    }), E;
    function L(D, g) {
      i && (g = g.map((l) => l.toLowerCase())), g.forEach(function(l) {
        const m = l.split("|");
        E[m[0]] = [D, Ct(m[0], m[1])];
      });
    }
  }
  function Ct(e, i) {
    return i ? Number(i) : Lt(e) ? 0 : 1;
  }
  function Lt(e) {
    return Mt.includes(e.toLowerCase());
  }
  const Fe = {}, le = (e) => {
    console.error(e);
  }, Ze = (e, ...i) => {
    console.log(`WARN: ${e}`, ...i);
  }, pe = (e, i) => {
    Fe[`${e}/${i}`] || (console.log(`Deprecated as of ${e}. ${i}`), Fe[`${e}/${i}`] = !0);
  }, Ae = new Error();
  function Ke(e, i, { key: a }) {
    let E = 0;
    const L = e[a], D = {}, g = {};
    for (let l = 1; l <= i.length; l++)
      g[l + E] = L[l], D[l + E] = !0, E += F(i[l - 1]);
    e[a] = g, e[a]._emit = D, e[a]._multi = !0;
  }
  function Dt(e) {
    if (Array.isArray(e.begin)) {
      if (e.skip || e.excludeBegin || e.returnBegin)
        throw le("skip, excludeBegin, returnBegin not compatible with beginScope: {}"), Ae;
      if (typeof e.beginScope != "object" || e.beginScope === null)
        throw le("beginScope must be object"), Ae;
      Ke(e, e.begin, { key: "beginScope" }), e.begin = K(e.begin, { joinWith: "" });
    }
  }
  function Bt(e) {
    if (Array.isArray(e.end)) {
      if (e.skip || e.excludeEnd || e.returnEnd)
        throw le("skip, excludeEnd, returnEnd not compatible with endScope: {}"), Ae;
      if (typeof e.endScope != "object" || e.endScope === null)
        throw le("endScope must be object"), Ae;
      Ke(e, e.end, { key: "endScope" }), e.end = K(e.end, { joinWith: "" });
    }
  }
  function Ut(e) {
    e.scope && typeof e.scope == "object" && e.scope !== null && (e.beginScope = e.scope, delete e.scope);
  }
  function zt(e) {
    Ut(e), typeof e.beginScope == "string" && (e.beginScope = { _wrap: e.beginScope }), typeof e.endScope == "string" && (e.endScope = { _wrap: e.endScope }), Dt(e), Bt(e);
  }
  function Pt(e) {
    function i(g, l) {
      return new RegExp(
        x(g),
        "m" + (e.case_insensitive ? "i" : "") + (e.unicodeRegex ? "u" : "") + (l ? "g" : "")
      );
    }
    class a {
      constructor() {
        this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
      }
      // @ts-ignore
      addRule(l, m) {
        m.position = this.position++, this.matchIndexes[this.matchAt] = m, this.regexes.push([m, l]), this.matchAt += F(l) + 1;
      }
      compile() {
        this.regexes.length === 0 && (this.exec = () => null);
        const l = this.regexes.map((m) => m[1]);
        this.matcherRe = i(K(l, { joinWith: "|" }), !0), this.lastIndex = 0;
      }
      /** @param {string} s */
      exec(l) {
        this.matcherRe.lastIndex = this.lastIndex;
        const m = this.matcherRe.exec(l);
        if (!m)
          return null;
        const P = m.findIndex((ve, Le) => Le > 0 && ve !== void 0), U = this.matchIndexes[P];
        return m.splice(0, P), Object.assign(m, U);
      }
    }
    class E {
      constructor() {
        this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
      }
      // @ts-ignore
      getMatcher(l) {
        if (this.multiRegexes[l]) return this.multiRegexes[l];
        const m = new a();
        return this.rules.slice(l).forEach(([P, U]) => m.addRule(P, U)), m.compile(), this.multiRegexes[l] = m, m;
      }
      resumingScanAtSamePosition() {
        return this.regexIndex !== 0;
      }
      considerAll() {
        this.regexIndex = 0;
      }
      // @ts-ignore
      addRule(l, m) {
        this.rules.push([l, m]), m.type === "begin" && this.count++;
      }
      /** @param {string} s */
      exec(l) {
        const m = this.getMatcher(this.regexIndex);
        m.lastIndex = this.lastIndex;
        let P = m.exec(l);
        if (this.resumingScanAtSamePosition() && !(P && P.index === this.lastIndex)) {
          const U = this.getMatcher(0);
          U.lastIndex = this.lastIndex + 1, P = U.exec(l);
        }
        return P && (this.regexIndex += P.position + 1, this.regexIndex === this.count && this.considerAll()), P;
      }
    }
    function L(g) {
      const l = new E();
      return g.contains.forEach((m) => l.addRule(m.begin, { rule: m, type: "begin" })), g.terminatorEnd && l.addRule(g.terminatorEnd, { type: "end" }), g.illegal && l.addRule(g.illegal, { type: "illegal" }), l;
    }
    function D(g, l) {
      const m = (
        /** @type CompiledMode */
        g
      );
      if (g.isCompiled) return m;
      [
        At,
        // do this early so compiler extensions generally don't have to worry about
        // the distinction between match/begin
        xt,
        zt,
        Rt
      ].forEach((U) => U(g, l)), e.compilerExtensions.forEach((U) => U(g, l)), g.__beforeBegin = null, [
        kt,
        // do this later so compiler extensions that come earlier have access to the
        // raw array if they wanted to perhaps manipulate it, etc.
        Tt,
        // default to 1 relevance if not specified
        Ot
      ].forEach((U) => U(g, l)), g.isCompiled = !0;
      let P = null;
      return typeof g.keywords == "object" && g.keywords.$pattern && (g.keywords = Object.assign({}, g.keywords), P = g.keywords.$pattern, delete g.keywords.$pattern), P = P || /\w+/, g.keywords && (g.keywords = He(g.keywords, e.case_insensitive)), m.keywordPatternRe = i(P, !0), l && (g.begin || (g.begin = /\B|\b/), m.beginRe = i(m.begin), !g.end && !g.endsWithParent && (g.end = /\B|\b/), g.end && (m.endRe = i(m.end)), m.terminatorEnd = x(m.end) || "", g.endsWithParent && l.terminatorEnd && (m.terminatorEnd += (g.end ? "|" : "") + l.terminatorEnd)), g.illegal && (m.illegalRe = i(
        /** @type {RegExp | string} */
        g.illegal
      )), g.contains || (g.contains = []), g.contains = [].concat(...g.contains.map(function(U) {
        return $t(U === "self" ? g : U);
      })), g.contains.forEach(function(U) {
        D(
          /** @type Mode */
          U,
          m
        );
      }), g.starts && D(g.starts, l), m.matcher = L(m), m;
    }
    if (e.compilerExtensions || (e.compilerExtensions = []), e.contains && e.contains.includes("self"))
      throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
    return e.classNameAliases = o(e.classNameAliases || {}), D(
      /** @type Mode */
      e
    );
  }
  function je(e) {
    return e ? e.endsWithParent || je(e.starts) : !1;
  }
  function $t(e) {
    return e.variants && !e.cachedVariants && (e.cachedVariants = e.variants.map(function(i) {
      return o(e, { variants: null }, i);
    })), e.cachedVariants ? e.cachedVariants : je(e) ? o(e, { starts: e.starts ? o(e.starts) : null }) : Object.isFrozen(e) ? o(e) : e;
  }
  var Gt = "11.11.2";
  class Ht extends Error {
    constructor(i, a) {
      super(i), this.name = "HTMLInjectionError", this.html = a;
    }
  }
  const Ce = r, We = o, Xe = Symbol("nomatch"), Ft = 7, Ye = function(e) {
    const i = /* @__PURE__ */ Object.create(null), a = /* @__PURE__ */ Object.create(null), E = [];
    let L = !0;
    const D = "Could not find the language '{}', did you forget to load/include a language module?", g = { disableAutodetect: !0, name: "Plain text", contains: [] };
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
      __emitter: A
    };
    function m(s) {
      return l.noHighlightRe.test(s);
    }
    function P(s) {
      let f = s.className + " ";
      f += s.parentNode ? s.parentNode.className : "";
      const w = l.languageDetectRe.exec(f);
      if (w) {
        const M = oe(w[1]);
        return M || (Ze(D.replace("{}", w[1])), Ze("Falling back to no-highlight mode for this block.", s)), M ? w[1] : "no-highlight";
      }
      return f.split(/\s+/).find((M) => m(M) || oe(M));
    }
    function U(s, f, w) {
      let M = "", z = "";
      typeof f == "object" ? (M = s, w = f.ignoreIllegals, z = f.language) : (pe("10.7.0", "highlight(lang, code, ...args) has been deprecated."), pe("10.7.0", `Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`), z = s, M = f), w === void 0 && (w = !0);
      const J = {
        code: M,
        language: z
      };
      Te("before:highlight", J);
      const se = J.result ? J.result : ve(J.language, J.code, w);
      return se.code = J.code, Te("after:highlight", se), se;
    }
    function ve(s, f, w, M) {
      const z = /* @__PURE__ */ Object.create(null);
      function J(c, u) {
        return c.keywords[u];
      }
      function se() {
        if (!_.keywords) {
          $.addText(I);
          return;
        }
        let c = 0;
        _.keywordPatternRe.lastIndex = 0;
        let u = _.keywordPatternRe.exec(I), v = "";
        for (; u; ) {
          v += I.substring(c, u.index);
          const R = Q.case_insensitive ? u[0].toLowerCase() : u[0], H = J(_, R);
          if (H) {
            const [re, an] = H;
            if ($.addText(v), v = "", z[R] = (z[R] || 0) + 1, z[R] <= Ft && (Re += an), re.startsWith("_"))
              v += u[0];
            else {
              const cn = Q.classNameAliases[re] || re;
              V(u[0], cn);
            }
          } else
            v += u[0];
          c = _.keywordPatternRe.lastIndex, u = _.keywordPatternRe.exec(I);
        }
        v += I.substring(c), $.addText(v);
      }
      function xe() {
        if (I === "") return;
        let c = null;
        if (typeof _.subLanguage == "string") {
          if (!i[_.subLanguage]) {
            $.addText(I);
            return;
          }
          c = ve(_.subLanguage, I, !0, it[_.subLanguage]), it[_.subLanguage] = /** @type {CompiledMode} */
          c._top;
        } else
          c = De(I, _.subLanguage.length ? _.subLanguage : null);
        _.relevance > 0 && (Re += c.relevance), $.__addSublanguage(c._emitter, c.language);
      }
      function X() {
        _.subLanguage != null ? xe() : se(), I = "";
      }
      function V(c, u) {
        c !== "" && ($.startScope(u), $.addText(c), $.endScope());
      }
      function Qe(c, u) {
        let v = 1;
        const R = u.length - 1;
        for (; v <= R; ) {
          if (!c._emit[v]) {
            v++;
            continue;
          }
          const H = Q.classNameAliases[c[v]] || c[v], re = u[v];
          H ? V(re, H) : (I = re, se(), I = ""), v++;
        }
      }
      function et(c, u) {
        return c.scope && typeof c.scope == "string" && $.openNode(Q.classNameAliases[c.scope] || c.scope), c.beginScope && (c.beginScope._wrap ? (V(I, Q.classNameAliases[c.beginScope._wrap] || c.beginScope._wrap), I = "") : c.beginScope._multi && (Qe(c.beginScope, u), I = "")), _ = Object.create(c, { parent: { value: _ } }), _;
      }
      function tt(c, u, v) {
        let R = Y(c.endRe, v);
        if (R) {
          if (c["on:end"]) {
            const H = new n(c);
            c["on:end"](u, H), H.isMatchIgnored && (R = !1);
          }
          if (R) {
            for (; c.endsParent && c.parent; )
              c = c.parent;
            return c;
          }
        }
        if (c.endsWithParent)
          return tt(c.parent, u, v);
      }
      function tn(c) {
        return _.matcher.regexIndex === 0 ? (I += c[0], 1) : (Pe = !0, 0);
      }
      function nn(c) {
        const u = c[0], v = c.rule, R = new n(v), H = [v.__beforeBegin, v["on:begin"]];
        for (const re of H)
          if (re && (re(c, R), R.isMatchIgnored))
            return tn(u);
        return v.skip ? I += u : (v.excludeBegin && (I += u), X(), !v.returnBegin && !v.excludeBegin && (I = u)), et(v, c), v.returnBegin ? 0 : u.length;
      }
      function rn(c) {
        const u = c[0], v = f.substring(c.index), R = tt(_, c, v);
        if (!R)
          return Xe;
        const H = _;
        _.endScope && _.endScope._wrap ? (X(), V(u, _.endScope._wrap)) : _.endScope && _.endScope._multi ? (X(), Qe(_.endScope, c)) : H.skip ? I += u : (H.returnEnd || H.excludeEnd || (I += u), X(), H.excludeEnd && (I = u));
        do
          _.scope && $.closeNode(), !_.skip && !_.subLanguage && (Re += _.relevance), _ = _.parent;
        while (_ !== R.parent);
        return R.starts && et(R.starts, c), H.returnEnd ? 0 : u.length;
      }
      function on() {
        const c = [];
        for (let u = _; u !== Q; u = u.parent)
          u.scope && c.unshift(u.scope);
        c.forEach((u) => $.openNode(u));
      }
      let Oe = {};
      function nt(c, u) {
        const v = u && u[0];
        if (I += c, v == null)
          return X(), 0;
        if (Oe.type === "begin" && u.type === "end" && Oe.index === u.index && v === "") {
          if (I += f.slice(u.index, u.index + 1), !L) {
            const R = new Error(`0 width match regex (${s})`);
            throw R.languageName = s, R.badRule = Oe.rule, R;
          }
          return 1;
        }
        if (Oe = u, u.type === "begin")
          return nn(u);
        if (u.type === "illegal" && !w) {
          const R = new Error('Illegal lexeme "' + v + '" for mode "' + (_.scope || "<unnamed>") + '"');
          throw R.mode = _, R;
        } else if (u.type === "end") {
          const R = rn(u);
          if (R !== Xe)
            return R;
        }
        if (u.type === "illegal" && v === "")
          return u.index === f.length || (I += `
`), 1;
        if (ze > 1e5 && ze > u.index * 3)
          throw new Error("potential infinite loop, way more iterations than matches");
        return I += v, v.length;
      }
      const Q = oe(s);
      if (!Q)
        throw le(D.replace("{}", s)), new Error('Unknown language: "' + s + '"');
      const sn = Pt(Q);
      let Ue = "", _ = M || sn;
      const it = {}, $ = new l.__emitter(l);
      on();
      let I = "", Re = 0, de = 0, ze = 0, Pe = !1;
      try {
        if (Q.__emitTokens)
          Q.__emitTokens(f, $);
        else {
          for (_.matcher.considerAll(); ; ) {
            ze++, Pe ? Pe = !1 : _.matcher.considerAll(), _.matcher.lastIndex = de;
            const c = _.matcher.exec(f);
            if (!c) break;
            const u = f.substring(de, c.index), v = nt(u, c);
            de = c.index + v;
          }
          nt(f.substring(de));
        }
        return $.finalize(), Ue = $.toHTML(), {
          language: s,
          value: Ue,
          relevance: Re,
          illegal: !1,
          _emitter: $,
          _top: _
        };
      } catch (c) {
        if (c.message && c.message.includes("Illegal"))
          return {
            language: s,
            value: Ce(f),
            illegal: !0,
            relevance: 0,
            _illegalBy: {
              message: c.message,
              index: de,
              context: f.slice(de - 100, de + 100),
              mode: c.mode,
              resultSoFar: Ue
            },
            _emitter: $
          };
        if (L)
          return {
            language: s,
            value: Ce(f),
            illegal: !1,
            relevance: 0,
            errorRaised: c,
            _emitter: $,
            _top: _
          };
        throw c;
      }
    }
    function Le(s) {
      const f = {
        value: Ce(s),
        illegal: !1,
        relevance: 0,
        _top: g,
        _emitter: new l.__emitter(l)
      };
      return f._emitter.addText(s), f;
    }
    function De(s, f) {
      f = f || l.languages || Object.keys(i);
      const w = Le(s), M = f.filter(oe).filter(Ve).map(
        (X) => ve(X, s, !1)
      );
      M.unshift(w);
      const z = M.sort((X, V) => {
        if (X.relevance !== V.relevance) return V.relevance - X.relevance;
        if (X.language && V.language) {
          if (oe(X.language).supersetOf === V.language)
            return 1;
          if (oe(V.language).supersetOf === X.language)
            return -1;
        }
        return 0;
      }), [J, se] = z, xe = J;
      return xe.secondBest = se, xe;
    }
    function Zt(s, f, w) {
      const M = f && a[f] || w;
      s.classList.add("hljs"), s.classList.add(`language-${M}`);
    }
    function Be(s) {
      let f = null;
      const w = P(s);
      if (m(w)) return;
      if (Te(
        "before:highlightElement",
        { el: s, language: w }
      ), s.dataset.highlighted) {
        console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", s);
        return;
      }
      if (s.children.length > 0 && (l.ignoreUnescapedHTML || (console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."), console.warn("https://github.com/highlightjs/highlight.js/wiki/security"), console.warn("The element with unescaped HTML:"), console.warn(s)), l.throwUnescapedHTML))
        throw new Ht(
          "One of your code blocks includes unescaped HTML.",
          s.innerHTML
        );
      f = s;
      const M = f.textContent, z = w ? U(M, { language: w, ignoreIllegals: !0 }) : De(M);
      s.innerHTML = z.value, s.dataset.highlighted = "yes", Zt(s, w, z.language), s.result = {
        language: z.language,
        // TODO: remove with version 11.0
        re: z.relevance,
        relevance: z.relevance
      }, z.secondBest && (s.secondBest = {
        language: z.secondBest.language,
        relevance: z.secondBest.relevance
      }), Te("after:highlightElement", { el: s, result: z, text: M });
    }
    function Kt(s) {
      l = We(l, s);
    }
    const jt = () => {
      ke(), pe("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
    };
    function Wt() {
      ke(), pe("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
    }
    let qe = !1;
    function ke() {
      function s() {
        ke();
      }
      if (document.readyState === "loading") {
        qe || window.addEventListener("DOMContentLoaded", s, !1), qe = !0;
        return;
      }
      document.querySelectorAll(l.cssSelector).forEach(Be);
    }
    function Xt(s, f) {
      let w = null;
      try {
        w = f(e);
      } catch (M) {
        if (le("Language definition for '{}' could not be registered.".replace("{}", s)), L)
          le(M);
        else
          throw M;
        w = g;
      }
      w.name || (w.name = s), i[s] = w, w.rawDefinition = f.bind(null, e), w.aliases && Je(w.aliases, { languageName: s });
    }
    function Yt(s) {
      delete i[s];
      for (const f of Object.keys(a))
        a[f] === s && delete a[f];
    }
    function qt() {
      return Object.keys(i);
    }
    function oe(s) {
      return s = (s || "").toLowerCase(), i[s] || i[a[s]];
    }
    function Je(s, { languageName: f }) {
      typeof s == "string" && (s = [s]), s.forEach((w) => {
        a[w.toLowerCase()] = f;
      });
    }
    function Ve(s) {
      const f = oe(s);
      return f && !f.disableAutodetect;
    }
    function Jt(s) {
      s["before:highlightBlock"] && !s["before:highlightElement"] && (s["before:highlightElement"] = (f) => {
        s["before:highlightBlock"](
          Object.assign({ block: f.el }, f)
        );
      }), s["after:highlightBlock"] && !s["after:highlightElement"] && (s["after:highlightElement"] = (f) => {
        s["after:highlightBlock"](
          Object.assign({ block: f.el }, f)
        );
      });
    }
    function Vt(s) {
      Jt(s), E.push(s);
    }
    function Qt(s) {
      const f = E.indexOf(s);
      f !== -1 && E.splice(f, 1);
    }
    function Te(s, f) {
      const w = s;
      E.forEach(function(M) {
        M[w] && M[w](f);
      });
    }
    function en(s) {
      return pe("10.7.0", "highlightBlock will be removed entirely in v12.0"), pe("10.7.0", "Please use highlightElement now."), Be(s);
    }
    Object.assign(e, {
      highlight: U,
      highlightAuto: De,
      highlightAll: ke,
      highlightElement: Be,
      // TODO: Remove with v12 API
      highlightBlock: en,
      configure: Kt,
      initHighlighting: jt,
      initHighlightingOnLoad: Wt,
      registerLanguage: Xt,
      unregisterLanguage: Yt,
      listLanguages: qt,
      getLanguage: oe,
      registerAliases: Je,
      autoDetection: Ve,
      inherit: We,
      addPlugin: Vt,
      removePlugin: Qt
    }), e.debugMode = function() {
      L = !1;
    }, e.safeMode = function() {
      L = !0;
    }, e.versionString = Gt, e.regex = {
      concat: T,
      lookahead: k,
      either: G,
      optional: B,
      anyNumberOfTimes: S
    };
    for (const s in Se)
      typeof Se[s] == "object" && t(Se[s]);
    return Object.assign(e, Se), e;
  }, he = Ye({});
  return he.newInstance = () => Ye({}), $e = he, he.HighlightJS = he, he.default = he, $e;
}
var gn = /* @__PURE__ */ dn();
const un = /* @__PURE__ */ ln(gn), ot = {}, fn = "hljs-";
function bn(t) {
  const n = un.newInstance();
  return t && h(t), {
    highlight: r,
    highlightAuto: o,
    listLanguages: d,
    register: h,
    registerAlias: b,
    registered: p
  };
  function r(y, N, A) {
    const x = A || ot, k = typeof x.prefix == "string" ? x.prefix : fn;
    if (!n.getLanguage(y))
      throw new Error("Unknown language: `" + y + "` is not registered");
    n.configure({ __emitter: pn, classPrefix: k });
    const S = (
      /** @type {HighlightResult & {_emitter: HastEmitter}} */
      n.highlight(N, { ignoreIllegals: !0, language: y })
    );
    if (S.errorRaised)
      throw new Error("Could not highlight with `Highlight.js`", {
        cause: S.errorRaised
      });
    const B = S._emitter.root, T = (
      /** @type {RootData} */
      B.data
    );
    return T.language = S.language, T.relevance = S.relevance, B;
  }
  function o(y, N) {
    const x = (N || ot).subset || d();
    let k = -1, S = 0, B;
    for (; ++k < x.length; ) {
      const T = x[k];
      if (!n.getLanguage(T)) continue;
      const C = r(T, y, N);
      C.data && C.data.relevance !== void 0 && C.data.relevance > S && (S = C.data.relevance, B = C);
    }
    return B || {
      type: "root",
      children: [],
      data: { language: void 0, relevance: S }
    };
  }
  function d() {
    return n.listLanguages();
  }
  function h(y, N) {
    if (typeof y == "string")
      n.registerLanguage(y, N);
    else {
      let A;
      for (A in y)
        Object.hasOwn(y, A) && n.registerLanguage(A, y[A]);
    }
  }
  function b(y, N) {
    if (typeof y == "string")
      n.registerAliases(
        // Note: copy needed because hljs doesn’t accept readonly arrays yet.
        typeof N == "string" ? N : [...N],
        { languageName: y }
      );
    else {
      let A;
      for (A in y)
        if (Object.hasOwn(y, A)) {
          const x = y[A];
          n.registerAliases(
            // Note: copy needed because hljs doesn’t accept readonly arrays yet.
            typeof x == "string" ? x : [...x],
            { languageName: A }
          );
        }
    }
  }
  function p(y) {
    return !!n.getLanguage(y);
  }
}
class pn {
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
    const r = this.stack[this.stack.length - 1], o = r.children[r.children.length - 1];
    o && o.type === "text" ? o.value += n : r.children.push({ type: "text", value: n });
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
    const o = this.stack[this.stack.length - 1], d = (
      /** @type {Array<ElementContent>} */
      n.root.children
    );
    r ? o.children.push({
      type: "element",
      tagName: "span",
      properties: { className: [r] },
      children: d
    }) : o.children.push(...d);
  }
  /**
   * @param {string} name
   *   Name to add.
   * @returns {undefined}
   *   Nothing.
   */
  openNode(n) {
    const r = this, o = n.split(".").map(function(b, p) {
      return p ? b + "_".repeat(p) : r.options.classPrefix + b;
    }), d = this.stack[this.stack.length - 1], h = {
      type: "element",
      tagName: "span",
      properties: { className: o },
      children: []
    };
    d.children.push(h), this.stack.push(h);
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
const Ie = "[A-Za-z$_][0-9A-Za-z$_]*", lt = [
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
], dt = [
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
], ft = [
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
], bt = [
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
], pt = [].concat(
  ft,
  gt,
  ut
);
function hn(t) {
  const n = t.regex, r = (O, { after: Z }) => {
    const W = "</" + O[0].slice(1);
    return O.input.indexOf(W, Z) !== -1;
  }, o = Ie, d = {
    begin: "<>",
    end: "</>"
  }, h = /<[A-Za-z0-9\\._:-]+\s*\/>/, b = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (O, Z) => {
      const W = O[0].length + O.index, q = O.input[W];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        q === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        q === ","
      ) {
        Z.ignoreMatch();
        return;
      }
      q === ">" && (r(O, { after: W }) || Z.ignoreMatch());
      let ie;
      const ce = O.input.substring(W);
      if (ie = ce.match(/^\s*=/)) {
        Z.ignoreMatch();
        return;
      }
      if ((ie = ce.match(/^\s+extends\s+/)) && ie.index === 0) {
        Z.ignoreMatch();
        return;
      }
    }
  }, p = {
    $pattern: Ie,
    keyword: lt,
    literal: dt,
    built_in: pt,
    "variable.language": bt
  }, y = "[0-9](_?[0-9])*", N = `\\.(${y})`, A = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", x = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${A})((${N})|\\.)?|(${N}))[eE][+-]?(${y})\\b` },
      { begin: `\\b(${A})\\b((${N})\\b|\\.)?|(${N})\\b` },
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
  }, k = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: p,
    contains: []
    // defined later
  }, S = {
    begin: ".?html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        t.BACKSLASH_ESCAPE,
        k
      ],
      subLanguage: "xml"
    }
  }, B = {
    begin: ".?css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        t.BACKSLASH_ESCAPE,
        k
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
        k
      ],
      subLanguage: "graphql"
    }
  }, C = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      t.BACKSLASH_ESCAPE,
      k
    ]
  }, F = {
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
  }, Y = [
    t.APOS_STRING_MODE,
    t.QUOTE_STRING_MODE,
    S,
    B,
    T,
    C,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    x
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  k.contains = Y.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: p,
    contains: [
      "self"
    ].concat(Y)
  });
  const ee = [].concat(F, k.contains), K = ee.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: p,
      contains: ["self"].concat(ee)
    }
  ]), j = {
    className: "params",
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/,
    // to match the parms with
    end: /\)/,
    excludeBegin: !0,
    excludeEnd: !0,
    keywords: p,
    contains: K
  }, ge = {
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
  }, te = {
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
  }, ue = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  }, fe = {
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
    contains: [j],
    illegal: /%/
  }, be = {
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
        ...ft,
        "super",
        "import",
        "await"
      ].map((O) => `${O}\\s*\\(`)),
      o,
      n.lookahead(/\s*\(/)
    ),
    className: "title.function",
    relevance: 0
  }, ne = {
    begin: n.concat(/\./, n.lookahead(
      n.concat(o, /(?![0-9A-Za-z$_(])/)
    )),
    end: o,
    excludeBegin: !0,
    keywords: "prototype",
    className: "property",
    relevance: 0
  }, ye = {
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
      j
    ]
  }, ae = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + t.UNDERSCORE_IDENT_RE + ")\\s*=>", Ne = {
    match: [
      /const|var|let/,
      /\s+/,
      o,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      n.lookahead(ae)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      j
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: p,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS: K, CLASS_REFERENCE: te },
    illegal: /#(?![$_A-Za-z])/,
    contains: [
      t.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      ue,
      t.APOS_STRING_MODE,
      t.QUOTE_STRING_MODE,
      S,
      B,
      T,
      C,
      F,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      x,
      te,
      {
        scope: "attr",
        match: o + n.lookahead(":"),
        relevance: 0
      },
      Ne,
      {
        // "value" container
        begin: "(" + t.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          F,
          t.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: ae,
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
                    contains: K
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
              { match: h },
              {
                begin: b.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": b.isTrulyOpeningTag,
                end: b.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: b.begin,
                end: b.end,
                skip: !0,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      fe,
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
          j,
          t.inherit(t.TITLE_MODE, { begin: o, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      ne,
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
        contains: [j]
      },
      _e,
      be,
      ge,
      ye,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
function mn(t) {
  const n = t.regex, r = hn(t), o = Ie, d = [
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
  }, b = {
    beginKeywords: "interface",
    end: /\{/,
    excludeEnd: !0,
    keywords: {
      keyword: "interface extends",
      built_in: d
    },
    contains: [r.exports.CLASS_REFERENCE]
  }, p = {
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use strict['"]/
  }, y = [
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
  ], N = {
    $pattern: Ie,
    keyword: lt.concat(y),
    literal: dt,
    built_in: pt.concat(d),
    "variable.language": bt
  }, A = {
    className: "meta",
    begin: "@" + o
  }, x = (T, C, G) => {
    const F = T.contains.findIndex((Y) => Y.label === C);
    if (F === -1)
      throw new Error("can not find mode to replace");
    T.contains.splice(F, 1, G);
  };
  Object.assign(r.keywords, N), r.exports.PARAMS_CONTAINS.push(A);
  const k = r.contains.find((T) => T.scope === "attr"), S = Object.assign(
    {},
    k,
    { match: n.concat(o, n.lookahead(/\s*\?:/)) }
  );
  r.exports.PARAMS_CONTAINS.push([
    r.exports.CLASS_REFERENCE,
    // class reference for highlighting the params types
    k,
    // highlight the params key
    S
    // Added for optional property assignment highlighting
  ]), r.contains = r.contains.concat([
    A,
    h,
    b,
    S
    // Added for optional property assignment highlighting
  ]), x(r, "shebang", t.SHEBANG()), x(r, "use_strict", p);
  const B = r.contains.find((T) => T.label === "func.def");
  return B.relevance = 0, Object.assign(r, {
    name: "TypeScript",
    aliases: [
      "ts",
      "tsx",
      "mts",
      "cts"
    ]
  }), r;
}
const st = "[A-Za-z$_][0-9A-Za-z$_]*", En = [
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
], _n = [
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
], yn = [
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
], Nn = [].concat(
  Et,
  ht,
  mt
);
function vn(t) {
  const n = t.regex, r = (O, { after: Z }) => {
    const W = "</" + O[0].slice(1);
    return O.input.indexOf(W, Z) !== -1;
  }, o = st, d = {
    begin: "<>",
    end: "</>"
  }, h = /<[A-Za-z0-9\\._:-]+\s*\/>/, b = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (O, Z) => {
      const W = O[0].length + O.index, q = O.input[W];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        q === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        q === ","
      ) {
        Z.ignoreMatch();
        return;
      }
      q === ">" && (r(O, { after: W }) || Z.ignoreMatch());
      let ie;
      const ce = O.input.substring(W);
      if (ie = ce.match(/^\s*=/)) {
        Z.ignoreMatch();
        return;
      }
      if ((ie = ce.match(/^\s+extends\s+/)) && ie.index === 0) {
        Z.ignoreMatch();
        return;
      }
    }
  }, p = {
    $pattern: st,
    keyword: En,
    literal: _n,
    built_in: Nn,
    "variable.language": yn
  }, y = "[0-9](_?[0-9])*", N = `\\.(${y})`, A = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", x = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${A})((${N})|\\.)?|(${N}))[eE][+-]?(${y})\\b` },
      { begin: `\\b(${A})\\b((${N})\\b|\\.)?|(${N})\\b` },
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
  }, k = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: p,
    contains: []
    // defined later
  }, S = {
    begin: ".?html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        t.BACKSLASH_ESCAPE,
        k
      ],
      subLanguage: "xml"
    }
  }, B = {
    begin: ".?css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        t.BACKSLASH_ESCAPE,
        k
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
        k
      ],
      subLanguage: "graphql"
    }
  }, C = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      t.BACKSLASH_ESCAPE,
      k
    ]
  }, F = {
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
  }, Y = [
    t.APOS_STRING_MODE,
    t.QUOTE_STRING_MODE,
    S,
    B,
    T,
    C,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    x
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  k.contains = Y.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: p,
    contains: [
      "self"
    ].concat(Y)
  });
  const ee = [].concat(F, k.contains), K = ee.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: p,
      contains: ["self"].concat(ee)
    }
  ]), j = {
    className: "params",
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/,
    // to match the parms with
    end: /\)/,
    excludeBegin: !0,
    excludeEnd: !0,
    keywords: p,
    contains: K
  }, ge = {
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
  }, te = {
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
  }, ue = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  }, fe = {
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
    contains: [j],
    illegal: /%/
  }, be = {
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
        "import",
        "await"
      ].map((O) => `${O}\\s*\\(`)),
      o,
      n.lookahead(/\s*\(/)
    ),
    className: "title.function",
    relevance: 0
  }, ne = {
    begin: n.concat(/\./, n.lookahead(
      n.concat(o, /(?![0-9A-Za-z$_(])/)
    )),
    end: o,
    excludeBegin: !0,
    keywords: "prototype",
    className: "property",
    relevance: 0
  }, ye = {
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
      j
    ]
  }, ae = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + t.UNDERSCORE_IDENT_RE + ")\\s*=>", Ne = {
    match: [
      /const|var|let/,
      /\s+/,
      o,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      n.lookahead(ae)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      j
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: p,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS: K, CLASS_REFERENCE: te },
    illegal: /#(?![$_A-Za-z])/,
    contains: [
      t.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      ue,
      t.APOS_STRING_MODE,
      t.QUOTE_STRING_MODE,
      S,
      B,
      T,
      C,
      F,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      x,
      te,
      {
        scope: "attr",
        match: o + n.lookahead(":"),
        relevance: 0
      },
      Ne,
      {
        // "value" container
        begin: "(" + t.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          F,
          t.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: ae,
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
                    contains: K
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
              { match: h },
              {
                begin: b.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": b.isTrulyOpeningTag,
                end: b.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: b.begin,
                end: b.end,
                skip: !0,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      fe,
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
          j,
          t.inherit(t.TITLE_MODE, { begin: o, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      ne,
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
        contains: [j]
      },
      _e,
      be,
      ge,
      ye,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
const wn = (t) => ({
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
}), Sn = [
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
], An = [
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
], kn = [
  ...Sn,
  ...An
], Tn = [
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
].sort().reverse(), xn = [
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
].sort().reverse(), On = [
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
].sort().reverse(), Rn = [
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
function Mn(t) {
  const n = t.regex, r = wn(t), o = { begin: /-(webkit|moz|ms|o)-(?=[a-z])/ }, d = "and or not only", h = /@-?\w[\w]*(-\w+)*/, b = "[a-zA-Z-][a-zA-Z0-9_-]*", p = [
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
      o,
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
        begin: "\\." + b,
        relevance: 0
      },
      r.ATTRIBUTE_SELECTOR_MODE,
      {
        className: "selector-pseudo",
        variants: [
          { begin: ":(" + xn.join("|") + ")" },
          { begin: ":(:)?(" + On.join("|") + ")" }
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
        begin: "\\b(" + Rn.join("|") + ")\\b"
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
          r.UNICODE_RANGE,
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
            begin: h
          },
          {
            begin: /\s/,
            endsWithParent: !0,
            excludeEnd: !0,
            relevance: 0,
            keywords: {
              $pattern: /[a-z-]+/,
              keyword: d,
              attribute: Tn.join(" ")
            },
            contains: [
              {
                begin: /[a-z-]+(?=:)/,
                className: "attribute"
              },
              ...p,
              r.CSS_NUMBER_MODE
            ]
          }
        ]
      },
      {
        className: "selector-tag",
        begin: "\\b(" + kn.join("|") + ")\\b"
      }
    ]
  };
}
const In = (t) => ({
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
}), Cn = [
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
], Ln = [
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
], Dn = [
  ...Cn,
  ...Ln
], Bn = [
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
].sort().reverse(), zn = [
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
].sort().reverse(), Pn = [
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
function $n(t) {
  const n = In(t), r = zn, o = Un, d = "@[a-z-]+", h = "and or not only", p = {
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
        begin: "\\b(" + Dn.join("|") + ")\\b",
        // was there, before, but why?
        relevance: 0
      },
      {
        className: "selector-pseudo",
        begin: ":(" + o.join("|") + ")"
      },
      {
        className: "selector-pseudo",
        begin: ":(:)?(" + r.join("|") + ")"
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
        begin: "\\b(" + Pn.join("|") + ")\\b"
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
          keyword: h,
          attribute: Bn.join(" ")
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
const Gn = "([-+]?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)|NaN|[-+]?Infinity", Hn = {
  scope: "number",
  match: Gn,
  relevance: 0
};
function Fn(t) {
  const n = {
    className: "attr",
    begin: /(("(\\.|[^\\"\r\n])*")|('(\\.|[^\\'\r\n])*'))(?=\s*:)/,
    relevance: 1.01
  }, r = {
    match: /[{}[\],:]/,
    className: "punctuation",
    relevance: 0
  }, o = [
    "true",
    "false",
    "null"
  ], d = {
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
      r,
      t.APOS_STRING_MODE,
      t.QUOTE_STRING_MODE,
      d,
      Hn,
      t.C_LINE_COMMENT_MODE,
      t.C_BLOCK_COMMENT_MODE
    ],
    illegal: "\\S"
  };
}
function Zn(t) {
  const n = t.regex, r = {}, o = {
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
      o
    ]
  });
  const d = {
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
  ), b = {
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
      r,
      d
    ]
  };
  d.contains.push(p);
  const y = {
    match: /\\"/
  }, N = {
    className: "string",
    begin: /'/,
    end: /'/
  }, A = {
    match: /\\'/
  }, x = {
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
  }, k = [
    "fish",
    "bash",
    "zsh",
    "sh",
    "csh",
    "ksh",
    "tcsh",
    "dash",
    "scsh"
  ], S = t.SHEBANG({
    binary: `(${k.join("|")})`,
    relevance: 10
  }), B = {
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
  ], C = [
    "true",
    "false"
  ], G = { match: /(\/[a-z._-]+)+/ }, F = [
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
  ], ee = [
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
  ], K = [
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
      literal: C,
      built_in: [
        ...F,
        ...Y,
        // Shell modifiers
        "set",
        "shopt",
        ...ee,
        ...K
      ]
    },
    contains: [
      S,
      // to catch known shells and boost relevancy
      t.SHEBANG(),
      // to catch unknown shells but still highlight the shebang
      B,
      x,
      h,
      b,
      G,
      p,
      y,
      N,
      A,
      r
    ]
  };
}
function Kn(t) {
  const n = t.regex, r = n.concat(/[\p{L}_]/u, n.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u), o = /[\p{L}0-9._:-]+/u, d = {
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
  }, b = t.inherit(h, {
    begin: /\(/,
    end: /\)/
  }), p = t.inherit(t.APOS_STRING_MODE, { className: "string" }), y = t.inherit(t.QUOTE_STRING_MODE, { className: "string" }), N = {
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
          h,
          y,
          p,
          b,
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
                  b,
                  y,
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
              y
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
        contains: [N],
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
        contains: [N],
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
            starts: N
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
function jn(t) {
  const n = "true false yes no null", r = "[\\w#;/?:@&=+$,.~*'()[\\]]+", o = {
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
  }, b = {
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
  }, p = t.inherit(b, { variants: [
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
  ] }), k = {
    className: "number",
    begin: "\\b" + "[0-9]{4}(-[0-9][0-9]){0,2}" + "([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?" + "(\\.[0-9]*)?" + "([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?" + "\\b"
  }, S = {
    end: ",",
    endsWithParent: !0,
    excludeEnd: !0,
    keywords: n,
    relevance: 0
  }, B = {
    begin: /\{/,
    end: /\}/,
    contains: [S],
    illegal: "\\n",
    relevance: 0
  }, T = {
    begin: "\\[",
    end: "\\]",
    contains: [S],
    illegal: "\\n",
    relevance: 0
  }, C = [
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
    k,
    // numbers are any valid C-style number that
    // sit isolated from other words
    {
      className: "number",
      begin: t.C_NUMBER_RE + "\\b",
      relevance: 0
    },
    B,
    T,
    h,
    b
  ], G = [...C];
  return G.pop(), G.push(p), S.contains = G, {
    name: "YAML",
    case_insensitive: !0,
    aliases: ["yml"],
    contains: C
  };
}
function Wn(t) {
  const n = t.regex, r = {
    begin: /<\/?[A-Za-z_]/,
    end: ">",
    subLanguage: "xml",
    relevance: 0
  }, o = { match: /^ {0,3}([-*_])[ \t]*(?:\1[ \t]*){2,}$/ }, d = {
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
  }, b = {
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
  }, p = /[A-Za-z][A-Za-z0-9+.-]*/, y = {
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
  }, N = {
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
  }, A = {
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
  }, x = t.inherit(N, { contains: [] }), k = t.inherit(A, { contains: [] });
  N.contains.push(k), A.contains.push(x);
  let S = [
    r,
    y
  ];
  return [
    N,
    A,
    x,
    k
  ].forEach((G) => {
    G.contains = G.contains.concat(S);
  }), S = S.concat(N, A), {
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
            contains: S
          },
          {
            begin: "(?=^.+?\\n[=-]{2,}$)",
            contains: [
              { begin: "^[=-]*$" },
              {
                begin: "^",
                end: "\\n",
                contains: S
              }
            ]
          }
        ]
      },
      r,
      h,
      // must come before BOLD/ITALIC so that a `***` or `___` thematic break
      // isn't mistaken for the start of bold text
      o,
      N,
      A,
      {
        className: "quote",
        begin: "^>\\s+",
        contains: S,
        end: "$"
      },
      d,
      y,
      b,
      {
        //https://spec.commonmark.org/0.31.2/#entity-references
        scope: "literal",
        match: /&([a-zA-Z0-9]+|#[0-9]{1,7}|#[Xx][0-9a-fA-F]{1,6});/
      }
    ]
  };
}
const Xn = /\b[a-z][a-z0-9]*(?:-[a-z0-9]+)+\b(?=\s*[{,:>+~.[]|\s+[a-z*#])/, Yn = (t) => {
  const n = Mn(t), r = { className: "selector-tag", begin: Xn }, o = n.contains ?? [], d = o.findIndex((b) => typeof b != "string" && b.className === "selector-tag"), h = d === -1 ? o.length : d;
  return { ...n, contains: [...o.slice(0, h), r, ...o.slice(h)] };
}, me = bn({
  typescript: mn,
  javascript: vn,
  css: Yn,
  scss: $n,
  json: Fn,
  bash: Zn,
  xml: Kn,
  yaml: jn,
  markdown: Wn
}), ni = (t, n, r = []) => {
  me.register({ [t]: n }), r.length && me.registerAlias({ [t]: r });
}, qn = {
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
  yml: "yaml",
  // Frameworks whose templates are HTML-shaped, and sass's close cousin.
  svelte: "xml",
  astro: "xml",
  htm: "xml",
  solid: "typescript",
  sass: "scss"
}, Jn = (t) => {
  const n = (t ?? "").trim().toLowerCase();
  if (!n) return null;
  const r = qn[n] ?? n;
  return me.registered(r) ? r : null;
}, Vn = /* @__PURE__ */ new Set(["tsx", "jsx"]), Qn = (t, n) => {
  const r = (n ?? "").trim().toLowerCase();
  return Vn.has(r) ? /^\s*<[A-Za-z>]/.test(t) : !1;
}, at = "(<>", ct = "</>)", ei = (t, n, r) => {
  const o = t.map((b) => ({ className: b.className, value: b.value }));
  let d = n;
  for (const b of o) {
    const p = Math.min(d, b.value.length);
    if (b.value = b.value.slice(p), d -= p, d === 0) break;
  }
  let h = r;
  for (const b of [...o].reverse()) {
    const p = Math.min(h, b.value.length);
    if (b.value = b.value.slice(0, b.value.length - p), h -= p, h === 0) break;
  }
  return o.filter((b) => b.value.length > 0);
}, we = (t, n, r) => {
  var o;
  if (t.type === "text") {
    t.value && r.push({ className: n, value: t.value });
    return;
  }
  if (t.type === "element") {
    const d = (o = t.properties) == null ? void 0 : o.className, h = Array.isArray(d) ? d.join(" ") : "", b = n && h ? `${n} ${h}` : n || h;
    for (const p of t.children) we(p, b, r);
    return;
  }
  if (t.type === "root")
    for (const d of t.children) we(d, n, r);
}, Me = new RegExp("([(){}\\[\\]<>.,;:=+*\\/%!&|^~?]+|(?<![A-Za-z0-9_])-+|-+(?![A-Za-z0-9_]))", "g"), Ge = (t) => {
  const n = [];
  for (const r of t) {
    if (r.className) {
      n.push(r);
      continue;
    }
    let o = 0;
    Me.lastIndex = 0;
    for (let d = Me.exec(r.value); d; d = Me.exec(r.value))
      d.index > o && n.push({ className: "", value: r.value.slice(o, d.index) }), n.push({ className: "hljs-punctuation", value: d[0] }), o = Me.lastIndex;
    o < r.value.length && n.push({ className: "", value: r.value.slice(o) });
  }
  return n;
}, ii = (t, n) => {
  if (!t) return [];
  const r = Jn(n);
  if (r && Qn(t, n)) {
    const h = [];
    return we(me.highlight(r, at + t + ct), "", h), Ge(ei(h, at.length, ct.length));
  }
  if (r) {
    const h = [];
    return we(me.highlight(r, t), "", h), Ge(h);
  }
  const o = me.highlightAuto(t);
  if (o.children.length === 0) return [{ className: "", value: t }];
  const d = [];
  return we(o, "", d), Ge(d);
}, ri = (t) => {
  const n = [[]];
  for (const r of t)
    r.value.split(`
`).forEach((d, h) => {
      h > 0 && n.push([]), d && n[n.length - 1].push({ className: r.className, value: d });
    });
  return n;
};
export {
  ii as h,
  ni as r,
  ri as s
};
