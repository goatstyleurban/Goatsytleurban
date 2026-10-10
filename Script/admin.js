/* ==========================================================
   GOAT STYLE | Panel de administrador (Netlify Functions)
   ========================================================== */
(() => {
  "use strict";
  if (!/^https?:$/.test(location.protocol)) return;

  const $ = (s, r = document) => r.querySelector(s);   const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const h = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const S_CLOTHES = typeof SIZES_CLOTHES !== "undefined" ? SIZES_CLOTHES : ["S", "M", "L", "XL"];
  const S_SHOES = typeof SIZES_SHOES !== "undefined" ? SIZES_SHOES : ["37", "38", "39", "40", "41", "42"];
  const S_SHORT = typeof SIZES_SHORT !== "undefined" ? SIZES_SHORT : ["28", "30", "32", "34"];
  const S_CAP = typeof SIZES_CAP !== "undefined" ? SIZES_CAP : ["Ajustable"];
  const S_W = typeof SIZES_W !== "undefined" ? SIZES_W : ["XS", "S", "M", "L"];

  const SIZE_SETS = {
    camisas: S_CLOTHES, buzos: S_CLOTHES, tennis: S_SHOES, shorts: S_SHORT, pantalonetas: S_SHORT, gorras: S_CAP,
    body: S_W, falda: S_W, short: S_W, top: S_W, zapatillas: S_SHOES, camiseta: S_W
  };
  let admin = false;

  async function api(method, url, body) {
    const opt = { method, headers: {} };
    if (body !== undefined) {
      opt.headers["Content-Type"] = "application/json";
      opt.body = JSON.stringify(body);
    }
    let res;
    try {
      res = await fetch(url, opt);
    } catch {
      throw new Error("No hay conexión con la API.");
    }
    let data = {};
    try { data = await res.json(); } catch {}
    if (!res.ok) throw Object.assign(new Error(data.error || `Error (${res.status}).`), { status: res.status });
    return data;
  }

  let toastTimer;
  function toast(msg, bad) {
    let t = $(".adm-toast");
    if (!t) { t = document.createElement("div"); t.className = "adm-toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg; t.classList.toggle("bad", !!bad); t.classList.add("on");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("on"), 3500);
  }

  const root = document.createElement("div");
  root.className = "adm"; root.hidden = true;
  root.innerHTML = '<div class="adm__box" role="dialog" aria-modal="true" aria-labelledby="admT" tabindex="-1">' +
    '<button type="button" class="adm__x" aria-label="Cerrar">✕</button><h2 id="admT"></h2><div class="adm__body"></div></div>';
  document.body.appendChild(root);
  const box = $(".adm__box", root), body = $(".adm__body", root);
  let lastFocus = null;

  function openModal(title, html) {
    if (root.hidden) lastFocus = document.activeElement;
    $("#admT").textContent = title; body.innerHTML = html;
    root.hidden = false; document.body.classList.add("adm-open");
    (body.querySelector("input:not([type=file]):not([type=checkbox]),select,button") || box).focus();
  }
  function closeModal() {
    if (root.hidden) return;
    root.hidden = true; body.innerHTML = ""; document.body.classList.remove("adm-open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  root.addEventListener("mousedown", (e) => { if (e.target === root) closeModal(); });
  $(".adm__x", root).addEventListener("click", closeModal);

  function bindForm(form, fn) {
    const err = $(".adm__err", form), btn = $("[type=submit]", form);
    const show = (m) => { err.textContent = m || ""; err.hidden = !m; };
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); show("");
      const label = btn.textContent; btn.disabled = true; btn.textContent = "Guardando…";
      try { await fn(Object.fromEntries(new FormData(form)), show); }
      catch (ex) { show(ex.message); }
      finally { btn.disabled = false; btn.textContent = label; }
    });
    return show;
  }

  function viewLogin(note) {
    openModal("Acceso administrador", '<form class="adm__form" novalidate>' +
      (note ? `<p class="adm__ok">${h(note)}</p>` : "") +
      '<label>Usuario<input name="user" autocomplete="username" required></label>' +
      '<label>Contraseña<input name="password" type="password" autocomplete="current-password" required></label>' +
      '<p class="adm__err" role="alert" hidden></p>' +
      '<button class="btn btn--red" type="submit">Entrar</button></form>');
    bindForm($("form", body), async (d) => {       await api("POST", "/api/login", { user: d.user, password: d.password });       setAdmin(true); closeModal(); toast("Sesión iniciada correctamente.");     });   }    async function save(list, okMsg) {     try {       const r = await api("POST", "/api/products", list);       if (r && Array.isArray(r.products)) {         if (typeof PRODUCTS !== "undefined") {           PRODUCTS.length = 0;           PRODUCTS.push(...r.products);         }       }       if (typeof refreshCatalog === "function") refreshCatalog();       else location.reload();       toast(okMsg \vert{}\vert{} "Cambios guardados ✓");       return true;     } catch (e) {       toast(e.message, true);       return false;     }   }    function move(id, dir) {     if (typeof PRODUCTS === "undefined") return;     const i = PRODUCTS.findIndex((p) => String(p.id) === String(id)); if (i < 0) return;     let j = i + dir;     while (j >= 0 && j < PRODUCTS.length && PRODUCTS[j].category !== PRODUCTS[i].category) j += dir;     if (j < 0 \vert{}\vert{} j >= PRODUCTS.length) return toast("Ya está en el extremo de la sección.");     const list = PRODUCTS.slice(); [list[i], list[j]] = [list[j], list[i]];     save(list, "Orden actualizado ✓");   }    function shrink(file) {     return new Promise((resolve, reject) => {       if (!/^image\//.test(file.type)) return reject(new Error("Elige un archivo de imagen."));       const url = URL.createObjectURL(file), img = new Image();       img.onload = () => {         const k = Math.min(1, 1000 / Math.max(img.naturalWidth, img.naturalHeight));         const c = document.createElement("canvas");         c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);         const x = c.getContext("2d"); x.fillStyle = "#fff"; x.fillRect(0, 0, c.width, c.height); x.drawImage(img, 0, 0, c.width, c.height);         URL.revokeObjectURL(url); resolve(c.toDataURL("image/jpeg", 0.82));       };       img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("No se pudo leer la foto. Prueba con JPG o PNG.")); };       img.src = url;     });   }    function editor(product, category) {     const isNew = !product;     const cats = $$(".shop").map((s) => [s.dataset.category, ($("h2", s) || {}).textContent || s.dataset.category]);
    if (!cats.length) return;
    const cat0 = product ? product.category : (cats.some((c) => c[0] === category) ? category : cats[0][0]);
    const p = product || { id: "", category: cat0, name: "", price: "", image: "", sizes: (SIZE_SETS[cat0] || []).slice(), available: (SIZE_SETS[cat0] || []).slice(), tag: "" };
    const avail = new Set(p.available || []), known = new Set(p.sizes || []);
    let pending = null, sizesTouched = !isNew;

    openModal(isNew ? "Añadir producto" : "Editar producto", '<form class="adm__form" novalidate>' +
      '<div class="adm__photo">' +
        `<img alt="" src="${h(p.image || "")}">` +
        `<div><label class="btn btn--ghost adm__file">${isNew ? "Elegir foto" : "Cambiar foto"}<input type="file" name="photo" accept="image/*" hidden></label>` +
        '<small>JPG o PNG.</small></div>' +
      '</div>' +
      `<label>Nombre del producto<input name="name" maxlength="80" value="${h(p.name)}" required></label>` +
      '<div class="adm__row">' +
        `<label>Sección<select name="category">${cats.map(([v, t]) => `<option value="${h(v)}"${v === p.category ? " selected" : ""}>${h(t)}</option>`).join("")}</select></label>` +
        `<label>Precio (COP)<input name="price" inputmode="numeric" value="${h(p.price)}" placeholder="89900" required><small class="adm__pp"></small></label>` +
      '</div>' +
      `<label>Etiqueta (opcional)<input name="tag" maxlength="20" list="admTags" value="${h(p.tag || "")}" placeholder="Nuevo"><datalist id="admTags"><option value="Nuevo"><option value="Oferta"><option value="Últimas unidades"></datalist></label>` +
      `<label>Tallas del producto (separadas por coma)<input name="sizes" value="${h((p.sizes || []).join(", "))}" placeholder="S, M, L, XL"></label>` +
      '<button type="button" class="linkbtn adm__default">Usar las tallas habituales de esta sección</button>' +
      '<fieldset class="adm__avail"><legend>Tallas disponibles ahora</legend><div></div></fieldset>' +
      '<p class="adm__err" role="alert" hidden></p>' +
      '<div class="adm__actions"><button class="btn btn--red" type="submit">Guardar</button><button type="button" class="btn btn--ghost" data-cancel>Cancelar</button></div></form>');

    const form = $("form", body), prev = $(".adm__photo img", form), fileIn = $("[name=photo]", form);
    const sizesIn = $("[name=sizes]", form), priceIn = $("[name=price]", form), catSel = $("[name=category]", form), availBox = $(".adm__avail div", form);

    const parseSizes = () => [...new Set(sizesIn.value.split(/[,;\n]+/).map((s) => s.trim()).filter(Boolean))].slice(0, 14);
    function renderAvail() {
      const sizes = parseSizes();
      sizes.forEach((s) => { if (!known.has(s)) { known.add(s); avail.add(s); } });
      availBox.innerHTML = sizes.length ? sizes.map((s) => `<label class="adm__chk"><input type="checkbox" value="${h(s)}"${avail.has(s) ? " checked" : ""}><span>${h(s)}</span></label>`).join("") : "<small>Escribe las tallas arriba.</small>";
    }
    renderAvail();

    sizesIn.addEventListener("input", () => { sizesTouched = true; renderAvail(); });
    availBox.addEventListener("change", (e) => { const c = e.target; if (c.type === "checkbox") c.checked ? avail.add(c.value) : avail.delete(c.value); });
    const useDefaults = () => { const d = SIZE_SETS[catSel.value] || []; sizesIn.value = d.join(", "); d.forEach((s) => { known.add(s); avail.add(s); }); renderAvail(); };
    $(".adm__default", form).addEventListener("click", () => { sizesTouched = false; useDefaults(); });
    catSel.addEventListener("change", () => { if (!sizesTouched) useDefaults(); });
    $("[data-cancel]", form).addEventListener("click", closeModal);

    bindForm(form, async (d) => {
      const name = d.name.trim(); if (!name) throw new Error("Escribe el nombre del producto.");
      const price = parseInt(String(d.price).replace(/\D/g, ""), 10); if (!Number.isFinite(price)) throw new Error("Escribe el precio (solo números).");
      const sizes = parseSizes(); if (!sizes.length) throw new Error("Agrega al menos una talla.");
      if (isNew && !pending) throw new Error("Elige una foto del producto.");

      let image = pending || p.image;
      const item = {
        id: p.id || `prod_${Date.now()}`,
        category: d.category,
        name,
        price,
        image,
        sizes,
        available: sizes.filter((s) => avail.has(s))
      };
      if (d.tag && d.tag.trim()) item.tag = d.tag.trim();

      const currentProds = typeof PRODUCTS !== "undefined" ? PRODUCTS : [];
      const list = isNew ? [...currentProds, item] : currentProds.map((x) => (String(x.id) === String(p.id) ? item : x));
      if (await save(list, isNew ? "Producto añadido ✓" : "Producto actualizado ✓")) closeModal();
    });

    fileIn.addEventListener("change", async () => {
      const f = fileIn.files[0]; if (!f) return;
      try { pending = await shrink(f); prev.src = pending; } catch (e) { toast(e.message, true); }
    });
  }

  function decorate() {
    $$(".adm-add,.adm-bar").forEach((el) => el.remove());     if (!admin) return;      $$
(".shop").forEach((sec) => {
      const head = $(".shop__head", sec) \vert{}\vert{} sec;       const b = document.createElement("button");       b.type = "button"; b.className = "btn btn--red adm-add"; b.dataset.admAdd = sec.dataset.category; b.textContent = "＋ Añadir producto";       head.appendChild(b);     });      $$(".card").forEach((card) => {
      const bar = document.createElement("div");
      bar.className = "adm-bar";
      bar.innerHTML = '<button type="button" data-adm-act="edit">✎ Editar</button>' +
        '<button type="button" data-adm-act="left" aria-label="Mover antes">◀</button>' +
        '<button type="button" data-adm-act="right" aria-label="Mover después">▶</button>' +
        '<button type="button" class="is-del" data-adm-act="del">🗑 Eliminar</button>';
      card.appendChild(bar);
    });
  }

  function setAdmin(on) {
    admin = on;
    document.body.classList.toggle("is-admin", on);
    try { on ? localStorage.setItem("gs_adm", "1") : localStorage.removeItem("gs_adm"); } catch {}

    let dock = $(".adm-dock");
    if (on && !dock) {
      dock = document.createElement("div");
      dock.className = "adm-dock"; dock.setAttribute("role", "region"); dock.setAttribute("aria-label", "Panel de administrador");
      dock.innerHTML = '<b>● Modo administrador</b><button type="button" data-dock="out">Cerrar sesión</button>';
      dock.addEventListener("click", (e) => {
        const k = e.target.closest("[data-dock]"); if (!k) return;
        setAdmin(false); toast("Sesión cerrada.");
      });
      document.body.appendChild(dock);
    } else if (!on && dock) dock.remove();

    decorate();
  }

  document.addEventListener("catalog:rendered", decorate);

  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-adm-add]");
    if (add) return editor(null, add.dataset.admAdd);

    const act = e.target.closest("[data-adm-act]");
    if (!act || !admin) return;

    const card = act.closest(".card");
    if (!card) return;
    const id = card.dataset.id;
    const prods = typeof PRODUCTS !== "undefined" ? PRODUCTS : [];
    const prod = prods.find((x) => String(x.id) === String(id));
    if (!prod && act.dataset.admAct !== "del") return;

    const a = act.dataset.admAct;
    if (a === "edit") editor(prod);
    else if (a === "left") move(id, -1);
    else if (a === "right") move(id, 1);
    else if (a === "del" && confirm("¿Eliminar este producto?\nEsta acción no se puede deshacer.")) {
      save(prods.filter((x) => String(x.id) !== String(id)), "Producto eliminado ✓");
    }
  });

  window.addEventListener("DOMContentLoaded", () => {
    const copy = $(".footer__copy");
    if (copy) {
      const b = document.createElement("button");
      b.type = "button"; b.className = "linkbtn adm-entry"; b.textContent = "Administrador";
      b.addEventListener("click", () => (admin ? toast("Ya iniciaste sesión.") : viewLogin()));
      copy.append(" · ", b);
    }

    const qs = new URLSearchParams(location.search);
    if (qs.has("admin")) viewLogin();
    else if (localStorage.getItem("gs_adm") === "1") setAdmin(true);
  });
})();