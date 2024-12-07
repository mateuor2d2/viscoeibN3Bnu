import { $fetch } from "ofetch";
import { FilesResponse } from "~/stores/template";
export default defineEventHandler(
  eventHandler(async (event: any) => {
    const config = useRuntimeConfig();
    const method = event.method;
    let url = "";

    if (config.NODE_ENV === "production") {
      url = config.HK_SERVER + "/file-upload/";
    } else {
      url = config.HK_LOCAL + "/file-upload/";
    }
    // console.log("url", url);
    console.log("method", method);

    try {
      // console.log("body inside the post ", event);
      if (method === "GET") {
        const query = getQuery(event);
        // const params = event.context.params;
        const { limit, skip, accessToken, userId } = query;
        console.log("query", query);

        const response = await $fetch<FilesResponse>(url, {
          method: "GET",
          params: {
            $limit: limit,
            $skip: skip,
            userId: userId,
          },
          headers: {
            // "Content-Type": `multipart/form-data; boundary=${boundary}`,
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return response;
      }
    } catch (error) {
      console.log("error", error);
      return error;
    }
  })
);
