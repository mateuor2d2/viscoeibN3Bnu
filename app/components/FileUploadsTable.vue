<script setup lang="ts">
interface FileUpload {
    url: string
    key: string
    originalname: string
    size: number
    lastModified: Date
}

// const props = defineProps<{
//     // files: FileUpload[]
//     itemsPerPage?: number
//     // count?: number
// }>()
import { useFileUploadsStore } from "~/stores/fileUploads";
const fileUploadsStore = useFileUploadsStore();
const files = computed(() => fileUploadsStore.files)
const count = computed(() => fileUploadsStore.count)
const currentPage = ref(1)
const itemsPerPage = ref(10)

// const totalPages = computed(() => Math.ceil(props.files.length / itemsPerPage.value))

const formatFileSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB']
    let size = bytes
    let unitIndex = 0

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024
        unitIndex++
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`
}
async function update() {
    const params: Record<string, any> = {
        limit: 10,
        skip: (currentPage.value - 1) * itemsPerPage.value,
    }
    try {
        const response = await fileUploadsStore.getAllFiles(params.limit, params.skip)
        console.log('response', response)
    } catch (error) {
        console.error('Failed to load all projects:', error)
    }

}
async function goPage(pagelocal: number) {
    const params: Record<string, any> = {
        limit: 10,
        skip: (pagelocal - 1) * itemsPerPage.value,
    }
    currentPage.value = pagelocal
    try {
        const response = await fileUploadsStore.getAllFiles(params.limit, params.skip)
        console.log('response', response)
    } catch (error) {
        console.error('Failed to load all projects:', error)
    }

}
</script>

<template>
    <div>
        <UTable :rows="fileUploadsStore.files" :columns="[
            {
                key: 'originalname',
                label: 'File Name'
            },
            {
                key: 'url',
                label: 'URL',
                class: 'max-w-[200px] truncate'
            },
            {
                key: 'key',
                label: 'Key'
            },
            {
                key: 'size',
                label: 'Size',
                formatter: (value) => formatFileSize(value)
            },
            {
                key: 'lastModified',
                label: 'Last Modified',
                formatter: (value) => new Date(value).toLocaleString()
            }
        ]">
            <template #url-data="{ row }">
                <ULink :to="row.url" target="_blank" class="truncate">
                    {{ row.url }}
                </ULink>
            </template>
        </UTable>

        <div class="mt-4 flex justify-center">
            <!-- <UPagination v-model="currentPage" :total="count" :ui="{ wrapper: 'gap-1' }" /> -->
            <UPagination class="place-content-center" v-model="currentPage" :page-count="10" :total="count" :ui="{
                rounded: 'first-of-type:rounded-s-md last-of-type:rounded-e-md',
            }" :max="7" @click="update">
                <template #first="{ onClick }">
                    <UTooltip text="First page">
                        <UButton icon="i-heroicons-arrow-uturn-left" color="primary" :ui="{ rounded: 'rounded-full' }"
                            class="rtl:[&_span:first-child]:rotate-180 me-2" @click="goPage(1)" />
                    </UTooltip>
                </template>

                <template #last="{ onClick }">
                    <UTooltip text="Last page">
                        <UButton icon="i-heroicons-arrow-uturn-right-20-solid" color="primary"
                            :ui="{ rounded: 'rounded-full' }" class="rtl:[&_span:last-child]:rotate-180 ms-2"
                            @click="goPage(Math.ceil(count / 10))" />
                    </UTooltip>
                </template>
            </UPagination>
        </div>
    </div>
</template>
