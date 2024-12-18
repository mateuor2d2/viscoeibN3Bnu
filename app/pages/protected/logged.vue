<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import { usePDFStore } from "~/stores/pdf";
import { useFileUploadsStore } from "~/stores/fileUploads";
import { useTemplateStore } from "~/stores/template";
const userStore = useUserStore();
const pdfStore = usePDFStore();
const templateStore = useTemplateStore();
const fileUploadsStore = useFileUploadsStore();
const isSending = computed(() => pdfStore.isSending)


definePageMeta({ middleware: "auth", layout: "applic" });
// This will be requested on server-side
const { data } = await useFetch<{ licenseKey: string }>('/api/vpv-license-key');
// If the value is empty or incorrect, the watermark will remain.
const licenseKey = computed(() => data.value?.licenseKey);
const pdfSource = computed(() => {
    return pdfStore.currentPdf || 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf';
})
const jsonData = computed(() => { return pdfStore.sdIndex })
// const iaData = computed(() => { return pdfStore.responseIA })
// const iaMergedData = computed(() => { return pdfStore.mergedResponseIA })
const resultsIA = computed(() => { return pdfStore.resultsIA })
const mergedResultsIA = computed(() => { return pdfStore.mergedResultsIA })
const oneMergedResultsIA = computed(() => { return pdfStore.oneMergedResultsIA })
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
    try {
        await templateStore.fetchTemplates()
    } catch (error) {
        console.error('Failed to load Templates:', error)
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
    <UContainer>
        <div v-if="!userStore.isLoading" class="flex min-h-screen items-center justify-center">
            <div class="w-full max-w-full px-4 mx-auto  lg:px-8 xl:px-12 space-y-6">
                <UCard class="w-full lg:w-auto">
                    <template #header>
                        Selecciona un template
                    </template>
                    <select-template />
                </UCard>
                <UCard>
                    <template #header>
                        Ficheros subidos
                    </template>


                    <FileUploadsTable />

                </UCard>
                <UCard v-if="pdfStore.currentPdf" class="w-full lg:w-auto">
                    <ClientOnly>
                        <template #header>
                            Visualizador de pdf
                        </template>
                        <!-- <div class="overflow-hidden"> -->
                        <div class="w-full lg:w-auto" style=" height: 700px">
                            <AppPdfViewer :src="pdfSource" title="Proyecto" :licenseKey="licenseKey" />
                            <!-- </div> -->
                        </div>
                    </ClientOnly>
                </UCard>
                <UCard class="w-full lg:w-auto">
                    <template #header>
                        Carga un nuevo fichero pdf
                    </template>
                    <load-file />
                </UCard>




                <UCard class="w-full lg:w-auto">
                    <template #header>
                        Visualizador del resultado JSON
                    </template>
                    <div class="overflow-hidden">
                        <div class="w-full h-full">
                            <json-editor height="700" mode="tree" v-model:json="jsonData" @error="onError"
                                @focus="onFocus" @blur="onBlur" />
                        </div>
                    </div>
                </UCard>
                <UCard class="w-full lg:w-auto">
                    <template #header>
                        Envia el json a la IA
                    </template>
                    <UButton @click="pdfStore.sendJsonsToIA()"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Enviar
                    </UButton>
                    <div class="space-y-4">
                        <!-- Sending Progress -->
                        <UProgress v-if="isSending" :value="(pdfStore.sendingProgress / pdfStore.totalTexts) * 100"
                            indicator :max="pdfStore.totalTexts" color="green">

                        </UProgress>

                        <!-- Receiving Progress -->
                        <UProgress v-if="isSending" :value="(pdfStore.receivingProgress / pdfStore.totalTexts) * 100"
                            :max="pdfStore.totalTexts" color="blue" indicator>

                        </UProgress>
                    </div>
                </UCard>
                <UCard class="w-full lg:w-auto" v-if="pdfStore.resultsIA">
                    <template #header>
                        Visualizador del resultado JSON
                    </template>
                    <div class="overflow-hidden">
                        <div class="w-full h-full">
                            <json-editor height="700" mode="tree" v-model:json="resultsIA" @error="onError"
                                @focus="onFocus" @blur="onBlur" />
                        </div>
                    </div>
                </UCard>
                <UCard class="w-full lg:w-auto" v-if="pdfStore.mergedResultsIA">
                    <template #header>
                        Datos fusionados en un solo json
                    </template>
                    <div class="overflow-hidden">
                        <div class="w-full h-full">
                            <json-editor height="700" mode="tree" v-model:json="mergedResultsIA" @error="onError"
                                @focus="onFocus" @blur="onBlur" />
                        </div>
                    </div>
                </UCard>
                <UCard class="w-full lg:w-auto" v-if="pdfStore.oneMergedResultsIA">
                    <template #header>
                        Datos fusionados en un solo json
                    </template>
                    <div class="overflow-hidden">
                        <div class="w-full h-full">
                            <json-editor height="700" mode="tree" v-model:json="oneMergedResultsIA" @error="onError"
                                @focus="onFocus" @blur="onBlur" />
                        </div>
                    </div>
                </UCard>
                <!-- <UCard class="w-full lg:w-auto" v-if="pdfStore.mergedResponseIA">
                    <template #header>
                        Fusión del resultado en un solo json
                    </template>
                    <UButton @click="pdfStore.testMergeJson()"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Mezcla test
                    </UButton>
                    <UButton @click="pdfStore.processmergedResponseIA()"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">optimiza resultado
                    </UButton>
                    <div class="overflow-hidden">
                        <div class="w-full h-full">
                            <json-editor height="700" mode="tree" v-model:json="iaMergedData" @error="onError"
                                @focus="onFocus" @blur="onBlur" />
                        </div>
                    </div>
                </UCard> -->
            </div>
        </div>
    </UContainer>
</template>
