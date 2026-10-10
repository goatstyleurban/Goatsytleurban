// -------------------------------------------------------------
    // 2. OBTENER PRODUCTOS (GET)
    // -------------------------------------------------------------
    if (method === "GET" && (path.includes("/products") || path.includes("/productos"))) {
      let products = await store.get("products", { type: "json" });
      
      if (!Array.isArray(products) || products.length === 0) {
        // Si está vacío, la API responderá un array vacío y el script.js usará 
        // los productos locales que tiene por defecto en su código.
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