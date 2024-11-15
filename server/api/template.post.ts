import { $fetch } from "ofetch";
import type { Template } from "~/stores/template";
import type { FilesResponse } from "~/stores/template";

export default defineEventHandler(
  eventHandler(async (event: any) => {
    const config = useRuntimeConfig();
    const method = event.method;
    let url = "";

    if (config.NODE_ENV === "production") {
      url = config.HK_SERVER + "/template/";
    } else {
      url = config.HK_LOCAL + "/template/";
    }
    // console.log("url", url);
    console.log("method", method);

    try {
      // console.log("body inside the post ", event);
      if (method === "POST") {
        const body = await readBody(event);
        console.log("body", body);
        try {
          const response = await $fetch<FilesResponse>(url, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${body.accessToken}`,
            },
            body,
          });
          console.log("response", response);
          return response;
        } catch (err) {
          console.error(err);
        }
      }
    } catch (error) {
      throw createError({
        statusMessage: `Error sending to IA: ${error}`,
      });
    }
  })
);
