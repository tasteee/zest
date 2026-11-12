// @ts-self-types="./z-markdown.d.ts"
var Ne = Object.defineProperty;
var xe = (t) => {
  throw TypeError(t);
};
var Ue = (t, e, r) => e in t ? Ne(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var x = (t, e, r) => Ue(t, typeof e != "symbol" ? e + "" : e, r), Ge = (t, e, r) => e.has(t) || xe("Cannot " + r);
var be = (t, e, r) => e.has(t) ? xe("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r);
var V = (t, e, r) => (Ge(t, e, "access private method"), r);
import { c as Fe, a as We, e as Xe, f as Je, o as Ke, j as me, d as Ve } from "../chunks/define-element-BZUk-KLk.js";
import { a as Ye } from "../chunks/hooks-DEFT8qqt.js";
import "./z-code-block.js";
import { g as et } from "../chunks/locale-Bb4aqXuR.js";
function oe() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var q = oe();
function ve(t) {
  q = t;
}
var I = { exec: () => null };
function E(t) {
  let e = [];
  return (r) => {
    let n = Math.max(0, Math.min(3, r - 1)), s = e[n];
    return s || (s = t(n), e[n] = s), s;
  };
}
function g(t, e = "") {
  let r = typeof t == "string" ? t : t.source, n = { replace: (s, l) => {
    let a = typeof l == "string" ? l : l.source;
    return a = a.replace(y.caret, "$1"), r = r.replace(s, a), n;
  }, getRegex: () => new RegExp(r, e) };
  return n;
}
var Ce = ((t = "") => {
  try {
    return !!new RegExp("(?<=1)(?<!1)" + t);
  } catch {
    return !1;
  }
})(), y = { codeRemoveIndent: /^(?: {0,3}\t| {1,4})/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, endingSpaceTabChar: /[ \t]$/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, leadingSpaceTab: /^[ \t]+/, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+)[ \t]*)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, blockquoteMarkerWhitespace: /^( {0,3}>)([ \t]+)/gm, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\][ \t]+\S/, listReplaceTask: /^\[[ xX]\][ \t]+/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, numericCharacterReference: /&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));/, numericCharacterReferenceOrAmpersand: /&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (t) => new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: E((t) => new RegExp(`^ {0,${t}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)), hrRegex: E((t) => new RegExp(`^ {0,${t}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)), fencesBeginRegex: E((t) => new RegExp(`^ {0,${t}}(?:\`\`\`|~~~)`)), headingBeginRegex: E((t) => new RegExp(`^ {0,${t}}#{1,6}(?:\\s|$)`)), pedanticHeadingBeginRegex: E((t) => new RegExp(`^ {0,${t}}#`)), htmlBeginRegex: E((t) => new RegExp(`^ {0,${t}}(?:</?(?:${F})(?: +|$|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`, "i")), blockquoteBeginRegex: E((t) => new RegExp(`^ {0,${t}}>`)) }, tt = /^(?:[ \t]*(?:\n|$))+/, rt = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, nt = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}(?:(?=`)\1`*|(?=~)\1~*) *(?=\n|$)|$)/, G = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, st = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, ce = / {0,3}(?:[*+-]|\d{1,9}[.)])/, Ee = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |fences|blockquote|heading|hr|html|table))+?)\n {0,3}(=+|-+)[ \t]*(?:\n+|$)/, Ie = g(Ee).replace(/bull/g, ce).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), lt = g(Ee).replace(/bull/g, ce).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), he = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/, it = /^[^\n]+/, pe = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\\n]|\n(?![ \t]*\n))+/, at = g(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", pe).replace("title", /(?:"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\\n]|\n(?!\n))*'|\((?:\\[\s\S]|[^()\\])*\))/).getRegex(), ot = g(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, ce).getRegex(), F = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", ue = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, ct = g("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?:[ \\t]+|\\n|/?>|$)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!(?:script|pre|style|textarea)(?![a-z0-9-]))([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", ue).replace("tag", F).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), Le = (t) => g(he).replace("hr", G).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", t).replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", F).getRegex(), ht = Le(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/), pt = Le(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/), ut = g(/^( {0,3}> ?(?:(?![ \t]*(?:\n|$))(paragraph)|[^\n]*)(?:\n|$))+/).replace("paragraph", pt).getRegex(), ge = { blockquote: ut, code: rt, def: at, fences: nt, heading: st, hr: G, html: ct, lheading: Ie, list: ot, newline: tt, paragraph: ht, table: I, text: it }, we = g("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", G).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", F).getRegex(), gt = { ...ge, lheading: lt, table: we, paragraph: g(he).replace("hr", G).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", we).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", F).getRegex() }, ft = { ...ge, html: g(`^ *(?:comment(?: *\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1>(?: *\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?>(?: *\\n{2,}|\\s*$))`).replace("comment", ue).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: I, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: g(he).replace("hr", G).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", Ie).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, kt = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, dt = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, Be = /^( {2,}|\\)\n(?!\s*$)[ \t]*/, xt = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, z = /[\p{P}\p{S}]/u, H = /[\s\p{P}\p{S}]/u, W = /[^\s\p{P}\p{S}]/u, bt = g(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, H).getRegex(), mt = /[\p{Pi}\p{Ps}"']/u, qe = /(?!~)[\p{P}\p{S}]/u, wt = /(?!~)[\s\p{P}\p{S}]/u, yt = /(?:[^\s\p{P}\p{S}]|~)/u, St = g(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", Ce ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), Ze = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/, $t = g(Ze, "u").replace(/punct/g, z).getRegex(), Rt = g(Ze, "u").replace(/punct/g, qe).getRegex(), At = /^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/, zt = g(At, "u").replace(/openQuote/g, mt).replace(/punct/g, z).getRegex(), De = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", Tt = g(De, "gu").replace(/notPunctSpace/g, W).replace(/punctSpace/g, H).replace(/punct/g, z).getRegex(), _t = g(De, "gu").replace(/notPunctSpace/g, yt).replace(/punctSpace/g, wt).replace(/punct/g, qe).getRegex(), Pt = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)", vt = g(Pt, "gu").replace(/notPunctSpace/g, W).replace(/punctSpace/g, H).replace(/punct/g, z).getRegex(), Ct = g("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, W).replace(/punctSpace/g, H).replace(/punct/g, z).getRegex(), Et = "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)", It = g(Et, "gu").replace(/notPunctSpace/g, W).replace(/punctSpace/g, H).replace(/punct/g, z).getRegex(), Lt = g(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, z).getRegex(), Bt = "^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", qt = g(Bt, "gu").replace(/notPunctSpace/g, W).replace(/punctSpace/g, H).replace(/punct/g, z).getRegex(), Zt = g(/\\(punct)/, "gu").replace(/punct/g, z).getRegex(), Dt = g(/(`+)(?:[^`]|[^`][\s\S]*?[^`])\1(?!`)|`+|\\(punct)/, "gu").replace(/punct/g, z).getRegex(), Mt = g(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Ot = g(ue).replace("(?:-->|$)", "-->").getRegex(), Ht = g("^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Ot).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Me = /\[(?:\\[\s\S]|[^\[\]\\])*\]/, re = g(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace("brackets", Me).getRegex(), jt = g(/^!?\[(label)\]\([ \t\n]*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?[ \t\n]*\)/).replace("label", re).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|\((?:\\[\s\S]|[^)\\])*\)/).getRegex(), Qt = g(/^!?\[(label)\]\[(ref)\]/).replace("label", re).replace("ref", pe).getRegex(), Nt = g(/^!?\[(ref)\](?:\[\])?/).replace("ref", pe).getRegex(), ye = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/, Ut = g(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace("brackets", Me).getRegex(), Gt = g("reflink|nolink(?!\\()", "g").replace("reflink", g(/^!?\[(label)\]\[(ref)\]/).replace("label", Ut).replace("ref", ye).getRegex()).replace("nolink", g(/^!?\[(ref)\](?:\[\])?/).replace("ref", ye).getRegex()).getRegex(), Se = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, Ft = /[A-Za-z0-9._+-]+@[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/, Wt = g(/(?:mailto:email|xmpp:email(?:\/[A-Za-z0-9@.]+)?)/).replace(/email/g, Ft).getRegex(), fe = { _backpedal: I, anyPunctuation: Zt, anyPunctuationOutsideCode: Dt, autolink: Mt, blockSkip: St, br: Be, code: dt, del: I, delLDelim: I, delRDelim: I, emStrongLDelim: $t, emStrongRDelimAst: Tt, emStrongRDelimUnd: Ct, escape: kt, link: jt, nolink: Nt, punctuation: bt, reflink: Qt, reflinkSearch: Gt, tag: Ht, text: xt, url: I }, Xt = { ...fe, emStrongLDelim: zt, emStrongRDelimAst: vt, emStrongRDelimUnd: It, link: g(/^!?\[(label)\]\((.*?)\)/).replace("label", re).getRegex(), reflink: g(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", re).getRegex() }, ie = { ...fe, emStrongRDelimAst: _t, emStrongLDelim: Rt, delLDelim: Lt, delRDelim: qt, url: g(/^emailProtocol|^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("emailProtocol", Wt).replace("protocol", Se).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: g(/^(?:[^a-zA-Z0-9](?=emailProtocol)|(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|wwwStart|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9](?=emailProtocol)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))))/).replace("protocol", Se).replace(/emailProtocol/g, /(?:mailto|xmpp):/).replace("wwwStart", Ce ? "(?<![^\\s*_~(])www\\." : "www\\.").getRegex() }, Jt = { ...ie, br: g(Be).replace("{2,}", "*").getRegex(), text: g(ie.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, Y = { normal: ge, gfm: gt, pedantic: ft }, N = { normal: fe, gfm: ie, breaks: Jt, pedantic: Xt }, Kt = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, $e = (t) => Kt[t];
function $(t, e) {
  if (e) {
    if (y.escapeTest.test(t)) return t.replace(y.escapeReplace, $e);
  } else if (y.escapeTestNoEncode.test(t)) return t.replace(y.escapeReplaceNoEncode, $e);
  return t;
}
function Vt(t) {
  return y.numericCharacterReference.test(t) ? t.replace(y.numericCharacterReferenceOrAmpersand, (e, r, n) => {
    if (r === void 0 && n === void 0) return "&amp;";
    let s = r === void 0 ? Number.parseInt(n, 16) : Number.parseInt(r, 10);
    return s === 0 || s > 1114111 || s >= 55296 && s <= 57343 ? "�" : s === 38 ? "&amp;" : String.fromCodePoint(s);
  }) : t;
}
function Re(t) {
  try {
    t = encodeURI(t).replace(y.percentDecode, "%");
  } catch {
    return null;
  }
  return t;
}
function Ae(t, e) {
  var l;
  let r = t.replace(y.findPipe, (a, o, c) => {
    let p = !1, i = o;
    for (; --i >= 0 && c[i] === "\\"; ) p = !p;
    return p ? "|" : " |";
  }), n = r.split(y.splitPipe), s = 0;
  if (n[0].trim() || n.shift(), n.length > 0 && !((l = n.at(-1)) != null && l.trim()) && n.pop(), e) if (n.length > e) n.splice(e);
  else for (; n.length < e; ) n.push("");
  for (; s < n.length; s++) n[s] = n[s].trim().replace(y.slashPipe, "|");
  return n;
}
function _(t, e, r) {
  let n = t.length;
  if (n === 0) return "";
  let s = 0;
  for (; s < n && t.charAt(n - s - 1) === e; )
    s++;
  return t.slice(0, n - s);
}
function ze(t) {
  let e = t.split(`
`), r = e.length - 1;
  for (; r >= 0 && y.blankLine.test(e[r]); ) r--;
  return e.length - r <= 2 ? t : e.slice(0, r + 1).join(`
`);
}
function ne(t) {
  return t.trim().replace(y.multipleSpaceGlobal, " ").toLowerCase().toUpperCase().toLowerCase();
}
function Te(t, e) {
  if (t.indexOf(e[0]) === -1 && t.indexOf(e[1]) === -1) return -1;
  let r = 0;
  for (let n = 0; n < t.length; n++) if (t[n] === "\\") n++;
  else if (t[n] === e[0]) r++;
  else if (t[n] === e[1] && (r--, r < 0)) return n;
  return r > 0 ? -2 : -1;
}
var O = /* @__PURE__ */ new WeakMap();
function ke(t) {
  let e = { "*": -1, _: -1 }, r = -1, n = t.length;
  for (let s = 0; s < n; s++) {
    let l = t[s];
    if (l !== "*" && l !== "_" && l !== "~") continue;
    let a = s === 0 ? `
` : t[s - 1], o = s + 1;
    for (; o < n && t[o] === l; ) o++;
    a !== " " && a !== "	" && a !== `
` && a !== "\r" && a !== "\f" && (l === "~" ? r = s : e[l] = s), s = o - 1;
  }
  return { maskedSrc: t, lastPossibleEmStrongCloserIndex: e, lastPossibleDelCloserIndex: r };
}
function Yt(t, e) {
  let r = ke(e), n = O.get(t);
  n ? n.push(r) : O.set(t, [r]);
}
function er(t) {
  let e = O.get(t);
  e && (e.pop(), e.length === 0 && O.delete(t));
}
function tr(t, e, r) {
  var s;
  let n = (s = O.get(t)) == null ? void 0 : s.at(-1);
  return n && n.maskedSrc === e ? n.lastPossibleEmStrongCloserIndex[r] : ke(e).lastPossibleEmStrongCloserIndex[r];
}
function rr(t, e) {
  var n;
  let r = (n = O.get(t)) == null ? void 0 : n.at(-1);
  return r && r.maskedSrc === e ? r.lastPossibleDelCloserIndex : ke(e).lastPossibleDelCloserIndex;
}
function ee(t, e = 0) {
  let r = e, n = "";
  for (let s of t) if (s === "	") {
    let l = 4 - r % 4;
    n += " ".repeat(l), r += l;
  } else n += s, r++;
  return n;
}
function _e(t, e, r, n, s) {
  let l = e.href, a = e.title || null, o = t[1].replace(s.other.outputLinkReplace, "$1"), c = t[0].charAt(0) === "!", p = n.state.inLink, i = n.state.linkEmitted, u = n.state.inRawBlock;
  n.state.inLink = !0, n.state.linkEmitted = !1;
  let h = n.inlineTokens(o), f = n.state.linkEmitted;
  if (n.state.linkEmitted = i, n.state.inLink = p, !c) {
    if (f) {
      n.state.inRawBlock = u;
      return;
    }
    n.state.linkEmitted = !0;
  }
  return { type: c ? "image" : "link", raw: r, href: l, title: a, text: o, tokens: h };
}
function nr(t, e, r) {
  let n = t.match(r.other.indentCodeCompensation);
  if (n === null) return e;
  let s = n[1];
  return e.split(`
`).map((l) => {
    let a = l.match(r.other.beginningSpace);
    if (a === null) return l;
    let [o] = a;
    return l.slice(Math.min(o.length, s.length));
  }).join(`
`);
}
function Pe(t, e, r, n) {
  if (!e.includes("<")) return !1;
  for (let s = 0; s < e.length; s++) {
    if (e[s] === "\\") {
      s++;
      continue;
    }
    if (e[s] === "`") {
      let o = n.inline.code.exec(e.slice(s));
      if (o) {
        s += o[0].length - 1;
        continue;
      }
    }
    if (e[s] !== "<") continue;
    let l = t.slice(r + s), a = n.inline.tag.exec(l) || n.inline.autolink.exec(l);
    if (a) {
      if (a[0].length > e.length - s) return !0;
      s += a[0].length - 1;
    }
  }
  return !1;
}
var M = class {
  constructor(t) {
    x(this, "options");
    x(this, "rules");
    x(this, "lexer");
    this.options = t || q;
  }
  space(t) {
    let e = this.rules.block.newline.exec(t);
    if (e && e[0].length > 0) return { type: "space", raw: e[0] };
  }
  code(t) {
    let e = this.rules.block.code.exec(t);
    if (e) {
      let r = this.options.pedantic ? e[0] : ze(e[0]), n = r.replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: r, codeBlockStyle: "indented", text: n };
    }
  }
  fences(t) {
    let e = this.rules.block.fences.exec(t);
    if (e) {
      let r = e[0], n = nr(r, e[3] || "", this.rules);
      return { type: "code", raw: r, lang: e[2] ? e[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : e[2], text: n };
    }
  }
  heading(t) {
    let e = this.rules.block.heading.exec(t);
    if (e) {
      let r = e[2].trim();
      if (this.rules.other.endingHash.test(r)) {
        let n = _(r, "#");
        (this.options.pedantic || !n || this.rules.other.endingSpaceTabChar.test(n)) && (r = n.trim());
      }
      return { type: "heading", raw: _(e[0], `
`), depth: e[1].length, text: r, tokens: this.lexer.inline(r) };
    }
  }
  hr(t) {
    let e = this.rules.block.hr.exec(t);
    if (e) return { type: "hr", raw: _(e[0], `
`) };
  }
  blockquote(t) {
    let e = this.rules.block.blockquote.exec(t);
    if (e) {
      let r = _(e[0], `
`).split(`
`), n = "", s = "", l = [];
      for (; r.length > 0; ) {
        let a = !1, o = [], c;
        for (c = 0; c < r.length; c++) if (this.rules.other.blockquoteStart.test(r[c])) o.push(r[c]), a = !0;
        else if (!a) o.push(r[c]);
        else break;
        r = r.slice(c);
        let p = o.join(`
`), i = p.replace(this.rules.other.blockquoteMarkerWhitespace, (f, k, b) => k + ee(b, k.length)).replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        n = n ? `${n}
${p}` : p, s = s ? `${s}
${i}` : i;
        let u = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(i, l, !0), this.lexer.state.top = u, r.length === 0) break;
        let h = l.at(-1);
        if ((h == null ? void 0 : h.type) === "code" || (h == null ? void 0 : h.type) === "heading" || (h == null ? void 0 : h.type) === "hr" || (h == null ? void 0 : h.type) === "html" || (h == null ? void 0 : h.type) === "table") break;
        if ((h == null ? void 0 : h.type) === "blockquote") {
          let f = h, k = r.join(`
`), b = f.raw + `
` + k.replace(this.rules.other.blockquoteSetextReplace2, ""), d = this.blockquote(b);
          l[l.length - 1] = d;
          let S = b.substring(d.raw.length).replace(/^\n/, ""), w = S ? S.split(`
`).length : 0, T = w ? r.slice(0, -w) : r;
          if (T.length > 0 && (n = `${n}
${T.join(`
`)}`), s = s.substring(0, s.length - f.text.length) + d.text, r = r.slice(T.length), r.length > 0 && this.rules.other.blockquoteStart.test(r[0])) continue;
          break;
        } else if ((h == null ? void 0 : h.type) === "list") {
          let f = h, k = f.raw + `
` + r.join(`
`), b = this.list(k);
          l[l.length - 1] = b;
          let d = b.raw.length > f.raw.length ? k.slice(f.raw.length + 1, b.raw.length).split(`
`).length : 0;
          if (d > 0) {
            let S = r.slice(0, d).join(`
`);
            n = `${n}
${S}`, s = `${s}
${S}`;
          }
          r = r.slice(d);
          continue;
        }
      }
      return { type: "blockquote", raw: n, tokens: l, text: s };
    }
  }
  list(t) {
    let e = this.rules.block.list.exec(t);
    if (e) {
      let r = t, n = () => r.length - t.length, s = e[1].trim(), l = s.length > 1, a = { type: "list", raw: "", ordered: l, start: l ? +s.slice(0, -1) : "", loose: !1, items: [] };
      s = l ? `\\d{1,9}\\${s.slice(-1)}` : `\\${s}`, this.options.pedantic && (s = l ? s : "[*+-]");
      let o = this.rules.other.listItemRegex(s), c = !1;
      for (; t; ) {
        let i = !1, u = "";
        if (!(e = o.exec(t)) || this.rules.block.hr.test(t)) break;
        let h = n();
        t = t.substring(e[0].length);
        let f = e[2].split(`
`, 1)[0], k = e[1].length, b = this.options.pedantic ? ee(f, k) : f.replace(this.rules.other.leadingSpaceTab, (Z) => ee(Z, k)), d = t.split(`
`, 1)[0], S = !b.trim(), w = 0;
        if (this.options.pedantic ? (w = 2, u = b.trimStart()) : S ? w = k + 1 : (w = b.search(this.rules.other.nonSpaceChar), w = w > 4 ? 1 : w, u = b.slice(w), w += k), S && this.rules.other.blankLine.test(d) && (t = t.substring(d.length + 1), i = !0), !i) {
          let Z = this.rules.other.nextBulletRegex(w), j = this.rules.other.hrRegex(w), X = this.rules.other.fencesBeginRegex(w), J = this.options.pedantic ? this.rules.other.pedanticHeadingBeginRegex(w) : this.rules.other.headingBeginRegex(w), C = this.rules.other.htmlBeginRegex(w), K = this.rules.other.blockquoteBeginRegex(w);
          for (; t; ) {
            let Q = t.split(`
`, 1)[0], D;
            if (d = Q, this.options.pedantic ? (d = d.replace(this.rules.other.listReplaceNesting, "  "), D = d) : D = d.replace(this.rules.other.leadingSpaceTab, (le) => ee(le)), X.test(d) || J.test(d) || C.test(d) || K.test(d) || Z.test(d) || j.test(d)) break;
            if (D.search(this.rules.other.nonSpaceChar) >= w || !d.trim()) u += `
` + D.slice(w);
            else {
              if (S || b.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || X.test(b) || J.test(b) || C.test(b) || j.test(b)) break;
              let le = !this.options.pedantic && /^ {0,3}(?:=+|-+) *$/.test(d) && this.rules.block.lheading.test(`${b}
${d}`) ? `    ${D.replace(/^ {0,3}/, "")}` : d;
              u += `
` + le;
            }
            S = !d.trim(), t = t.substring(Q.length + 1), b = D.slice(w);
          }
        }
        let T = r.slice(h, n());
        a.loose || (c ? a.loose = !0 : this.rules.other.doubleBlankLine.test(T) && (c = !0)), a.items.push({ type: "list_item", raw: T, task: !!this.options.gfm && this.rules.other.listIsTask.test(u), loose: !1, text: u, tokens: [] });
      }
      let p = a.items.at(-1);
      if (p) p.raw = p.raw.trimEnd(), p.text = p.text.trimEnd();
      else return;
      a.raw = r.slice(0, n()).trimEnd();
      for (let i of a.items) if (this.lexer.state.top = !1, i.tokens = this.lexer.blockTokens(i.text, []), !a.loose) {
        let u = i.tokens.filter((f) => f.type === "space"), h = u.length > 0 && u.some((f) => this.rules.other.anyLine.test(f.raw));
        a.loose = h;
      }
      for (let i of a.items) {
        let u = i.tokens[0];
        if (i.task && ((u == null ? void 0 : u.type) === "text" || (u == null ? void 0 : u.type) === "paragraph")) {
          i.text = i.text.replace(this.rules.other.listReplaceTask, ""), u.raw = u.raw.replace(this.rules.other.listReplaceTask, ""), u.text = u.text.replace(this.rules.other.listReplaceTask, "");
          for (let f = this.lexer.inlineQueue.length - 1; f >= 0; f--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)) {
            this.lexer.inlineQueue[f].src = this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask, "");
            break;
          }
          let h = this.rules.other.listTaskCheckbox.exec(i.raw);
          if (h) {
            let f = { type: "checkbox", raw: h[0] + " ", checked: h[0] !== "[ ]" };
            i.checked = f.checked, a.loose ? i.tokens[0] && ["paragraph", "text"].includes(i.tokens[0].type) && "tokens" in i.tokens[0] && i.tokens[0].tokens ? (i.tokens[0].raw = f.raw + i.tokens[0].raw, i.tokens[0].text = f.raw + i.tokens[0].text, i.tokens[0].tokens.unshift(f)) : i.tokens.unshift({ type: "paragraph", raw: f.raw, text: f.raw, tokens: [f] }) : i.tokens.unshift(f);
          }
        } else i.task && (i.task = !1);
      }
      if (a.loose) for (let i of a.items) {
        i.loose = !0;
        for (let u of i.tokens) u.type === "text" && (u.type = "paragraph");
      }
      return a;
    }
  }
  html(t) {
    let e = this.rules.block.html.exec(t);
    if (e) {
      let r = ze(e[0]);
      return { type: "html", block: !0, raw: r, pre: e[1] === "pre" || e[1] === "script" || e[1] === "style", text: r };
    }
  }
  def(t) {
    let e = this.rules.block.def.exec(t);
    if (e) {
      if (!this.rules.other.startAngleBracket.test(e[2]) && Te(e[2], "()") !== -1) return;
      let r = ne(e[1]), n = e[2] ? e[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", s = e[3] ? e[3].substring(1, e[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : e[3];
      return { type: "def", tag: r, raw: _(e[0], `
`), href: n, title: s };
    }
  }
  table(t) {
    var a;
    let e = this.rules.block.table.exec(t);
    if (!e || !this.rules.other.tableDelimiter.test(e[2])) return;
    let r = Ae(e[1]), n = e[2].replace(this.rules.other.tableAlignChars, "").split("|"), s = (a = e[3]) != null && a.trim() ? e[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], l = { type: "table", raw: _(e[0], `
`), header: [], align: [], rows: [] };
    if (r.length === n.length) {
      for (let o of n) this.rules.other.tableAlignRight.test(o) ? l.align.push("right") : this.rules.other.tableAlignCenter.test(o) ? l.align.push("center") : this.rules.other.tableAlignLeft.test(o) ? l.align.push("left") : l.align.push(null);
      for (let o = 0; o < r.length; o++) l.header.push({ text: r[o], tokens: this.lexer.inline(r[o]), header: !0, align: l.align[o] });
      for (let o of s) l.rows.push(Ae(o, l.header.length).map((c, p) => ({ text: c, tokens: this.lexer.inline(c), header: !1, align: l.align[p] })));
      return l;
    }
  }
  lheading(t) {
    let e = this.rules.block.lheading.exec(t);
    if (e) {
      let r = e[1].trim();
      return { type: "heading", raw: _(e[0], `
`), depth: e[2].charAt(0) === "=" ? 1 : 2, text: r, tokens: this.lexer.inline(r) };
    }
  }
  paragraph(t) {
    let e = this.rules.block.paragraph.exec(t);
    if (e) {
      let r = e[1].charAt(e[1].length - 1) === `
` ? e[1].slice(0, -1) : e[1];
      return { type: "paragraph", raw: e[0], text: r, tokens: this.lexer.inline(r) };
    }
  }
  text(t) {
    let e = this.rules.block.text.exec(t);
    if (e) return { type: "text", raw: e[0], text: e[0], tokens: this.lexer.inline(e[0]) };
  }
  escape(t) {
    let e = this.rules.inline.escape.exec(t);
    if (e) return { type: "escape", raw: e[0], text: e[1] };
  }
  tag(t) {
    let e = this.rules.inline.tag.exec(t);
    if (e) return !this.lexer.state.inLink && this.rules.other.startATag.test(e[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(e[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(e[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(e[0]) && (this.lexer.state.inRawBlock = !1), { type: "html", raw: e[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: !1, text: e[0] };
  }
  link(t) {
    if (this.lexer.state.linkParenPossible === !1) return;
    let e = this.rules.inline.link.exec(t);
    if (e) {
      let r = e[0].charAt(0) === "!" ? 2 : 1;
      if (!this.options.pedantic && Pe(t, e[1], r, this.rules)) return;
      let n = e[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n)) {
        if (!this.rules.other.endAngleBracket.test(n)) return;
        let o = _(n.slice(0, -1), "\\");
        if ((n.length - o.length) % 2 === 0) return;
      } else {
        let o = Te(e[2], "()");
        if (o === -2) return;
        if (o > -1) {
          let c = (e[0].indexOf("!") === 0 ? 5 : 4) + e[1].length + o;
          e[2] = e[2].substring(0, o), e[0] = e[0].substring(0, c).trim(), e[3] = "";
        }
      }
      let s = _(e[0].slice(0, -1), "\\");
      if ((e[0].length - s.length) % 2 === 0) return;
      let l = e[2], a = "";
      if (this.options.pedantic) {
        let o = this.rules.other.pedanticHrefTitle.exec(l);
        o && (l = o[1], a = o[3]);
      } else a = e[3] ? e[3].slice(1, -1) : "";
      return l = l.trim(), this.rules.other.startAngleBracket.test(l) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? l = l.slice(1) : l = l.slice(1, -1)), _e(e, { href: l && l.replace(this.rules.inline.anyPunctuation, "$1"), title: a && a.replace(this.rules.inline.anyPunctuation, "$1") }, e[0], this.lexer, this.rules);
    }
  }
  reflink(t, e) {
    let r;
    if ((r = this.rules.inline.reflink.exec(t)) || (r = this.rules.inline.nolink.exec(t))) {
      let n = r[0].charAt(0) === "!" ? 2 : 1;
      if (!this.options.pedantic && Pe(t, r[1], n, this.rules)) return;
      let s = e[ne(r[2] || r[1])];
      if (!s) {
        let l = r[0].charAt(0);
        return { type: "text", raw: l, text: l };
      }
      return _e(r, s, r[0], this.lexer, this.rules);
    }
  }
  emStrong(t, e, r = "") {
    let n = this.rules.inline.emStrongLDelim.exec(t);
    if (!n || !n[1] && !n[2] && !n[3] && !n[4]) return;
    let s = n[0][0], l = r === s, a = e.length - t.length, o = a;
    for (; !this.options.pedantic && o > 0 && e[o - 1] === s; ) o--;
    let c = [...e.slice(Math.max(0, o - 2), o)].at(-1) ?? "", p = c === "*" || c === "_" || !!this.rules.inline.punctuation.exec(c);
    o < a && (r = c);
    let i = o < a ? p : !!this.rules.inline.punctuation.exec(r);
    if (n[4] && r.match(this.rules.other.unicodeAlphaNumeric)) return;
    let u = n[1] || n[3] || "";
    if (!u || !r || i) {
      let h = [...n[0]].length - 1, f, k, b = h, d = 0, S = a - o + h, w = !this.options.pedantic && !!c.trim() && (!!u || s === "*" && !p);
      if (s !== "*" && s !== "_") return;
      let T = s === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd, Z = tr(this, e, s), j = e.length - t.length + h;
      if (Z < j) return;
      e = e.slice(-1 * t.length + h);
      let X = Z - j;
      for (T.lastIndex = 0; (n = T.exec(e)) !== null && !(n.index > X); ) {
        if (f = n[1] || n[2] || n[3] || n[4] || n[5] || n[6], !f) continue;
        if (k = [...f].length, n[3] || n[4]) {
          b += k;
          continue;
        } else if (n[5] || n[6] || w) {
          if (l && (n[5] || n[6])) break;
          if (S % 3 && !((S + k) % 3)) {
            d += k;
            continue;
          }
        }
        if (b -= k, b > 0) continue;
        k = Math.min(k, k + b + d);
        let J = [...n[0]][0].length, C = t.slice(0, h + n.index + J + k);
        if (Math.min(h, k) % 2) {
          let Q = C.slice(1, -1);
          return { type: "em", raw: C, text: Q, tokens: this.lexer.inlineTokens(Q) };
        }
        let K = C.slice(2, -2);
        return { type: "strong", raw: C, text: K, tokens: this.lexer.inlineTokens(K) };
      }
    }
  }
  codespan(t) {
    let e = this.rules.inline.code.exec(t);
    if (e) {
      let r = e[2].replace(this.rules.other.newLineCharGlobal, " "), n = this.rules.other.nonSpaceChar.test(r), s = this.rules.other.startingSpaceChar.test(r) && this.rules.other.endingSpaceChar.test(r);
      return n && s && (r = r.substring(1, r.length - 1)), { type: "codespan", raw: e[0], text: r };
    }
  }
  br(t) {
    let e = this.rules.inline.br.exec(t);
    if (e) return { type: "br", raw: e[0] };
  }
  del(t, e, r = "") {
    let n = this.rules.inline.delLDelim.exec(t);
    if (n && (!n[1] || !r || this.rules.inline.punctuation.exec(r))) {
      let s = [...n[0]].length - 1, l, a, o = s, c = this.rules.inline.delRDelim, p = rr(this, e), i = e.length - t.length + s;
      if (p < i) return;
      e = e.slice(-1 * t.length + s);
      let u = p - i;
      for (c.lastIndex = 0; (n = c.exec(e)) !== null && !(n.index > u); ) {
        if (l = n[1] || n[2] || n[3] || n[4] || n[5] || n[6], !l || (a = [...l].length, a !== s)) continue;
        if (n[3] || n[4]) {
          o += a;
          continue;
        }
        if (o -= a, o > 0) continue;
        a = Math.min(a, a + o);
        let h = [...n[0]][0].length, f = t.slice(0, s + n.index + h + a), k = f.slice(s, -s);
        return { type: "del", raw: f, text: k, tokens: this.lexer.inlineTokens(k) };
      }
    }
  }
  autolink(t) {
    let e = this.rules.inline.autolink.exec(t);
    if (e) {
      let r, n;
      return e[2] === "@" ? (r = e[1], n = "mailto:" + r) : (r = e[1], n = r), { type: "link", raw: e[0], text: r, href: n, autolink: !0, tokens: [{ type: "text", raw: r, text: r }] };
    }
  }
  url(t) {
    var r;
    let e;
    if (e = this.rules.inline.url.exec(t)) {
      let n, s;
      if (e[2] === "@") n = e[0], s = "mailto:" + n;
      else {
        let l;
        do
          l = e[0], e[0] = ((r = this.rules.inline._backpedal.exec(e[0])) == null ? void 0 : r[0]) ?? "";
        while (l !== e[0]);
        n = e[0], e[1] === "www." ? s = "http://" + e[0] : s = e[0];
      }
      return { type: "link", raw: e[0], text: n, href: s, autolink: !0, tokens: [{ type: "text", raw: n, text: n }] };
    }
  }
  inlineText(t) {
    let e = this.rules.inline.text.exec(t);
    if (e) {
      let r = this.lexer.state.inRawBlock;
      return { type: "text", raw: e[0], text: r ? e[0] : Vt(e[0]), escaped: r };
    }
  }
}, v, Oe, He, je, L, R = (L = class {
  constructor(e) {
    be(this, v);
    x(this, "tokens");
    x(this, "options");
    x(this, "state");
    x(this, "inlineQueue");
    x(this, "tokenizer");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || q, this.options.tokenizer = this.options.tokenizer || new M(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, linkEmitted: !1, linkParenPossible: !0, top: !0 };
    let r = { other: y, block: Y.normal, inline: N.normal };
    this.options.pedantic ? (r.block = Y.pedantic, r.inline = N.pedantic) : this.options.gfm && (r.block = Y.gfm, this.options.breaks ? r.inline = N.breaks : r.inline = N.gfm), this.tokenizer.rules = r;
  }
  static get rules() {
    return { block: Y, inline: N };
  }
  static lex(e, r) {
    return new L(r).lex(e);
  }
  static lexInline(e, r) {
    return new L(r).inlineTokens(e);
  }
  lex(e) {
    e = e.replace(y.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let r = 0; r < this.inlineQueue.length; r++) {
      let n = this.inlineQueue[r];
      this.state.inRawBlock = !1, this.inlineTokens(n.src, n.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, r = [], n = !1) {
    var l, a, o;
    this.tokenizer.lexer = this, this.options.pedantic && (e = e.replace(y.tabCharGlobal, "    ").replace(y.spaceLine, ""));
    let s = 1 / 0;
    for (; e; ) {
      if (e.length < s) s = e.length;
      else {
        this.infiniteLoopError(e.charCodeAt(0));
        break;
      }
      let c;
      if ((a = (l = this.options.extensions) == null ? void 0 : l.block) != null && a.some((i) => (c = i.call({ lexer: this }, e, r)) ? (e = e.substring(c.raw.length), r.push(c), !0) : !1)) continue;
      if (c = this.tokenizer.space(e)) {
        e = e.substring(c.raw.length);
        let i = r.at(-1);
        c.raw.length === 1 && i !== void 0 ? i.raw += `
` : r.push(c);
        continue;
      }
      if (c = this.tokenizer.code(e)) {
        e = e.substring(c.raw.length);
        let i = r.at(-1);
        (i == null ? void 0 : i.type) === "paragraph" || (i == null ? void 0 : i.type) === "text" ? (i.raw += (i.raw.endsWith(`
`) ? "" : `
`) + c.raw, i.text += `
` + c.text, this.inlineQueue.at(-1).src = i.text) : r.push(c);
        continue;
      }
      if (c = this.tokenizer.fences(e)) {
        e = e.substring(c.raw.length), r.push(c);
        continue;
      }
      if (c = this.tokenizer.heading(e)) {
        e = e.substring(c.raw.length), r.push(c);
        continue;
      }
      if (c = this.tokenizer.hr(e)) {
        e = e.substring(c.raw.length), r.push(c);
        continue;
      }
      if (c = this.tokenizer.blockquote(e)) {
        e = e.substring(c.raw.length), r.push(c);
        continue;
      }
      if (c = this.tokenizer.list(e)) {
        e = e.substring(c.raw.length), r.push(c);
        continue;
      }
      if (c = this.tokenizer.html(e)) {
        e = e.substring(c.raw.length), r.push(c);
        continue;
      }
      if (c = this.tokenizer.def(e)) {
        e = e.substring(c.raw.length);
        let i = r.at(-1);
        (i == null ? void 0 : i.type) === "paragraph" || (i == null ? void 0 : i.type) === "text" ? (i.raw += (i.raw.endsWith(`
`) ? "" : `
`) + c.raw, i.text += `
` + c.raw, this.inlineQueue.at(-1).src = i.text) : (this.tokens.links[c.tag] || (this.tokens.links[c.tag] = { href: c.href, title: c.title }), r.push(c));
        continue;
      }
      if (c = this.tokenizer.table(e)) {
        e = e.substring(c.raw.length), r.push(c);
        continue;
      }
      if (c = this.tokenizer.lheading(e)) {
        e = e.substring(c.raw.length), r.push(c);
        continue;
      }
      let p = e;
      if ((o = this.options.extensions) != null && o.startBlock) {
        let i = 1 / 0, u = e.slice(1), h;
        this.options.extensions.startBlock.forEach((f) => {
          h = f.call({ lexer: this }, u), typeof h == "number" && h >= 0 && (i = Math.min(i, h));
        }), i < 1 / 0 && i >= 0 && (p = e.substring(0, i + 1));
      }
      if (this.state.top && (c = this.tokenizer.paragraph(p))) {
        let i = r.at(-1);
        n && (i == null ? void 0 : i.type) === "paragraph" ? (i.raw += (i.raw.endsWith(`
`) ? "" : `
`) + c.raw, i.text += `
` + c.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = i.text) : r.push(c), n = p.length !== e.length, e = e.substring(c.raw.length);
        continue;
      }
      if (c = this.tokenizer.text(e)) {
        e = e.substring(c.raw.length);
        let i = r.at(-1);
        (i == null ? void 0 : i.type) === "text" ? (i.raw += (i.raw.endsWith(`
`) ? "" : `
`) + c.raw, i.text += `
` + c.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = i.text) : r.push(c);
        continue;
      }
      if (e) {
        this.infiniteLoopError(e.charCodeAt(0));
        break;
      }
    }
    return this.state.top = !0, r;
  }
  inline(e, r = []) {
    return this.inlineQueue.push({ src: e, tokens: r }), r;
  }
  linkInText(e) {
    if (!e.includes("[")) return !1;
    let r = this.tokenizer.rules.inline.link;
    for (let n of e.matchAll(this.tokenizer.rules.inline.blockSkip)) if (r.test(n[0]) && e.charAt(n.index - 1) !== "!") return !0;
    for (let n of e.matchAll(this.tokenizer.rules.inline.reflinkSearch)) {
      let s = n[0], l = s.lastIndexOf("[");
      if (!(s.charAt(0) === "!" || !Object.hasOwn(this.tokens.links, ne(s.slice(l + 1, -1)))) && !(l > 1 && this.linkInText(s.slice(1, l - 1)))) return !0;
    }
    return !1;
  }
  inlineTokens(e, r = []) {
    this.tokenizer.lexer = this;
    let n = this.state.linkParenPossible;
    this.state.linkParenPossible = n && e.includes(")");
    try {
      return V(this, v, Oe).call(this, e, r);
    } finally {
      this.state.linkParenPossible = n;
    }
  }
  infiniteLoopError(e) {
    let r = "Infinite loop on byte: " + e;
    if (this.options.silent) console.error(r);
    else throw new Error(r);
  }
}, v = new WeakSet(), Oe = function(e, r) {
  var s;
  let n = e.includes("*") || e.includes("_") || e.includes("~") || (s = this.options.hooks) != null && s.emStrongMask || this.tokenizer.emStrong !== M.prototype.emStrong || this.tokenizer.del !== M.prototype.del ? V(this, v, je).call(this, e) : e;
  Yt(this.tokenizer, n);
  try {
    return V(this, v, He).call(this, e, n, r);
  } finally {
    er(this.tokenizer);
  }
}, He = function(e, r, n) {
  var o, c, p;
  let s = !1, l = "", a = 1 / 0;
  for (; e; ) {
    if (e.length < a) a = e.length;
    else {
      this.infiniteLoopError(e.charCodeAt(0));
      break;
    }
    s || (l = ""), s = !1;
    let i;
    if ((c = (o = this.options.extensions) == null ? void 0 : o.inline) != null && c.some((h) => (i = h.call({ lexer: this }, e, n)) ? (e = e.substring(i.raw.length), n.push(i), !0) : !1)) continue;
    if (i = this.tokenizer.escape(e)) {
      e = e.substring(i.raw.length), n.push(i);
      continue;
    }
    if (i = this.tokenizer.tag(e)) {
      e = e.substring(i.raw.length), n.push(i);
      continue;
    }
    if (i = this.tokenizer.link(e)) {
      e = e.substring(i.raw.length), n.push(i);
      continue;
    }
    if (i = this.tokenizer.reflink(e, this.tokens.links)) {
      e = e.substring(i.raw.length);
      let h = n.at(-1);
      i.type === "text" && (h == null ? void 0 : h.type) === "text" ? (h.raw += i.raw, h.text += i.text) : n.push(i);
      continue;
    }
    if (i = this.tokenizer.emStrong(e, r, l)) {
      e = e.substring(i.raw.length), n.push(i);
      continue;
    }
    if (i = this.tokenizer.codespan(e)) {
      e = e.substring(i.raw.length), n.push(i);
      continue;
    }
    if (i = this.tokenizer.br(e)) {
      e = e.substring(i.raw.length), n.push(i);
      continue;
    }
    if (i = this.tokenizer.del(e, r, l)) {
      e = e.substring(i.raw.length), n.push(i);
      continue;
    }
    if (i = this.tokenizer.autolink(e)) {
      e = e.substring(i.raw.length), n.push(i);
      continue;
    }
    if (!this.state.inLink && (i = this.tokenizer.url(e))) {
      e = e.substring(i.raw.length), n.push(i);
      continue;
    }
    let u = e;
    if ((p = this.options.extensions) != null && p.startInline) {
      let h = 1 / 0, f = e.slice(1), k;
      this.options.extensions.startInline.forEach((b) => {
        k = b.call({ lexer: this }, f), typeof k == "number" && k >= 0 && (h = Math.min(h, k));
      }), h < 1 / 0 && h >= 0 && (u = e.substring(0, h + 1));
    }
    if (i = this.tokenizer.inlineText(u)) {
      e = e.substring(i.raw.length), i.raw.slice(-1) !== "_" && (l = i.raw.slice(-1)), s = !0;
      let h = n.at(-1);
      (h == null ? void 0 : h.type) === "text" ? (h.raw += i.raw, h.text += i.text) : n.push(i);
      continue;
    }
    if (e) {
      this.infiniteLoopError(e.charCodeAt(0));
      break;
    }
  }
  return n;
}, je = function(e) {
  var n, s;
  let r = e;
  if (this.tokens.links && e.includes("[")) {
    let l = this.tokenizer.rules.inline.reflinkSearch, a = (o) => {
      let c = o.lastIndexOf("[");
      if (!Object.hasOwn(this.tokens.links, ne(o.slice(c + 1, -1)))) return o;
      if (c > 1 && o.charAt(0) !== "!") {
        let p = o.slice(1, c - 1);
        if (this.linkInText(p)) return "[" + p.replace(l, a) + "][" + "a".repeat(o.length - c - 2) + "]";
      }
      return "[" + "a".repeat(o.length - 2) + "]";
    };
    r = r.replace(l, a);
  }
  return r = r.replace(this.tokenizer.rules.inline.anyPunctuationOutsideCode, (l, a, o) => o ? "+".repeat(l.length) : a ? a + l.slice(a.length, -a.length).replace(/`/g, "+") + a : l), r = r.replace(this.tokenizer.rules.inline.blockSkip, (l, a, o) => {
    let c = o ? o.length : 0;
    return l.slice(0, c) + "[" + "a".repeat(l.length - c - 2) + "]";
  }), r = ((s = (n = this.options.hooks) == null ? void 0 : n.emStrongMask) == null ? void 0 : s.call({ lexer: this }, r)) ?? r, r;
}, L), se = class {
  constructor(t) {
    x(this, "options");
    x(this, "parser");
    this.options = t || q;
  }
  space(t) {
    return "";
  }
  code({ text: t, lang: e, escaped: r }) {
    var l;
    let n = (l = (e || "").match(y.notSpaceStart)) == null ? void 0 : l[0], s = t ? t.replace(y.endingNewline, "") + `
` : "";
    return n ? '<pre><code class="language-' + $(n) + '">' + (r ? s : $(s, !0)) + `</code></pre>
` : "<pre><code>" + (r ? s : $(s, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: t }) {
    return `<blockquote>
${this.parser.parse(t)}</blockquote>
`;
  }
  html({ text: t }) {
    return t;
  }
  def(t) {
    return "";
  }
  heading({ tokens: t, depth: e }) {
    return `<h${e}>${this.parser.parseInline(t)}</h${e}>
`;
  }
  hr(t) {
    return `<hr>
`;
  }
  list(t) {
    let e = t.ordered, r = t.start, n = "";
    for (let a = 0; a < t.items.length; a++) {
      let o = t.items[a];
      n += this.listitem(o);
    }
    let s = e ? "ol" : "ul", l = e && r !== 1 ? ' start="' + r + '"' : "";
    return "<" + s + l + `>
` + n + "</" + s + `>
`;
  }
  listitem(t) {
    return `<li>${this.parser.parse(t.tokens)}</li>
`;
  }
  checkbox({ checked: t }) {
    return "<input " + (t ? 'checked="" ' : "") + 'disabled="" type="checkbox"> ';
  }
  paragraph({ tokens: t }) {
    return `<p>${this.parser.parseInline(t)}</p>
`;
  }
  table(t) {
    let e = "", r = "";
    for (let s = 0; s < t.header.length; s++) r += this.tablecell(t.header[s]);
    e += this.tablerow({ text: r });
    let n = "";
    for (let s = 0; s < t.rows.length; s++) {
      let l = t.rows[s];
      r = "";
      for (let a = 0; a < l.length; a++) r += this.tablecell(l[a]);
      n += this.tablerow({ text: r });
    }
    return n && (n = `<tbody>${n}</tbody>`), `<table>
<thead>
` + e + `</thead>
` + n + `</table>
`;
  }
  tablerow({ text: t }) {
    return `<tr>
${t}</tr>
`;
  }
  tablecell(t) {
    let e = this.parser.parseInline(t.tokens), r = t.header ? "th" : "td";
    return (t.align ? `<${r} align="${t.align}">` : `<${r}>`) + e + `</${r}>
`;
  }
  strong({ tokens: t }) {
    return `<strong>${this.parser.parseInline(t)}</strong>`;
  }
  em({ tokens: t }) {
    return `<em>${this.parser.parseInline(t)}</em>`;
  }
  codespan({ text: t }) {
    return `<code>${$(t, !0)}</code>`;
  }
  br(t) {
    return "<br>";
  }
  del({ tokens: t }) {
    return `<del>${this.parser.parseInline(t)}</del>`;
  }
  link({ href: t, title: e, text: r, tokens: n, autolink: s }) {
    let l = s ? $(r, !0) : this.parser.parseInline(n), a = Re(t);
    if (a === null) return l;
    t = $(a, s);
    let o = '<a href="' + t + '"';
    return e && (o += ' title="' + $(e) + '"'), o += ">" + l + "</a>", o;
  }
  image({ href: t, title: e, text: r, tokens: n }) {
    n && (r = this.parser.parseInline(n, this.parser.textRenderer));
    let s = Re(t);
    if (s === null) return $(r);
    t = s;
    let l = `<img src="${$(t)}" alt="${$(r)}"`;
    return e && (l += ` title="${$(e)}"`), l += ">", l;
  }
  text(t) {
    return "tokens" in t && t.tokens ? this.parser.parseInline(t.tokens) : "escaped" in t && t.escaped ? t.text : $(t.text);
  }
}, de = class {
  constructor() {
    x(this, "parser");
  }
  strong({ text: t, tokens: e }) {
    return e ? this.parser.parseInline(e, this) : t;
  }
  em({ text: t, tokens: e }) {
    return e ? this.parser.parseInline(e, this) : t;
  }
  codespan({ text: t }) {
    return t;
  }
  del({ text: t, tokens: e }) {
    return e ? this.parser.parseInline(e, this) : t;
  }
  html({ text: t }) {
    return t;
  }
  text({ text: t }) {
    return t;
  }
  link({ text: t, tokens: e }) {
    return e ? this.parser.parseInline(e, this) : t;
  }
  image({ text: t, tokens: e }) {
    return e ? this.parser.parseInline(e, this) : t;
  }
  br() {
    return "";
  }
  checkbox({ raw: t }) {
    return t;
  }
}, A = class ae {
  constructor(e) {
    x(this, "options");
    x(this, "renderer");
    x(this, "textRenderer");
    this.options = e || q, this.options.renderer = this.options.renderer || new se(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new de(), this.textRenderer.parser = this;
  }
  static parse(e, r) {
    return new ae(r).parse(e);
  }
  static parseInline(e, r) {
    return new ae(r).parseInline(e);
  }
  parse(e) {
    var n, s;
    this.renderer.parser = this;
    let r = "";
    for (let l = 0; l < e.length; l++) {
      let a = e[l];
      if ((s = (n = this.options.extensions) == null ? void 0 : n.renderers) != null && s[a.type]) {
        let c = a, p = this.options.extensions.renderers[c.type].call({ parser: this }, c);
        if (p !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "checkbox", "html", "def", "paragraph", "text"].includes(c.type)) {
          r += p || "";
          continue;
        }
      }
      let o = a;
      switch (o.type) {
        case "space": {
          r += this.renderer.space(o);
          break;
        }
        case "hr": {
          r += this.renderer.hr(o);
          break;
        }
        case "heading": {
          r += this.renderer.heading(o);
          break;
        }
        case "code": {
          r += this.renderer.code(o);
          break;
        }
        case "table": {
          r += this.renderer.table(o);
          break;
        }
        case "blockquote": {
          r += this.renderer.blockquote(o);
          break;
        }
        case "list": {
          r += this.renderer.list(o);
          break;
        }
        case "checkbox": {
          r += this.renderer.checkbox(o);
          break;
        }
        case "html": {
          r += this.renderer.html(o);
          break;
        }
        case "def": {
          r += this.renderer.def(o);
          break;
        }
        case "paragraph": {
          r += this.renderer.paragraph(o);
          break;
        }
        case "text": {
          r += this.renderer.text(o);
          break;
        }
        default: {
          let c = 'Token with "' + o.type + '" type was not found.';
          if (this.options.silent) return console.error(c), "";
          throw new Error(c);
        }
      }
    }
    return r;
  }
  parseInline(e, r = this.renderer) {
    var s, l;
    this.renderer.parser = this;
    let n = "";
    for (let a = 0; a < e.length; a++) {
      let o = e[a];
      if ((l = (s = this.options.extensions) == null ? void 0 : s.renderers) != null && l[o.type]) {
        let p = this.options.extensions.renderers[o.type].call({ parser: this }, o);
        if (p !== !1 || !["escape", "html", "link", "image", "checkbox", "strong", "em", "codespan", "br", "del", "text"].includes(o.type)) {
          n += p || "";
          continue;
        }
      }
      let c = o;
      switch (c.type) {
        case "escape": {
          n += r.text(c);
          break;
        }
        case "html": {
          n += r.html(c);
          break;
        }
        case "link": {
          n += r.link(c);
          break;
        }
        case "image": {
          n += r.image(c);
          break;
        }
        case "checkbox": {
          n += r.checkbox(c);
          break;
        }
        case "strong": {
          n += r.strong(c);
          break;
        }
        case "em": {
          n += r.em(c);
          break;
        }
        case "codespan": {
          n += r.codespan(c);
          break;
        }
        case "br": {
          n += r.br(c);
          break;
        }
        case "del": {
          n += r.del(c);
          break;
        }
        case "text": {
          n += r.text(c);
          break;
        }
        default: {
          let p = 'Token with "' + c.type + '" type was not found.';
          if (this.options.silent) return console.error(p), "";
          throw new Error(p);
        }
      }
    }
    return n;
  }
}, te, U = (te = class {
  constructor(t) {
    x(this, "options");
    x(this, "block");
    this.options = t || q;
  }
  preprocess(t) {
    return t;
  }
  postprocess(t) {
    return t;
  }
  processAllTokens(t) {
    return t;
  }
  emStrongMask(t) {
    return t;
  }
  provideLexer(t = this.block) {
    return t ? R.lex : R.lexInline;
  }
  provideParser(t = this.block) {
    return t ? A.parse : A.parseInline;
  }
}, x(te, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"])), x(te, "passThroughHooksRespectAsync", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"])), te);
function P(t, e) {
  if (Array.isArray(e)) for (let r = 0; r < e.length; r++) t.push(e[r]);
  else t.push(e);
}
var Qe = class {
  constructor(...t) {
    x(this, "defaults", oe());
    x(this, "options", this.setOptions);
    x(this, "parse", this.parseMarkdown(!0));
    x(this, "parseInline", this.parseMarkdown(!1));
    x(this, "Parser", A);
    x(this, "Renderer", se);
    x(this, "TextRenderer", de);
    x(this, "Lexer", R);
    x(this, "Tokenizer", M);
    x(this, "Hooks", U);
    this.use(...t);
  }
  walkTokens(t, e) {
    var n, s;
    let r = [];
    for (let l of t) switch (P(r, e.call(this, l)), l.type) {
      case "table": {
        let a = l;
        for (let o of a.header) P(r, this.walkTokens(o.tokens, e));
        for (let o of a.rows) for (let c of o) P(r, this.walkTokens(c.tokens, e));
        break;
      }
      case "list": {
        let a = l;
        P(r, this.walkTokens(a.items, e));
        break;
      }
      default: {
        let a = l;
        (s = (n = this.defaults.extensions) == null ? void 0 : n.childTokens) != null && s[a.type] ? this.defaults.extensions.childTokens[a.type].forEach((o) => {
          let c = a[o].flat(1 / 0);
          P(r, this.walkTokens(c, e));
        }) : a.tokens && P(r, this.walkTokens(a.tokens, e));
      }
    }
    return r;
  }
  use(...t) {
    let e = this.defaults.extensions || { renderers: /* @__PURE__ */ Object.create(null), childTokens: /* @__PURE__ */ Object.create(null) };
    return t.forEach((r) => {
      let n = { ...r };
      if (n.async = this.defaults.async || n.async || !1, r.extensions && (r.extensions.forEach((s) => {
        if (!s.name) throw new Error("extension name required");
        if ("renderer" in s) {
          let l = e.renderers[s.name];
          l ? e.renderers[s.name] = function(...a) {
            let o = s.renderer.apply(this, a);
            return o === !1 && (o = l.apply(this, a)), o;
          } : e.renderers[s.name] = s.renderer;
        }
        if ("tokenizer" in s) {
          if (!s.level || s.level !== "block" && s.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let l = e[s.level];
          l ? l.unshift(s.tokenizer) : e[s.level] = [s.tokenizer], s.start && (s.level === "block" ? e.startBlock ? e.startBlock.push(s.start) : e.startBlock = [s.start] : s.level === "inline" && (e.startInline ? e.startInline.push(s.start) : e.startInline = [s.start]));
        }
        "childTokens" in s && s.childTokens && (e.childTokens[s.name] = s.childTokens);
      }), n.extensions = e), r.renderer) {
        let s = this.defaults.renderer || new se(this.defaults);
        for (let l in r.renderer) {
          if (!(l in s)) throw new Error(`renderer '${l}' does not exist`);
          if (["options", "parser"].includes(l)) continue;
          let a = l, o = r.renderer[a], c = s[a];
          s[a] = (...p) => {
            let i = o.apply(s, p);
            return i === !1 && (i = c.apply(s, p)), i === !1 ? "" : i ?? "";
          };
        }
        n.renderer = s;
      }
      if (r.tokenizer) {
        let s = this.defaults.tokenizer || new M(this.defaults);
        for (let l in r.tokenizer) {
          if (!(l in s)) throw new Error(`tokenizer '${l}' does not exist`);
          if (["options", "rules", "lexer"].includes(l)) continue;
          let a = l, o = r.tokenizer[a], c = s[a];
          s[a] = (...p) => {
            let i = o.apply(s, p);
            return i === !1 && (i = c.apply(s, p)), i;
          };
        }
        n.tokenizer = s;
      }
      if (r.hooks) {
        let s = this.defaults.hooks || new U();
        for (let l in r.hooks) {
          if (!(l in s)) throw new Error(`hook '${l}' does not exist`);
          if (["options", "block"].includes(l)) continue;
          let a = l, o = r.hooks[a], c = s[a];
          U.passThroughHooks.has(l) ? s[a] = (p) => {
            if (s.options.async && U.passThroughHooksRespectAsync.has(l)) return (async () => {
              let u = await o.call(s, p);
              return c.call(s, u);
            })();
            let i = o.call(s, p);
            return c.call(s, i);
          } : s[a] = (...p) => {
            if (s.options.async) return (async () => {
              let u = await o.apply(s, p);
              return u === !1 && (u = await c.apply(s, p)), u;
            })();
            let i = o.apply(s, p);
            return i === !1 && (i = c.apply(s, p)), i;
          };
        }
        n.hooks = s;
      }
      if (r.walkTokens) {
        let s = this.defaults.walkTokens, l = r.walkTokens;
        n.walkTokens = function(a) {
          let o = [];
          return P(o, l.call(this, a)), s && P(o, s.call(this, a)), o;
        };
      }
      this.defaults = { ...this.defaults, ...n };
    }), this;
  }
  setOptions(t) {
    return this.defaults = { ...this.defaults, ...t }, this;
  }
  lexer(t, e) {
    return R.lex(t, e ?? this.defaults);
  }
  parser(t, e) {
    return A.parse(t, e ?? this.defaults);
  }
  parseMarkdown(t) {
    return (e, r) => {
      let n = { ...r }, s = { ...this.defaults, ...n }, l = this.onError(!!s.silent, !!s.async);
      if (this.defaults.async === !0 && n.async === !1) return l(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof e > "u" || e === null) return l(new Error("marked(): input parameter is undefined or null"));
      if (typeof e != "string") return l(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected"));
      if (s.hooks && (s.hooks.options = s, s.hooks.block = t), s.async) return (async () => {
        let a = s.hooks ? await s.hooks.preprocess(e) : e, o = await (s.hooks ? await s.hooks.provideLexer(t) : t ? R.lex : R.lexInline)(a, s), c = s.hooks ? await s.hooks.processAllTokens(o) : o;
        s.walkTokens && await Promise.all(this.walkTokens(c, s.walkTokens));
        let p = await (s.hooks ? await s.hooks.provideParser(t) : t ? A.parse : A.parseInline)(c, s);
        return s.hooks ? await s.hooks.postprocess(p) : p;
      })().catch(l);
      try {
        s.hooks && (e = s.hooks.preprocess(e));
        let a = (s.hooks ? s.hooks.provideLexer(t) : t ? R.lex : R.lexInline)(e, s);
        s.hooks && (a = s.hooks.processAllTokens(a)), s.walkTokens && this.walkTokens(a, s.walkTokens);
        let o = (s.hooks ? s.hooks.provideParser(t) : t ? A.parse : A.parseInline)(a, s);
        return s.hooks && (o = s.hooks.postprocess(o)), o;
      } catch (a) {
        return l(a);
      }
    };
  }
  onError(t, e) {
    return (r) => {
      if (r.message += `
Please report this to https://github.com/markedjs/marked.`, t) {
        let n = "<p>An error occurred:</p><pre>" + $(r.message + "", !0) + "</pre>";
        return e ? Promise.resolve(n) : n;
      }
      if (e) return Promise.reject(r);
      throw r;
    };
  }
}, B = new Qe();
function m(t, e) {
  return B.parse(t, e);
}
m.options = m.setOptions = function(t) {
  return B.setOptions(t), m.defaults = B.defaults, ve(m.defaults), m;
};
m.getDefaults = oe;
m.defaults = q;
function sr(...t) {
  return B.use(...t), m.defaults = B.defaults, ve(m.defaults), m;
}
m.use = sr;
m.walkTokens = function(t, e) {
  return B.walkTokens(t, e);
};
m.parseInline = B.parseInline;
m.Parser = A;
m.parser = A.parse;
m.Renderer = se;
m.TextRenderer = de;
m.Lexer = R;
m.lexer = R.lex;
m.Tokenizer = M;
m.Hooks = U;
m.parse = m;
m.options;
m.setOptions;
m.walkTokens;
m.parseInline;
A.parse;
R.lex;
const lr = Fe`
  :host {
    display: block;
    /* inherit so a bubble (or any container) drives the text color; falls back
		   to --text-primary when used standalone on the page background. */
    color: inherit;
    font-size: var(--font-size-md);
    line-height: var(--line-height-normal);
    overflow-wrap: anywhere;
  }
  :host([is-hidden]) {
    display: none;
  }

  .md > :first-child {
    margin-top: 0;
  }
  .md > :last-child {
    margin-bottom: 0;
  }

  p {
    margin: 0 0 0.75em;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    position: relative;
    margin: 1.2em 0 0.5em;
    line-height: var(--line-height-tight);
    font-weight: var(--font-weight-bold);
  }
  .heading-anchor {
    margin-inline-start: 0.4em;
    font-weight: var(--font-weight-regular);
    color: var(--text-secondary);
    text-decoration: none;
    opacity: 0;
  }
  :is(h1, h2, h3, h4, h5, h6):hover .heading-anchor,
  .heading-anchor:focus-visible {
    opacity: 1;
  }
  h1 {
    font-size: 1.6em;
  }
  h2 {
    font-size: 1.35em;
  }
  h3 {
    font-size: 1.15em;
  }
  h4 {
    font-size: 1em;
  }

  a {
    color: var(--text-primary);
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  a:hover {
    text-decoration-thickness: 2px;
  }

  ul,
  ol {
    margin: 0 0 0.75em;
    padding-inline-start: 1.5em;
  }
  li {
    margin: 0.15em 0;
  }
  li > ul,
  li > ol {
    margin: 0.15em 0;
  }

  blockquote {
    margin: 0 0 0.75em;
    padding: 0.1em 0 0.1em 1em;
    border-inline-start: 3px solid var(--border-default);
    color: var(--text-secondary);
  }

  :not(pre) > code {
    font-family: var(--font-mono);
    font-size: 0.875em;
    background: color-mix(in oklch, var(--text-primary) 10%, transparent);
    padding: 0.15em 0.35em;
    border-radius: var(--radius-sm);
  }

  z-code-block {
    display: block;
    margin: var(--space-4) 0 var(--space-4) 0;
  }

  z-callout {
    margin: var(--space-8) 0 var(--space-8) 0;
  }

  hr {
    border: none;
    border-top: 1px solid var(--border-default);
    margin: 1.2em 0;
  }

  img {
    max-width: 100%;
    border-radius: var(--radius-md);
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 0 0 0.75em;
    font-size: 0.9em;
  }
  th,
  td {
    border: 1px solid var(--border-default);
    padding: 0.4em 0.6em;
    text-align: start;
  }
  th {
    background: color-mix(in oklch, var(--text-primary) 6%, transparent);
    font-weight: var(--font-weight-semibold);
  }

  strong {
    font-weight: var(--font-weight-bold);
  }
  del {
    opacity: 0.7;
  }
`, ir = new Qe({ gfm: !0, breaks: !0 }), ar = "script,style,iframe,object,embed,link,meta,base,form", or = /^(javascript:|vbscript:|data:text\/html)/i, cr = /[\u0000- \u007f-\u009f]/g, hr = /* @__PURE__ */ new Set(["href", "src", "xlink:href", "action", "formaction", "poster", "background"]), pr = /* @__PURE__ */ new Set(["srcdoc"]), ur = (t) => t.trim().toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-"), gr = (t) => {
  const e = /* @__PURE__ */ new Map();
  t.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((r) => {
    const n = ur(r.textContent ?? "") || "section", s = (e.get(n) ?? 0) + 1;
    e.set(n, s);
    const l = s === 1 ? n : `${n}-${s}`;
    r.id = l;
    const a = document.createElement("a");
    a.className = "heading-anchor", a.href = `#${l}`, a.setAttribute("aria-label", et("linkTo", { title: r.textContent ?? "" })), a.textContent = "#", r.appendChild(a);
  });
}, fr = (t) => {
  t.querySelectorAll(ar).forEach((e) => e.remove()), t.querySelectorAll("*").forEach((e) => {
    for (const r of [...e.attributes]) {
      const n = r.name.toLowerCase();
      (n.startsWith("on") || pr.has(n) || hr.has(n) && or.test(r.value.replace(cr, ""))) && e.removeAttribute(r.name);
    }
  });
}, kr = (t, e, r, n) => {
  const s = document.createElement("template");
  s.innerHTML = ir.parse(t, { async: !1 });
  const l = s.content;
  e || fr(l), n && gr(l), r || l.querySelectorAll("pre > code").forEach((o) => {
    var i, u;
    const c = (i = (o.getAttribute("class") || "").match(
      /language-([\w-]+)/
    )) == null ? void 0 : i[1], p = document.createElement("z-code-block");
    c && p.setAttribute("language", c), p.setAttribute("code", o.textContent ?? ""), (u = o.closest("pre")) == null || u.replaceWith(p);
  }), l.querySelectorAll("a[href]").forEach((o) => {
    const c = o.getAttribute("href") || "";
    /^https?:\/\//i.test(c) && (o.setAttribute("target", "_blank"), o.setAttribute("rel", "noopener noreferrer"));
  });
  const a = document.createElement("div");
  return a.appendChild(l.cloneNode(!0)), a.innerHTML;
}, dr = We(
  (t) => {
    const e = Ye(
      () => kr(
        t.content ?? "",
        !!t.doesAllowHtml,
        !!t.isPlain,
        !!t.hasHeadingAnchors
      ),
      [
        t.content,
        t.doesAllowHtml,
        !t.isPlain,
        t.hasHeadingAnchors
      ]
    ), r = Je();
    return Ke(() => {
      r.current && (r.current.innerHTML = e);
    }, [e]), /* @__PURE__ */ me("host", { shadowDom: !0, onclick: (s) => {
      var o;
      const l = s.composedPath()[0] ?? s.target, a = (o = l.closest) == null ? void 0 : o.call(l, "a");
      a && t.linkclick({ href: a.getAttribute("href") ?? "" });
    }, children: /* @__PURE__ */ me("div", { class: "md", ref: r, staticNode: !0 }) });
  },
  {
    props: {
      content: { type: String },
      isStreaming: { type: Boolean, reflect: !0 },
      doesAllowHtml: { type: Boolean, reflect: !0 },
      isPlain: { type: Boolean, reflect: !0 },
      hasHeadingAnchors: { type: Boolean, reflect: !0 },
      isHidden: { type: Boolean, reflect: !0 },
      linkclick: Xe({ bubbles: !0, composed: !0 })
    },
    styles: lr
  }
);
Ve("z-markdown", dr);
export {
  dr as ZMarkdown
};
