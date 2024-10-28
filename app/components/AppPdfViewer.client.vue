<script lang="ts" setup>
import { VPdfViewer, useLicense, VPVBaseProps } from '@vue-pdf-viewer/viewer';

const props = defineProps({
    ...VPVBaseProps,
    title: String,
    licenseKey: {
        type: String,
        required: false
    }
})
useLicense({ licenseKey: props.licenseKey });
</script>
<template>
    <div>
        <h2>
            {{ props.title }}
        </h2>
        <div class="w-full" :style="{ height: '700px', margin: '0 auto' }">
            <VPdfViewer v-bind="$props" :darkMode="true" />
        </div>
    </div>
</template>