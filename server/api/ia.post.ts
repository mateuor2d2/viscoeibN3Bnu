import { $fetch } from "ofetch";
import type { ProjectTemplate, ResultsTemplate } from "~/stores/pdf";
export default defineEventHandler(
  eventHandler(async (event: any) => {
    const config = useRuntimeConfig();
    const method = event.method;
    let url = "";

    if (config.NODE_ENV === "production") {
      url = config.IA;
    } else {
      url = config.IAdevelopment;
    }
    // console.log("url", url);
    console.log("method", method);

    try {
      // console.log("body inside the post ", event);
      if (method === "POST") {
        const body = await readBody(event);
        console.log("body", body);
        try {
          const response = await $fetch<ResultsTemplate>(url, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${config.IAbearer}`,
            },
            body,
          });
          console.log(
            "response",
            JSON.parse(response[0].extracted_information[0])
          );
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
