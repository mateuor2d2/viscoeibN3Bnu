import { $fetch } from "ofetch";
import type { ProjectTemplate } from "~/stores/pdf";
export default defineEventHandler(
  eventHandler(async (event: any) => {
    const config = useRuntimeConfig();
    const method = event.method;
    let url = "";

    if (config.NODE_ENV === "production") {
      url = config.IA;
    } else {
      url =
        "https://m2n8z7pa8dwbr0ft.eu-west-1.aws.endpoints.huggingface.cloud";
    }
    console.log("url", url);
    console.log("method", method);

    try {
      // console.log("body inside the post ", event);
      if (method === "POST") {
        const body = await readBody(event);
        console.log("body", body);
        try {
          const response = await $fetch<ProjectTemplate>(url, {
            method: "POST",
            headers: {
              Authorization: `Bearer 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`,
            },
            body,
          });
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
