<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import { usePDFStore } from "~/stores/pdf";
const userStore = useUserStore();
const pdfStore = usePDFStore();

definePageMeta({ middleware: "auth", layouts: "app" });
// This will be requested on server-side
const { data } = await useFetch<{ licenseKey: string }>('/api/vpv-license-key');
// If the value is empty or incorrect, the watermark will remain.
const licenseKey = computed(() => data.value?.licenseKey);
const pdfSource = computed(() => {
    return pdfStore.currentPdf || 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf';
})
const jsonData = ref({
});

const mode = ref('tree');


const onError = (error) => {
    //
}

const onFocus = () => {
    //
}

const onBlur = () => {
    //
}
</script>

<template>
    <div v-if="!userStore.isLoading" class="flex min-h-screen items-center justify-center">
        <div class="w-full px-4 space-y-6">
            <UCard>
                <template #header>
                    Carga el fichero pdf
                </template>

                <load-file />
            </UCard>
            <UCard>
                <ClientOnly>
                    <template #header>
                        Visualizador de pdf
                    </template>
                    <!-- <div class="overflow-hidden"> -->
                    <div class="w-full" style=" height: 700px">
                        <AppPdfViewer :src="pdfSource" title="Proyecto" :licenseKey="licenseKey" />
                        <!-- </div> -->
                    </div>
                </ClientOnly>
            </UCard>

            <UCard>
                <template #header>
                    Convierte el pdf a json para poder ser tratado por la IA
                </template>
                <UButton @click="pdfStore.setPdf(pdfSource)"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Convertir a JSON cargar
                    pdf a store
                </UButton>
            </UCard>
            <UCard>
                <template #header>
                    Visualizador del resultado JSON
                </template>
                <div class="overflow-hidden">
                    <div class="w-full h-full">
                        <json-editor height="700" mode="tree" v-model:json="jsonData" @error="onError" @focus="onFocus"
                            @blur="onBlur" />
                    </div>
                </div>
            </UCard>
        </div>
    </div>
</template>
