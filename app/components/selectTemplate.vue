<script lang="ts" setup>
import { useTemplateStore } from '~/stores/template'
const templateStore = useTemplateStore()
const isOpen = ref(false)
const isAlertOpen = ref(false)
const hasChanges = ref(false)
const toast = useToast()
async function updateCurrentTemplate() {
  if (!templateStore.selectedTemplate) return

  await templateStore.updateTemplate({

    _id: templateStore.selectedTemplate._id,
    name: templateStore.selectedTemplate.name,
    jsonStructure: templateStore.selectedTemplate.jsonStructure
  })
  templateStore.isSaving = true
  await templateStore.fetchTemplates()
  templateStore.isSaving = false
}
const saveTemplate = async () => {
  if (!templateStore.selectedTemplate) return
  try {

    await templateStore.saveTemplate({
      _id: templateStore.selectedTemplate._id,
      name: templateStore.selectedTemplate.name,
      jsonStructure: templateStore.selectedTemplate.jsonStructure
    })
    templateStore.isSaving = true
    await templateStore.fetchTemplates()
    templateStore.isSaving = false
    isOpen.value = false
    toast.add({
      title: 'Success!',
      description: 'Template saved successfully',
      icon: 'i-heroicons-check-circle',
      color: 'green',
      timeout: 3000,

    })
  } catch (error) {
    toast.add({
      title: `Error ${error.response.status}`,
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
  let arrayJsonStructure = templateStore.selectedTemplate.jsonStructure
  if (typeof templateStore.selectedTemplate.jsonStructure === 'object') {
    arrayJsonStructure = JSON.stringify(arrayJsonStructure)
  }
  templateStore.selectedTemplate = {
    _id: '',
    name: 'Copy_' + randomString + '_' + templateStore.selectedTemplate.name,
    jsonStructure: arrayJsonStructure
  }
  isOpen.value = true
  templateStore.isSaving = false


}
const handleTemplateSelection = (selected: string) => {
  console.log('Selected template:', selected)
  if (selected) {
    const index = templateStore.templates.findIndex(t => t._id === selected)
    templateStore.selectedTemplate = templateStore.templates[index]
    console.log('Selected template:', templateStore.selectedTemplate)
  }
}

// watch(() => templateStore.selectedTemplate, (newVal) => {
//   if (newVal) {
//     originalTemplate.value = JSON.parse(JSON.stringify(newVal))
//   }
// }, { immediate: true })

// const hasChanges = computed(() => {
//   if (!templateStore.selectedTemplate || !originalTemplate.value) return false

//   return JSON.stringify(originalTemplate.value) !== JSON.stringify(templateStore.selectedTemplate)
// })
async function handleDeleteClick() {
  isAlertOpen.value = true
}

async function confirmDelete() {
  if (!templateStore.selectedTemplate?._id) return

  templateStore.isSaving = true
  try {
    await templateStore.deleteTemplate(templateStore.selectedTemplate._id)
    await templateStore.fetchTemplates()
    templateStore.selectedTemplate = null
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
    templateStore.selectedTemplate = null

  } catch (error) {
    isAlertOpen.value = false  // Close modal even on error
    console.error('Failed to delete template:', error)
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
  // templateStore.selectedTemplate = templateStore.templates[0]
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
          <UInput class="mb-4" v-model="templateStore.selectedTemplate.name" label="Name" placeholder="Name" />
          <UTextarea class="mt-4" v-model="templateStore.selectedTemplate.jsonStructure" label="JSON Structure" />
        </div>
      </div>
      <UButton class="mt-4" @click=saveTemplate>save </UButton>
    </UCard>
  </UModal>
  <div class="grid grid-cols-2 gap-4">
    <div class="col-span-1">
      <USelect :model-value="templateStore.selectedTemplate?._id" :options="templateStore.templates"
        option-attribute="name" value-attribute="_id" placeholder="Select a template"
        :label="templateStore.selectedTemplate?.name" @update:model-value="handleTemplateSelection">
        <template #leading>
          <UIcon name="i-heroicons-magnifying-glass-16-solid" class="w-5 h-5" />
        </template>
      </USelect>
      <div v-if="templateStore.selectedTemplate" class="grid grid-cols-4 gap-4">
        <UTooltip v-show="hasChanges" text="overwrites the actual template">
          <UButton v-show="hasChanges" icon="i-heroicons-circle-stack-solid" size="sm" color="primary" variant="solid"
            label="Button" :trailing="false" :loading="templateStore.isSaving" class="mt-4"
            @click="upadateCurrentTemplate">
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
      <json-editor v-if="templateStore.selectedTemplate" height="500" mode="text"
        v-model="templateStore.selectedTemplate.jsonStructure" @update:modelValue="hasChanges = true" />
    </div>
  </div>
</template>
