import { defineStore } from "pinia";
import { useUserStore } from "./user"; // Add this import

interface FileUploadsState {
  files: any[];
  count: number;
}
export interface FilesResponse {
  total: number;
  skip: number;
  limit: number;
  data: any[];
}
export const useFileUploadsStore = defineStore({
  id: "FileUploadsStore",
  state: (): FileUploadsState => ({
    files: [],
    count: 0,
  }),
  actions: {
    async getFilesFromUser(userId: string) {
      const url = "/api/filesupload/";
      const response = await $fetch<FilesResponse>(url, {
        method: "GET",
        // body: {
        //   folder: userId,
        // },
      });
      return response;
    },
    async getFilesFromCollege(collegeId: string) {
      const url = "/api/filesupload/";
      const response = await $fetch<FilesResponse>(url, {
        method: "GET",
        // body: {
        //   folder: collegeId,
        // },
      });
      return response;
    },
    async getAllFiles(limit: number, skip: number) {
      const userStore = useUserStore(); // Get user store instance
      const url = "/api/filesupload/";
      const response = await $fetch<FilesResponse>(url, {
        method: "GET",
        params: {
          // folder: "all",
          limit,
          skip,
          accessToken: userStore.accessToken,
        },
      });
      this.files = response.data;
      this.count = response.total;
      return response;
    },
  },
});
