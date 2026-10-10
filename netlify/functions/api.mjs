import { getStore } from "@netlify/blobs";

// Helper para cargar/inicializar el admin
async function loadAdmin(store) {
  try {
    let a = await store.get("admin", { type: "json" });
    if (a) return a;

    const pw = process.env.ADMIN_PASSWORD || "";
    const usr = process.env.ADMIN_USER || "admin";

    if (pw.length < 8) return null;

    a = { user: usr };
    // Aquí ejecutas tu función para procesar la clave
    if (typeof setPassword === "function") {
      setPassword(a, pw);
    }
    await store.setJSON("admin", a);
    return a;
  } catch (err) {
    console.error("Error en loadAdmin:", err);
    return null;
  }
}

// EXPORTACIÓN OBLIGATORIA PARA NETLIFY FUNCTIONS
export const handler = async (event, context) => {
  try {
    const store = getStore("goat_style_store");

    // Lógica para procesar la petición
    if (event.httpMethod === "POST" && event.path.includes("/login")) {
      const admin = await loadAdmin(store);
      
      if (!admin) {
        return {
          statusCode: 401,
          body: JSON.stringify({ error: "Credenciales inválidas o no configuradas" })
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, user: admin.user })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "API funcionando correctamente" })
    };
  } catch (error) {
    console.error("Error en handler:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "Error interno del servidor" })
    };
  }
};