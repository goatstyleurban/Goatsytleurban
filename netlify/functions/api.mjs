import { getStore } from "@netlify/blobs";

export const handler = async (event, context) => {
  try {
    // Inicializar la tienda de Blobs indicando el nombre explícito
    const store = getStore("goat_style_store");

    // Si estás en login / POST:
    if (event.httpMethod === "POST" && event.path.includes("/login")) {
      const body = JSON.parse(event.body || "{}");
      const { user, password } = body;

      const adminUser = process.env.ADMIN_USER || "admin";
      const adminPassword = process.env.ADMIN_PASSWORD;

      // Verificar las credenciales contra las variables de entorno de Netlify
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