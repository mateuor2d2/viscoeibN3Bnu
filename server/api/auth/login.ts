import { FeathersResponseAuthentication } from "~/stores/user";

export default defineEventHandler(
  eventHandler(async (event: any) => {
    const config = useRuntimeConfig();
    const { email, password, strategy } = await readBody(event);
    console.log("Logging in with:", email, password, strategy);
    if (!email || !password || !strategy) {
      throw createError({
        statusMessage: "required field",
      });
    }
    // define user of type User from stores/user
    let url: string;

    if (config.NODE_ENV === "production") {
      url = config.HK_SERVER + "/authentication";
    } else {
      url = config.HK_LOCAL + "/authentication";
    }
    try {
      const response = await $fetch<FeathersResponseAuthentication>(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          email,
          password,
          strategy,
        },
      });
      console.log("data " + JSON.stringify(response));
      return {
        loggedIn: true,
        user: response.user,
        accessToken: response.accessToken,
      };
    } catch (error) {
      throw createError({
        statusMessage: "Error message",
      });
    }
  })
);
