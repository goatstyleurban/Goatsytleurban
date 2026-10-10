import { getStore } from "@netlify/blobs";

export const handler = async (event, context) => {
  try {
    // Instanciación manual pasando siteID y token de forma explícita
    const store = getStore({
      name: "goat_style_store",
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_AUTH_TOKEN,
    });

    // Lógica para autenticar en login / POST
    if (event.httpMethod === "POST" && event.path.includes("/login")) {
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

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "API activa" })
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