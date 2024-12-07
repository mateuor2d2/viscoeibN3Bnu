<script lang="ts" setup>
import { useTemplateStore } from '~/stores/template'
const templateStore = useTemplateStore()
const isOpen = ref(false)
const isAlertOpen = ref(false)
const hasChanges = ref(false)
const toast = useToast()
// NEW: Added computed property for better reactivity
const currentTemplate = computed({
  get: () => templateStore.selectedTemplate,
  set: (value) => templateStore.selectedTemplate = value
})

async function updateCurrentTemplate() {
  if (!currentTemplate.value) return
  let arrayJsonStructure = currentTemplate.value.jsonStructure
  if (typeof currentTemplate.value.jsonStructure === 'object') {
    arrayJsonStructure = JSON.stringify(arrayJsonStructure)
  }
  try {
    templateStore.isSaving = true
    await templateStore.updateTemplate({

      _id: currentTemplate.value._id,
      name: currentTemplate.value.name,
      jsonStructure: arrayJsonStructure,
      userId: currentTemplate.value.userId
    })
    templateStore.isSaving = false
    toast.add({
      title: 'Success!',
      description: 'Template updated successfully',
      icon: 'i-heroicons-check-circle',
      color: 'green',
      timeout: 3000,

    })
  } catch (error) {
    const statusCode = error?.response?.status || 'Unknown'
    toast.add({
      title: `Error ${statusCode}`,
      description: 'Failed to update template',
      icon: 'i-heroicons-x-circle',
      color: 'red',
      timeout: 3000,
    })
  }

  await templateStore.fetchTemplates()
  templateStore.isSaving = false
}
async function saveTemplate() {
  try {
    let arrayJsonStructure = currentTemplate.value.jsonStructure
    if (typeof currentTemplate.value.jsonStructure === 'object') {
      arrayJsonStructure = JSON.stringify(arrayJsonStructure)
    }
    templateStore.isSaving = true
    const response = await templateStore.saveTemplate({
      _id: currentTemplate.value._id,
      name: currentTemplate.value.name,
      jsonStructure: arrayJsonStructure,
      userId: currentTemplate.value.userId
    })
    templateStore.isSaving = false
    isOpen.value = false
    await templateStore.fetchTemplates()
    toast.add({
      title: 'Success!',
      description: 'Template saved successfully',
      icon: 'i-heroicons-check-circle',
      color: 'green',
      timeout: 3000,

    })
  } catch (error) {
    const statusCode = error?.response?.status || 'Unknown'
    toast.add({
      title: `Error ${statusCode}`,
      description: 'Failed to save template',
      icon: 'i-heroicons-x-circle',
      color: 'red',
      timeout: 3000,
    })
  }
}
const newTemplate = async (tipo: string) => {

  // generate a random string of 3 letters to put in the name
  const randomString = Math.random().toString(36).substring(2, 5)
  // I want to identify if the jsonstructure is an array or an object
  // if is an object I want to stringify if object dont do anything
  let arrayJsonStructure = currentTemplate.value.jsonStructure
  if (typeof currentTemplate.value.jsonStructure === 'object') {
    arrayJsonStructure = JSON.stringify(arrayJsonStructure)
  }
  currentTemplate.value = {
    _id: '',
    name: 'Copy_' + randomString + '_' + currentTemplate.value.name,
    jsonStructure: arrayJsonStructure,
    userId: currentTemplate.value.userId
  }
  isOpen.value = true
  templateStore.isSaving = false


}
const handleTemplateSelection = (selected: string) => {
  console.log('Selected template:', selected)
  if (selected) {
    const index = templateStore.templates.findIndex(t => t._id === selected)
    currentTemplate.value = templateStore.templates[index]
    console.log('Selected template:', currentTemplate.value)
  }
}

// watch(() => currentTemplate.value, (newVal) => {
//   if (newVal) {
//     originalTemplate.value = JSON.parse(JSON.stringify(newVal))
//   }
// }, { immediate: true })

// const hasChanges = computed(() => {
//   if (!currentTemplate.value || !originalTemplate.value) return false

//   return JSON.stringify(originalTemplate.value) !== JSON.stringify(currentTemplate.value)
// })
async function handleDeleteClick() {
  isAlertOpen.value = true
}

async function confirmDelete() {
  if (!currentTemplate.value?._id) return

  templateStore.isSaving = true
  try {
    const response = await templateStore.deleteTemplate(currentTemplate.value._id)
    const responsefetch = await templateStore.fetchTemplates()
    currentTemplate.value = null
    templateStore.isSaving = false
    toast.add({
      title: 'Success!',
      description: 'Template deleted successfully',
      icon: 'i-heroicons-check-circle',
      color: 'green',
      timeout: 3000,

    })
    isAlertOpen.value = false
    templateStore.isSaving = false
    currentTemplate.value = null

  } catch (error) {
    const statusCode = error?.response?.status || 'Unknown'

    isAlertOpen.value = false  // Close modal even on error
    console.error('Failed to delete template:', statusCode)
    templateStore.isSaving = false
    toast.add({
      title: `Error ${error.response.status}`,
      description: 'Failed to delete template',
      icon: 'i-heroicons-x-circle',
      color: 'red',
      timeout: 3000,
    })
  }

}

onMounted(async () => {
  await templateStore.fetchTemplates()
  isAlertOpen.value = false
  // currentTemplate.value = templateStore.templates[0]
})


</script>
<template>
  <UModal v-model="isAlertOpen">
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <span>Delete Template</span>
        </div>
      </template>

      <p>Are you sure you want to delete this template? This action cannot be undone.</p>

      <template #footer>
        <div class="flex gap-2 justify-end">
          <UButton label="Cancel" variant="solid" color="primary" @click="isAlertOpen = false" />
          <UButton label="Delete" variant="solid" color="red" @click="confirmDelete" />
        </div>
      </template>
    </UCard>
  </UModal>

  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <div class="flex justify-between items-center w-full">
          <span>Ajusta las variables del nuevo template</span>
          <UButton icon="i-heroicons-x-mark" class="text-red-500" @click="isOpen = false" />
        </div>

      </template>
      <div class="grid ">
        <div class="col-span-1">
          <UInput class="mb-4" v-model="currentTemplate.name" label="Name" placeholder="Name" />
          <UTextarea class="mt-4" v-model="currentTemplate.jsonStructure" label="JSON Structure" />
        </div>
      </div>
      <UButton class="mt-4" @click=saveTemplate>save </UButton>
    </UCard>
  </UModal>
  <div class="grid grid-cols-2 gap-4">
    <div class="col-span-1">
      <USelect :model-value="currentTemplate?._id" :options="templateStore.templates" option-attribute="name"
        value-attribute="_id" placeholder="Select a template" :label="currentTemplate?.name"
        @update:model-value="handleTemplateSelection">
        <template #leading>
          <UIcon name="i-heroicons-magnifying-glass-16-solid" class="w-5 h-5" />
        </template>
      </USelect>
      <div v-if="currentTemplate" class="grid grid-cols-4 gap-4">
        <UTooltip v-show="hasChanges" text="overwrites the actual template">
          <UButton v-show="hasChanges" icon="i-heroicons-circle-stack-solid" size="sm" color="primary" variant="solid"
            label="Button" :trailing="false" :loading="templateStore.isSaving" class="mt-4"
            @click="updateCurrentTemplate">
            Update Template
          </UButton>
        </UTooltip>
        <UTooltip v-show="hasChanges" text="copy the actual template">
          <UButton v-show="hasChanges" icon="i-heroicons-document-duplicate-solid" size="sm" color="primary"
            variant="solid" label="Button" :trailing="false" :loading="templateStore.isSaving" class="mt-4"
            @click="newTemplate('no es nuevo')">
            copy template
          </UButton>
        </UTooltip>
        <UTooltip text="delete the actual template">
          <UButton icon="i-heroicons-trash-solid" size="sm" color="primary" variant="solid" label="Button"
            :trailing="false" :loading="templateStore.isSaving" class="mt-4" @click="handleDeleteClick">
            Delete Template
          </UButton>
        </UTooltip>
      </div>
    </div>
    <div class="col-span-1">
      <json-editor v-if="currentTemplate" height="500" mode="text" v-model="currentTemplate.jsonStructure"
        @update:modelValue="hasChanges = true" />
    </div>
  </div>
</template>
