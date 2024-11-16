import { $fetch } from "ofetch";
import type { FilesResponse } from "~/stores/template";

export default defineEventHandler(
  eventHandler(async (event: any) => {
    const config = useRuntimeConfig();
    let url = "";
    const body = await readBody(event);

    if (config.NODE_ENV === "production") {
      url = config.HK_SERVER + "/template/" + body._id;
    } else {
      url = config.HK_LOCAL + "/template/" + body._id;
    }

    try {
      const body = await readBody(event);
      const response = await $fetch<FilesResponse>(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${body.accessToken}`,
        },
      });
      return response;
    } catch (error) {
      throw createError({
        statusMessage: `Error deleting template: ${error}`,
      });
    }
  })
);
