/* ==========================================================
   GOAT STYLE | Panel de administrador (Netlify Functions)
   ========================================================== */
(() => {
  "use strict";
  if (!/^https?:$/.test(location.protocol)) return;

  const $ = (s, r = document) => r.querySelector(s);   const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const h = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  
  // Arreglos de seguridad por si no están definidos en script.js
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

  /* ---------- Comunicación con la API ---------- */
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

  /* ---------- Avisos ---------- */
  let toastTimer;
  function toast(msg, bad) {
    let t = $(".adm-toast");
    if (!t) { t = document.createElement("div"); t.className = "adm-toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg; t.classList.toggle("bad", !!bad); t.classList.add("on");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("on"), 3500);
  }

  /* ---------- Ventana modal ---------- */
  const root = document.createElement("div");
  root.className = "adm"; root.hidden = true;
  root.innerHTML = `<div class="adm__box" role="dialog" aria-modal="true" aria-labelledby="admT" tabindex="-1">
    <button type="button" class="adm__x" aria-label="Cerrar">✕</button><h2 id="admT"></h2><div class="adm__body"></div></div>`;
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

  /* ---------- Vista Login ---------- */
  function viewLogin(note) {
    openModal("Acceso administrador", `<form class="adm__form" novalidate>
      ${note ? `<p class="adm__ok">${h(note)}</p>` : ""}
      <label>Usuario<input name="user" autocomplete="username" required></label>
      <label>Contraseña<input name="password" type="password" autocomplete="current-password" required></label>
      <p class="adm__err" role="alert" hidden></p>
      <button class="btn btn--red" type="submit">Entrar</button></form>`);
    bindForm($("form", body), async (d) => {
      await api("POST", "/api/login", { user: d.user, password: d.password });
      setAdmin(true); closeModal(); toast("Sesión iniciada correctamente.");
    });
  }

  function setAdmin(on) {
    admin = on;
    document.body.classList.toggle("is-admin", on);
    try { on ? localStorage.setItem("gs_adm", "1") : localStorage.removeItem("gs_adm"); } catch {}
  }

  /* ---------- Forzar apertura con URL ---------- */
  window.addEventListener("DOMContentLoaded", () => {
    const copy = $(".footer__copy");
    if (copy) {
      const b = document.createElement("button");
      b.type = "button"; b.className = "linkbtn adm-entry"; b.textContent = "Administrador";
      b.addEventListener("click", () => (admin ? toast("Ya iniciaste sesión.") : viewLogin()));
      copy.append(" · ", b);
    }

    const qs = new URLSearchParams(location.search);
    if (qs.has("admin") || localStorage.getItem("gs_adm") === "1") {
      if (!admin) viewLogin();
    }
  });
})();