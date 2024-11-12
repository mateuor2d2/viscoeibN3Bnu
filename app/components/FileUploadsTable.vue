<script setup lang="ts">
interface FileUpload {
    url: string
    key: string
    originalname: string
    size: number
    lastModified: Date
}

const props = defineProps<{
    files: FileUpload[]
    itemsPerPage?: number
}>()
import { useFileUploadsStore } from "~/stores/fileUploads";
const fileUploadsStore = useFileUploadsStore();

const currentPage = ref(1)
const itemsPerPage = computed(() => props.itemsPerPage || 10)

const paginatedFiles = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return props.files.slice(start, end)
})

const totalPages = computed(() => Math.ceil(props.files.length / itemsPerPage.value))

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

</script>

<template>
    <div>
        <UTable :rows="paginatedFiles" :columns="[
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
            <UPagination v-model="currentPage" :total="totalPages" :ui="{ wrapper: 'gap-1' }" />
        </div>
    </div>
</template>
