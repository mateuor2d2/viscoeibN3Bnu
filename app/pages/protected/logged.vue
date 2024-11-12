<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import { usePDFStore } from "~/stores/pdf";
import { useFileUploadsStore } from "~/stores/fileUploads";
const userStore = useUserStore();
const pdfStore = usePDFStore();
const fileUploadsStore = useFileUploadsStore();

definePageMeta({ middleware: "auth", layout: "applic" });
// This will be requested on server-side
const { data } = await useFetch<{ licenseKey: string }>('/api/vpv-license-key');
// If the value is empty or incorrect, the watermark will remain.
const licenseKey = computed(() => data.value?.licenseKey);
const pdfSource = computed(() => {
    return pdfStore.currentPdf || 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf';
})
const jsonData = computed(() => { return pdfStore.sdIndex })
const iaData = computed(() => { return pdfStore.responseIA })
const iaMergedData = computed(() => { return pdfStore.mergedResponseIA })
const mode = ref('tree');
const yourFilesArray = computed(() => { return fileUploadsStore.files })
const yourCount = computed(() => { return fileUploadsStore.count })
// Add onMounted hook to fetch last 10 projects
onMounted(async () => {
    // it has to be done because you assure on load the componenet has something to show
    try {
        const response = await fileUploadsStore.getAllFiles(10, 0)
        console.log('response', response)
    } catch (error) {
        console.error('Failed to load all projects:', error)
    }
})
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
                    Ficheros subidos
                </template>


                <FileUploadsTable />

            </UCard>
            <UCard>
                <template #header>
                    Carga un nuevo fichero pdf
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
                    Visualizador del resultado JSON
                </template>
                <div class="overflow-hidden">
                    <div class="w-full h-full">
                        <json-editor height="700" mode="tree" v-model:json="jsonData" @error="onError" @focus="onFocus"
                            @blur="onBlur" />
                    </div>
                </div>
            </UCard>
            <UCard>
                <template #header>
                    Envia el json a la IA
                </template>
                <UButton @click="pdfStore.sendJsonsToIA()"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Enviar
                </UButton>
            </UCard>
            <UCard v-if="pdfStore.responseIA">
                <template #header>
                    Visualizador del resultado JSON
                </template>
                <div class="overflow-hidden">
                    <div class="w-full h-full">
                        <json-editor height="700" mode="tree" v-model:json="iaData" @error="onError" @focus="onFocus"
                            @blur="onBlur" />
                    </div>
                </div>
            </UCard>
            <UCard v-if="pdfStore.responseIA">
                <template #header>
                    Fusión del resultado en un solo json
                </template>
                <div class="overflow-hidden">
                    <div class="w-full h-full">
                        <json-editor height="700" mode="tree" v-model:json="iaMergedData" @error="onError"
                            @focus="onFocus" @blur="onBlur" />
                    </div>
                </div>
            </UCard>
        </div>
    </div>
</template>
