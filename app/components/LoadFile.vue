<script setup lang="ts">
import { ref } from 'vue'
import type { S3Response } from '~/stores/pdf';
const { handleFileInput, files } = useFileStorage()
const pdfStore = usePDFStore()

// interface Post {
//   title: string;
//   description: string;
//   image: {
//     src: string;
//   };
//   date: string;
// }
const storeUser = useUserStore();
const isWorking = ref(false);
// const posts = ref<Post[]>([])
const approveUpload = ref('')
const handleFileUpload = () => {
  // Handle file upload logic here
  // You can access the uploaded file(s) using event.target.files
  // and update the posts array accordingly
  // For example:
  isWorking.value = true;
  if (files.value) {
    Array.from(files.value).forEach(async (file) => {
      console.log(file.type)
      if (file.type === 'application/pdf') {

        pdfStore.setPdf(file.content)
      }
      // posts.value.push({
      //   title: file.name,
      //   description: 'Image description',
      //   image: { src: file.type === 'application/pdf' ? 'pdf-icon.png' : file.content },
      //   date: new Date().toISOString()
      // })
      const res = await useFetch<S3Response>('/api/s3', {
        method: "POST",
        body: {
          file,
          accessToken: storeUser.user.accessToken,
        }
      })
      // I have send a file to the server that is processing I need a progress only to keep the atention of the user




      // console.log('7777777777777777777777777777777777\n\n')
      // console.log('res.data.value', res.data.value.sdIndex)
      // console.log(JSON.stringify(res.data.value.sdIndex))
      isWorking.value = false;
      pdfStore.setSDIndex(JSON.parse(res.data.value.sdIndex))
    })
  }


}
// const removePost = (index: number) => {
//   posts.value.splice(index, 1)
// }

// const getImageUrl = (file: File): string => {
//   return URL.createObjectURL(file)
// }


</script>

<template>
  <div>
    <UInput type="file" multiple size="sm" icon="i-heroicons-folder" id="file-input" ref="fileInput" name="files[]"
      @input="handleFileInput" @change="" @click="approveUpload == ''" />
    <UButton icon="i-heroicons-document-arrow-up-solid" color="red" variant="ghost" size="xs"
      @click="handleFileUpload()">
      Upload
    </UButton>
    <UProgress v-if="isWorking" animation="carousel" />

    <!-- <UBlogList class="mt-4">
      <UBlogPost v-for="(post, index) in posts" :key="index" v-bind="post">
        <template #footer>
          <UButton icon="i-heroicons-x-mark" color="red" variant="ghost" size="xs" @click="removePost(index)">
            Remove
          </UButton>
        </template>
</UBlogPost>
</UBlogList> -->
  </div>
</template>