import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  watch(userStore.$state, () => {
    if (!userStore.loggedIn) {
      return navigateTo("/");
    }
  });
  if (!userStore.loggedIn) {
    return navigateTo("/");
  }
});
