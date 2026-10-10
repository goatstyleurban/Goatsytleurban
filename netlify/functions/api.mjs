import { getStore } from "@netlify/blobs";

export const handler = async (event, context) => {
  try {
    const store = getStore({
      name: "goat_style_store",
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_AUTH_TOKEN,
    });

    const path = event.path;
    const method = event.httpMethod;

    // 1. RUTA DE AUTENTICACIÓN / LOGIN
    if (method === "POST" && path.includes("/login")) {
      const body = JSON.parse(event.body || "{}");
      const { user, password } = body;

      const adminUser = process.env.ADMIN_USER || "admin";
      const adminPassword = process.env.ADMIN_PASSWORD;

      if (user === adminUser && password === adminPassword) {
        return {
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ success: true, message: "Sesión iniciada correctamente" })
        };
      } else {
        return {
          statusCode: 401,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ error: "Usuario o contraseña incorrectos" })
        };
      }
    }

    // 2. RUTA PARA OBTENER PRODUCTOS (GET)
    if (method === "GET" && (path.includes("/products") || path.includes("/productos"))) {
      let products = await store.get("products", { type: "json" });
      
      // Garantizar que siempre devuelva un arreglo válido
      if (!Array.isArray(products)) {
        products = [];
      }

      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(products)
      };
    }

    // 3. RUTA PARA GUARDAR O ACTUALIZAR PRODUCTOS (POST / PUT)
    if ((method === "POST" || method === "PUT") && (path.includes("/products") || path.includes("/productos") || path.includes("/save"))) {
      const body = JSON.parse(event.body || "{}");

      // Si se envía una lista completa o un objeto individual
      let currentProducts = await store.get("products", { type: "json" });
      if (!Array.isArray(currentProducts)) {
        currentProducts = [];
      }

      let updatedList = [];
      if (Array.isArray(body)) {
        updatedList = body;
      } else if (body && typeof body === "object") {
        // Buscar si existe para actualizar o agregar
        const existingIndex = currentProducts.findIndex(p => p.id && p.id === body.id);
        if (existingIndex >= 0) {
          currentProducts[existingIndex] = body;
          updatedList = currentProducts;
        } else {
          updatedList = [...currentProducts, body];
        }
      }

      await store.setJSON("products", updatedList);

      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ success: true, products: updatedList })
      };
    }

    // Respuesta genérica por defecto
    let defaultProducts = await store.get("products", { type: "json" });
    if (!Array.isArray(defaultProducts)) {
      defaultProducts = [];
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(defaultProducts)
    };

  } catch (error) {
    console.error("Error en API:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: error.message || "Error interno del servidor" })
    };
  }
};