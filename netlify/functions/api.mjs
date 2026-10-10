import { getStore } from "@netlify/blobs";

export const handler = async (event, context) => {
  try {
    // Si estás en login / POST:
    if (event.httpMethod === "POST" && event.path.includes("/login")) {
      const body = JSON.parse(event.body || "{}");
      const { user, password } = body;

      const adminUser = process.env.ADMIN_USER || "admin";
      const adminPassword = process.env.ADMIN_PASSWORD;

      // Verificar las credenciales directamente contra las variables de entorno
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

    // Inicializar la tienda de Blobs solo para operaciones de la tienda (productos, etc.)
    let store;
    try {
      store = getStore("goat_style_store");
    } catch (e) {
      console.warn("Blobs no configurado:", e.message);
    }

    // Respuesta por defecto
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "API activa" })
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