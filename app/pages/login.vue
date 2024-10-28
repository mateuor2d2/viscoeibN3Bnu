<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import type { FeathersResponseAuthentication } from "~/stores/user";
import { useRouter } from "vue-router";
const router = useRouter();
const userStore = useUserStore();
definePageMeta({
  layout: "auth",
});

useSeoMeta({
  title: "Login",
});

const fields = [
  {
    name: "email",
    type: "text",
    label: "Email",
    placeholder: "Enter your email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
];

const validate = (state: any) => {
  const errors = [];
  if (!state.email)
    errors.push({ path: "email", message: "Email is required" });
  if (!state.password)
    errors.push({ path: "password", message: "Password is required" });
  return errors;
};

const providers = [
  {
    label: "Continue with GitHub",
    icon: "i-simple-icons-github",
    color: "white" as const,
    click: () => {
      console.log("Redirect to GitHub");
    },
  },
];

async function onSubmit(data: any) {
  console.log("Submitted", data);
  const dataStrategy = { ...data, strategy: "local" };
  const authResponse = await $fetch<FeathersResponseAuthentication>(
    "/api/auth/login",
    { method: "POST", body: dataStrategy }
  );

  if (
    authResponse.accessToken &&
    authResponse.user.email === dataStrategy.email
  ) {
    userStore.setUser(authResponse.user);
    userStore.setLogginIn(authResponse.loggedIn);
    userStore.setAccesstoken(authResponse.accessToken);
    router.push("/protected/logged"); // Redirect to home page
  }
}
</script>

<template>

  <div class="flex min-h-screen items-center justify-center mx-auto">
    <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">

      <UAuthForm :fields="fields" :validate="validate" :providers="providers" title="Bienvenido de nuevo" align="top"
        icon="i-heroicons-lock-closed" :ui="{ base: 'text-center', footer: 'text-center' }"
        :submit-button="{ label: 'Iniciar Sesión', trailingIcon: 'i-heroicons-arrow-right-20-solid' }"
        @submit="onSubmit">
        <template #description>
          Todavía no tienes una cuenta?
          <NuxtLink to="/signup" class="text-primary font-medium">Sign up</NuxtLink>.
        </template>

        <template #password-hint>
          <NuxtLink to="/" class="text-primary font-medium">Forgot password?</NuxtLink>
        </template>

        <template #footer>
          Logeandote acceptas nuestras condiciones de servicio.
          <NuxtLink to="/" class="text-primary font-medium">Terms of Service</NuxtLink>.
        </template>
      </UAuthForm>
    </UCard>
  </div>
</template>
