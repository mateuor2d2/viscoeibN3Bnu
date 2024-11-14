import { defineStore } from "pinia";
import { useUserStore } from "./user"; // Add this import

export interface Template {
  _id: string;
  name: string;
  jsonStructure: string;
}
export interface FilesResponse {
  total: number;
  skip: number;
  limit: number;
  data: any[];
}

export const useTemplateStore = defineStore("template", {
  state: () => ({
    templates: [] as Template[],
    selectedTemplate: null as Template | null,
    isSaving: false,
  }),
  actions: {
    async fetchTemplates() {
      const userStore = useUserStore(); // Get user store instance
      const response = await $fetch<FilesResponse>("/api/template", {
        params: {
          $skip: 0,
          $limit: 9999,
          accessToken: userStore.accessToken,
        },
      });
      console.log(response.data[0].jsonStructure);

      this.templates = response.data.map((template) => ({
        ...template,
        jsonStructure: JSON.parse(template.jsonStructure),
      }));
    },
    setSelectedTemplate(template: Template) {
      this.selectedTemplate = template;
    },
    async saveTemplate(template: Template) {
      const userStore = useUserStore(); // Get user store instance
      if (template._id === "") {
        // remove _id from template object
        delete template._id;
      }
      const response = await $fetch<FilesResponse>("/api/template", {
        method: "POST",
        body: {
          ...template,
          accessToken: userStore.accessToken,
        },
      });
      this.templates = response.data.map((template) => ({
        ...template,
        jsonStructure: JSON.parse(template.jsonStructure),
      }));
    },
  },
});
