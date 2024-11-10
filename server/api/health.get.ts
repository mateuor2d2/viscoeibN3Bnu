import { $fetch } from "ofetch";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  let url = "";

  if (config.NODE_ENV === "production") {
    url = config.IA + "/health/";
  } else {
    url = config.IAdevelopment + "/health/";
  }

  try {
    const response = await $fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${config.IAbearer}`,
      },
    });
    return response;
  } catch (error: any) {
    if (error.status === 502 || error.status === 503) {
      return {
        error: {
          code: 502,
          message:
            "Servidor hivernado después de la primera petición. Arrancará",
          type: "cold_start",
        },
      };
    }
    return {
      error: {
        code: error.status || 500,
        message: error.message,
        type: error.type || "server_error",
      },
    };
  }
});
