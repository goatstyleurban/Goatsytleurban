import { getStore } from "@netlify/blobs";

export const handler = async (event, context) => {
  try {
    // Instanciación explícita con las variables de entorno de Netlify
    const store = getStore({
      name: "goat_style_store",
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_AUTH_TOKEN,
    });

    const path = event.path;
    const method = event.httpMethod;

    // -------------------------------------------------------------
    // 1. AUTENTICACIÓN / LOGIN
    // -------------------------------------------------------------
    if (method === "POST" && (path.includes("/login") || path.includes("/auth/login"))) {
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

    // -------------------------------------------------------------
    // 2. OBTENER PRODUCTOS (GET)
    // -------------------------------------------------------------
    if (method === "GET" && (path.includes("/products") || path.includes("/productos"))) {
      let products = await store.get("products", { type: "json" });
      
      if (!Array.isArray(products)) {
        products = [];
      }

      return {
        statusCode: 200,
        headers: { 
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate"
        },
        body: JSON.stringify(products)
      };
    }

    // -------------------------------------------------------------
    // 3. GUARDAR O ACTUALIZAR PRODUCTOS (POST / PUT)
    // -------------------------------------------------------------
    if ((method === "POST" || method === "PUT") && (path.includes("/products") || path.includes("/productos") || path.includes("/save"))) {
      const body = JSON.parse(event.body || "{}");

      let currentProducts = await store.get("products", { type: "json" });
      if (!Array.isArray(currentProducts)) {
        currentProducts = [];
      }

      let updatedList = [];

      if (Array.isArray(body)) {
        updatedList = body.map((item, index) => ({
          ...item,
          id: item.id || `prod_${Date.now()}_${index}`
        }));
      } else if (body && typeof body === "object") {
        const itemToSave = { ...body };
        if (!itemToSave.id) {
          itemToSave.id = `prod_${Date.now()}`;
        }

        const existingIndex = currentProducts.findIndex(p => String(p.id) === String(itemToSave.id));
        
        if (existingIndex >= 0) {
          currentProducts[existingIndex] = itemToSave;
          updatedList = currentProducts;
        } else {
          updatedList = [...currentProducts, itemToSave];
        }
      }

      await store.setJSON("products", updatedList);

      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ success: true, products: updatedList })
      };
    }

    // -------------------------------------------------------------
    // 4. RESPUESTA POR DEFECTO
    // -------------------------------------------------------------
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
    console.error("Error en la función API:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: error.message || "Error interno del servidor" })
    };
  }
};