<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content";
import { useRoute } from "vue-router";
import { useUserStore } from "#imports";
const route = useRoute();
// const planId = route.params.id;
const userStore = useUserStore();
const userId = userStore.user._id;
const { data: navigation } = await useAsyncData(
    "navigation",
    () => fetchContentNavigation(),
    { default: () => [] }
);
const { data: files } = useLazyFetch<ParsedContent[]>("/api/search.json", {
    default: () => [],
    server: false,
});

const linksHeader = [
    [
        {
            label: "Visado",
            icon: "i-heroicons-home",
            to: "/protected/logged",
        },
        {
            label: "Scrapping",
            icon: "i-heroicons-computer-desktop-solid",
            to: "/protected/scrapping/",
        },
        {
            label: "Usuario",
            icon: "i-heroicons-user-circle",
            to: "/protected/usuarios/" + userId + "/usuario",
        },

        {
            label: "Settings",
            icon: "i-heroicons-wrench",
            to: "/protected/usuarios/" + userId + "/settings",
        }
    ]
];
const links = [
    {
        label: "Visado",
        icon: "i-heroicons-home",
        to: "/protected/logged",
    },
    {
        label: "Scrapping",
        icon: "i-heroicons-computer-desktop-solid",
        to: "/protected/scrapping/",
    },
    {
        label: "Usuario",
        icon: "i-heroicons-user-circle",
        to: "/protected/usuarios/" + userId + "/usuario",
    },

    {
        label: "Settings",
        icon: "i-heroicons-wrench",
        to: "/protected/usuarios/" + userId + "/settings",
    }
];
</script>

<template>
    <div>
        <AppHeader />
        <!-- <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
            <UHorizontalNavigation :links="linksHeader" />
            <UColorModeButton size="sm" />
        </UDashboardToolbar> -->
        <div class="flex">
            <UDashboardSidebarLinks :links="links" />
            <div class="grow">
                <UMain>
                    <slot></slot>
                </UMain>
            </div>
        </div>
        <Footer />

        <ClientOnly>
            <LazyUContentSearch :files="files" :navigation="navigation" />
        </ClientOnly>
    </div>
</template>
