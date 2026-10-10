/* ==========================================================
   GOAT STYLE | Urban Store
   ========================================================== */

/* ---------- 1. CONFIGURACIÓN ---------- */
const CONFIG = {
  whatsapp: "573044085994",
  brand: "Goat Style",
  locale: "es-CO",
  currency: "COP"
};

/* ---------- 2. PRODUCTOS (Estructura base y colecciones) ---------- */
const SIZES_SPECIAL = ["S Oversized", "M Oversized", "L Oversized", "XL Oversized"];
const SIZES_CLOTHES = ["S", "M", "L", "XL"];
const SIZES_SHOES = ["38", "39", "40", "41", "42", "43", "44"];
const SIZES_SHORT = ["30", "32", "34", "36", "38"];
const SIZES_CAP = ["S/M", "M/L", "L/XL"];
const SIZES_PANTS = ["S", "M", "L", "XL"];
const SIZES_W = ["S", "M", "L", "XL"];
const SIZES_SHOES_W = ["35", "36", "37", "38", "39", "40"];

let PRODUCTS = [
  /* Camisas */
  { id: "cam-01", category: "camisas", name: "Camiseta Authentic Jordan Negra", price: 180000, image: "img/camisa/camisa-01.jpeg", sizes: SIZES_SPECIAL, available: ["M Oversized"], tag: "Nuevo" },
  { id: "cam-02", category: "camisas", name: "Camiseta Authentic Jordan Blanca", price: 180000, image: "img/camisa/camisa-02.jpeg", sizes: SIZES_SPECIAL, available: ["L Oversized"], tag: "Nuevo" },
  { id: "cam-03", category: "camisas", name: "Camiseta Jordan Stars", price: 160000, image: "img/camisa/camisa-03.jpeg", sizes: SIZES_SPECIAL, available: ["M Oversized"], tag: "Nuevo" },
  { id: "cam-04", category: "camisas", name: "Camiseta Nike jordan Naranja", price: 150000, image: "img/camisa/camisa-04.jpeg", sizes: SIZES_CLOTHES, available: ["L"], tag: "Nuevo" },
  { id: "cam-05", category: "camisas", name: "Camiseta Jordan Azul", price: 190000, image: "img/camisa/camisa-05.jpeg", sizes: SIZES_CLOTHES, available: ["M"], tag: "Nuevo" },
  { id: "cam-06", category: "camisas", name: "Camiseta Jordan Air Negra", price: 180000, image: "img/camisa/camisa-06.jpeg", sizes: SIZES_SPECIAL, available: ["S Oversized"], tag: "Nuevo" },
  { id: "cam-07", category: "camisas", name: "Camiseta Jordan Air Blanca", price: 170000, image: "img/camisa/camisa-07.jpeg", sizes: SIZES_SPECIAL, available: ["S Oversized"], tag: "Nuevo" },

  /* Buzos */
  { id: "buz-01", category: "buzos", name: "Buzo Hoodie Jordan Negro", price: 170000, image: "img/saco/buzo-01.jpeg", sizes: SIZES_CLOTHES, available: ["M"], tag: "Nuevo" },

  /* Tennis */
  { id: "ten-01", category: "tennis", name: "Tennis Urban negros", price: 229900, image: "img/tennis-01.jpg", sizes: SIZES_SHOES, available: ["39", "40", "41", "42", "43"], tag: "Nuevo" },
  { id: "ten-02", category: "tennis", name: "Tennis Street blancos", price: 219900, image: "img/tennis-02.jpg", sizes: SIZES_SHOES, available: ["38", "40", "41", "44"] },
  { id: "ten-03", category: "tennis", name: "Tennis Crown rojo y negro", price: 249900, image: "img/tennis-03.jpg", sizes: SIZES_SHOES, available: ["40", "42", "43"] },

  /* Shorts */
  { id: "sho-01", category: "shorts", name: "Short FashionNOVA", price: 170000, image: "img/short/short-01.jpeg", sizes: SIZES_SHORT, available: ["34"], tag: "Nuevo" },
  { id: "sho-02", category: "shorts", name: "Short FashionNOVA", price: 180000, image: "img/short/short-02.jpeg", sizes: SIZES_SHORT, available: ["34"], tag: "Nuevo" },
  { id: "sho-03", category: "shorts", name: "Short FashionNOVA", price: 170000, image: "img/short/short-03.jpeg", sizes: SIZES_SHORT, available: ["34"], tag: "Nuevo" },
  { id: "sho-04", category: "shorts", name: "Short FashionNOVA", price: 180000, image: "img/short/short-04.jpeg", sizes: SIZES_SHORT, available: ["34"], tag: "Nuevo" },
  { id: "sho-05", category: "shorts", name: "Short FashionNOVA", price: 160000, image: "img/short/short-05.jpeg", sizes: SIZES_SHORT, available: ["34"], tag: "Nuevo" },

  /* Pantalonetas */
  { id: "pan-01", category: "pantalonetas", name: "Pantaloneta Jordan Diamante Azul", price: 195000, image: "img/pantalonetas/pantaloneta-01.jpeg", sizes: SIZES_PANTS, available: ["M"], tag: "Nuevo" },
  { id: "pan-02", category: "pantalonetas", name: "Pantaloneta Jordan Diamante Negra", price: 195000, image: "img/pantalonetas/pantaloneta-02.jpeg", sizes: SIZES_PANTS, available: ["L"], tag: "Nuevo" },
  { id: "pan-03", category: "pantalonetas", name: "Pantaloneta Jordan Roja", price: 180000, image: "img/pantalonetas/pantaloneta-03.jpeg", sizes: SIZES_PANTS, available: ["S"], tag: "Nuevo" },

  /* Gorras */
  { id: "gor-01", category: "gorras", name: "Gorra Jordan Roja", price: 150000, image: "img/gorra/gorra-01.jpeg", sizes: SIZES_CAP, available: ["M/L"], tag: "Nuevo" },
  { id: "gor-02", category: "gorras", name: "Gorra Jordan", price: 170000, image: "img/gorra/gorra-02.jpeg", sizes: SIZES_CAP, available: ["S/M"], tag: "Nuevo" },
  { id: "gor-03", category: "gorras", name: "Gorra Nike Blanca", price: 150000, image: "img/gorra/gorra-03.jpeg", sizes: SIZES_CAP, available: ["M/L"], tag: "Nuevo" },

  /* Mujer */
  { id: "mujer-body-01", category: "body", name: "Body Goat negro", price: 59900, image: "img/mujer-body-01.jpg", sizes: SIZES_W, available: SIZES_W },
  { id: "mujer-body-02", category: "body", name: "Body Crown rojo", price: 64900, image: "img/mujer-body-02.jpg", sizes: SIZES_W, available: ["S", "M"] },
  { id: "mujer-body-03", category: "body", name: "Body Street blanco", price: 59900, image: "img/mujer-body-03.jpg", sizes: SIZES_W, available: ["M", "L", "XL"] },
  { id: "mujer-falda-01", category: "falda", name: "Falda Urban negra", price: 74900, image: "img/mujer-falda-01.jpg", sizes: SIZES_W, available: SIZES_W, tag: "Nuevo" },
  { id: "mujer-falda-02", category: "falda", name: "Falda Cargo gris", price: 84900, image: "img/mujer-falda-02.jpg", sizes: SIZES_W, available: ["S", "M", "L"] },
  { id: "mujer-falda-03", category: "falda", name: "Falda Crown roja", price: 69900, image: "img/mujer-falda-03.jpg", sizes: SIZES_W, available: ["M", "XL"] },
  { id: "mujer-short-01", category: "short", name: "Short Goat negro", price: 54900, image: "img/mujer-short-01.jpg", sizes: SIZES_W, available: SIZES_W },
  { id: "mujer-short-02", category: "short", name: "Short Denim urbano", price: 69900, image: "img/mujer-short-02.jpg", sizes: SIZES_W, available: ["S", "M", "L"], tag: "Nuevo" },
  { id: "mujer-short-03", category: "short", name: "Short Crown rojo", price: 54900, image: "img/mujer-short-03.jpg", sizes: SIZES_W, available: ["S", "XL"] },
  { id: "mujer-top-01", category: "top", name: "Top Goat negro", price: 44900, image: "img/mujer-top-01.jpg", sizes: SIZES_W, available: SIZES_W },
  { id: "mujer-top-02", category: "top", name: "Top Crown blanco", price: 49900, image: "img/mujer-top-02.jpg", sizes: SIZES_W, available: ["S", "M"] },
  { id: "mujer-top-03", category: "top", name: "Top Street rojo", price: 49900, image: "img/mujer-top-03.jpg", sizes: SIZES_W, available: ["M", "L", "XL"], tag: "Nuevo" },
  { id: "mujer-zapatillas-01", category: "zapatillas", name: "Zapatillas Urban negras", price: 219900, image: "img/mujer-zapatillas-01.jpg", sizes: SIZES_SHOES_W, available: ["36", "37", "38", "39"], tag: "Nuevo" },
  { id: "mujer-zapatillas-02", category: "zapatillas", name: "Zapatillas Street blancas", price: 209900, image: "img/mujer-zapatillas-02.jpg", sizes: SIZES_SHOES_W, available: ["35", "37", "38", "40"] },
  { id: "mujer-zapatillas-03", category: "zapatillas", name: "Zapatillas Crown rojo y negro", price: 239900, image: "img/mujer-zapatillas-03.jpg", sizes: SIZES_SHOES_W, available: ["36", "38", "39"] },
  { id: "mujer-camiseta-01", category: "camiseta", name: "Camiseta Goat Oversize negra", price: 64900, image: "img/mujer-camiseta-01.jpg", sizes: SIZES_W, available: SIZES_W, tag: "Nuevo" },
  { id: "mujer-camiseta-02", category: "camiseta", name: "Camiseta Goat Style blanca", price: 59900, image: "img/mujer-camiseta-02.jpg", sizes: SIZES_W, available: ["S", "M", "L"] },
  { id: "mujer-camiseta-03", category: "camiseta", name: "Camiseta Crown roja", price: 64900, image: "img/mujer-camiseta-03.jpg", sizes: SIZES_W, available: ["M", "L", "XL"] }
];

/* ---------- 3. UTILIDADES ---------- */
const formatPrice = (n) =>
  new Intl.NumberFormat(CONFIG.locale, { style: "currency", currency: CONFIG.currency, maximumFractionDigits: 0 }).format(n);

const waLink = (text) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

function productMessage(product, size) {
  const sizeText = size ? `en talla ${size}` : "y quiero saber qué tallas tienen disponibles";
  return `Hola ${CONFIG.brand}, me interesa "${product.name}" (${formatPrice(product.price)}) ${sizeText}. ¿Lo tienen disponible?`;
}

function placeholderImage(label) {
  const safe = (label || "Producto").replace(/&/g, "y").replace(/</g, "");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500">
      <rect width="400" height="500" fill="#0c0c0c"/>
      <circle cx="200" cy="210" r="120" fill="none" stroke="#e10600" stroke-width="14" stroke-dasharray="520 240" stroke-linecap="round"/>
      <path d="M130 250 140 185l35 30 25-55 25 55 35-30 10 65z" fill="none" stroke="#f4f2ee" stroke-width="8" stroke-linejoin="round"/>
      <text x="200" y="400" fill="#f4f2ee" font-family="Impact, sans-serif" font-size="30" text-anchor="middle">GOAT STYLE</text>
      <text x="200" y="435" fill="#a3a3a3" font-family="Arial, sans-serif" font-size="16" text-anchor="middle">${safe}</text>
    </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

const WA_ICON = `<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3C8.8 3 3 8.700 3 15.800c0 2.500.7 4.800 2 6.800L3 29l6.600-1.900c1.900 1 4 1.600 6.300 1.600 7.200 0 13-5.700 13-12.800S23.200 3 16 3zm0 23.300c-2 0-3.900-.6-5.500-1.600l-.4-.2-3.900 1.100 1.100-3.800-.3-.4c-1.200-1.700-1.800-3.600-1.800-5.600C5.200 10 10 5.400 16 5.400s10.800 4.600 10.800 10.400S22 26.300 16 26.300zm6-7.800c-.3-.2-1.900-.9-2.200-1s-.5-.2-.7.200-.8 1-1 1.200-.4.200-.7.100c-1.900-.9-3.100-1.700-4.300-3.800-.3-.6.300-.5.900-1.700.1-.2 0-.4 0-.5l-1-2.300c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.100-.8.400-.3.300-1.100 1.100-1.100 2.600s1.100 3 1.300 3.200c.2.200 2.200 3.400 5.400 4.700 2 .8 2.800.9 3.800.7.600-.1 1.900-.8 2.200-1.500.3-.7.300-1.400.2-1.500-.1-.2-.3-.3-.7-.4z"/></svg>`;

/* ---------- 4. CONSTRUCCIÓN DE TARJETAS Y API ---------- */
const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function createCard(product, index) {
  const soldOut = !product.available || product.available.length === 0;
  const card = document.createElement("article");
  card.className = "card";
  card.style.setProperty("--i", index);
  card.dataset.id = product.id;

  const sizes = Array.isArray(product.sizes) ? product.sizes : [];
  const available = Array.isArray(product.available) ? product.available : [];

  const sizeButtons = sizes
    .map((s) => {
      const ok = available.includes(s);
      return `<button type="button" class="size" role="radio" aria-checked="false" data-size="${esc(s)}"
        ${ok ? "" : 'disabled aria-label="Talla ' + esc(s) + ' agotada"'}>${esc(s)}</button>`;
    })
    .join("");

  card.innerHTML = `
    <div class="card__media">
      <img src="${esc(product.image)}" alt="${esc(product.name)}" loading="lazy" width="400" height="500">
      <button type="button" class="zoom" aria-label="Ampliar foto: ${esc(product.name)}"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21M10.5 7.5v6M7.5 10.5h6"/></svg></button>
      <button type="button" class="fav" data-fav="${product.id}" aria-pressed="false" aria-label="Favorito: ${esc(product.name)}">♡</button>
      ${product.tag ? `<span class="tag">${esc(product.tag)}</span>` : ""}
    </div>
    <div class="card__body">
      <h3 class="card__name">${esc(product.name)}</h3>
      <p class="card__price">${formatPrice(product.price)}</p>
      <p class="sizes-label">${sizes.length > 1 ? "Elige tu talla" : "Talla"}</p>
      <div class="sizes" role="radiogroup" aria-label="Tallas de ${esc(product.name)}">${sizeButtons}</div>
      <button type="button" class="btn btn--ghost add" data-add="${product.id}">Añadir al carrito</button>
      <a class="btn btn--wa" href="${waLink(productMessage(product))}" target="_blank" rel="noopener">
        ${WA_ICON}<span>${soldOut ? "Preguntar cuándo llega" : "Pedir por WhatsApp"}</span>
      </a>
    </div>`;

  const img = card.querySelector("img");
  img.addEventListener("error", () => { img.src = placeholderImage(product.name); }, { once: true });

  const btn = card.querySelector(".btn--wa");
  const label = btn.querySelector("span");
  let selected = null;

  card.querySelector(".sizes").addEventListener("click", (e) => {
    const b = e.target.closest(".size");
    if (!b || b.disabled) return;

    const same = selected === b.dataset.size;
    selected = same ? null : b.dataset.size;

    card.querySelectorAll(".size").forEach((el) =>
      el.setAttribute("aria-checked", String(el.dataset.size === selected))
    );

    btn.href = waLink(productMessage(product, selected));
    label.textContent = selected
      ? `Pedir talla ${selected} por WhatsApp`
      : soldOut ? "Preguntar cuándo llega" : "Pedir por WhatsApp";
  });

  return card;
}

function renderCatalog() {
  document.querySelectorAll(".shop").forEach((section) => {
    const grid = section.querySelector(".grid");
    if (!grid) return;
    grid.replaceChildren();
    const items = PRODUCTS.filter((p) => p.category === section.dataset.category);
    items.forEach((p, i) => grid.appendChild(createCard(p, i)));
  });
  document.dispatchEvent(new CustomEvent("catalog:rendered"));
}

function refreshCatalog() {
  renderCatalog();
  setupReveal();
}

async function loadCatalog() {
  try {
    const r = await fetch(`/api/products?t=${Date.now()}`, { cache: "no-store" });
    if (!r.ok) return;
    const data = await r.json();
    if (Array.isArray(data) && data.length > 0) {
      PRODUCTS.length = 0;
      PRODUCTS.push(...data);
    }
  } catch (err) {
    console.warn("Usando catálogo local por error de red:", err);
  }
}

function jumpToHash() {
  const h = location.hash;
  if (h.length < 2 || h.startsWith("#/")) return;
  const el = document.getElementById(decodeURIComponent(h.slice(1)));
  if (el) el.scrollIntoView();
}

/* ---------- 5. ANIMACIONES Y COMPORTAMIENTO ---------- */
function setupReveal() {
  const cards = document.querySelectorAll(".card");
  if (!("IntersectionObserver" in window)) {
    cards.forEach((c) => c.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  cards.forEach((c) => io.observe(c));
}

function setupHeader() {
  const header = document.getElementById("header");
  const bar = document.getElementById("progress");
  if (!header || !bar) return;

  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle("is-solid", y > 30);
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setupMenu() {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  if (!burger || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  };

  burger.addEventListener("click", () => setOpen(!nav.classList.contains("open")));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
}

function setupGeneralWhatsApp() {
  const href = waLink(`Hola ${CONFIG.brand}, quiero ver qué tienen disponible.`);
  document.querySelectorAll("[data-wa-general]").forEach((a) => (a.href = href));
}

/* ---------- 6. ARRANQUE ---------- */
document.documentElement.classList.add("js");
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

setupGeneralWhatsApp();
setupHeader();
setupMenu();
loadCatalog().then(() => { renderCatalog(); setupReveal(); jumpToHash(); });

/* ===== TIENDA: Carrito, favoritos y utilidades ===== */
(() => {
  const $ = (s, r = document) => r.querySelector(s);   const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const st = {
    get(k, d) { try { const v = localStorage.getItem("gs_" + k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem("gs_" + k, JSON.stringify(v)); } catch {} }
  };

  const CODES = { GOAT10: 0.1 };
  const SHIP = { free: 200000, fee: 12000 };

  const SYN = {
    camisas: "camiseta camisa playera oversize", buzos: "buzo hoodie saco sudadera",
    tennis: "tenis tennis zapatilla zapato calzado", shorts: "short bermuda", pantalonetas: "pantaloneta pantalonetas short bermuda", gorras: "gorra snapback cap",
    body: "body bodysuit mujer", falda: "falda mujer", short: "short mujer", top: "top crop mujer", zapatillas: "zapatilla zapatillas tenis mujer", camiseta: "camiseta camisa mujer"
  };
  const CAT = { camisas: "Camisas", buzos: "Buzos", tennis: "Tennis", shorts: "Shorts", pantalonetas: "Pantalonetas", gorras: "Gorras", body: "Body", falda: "Falda", short: "Short", top: "Top", zapatillas: "Zapatillas", camiseta: "Camiseta" };
  const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const stem = (w) => w.replace(/(es|s)$/, "");
  const hay = (p) => norm(`${p.name} ${p.category} ${SYN[p.category] || ""}`).split(/\W+/).map(stem).join(" ");
  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  const img = (p) => `<img src="${p.image}" alt="${p.name}" onerror="this.onerror=null;this.src=placeholderImage(this.alt)">`;

  let cart = st.get("cart", []), favs = st.get("favs", []), promo = st.get("promo", null);
  let kind = null, promoMsg = "";

  document.addEventListener("catalog:rendered", () => {
    const n = cart.length + favs.length;
    cart = cart.filter((l) => byId(l.id));
    favs = favs.filter((id) => byId(id));
    if (cart.length + favs.length !== n) save();
  });

  document.body.insertAdjacentHTML("beforeend", `
    <div class="scrim" id="scrim" hidden></div>
    <aside class="panel" id="panel" role="dialog" aria-modal="true" aria-labelledby="panelTitle" aria-hidden="true">
      <div class="panel__head"><h2 id="panelTitle"></h2><button class="icon" data-close aria-label="Cerrar panel">✕</button></div>
      <div class="panel__body" id="panelBody"></div><div class="panel__foot" id="panelFoot"></div>
    </aside>
    <div class="search" id="search" role="dialog" aria-modal="true" aria-label="Buscar productos" hidden>
      <div class="search__box">
        <div class="search__bar">
          <input id="q" type="search" placeholder="Busca hoodie, short negro, gorra..." aria-label="Buscar productos" autocomplete="off">
          <button class="icon" id="qClear" aria-label="Limpiar búsqueda" hidden>✕</button>
          <button class="btn btn--ghost" data-close>Cerrar</button>
        </div>
        <div id="qOut" aria-live="polite"></div>
      </div>
    </div>
    <div class="page" id="page" role="dialog" aria-modal="true" hidden></div>
    <div class="toast" id="toast" role="status" aria-live="polite"></div>`);

  const panel = $("#panel"), scrim = $("#scrim"), search = $("#search"), q = $("#q");

  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("on");
    setTimeout(() => t.classList.remove("on"), 2300);
  }

  function totals() {
    const sub = cart.reduce((s, l) => s + (byId(l.id)?.price || 0) * l.qty, 0);
    const disc = promo && CODES[promo] ? Math.round(sub * CODES[promo]) : 0;
    const ship = sub && sub - disc < SHIP.free ? SHIP.fee : 0;
    return { sub, disc, ship, total: sub - disc + ship };
  }
  function save() { st.set("cart", cart); st.set("favs", favs); st.set("promo", promo); sync(); }
  function sync() {
    const n = cart.reduce((s, l) => s + l.qty, 0);
    [["#cartCount", n], ["#favCount", favs.length]].forEach(([s, v]) => { const b = $(s); if(b){ b.textContent = v; b.hidden = !v; } });$$("[data-fav]").forEach((b) => { const on = favs.includes(b.dataset.fav); b.setAttribute("aria-pressed", on); b.textContent = on ? "♥" : "♡"; });
    if (kind === "cart" || kind === "favs") renderPanel();
  }
  function addToCart(id, size) {
    const p = byId(id);
    if (!p || !p.available.length) return toast("Producto agotado. Pregúntanos por WhatsApp.");
    if (!size && p.sizes.length > 1) return toast("Elige una talla primero");
    size = size || p.sizes[0];
    const l = cart.find((x) => x.id === id && x.size === size);
    l ? (l.qty = Math.min(10, l.qty + 1)) : cart.push({ id, size, qty: 1 });
    save(); toast("Producto añadido al carrito ✓");
  }

  function renderPanel() {
    const body = $("#panelBody"), foot = $("#panelFoot");
    if (kind === "cart") {
      $("#panelTitle").textContent = "Carrito";
      if (!cart.length) {
        body.innerHTML = `<div class="empty"><p>Tu carrito está vacío.</p><a class="btn btn--red" href="#camisas" data-close>Ver tienda</a></div>`;
        foot.innerHTML = ""; return;
      }
      const t = totals();
      body.innerHTML = `<ul class="lines">${cart.map((l, i) => { const p = byId(l.id); if(!p) return ""; return `
        <li class="line">${img(p)}<div><strong>${p.name}</strong><small>Talla${l.size}</small>
          <div class="qty"><button data-q="${i}" data-d="-1" aria-label="Menos unidades">−</button><span aria-label="${l.qty} unidades">${l.qty}</span><button data-q="${i}" data-d="1" aria-label="Más unidades">+</button></div></div>
          <div class="line__r"><b>${formatPrice(p.price * l.qty)}</b><button class="link" data-rm="${i}">Eliminar</button></div></li>`; }).join("")}</ul>
        <div class="sum"><div><span>Subtotal</span><span>${formatPrice(t.sub)}</span></div>
          <div><span>Descuento</span><span>${t.disc ? "−" + formatPrice(t.disc) : "—"}</span></div>
          <div><span>Envío</span><span>${t.ship ? formatPrice(t.ship) : "Gratis"}</span></div>
          <div class="tot"><span>Total</span><span>${formatPrice(t.total)}</span></div></div>`;
      const lines = cart.map((l) => { const p = byId(l.id); return p ? `- ${p.name} (talla ${l.size}) x${l.qty}` : ""; }).filter(Boolean).join("\n");
      const msg = `Hola ${CONFIG.brand}, quiero finalizar este pedido:\n${lines}\nTotal: ${formatPrice(t.total)}`;
      foot.innerHTML = `<a class="btn btn--red" target="_blank" rel="noopener" href="${waLink(msg)}">Finalizar compra por WhatsApp</a><button class="btn btn--ghost" data-close>Continuar comprando</button>`;
    } else {
      $("#panelTitle").textContent = "Favoritos"; foot.innerHTML = "";
      body.innerHTML = favs.length ? `<ul class="lines">${favs.map((id) => { const p = byId(id); if(!p) return ""; return `
        <li class="line">${img(p)}<div><strong>${p.name}</strong><small>${formatPrice(p.price)}</small>
          <button class="link" data-go="${p.id}">Ver producto</button></div>
          <div class="line__r"><button class="link" data-fav="${p.id}" aria-pressed="true">Quitar</button></div></li>`; }).join("")}</ul>`
        : `<div class="empty"><p>Aún no tienes favoritos. Toca el ♡ en un producto para guardarlo.</p></div>`;
    }
  }

  function closeAll() {
    kind = null; panel.classList.remove("open"); panel.setAttribute("aria-hidden", "true");
    scrim.classList.remove("on"); setTimeout(() => (scrim.hidden = true), 300);
    search.hidden = true; document.body.classList.toggle("lock", !$("#page").hidden);
  }
  function openPanel(k) {
    closeAll(); kind = k; renderPanel(); scrim.hidden = false;
    requestAnimationFrame(() => { scrim.classList.add("on"); panel.classList.add("open"); panel.setAttribute("aria-hidden", "false"); });
    const closeBtn = $("[data-close]", panel);
    if(closeBtn) closeBtn.focus();
  }
  function openSearch() { closeAll(); search.hidden = false; document.body.classList.add("lock"); q.value = ""; runSearch(); q.focus(); }

  function runSearch() {
    const raw = q.value.trim(), out = $("#qOut"); const clearBtn = $("#qClear"); if(clearBtn) clearBtn.hidden = !raw;
    const chips = (cats) => `<div class="chips">${cats.map((c) => `<a class="chip" href="#${c}" data-close>${CAT[c]}</a>`).join("")}</div>`;
    if (!raw) { out.innerHTML = `<p>Categorías</p>${chips(Object.keys(CAT).filter((c) => document.getElementById(c)))}`; return; }
    const toks = norm(raw).split(/\W+/).filter(Boolean).map(stem);
    const found = PRODUCTS.filter((p) => { const h = hay(p); return toks.every((t) => h.includes(t)) && !!$(`.card[data-id="${p.id}"]`); });
    const cats = Object.keys(CAT).filter((c) => document.getElementById(c)).filter((c) => toks.some((t) => norm(c + " " + (SYN[c] || "")).split(/\W+/).map(stem).includes(t)));
    out.innerHTML = found.length
      ? `${cats.length ? `<p>Categorías relacionadas</p>${chips(cats)}` : ""}<p>${found.length} producto${found.length > 1 ? "s" : ""} encontrado${found.length > 1 ? "s" : ""}</p>
         <ul class="res">${found.map((p) => `<li><button data-go="${p.id}">${img(p)}<span>${p.name}</span><b>${formatPrice(p.price)}</b></button></li>`).join("")}</ul>`
      : `<div class="empty"><p>No encontramos resultados para “${raw.replace(/[<>&]/g, "")}”. Prueba con otra palabra.</p></div>`;
  }
  q.addEventListener("input", runSearch);
  const qClear = $("#qClear"); if(qClear) qClear.addEventListener("click", () => { q.value = ""; runSearch(); q.focus(); });

  function goTo(id) {
    closeAll(); const el = $(`.card[data-id="${id}"]`); if (!el) return;
    el.classList.add("in"); el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash");
  }

  document.addEventListener("click", (e) => {
    const t = e.target, c = (s) => t.closest(s);
    let el;
    if ((el = c("[data-add]"))) { const card = el.closest(".card"); const s = $('.size[aria-checked="true"]', card); addToCart(el.dataset.add, s && s.dataset.size); }
    else if ((el = c("[data-fav]"))) { const id = el.dataset.fav; favs = favs.includes(id) ? favs.filter((x) => x !== id) : [...favs, id]; save(); toast(favs.includes(id) ? "Añadido a favoritos ♥" : "Quitado de favoritos"); }
    else if ((el = c("[data-open]"))) el.dataset.open === "search" ? openSearch() : openPanel(el.dataset.open);
    else if ((el = c("[data-go]"))) goTo(el.dataset.go);
    else if ((el = c("[data-q]"))) { const l = cart[el.dataset.q]; if(l) { l.qty = Math.max(1, Math.min(10, l.qty + +el.dataset.d)); save(); } }
    else if ((el = c("[data-rm]"))) { cart.splice(el.dataset.rm, 1); save(); }
    else if (c("[data-close]") || t === scrim) closeAll();
  });

  sync();
})();

/* ===== Menús desplegables ===== */
(() => {
  const drops = [...document.querySelectorAll(".nav__drop")];
  const set = (d, o) => { d.classList.toggle("open", o); const btn = d.querySelector(".nav__dropbtn"); if(btn) btn.setAttribute("aria-expanded", String(o)); };
  drops.forEach((d) => {
    const btn = d.querySelector(".nav__dropbtn");
    if(btn) btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const o = !d.classList.contains("open");
      drops.forEach((x) => set(x, false)); set(d, o);
    });
    d.querySelectorAll(".nav__menu a").forEach((a) => a.addEventListener("click", () => { set(d, false); a.blur(); }));
  });
  document.addEventListener("click", (e) => drops.forEach((d) => { if (!d.contains(e.target)) set(d, false); }));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") drops.forEach((d) => set(d, false)); });

  document.querySelectorAll("[data-wa-item]").forEach((a) => {
    a.href = waLink(`Hola ${CONFIG.brand}, quiero ver ${a.dataset.waItem} de mujer. ¿Qué tienen disponible?`);
  });
})();

/* ===== Zoom / Lightbox ===== */
(() => {
  const box = document.createElement("div");
  box.className = "lb"; box.hidden = true;
  box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true"); box.setAttribute("aria-label", "Foto ampliada");
  box.innerHTML = `
    <button type="button" class="lb__close" aria-label="Cerrar foto">✕</button>
    <div class="lb__stage" tabindex="0"><img class="lb__img" alt=""></div>
    <p class="lb__hint" aria-hidden="true">Toca la foto para acercar o alejar</p>`;
  document.body.appendChild(box);

  const stage = box.querySelector(".lb__stage"), pic = box.querySelector(".lb__img"), closeBtn = box.querySelector(".lb__close");
  let zoomed = false, last = null, moved = false, drag = null;

  function setZoom(on, e) {
    if (on === zoomed) return;
    const r = pic.getBoundingClientRect();
    const rx = e ? (e.clientX - r.left) / r.width : 0.5, ry = e ? (e.clientY - r.top) / r.height : 0.5;
    zoomed = on;
    box.classList.toggle("is-zoomed", on);
    if (on) {
      const target = Math.min(r.width * 2.5, Math.max(pic.naturalWidth || 0, r.width * 1.6));
      pic.style.width = target + "px";
      stage.scrollLeft = pic.offsetLeft + rx * pic.offsetWidth - stage.clientWidth / 2;
      stage.scrollTop = pic.offsetTop + ry * pic.offsetHeight - stage.clientHeight / 2;
    } else {
      pic.style.width = "";
    }
  }

  function open(src, alt, trigger) {
    last = trigger || document.activeElement;
    pic.src = src; pic.alt = alt;
    zoomed = false; box.classList.remove("is-zoomed"); pic.style.width = "";
    box.hidden = false; document.body.classList.add("lb-open");
    requestAnimationFrame(() => box.classList.add("on"));
    closeBtn.focus();
  }

  function close() {
    if (box.hidden) return;
    box.classList.remove("on"); box.hidden = true; zoomed = false; pic.style.width = "";
    document.body.classList.remove("lb-open");
    if (last && last.focus) last.focus();
  }

  document.addEventListener("click", (e) => {
    const media = e.target.closest(".card__media");
    if (!media || e.target.closest("[data-fav]")) return;
    const im = media.querySelector("img");
    if(im) open(im.currentSrc || im.src, im.alt, media.querySelector(".zoom"));
  });

  closeBtn.addEventListener("click", close);

  stage.addEventListener("click", (e) => {
    if (moved) { moved = false; return; }
    if (e.target === pic) setZoom(!zoomed, e);
    else if (!zoomed) close();
  });
})();