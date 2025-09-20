const Ci = "b1.0", Ai = {
  version: Ci
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = globalThis, Dt = ot.ShadowRoot && (ot.ShadyCSS === void 0 || ot.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, zt = Symbol(), jt = /* @__PURE__ */ new WeakMap();
let di = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== zt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (Dt && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = jt.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && jt.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ei = (t) => new di(typeof t == "string" ? t : t + "", void 0, zt), ke = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce(((s, o, n) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[n + 1]), t[0]);
  return new di(i, t, zt);
}, Si = (t, e) => {
  if (Dt) t.adoptedStyleSheets = e.map(((i) => i instanceof CSSStyleSheet ? i : i.styleSheet));
  else for (const i of e) {
    const s = document.createElement("style"), o = ot.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = i.cssText, t.appendChild(s);
  }
}, Rt = Dt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return Ei(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Oi, defineProperty: ki, getOwnPropertyDescriptor: Di, getOwnPropertyNames: zi, getOwnPropertySymbols: Hi, getPrototypeOf: Mi } = Object, me = globalThis, Ut = me.trustedTypes, Pi = Ut ? Ut.emptyScript : "", _t = me.reactiveElementPolyfillSupport, Ke = (t, e) => t, lt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Pi : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let i = t;
  switch (e) {
    case Boolean:
      i = t !== null;
      break;
    case Number:
      i = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(t);
      } catch {
        i = null;
      }
  }
  return i;
} }, Ht = (t, e) => !Oi(t, e), Ft = { attribute: !0, type: String, converter: lt, reflect: !1, useDefault: !1, hasChanged: Ht };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), me.litPropertyMetadata ?? (me.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Se = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Ft) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(e, s, i);
      o !== void 0 && ki(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: o, set: n } = Di(this.prototype, e) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: o, set(a) {
      const r = o == null ? void 0 : o.call(this);
      n == null || n.call(this, a), this.requestUpdate(e, r, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ft;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ke("elementProperties"))) return;
    const e = Mi(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ke("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ke("properties"))) {
      const i = this.properties, s = [...zi(i), ...Hi(i)];
      for (const o of s) this.createProperty(o, i[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [s, o] of i) this.elementProperties.set(s, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const o = this._$Eu(i, s);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const o of s) i.unshift(Rt(o));
    } else e !== void 0 && i.push(Rt(e));
    return i;
  }
  static _$Eu(e, i) {
    const s = i.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise(((i) => this.enableUpdating = i)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach(((i) => i(this)));
  }
  addController(e) {
    var i;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((i = e.hostConnected) == null || i.call(e));
  }
  removeController(e) {
    var i;
    (i = this._$EO) == null || i.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const s of i.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Si(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach(((i) => {
      var s;
      return (s = i.hostConnected) == null ? void 0 : s.call(i);
    }));
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach(((i) => {
      var s;
      return (s = i.hostDisconnected) == null ? void 0 : s.call(i);
    }));
  }
  attributeChangedCallback(e, i, s) {
    this._$AK(e, s);
  }
  _$ET(e, i) {
    var n;
    const s = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, s);
    if (o !== void 0 && s.reflect === !0) {
      const a = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : lt).toAttribute(i, s.type);
      this._$Em = e, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$Em = null;
    }
  }
  _$AK(e, i) {
    var n, a;
    const s = this.constructor, o = s._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const r = s.getPropertyOptions(o), c = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((n = r.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? r.converter : lt;
      this._$Em = o;
      const l = c.fromAttribute(i, r.type);
      this[o] = l ?? ((a = this._$Ej) == null ? void 0 : a.get(o)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, i, s) {
    var o;
    if (e !== void 0) {
      const n = this.constructor, a = this[e];
      if (s ?? (s = n.getPropertyOptions(e)), !((s.hasChanged ?? Ht)(a, i) || s.useDefault && s.reflect && a === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(n._$Eu(e, s)))) return;
      this.C(e, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: s, reflect: o, wrapped: n }, a) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? i ?? this[e]), n !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (i = void 0), this._$AL.set(e, i)), o === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, a] of this._$Ep) this[n] = a;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [n, a] of o) {
        const { wrapped: r } = a, c = this[n];
        r !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, a, c);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (s = this._$EO) == null || s.forEach(((o) => {
        var n;
        return (n = o.hostUpdate) == null ? void 0 : n.call(o);
      })), this.update(i)) : this._$EM();
    } catch (o) {
      throw e = !1, this._$EM(), o;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var i;
    (i = this._$EO) == null || i.forEach(((s) => {
      var o;
      return (o = s.hostUpdated) == null ? void 0 : o.call(s);
    })), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach(((i) => this._$ET(i, this[i])))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
Se.elementStyles = [], Se.shadowRootOptions = { mode: "open" }, Se[Ke("elementProperties")] = /* @__PURE__ */ new Map(), Se[Ke("finalized")] = /* @__PURE__ */ new Map(), _t == null || _t({ ReactiveElement: Se }), (me.reactiveElementVersions ?? (me.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const We = globalThis, dt = We.trustedTypes, Vt = dt ? dt.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, hi = "$lit$", ue = `lit$${Math.random().toFixed(9).slice(2)}$`, ui = "?" + ue, Li = `<${ui}>`, Ce = document, Ze = () => Ce.createComment(""), Je = (t) => t === null || typeof t != "object" && typeof t != "function", Mt = Array.isArray, Ti = (t) => Mt(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", ft = `[ 	
\f\r]`, Ve = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, qt = /-->/g, Kt = />/g, ge = RegExp(`>|${ft}(?:([^\\s"'>=/]+)(${ft}*=${ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Wt = /'/g, Gt = /"/g, mi = /^(?:script|style|textarea|title)$/i, Bi = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), $ = Bi(1), ie = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), Zt = /* @__PURE__ */ new WeakMap(), be = Ce.createTreeWalker(Ce, 129);
function pi(t, e) {
  if (!Mt(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Vt !== void 0 ? Vt.createHTML(e) : e;
}
const Ii = (t, e) => {
  const i = t.length - 1, s = [];
  let o, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = Ve;
  for (let r = 0; r < i; r++) {
    const c = t[r];
    let l, d, h = -1, _ = 0;
    for (; _ < c.length && (a.lastIndex = _, d = a.exec(c), d !== null); ) _ = a.lastIndex, a === Ve ? d[1] === "!--" ? a = qt : d[1] !== void 0 ? a = Kt : d[2] !== void 0 ? (mi.test(d[2]) && (o = RegExp("</" + d[2], "g")), a = ge) : d[3] !== void 0 && (a = ge) : a === ge ? d[0] === ">" ? (a = o ?? Ve, h = -1) : d[1] === void 0 ? h = -2 : (h = a.lastIndex - d[2].length, l = d[1], a = d[3] === void 0 ? ge : d[3] === '"' ? Gt : Wt) : a === Gt || a === Wt ? a = ge : a === qt || a === Kt ? a = Ve : (a = ge, o = void 0);
    const p = a === ge && t[r + 1].startsWith("/>") ? " " : "";
    n += a === Ve ? c + Li : h >= 0 ? (s.push(l), c.slice(0, h) + hi + c.slice(h) + ue + p) : c + ue + (h === -2 ? r : p);
  }
  return [pi(t, n + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class Xe {
  constructor({ strings: e, _$litType$: i }, s) {
    let o;
    this.parts = [];
    let n = 0, a = 0;
    const r = e.length - 1, c = this.parts, [l, d] = Ii(e, i);
    if (this.el = Xe.createElement(l, s), be.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = be.nextNode()) !== null && c.length < r; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(hi)) {
          const _ = d[a++], p = o.getAttribute(h).split(ue), v = /([.?@])?(.*)/.exec(_);
          c.push({ type: 1, index: n, name: v[2], strings: p, ctor: v[1] === "." ? ji : v[1] === "?" ? Ri : v[1] === "@" ? Ui : ut }), o.removeAttribute(h);
        } else h.startsWith(ue) && (c.push({ type: 6, index: n }), o.removeAttribute(h));
        if (mi.test(o.tagName)) {
          const h = o.textContent.split(ue), _ = h.length - 1;
          if (_ > 0) {
            o.textContent = dt ? dt.emptyScript : "";
            for (let p = 0; p < _; p++) o.append(h[p], Ze()), be.nextNode(), c.push({ type: 2, index: ++n });
            o.append(h[_], Ze());
          }
        }
      } else if (o.nodeType === 8) if (o.data === ui) c.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(ue, h + 1)) !== -1; ) c.push({ type: 7, index: n }), h += ue.length - 1;
      }
      n++;
    }
  }
  static createElement(e, i) {
    const s = Ce.createElement("template");
    return s.innerHTML = e, s;
  }
}
function Oe(t, e, i = t, s) {
  var a, r;
  if (e === ie) return e;
  let o = s !== void 0 ? (a = i._$Co) == null ? void 0 : a[s] : i._$Cl;
  const n = Je(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((r = o == null ? void 0 : o._$AO) == null || r.call(o, !1), n === void 0 ? o = void 0 : (o = new n(t), o._$AT(t, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = o : i._$Cl = o), o !== void 0 && (e = Oe(t, o._$AS(t, e.values), o, s)), e;
}
let Ni = class {
  constructor(e, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: i }, parts: s } = this._$AD, o = ((e == null ? void 0 : e.creationScope) ?? Ce).importNode(i, !0);
    be.currentNode = o;
    let n = be.nextNode(), a = 0, r = 0, c = s[0];
    for (; c !== void 0; ) {
      if (a === c.index) {
        let l;
        c.type === 2 ? l = new De(n, n.nextSibling, this, e) : c.type === 1 ? l = new c.ctor(n, c.name, c.strings, this, e) : c.type === 6 && (l = new Fi(n, this, e)), this._$AV.push(l), c = s[++r];
      }
      a !== (c == null ? void 0 : c.index) && (n = be.nextNode(), a++);
    }
    return be.currentNode = Ce, o;
  }
  p(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
};
class De {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, i, s, o) {
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = s, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = i.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, i = this) {
    e = Oe(this, e, i), Je(e) ? e === w || e == null || e === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : e !== this._$AH && e !== ie && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ti(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== w && Je(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Ce.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: i, _$litType$: s } = e, o = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = Xe.createElement(pi(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(i);
    else {
      const a = new Ni(o, this), r = a.u(this.options);
      a.p(i), this.T(r), this._$AH = a;
    }
  }
  _$AC(e) {
    let i = Zt.get(e.strings);
    return i === void 0 && Zt.set(e.strings, i = new Xe(e)), i;
  }
  k(e) {
    Mt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, o = 0;
    for (const n of e) o === i.length ? i.push(s = new De(this.O(Ze()), this.O(Ze()), this, this.options)) : s = i[o], s._$AI(n), o++;
    o < i.length && (this._$AR(s && s._$AB.nextSibling, o), i.length = o);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, i); e !== this._$AB; ) {
      const o = e.nextSibling;
      e.remove(), e = o;
    }
  }
  setConnected(e) {
    var i;
    this._$AM === void 0 && (this._$Cv = e, (i = this._$AP) == null || i.call(this, e));
  }
}
class ut {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, s, o, n) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = e, this.name = i, this._$AM = o, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = w;
  }
  _$AI(e, i = this, s, o) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) e = Oe(this, e, i, 0), a = !Je(e) || e !== this._$AH && e !== ie, a && (this._$AH = e);
    else {
      const r = e;
      let c, l;
      for (e = n[0], c = 0; c < n.length - 1; c++) l = Oe(this, r[s + c], i, c), l === ie && (l = this._$AH[c]), a || (a = !Je(l) || l !== this._$AH[c]), l === w ? e = w : e !== w && (e += (l ?? "") + n[c + 1]), this._$AH[c] = l;
    }
    a && !o && this.j(e);
  }
  j(e) {
    e === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
let ji = class extends ut {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === w ? void 0 : e;
  }
};
class Ri extends ut {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== w);
  }
}
class Ui extends ut {
  constructor(e, i, s, o, n) {
    super(e, i, s, o, n), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = Oe(this, e, i, 0) ?? w) === ie) return;
    const s = this._$AH, o = e === w && s !== w || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== w && (s === w || o);
    o && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Fi {
  constructor(e, i, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Oe(this, e);
  }
}
const Vi = { I: De }, gt = We.litHtmlPolyfillSupport;
gt == null || gt(Xe, De), (We.litHtmlVersions ?? (We.litHtmlVersions = [])).push("3.3.1");
const qi = (t, e, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? e;
  let o = s._$litPart$;
  if (o === void 0) {
    const n = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = o = new De(e.insertBefore(Ze(), n), n, void 0, i ?? {});
  }
  return o._$AI(t), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const we = globalThis;
let te = class extends Se {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var i;
    const e = super.createRenderRoot();
    return (i = this.renderOptions).renderBefore ?? (i.renderBefore = e.firstChild), e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = qi(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return ie;
  }
};
var li;
te._$litElement$ = !0, te.finalized = !0, (li = we.litElementHydrateSupport) == null || li.call(we, { LitElement: te });
const vt = we.litElementPolyfillSupport;
vt == null || vt({ LitElement: te });
(we.litElementVersions ?? (we.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const le = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer((() => {
    customElements.define(t, e);
  })) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ki = { attribute: !0, type: String, converter: lt, reflect: !1, hasChanged: Ht }, Wi = (t = Ki, e, i) => {
  const { kind: s, metadata: o } = i;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), n.set(i.name, t), s === "accessor") {
    const { name: a } = i;
    return { set(r) {
      const c = e.get.call(this);
      e.set.call(this, r), this.requestUpdate(a, c, t);
    }, init(r) {
      return r !== void 0 && this.C(a, void 0, t, r), r;
    } };
  }
  if (s === "setter") {
    const { name: a } = i;
    return function(r) {
      const c = this[a];
      e.call(this, r), this.requestUpdate(a, c, t);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function I(t) {
  return (e, i) => typeof i == "object" ? Wi(t, e, i) : ((s, o, n) => {
    const a = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, s), a ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function K(t) {
  return I({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Pt = { ATTRIBUTE: 1, CHILD: 2 }, mt = (t) => (...e) => ({ _$litDirective$: t, values: e });
let pt = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, i, s) {
    this._$Ct = e, this._$AM = i, this._$Ci = s;
  }
  _$AS(e, i) {
    return this.update(e, i);
  }
  update(e, i) {
    return this.render(...i);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ee = mt(class extends pt {
  constructor(t) {
    var e;
    if (super(t), t.type !== Pt.ATTRIBUTE || t.name !== "class" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return " " + Object.keys(t).filter(((e) => t[e])).join(" ") + " ";
  }
  update(t, [e]) {
    var s, o;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), t.strings !== void 0 && (this.nt = new Set(t.strings.join(" ").split(/\s/).filter(((n) => n !== ""))));
      for (const n in e) e[n] && !((s = this.nt) != null && s.has(n)) && this.st.add(n);
      return this.render(e);
    }
    const i = t.element.classList;
    for (const n of this.st) n in e || (i.remove(n), this.st.delete(n));
    for (const n in e) {
      const a = !!e[n];
      a === this.st.has(n) || (o = this.nt) != null && o.has(n) || (a ? (i.add(n), this.st.add(n)) : (i.remove(n), this.st.delete(n)));
    }
    return ie;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _i = "important", Gi = " !" + _i, Qe = mt(class extends pt {
  constructor(t) {
    var e;
    if (super(t), t.type !== Pt.ATTRIBUTE || t.name !== "style" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return Object.keys(t).reduce(((e, i) => {
      const s = t[i];
      return s == null ? e : e + `${i = i.includes("-") ? i : i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`;
    }), "");
  }
  update(t, [e]) {
    const { style: i } = t.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const s of this.ft) e[s] == null && (this.ft.delete(s), s.includes("-") ? i.removeProperty(s) : i[s] = null);
    for (const s in e) {
      const o = e[s];
      if (o != null) {
        this.ft.add(s);
        const n = typeof o == "string" && o.endsWith(Gi);
        s.includes("-") || n ? i.setProperty(s, n ? o.slice(0, -11) : o, n ? _i : "") : i[s] = o;
      }
    }
    return ie;
  }
});
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: Zi } = Vi, Jt = () => document.createComment(""), qe = (t, e, i) => {
  var n;
  const s = t._$AA.parentNode, o = e === void 0 ? t._$AB : e._$AA;
  if (i === void 0) {
    const a = s.insertBefore(Jt(), o), r = s.insertBefore(Jt(), o);
    i = new Zi(a, r, t, t.options);
  } else {
    const a = i._$AB.nextSibling, r = i._$AM, c = r !== t;
    if (c) {
      let l;
      (n = i._$AQ) == null || n.call(i, t), i._$AM = t, i._$AP !== void 0 && (l = t._$AU) !== r._$AU && i._$AP(l);
    }
    if (a !== o || c) {
      let l = i._$AA;
      for (; l !== a; ) {
        const d = l.nextSibling;
        s.insertBefore(l, o), l = d;
      }
    }
  }
  return i;
}, ve = (t, e, i = t) => (t._$AI(e, i), t), Ji = {}, Xi = (t, e = Ji) => t._$AH = e, Yi = (t) => t._$AH, yt = (t) => {
  t._$AR(), t._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xt = (t, e, i) => {
  const s = /* @__PURE__ */ new Map();
  for (let o = e; o <= i; o++) s.set(t[o], o);
  return s;
}, re = mt(class extends pt {
  constructor(t) {
    if (super(t), t.type !== Pt.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(t, e, i) {
    let s;
    i === void 0 ? i = e : e !== void 0 && (s = e);
    const o = [], n = [];
    let a = 0;
    for (const r of t) o[a] = s ? s(r, a) : a, n[a] = i(r, a), a++;
    return { values: n, keys: o };
  }
  render(t, e, i) {
    return this.dt(t, e, i).values;
  }
  update(t, [e, i, s]) {
    const o = Yi(t), { values: n, keys: a } = this.dt(e, i, s);
    if (!Array.isArray(o)) return this.ut = a, n;
    const r = this.ut ?? (this.ut = []), c = [];
    let l, d, h = 0, _ = o.length - 1, p = 0, v = n.length - 1;
    for (; h <= _ && p <= v; ) if (o[h] === null) h++;
    else if (o[_] === null) _--;
    else if (r[h] === a[p]) c[p] = ve(o[h], n[p]), h++, p++;
    else if (r[_] === a[v]) c[v] = ve(o[_], n[v]), _--, v--;
    else if (r[h] === a[v]) c[v] = ve(o[h], n[v]), qe(t, c[v + 1], o[h]), h++, v--;
    else if (r[_] === a[p]) c[p] = ve(o[_], n[p]), qe(t, o[h], o[_]), _--, p++;
    else if (l === void 0 && (l = Xt(a, p, v), d = Xt(r, h, _)), l.has(r[h])) if (l.has(r[_])) {
      const m = d.get(a[p]), u = m !== void 0 ? o[m] : null;
      if (u === null) {
        const x = qe(t, o[h]);
        ve(x, n[p]), c[p] = x;
      } else c[p] = ve(u, n[p]), qe(t, o[h], u), o[m] = null;
      p++;
    } else yt(o[_]), _--;
    else yt(o[h]), h++;
    for (; p <= v; ) {
      const m = qe(t, c[v + 1]);
      ve(m, n[p]), c[p++] = m;
    }
    for (; h <= _; ) {
      const m = o[h++];
      m !== null && yt(m);
    }
    return this.ut = a, Xi(t, c), ie;
  }
});
var Yt = Number.isNaN || function(e) {
  return typeof e == "number" && e !== e;
};
function Qi(t, e) {
  return !!(t === e || Yt(t) && Yt(e));
}
function es(t, e) {
  if (t.length !== e.length)
    return !1;
  for (var i = 0; i < t.length; i++)
    if (!Qi(t[i], e[i]))
      return !1;
  return !0;
}
function A(t, e) {
  e === void 0 && (e = es);
  var i = null;
  function s() {
    for (var o = [], n = 0; n < arguments.length; n++)
      o[n] = arguments[n];
    if (i && i.lastThis === this && e(o, i.lastArgs))
      return i.lastResult;
    var a = t.apply(this, o);
    return i = {
      lastResult: a,
      lastArgs: o,
      lastThis: this
    }, a;
  }
  return s.clear = function() {
    i = null;
  }, s;
}
var $e, Qt;
(function(t) {
  t.language = "language", t.system = "system", t.comma_decimal = "comma_decimal", t.decimal_comma = "decimal_comma", t.space_comma = "space_comma", t.none = "none";
})($e || ($e = {})), (function(t) {
  t.language = "language", t.system = "system", t.am_pm = "12", t.twenty_four = "24";
})(Qt || (Qt = {}));
function fi() {
  return (fi = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var i = arguments[e];
      for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && (t[s] = i[s]);
    }
    return t;
  }).apply(this, arguments);
}
function q(t) {
  return t.substr(0, t.indexOf("."));
}
var ts = function(t) {
  switch (t.number_format) {
    case $e.comma_decimal:
      return ["en-US", "en"];
    case $e.decimal_comma:
      return ["de", "es", "it"];
    case $e.space_comma:
      return ["fr", "sv", "cs"];
    case $e.system:
      return;
    default:
      return t.language;
  }
}, is = function(t, e) {
  return e === void 0 && (e = 2), Math.round(t * Math.pow(10, e)) / Math.pow(10, e);
}, ei = function(t, e, i) {
  var s = e ? ts(e) : void 0;
  if (Number.isNaN = Number.isNaN || function o(n) {
    return typeof n == "number" && o(n);
  }, (e == null ? void 0 : e.number_format) !== $e.none && !Number.isNaN(Number(t)) && Intl) try {
    return new Intl.NumberFormat(s, ti(t, i)).format(Number(t));
  } catch (o) {
    return console.error(o), new Intl.NumberFormat(void 0, ti(t, i)).format(Number(t));
  }
  return typeof t == "string" ? t : is(t, i == null ? void 0 : i.maximumFractionDigits).toString() + ((i == null ? void 0 : i.style) === "currency" ? " " + i.currency : "");
}, ti = function(t, e) {
  var i = fi({ maximumFractionDigits: 2 }, e);
  if (typeof t != "string") return i;
  if (!e || !e.minimumFractionDigits && !e.maximumFractionDigits) {
    var s = t.indexOf(".") > -1 ? t.split(".")[1].length : 0;
    i.minimumFractionDigits = s, i.maximumFractionDigits = s;
  }
  return i;
}, ss = ["closed", "locked", "off"], ht = function(t, e, i, s) {
  s = s || {}, i = i ?? {};
  var o = new Event(e, { bubbles: s.bubbles === void 0 || s.bubbles, cancelable: !!s.cancelable, composed: s.composed === void 0 || s.composed });
  return o.detail = i, t.dispatchEvent(o), o;
}, Lt = function(t, e, i) {
  var s;
  return function() {
    var o = [].slice.call(arguments), n = this, a = function() {
      s = null;
    }, r = !s;
    clearTimeout(s), s = setTimeout(a, e), r && t.apply(n, o);
  };
}, et = function(t) {
  ht(window, "haptic", t);
}, os = function(t, e, i) {
  i === void 0 && (i = !1), i ? history.replaceState(null, "", e) : history.pushState(null, "", e), ht(window, "location-changed", { replace: i });
}, ns = function(t, e, i) {
  i === void 0 && (i = !0);
  var s, o = q(e), n = o === "group" ? "homeassistant" : o;
  switch (o) {
    case "lock":
      s = i ? "unlock" : "lock";
      break;
    case "cover":
      s = i ? "open_cover" : "close_cover";
      break;
    default:
      s = i ? "turn_on" : "turn_off";
  }
  return t.callService(n, s, { entity_id: e });
}, as = function(t, e) {
  var i = ss.includes(t.states[e].state);
  return ns(t, e, i);
}, rs = function(t, e, i, s) {
  if (s || (s = { action: "more-info" }), !s.confirmation || s.confirmation.exemptions && s.confirmation.exemptions.some(function(n) {
    return n.user === e.user.id;
  }) || (et("warning"), confirm(s.confirmation.text || "Are you sure you want to " + s.action + "?"))) switch (s.action) {
    case "more-info":
      (i.entity || i.camera_image) && ht(t, "hass-more-info", { entityId: i.entity ? i.entity : i.camera_image });
      break;
    case "navigate":
      s.navigation_path && os(0, s.navigation_path);
      break;
    case "url":
      s.url_path && window.open(s.url_path);
      break;
    case "toggle":
      i.entity && (as(e, i.entity), et("success"));
      break;
    case "call-service":
      if (!s.service) return void et("failure");
      var o = s.service.split(".", 2);
      e.callService(o[0], o[1], s.service_data, s.target), et("success");
      break;
    case "fire-dom-event":
      ht(t, "ll-custom", s);
  }
}, tt = function(t, e, i, s) {
  var o;
  s === "double_tap" && i.double_tap_action ? o = i.double_tap_action : s === "hold" && i.hold_action ? o = i.hold_action : s === "tap" && i.tap_action && (o = i.tap_action), rs(t, e, i, o);
};
function U(t) {
  return t !== void 0 && t.action !== "none";
}
const cs = (t) => {
  let e = [];
  function i(o) {
    let n = [];
    for (let a = 0; a < e.length; a++)
      e[a] === o ? o = null : n.push(e[a]);
    e = n;
  }
  function s(o, n) {
    t = n ? o : Object.assign(Object.assign({}, t), o);
    let a = e;
    for (let r = 0; r < a.length; r++)
      a[r](t);
  }
  return {
    get state() {
      return t;
    },
    /**
     * Create a bound copy of the given action function.
     * The bound returned function invokes action() and persists the result back to the store.
     * If the return value of `action` is a Promise, the resolved value will be used as state.
     * @param {Function} action	An action of the form `action(state, ...args) -> stateUpdate`
     * @returns {Function} boundAction()
     */
    action(o) {
      function n(a) {
        s(a, !1);
      }
      return function() {
        let a = [t];
        for (let c = 0; c < arguments.length; c++)
          a.push(arguments[c]);
        let r = o.apply(this, a);
        if (r != null)
          return r instanceof Promise ? r.then(n) : n(r);
      };
    },
    /**
     * Apply a partial state object to the current state, invoking registered listeners.
     * @param {Object} update				An object with properties to be merged into state
     * @param {Boolean} [overwrite=false]	If `true`, update will replace state instead of being merged into it
     */
    setState: s,
    clearState() {
      t = void 0;
    },
    /**
     * Register a listener function to be called whenever state is changed. Returns an `unsubscribe()` function.
     * @param {Function} listener	A function to call when state changes. Gets passed the new state.
     * @returns {Function} unsubscribe()
     */
    subscribe(o) {
      return e.push(o), () => {
        i(o);
      };
    }
    // /**
    //  * Remove a previously-registered listener function.
    //  * @param {Function} listener	The callback previously passed to `subscribe()` that should be removed.
    //  * @function
    //  */
    // unsubscribe,
  };
}, ls = 5e3, ds = (t, e, i, s, o = { unsubGrace: !0 }) => {
  if (t[e])
    return t[e];
  let n = 0, a, r, c = cs();
  const l = () => {
    if (!i)
      throw new Error("Collection does not support refresh");
    return i(t).then((m) => c.setState(m, !0));
  }, d = () => l().catch((m) => {
    if (t.connected)
      throw m;
  }), h = () => {
    if (r !== void 0) {
      clearTimeout(r), r = void 0;
      return;
    }
    s && (a = s(t, c)), i && (t.addEventListener("ready", d), d()), t.addEventListener("disconnected", v);
  }, _ = () => {
    r = void 0, a && a.then((m) => {
      m();
    }), c.clearState(), t.removeEventListener("ready", l), t.removeEventListener("disconnected", v);
  }, p = () => {
    r = setTimeout(_, ls);
  }, v = () => {
    r && (clearTimeout(r), _());
  };
  return t[e] = {
    get state() {
      return c.state;
    },
    refresh: l,
    subscribe(m) {
      n++, n === 1 && h();
      const u = c.subscribe(m);
      return c.state !== void 0 && setTimeout(() => m(c.state), 0), () => {
        u(), n--, n || (o.unsubGrace ? p() : _());
      };
    }
  }, t[e];
}, Tt = (t, e, i, s, o) => ds(s, t, e, i).subscribe(o);
var hs = Object.defineProperty, us = (t, e, i, s) => {
  for (var o = void 0, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = a(e, i, o) || o);
  return o && hs(e, i, o), o;
};
const ms = (t) => ps(t.attributes), ps = (t, e) => !!t.unit_of_measurement || !!t.state_class || [].includes(t.device_class || ""), ii = (t, e) => t === "°" ? "" : e && t === "%" ? _s(e) : " ", _s = (t) => {
  switch (t.language) {
    case "cs":
    case "de":
    case "fi":
    case "fr":
    case "sk":
    case "sv":
      return " ";
    default:
      return "";
  }
}, fs = A(
  (t) => new Intl.Collator(t)
), gs = A(
  (t) => new Intl.Collator(t, { sensitivity: "accent" })
), gi = (t, e) => t < e ? -1 : t > e ? 1 : 0, vs = (t, e, i = void 0) => Intl != null && Intl.Collator ? fs(i).compare(t, e) : gi(t, e), vi = (t, e, i = void 0) => Intl != null && Intl.Collator ? gs(i).compare(t, e) : gi(t.toLowerCase(), e.toLowerCase());
let it;
const ys = async (t) => it || (it = t.callWS({
  type: "sensor/numeric_device_classes"
}), it), yi = (t) => t.sendMessagePromise({
  type: "config/area_registry/list"
}).then(
  (e) => e.sort((i, s) => vs(i.name, s.name))
), bs = (t, e) => t.subscribeEvents(
  Lt(
    () => yi(t).then(
      (i) => e.setState(i, !0)
    ),
    500
  ),
  "area_registry_updated"
), si = (t, e) => Tt(
  "_areaRegistry",
  yi,
  bs,
  t,
  e
), bi = (t) => t.sendMessagePromise({
  type: "config/device_registry/list"
}), $s = (t, e) => t.subscribeEvents(
  Lt(
    () => bi(t).then(
      (i) => e.setState(i, !0)
    ),
    500
  ),
  "device_registry_updated"
), ws = (t, e) => Tt(
  "_dr",
  bi,
  $s,
  t,
  e
), $i = (t) => t.sendMessagePromise({
  type: "config/entity_registry/list"
}), xs = (t, e) => t.subscribeEvents(
  Lt(
    () => $i(t).then(
      (i) => e.setState(i, !0)
    ),
    500
  ),
  "entity_registry_updated"
), Cs = (t, e) => Tt(
  "_entityRegistry",
  $i,
  xs,
  t,
  e
), As = async (t, e) => new Promise((i) => {
  const s = e(t, (o) => {
    s(), i(o);
  });
}), Es = (t) => {
  class e extends t {
    connectedCallback() {
      super.connectedCallback(), this._checkSubscribed();
    }
    disconnectedCallback() {
      if (super.disconnectedCallback(), this.__unsubs) {
        for (; this.__unsubs.length; ) {
          const s = this.__unsubs.pop();
          s instanceof Promise ? s.then((o) => o()) : s();
        }
        this.__unsubs = void 0;
      }
    }
    updated(s) {
      if (super.updated(s), s.has("hass")) {
        this._checkSubscribed();
        return;
      }
      if (this.hassSubscribeRequiredHostProps) {
        for (const o of s.keys())
          if (this.hassSubscribeRequiredHostProps.includes(o)) {
            this._checkSubscribed();
            return;
          }
      }
    }
    hassSubscribe() {
      return [];
    }
    _checkSubscribed() {
      var s;
      this.__unsubs !== void 0 || !this.isConnected || this.hass === void 0 || (s = this.hassSubscribeRequiredHostProps) != null && s.some(
        (o) => this[o] === void 0
      ) || (this.__unsubs = this.hassSubscribe());
    }
  }
  return us([
    I({ attribute: !1 })
  ], e.prototype, "hass"), e;
};
function F(t, e, i) {
  const s = new CustomEvent(e, {
    bubbles: !1,
    composed: !1,
    detail: i
  });
  t.dispatchEvent(s);
}
class Ss extends HTMLElement {
  constructor() {
    super(...arguments), this.holdTime = 500, this.held = !1, this.cancelled = !1;
  }
  connectedCallback() {
    [
      "touchcancel",
      "mouseout",
      "mouseup",
      "touchmove",
      "mousewheel",
      "wheel",
      "scroll"
    ].forEach((e) => {
      document.addEventListener(
        e,
        () => {
          this.cancelled = !0, this.timer && (clearTimeout(this.timer), this.timer = void 0);
        },
        { passive: !0 }
      );
    });
  }
  bind(e, i = {}) {
    e.actionHandler && nt(i, e.actionHandler.options) || (e.actionHandler && (e.removeEventListener("touchstart", e.actionHandler.start), e.removeEventListener("touchend", e.actionHandler.end), e.removeEventListener("touchcancel", e.actionHandler.end), e.removeEventListener("mousedown", e.actionHandler.start), e.removeEventListener("click", e.actionHandler.end), e.removeEventListener(
      "keydown",
      e.actionHandler.handleKeyDown
    )), e.actionHandler = { options: i }, !i.disabled && (e.actionHandler.start = (s) => {
      this.cancelled = !1, s.touches ? (s.touches[0].clientX, s.touches[0].clientY) : (s.clientX, s.clientY), i.hasHold && (this.held = !1, this.timer = window.setTimeout(() => {
        this.held = !0;
      }, this.holdTime));
    }, e.actionHandler.end = (s) => {
      if (s.currentTarget !== s.target || s.type === "touchcancel" || s.type === "touchend" && this.cancelled)
        return;
      const o = s.target;
      s.cancelable && s.preventDefault(), i.hasHold && (clearTimeout(this.timer), this.timer = void 0), i.hasHold && this.held ? F(o, "action", { action: "hold" }) : i.hasDoubleClick ? s.type === "click" && s.detail < 2 || !this.dblClickTimeout ? this.dblClickTimeout = window.setTimeout(() => {
        this.dblClickTimeout = void 0, F(o, "action", { action: "tap" });
      }, 250) : (clearTimeout(this.dblClickTimeout), this.dblClickTimeout = void 0, F(o, "action", { action: "double_tap" })) : F(o, "action", { action: "tap" });
    }, e.actionHandler.handleKeyDown = (s) => {
      ["Enter", " "].includes(s.key) && s.currentTarget.actionHandler.end(s);
    }, e.addEventListener("touchstart", e.actionHandler.start, {
      passive: !0
    }), e.addEventListener("touchend", e.actionHandler.end), e.addEventListener("touchcancel", e.actionHandler.end), e.addEventListener("mousedown", e.actionHandler.start, {
      passive: !0
    }), e.addEventListener("click", e.actionHandler.end), e.addEventListener("keydown", e.actionHandler.handleKeyDown)));
  }
}
customElements.define("action-handler-area-card", Ss);
const Os = () => {
  const t = document.body;
  if (t.querySelector("action-handler-area-card"))
    return t.querySelector("action-handler-area-card");
  const e = document.createElement("action-handler-area-card");
  return t.appendChild(e), e;
}, ks = (t, e) => {
  const i = Os();
  i && i.bind(t, e);
}, ne = mt(
  class extends pt {
    update(t, [e]) {
      return ks(t.element, e), ie;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    render(t) {
    }
  }
), nt = (t, e) => {
  if (t === e)
    return !0;
  if (t && e && typeof t == "object" && typeof e == "object") {
    if (t.constructor !== e.constructor)
      return !1;
    let i, s;
    if (Array.isArray(t)) {
      if (s = t.length, s !== e.length)
        return !1;
      for (i = s; i-- !== 0; )
        if (!nt(t[i], e[i]))
          return !1;
      return !0;
    }
    if (t instanceof Map && e instanceof Map) {
      if (t.size !== e.size)
        return !1;
      for (i of t.entries())
        if (!e.has(i[0]))
          return !1;
      for (i of t.entries())
        if (!nt(i[1], e.get(i[0])))
          return !1;
      return !0;
    }
    if (t instanceof Set && e instanceof Set) {
      if (t.size !== e.size)
        return !1;
      for (i of t.entries())
        if (!e.has(i[0]))
          return !1;
      return !0;
    }
    if (ArrayBuffer.isView(t) && ArrayBuffer.isView(e)) {
      if (s = t.length, s !== e.length)
        return !1;
      for (i = s; i-- !== 0; )
        if (t[i] !== e[i])
          return !1;
      return !0;
    }
    if (t.constructor === RegExp)
      return t.source === e.source && t.flags === e.flags;
    if (t.valueOf !== Object.prototype.valueOf)
      return t.valueOf() === e.valueOf();
    if (t.toString !== Object.prototype.toString)
      return t.toString() === e.toString();
    const o = Object.keys(t);
    if (s = o.length, s !== Object.keys(e).length)
      return !1;
    for (i = s; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(e, o[i]))
        return !1;
    for (i = s; i-- !== 0; ) {
      const n = o[i];
      if (!nt(t[n], e[n]))
        return !1;
    }
    return !0;
  }
  return t !== t && e !== e;
}, st = (t) => {
  const e = parseFloat(t);
  if (isNaN(e))
    throw new Error(`${t} is not a number`);
  return e;
};
function oi(t) {
  if (!t)
    return null;
  try {
    if (t.endsWith("%"))
      return { w: 100, h: st(t.substr(0, t.length - 1)) };
    const e = t.replace(":", "x").split("x");
    return e.length === 0 ? null : e.length === 1 ? { w: st(e[0]), h: 1 } : { w: st(e[0]), h: st(e[1]) };
  } catch {
  }
  return null;
}
const Ds = (t, e, i, s, o) => {
  var h, _, p, v, m;
  const n = i || void 0, a = (e == null ? void 0 : e.darkMode) || !1;
  t.__themes || (t.__themes = { cacheKey: null, keys: /* @__PURE__ */ new Set() });
  let r = n || "", c = {};
  if (n === "default" && ((h = t.__themes) == null ? void 0 : h.cacheKey) === "default")
    return;
  if (n && n !== "default" && ((_ = e == null ? void 0 : e.themes) != null && _[n])) {
    const { modes: u, ...x } = e.themes[n] || {};
    c = { ...c, ...x }, u && (a && u.dark ? c = { ...c, ...u.dark } : !a && u.light && (c = { ...c, ...u.light }));
  } else if (!n && (!((p = t.__themes) != null && p.keys) || t.__themes.keys.size === 0))
    return;
  const l = ((v = t.__themes) == null ? void 0 : v.keys) || /* @__PURE__ */ new Set(), d = new Set(Object.keys(c));
  if (n === "default" && d.size === 0) {
    for (const u of l)
      try {
        t.style.removeProperty(`--${u}`);
      } catch {
      }
    t.__themes = { cacheKey: "default", keys: /* @__PURE__ */ new Set() };
    return;
  }
  if (((m = t.__themes) == null ? void 0 : m.cacheKey) === r) {
    let u = !0;
    if (l.size !== d.size)
      u = !1;
    else
      for (const x of l)
        if (!d.has(x)) {
          u = !1;
          break;
        }
    if (u) return;
  }
  for (const u of l)
    if (!d.has(u))
      try {
        t.style.removeProperty(`--${u}`);
      } catch {
      }
  for (const [u, x] of Object.entries(c))
    t.style.setProperty(`--${u}`, String(x));
  t.__themes.cacheKey = r || null, t.__themes.keys = d;
};
function ni(t, e) {
  var i, s;
  return ((s = (i = t == null ? void 0 : t[e]) == null ? void 0 : i.attributes) == null ? void 0 : s.friendly_name) || e;
}
function ai(t, e) {
  return (i, s) => vi(
    ni(t, i),
    ni(t, s),
    e
  );
}
const ye = ["unavailable", "unknown"], ae = [
  "closed",
  "locked",
  "off",
  "docked",
  "idle",
  "standby",
  "paused",
  "auto",
  "not_home",
  "disarmed"
], at = ["sensor"], rt = ["binary_sensor"], ct = ["cover"], $t = ["climate"], Ge = [
  "light",
  "switch",
  "fan",
  "media_player",
  "lock",
  "vacuum",
  "cover",
  "script",
  "scene"
], zs = ["camera"], wt = [
  "alarm_control_panel",
  "siren",
  "light",
  "switch",
  "media_player",
  "climate",
  "air_quality",
  "humdifier",
  "vacuum",
  "lawn_mower",
  "cover",
  "lock",
  "camera",
  "fan",
  "valve",
  "water_heater",
  "person",
  "calendar",
  "remote",
  "scene",
  "device_tracker",
  "update",
  "notifications",
  "binary_sensor",
  "sensor",
  "script",
  "tags",
  "select",
  "automation",
  "button",
  "number",
  "conversation",
  "assist_satellite",
  "counter",
  "event",
  "group",
  "image",
  "image_processing",
  "input_boolean",
  "input_datetime",
  "input_number",
  "input_select",
  "input_text",
  "stt",
  "sun",
  "text",
  "date",
  "datetime",
  "time",
  "timer",
  "todo",
  "tts",
  "wake_word",
  "weather",
  "zone",
  "geo_location"
], xt = {
  sensor: ["temperature", "humidity"],
  binary_sensor: ["motion", "window"],
  cover: ["garage"]
}, Ct = {
  light: { on: "mdi:lightbulb-multiple", off: "mdi:lightbulb-multiple-off" },
  switch: { on: "mdi:toggle-switch", off: "mdi:toggle-switch-off" },
  fan: { on: "mdi:fan", off: "mdi:fan-off" },
  climate: { on: "mdi:thermostat", off: "mdi:thermostat-cog" },
  media_player: { on: "mdi:cast", off: "mdi:cast-off" },
  lock: { on: "mdi:lock-open", off: "mdi:lock" },
  vacuum: { on: "mdi:robot-vacuum", off: "mdi:robot-vacuum-off" },
  button: { on: "mdi:gesture-tap-button", off: "mdi:gesture-tap-button" },
  device_tracker: { on: "mdi:account", off: "mdi:account-off" },
  person: { on: "mdi:account", off: "mdi:account-off" },
  alarm_control_panel: { on: "mdi:alarm-light", off: "mdi:alarm-light-off" },
  siren: { on: "mdi:bell-ring", off: "mdi:bell_off" },
  vacuum_cleaner: { on: "mdi:robot-vacuum", off: "mdi:robot-vacuum-off" },
  lawn_mower: { on: "robot-mower", off: "mdi:robot-mower" },
  calendar: { on: "mdi:calendar", off: "mdi:calendar-remove" },
  counter: { on: "mdi:counter", off: "mdi:counter" },
  timer: { on: "mdi:timer-outline", off: "mdi:timer-off" },
  input_boolean: { on: "mdi:toggle-switch", off: "mdi:toggle-switch-off" },
  input_select: {
    on: "mdi:format-list-bulleted",
    off: "mdi:format-list-bulleted"
  },
  input_text: { on: "mdi:text-box", off: "mdi:text-box" },
  update: { on: "mdi:autorenew", off: "mdi:autorenew-off" },
  remote: { on: "mdi:remote", off: "mdi:remote-off" },
  water_heater: { on: "mdi:water-boiler", off: "mdi:water-pump-off" },
  valve: { on: "mdi:valve", off: "mdi:valve-closed" },
  sensor: { on: "mdi:gauge", off: "mdi:gauge" },
  number: { on: "mdi:numeric", off: "mdi:numeric" },
  script: { on: "mdi:script-text", off: "mdi:script-text" },
  scene: { on: "mdi:movie", off: "mdi:movie-off" },
  select: { on: "mdi:format-list-bulleted", off: "mdi:format-list-bulleted" },
  air_quality: { on: "mdi:air-filter", off: "mdi:air-filter" },
  humidifier: { on: "mdi:air-humidifier", off: "mdi:air-humidifier-off" },
  geo_location: { on: "mdi:map-marker", off: "mdi:map-marker-off" },
  camera: { on: "mdi:camera", off: "mdi:camera-off" },
  weather: { on: "mdi:weather-partly-cloudy", off: "mdi:weather-night" },
  automation: { on: "mdi:robot", off: "mdi:robot-off" },
  notifications: { on: "mdi:bell", off: "mdi:bell-off" },
  tags: { on: "mdi:tag-multiple", off: "mdi:tag-multiple" },
  conversation: { on: "mdi:comment-multiple", off: "mdi:comment-multiple" },
  assist_satellite: {
    on: "mdi:satellite-variant",
    off: "mdi:satellite-variant"
  },
  event: { on: "mdi:calendar-star", off: "mdi:calendar-star" },
  group: {
    on: "mdi:google-circles-communities",
    off: "mdi:google-circles-communities"
  },
  image: { on: "mdi:image", off: "mdi:image-off" },
  image_processing: {
    on: "mdi:image-filter-center-focus",
    off: "mdi:image-filter-center-focus"
  },
  input_datetime: { on: "mdi:calendar-clock", off: "mdi:calendar-clock" },
  input_number: { on: "mdi:numeric", off: "mdi:numeric" },
  stt: { on: "mdi:record-rec", off: "mdi:record" },
  sun: { on: "mdi:weather-sunny", off: "mdi:weather-night" },
  text: { on: "mdi:text-box", off: "mdi:text-box" },
  date: { on: "mdi:calendar", off: "mdi:calendar-remove" },
  datetime: { on: "mdi:calendar-clock", off: "mdi:calendar-clock" },
  time: { on: "mdi:clock-outline", off: "mdi:clock-off" },
  todo: {
    on: "mdi:check-circle-outline",
    off: "mdi:checkbox-blank-circle-outline"
  },
  tts: { on: "mdi:volume-high", off: "mdi:volume-off" },
  wake_word: { on: "mdi:microphone", off: "mdi:microphone-off" },
  zone: { on: "mdi:map-marker", off: "mdi:map-marker-off" },
  binary_sensor: {
    on: "mdi:power-off",
    off: "mdi:power-off",
    motion: { on: "mdi:motion-sensor", off: "mdi:motion-sensor-off" },
    moisture: { on: "mdi:water-alert", off: "mdi:water-off" },
    window: { on: "mdi:window-open", off: "mdi:window-closed" },
    door: { on: "mdi:door-open", off: "mdi:door-closed" },
    lock: { on: "mdi:lock-open", off: "mdi:lock" },
    presence: { on: "mdi:home-outline", off: "mdi:home-export-outline" },
    occupancy: { on: "mdi:seat", off: "mdi:seat-outline" },
    vibration: { on: "mdi:vibrate", off: "mdi:vibrate-off" },
    opening: { on: "mdi:shield-lock-open", off: "mdi:shield-lock" },
    garage_door: { on: "mdi:garage-open", off: "mdi:garage" },
    problem: {
      on: "mdi:alert-circle-outline",
      off: "mdi:alert-circle-check-outline"
    },
    smoke: {
      on: "mdi:smoke-detector-outline",
      off: "mdi:smoke-detector-off-outline"
    },
    running: { on: "mdi:play", off: "mdi:pause" },
    plug: { on: "mdi:power-plug", off: "mdi:power-plug-off" },
    power: { on: "mdi:power", off: "mdi:power-off" },
    battery: { on: "mdi:battery-alert", off: "mdi:battery" },
    battery_charging: { on: "mdi:battery-charging", off: "mdi:battery-check" },
    gas: { on: "mdi:gas-station-outline", off: "mdi:gas-station-off-outline" },
    carbon_monoxide: { on: "mdi:molecule-co", off: "mdi:molecule-co" },
    cold: { on: "mdi:snowflake", off: "mdi:snowflake-off" },
    heat: { on: "mdi:weather-sunny", off: "mdi:weather-sunny-off" },
    connectivity: { on: "mdi:connection", off: "mdi:connection" },
    safety: { on: "mdi:shield-alert-outline", off: "mdi:shield-check-outline" },
    sound: { on: "mdi:volume-high", off: "mdi:volume-off" },
    update: { on: "mdi:autorenew", off: "mdi:autorenew-off" },
    tamper: { on: "mdi:shield-home", off: "mdi:shield-home" },
    light: { on: "mdi:lightbulb-outline", off: "mdi:lightbulb-off-outline" },
    moving: { on: "mdi:car", off: "mdi:car-off" }
  },
  cover: {
    on: "mdi:garage-open",
    off: "mdi:garage",
    garage: { on: "mdi:garage-open", off: "mdi:garage" },
    door: { on: "mdi:door-open", off: "mdi:door-closed" },
    gate: { on: "mdi:gate-open", off: "mdi:gate" },
    blind: { on: "mdi:blinds-open", off: "mdi:blinds" },
    curtain: { on: "mdi:curtains", off: "mdi:curtains-closed" },
    damper: { on: "mdi:valve-open", off: "mdi:valve-closed" },
    awning: { on: "mdi:awning-outline", off: "mdi:awning-outline" },
    shutter: { on: "mdi:window-shutter-open", off: "mdi:window-shutter" },
    shade: { on: "mdi:roller-shade", off: "mdi:roller-shade-closed" },
    window: { on: "mdi:window-open", off: "mdi:window-closed" }
  }
}, Hs = "16:5";
var Ms = "M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z", Ps = "M4 20H16V22H4C2.9 22 2 21.1 2 20V7H4M22 4V16C22 17.1 21.1 18 20 18H8C6.9 18 6 17.1 6 16V4C6 2.9 6.9 2 8 2H20C21.1 2 22 2.9 22 4M12 8H10V14H12M15 6H13V14H15M18 11H16V14H18Z", Bt = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z", Ls = "M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15Z", ri = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z", bt = "M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z", Ts = "M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12M8,15H16V17H8V15M16,18V20H8V18H16Z", Bs = "M13 5C15.21 5 17 6.79 17 9C17 10.5 16.2 11.77 15 12.46V11.24C15.61 10.69 16 9.89 16 9C16 7.34 14.66 6 13 6S10 7.34 10 9C10 9.89 10.39 10.69 11 11.24V12.46C9.8 11.77 9 10.5 9 9C9 6.79 10.79 5 13 5M20 20.5C19.97 21.32 19.32 21.97 18.5 22H13C12.62 22 12.26 21.85 12 21.57L8 17.37L8.74 16.6C8.93 16.39 9.2 16.28 9.5 16.28H9.7L12 18V9C12 8.45 12.45 8 13 8S14 8.45 14 9V13.47L15.21 13.6L19.15 15.79C19.68 16.03 20 16.56 20 17.14V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.11 2.9 14 4 14H8V12L4 12L4 4H20L20 12H18V14H20V13.96L20.04 14C21.13 14 22 13.09 22 12V4C22 2.9 21.11 2 20 2Z", wi = "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z", Is = "M2,5V19H8V5H2M9,5V10H15V5H9M16,5V14H22V5H16M9,11V19H15V11H9M16,15V19H22V15H16Z";
function ci(t, e, i) {
  return t.localize(
    `component.${i}.entity_component._.state.${e}`
  ) || e;
}
function xi(t, e) {
  switch (e.name) {
    case "theme":
      return `${t.localize(
        "ui.panel.lovelace.editor.card.generic.theme"
      )} (${t.localize("ui.panel.lovelace.editor.card.config.optional")})`;
    case "area":
      return t.localize("ui.panel.lovelace.editor.card.area.name");
    case "navigation_path":
      return t.localize(
        "ui.panel.lovelace.editor.action-editor.navigation_path"
      );
    case "area_name":
      return t.localize("ui.panel.lovelace.editor.card.area.name") + " " + t.localize("ui.panel.lovelace.editor.card.generic.name");
    case "area_icon":
      return t.localize("ui.panel.lovelace.editor.card.area.name") + " " + t.localize("ui.panel.lovelace.editor.card.generic.icon");
    case "area_name_color":
      return t.localize("ui.panel.lovelace.editor.card.area.name") + " " + t.localize("ui.panel.lovelace.editor.card.generic.name") + " " + t.localize("ui.panel.lovelace.editor.card.tile.color");
    case "area_icon_color":
      return t.localize("ui.panel.lovelace.editor.card.area.name") + " " + t.localize("ui.panel.lovelace.editor.card.generic.icon") + " " + t.localize("ui.panel.lovelace.editor.card.tile.color");
    case "v2_color":
      return t.localize("ui.panel.lovelace.editor.card.tile.color");
    case "css":
      return "CSS";
    case "domain_css":
      return "Domain CSS";
    case "cover_css":
      return "Cover CSS";
    case "alert_css":
      return "Alert CSS";
    case "icon_css":
      return "Icon CSS";
    case "name_css":
      return "Name CSS";
    case "mirrored":
      return "Mirror Card Layout";
    case "alert_color":
    case "sensor_color":
    case "domain_color":
      return t.localize("ui.panel.lovelace.editor.card.tile.color");
    case "columns":
      return t.localize("ui.components.grid-size-picker.columns");
    case "appearance":
      return t.localize("ui.panel.lovelace.editor.card.tile.appearance") || "Appearance";
    case "toggle_domains":
      return t.localize("ui.panel.lovelace.editor.cardpicker.domain");
    case "popup":
      return "Popup";
    case "popup_domains":
      return "Popup " + t.localize("ui.panel.lovelace.editor.cardpicker.domain");
    case "extra_entities":
      return t.localize("ui.common.add") + " " + t.localize("ui.panel.lovelace.editor.card.generic.entities") + ":";
    case "hidden_entities":
      return t.localize("ui.common.hide") + " " + t.localize("ui.panel.lovelace.editor.card.generic.entities") + ":";
    case "hide_unavailable":
      return t.localize("ui.common.hide") + " " + t.localize("state.default.unavailable");
    case "show_active":
      return t.localize("ui.common.hide") + " " + t.localize("ui.components.entity.entity-state-picker.state") + " " + t.localize("component.binary_sensor.entity_component._.state.off");
    case "edit_filters":
      return t.localize("ui.panel.lovelace.editor.common.edit") + " " + t.localize("ui.components.subpage-data-table.filters");
    case "label_filter":
      return t.localize("ui.components.label-picker.label") + " " + t.localize("ui.components.related-filter-menu.filter");
    case "cover_classes":
      return t.localize("component.cover.entity_component._.name");
    case "label":
      return t.localize("ui.components.label-picker.label");
    case "show_sensor_icons":
      return t.localize("ui.panel.lovelace.editor.card.generic.show_icon");
    case "wrap_sensor_icons":
      return t.localize(
        "ui.panel.lovelace.editor.edit_view_header.settings.badges_wrap_options.wrap"
      ) + " " + t.localize("ui.panel.lovelace.editor.card.sensor.name");
    case "category_filter":
      return t.localize("ui.components.category-picker.category") + " " + t.localize("ui.components.related-filter-menu.filter");
    case "name":
      return t.localize("ui.common.name");
    case "state":
      return t.localize("ui.components.entity.entity-state-picker.state");
    case "ungroup_areas":
      return t.localize("ui.common.disable") + " " + t.localize("ui.panel.lovelace.editor.card.area.name") + " " + t.localize("component.group.entity_component._.name");
    case "popup_sort":
      return "Popup Sort";
    case "show_icon":
    case "tap_action":
    case "hold_action":
    case "double_tap_action":
    case "camera_view":
      return t.localize(
        `ui.panel.lovelace.editor.card.generic.${e.name}`
      );
    default:
      return t.localize(
        `ui.panel.lovelace.editor.card.area.${e.name}`
      );
  }
}
var Ns = Object.defineProperty, pe = (t, e, i, s) => {
  for (var o = void 0, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = a(e, i, o) || o);
  return o && Ns(e, i, o), o;
};
const js = /* @__PURE__ */ new Set([
  "off",
  "idle",
  "not_home",
  "closed",
  "locked",
  "standby",
  "disarmed",
  "unknown",
  "unavailable"
]);
var xe;
const de = (xe = class extends te {
  constructor() {
    super(...arguments), this.open = !1, this.content = "", this.entities = [], this._cardEls = /* @__PURE__ */ new Map(), this._onClosed = (e) => {
      this.open = !1, this._cardEls.clear(), this.dispatchEvent(
        new CustomEvent("dialog-closed", {
          bubbles: !0,
          composed: !0,
          detail: { dialog: this }
        })
      ), this.dispatchEvent(
        new CustomEvent("popup-closed", {
          bubbles: !0,
          composed: !0,
          detail: { dialog: this }
        })
      );
    }, this.DOMAIN_FEATURES = {
      alarm_control_panel: {
        state_content: ["state", "last_changed"],
        features: [
          {
            type: "alarm-modes",
            modes: [
              "armed_home",
              "armed_away",
              "armed_night",
              "armed_vacation",
              "armed_custom_bypass",
              "disarmed"
            ]
          }
        ]
      },
      light: {
        state_content: ["state", "brightness", "last_changed"],
        features: [{ type: "light-brightness" }]
      },
      cover: {
        state_content: ["state", "position", "last_changed"],
        features: [{ type: "cover-open-close" }, { type: "cover-position" }]
      },
      vacuum: {
        state_content: ["state", "last_changed"],
        features: [
          {
            type: "vacuum-commands",
            commands: [
              "start_pause",
              "stop",
              "clean_spot",
              "locate",
              "return_home"
            ]
          }
        ]
      },
      climate: {
        state_content: ["state", "current_temperature", "last_changed"],
        features: [
          {
            type: "climate-hvac-modes",
            hvac_modes: [
              "auto",
              "heat_cool",
              "heat",
              "cool",
              "dry",
              "fan_only",
              "off"
            ]
          }
        ]
      },
      water_heater: {
        state_content: ["state", "last_changed"],
        features: [
          {
            type: "water-heater-operation-modes",
            operation_modes: [
              "electric",
              "gas",
              "heat_pump",
              "eco",
              "performance",
              "high_demand",
              "off"
            ]
          }
        ]
      },
      humidifier: {
        state_content: ["state", "current_humidity", "last_changed"],
        features: [{ type: "target-humidity" }]
      },
      media_player: {
        show_entity_picture: !0,
        state_content: ["state", "volume_level", "last_changed"],
        features: [{ type: "media-player-playback" }]
      },
      lock: {
        state_content: ["state", "last_changed"],
        features: [{ type: "lock-commands" }]
      },
      fan: {
        state_content: ["state", "percentage", "last_changed"],
        features: [{ type: "fan-speed" }]
      },
      counter: {
        state_content: ["state", "last_changed"],
        features: [
          {
            type: "counter-actions",
            actions: ["increment", "decrement", "reset"]
          }
        ]
      },
      lawn_mower: {
        state_content: ["state", "last_changed"],
        features: [
          {
            type: "lawn-mower-commands",
            commands: ["start_pause", "dock"]
          }
        ]
      },
      update: {
        state_content: ["state", "latest_version", "last_changed"],
        features: [{ type: "update-actions", backup: "ask" }]
      },
      switch: {
        state_content: ["state", "last_changed"],
        features: [{ type: "toggle" }]
      },
      scene: {
        state_content: ["state", "last_changed"],
        features: [{ type: "button" }]
      },
      script: {
        state_content: ["state", "last_changed"],
        features: [{ type: "button" }]
      },
      input_boolean: {
        state_content: ["state", "last_changed"],
        features: [{ type: "toggle" }]
      },
      calendar: {
        state_content: "message"
      },
      timer: {
        state_content: ["state", "remaining_time"]
      },
      binary_sensor: {
        state_content: ["state", "last_changed"]
      },
      device_tracker: {
        state_content: ["state", "last_changed"]
      },
      remote: {
        state_content: ["state", "last_changed"]
      },
      valve: {
        state_content: ["state", "last_changed"],
        features: [{ type: "valve-open-close" }]
      }
    }, this.computeLabel = A(
      (e, i, s) => xi(this.hass, e)
    );
  }
  showDialog(e) {
    this.title = e.title ?? this.title, this.hass = e.hass, this.entities = e.entities ?? [], e.content !== void 0 && (this.content = e.content), this.selectedDomain = e.selectedDomain, this.selectedDeviceClass = e.selectedDeviceClass, this.selectedGroup = e.selectedGroup, this.card = e.card, this._cardEls.clear(), this.open = !0, this.requestUpdate();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cardEls.clear();
  }
  _toTileConfig(e) {
    return {
      type: "tile",
      entity: e.entity
    };
  }
  async _createCardElement(e, i, s = !1) {
    var o, n, a;
    try {
      const r = await ((o = window == null ? void 0 : window.loadCardHelpers) == null ? void 0 : o.call(window));
      if (r != null && r.createCardElement) {
        const c = r.createCardElement(i);
        return c.hass = e, (n = c.setAttribute) == null || n.call(c, "data-hui-card", ""), c;
      }
    } catch {
    }
    try {
      const r = i.type || "tile", c = typeof r == "string" && r.startsWith("custom:"), l = c ? r.slice(7) : `hui-${r}-card`;
      c && !customElements.get(l) && await customElements.whenDefined(l).catch(() => {
      });
      const d = document.createElement(l);
      return typeof d.setConfig == "function" && d.setConfig(i), d.hass = e, (a = d.setAttribute) == null || a.call(d, "data-hui-card", ""), d;
    } catch {
      if (!s)
        return this._createCardElement(
          e,
          this._toTileConfig(i),
          !0
        );
      const r = document.createElement("div");
      return r.setAttribute("data-hui-card", ""), r;
    }
  }
  _getPopupCardConfig(e) {
    var p, v, m, u, x, N, E, C, M, W, G;
    const i = this.card, s = q(e.entity_id), o = this.selectedDomain || s, n = this.selectedDomain ? this.selectedDeviceClass : (u = (m = (v = (p = this.hass) == null ? void 0 : p.states) == null ? void 0 : v[e.entity_id]) == null ? void 0 : m.attributes) == null ? void 0 : u.device_class, a = (i == null ? void 0 : i._config) || {};
    let r;
    rt.includes(o) ? (r = (x = a.customization_alert) == null ? void 0 : x.find(
      (D) => D.type === n
    ), r || (r = (N = a.customization_domain) == null ? void 0 : N.find(
      (D) => D.type === o
    ))) : at.includes(o) ? (r = (E = a.customization_sensor) == null ? void 0 : E.find(
      (D) => D.type === n
    ), r || (r = (C = a.customization_domain) == null ? void 0 : C.find(
      (D) => D.type === o
    ))) : ct.includes(o) ? (r = (M = a.customization_cover) == null ? void 0 : M.find(
      (D) => D.type === n
    ), r || (r = (W = a.customization_domain) == null ? void 0 : W.find(
      (D) => D.type === o
    ))) : r = (G = a.customization_domain) == null ? void 0 : G.find(
      (D) => D.type === o
    );
    const c = r == null ? void 0 : r.popup_card, l = c && typeof c.type == "string" && c.type || (r == null ? void 0 : r.popup_card_type) || "tile", d = l === "tile" ? this.DOMAIN_FEATURES[s] ?? {} : {};
    let h = {};
    if (c && typeof c == "object") {
      const { type: D, entity: J, ...fe } = c;
      h = fe;
    } else
      h = (r == null ? void 0 : r.popup_card_options) ?? {};
    return {
      type: l,
      entity: e.entity_id,
      ...d,
      ...h
    };
  }
  shouldUpdate(e) {
    return this.open ? !0 : e.has("open");
  }
  _getOrCreateCard(e) {
    const i = e.entity_id, s = this._cardEls.get(i);
    if (s) {
      try {
        s.hass = this.hass;
      } catch {
      }
      return s;
    }
    const o = document.createElement("div");
    o.classList.add("card-placeholder"), o.setAttribute("data-hui-card", ""), this._cardEls.set(i, o);
    const n = this._getPopupCardConfig(e);
    return this._createCardElement(this.hass, n).then((a) => {
      try {
        this._cardEls.get(i) === o && (o.replaceWith(a), this._cardEls.set(i, a)), a.hass = this.hass;
      } catch {
      }
    }), o;
  }
  _isActive(e) {
    return !js.has(e.state);
  }
  sortEntitiesForPopup(e) {
    var n, a;
    const i = ((a = (n = this.card) == null ? void 0 : n._config) == null ? void 0 : a.popup_sort) || "name", s = e.slice();
    if (i === "state") {
      const r = ai(
        this.hass.states,
        this.hass.locale.language
      );
      return s.sort((c, l) => {
        const d = this._isActive(c) ? 0 : 1, h = this._isActive(l) ? 0 : 1;
        if (d !== h) return d - h;
        const _ = q(c.entity_id), p = q(l.entity_id), v = this.hass ? ci(this.hass, c.state, _) : c.state, m = this.hass ? ci(this.hass, l.state, p) : l.state, u = (v || "").localeCompare(m || "");
        return u !== 0 ? u : r(c.entity_id, l.entity_id);
      });
    }
    const o = ai(
      this.hass.states,
      this.hass.locale.language
    );
    return s.sort((r, c) => o(r.entity_id, c.entity_id));
  }
  render() {
    var W, G, D, J, fe, He, Me, Pe, Le, Te, Be, Ie, Ne;
    if (!this.open || !this.hass || !this.card) return $``;
    const e = this.card, i = (W = e._config) == null ? void 0 : W.area, s = ((G = e._devicesInArea) == null ? void 0 : G.call(e, i, e._devices)) ?? /* @__PURE__ */ new Set(), o = e._entities || [], n = this.hass.states, a = ((D = e._config) == null ? void 0 : D.popup_domains) || [], r = ((J = e._config) == null ? void 0 : J.hidden_entities) || [], c = ((fe = e._config) == null ? void 0 : fe.extra_entities) || [], l = (He = e._config) == null ? void 0 : He.label, d = (Me = e._config) == null ? void 0 : Me.hide_unavailable, h = (Pe = e._config) == null ? void 0 : Pe.category_filter, _ = this.selectedDomain || null, p = this.selectedDeviceClass || null, v = (S) => {
      if (!h) return !0;
      const z = o.find(
        (L) => L.entity_id === S
      ), P = z == null ? void 0 : z.entity_category;
      return P ? h === "config" ? P !== "config" : h === "diagnostic" ? P !== "diagnostic" : h === "config+diagnostic" ? P !== "config" && P !== "diagnostic" : !0 : !0;
    }, m = o.reduce(
      (S, z) => {
        var P;
        if (!z.hidden_by && (z.area_id ? z.area_id === i : z.device_id && s.has(z.device_id)) && (!l || z.labels && z.labels.some(
          (L) => l.includes(L)
        ))) {
          const L = z.entity_id;
          !r.includes(L) && v(L) && (!d || !ye.includes((P = n[L]) == null ? void 0 : P.state)) && S.push(L);
        }
        return S;
      },
      []
    );
    let u = [];
    for (const S of m) {
      const z = q(S);
      if (a.length > 0 && !a.includes(z)) continue;
      const P = n[S];
      P && (_ && z !== _ || p && P.attributes.device_class !== p || u.push(P));
    }
    for (const S of c) {
      const z = q(S), P = n[S];
      P && (a.length > 0 && !a.includes(z) || _ && z !== _ || p && P.attributes.device_class !== p || v(S) && !u.some((L) => L.entity_id === S) && u.push(P));
    }
    const x = ((Le = e == null ? void 0 : e._config) == null ? void 0 : Le.ungroup_areas) === !0;
    let N = (Te = e._config) != null && Te.columns ? e._config.columns : 4, E = [], C = [];
    if (x)
      C = this.sortEntitiesForPopup(u), N = Math.min(N, Math.max(1, C.length));
    else {
      const S = {};
      for (const L of u) {
        const Q = q(L.entity_id);
        Q in S || (S[Q] = []), S[Q].push(L);
      }
      const z = a.length > 0 ? a : wt;
      E = Object.entries(S).filter(([L]) => !_ || L === _).sort(([L], [Q]) => {
        const je = z.indexOf(L), Re = z.indexOf(Q);
        return (je === -1 ? z.length : je) - (Re === -1 ? z.length : Re);
      }).map(
        ([L, Q]) => [L, this.sortEntitiesForPopup(Q)]
      );
      const P = E.length ? Math.max(...E.map(([, L]) => L.length)) : 0;
      N = Math.min(N, Math.max(1, P));
    }
    const M = ((Ie = e._area) == null ? void 0 : Ie.call(e, (Be = e._config) == null ? void 0 : Be.area, e._areas)) ?? null;
    return $`
      <ha-dialog
        hideActions
        id="more-info-dialog"
        style="--columns: ${N};"
        .open=${this.open}
        @closed=${this._onClosed}
      >
        <style>
          ${xe.styles}
        </style>
        <div class="dialog-header">
          <ha-icon-button
            slot="navigationIcon"
            .path=${Bt}
            @click=${this._onClosed}
            .label=${this.hass.localize("ui.common.close")}
          ></ha-icon-button>
          <div slot="title">
            <h3>${((Ne = e._config) == null ? void 0 : Ne.area_name) || M && M.name}</h3>
          </div>
        </div>

        <div class="dialog-content">
          ${x ? $`
                <div class="entity-cards">
                  ${C.map(
      (S) => $`
                      <div class="entity-card">
                        ${this._getOrCreateCard(S)}
                      </div>
                    `
    )}
                </div>
              ` : $`${re(
      E,
      ([S]) => S,
      ([S, z]) => $`
                  <div class="cards-wrapper">
                    <h4>
                      ${S === "binary_sensor" || S === "sensor" || S === "cover" ? this._getDomainName(
        S,
        p || void 0
      ) : this._getDomainName(S)}
                    </h4>
                    <div class="entity-cards">
                      ${re(
        z,
        (P) => P.entity_id,
        (P) => $`
                          <div class="entity-card">
                            ${this._getOrCreateCard(P)}
                          </div>
                        `
      )}
                    </div>
                  </div>
                `
    )}`}
        </div>
      </ha-dialog>
    `;
  }
  _getDomainName(e, i) {
    return this.hass ? e === "scene" ? "Scene" : e === "binary_sensor" || e === "sensor" || e === "cover" ? i ? this.hass.localize(
      `component.${e}.entity_component.${i}.name`
    ) : this.hass.localize(`component.${e}.entity_component._.name`) : this.hass.localize(`component.${e}.entity_component._.name`) : e;
  }
}, xe.styles = ke`
    :host {
      display: block;
    }
    :host([hidden]) {
      display: none;
    }

    ha-dialog {
      --dialog-content-padding: 12px;
      --mdc-dialog-min-width: calc((var(--columns, 4) * 22.5vw) + 3vw);
      --mdc-dialog-max-width: calc((var(--columns, 4) * 22.5vw) + 5vw);
      box-sizing: border-box;
      overflow-x: auto;
    }

    .dialog-header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
      min-width: 15vw;
    }
    .dialog-header .menu-button {
      margin-left: auto;
    }
    .dialog-content {
      margin-bottom: 16px;
    }
    .dialog-actions {
      text-align: right;
    }

    .cards-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 100%;
      overflow-x: auto;
    }
    .entity-list {
      list-style: none;
      padding: 0 8px;
      margin: 0;
    }
    .entity-list .entity-item {
      list-style: none;
      margin: 0.2em 0;
    }
    h4 {
      width: calc(var(--columns, 4) * 22.5vw);
      box-sizing: border-box;
      font-size: 1.2em;
      margin: 0.8em 0.2em;
    }
    .entity-cards {
      display: grid;
      grid-template-columns: repeat(var(--columns, 4), 22.5vw);
      gap: 4px;
      width: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
      justify-content: center;
    }
    .entity-card {
      width: 22.5vw;
      box-sizing: border-box;
    }

    @media (max-width: 1200px) {
      ha-dialog {
        --mdc-dialog-min-width: 96vw;
        --mdc-dialog-max-width: 96vw;
      }
      .entity-card {
        width: 45vw;
      }
      .entity-cards {
        grid-template-columns: repeat(var(--columns, 2), 45vw);
      }
      h4 {
        width: calc(var(--columns, 2) * 45vw);
        margin: 0.8em 0.2em;
      }
    }

    @media (max-width: 700px) {
      ha-dialog {
        --dialog-content-padding: 8px;
        --mdc-dialog-min-width: 96vw;
        --mdc-dialog-max-width: 96vw;
      }
      .cards-wrapper {
        align-items: stretch;
        width: 100%;
        overflow-x: hidden;
      }
      .entity-card {
        width: 100%;
      }
      .entity-cards {
        grid-template-columns: 1fr;
      }
      h4 {
        width: 100%;
        font-size: 1.2em;
        margin: 0.6em 0;
        padding: 0 8px;
        box-sizing: border-box;
      }
    }
  `, xe);
pe([
  I({ type: Boolean })
], de.prototype, "open");
pe([
  I({ type: String })
], de.prototype, "selectedDomain");
pe([
  I({ type: String })
], de.prototype, "selectedDeviceClass");
pe([
  I({ type: String })
], de.prototype, "content");
pe([
  I({ type: Array })
], de.prototype, "entities");
pe([
  I({ attribute: !1 })
], de.prototype, "hass");
pe([
  I({ attribute: !1 })
], de.prototype, "card");
pe([
  K()
], de.prototype, "selectedGroup");
let Rs = de;
customElements.define("area-card-plus-popup", Rs);
var Us = Object.defineProperty, Fs = Object.getOwnPropertyDescriptor, _e = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Fs(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && Us(e, i, o), o;
};
let ce = class extends Es(te) {
  constructor() {
    super(...arguments), this.selectedDomain = null, this.selectedDeviceClass = null, this._iconCache = /* @__PURE__ */ new Map(), this._styleCache = /* @__PURE__ */ new Map(), this._ratio = null, this._deviceClasses = xt, this._entitiesByDomain = A(
      (t, e, i, s, o) => {
        var c;
        const n = ((c = this._config) == null ? void 0 : c.hidden_entities) || [], a = i.reduce((l, d) => {
          var h;
          return !d.hidden_by && (d.area_id ? d.area_id === t : d.device_id && e.has(d.device_id)) && (!((h = this._config) != null && h.label) || d.labels && d.labels.some((_) => {
            var p;
            return (p = this._config) == null ? void 0 : p.label.includes(_);
          })) && !n.includes(d.entity_id) && l.push(d.entity_id), l;
        }, []), r = {};
        for (const l of a) {
          const d = q(l);
          if (!Ge.includes(d) && !at.includes(d) && !rt.includes(d) && !ct.includes(d) && !zs.includes(d) && !$t.includes(d))
            continue;
          const h = o[l];
          h && ((rt.includes(d) || at.includes(d) || ct.includes(d)) && !s[d].includes(
            h.attributes.device_class || ""
          ) || (d in r || (r[d] = []), r[d].push(h)));
        }
        return r;
      }
    ), this._area = A(
      (t, e) => e.find((i) => i.area_id === t) || null
    ), this._devicesInArea = A(
      (t, e) => new Set(
        t ? e.reduce((i, s) => (s.area_id === t && i.push(s.id), i), []) : []
      )
    ), this._computeCovers = A(
      (t, e) => ct.flatMap((i) => i in t ? e[i].map((s) => ({
        domain: i,
        deviceClass: s
      })) : [])
    ), this._computeIconStyles = A(
      (t, e, i, s) => {
        const o = {
          ...t && e === 1 ? { "--mdc-icon-size": "20px" } : {},
          color: s ? `var(--${s}-color)` : ""
        };
        return i ? i.split(`
`).reduce((n, a) => {
          const r = a.trim();
          if (r && r.includes(":")) {
            const [c, l] = r.split(":");
            n[c.trim()] = l.trim().replace(";", "");
          }
          return n;
        }, o) : o;
      }
    ), this._computeAlerts = A(
      (t, e) => rt.flatMap((i) => i in t ? e[i].map((s) => ({
        domain: i,
        deviceClass: s
      })) : [])
    ), this._computeSensors = A(
      (t, e) => at.flatMap((i) => i in t ? e[i].map(
        (s, o) => ({
          domain: i,
          deviceClass: s,
          index: o
        })
      ) : [])
    ), this._computeButtons = A(
      (t, e) => (t || []).filter(
        (i) => i in e
      )
    ), this._computeCameraEntity = A(
      (t, e) => {
        var i;
        if (t && "camera" in e)
          return (i = e.camera[0]) == null ? void 0 : i.entity_id;
      }
    );
  }
  static getConfigElement() {
    return document.createElement("area-card-plus-editor");
  }
  static async getStubConfig(t) {
    var s;
    const e = t.connection;
    return { type: "custom:area-card-plus", area: ((s = (await As(e, si))[0]) == null ? void 0 : s.area_id) || "" };
  }
  showPopup(t, e, i) {
    t.dispatchEvent(
      new CustomEvent("show-dialog", {
        detail: {
          dialogTag: e,
          dialogImport: () => customElements.whenDefined(e),
          dialogParams: i
        },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _openDomainPopup(t) {
    var o, n;
    const e = this._area((o = this._config) == null ? void 0 : o.area, this._areas || []), i = ((n = this._config) == null ? void 0 : n.area_name) || e && e.name || "Details";
    this.showPopup(this, "area-card-plus-popup", {
      title: i,
      hass: this.hass,
      selectedDomain: t,
      selectedDeviceClass: this.selectedDeviceClass || void 0,
      selectedGroup: this.selectedGroup || void 0,
      card: this
    });
  }
  _openGeneralPopup() {
    var n, a;
    const t = this._area((n = this._config) == null ? void 0 : n.area, this._areas || []), e = ((a = this._config) == null ? void 0 : a.area_name) || t && t.name || "Details", i = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, this._devices),
      this._entities,
      this._deviceClasses,
      this.hass.states
    ), s = [];
    Object.values(i || {}).forEach((r) => {
      r.forEach((c) => {
        !ye.includes(c.state) && !ae.includes(c.state) && s.push(c);
      });
    }), this.showPopup(this, "area-card-plus-popup", {
      title: e,
      hass: this.hass,
      entities: s,
      card: this,
      content: s.length ? void 0 : "Keine Entitäten"
    });
  }
  _isOn(t, e) {
    const i = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, this._devices),
      this._entities,
      this._deviceClasses,
      this.hass.states
    )[t];
    if (i)
      return (e ? i.filter(
        (s) => s.attributes.device_class === e
      ) : i).find(
        (s) => !ye.includes(s.state) && !ae.includes(s.state)
      );
  }
  _average(t, e) {
    const i = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, this._devices),
      this._entities,
      this._deviceClasses,
      this.hass.states
    )[t].filter(
      (a) => e ? a.attributes.device_class === e : !0
    );
    if (!i || i.length === 0)
      return;
    let s;
    const o = i.filter((a) => !ms(a) || isNaN(Number(a.state)) ? !1 : s ? a.attributes.unit_of_measurement === s : (s = a.attributes.unit_of_measurement, !0));
    if (!o.length)
      return;
    const n = o.reduce(
      (a, r) => a + Number(r.state),
      0
    );
    return e === "power" ? `${ei(n, this.hass.locale, {
      maximumFractionDigits: 1
    })}${s ? ii(s, this.hass.locale) : ""}${s || ""}` : `${ei(n / o.length, this.hass.locale, {
      maximumFractionDigits: 1
    })}${s ? ii(s, this.hass.locale) : ""}${s || ""}`;
  }
  hassSubscribe() {
    const t = this.hass.connection;
    return [
      si(t, (e) => {
        this._areas = e;
      }),
      ws(t, (e) => {
        this._devices = e;
      }),
      Cs(t, (e) => {
        this._entities = e;
      })
    ];
  }
  getCardSize() {
    return 3;
  }
  willUpdate(t) {
    var e, i;
    (t.has("_config") || this._ratio === null) && (this._ratio = (e = this._config) != null && e.aspect_ratio ? oi((i = this._config) == null ? void 0 : i.aspect_ratio) : null, (this._ratio === null || this._ratio.w <= 0 || this._ratio.h <= 0) && (this._ratio = oi(Hs)));
  }
  getGridOptions() {
    return {
      columns: 12,
      rows: 3,
      min_columns: 1,
      min_rows: 1
    };
  }
  setConfig(t) {
    if (!t.area)
      throw new Error("Area Required");
    this._config = t, this._deviceClasses = { ...xt }, t.sensor_classes && (this._deviceClasses.sensor = t.sensor_classes), t.alert_classes && (this._deviceClasses.binary_sensor = t.alert_classes), t.cover_classes && (this._deviceClasses.cover = t.cover_classes), this._iconCache.clear(), this._styleCache.clear();
  }
  _parseCss(t) {
    if (!t) return "";
    const e = t;
    if (this._styleCache.has(e)) return this._styleCache.get(e);
    const i = t.split(`
`).reduce((s, o) => {
      const n = o.trim();
      return n && n.includes(":") && (s += n.endsWith(";") ? n : `${n};`, s += " "), s;
    }, "");
    return this._styleCache.set(e, i), i;
  }
  shouldUpdate(t) {
    if (t.has("_config") || !this._config || t.has("_devicesInArea") || t.has("_areas") || t.has("_entities"))
      return !0;
    if (!t.has("hass"))
      return !1;
    const e = t.get("hass");
    if (!e || e.themes !== this.hass.themes || e.locale !== this.hass.locale)
      return !0;
    if (!this._devices || !this._devicesInArea(this._config.area, this._devices) || !this._entities)
      return !1;
    const i = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, this._devices),
      this._entities,
      this._deviceClasses,
      this.hass.states
    );
    for (const s of Object.values(i))
      for (const o of s)
        if (e.states[o.entity_id] !== o)
          return !0;
    return !1;
  }
  _handleAction(t) {
    var s, o, n;
    const e = t.detail.action === "tap" ? (s = this._config) == null ? void 0 : s.tap_action : t.detail.action === "hold" ? (o = this._config) == null ? void 0 : o.hold_action : t.detail.action === "double_tap" ? (n = this._config) == null ? void 0 : n.double_tap_action : null;
    if (typeof e == "string" && e === "more-info" || typeof e == "object" && (e == null ? void 0 : e.action) === "more-info" || e === void 0) {
      this._openGeneralPopup();
      return;
    }
    tt(this, this.hass, this._config, t.detail.action);
  }
  _handleDomainAction(t) {
    return this._makeActionHandler("domain", t);
  }
  _handleAlertAction(t, e) {
    return this._makeActionHandler("alert", t, e);
  }
  _handleCoverAction(t, e) {
    return this._makeActionHandler("cover", t, e);
  }
  _handleSensorAction(t, e) {
    return this._makeActionHandler("sensor", t, e);
  }
  // Add helper method for service calls
  _handleServiceAction(t) {
    let e, i, s = {};
    if (t.perform_action) {
      const [o, n] = t.perform_action.split(".");
      e = o, i = n;
    } else if (t.service) {
      const [o, n] = t.service.split(".");
      e = o, i = n;
    }
    t.service_data && (s = { ...s, ...t.service_data }), t.data && (s = { ...s, ...t.data }), t.target && (t.target.entity_id && (Array.isArray(t.target.entity_id) ? s.entity_id = t.target.entity_id : s.entity_id = [t.target.entity_id]), t.target.area_id && (s.area_id = t.target.area_id), t.target.device_id && (s.device_id = t.target.device_id)), console.log(`Calling service: ${e}.${i}`, s), this.hass.callService(e, i, s);
  }
  // Add this method to handle custom JavaScript execution
  _executeCustomAction(t) {
    if (!t || typeof t != "string") {
      console.error("Custom action code is empty or invalid");
      return;
    }
    try {
      const e = {
        hass: this.hass,
        config: this._config,
        states: this.hass.states,
        entity: (s) => this.hass.states[s],
        callService: (s, o, n) => this.hass.callService(s, o, n),
        navigate: (s) => {
          window.history.pushState(null, "", s), window.dispatchEvent(new CustomEvent("location-changed"));
        },
        fireEvent: (s, o) => {
          this.dispatchEvent(new CustomEvent(s, { detail: o }));
        }
      };
      new Function(...Object.keys(e), t)(...Object.values(e));
    } catch (e) {
      console.error("Error executing custom action:", e), this.hass.callService("system_log", "write", {
        message: `Custom button action error: ${e.message}`,
        level: "error"
      });
    }
  }
  // Unified action handler factory for domain/alert/cover/sensor
  _makeActionHandler(t, e, i, s) {
    return (o) => {
      var n, a, r, c, l, d, h, _, p, v;
      try {
        o.stopPropagation();
        let m;
        t === "domain" ? m = (a = (n = this._config) == null ? void 0 : n.customization_domain) == null ? void 0 : a.find(
          (E) => E.type === e
        ) : t === "alert" ? m = (c = (r = this._config) == null ? void 0 : r.customization_alert) == null ? void 0 : c.find(
          (E) => E.type === i
        ) : t === "cover" ? m = (d = (l = this._config) == null ? void 0 : l.customization_cover) == null ? void 0 : d.find(
          (E) => E.type === i
        ) : t === "sensor" ? m = (_ = (h = this._config) == null ? void 0 : h.customization_sensor) == null ? void 0 : _.find(
          (E) => E.type === i
        ) : t === "custom_button" && (m = s);
        const u = o.detail.action === "tap" ? m == null ? void 0 : m.tap_action : o.detail.action === "hold" ? m == null ? void 0 : m.hold_action : o.detail.action === "double_tap" ? m == null ? void 0 : m.double_tap_action : null;
        if (t === "custom_button") {
          if (!u)
            return;
          const E = {
            tap_action: m == null ? void 0 : m.tap_action,
            hold_action: m == null ? void 0 : m.hold_action,
            double_tap_action: m == null ? void 0 : m.double_tap_action
          };
          try {
            if (t === "custom_button" && (u == null ? void 0 : u.action) === "custom") {
              this._executeCustomAction(u.custom_code);
              return;
            }
            if (t === "custom_button" && ((u == null ? void 0 : u.action) === "perform-action" || (u == null ? void 0 : u.action) === "call-service")) {
              this._handleServiceAction(u);
              return;
            }
            tt(this, this.hass, E, o.detail.action);
          } catch (C) {
            console.error("Error in handleAction:", C);
          }
          return;
        }
        if (t === "domain") {
          const E = u === "toggle" || (u == null ? void 0 : u.action) === "toggle", C = u === "more-info" || (u == null ? void 0 : u.action) === "more-info";
          if (E) {
            e === "media_player" ? this.hass.callService(
              e,
              this._isOn(e) ? "media_pause" : "media_play",
              void 0,
              { area_id: this._config.area }
            ) : e === "lock" ? this.hass.callService(
              e,
              this._isOn(e) ? "lock" : "unlock",
              void 0,
              { area_id: this._config.area }
            ) : e === "vacuum" ? this.hass.callService(
              e,
              this._isOn(e) ? "stop" : "start",
              void 0,
              { area_id: this._config.area }
            ) : Ge.includes(e) && this.hass.callService(
              e,
              this._isOn(e) ? "turn_off" : "turn_on",
              void 0,
              { area_id: this._config.area }
            );
            return;
          } else if (C || u === void 0) {
            if (e !== "binary_sensor" && e !== "sensor")
              if (e === "climate") {
                const W = (v = (p = this._config) == null ? void 0 : p.customization_domain) == null ? void 0 : v.find(
                  (D) => D.type === "climate"
                ), G = W == null ? void 0 : W.display_mode;
                (G === "icon" || G === "text_icon") && this._showPopupForDomain(e);
              } else
                this._showPopupForDomain(e);
            return;
          }
          const M = {
            tap_action: m == null ? void 0 : m.tap_action,
            hold_action: m == null ? void 0 : m.hold_action,
            double_tap_action: m == null ? void 0 : m.double_tap_action
          };
          try {
            if ((u == null ? void 0 : u.action) === "perform-action" || (u == null ? void 0 : u.action) === "call-service") {
              this._handleServiceAction(u);
              return;
            }
            tt(this, this.hass, M, o.detail.action);
          } catch (W) {
            console.error("Error in handleAction for domain:", W);
          }
          return;
        }
        const x = u === "more-info" || (u == null ? void 0 : u.action) === "more-info";
        if (t === "alert") {
          if (x || u === void 0) {
            e === "binary_sensor" && this._showPopupForDomain(e, i);
            return;
          }
        } else if (t === "cover") {
          if (x || u === void 0) {
            e === "cover" && this._showPopupForDomain(e, i);
            return;
          }
        } else if (t === "sensor" && x) {
          e === "sensor" && this._showPopupForDomain(e, i);
          return;
        }
        const N = {
          tap_action: m == null ? void 0 : m.tap_action,
          hold_action: m == null ? void 0 : m.hold_action,
          double_tap_action: m == null ? void 0 : m.double_tap_action
        };
        try {
          if ((u == null ? void 0 : u.action) === "perform-action" || (u == null ? void 0 : u.action) === "call-service") {
            this._handleServiceAction(u);
            return;
          }
          tt(this, this.hass, N, o.detail.action);
        } catch (E) {
          console.error("Error in handleAction for", t, ":", E);
        }
      } catch (m) {
        console.error("Error in _makeActionHandler:", m);
      }
    };
  }
  renderCustomButtons() {
    var e, i, s;
    if (!((e = this._config) != null && e.custom_buttons) || this._config.custom_buttons.length === 0)
      return w;
    const t = {
      v2: ((i = this._config) == null ? void 0 : i.design) === "V2",
      row: ((s = this._config) == null ? void 0 : s.layout) === "horizontal"
    };
    return $`
        <div
          class="${ee({
      custom_buttons: !0,
      ...t
    })}"
        >
          ${this._config.custom_buttons.map(
      (o) => {
        const n = o.color ? `color: var(--${o.color}-color, ${o.color});` : "";
        return $`
                <div
                  class="icon-with-count hover"
                  @click=${(a) => {
          a.stopPropagation();
        }}
                  @action=${this._makeActionHandler(
          "custom_button",
          "",
          "",
          o
        )}
                  .actionHandler=${ne({
          hasHold: U(o.hold_action),
          hasDoubleClick: U(o.double_tap_action)
        })}
                >
                  <ha-icon .icon=${o.icon} style="${n}"></ha-icon>
                  ${o.name ? $`<span class="custom-button-label" style="${n}">${o.name}</span>` : w}
                </div>
              `;
      }
    )}
        </div>
      `;
  }
  render() {
    var W, G, D, J, fe, He, Me, Pe, Le, Te, Be, Ie, Ne, S, z, P, L, Q, je, Re, It, Nt;
    if (!this._config || !this.hass || !this._areas || !this._devices || !this._entities)
      return w;
    const t = ((W = this._config) == null ? void 0 : W.design) === "V2", e = t && ((G = this._config) != null && G.v2_color) ? this._calculateV2Color(this._config.v2_color) : "var(--primary-color)", i = {
      mirrored: this._config.mirrored === !0
    }, s = {
      v2: ((D = this._config) == null ? void 0 : D.design) === "V2",
      row: ((J = this._config) == null ? void 0 : J.layout) === "horizontal"
    };
    let o = 3;
    try {
      const f = ((fe = this.shadowRoot) == null ? void 0 : fe.host) || document.documentElement, y = getComputedStyle(f).getPropertyValue("--row-size");
      y && (o = Number(y.trim()) || 3);
    } catch {
    }
    const n = t ? { background: e } : {}, a = t && o === 1 ? {} : t ? { background: e } : {}, r = this.layout === "grid", c = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, this._devices),
      this._entities,
      this._deviceClasses,
      this.hass.states
    ), l = this._area(this._config.area, this._areas), d = /* @__PURE__ */ new Map();
    (((He = this._config) == null ? void 0 : He.customization_domain) || []).forEach(
      (f) => d.set(f.type, f)
    );
    const h = /* @__PURE__ */ new Map();
    (((Me = this._config) == null ? void 0 : Me.customization_cover) || []).forEach(
      (f) => h.set(f.type, f)
    );
    const _ = /* @__PURE__ */ new Map();
    (((Pe = this._config) == null ? void 0 : Pe.customization_alert) || []).forEach(
      (f) => _.set(f.type, f)
    );
    const p = /* @__PURE__ */ new Map();
    (((Le = this._config) == null ? void 0 : Le.customization_sensor) || []).forEach(
      (f) => p.set(f.type, f)
    );
    const v = this._computeCovers(c, this._deviceClasses), m = this._computeAlerts(c, this._deviceClasses), u = this._computeButtons(
      this._config.toggle_domains,
      c
    ), x = this._computeSensors(c, this._deviceClasses), N = ((Be = (Te = this._config) == null ? void 0 : Te.toggle_domains) != null && Be.includes("climate") ? $t : []).filter((f) => f in c).map((f) => ({ domain: f })), E = this._computeCameraEntity(
      this._config.show_camera,
      c
    ), C = (Ie = this._config) != null && Ie.show_camera ? ((Ne = this._config) == null ? void 0 : Ne.show_icon) === "icon" || ((S = this._config) == null ? void 0 : S.show_icon) === "icon + image" : ((z = this._config) == null ? void 0 : z.show_icon) === "icon" || ((P = this._config) == null ? void 0 : P.show_icon) === "icon + image" || ((L = this._config) == null ? void 0 : L.show_icon) === void 0;
    if (l === null)
      return $`
        <hui-warning>
          ${this.hass.localize("ui.card.area.area_not_found")}
        </hui-warning>
      `;
    const M = this._computeIconStyles(
      t,
      o,
      (Q = this._config) == null ? void 0 : Q.icon_css,
      (je = this._config) == null ? void 0 : je.area_icon_color
    );
    return $`
      <ha-card
        class="${ee(i)}"
        style=${Qe({
      paddingBottom: r ? "0" : "12em"
    })}
      >
        ${this._config.show_camera && E || (this._config.show_icon === "image" || this._config.show_icon === "icon + image") && l.picture ? $`
                <hui-image
                  .config=${this._config}
                  .hass=${this.hass}
                  .image=${this._config.show_camera ? void 0 : l.picture}
                  .cameraImage=${this._config.show_camera ? E : void 0}
                  .cameraView=${this._config.camera_view}
                  fitMode="cover"
                ></hui-image>
              ` : w}

        <div
          class="${ee({
      "icon-container": !0,
      ...s
    })}"
          style=${Qe(a)}
        >
          ${C ? $`
                  <ha-icon
                    style=${Qe(M)}
                    icon=${this._config.area_icon || l.icon}
                  ></ha-icon>
                ` : w}
        </div>

        <div
          class="${ee({
      content: !0,
      ...s
    })}"
          @action=${this._handleAction}
          .actionHandler=${ne({
      hasHold: U(this._config.hold_action),
      hasDoubleClick: U(this._config.double_tap_action)
    })}
        >
        ${this.renderCustomButtons()}  
        <div
            class="${ee({
      right: !0,
      ...s
    })}"
            style=${Qe(n)}
          >
            <!-- Covers -->
            <div
              class="${ee({
      covers: !0,
      ...s
    })}"
            >
              ${re(
      v,
      (f) => f.domain + "-" + f.deviceClass,
      ({ domain: f, deviceClass: y }) => {
        var V, R;
        const g = h.get(y), O = (g == null ? void 0 : g.invert) === !0, Y = c[f].filter(
          (k) => {
            const T = k.attributes.device_class || "default", H = !ae.includes(k.state);
            return T === y && (O ? ae.includes(k.state) : H);
          }
        ), j = (g == null ? void 0 : g.color) || ((V = this._config) == null ? void 0 : V.cover_color), b = g == null ? void 0 : g.icon, B = Y.length;
        return B > 0 ? $`
                        <div
                          class="icon-with-count"
                          style=${this._parseCss(
          (g == null ? void 0 : g.css) || ((R = this._config) == null ? void 0 : R.cover_css)
        )}
                          @action=${this._handleCoverAction(
          f,
          y
        )}
                          .actionHandler=${ne({
          hasHold: U(g == null ? void 0 : g.hold_action),
          hasDoubleClick: U(
            g == null ? void 0 : g.double_tap_action
          )
        })}
                        >
                          <ha-state-icon
                            class="cover"
                            style="${(j ? `color: var(--${j}-color);` : "") + " " + (g != null && g.icon_css ? g.icon_css.split(`
`).reduce((k, T) => {
          const H = T.trim();
          return H && H.includes(":") && (k += H.endsWith(";") ? H : `${H};`, k += " "), k;
        }, "") : "")}"
                            .icon=${b || this._cachedIcon(
          f,
          !O,
          y
        )}
                          ></ha-state-icon>
                          <span
                            class="active-count text-small ${B > 0 ? "on" : "off"}"
                            >${B}</span
                          >
                        </div>
                      ` : w;
      }
    )}
            </div>

            <!-- Alerts -->
            <div
              class="${ee({
      alerts: !0,
      ...s
    })}"
            >
              ${re(
      m,
      (f) => f.domain + "-" + f.deviceClass,
      ({ domain: f, deviceClass: y }) => {
        var V, R;
        const g = _.get(y), O = (g == null ? void 0 : g.invert) === !0, Y = c[f].filter(
          (k) => {
            const T = k.attributes.device_class || "default", H = k.state === "on";
            return T === y && (O ? ae.includes(k.state) : H);
          }
        ), j = (g == null ? void 0 : g.color) || ((V = this._config) == null ? void 0 : V.alert_color), b = g == null ? void 0 : g.icon, B = Y.length;
        return B > 0 ? $`
                        <div
                          class="icon-with-count"
                          style=${this._parseCss(
          (g == null ? void 0 : g.css) || ((R = this._config) == null ? void 0 : R.alert_css)
        )}
                          @action=${this._handleAlertAction(
          f,
          y
        )}
                          .actionHandler=${ne({
          hasHold: U(g == null ? void 0 : g.hold_action),
          hasDoubleClick: U(
            g == null ? void 0 : g.double_tap_action
          )
        })}
                        >
                          <ha-state-icon
                            class="alert"
                            style="${(j ? `color: var(--${j}-color);` : "") + " " + (g != null && g.icon_css ? g.icon_css.split(`
`).reduce((k, T) => {
          const H = T.trim();
          return H && H.includes(":") && (k += H.endsWith(";") ? H : `${H};`, k += " "), k;
        }, "") : "")}"
                            .icon=${b || this._cachedIcon(
          f,
          !O,
          y
        )}
                          ></ha-state-icon>
                          <span
                            class="active-count text-small ${B > 0 ? "on" : "off"}"
                            >${B}</span
                          >
                        </div>
                      ` : w;
      }
    )}
            </div>

            <!-- Buttons -->
            <div
              class="${ee({
      buttons: !0,
      ...s
    })}"
            >
              ${re(
      u,
      (f) => f,
      (f) => {
        var b, B, V, R, k;
        if (f === "climate") {
          const T = (B = (b = this._config) == null ? void 0 : b.customization_domain) == null ? void 0 : B.find(
            (he) => he.type === "climate"
          ), H = T == null ? void 0 : T.display_mode;
          if (H !== "icon" && H !== "text_icon")
            return w;
        }
        const y = d.get(f), g = (y == null ? void 0 : y.color) || ((V = this._config) == null ? void 0 : V.domain_color), O = y == null ? void 0 : y.icon, j = c[f].filter(
          (T) => !ye.includes(T.state) && !ae.includes(T.state)
        ).length;
        return this._config.show_active && j === 0 ? w : $`
                    <div
                      class="icon-with-count hover"
                      style=${this._parseCss(
          (y == null ? void 0 : y.css) || ((R = this._config) == null ? void 0 : R.domain_css)
        )}
                      @action=${this._handleDomainAction(f)}
                      .actionHandler=${ne({
          hasHold: U(y == null ? void 0 : y.hold_action),
          hasDoubleClick: U(
            y == null ? void 0 : y.double_tap_action
          )
        })}
                    >
                      <ha-state-icon
                        style=${g ? `color: var(--${g}-color);` : (k = this._config) != null && k.domain_color ? `color: ${this._config.domain_color};` : ""}
                        class=${j > 0 ? "toggle-on" : "toggle-off"}
                        .domain=${f}
                        .icon=${O || this._cachedIcon(
          f,
          j > 0
        )}
                      ></ha-state-icon>
                      <span
                        class="active-count text-small ${j > 0 ? "on" : "off"}"
                      >
                        ${j}
                      </span>
                    </div>
                  `;
      }
    )}
            </div>
          </div>


        
              
          <div class="${ee({
      bottom: !0,
      ...s
    })}">
              <div style=${`${(Re = this._config) != null && Re.area_name_color ? `color: var(--${this._config.area_name_color}-color);` : ""} ${(It = this._config) != null && It.name_css ? this._config.name_css.split(`
`).reduce((f, y) => {
      const g = y.trim();
      return g && g.includes(":") && (f += g.endsWith(";") ? g : `${g};`, f += " "), f;
    }, "") : ""}`}"
              <div class="${ee({
      name: !0,
      ...s,
      "text-large": !0,
      on: !0
    })}"
                @action=${this._handleAction}
                .actionHandler=${ne({
      hasHold: U(this._config.hold_action),
      hasDoubleClick: U(this._config.double_tap_action)
    })}
              >
                ${this._config.area_name || l.name}
              </div>
                            
              <!-- Sensors -->
              <div class="sensors">
                ${(Nt = this._config) != null && Nt.wrap_sensor_icons ? re(
      x,
      (f) => f.domain + "-" + f.deviceClass,
      ({ domain: f, deviceClass: y, index: g }) => {
        var H, he, Ue, Fe;
        const O = c[f].filter(
          (oe) => oe.attributes.device_class === y
        );
        if (O.length === 0)
          return w;
        const Y = (() => {
          switch (y) {
            case "temperature":
              return l.temperature_entity_id;
            case "humidity":
              return l.humidity_entity_id;
            default:
              return null;
          }
        })(), j = Y ? this.hass.states[Y] : void 0, b = p.get(y), B = (b == null ? void 0 : b.color) || ((H = this._config) == null ? void 0 : H.sensor_color), V = (b == null ? void 0 : b.invert) === !0, R = O.some(
          (oe) => !ye.includes(oe.state) && !ae.includes(oe.state)
        );
        if (V && R)
          return w;
        const k = (he = this._config) != null && he.show_sensor_icons ? $`<ha-domain-icon
                                style=${B ? `color: var(--${B}-color);` : ""}
                                .hass=${this.hass}
                                .domain=${f}
                                .deviceClass=${y}
                              ></ha-domain-icon>` : null, T = $`<span
                            class="sensor-value"
                            @action=${this._handleSensorAction(
          f,
          y
        )}
                            .actionHandler=${ne({
          hasHold: U(b == null ? void 0 : b.hold_action),
          hasDoubleClick: U(
            b == null ? void 0 : b.double_tap_action
          )
        })}
                            style=${`${B ? `color: var(--${B}-color);` : ""} ${this._parseCss(b == null ? void 0 : b.css)}`}
                          >
                            ${!((Ue = this._config) != null && Ue.show_sensor_icons) && !((Fe = this._config) != null && Fe.wrap_sensor_icons) && g > 0 ? " - " : ""}
                            ${j ? this.hass.formatEntityState(j) : this._average(f, y)}
                          </span>`;
        return $`<div class="sensor-row off">
                            ${k}${T}
                          </div>`;
      }
    ) : $`<div class="sensor text-medium off">
                        ${re(
      x,
      (f) => f.domain + "-" + f.deviceClass,
      ({ domain: f, deviceClass: y, index: g }) => {
        var H, he, Ue, Fe;
        const O = c[f].filter(
          (oe) => oe.attributes.device_class === y
        );
        if (O.length === 0)
          return w;
        const Y = (() => {
          switch (y) {
            case "temperature":
              return l.temperature_entity_id;
            case "humidity":
              return l.humidity_entity_id;
            default:
              return null;
          }
        })(), j = Y ? this.hass.states[Y] : void 0, b = p.get(y), B = (b == null ? void 0 : b.color) || ((H = this._config) == null ? void 0 : H.sensor_color), V = (b == null ? void 0 : b.invert) === !0, R = O.some(
          (oe) => !ye.includes(oe.state) && !ae.includes(oe.state)
        );
        if (V && R)
          return w;
        const k = (he = this._config) != null && he.show_sensor_icons ? $`<ha-domain-icon
                                  style=${B ? `color: var(--${B}-color);` : ""}
                                  .hass=${this.hass}
                                  .domain=${f}
                                  .deviceClass=${y}
                                ></ha-domain-icon>` : null, T = $`<span
                              class="sensor-value"
                              @action=${this._handleSensorAction(
          f,
          y
        )}
                              .actionHandler=${ne({
          hasHold: U(b == null ? void 0 : b.hold_action),
          hasDoubleClick: U(
            b == null ? void 0 : b.double_tap_action
          )
        })}
                              style=${`${B ? `color: var(--${B}-color);` : ""} ${this._parseCss(b == null ? void 0 : b.css)}`}
                            >
                              ${!((Ue = this._config) != null && Ue.show_sensor_icons) && !((Fe = this._config) != null && Fe.wrap_sensor_icons) && g > 0 ? " - " : ""}
                              ${j ? this.hass.formatEntityState(j) : this._average(f, y)}
                            </span>`;
        return $`${k}${T}`;
      }
    )}
                      </div>`}
              </div>

              <!-- Climates -->
              <div class="climate text-small off">
                ${re(
      N,
      (f) => f.domain,
      ({ domain: f }) => {
        var B;
        const g = c[f].filter((V) => {
          const R = V.attributes.hvac_action, k = V.state, T = !ye.includes(k) && !ae.includes(k);
          return R !== void 0 ? T && (R !== "idle" && R !== "off") && !(k === "heat" && (R === "idle" || R === "off")) : T;
        }).map((V) => {
          var k, T, H;
          return `${V.attributes.temperature || "N/A"} ${((H = (T = (k = this.hass) == null ? void 0 : k.config) == null ? void 0 : T.unit_system) == null ? void 0 : H.temperature) || ""}`;
        });
        if (g.length === 0)
          return w;
        const O = d.get(f);
        if ((O == null ? void 0 : O.display_mode) === "icon")
          return w;
        const j = O == null ? void 0 : O.color, b = `${j ? `color: var(--${j}-color);` : (B = this._config) != null && B.domain_color ? `color: ${this._config.domain_color};` : ""} ${this._parseCss(O == null ? void 0 : O.css)}`;
        return $`<div
                      class="climate"
                      style=${b}
                      @action=${this._handleDomainAction(f)}
                      .actionHandler=${ne({
          hasHold: U(O == null ? void 0 : O.hold_action),
          hasDoubleClick: U(
            O == null ? void 0 : O.double_tap_action
          )
        })}
                    >
                      (${g.join(", ")})
                    </div>`;
      }
    )}
              </div>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  _calculateV2Color(t) {
    return `rgba(${t.join(", ")})`;
  }
  updated(t) {
    if (super.updated(t), !this._config || !this.hass)
      return;
    if (t.has("selectedDomain") && this.selectedDomain) {
      const s = this.selectedDomain;
      if (s.includes(".")) {
        const o = s, n = this.hass.states[o];
        n && this.showMoreInfo(n);
      } else
        this._openDomainPopup(s);
      setTimeout(() => {
        this.selectedDomain = null;
      }, 0);
    }
    const e = t.get("hass"), i = t.get("_config");
    (t.has("hass") && (!e || e.themes !== this.hass.themes) || t.has("_config") && (!i || i.theme !== this._config.theme)) && Ds(this, this.hass.themes, this._config.theme);
  }
  _showPopupForDomain(t, e) {
    this.selectedDeviceClass = e || null, this._openDomainPopup(t);
  }
  _getIcon(t, e, i) {
    if (t in Ct) {
      const s = Ct[t];
      if (i && typeof s == "object") {
        const o = s[i];
        if (o) {
          if (typeof o == "string") return o;
          if (typeof o == "object" && "on" in o && "off" in o)
            return e ? o.on : o.off;
        }
      }
      if (typeof s == "object" && "on" in s && "off" in s)
        return e ? s.on : s.off;
      if (typeof s == "string") return s;
    }
    return "";
  }
  _cachedIcon(t, e, i) {
    const s = `${t}|${i || ""}|${e ? "1" : "0"}`;
    if (this._iconCache.has(s)) return this._iconCache.get(s);
    const o = this._getIcon(t, e, i);
    return this._iconCache.set(s, o), o;
  }
  static get styles() {
    return ke`
      ha-card {
        overflow: hidden;
        position: relative;
        height: 100%;
      }
      hui-image {
        position: absolute;
        z-index: 0;
        height: 100%;
        width: 100%;
      }
      .sensors {
        --mdc-icon-size: 20px;
      }
      .sensor-value {
        vertical-align: middle;
      }
      .sensor-row {
        display: flex;
        align-items: center;
        gap: 0.5em;
      }
      .icon-container {
        position: absolute;
        top: 16px;
        left: 16px;
        color: var(--primary-color);
        z-index: 1;
        pointer-events: none;
      }
      .icon-container.row {
        top: 25%;
      }
      .icon-container.v2 {
        top: 8px;
        left: 8px;
        border-radius: 50%;
      }
      .mirrored .icon-container {
        left: unset;
        right: 16px;
      }
      .content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        cursor: pointer;
      }
      .content.row {
        flex-direction: column;
        justify-content: center;
      }
      .right {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-start;
        position: absolute;
        top: 8px;
        right: 8px;
        gap: 7px;
      }
      .right.row {
        top: unset;
      }
      .mirrored .right {
        right: unset;
        left: 8px;
        flex-direction: row-reverse;
      }
      .alerts,
      .covers {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: -3px;
        gap: 2px;
      }
      .alerts.row,
      .covers.row {
        flex-direction: row-reverse;
      }
      .buttons {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .buttons.row {
        flex-direction: row-reverse;
      }
      .bottom {
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 8px;
        left: 16px;
      }
      .bottom.row {
        flex-direction: row;
        left: calc(var(--row-size, 3) * 20px + 25px);
        bottom: unset;
        align-items: baseline;
        gap: 5px;
      }
      .mirrored .bottom.row {
        flex-direction: row-reverse;
        right: calc(var(--row-size, 3) * 20px + 25px) !important;
      }
      .mirrored .bottom {
        left: unset;
        right: 16px;
        text-align: end;
        align-items: end;
      }
      .name {
        font-weight: bold;
        margin-bottom: 20px;
        
      }
      .name.row {
        margin-bottom: 0;
      }
      .icon-with-count {
        display: flex;
        align-items: center;
        gap: 5px;
        background: none;
        border: solid 0.025rem rgba(var(--rgb-primary-text-color), 0.15);
        padding: 1px;
        border-radius: 5px;
        --mdc-icon-size: 20px;
      }
      .icon-with-count > ha-state-icon,
      .icon-with-count > ha-icon,
      .icon-with-count > span {
        pointer-events: none;
      }

      .toggle-on {
        color: var(--primary-text-color);
      }
      .toggle-off {
        color: var(--secondary-text-color) !important;
      }
      .off {
        color: var(--secondary-text-color);
      }
      .navigate {
        cursor: pointer;
      }
      .hover:hover {
        background-color: rgba(var(--rgb-primary-text-color), 0.15);
      }
      .text-small {
        font-size: 0.9em;
      }
      .text-medium {
        font-size: 1em;
      }
      .text-large {
        font-size: 1.3em;
      }
      .right * {
        pointer-events: auto;
      }
      .v2 .covers {
        flex-direction: row-reverse;
      }
      .mirrored .v2 .covers {
        flex-direction: row;
      }

      .v2 .alerts {
        flex-direction: row-reverse;
      }
      .mirrored .v2 .areas {
        flex-direction: row;
      }
      .v2 .buttons {
        flex-direction: row-reverse;
      }
      .mirrored .v2 .buttons {
        flex-direction: row;
      }
      .mirrored .v2 .bottom {
        right: 105px !important;
        left: unset;
      }
      .v2 .right {
        bottom: 0px;
        left: 0px;
        right: 0px;
        padding: calc(var(--row-size, 3) * 3px) 8px;
        top: unset;
        min-height: 24px;
        pointer-events: none;
      }
      .v2 .bottom {
        left: calc(var(--row-size, 3) * 15px + 55px);
        top: calc(var(--row-size, 3) * 5px + 4px);
        bottom: unset;
      }
      .v2 .bottom.row {
        top: calc(var(--row-size, 3) * 8px + 12px);
        left: calc(var(--row-size, 3) * 15px + 55px);
      }
    
        /*Custom Buttons*/
        .custom_buttons {
             display: flex;
             flex-direction: row;
             justify-content: flex-start;
             align-items: flex-start;
             position: absolute;
             bottom: 8px;
             left: 8px;
             gap: 7px;
             pointer-events: auto;
             z-index: 2;
           }
           .custom_buttons.row {
             top: unset;
           }
           .mirrored .custom_buttons {
             left: unset;
             right: 8px;
             flex-direction: row-reverse;
           }
           .v2 .custom_buttons {
             top: unset !important;
             bottom: 8px !important;
             left: 8px !important;
             right: unset !important;
             flex-direction: row !important;
             padding: 0 !important;
             min-height: unset !important;
             pointer-events: auto;
           }
           .v2.mirrored .custom_buttons,
           .mirrored .v2 .custom_buttons {
             left: unset !important;
             right: 8px !important;
             flex-direction: row-reverse !important;
           }
           .v2 .custom_buttons .icon-with-count {
             pointer-events: auto;
           }
           
           .custom-button-label {
             font-size: 0.8em;
             margin-left: 4px;
           }
    
    
      .v2 .name {
        margin-bottom: calc(var(--row-size, 3) * 1.5px + 1px);
      }
      .v2 .name.row {
        margin-bottom: 0px;
      }

      @supports (--row-size: 1) {
        .icon-container ha-icon {
          --mdc-icon-size: calc(var(--row-size, 3) * 20px);
        }
        .icon-container.v2 ha-icon {
          --mdc-icon-size: calc(var(--row-size, 3) * 15px);
          border-radius: 50%;
          display: flex;
          padding: 16px;
        }
      }

      @media (max-width: 768px) {
        .name {
          font-weight: bold;
          margin-bottom: 5px;
        }
      }
    `;
  }
};
_e([
  I({ attribute: !1 })
], ce.prototype, "hass", 2);
_e([
  K()
], ce.prototype, "_config", 2);
_e([
  K()
], ce.prototype, "_areas", 2);
_e([
  K()
], ce.prototype, "_devices", 2);
_e([
  K()
], ce.prototype, "_entities", 2);
_e([
  K()
], ce.prototype, "selectedDomain", 2);
_e([
  K()
], ce.prototype, "selectedDeviceClass", 2);
ce = _e([
  le("area-card-plus")
], ce);
var Vs = Object.defineProperty, qs = Object.getOwnPropertyDescriptor, Z = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? qs(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && Vs(e, i, o), o;
};
class Ee extends te {
  constructor() {
    super(...arguments), this.SelectOptions = [], this._entityKeys = /* @__PURE__ */ new WeakMap();
  }
  _getKey(e) {
    return this._entityKeys.has(e) || this._entityKeys.set(e, Math.random().toString()), this._entityKeys.get(e);
  }
  render() {
    return this.hass ? $`
      <div class="customization">
        ${this.customization && re(
      this.customization,
      (e) => this._getKey(e),
      (e, i) => $`
            <div class="customize-item">
              <ha-select
                label=${this.hass.localize(
        "ui.panel.lovelace.editor.features.edit"
      )}
                name="Customize"
                class="select-customization"
                naturalMenuWidth
                fixedMenuPosition
                .value=${e.type}
                @closed=${(s) => s.stopPropagation()}
                @value-changed=${this._valueChanged}
              >
                ${this.SelectOptions.map(
        (s) => $`<mwc-list-item .value=${s.value}
                      >${s.label}</mwc-list-item
                    >`
      )}
              </ha-select>

              <ha-icon-button
                .label="Remove"
                .path=${Bt}
                class="remove-icon"
                .index=${i}
                @click=${this._removeRow}
              ></ha-icon-button>

              <ha-icon-button
                .label="Edit"
                .path=${wi}
                class="edit-icon"
                .index=${i}
                @click="${this._editRow}"
              ></ha-icon-button>
            </div>
          `
    )}

        <div class="add-item row">
          <ha-select
            label=${this.hass.localize(
      "ui.panel.lovelace.editor.common.edit"
    ) + " " + this.hass.localize(
      "ui.panel.lovelace.editor.card.markdown.content"
    )}
            name="Customize"
            class="add-customization"
            naturalMenuWidth
            fixedMenuPosition
            @closed=${(e) => e.stopPropagation()}
            @click=${this._addRow}
          >
            ${this.SelectOptions.map(
      (e) => $`<mwc-list-item .value=${e.value}
                  >${e.label}</mwc-list-item
                >`
    )}
          </ha-select>
        </div>
      </div>
    ` : w;
  }
  _valueChanged(e) {
    if (!this.customization || !this.hass)
      return;
    const i = e.detail.value, s = e.target.index, o = this.customization.concat();
    o[s] = { ...o[s], type: i || "" }, F(this, this.customizationChangedEvent, o);
  }
  _removeRow(e) {
    e.stopPropagation();
    const i = e.currentTarget.index;
    if (i != null) {
      const s = this.customization.concat();
      s.splice(i, 1), F(
        this,
        this.customizationChangedEvent,
        s
      );
    }
  }
  _editRow(e) {
    e.stopPropagation();
    const i = e.target.index;
    i != null && F(this, "edit-item", i);
  }
  _addRow(e) {
    if (e.stopPropagation(), !this.customization || !this.hass)
      return;
    const i = this.shadowRoot.querySelector(
      ".add-customization"
    );
    if (!i || !i.value)
      return;
    const o = { type: i.value };
    F(this, this.customizationChangedEvent, [
      ...this.customization,
      o
    ]), i.value = "";
  }
  static get styles() {
    return ke`
      .customization {
        margin-top: 16px;
      }
      .customize-item,
      .add-item {
        display: flex;
        align-items: center;
      }
      .add-customization,
      .select-customization {
        width: 100%;
        margin-top: 8px;
      }
      .remove-icon,
      .edit-icon {
        --mdc-icon-button-size: 36px;
        color: var(--secondary-text-color);
        padding-left: 4px;
      }
    `;
  }
}
Z([
  I({ attribute: !1 })
], Ee.prototype, "hass", 2);
Z([
  I({ type: Array })
], Ee.prototype, "SelectOptions", 2);
let At = class extends Ee {
  constructor() {
    super(...arguments), this.customizationChangedEvent = "config-changed";
  }
  get customization() {
    return this.customization_domain;
  }
};
Z([
  I({ attribute: !1 })
], At.prototype, "customization_domain", 2);
At = Z([
  le("domain-items-editor")
], At);
let Et = class extends Ee {
  constructor() {
    super(...arguments), this.customizationChangedEvent = "config-changed";
  }
  get customization() {
    return this.customization_alert;
  }
};
Z([
  I({ attribute: !1 })
], Et.prototype, "customization_alert", 2);
Et = Z([
  le("alert-items-editor")
], Et);
let St = class extends Ee {
  constructor() {
    super(...arguments), this.customizationChangedEvent = "config-changed";
  }
  get customization() {
    return this.customization_cover;
  }
};
Z([
  I({ attribute: !1 })
], St.prototype, "customization_cover", 2);
St = Z([
  le("cover-items-editor")
], St);
let Ot = class extends Ee {
  constructor() {
    super(...arguments), this.customizationChangedEvent = "config-changed";
  }
  get customization() {
    return this.customization_sensor;
  }
};
Z([
  I({ attribute: !1 })
], Ot.prototype, "customization_sensor", 2);
Ot = Z([
  le("sensor-items-editor")
], Ot);
let kt = class extends Ee {
  constructor() {
    super(...arguments), this.customizationChangedEvent = "config-changed";
  }
  get customization() {
    return this.customization_popup;
  }
};
Z([
  I({ attribute: !1 })
], kt.prototype, "customization_popup", 2);
kt = Z([
  le("popup-items-editor")
], kt);
let Ye = class extends te {
  _editRow(t) {
    t.stopPropagation();
    const e = t.currentTarget.index;
    F(this, "edit-item", e);
  }
  _removeRow(t) {
    if (t.stopPropagation(), !this.custom_buttons) return;
    const e = t.currentTarget.index, i = [...this.custom_buttons];
    i.splice(e, 1), F(this, "config-changed", i);
  }
  _addRow() {
    const t = {
      name: "",
      icon: "",
      tap_action: { action: "none" }
    }, e = [...this.custom_buttons || [], t];
    F(this, "config-changed", e);
  }
  render() {
    var t;
    return this.hass ? $`
      <div class="custom-buttons">
        ${(t = this.custom_buttons) == null ? void 0 : t.map(
      (e, i) => $`
            <div class="row">
              <div class="item">
                <ha-icon
                  .icon=${e.icon || "mdi:gesture-tap-button"}
                ></ha-icon>
                <span class="name"
                  >${e.name || `Button ${i + 1}`}</span
                >
              </div>
              <ha-icon-button
                .label=${this.hass.localize("ui.common.edit")}
                .path=${wi}
                .index=${i}
                @click=${this._editRow}
              ></ha-icon-button>
              <ha-icon-button
                .label=${this.hass.localize("ui.common.remove")}
                .path=${Bt}
                .index=${i}
                @click=${this._removeRow}
              ></ha-icon-button>
            </div>
          `
    )}
        <div class="add-button-container">
          <mwc-button @click=${this._addRow} class="add-btn" outlined>
            Add Custom Button
          </mwc-button>
        </div>
      </div>
    ` : w;
  }
};
Ye.styles = ke`
    .row {
      display: flex;
      align-items: center;
      padding: 4px 0;
    }
    .item {
      flex-grow: 1;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .name {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 16px;
    }
    .add-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background-color: var(--primary-color);
      color: white;
      font-weight: 500;
      -webkit-align-self: flex-start;
      -ms-flex-item-align: flex-start;
      align-self: flex-start;
    }
    ha-icon {
      color: var(--secondary-text-color);
    }
    .add-button-container {
      padding: 8px 0;
      text-align: right;
    }
  `;
Z([
  I({ attribute: !1 })
], Ye.prototype, "hass", 2);
Z([
  I({ attribute: !1 })
], Ye.prototype, "custom_buttons", 2);
Ye = Z([
  le("custom-buttons-editor")
], Ye);
var Ks = Object.defineProperty, Ws = Object.getOwnPropertyDescriptor, ze = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Ws(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && Ks(e, i, o), o;
};
let Ae = class extends te {
  constructor() {
    super(...arguments), this.useSensorSchema = !1, this._schemadomain = A(() => {
      var i;
      const t = [
        "more-info",
        "toggle",
        "navigate",
        "url",
        "perform-action",
        "none"
      ], e = [
        { name: "icon", selector: { icon: {} } },
        {
          name: "color",
          selector: { ui_color: { default_color: "state", include_state: !0 } }
        },
        { name: "css", selector: { template: {} } },
        { name: "icon_css", selector: { template: {} } },
        {
          name: "tap_action",
          selector: { ui_action: { actions: t } }
        },
        {
          name: "double_tap_action",
          selector: { ui_action: { actions: t } }
        },
        {
          name: "hold_action",
          selector: { ui_action: { actions: t } }
        },
        { name: "popup_card", selector: { object: {} } }
      ];
      return ((i = this._config) == null ? void 0 : i.type) === "climate" && e.unshift({
        name: "display_mode",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "text", label: "Text" },
              { value: "icon", label: "Icon" },
              { value: "text_icon", label: "Text + Icon" }
            ]
          }
        }
      }), e;
    }), this._schemaalert = A(() => {
      const t = [
        "more-info",
        "navigate",
        "url",
        "perform-action",
        "none"
      ];
      return [
        { name: "invert", selector: { boolean: {} } },
        { name: "icon", selector: { icon: {} } },
        {
          name: "color",
          selector: { ui_color: { default_color: "state", include_state: !0 } }
        },
        { name: "css", selector: { template: {} } },
        { name: "icon_css", selector: { template: {} } },
        {
          name: "tap_action",
          selector: { ui_action: { actions: t } }
        },
        {
          name: "double_tap_action",
          selector: { ui_action: { actions: t } }
        },
        {
          name: "hold_action",
          selector: { ui_action: { actions: t } }
        },
        { name: "popup_card", selector: { object: {} } }
      ];
    }), this._schemasensor = A(() => {
      const t = [
        "more-info",
        "navigate",
        "url",
        "perform-action",
        "none"
      ];
      return [
        { name: "invert", selector: { boolean: {} } },
        {
          name: "color",
          selector: { ui_color: { default_color: "state", include_state: !0 } }
        },
        { name: "css", selector: { template: {} } },
        {
          name: "tap_action",
          selector: { ui_action: { actions: t } }
        },
        {
          name: "double_tap_action",
          selector: { ui_action: { actions: t } }
        },
        {
          name: "hold_action",
          selector: { ui_action: { actions: t } }
        },
        { name: "popup_card", selector: { object: {} } }
      ];
    }), this._schemacustombutton = A(() => {
      const t = [
        "more-info",
        "toggle",
        "navigate",
        "url",
        "perform-action",
        "none"
      ];
      return [
        { name: "name", selector: { text: {} } },
        { name: "icon", selector: { icon: {} } },
        {
          name: "color",
          selector: { ui_color: { default_color: "state", include_state: !0 } }
        },
        {
          name: "tap_action",
          selector: { ui_action: { actions: t } }
        },
        {
          name: "double_tap_action",
          selector: { ui_action: { actions: t } }
        },
        {
          name: "hold_action",
          selector: { ui_action: { actions: t } }
        }
      ];
    }), this._computeLabelCallback = (t) => {
      switch (t.name) {
        case "color":
          return this.hass.localize("ui.panel.lovelace.editor.card.tile.color");
        case "enable_popup_view":
          return this.hass.localize("ui.common.enable") + " " + this.hass.localize(
            "ui.panel.lovelace.editor.action-editor.actions.more-info"
          );
        case "disable_toggle_action":
          return this.hass.localize("ui.common.disable") + " " + this.hass.localize(
            "ui.panel.lovelace.editor.card.generic.tap_action"
          );
        case "css":
          return "CSS";
        case "icon_css":
          return this.hass.localize("ui.panel.lovelace.editor.card.generic.icon") + " CSS";
        case "display_mode":
          return "Display Mode";
        case "popup_card":
          return "Change Popup Card Type";
        case "icon":
        case "tap_action":
        case "hold_action":
        case "double_tap_action":
          return this.hass.localize(
            `ui.panel.lovelace.editor.card.generic.${t.name}`
          );
        case "invert":
        case "invert_state":
          return this.hass.localize(
            "ui.dialogs.entity_registry.editor.invert.label"
          );
        default:
          return this.hass.localize(
            `ui.panel.lovelace.editor.card.area.${t.name}`
          );
      }
    };
  }
  updated(t) {
    t.has("config") && this.config && (this._config = { ...this.config });
  }
  render() {
    if (!this.hass || !this.config)
      return $``;
    this._config || (this._config = { ...this.config, area: this.config.area || "" });
    let t;
    switch (this.getSchema) {
      case "sensor":
        t = this._schemasensor();
        break;
      case "domain":
        t = this._schemadomain();
        break;
      case "alert":
      case "cover":
        t = this._schemaalert();
        break;
      case "custom_button":
        t = this._schemacustombutton();
        break;
    }
    const e = { ...this._config };
    return $`
      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${t}
        .computeLabel=${this._computeLabelCallback}
        @value-changed=${this._valueChangedSchema}
      ></ha-form>
    `;
  }
  _valueChangedSchema(t) {
    if (!this.config)
      return;
    const e = {
      ...this.config,
      ...t.detail.value
    };
    this._config = e, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: e
      })
    );
  }
  static get styles() {
    return ke`
      .checkbox {
        display: flex;
        align-items: center;
        padding: 8px 0;
      }
      .checkbox input {
        height: 20px;
        width: 20px;
        margin-left: 0;
        margin-right: 8px;
      }
      h3 {
        margin-bottom: 0.5em;
      }
      .row {
        margin-bottom: 12px;
        margin-top: 12px;
        display: block;
      }
      .side-by-side {
        display: flex;
      }
      .side-by-side > * {
        flex: 1 1 0%;
        padding-right: 4px;
      }
    `;
  }
};
ze([
  I({ attribute: !1 })
], Ae.prototype, "config", 2);
ze([
  I({ attribute: !1 })
], Ae.prototype, "hass", 2);
ze([
  I({ type: Boolean })
], Ae.prototype, "useSensorSchema", 2);
ze([
  K()
], Ae.prototype, "getSchema", 2);
ze([
  K()
], Ae.prototype, "_config", 2);
Ae = ze([
  le("item-editor")
], Ae);
var Gs = Object.defineProperty, Zs = Object.getOwnPropertyDescriptor, se = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Zs(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && Gs(e, i, o), o;
};
let X = class extends te {
  constructor() {
    super(...arguments), this._subElementEditorDomain = void 0, this._subElementEditorAlert = void 0, this._subElementEditorCover = void 0, this._subElementEditorSensor = void 0, this._subElementEditorCustomButton = void 0, this.computeLabel = A((t) => xi(this.hass, t)), this._schema = A((t, e) => {
      const i = (n) => this.hass.localize(n) || n, s = [
        "more-info",
        "navigate",
        "url",
        "perform-action",
        "none"
      ], o = [
        {
          value: "icon",
          label: i("ui.panel.lovelace.editor.card.generic.icon")
        },
        {
          value: "image",
          label: i("ui.components.selectors.image.image")
        },
        {
          value: "icon + image",
          label: `${i(
            "ui.panel.lovelace.editor.card.generic.icon"
          )} & ${i("ui.components.selectors.image.image")}`
        }
      ];
      return [
        { name: "area", selector: { area: {} } },
        {
          name: "appearance",
          flatten: !0,
          type: "expandable",
          icon: "mdi:palette",
          schema: [
            { name: "theme", required: !1, selector: { theme: {} } },
            {
              name: "layout",
              required: !0,
              selector: {
                select: {
                  mode: "box",
                  options: ["vertical", "horizontal"].map((n) => ({
                    label: i(
                      `ui.panel.lovelace.editor.card.tile.content_layout_options.${n}`
                    ),
                    value: n
                  }))
                }
              }
            },
            {
              name: "design",
              selector: {
                select: { mode: "box", options: ["V1", "V2"] }
              }
            },
            ...e === "V2" ? [
              {
                name: "v2_color",
                selector: {
                  color_rgb: { default_color: "state", include_state: !0 }
                }
              }
            ] : [],
            { name: "mirrored", selector: { boolean: {} } },
            { name: "show_camera", required: !1, selector: { boolean: {} } },
            ...t ? [
              {
                name: "camera_view",
                selector: { select: { options: ["auto", "live"] } }
              }
            ] : [],
            {
              name: "show_icon",
              selector: { select: { options: o, mode: "dropdown" } }
            },
            { name: "area_icon", selector: { icon: {} } },
            {
              name: "area_icon_color",
              selector: {
                ui_color: { default_color: "state", include_state: !0 }
              }
            },
            { name: "area_name", selector: { text: {} } },
            {
              name: "area_name_color",
              selector: {
                ui_color: { default_color: "state", include_state: !0 }
              }
            },
            {
              name: "css",
              flatten: !0,
              type: "expandable",
              icon: "mdi:palette",
              schema: [
                { name: "icon_css", selector: { template: {} } },
                { name: "name_css", selector: { template: {} } }
              ]
            },
            { name: "tap_action", selector: { ui_action: { actions: s } } },
            { name: "double_tap_action", selector: { ui_action: { actions: s } } },
            { name: "hold_action", selector: { ui_action: { actions: s } } }
          ]
        }
      ];
    }), this._binaryschema = A((t) => [
      {
        name: "alert_classes",
        selector: {
          select: {
            reorder: !0,
            multiple: !0,
            custom_value: !0,
            options: t
          }
        }
      },
      {
        name: "alert_color",
        selector: { ui_color: { default_color: "state", include_state: !0 } }
      },
      { name: "alert_css", selector: { template: {} } }
    ]), this._coverschema = A((t) => [
      {
        name: "cover_classes",
        selector: {
          select: {
            reorder: !0,
            multiple: !0,
            custom_value: !0,
            options: t
          }
        }
      },
      {
        name: "cover_color",
        selector: { ui_color: { default_color: "state", include_state: !0 } }
      },
      { name: "cover_css", selector: { template: {} } }
    ]), this._sensorschema = A((t) => [
      {
        name: "",
        type: "grid",
        schema: [
          { name: "show_sensor_icons", selector: { boolean: {} } },
          { name: "wrap_sensor_icons", selector: { boolean: {} } }
        ]
      },
      {
        name: "sensor_classes",
        selector: {
          select: {
            reorder: !0,
            multiple: !0,
            custom_value: !0,
            options: t
          }
        }
      },
      {
        name: "sensor_color",
        selector: { ui_color: { default_color: "state", include_state: !0 } }
      }
    ]), this._toggleschema = A((t) => [
      {
        name: "toggle_domains",
        selector: {
          select: {
            reorder: !0,
            multiple: !0,
            custom_value: !0,
            options: t
          }
        }
      },
      {
        name: "domain_color",
        selector: { ui_color: { default_color: "state", include_state: !0 } }
      },
      { name: "domain_css", selector: { template: {} } },
      { name: "show_active", selector: { boolean: {} } }
    ]), this._popupschema = A(
      (t, e) => {
        const i = this.computeLabel({ name: "name" }), s = this.computeLabel({ name: "state" });
        return [
          {
            name: "columns",
            selector: { number: { min: 1, max: 4, mode: "box" } }
          },
          {
            name: "",
            type: "grid",
            schema: [
              {
                name: "ungroup_areas",
                selector: { boolean: {} }
              },
              { name: "hide_unavailable", selector: { boolean: {} } }
            ]
          },
          {
            name: "popup_sort",
            selector: {
              select: {
                options: [
                  { value: "name", label: i },
                  { value: "state", label: s }
                ]
              }
            }
          },
          {
            name: "popup_domains",
            selector: {
              select: {
                reorder: !0,
                multiple: !0,
                custom_value: !0,
                options: t
              }
            }
          },
          {
            name: "edit_filters",
            flatten: !0,
            type: "expandable",
            icon: "mdi:eye-plus",
            schema: [{ name: "label", selector: { label: { multiple: !0 } } }]
          },
          {
            name: "extra_entities",
            flatten: !0,
            type: "expandable",
            icon: "mdi:eye-plus",
            schema: [
              {
                name: "extra_entities",
                selector: { entity: { multiple: !0 } }
              }
            ]
          }
        ];
      }
    ), this._binaryClassesForArea = A(
      (t) => this._classesForArea(t, "binary_sensor")
    ), this._coverClassesForArea = A(
      (t) => this._classesForArea(t, "cover")
    ), this._sensorClassesForArea = A(
      (t, e) => this._classesForArea(t, "sensor", e)
    ), this._toggleDomainsForArea = A(
      (t) => this._classesForArea(t, "toggle")
    ), this._allDomainsForArea = A(
      (t) => this._classesForArea(t, "all")
    ), this._buildBinaryOptions = A(
      (t, e) => this._buildOptions("binary_sensor", t, e)
    ), this._buildCoverOptions = A(
      (t, e) => this._buildOptions("cover", t, e)
    ), this._buildSensorOptions = A(
      (t, e) => this._buildOptions("sensor", t, e)
    ), this._buildToggleOptions = A(
      (t, e) => this._buildOptions("toggle", t, e)
    ), this._buildAllOptions = A(
      (t, e) => this._buildOptions("all", t, e)
    ), this._entityOptions = [], this._toggleEntityHidden = (t) => {
      var s;
      const e = new Set(((s = this._config) == null ? void 0 : s.hidden_entities) ?? []);
      e.has(t) ? e.delete(t) : e.add(t);
      const i = Array.from(e);
      this._config = {
        ...this._config || {},
        hidden_entities: i
      }, F(this, "config-changed", { config: { ...this._config } });
    };
  }
  _classesForArea(t, e, i) {
    var o;
    let s;
    if (e === "toggle")
      return s = Object.values(this.hass.entities).filter(
        (n) => {
          var a;
          return (Ge.includes(q(n.entity_id)) || $t.includes(q(n.entity_id))) && !n.hidden && (n.area_id === t || n.device_id && ((a = this.hass.devices[n.device_id]) == null ? void 0 : a.area_id) === t);
        }
      ), [...new Set(s.map((n) => q(n.entity_id)))];
    if (e === "all") {
      const n = ((o = this._config) == null ? void 0 : o.extra_entities) || [];
      let a = Object.values(this.hass.entities).filter(
        (c) => {
          var l;
          return !c.hidden && (c.area_id === t || c.device_id && ((l = this.hass.devices[c.device_id]) == null ? void 0 : l.area_id) === t);
        }
      );
      const r = n.map((c) => this.hass.states[c]).filter((c) => c !== void 0);
      return a = [...a, ...r], [...new Set(a.map((c) => q(c.entity_id)))];
    } else {
      s = Object.values(this.hass.entities).filter(
        (a) => {
          var r;
          return q(a.entity_id) === e && !a.entity_category && !a.hidden && (a.area_id === t || a.device_id && ((r = this.hass.devices[a.device_id]) == null ? void 0 : r.area_id) === t);
        }
      );
      const n = s.map(
        (a) => {
          var r;
          return ((r = this.hass.states[a.entity_id]) == null ? void 0 : r.attributes.device_class) || "";
        }
      ).filter(
        (a) => a && (e !== "sensor" || !i || i.includes(a))
      );
      return [...new Set(n)];
    }
  }
  _buildOptions(t, e, i) {
    const o = [.../* @__PURE__ */ new Set([...e, ...i])].map((n) => ({
      value: n,
      label: n === "scene" ? "Scene" : t === "toggle" || t === "all" ? this.hass.localize(
        `component.${n}.entity_component._.name`
      ) || n : this.hass.localize(
        `component.${t}.entity_component.${n}.name`
      ) || n
    }));
    return o.sort(
      (n, a) => vi(n.label, a.label, this.hass.locale.language)
    ), o;
  }
  setConfig(t) {
    this._config = {
      ...t,
      columns: t.columns || 4,
      mirrored: t.mirrored || !1,
      customization_domain: t.customization_domain || [],
      customization_alert: t.customization_alert || [],
      customization_cover: t.customization_cover || [],
      customization_sensor: t.customization_sensor || [],
      custom_buttons: t.custom_buttons || []
    };
  }
  async updated(t) {
    var e;
    if (super.updated(t), !(!this.hass || !this._config)) {
      if (t.has("_config")) {
        const i = t.get("_config"), s = i == null ? void 0 : i.area, o = this._config.area, n = (i == null ? void 0 : i.extra_entities) || [], a = this._config.extra_entities || [], r = (i == null ? void 0 : i.popup_domains) || [], c = ((e = this._config) == null ? void 0 : e.popup_domains) || [], l = n.length !== a.length || !n.every(
          (h) => a.includes(h)
        ), d = r.length !== c.length || !r.every(
          (h) => c.includes(h)
        );
        if (s !== void 0 && s !== o) {
          const h = this._toggleDomainsForArea(o), _ = this._binaryClassesForArea(o), p = this._coverClassesForArea(o), v = this._allDomainsForArea(o), m = h.sort(
            (x, N) => Ge.indexOf(x) - Ge.indexOf(N)
          ), u = v.sort(
            (x, N) => wt.indexOf(x) - wt.indexOf(N)
          );
          if (this._config.toggle_domains = [
            ...m.filter((x) => x !== "scene" && x !== "script")
          ], this._config.alert_classes = [..._], this._config.cover_classes = [...p], this._config.popup_domains = [...u], this._config.customization_domain = [], this._config.customization_alert = [], this._config.customization_cover = [], this._config.customization_sensor = [], this._updateEntityOptions(), Array.isArray(this._config.hidden_entities)) {
            const x = this._config.hidden_entities, N = Object.values(this._hiddenEntitiesByDomain()).flat(), E = x.filter((C) => N.includes(C));
            E.length !== x.length && (this._config = {
              ...this._config || {},
              hidden_entities: E
            }, F(this, "config-changed", { config: { ...this._config } }));
          }
          this.requestUpdate();
        }
        if (l) {
          for (const h of a) {
            const _ = q(h);
            this._config.popup_domains.includes(_) || this._config.popup_domains.push(_);
          }
          this.requestUpdate();
        }
        d && this._updateEntityOptions();
      }
      if (!this._numericDeviceClasses) {
        const { numeric_device_classes: i } = await ys(this.hass);
        this._numericDeviceClasses = i;
      }
    }
  }
  _updateEntityOptions() {
    if (!this._config || !this.hass) return;
    const t = this._config.area, e = this._config.popup_domains || [];
    this._entityOptions = Object.values(this.hass.entities).filter(
      (i) => {
        var s;
        return !i.hidden && e.includes(q(i.entity_id)) && (i.area_id === t || i.device_id && ((s = this.hass.devices[i.device_id]) == null ? void 0 : s.area_id) === t);
      }
    ).map((i) => ({
      value: i.entity_id,
      label: i.entity_id
    })).sort((i, s) => i.value.localeCompare(s.value)), this._valueChanged({ detail: { value: this._config } });
  }
  _valueChanged(t) {
    this._config = t.detail.value, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config }
      })
    );
  }
  _isHiddenEntity(t) {
    var i;
    const e = ((i = this._config) == null ? void 0 : i.hidden_entities) ?? [];
    return Array.isArray(e) && e.includes(t);
  }
  _hiddenCategoryChanged(t) {
    var i, s;
    const e = (s = (i = t.detail) == null ? void 0 : i.value) == null ? void 0 : s.category_filter;
    this._config = {
      ...this._config || {},
      category_filter: e
    }, F(this, "config-changed", { config: { ...this._config } });
  }
  _editItem(t, e) {
    if (t.stopPropagation(), !this._config || !this.hass)
      return;
    const i = t.detail;
    this[`_subElementEditor${e}`] = { index: i };
  }
  _edit_itemDomain(t) {
    this._editItem(t, "Domain");
  }
  _edit_itemAlert(t) {
    this._editItem(t, "Alert");
  }
  _edit_itemCover(t) {
    this._editItem(t, "Cover");
  }
  _edit_itemSensor(t) {
    this._editItem(t, "Sensor");
  }
  _customizationChanged(t, e) {
    t.stopPropagation(), !(!this._config || !this.hass) && F(this, "config-changed", {
      config: {
        ...this._config,
        [`customization_${e}`]: t.detail
      }
    });
  }
  _customizationChangedDomain(t) {
    this._customizationChanged(t, "domain");
  }
  _customizationChangedAlert(t) {
    this._customizationChanged(t, "alert");
  }
  _customizationChangedCover(t) {
    this._customizationChanged(t, "cover");
  }
  _customizationChangedSensor(t) {
    this._customizationChanged(t, "sensor");
  }
  _renderSubElementEditorCustomButton() {
    var i, s, o;
    const t = ((i = this._subElementEditorCustomButton) == null ? void 0 : i.index) ?? 0, e = ((o = (s = this._config) == null ? void 0 : s.custom_buttons) == null ? void 0 : o[t]) || {};
    return $`
      <div class="header">
        <div class="back-title">
          <mwc-icon-button @click=${this._goBackCustomButton}>
            <ha-icon icon="mdi:chevron-left"></ha-icon>
          </mwc-icon-button>
          <span slot="title"
            >${this.hass.localize(
      "ui.panel.lovelace.editor.card.generic.edit_button"
    )}</span
          >
        </div>
      </div>
      <item-editor
        .hass=${this.hass}
        .config=${e}
        .getSchema=${"custom_button"}
        @config-changed=${this._itemChangedCustomButton}
      ></item-editor>
    `;
  }
  _edit_itemCustomButton(t) {
    t.stopPropagation(), !(!this._config || !this.hass) && (this._subElementEditorCustomButton = { index: t.detail });
  }
  _goBackCustomButton() {
    this._subElementEditorCustomButton = void 0;
  }
  _itemChangedCustomButton(t) {
    var i;
    if (t.stopPropagation(), !this._config || !this.hass)
      return;
    const e = (i = this._subElementEditorCustomButton) == null ? void 0 : i.index;
    if (e !== void 0) {
      const s = [...this._config.custom_buttons || []];
      s[e] = t.detail, F(this, "config-changed", {
        config: { ...this._config, custom_buttons: s }
      });
    }
  }
  _customizationChangedCustomButtons(t) {
    if (t.stopPropagation(), !this._config || !this.hass)
      return;
    const e = t.detail;
    F(this, "config-changed", {
      config: {
        ...this._config,
        custom_buttons: e
      }
    });
  }
  _renderSubElementEditor(t, e, i) {
    var d, h, _;
    const s = `customization_${t}`, o = (d = this._config) == null ? void 0 : d[s], n = `_subElementEditor${t.charAt(0).toUpperCase() + t.slice(1)}`, a = ((h = this[n]) == null ? void 0 : h.index) ?? 0, r = ((_ = o == null ? void 0 : o[a]) == null ? void 0 : _.type) ?? "unknown", c = r.match(/^(.+?)\s*-\s*(.+)$/);
    let l;
    if (c) {
      const p = c[1].toLowerCase().replace(" ", "_"), v = c[2].toLowerCase(), m = this.hass.localize(`component.${p}.entity_component._.name`) || c[1];
      let u = this.hass.localize(
        `ui.dialogs.entity_registry.editor.device_classes.${p}.${v}`
      ) || c[2];
      u = u.charAt(0).toUpperCase() + u.slice(1), l = `${m} – ${u}`;
    } else {
      let p = this.hass.localize(`component.${r}.entity_component._.name`) || r;
      p = p.charAt(0).toUpperCase() + p.slice(1), l = p;
    }
    return $`
      <div class="header">
        <div class="back-title">
          <mwc-icon-button @click=${e}>
            <ha-icon icon="mdi:chevron-left"></ha-icon>
          </mwc-icon-button>
          <span slot="title">${l}</span>
        </div>
      </div>
      <item-editor
        .hass=${this.hass}
        .config=${(o == null ? void 0 : o[a]) || {}}
        .getSchema=${t}
        @config-changed=${i}
      ></item-editor>
    `;
  }
  _renderSubElementEditorByKey(t) {
    return this._renderSubElementEditor(
      t,
      () => this._goBackByKey(t),
      (e) => this._itemChangedByKey(e, t)
    );
  }
  _goBackByKey(t) {
    const e = `_subElementEditor${t.charAt(0).toUpperCase() + t.slice(1)}`;
    this[e] = void 0;
  }
  _itemChangedByKey(t, e) {
    const i = `_subElementEditor${e.charAt(0).toUpperCase() + e.slice(1)}`, s = this[i], o = `customization_${e}`;
    this._itemChanged(t, s, o);
  }
  _itemChanged(t, e, i) {
    if (t.stopPropagation(), !this._config || !this.hass)
      return;
    const s = e == null ? void 0 : e.index;
    if (s != null) {
      const o = [...this._config[i]];
      o[s] = t.detail, F(this, "config-changed", {
        config: { ...this._config, [i]: o }
      });
    }
  }
  get toggleSelectOptions() {
    return this._selectOptions("toggle");
  }
  get AllSelectOptions() {
    return this._selectOptions("all");
  }
  get binarySelectOptions() {
    return this._selectOptions("binary");
  }
  get coverSelectOptions() {
    return this._selectOptions("cover");
  }
  get sensorSelectOptions() {
    return this._selectOptions("sensor");
  }
  _selectOptions(t) {
    var i, s, o, n, a, r;
    const e = ((i = this._config) == null ? void 0 : i.area) || "";
    switch (t) {
      case "toggle":
        return this._buildToggleOptions(
          this._toggleDomainsForArea(e),
          ((s = this._config) == null ? void 0 : s.toggle_domains) || this._toggleDomainsForArea(e)
        );
      case "all":
        return this._buildAllOptions(
          this._allDomainsForArea(e),
          ((o = this._config) == null ? void 0 : o.popup_domains) || this._allDomainsForArea(e)
        );
      case "binary":
        return this._buildBinaryOptions(
          this._binaryClassesForArea(e),
          ((n = this._config) == null ? void 0 : n.alert_classes) || this._binaryClassesForArea(e)
        );
      case "cover":
        return this._buildCoverOptions(
          this._coverClassesForArea(e),
          ((a = this._config) == null ? void 0 : a.cover_classes) || this._coverClassesForArea(e)
        );
      case "sensor":
        return this._buildSensorOptions(
          this._sensorClassesForArea(e),
          ((r = this._config) == null ? void 0 : r.sensor_classes) || this._sensorClassesForArea(e)
        );
    }
  }
  get entityOptions() {
    return this._entityOptions;
  }
  _domainIcon(t, e = "on", i) {
    const s = Ct;
    if (t in s) {
      const o = s[t];
      return typeof o == "string" ? o : i && o[i] ? o[i][e === "off" ? "off" : "on"] || o[i] : o[e === "off" ? "off" : "on"] || Object.values(o)[0];
    }
    return "mdi:help-circle";
  }
  _groupAllEntitiesByDomain() {
    var a;
    const t = {}, e = (this.entityOptions || []).map((r) => r.value);
    for (const r of e) {
      const c = q(r);
      t[c] || (t[c] = []), t[c].push(r);
    }
    const i = this._hiddenEntitiesByDomain(), s = Array.from(
      /* @__PURE__ */ new Set([...Object.keys(t), ...Object.keys(i)])
    ), o = ((a = this.hass) == null ? void 0 : a.states) || {}, n = this.compareByFriendlyName ? this.compareByFriendlyName(o, this.hass.locale.language) : (r, c) => r.localeCompare(c);
    return s.sort((r, c) => r.localeCompare(c)).map((r) => {
      const c = /* @__PURE__ */ new Set([
        ...t[r] || [],
        ...i[r] || []
      ]);
      return { domain: r, entities: Array.from(c).sort(n) };
    });
  }
  _domainLabel(t) {
    var e, i;
    return ((i = (e = this.hass) == null ? void 0 : e.localize) == null ? void 0 : i.call(e, `component.${t}.entity_component._.name`)) || t;
  }
  _getDeviceClassLabel(t, e) {
    if (!e || e === "other")
      return this.hass.localize("ui.dialogs.helper_settings.generic.other") ?? "Other";
    const i = `ui.dialogs.entity_registry.editor.device_classes.${t}.${e}`;
    return this.hass.localize(i) || e;
  }
  _groupByDeviceClass(t, e) {
    var a, r, c;
    const i = ((a = this.hass) == null ? void 0 : a.states) || {}, s = {};
    for (const l of e) {
      const d = ((c = (r = i[l]) == null ? void 0 : r.attributes) == null ? void 0 : c.device_class) || "";
      d && (s[d] || (s[d] = []), s[d].push(l));
    }
    const o = this.compareByFriendlyName ? this.compareByFriendlyName(i, this.hass.locale.language) : (l, d) => l.localeCompare(d);
    return Object.keys(s).sort((l, d) => l.localeCompare(d)).map((l) => ({
      deviceClass: l,
      label: this._getDeviceClassLabel(t, l),
      entities: s[l].slice().sort(o)
    }));
  }
  _hiddenEntitiesByDomain() {
    var h, _, p, v, m, u, x;
    const t = {}, e = Array.isArray((h = this._config) == null ? void 0 : h.hidden_entities) ? this._config.hidden_entities : [];
    if (e.length === 0) return t;
    const i = ((_ = this.hass) == null ? void 0 : _.entities) || {}, s = ((p = this.hass) == null ? void 0 : p.devices) || {}, o = (v = this.hass) != null && v.areas ? Object.values(this.hass.areas) : [], n = (m = this._config) == null ? void 0 : m.area, a = (u = this._config) == null ? void 0 : u.floor, r = (x = this._config) == null ? void 0 : x.label, c = n ? Array.isArray(n) ? n : [n] : [], l = a ? Array.isArray(a) ? a : [a] : [], d = r ? Array.isArray(r) ? r : [r] : [];
    for (const N of e) {
      const E = q(N), C = i[N], M = C != null && C.device_id ? s[C.device_id] : void 0;
      if (((C == null ? void 0 : C.area_id) != null || (M == null ? void 0 : M.area_id) != null) && !(d.length && !(Array.isArray(C == null ? void 0 : C.labels) && C.labels.some((D) => d.includes(D)) || Array.isArray(M == null ? void 0 : M.labels) && M.labels.some((D) => d.includes(D)))) && !(c.length && !(C != null && C.area_id && c.includes(C.area_id) || M != null && M.area_id && c.includes(M.area_id)))) {
        if (l.length) {
          const G = (C == null ? void 0 : C.area_id) && o.some(
            (J) => J.area_id === C.area_id && J.floor_id && l.includes(J.floor_id)
          ), D = (M == null ? void 0 : M.area_id) && o.some(
            (J) => J.area_id === M.area_id && J.floor_id && l.includes(J.floor_id)
          );
          if (!G && !D) continue;
        }
        t[E] || (t[E] = []), t[E].push(N);
      }
    }
    return t;
  }
  render() {
    var h;
    if (!this.hass || !this._config)
      return w;
    const t = this._toggleDomainsForArea(
      this._config.area || ""
    ), e = this._binaryClassesForArea(
      this._config.area || ""
    ), i = this._coverClassesForArea(
      this._config.area || ""
    ), s = this._allDomainsForArea(this._config.area || ""), o = this._schema(
      this._config.show_camera || !1,
      this._config.design || "V1"
    ), n = this._binaryschema(this.binarySelectOptions), a = this._coverschema(this.coverSelectOptions), r = this._sensorschema(this.sensorSelectOptions), c = this._toggleschema(this.toggleSelectOptions), l = this._popupschema(
      this.AllSelectOptions,
      this.entityOptions
    ), d = {
      alert_classes: e,
      cover_classes: i,
      sensor_classes: xt.sensor,
      toggle_domains: t,
      popup_domains: s,
      ...this._config
    };
    return this._subElementEditorDomain ? this._renderSubElementEditorByKey("domain") : this._subElementEditorAlert ? this._renderSubElementEditorByKey("alert") : this._subElementEditorCover ? this._renderSubElementEditorByKey("cover") : this._subElementEditorSensor ? this._renderSubElementEditorByKey("sensor") : this._subElementEditorCustomButton ? this._renderSubElementEditorCustomButton() : $`
      <ha-form
        .hass=${this.hass}
        .data=${d}
        .schema=${o}
        .computeLabel=${this.computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${Ms}></ha-svg-icon>
          ${this.computeLabel({ name: "alert_classes" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${d}
            .schema=${n}
            .computeLabel=${this.computeLabel}
            @value-changed=${this._valueChanged}
          ></ha-form>
          <alert-items-editor
            .hass=${this.hass}
            .customization_alert=${this._config.customization_alert}
            .SelectOptions=${this.binarySelectOptions}
            @edit-item=${this._edit_itemAlert}
            @config-changed=${this._customizationChangedAlert}
          >
          </alert-items-editor>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${Ts}></ha-svg-icon>
          ${this.computeLabel({ name: "cover_classes" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${d}
            .schema=${a}
            .computeLabel=${this.computeLabel}
            @value-changed=${this._valueChanged}
          ></ha-form>
          <cover-items-editor
            .hass=${this.hass}
            .customization_cover=${this._config.customization_cover}
            .SelectOptions=${this.coverSelectOptions}
            @edit-item=${this._edit_itemCover}
            @config-changed=${this._customizationChangedCover}
          >
          </cover-items-editor>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${Ps}></ha-svg-icon>
          ${this.computeLabel({ name: "sensor_classes" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${d}
            .schema=${r}
            .computeLabel=${this.computeLabel}
            @value-changed=${this._valueChanged}
          ></ha-form>
          <sensor-items-editor
            .hass=${this.hass}
            .customization_sensor=${this._config.customization_sensor}
            .SelectOptions=${this.sensorSelectOptions}
            @edit-item=${this._edit_itemSensor}
            @config-changed=${this._customizationChangedSensor}
          >
          </sensor-items-editor>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined class="main" .name="toggle_domains">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${Ls}></ha-svg-icon>
          ${this.computeLabel({ name: "toggle_domains" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${d}
            .schema=${c}
            .computeLabel=${this.computeLabel}
            @value-changed=${this._valueChanged}
          ></ha-form>
          <domain-items-editor
            .hass=${this.hass}
            .customization_domain=${this._config.customization_domain}
            .SelectOptions=${this.toggleSelectOptions}
            @edit-item=${this._edit_itemDomain}
            @config-changed=${this._customizationChangedDomain}
          >
          </domain-items-editor>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${Bs}></ha-svg-icon>
          Custom Buttons
        </div>
        <div class="content">
          <custom-buttons-editor
            .hass=${this.hass}
            .custom_buttons=${this._config.custom_buttons}
            @config-changed=${this._customizationChangedCustomButtons}
            @edit-item=${this._edit_itemCustomButton}
          >
          </custom-buttons-editor>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined class="main" .name="popup">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${Is}></ha-svg-icon>
          ${this.computeLabel({ name: "popup" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${d}
            .schema=${l}
            .computeLabel=${this.computeLabel}
            @value-changed=${this._valueChanged}
          ></ha-form>

          <ha-expansion-panel outlined class="main">
            <div slot="header" role="heading" aria-level="3">
              <ha-svg-icon .path=${bt}></ha-svg-icon>
              ${this.computeLabel({ name: "hidden_entities" })}
            </div>
            <div class="content">
              <!-- Category filter selector for hidden entities -->
              <ha-form
                .hass=${this.hass}
                .data=${{ category_filter: (h = this._config) == null ? void 0 : h.category_filter }}
                .schema=${[
      {
        name: "category_filter",
        selector: {
          select: {
            options: ["config", "diagnostic", "config+diagnostic"],
            mode: "dropdown"
          }
        }
      }
    ]}
                .computeLabel=${this.computeLabel}
                @value-changed=${(_) => this._hiddenCategoryChanged(_)}
              ></ha-form>
              ${this._groupAllEntitiesByDomain().map(
      (_) => $`
                  <ha-expansion-panel outlined class="domain-panel">
                    <div slot="header" class="domain-header">
                      <ha-icon
                        .icon=${this._domainIcon(_.domain, "on")}
                      ></ha-icon>
                      <span class="domain-title"
                        >${this._domainLabel(_.domain)}</span
                      >
                    </div>
                    <div class="content">
                      ${["binary_sensor", "cover"].includes(_.domain) ? this._groupByDeviceClass(
        _.domain,
        _.entities
      ).map(
        (p) => $`
                              <ha-expansion-panel outlined class="domain-panel">
                                <div slot="header" class="dc-header">
                                  <ha-icon
                                    .icon=${this._domainIcon(
          _.domain,
          "on",
          p.deviceClass
        )}
                                  ></ha-icon>
                                  <span class="dc-title">${p.label}</span>
                                </div>
                                <div class="content">
                                  ${p.entities.map(
          (v) => {
            var m, u;
            return $`
                                      <div class="entity-row">
                                        <span class="entity-name">
                                          ${((u = (m = this.hass.states[v]) == null ? void 0 : m.attributes) == null ? void 0 : u.friendly_name) || v}
                                        </span>
                                        <ha-icon-button
                                          .path=${this._isHiddenEntity(v) ? ri : bt}
                                          .label=${this._isHiddenEntity(v) ? this.hass.localize(
              "ui.common.show"
            ) ?? "Show" : this.hass.localize(
              "ui.common.hide"
            ) ?? "Hide"}
                                          @click=${() => this._toggleEntityHidden(v)}
                                        ></ha-icon-button>
                                      </div>
                                    `;
          }
        )}
                                </div>
                              </ha-expansion-panel>
                            `
      ) : _.entities.map(
        (p) => {
          var v, m;
          return $`
                              <div class="entity-row">
                                <span class="entity-name">
                                  ${((m = (v = this.hass.states[p]) == null ? void 0 : v.attributes) == null ? void 0 : m.friendly_name) || p}
                                </span>
                                <ha-icon-button
                                  .path=${this._isHiddenEntity(p) ? ri : bt}
                                  .label=${this._isHiddenEntity(p) ? this.hass.localize("ui.common.show") ?? "Show" : this.hass.localize("ui.common.hide") ?? "Hide"}
                                  @click=${() => this._toggleEntityHidden(p)}
                                ></ha-icon-button>
                              </div>
                            `;
        }
      )}
                    </div>
                  </ha-expansion-panel>
                `
    )}
            </div>
          </ha-expansion-panel>
        </div>
      </ha-expansion-panel>
    `;
  }
};
X.styles = ke`
    :host {
      display: block;
    }
    select {
      padding: 5px;
      font-size: 14px;
    }
    ha-svg-icon {
      color: var(--secondary-text-color);
    }
    .main {
      --ha-card-border-radius: 6px;
      border-radius: 6px;
      margin-top: 16px;
    }
    ha-svg-icon {
      color: var(--secondary-text-color);
    }
    .content {
      padding: 12px 4px;
    }
    .back-title {
      display: flex;
      align-items: center;
      font-size: 18px;
      gap: 0.5em;
    }
    ha-icon {
      display: flex;
    }
    .header {
      margin-bottom: 0.5em;
    }
    .entity-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 4px 0;
    }
    .entity-name {
      flex: 1 1 auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .domain-panel {
      margin-top: 6px;
    }
    .domain-header {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .domain-header ha-icon {
      --mdc-icon-size: 20px;
    }
    .dc-header {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .dc-header ha-icon {
      --mdc-icon-size: 20px;
    }
  `;
se([
  I({ attribute: !1 })
], X.prototype, "hass", 2);
se([
  K()
], X.prototype, "_config", 2);
se([
  K()
], X.prototype, "_entities", 2);
se([
  K()
], X.prototype, "_numericDeviceClasses", 2);
se([
  K()
], X.prototype, "_subElementEditorDomain", 2);
se([
  K()
], X.prototype, "_subElementEditorAlert", 2);
se([
  K()
], X.prototype, "_subElementEditorCover", 2);
se([
  K()
], X.prototype, "_subElementEditorSensor", 2);
se([
  K()
], X.prototype, "_subElementEditorCustomButton", 2);
X = se([
  le("area-card-plus-editor")
], X);
console.info(
  `%c AREA-CARD %c ${Ai.version} `,
  "color: steelblue; background: black; font-weight: bold;",
  "color: white ; background: dimgray; font-weight: bold;"
);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "area-card-plus",
  name: "Area Card Plus",
  preview: !0,
  description: "A custom card to display area information."
});
