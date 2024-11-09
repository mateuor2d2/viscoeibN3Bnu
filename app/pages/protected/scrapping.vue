<script lang="ts" setup>
import { useUserStore } from "~/stores/user";
const userStore = useUserStore();
definePageMeta({ middleware: "auth", layout: "applic" });

const searchResults = ref<Array<{ name: string, email: string }>>([]);
const isLoading = ref(false);
const names = ref("");

const performScraping = async () => {
  isLoading.value = true;
  // convert names to an array
  const namesArray = names.value.split('\n').map(name => name.trim());

  try {
    const response = await $fetch<Array<{ name: string, email: string }>>('/api/scrappe', {
      method: 'POST',
      body: {
        names: namesArray
      }
    });
    searchResults.value = response;
  } catch (error) {
    console.error('Scraping error:', error);
  } finally {
    isLoading.value = false;
  }
};</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Web Scraping Tool</h1>

    <UTextarea v-model="names" placeholder="Enter names (one per line)" class="mb-4" :rows="5" />

    <UButton :loading="isLoading" @click="performScraping" color="primary" class="mb-4">
      Start Scraping
    </UButton>

    <div v-if="searchResults.length" class="mt-4">
      <UTable :rows="searchResults" :columns="[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' }
      ]" />
    </div>
  </div>
</template>

<style></style>