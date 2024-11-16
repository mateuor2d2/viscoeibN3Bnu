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

    // console.log("body inside the post ", event);
    if (method === "PUT") {
      const body = await readBody(event);
      console.log("body", body);
      try {
        const response = await $fetch<FilesResponse>(url, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${body.accessToken}`,
          },
          body: body.template,
        });
        console.log("response", response);
        return response;
      } catch (error: unknown) {
        throw createError({
          statusCode: 400,
          statusMessage: `Failed to update template`,
        });
      }
    }
  })
);
