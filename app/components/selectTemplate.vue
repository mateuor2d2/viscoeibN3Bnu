<script lang="ts" setup>
import { useTemplateStore } from '~/stores/template'
const templateStore = useTemplateStore()
const templates = computed(() => templateStore.templates)
const isOpen = ref(false)
async function saveCurrentTemplate() {
  if (!templateStore.selectedTemplate) return

  await templateStore.saveTemplate({

    _id: templateStore.selectedTemplate._id,
    name: templateStore.selectedTemplate.name,
    jsonStructure: templateStore.selectedTemplate.jsonStructure
  })
  templateStore.isSaving = true
  await templateStore.fetchTemplates()
  templateStore.isSaving = false
}
async function saveNewTemplate() {
  if (!templateStore.selectedTemplate) return
  await templateStore.saveTemplate({
    _id: '',
    name: templateStore.selectedTemplate.name,
    jsonStructure: templateStore.selectedTemplate.jsonStructure
  })
  templateStore.isSaving = true
  await templateStore.fetchTemplates()
  templateStore.isSaving = false
}
const newTemplate = (tipo: string) => {
  if (tipo === 'new') {
    templateStore.selectedTemplate = {
      _id: '',
      name: '',
      jsonStructure: ''
    }
    isOpen.value = true
  } else {
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
}
const handleTemplateSelection = (selected: string) => {
  console.log('Selected template:', selected)
  if (selected) {
    const index = templates.value.findIndex(t => t._id === selected)
    templateStore.selectedTemplate = templateStore.templates[index]
  }
}
onMounted(async () => {
  await templateStore.fetchTemplates()
  // templateStore.selectedTemplate = templateStore.templates[0]
})
</script>
<template>
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
      <UButton class="mt-4" @click=saveNewTemplate>save </UButton>
    </UCard>
  </UModal>
  <div class="grid grid-cols-2 gap-4">
    <div class="col-span-1">
      <USelect v-model="templateStore.selectedTemplate" :options="templates" option-attribute="name"
        value-attribute="_id" placeholder="Select a template" @update:model-value="handleTemplateSelection" />
      <div v-if="templateStore.selectedTemplate" class="grid grid-cols-4 gap-4">
        <UButton :loading="templateStore.isSaving" class="mt-4" @click="saveCurrentTemplate">
          Save Template
        </UButton>
        <UButton :loading="templateStore.isSaving" class="mt-4" @click="newTemplate('no es nuevo')">
          New Template from template
        </UButton>
        <UButton :loading="templateStore.isSaving" class="mt-4" @click="newTemplate('new')">
          New Template
        </UButton>
      </div>
    </div>
    <div class="col-span-1">
      <json-editor v-if="templateStore.selectedTemplate" height="500" mode="tree"
        v-model:json="templateStore.selectedTemplate.jsonStructure" />
    </div>
  </div>
</template>
