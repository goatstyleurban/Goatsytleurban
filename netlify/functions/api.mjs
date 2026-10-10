async function loadAdmin(store) {
  try {
    let a = await store.get("admin", { type: "json" });
    if (a) return a;

    const pw = process.env.ADMIN_PASSWORD || "";
    const usr = process.env.ADMIN_USER || "admin";

    if (pw.length < 8) return null;

    a = { user: usr };
    setPassword(a, pw); // O la función de hash/password que uses
    await store.setJSON("admin", a);
    return a;
  } catch (err) {
    console.error("Error en loadAdmin:", err);
    return null;
  }
}