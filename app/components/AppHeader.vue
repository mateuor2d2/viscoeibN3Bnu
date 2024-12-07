<script setup lang="ts">
const nuxtApp = useNuxtApp()
const { activeHeadings, updateHeadings } = useScrollspy()
const userStore = useUserStore()
const usePdf = usePDFStore()

const links = computed(() => [{
  label: 'Capacidades',
  to: '#features',
  icon: 'i-heroicons-cube-transparent',
  active: activeHeadings.value.includes('features') && !activeHeadings.value.includes('pricing')
}, {
  label: 'Pricing',
  to: '#pricing',
  icon: 'i-heroicons-credit-card',
  active: activeHeadings.value.includes('pricing') && !activeHeadings.value.includes('testimonials')
}, {
  label: 'Testimonios',
  to: '#testimonials',
  icon: 'i-heroicons-academic-cap',
  active: activeHeadings.value.includes('testimonials')
}, {
  label: 'FAQ',
  to: '#faq',
  icon: 'i-heroicons-question-mark-circle',
  active: activeHeadings.value.includes('faq')
}])

nuxtApp.hooks.hookOnce('page:finish', () => {
  updateHeadings([
    document.querySelector('#features'),
    document.querySelector('#pricing'),
    document.querySelector('#testimonials'),
    document.querySelector('#faq')
  ])
})
const serverStatus = ref('unknown')
const statusMessage = ref('')
const tooltipMessage = computed(() => {
  switch (serverStatus.value) {
    case 'healthy':
      return 'Server is running normally'
    case 'unhealthy':
      return 'Al hacer una petición arrancará pero tardará 2~3 minutos más en responder'
    default:
      return 'Checking server status...'
  }
})
const checkServerHealth = async () => {
  try {
    const response = await $fetch('/api/health')
    if (response === 'OK') {
      serverStatus.value = 'healthy'
      statusMessage.value = 'Server Online'
    } else {
      serverStatus.value = 'unhealthy'
      statusMessage.value = 'Server Offline'
    }
  } catch (error) {
    serverStatus.value = 'unhealthy'
    statusMessage.value = 'Server Offline'
  }
}
// I need to call an ia post request to wake up the server
const wakeUpServer = async () => {
  try {
    await $fetch<ProjectTemplate>("/api/ia", {
      method: "POST",
      body: {
        inputs: {
          text: "Hola, despierta",
          template: JSON.stringify(usePdf.template),
        },
      },
    });
    serverStatus.value = 'waking up'
    statusMessage.value = 'Server Waking Up, wait 2~3 minutes'
  } catch (error) {
    serverStatus.value = 'unhealthy'
    statusMessage.value = 'Server Offline'
  }
}

// Check health every 1 minutes
onMounted(() => {
  checkServerHealth()
  setInterval(checkServerHealth, 60000)
})

const getStatusColor = computed(() => {
  switch (serverStatus.value) {
    case 'healthy': return 'green'
    case 'unhealthy': return 'red'
    default: return 'gray'
  }
})
</script>

<template>
  <UHeader>
    <!-- <UHeader v-if="!userStore.user == null || !userStore.user?.accessToken"> -->

    <!-- <UHeader v-else :links="links"> -->

    <template #logo>
      VisadoPro
      <UBadge label="Beta" variant="subtle" class="mb-0.5" />
    </template>
    <template #center>
      <UTooltip v-if="userStore.user !== null || userStore.user?.accessToken">
        <template #text>
          <div class="whitespace-pre-line">
            {{ tooltipMessage }}
          </div>
        </template>
        <UButton v-if="userStore.user !== null || userStore.user?.accessToken"
          :label="statusMessage || 'Checking Status...'" :color="getStatusColor"
          :icon="serverStatus === 'healthy' ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'"
          @click="wakeUpServer">
        </UButton>
      </UTooltip>
    </template>
    <template #right>
      <UButton v-if="!userStore.user == null || !userStore.user?.accessToken" label="Sign in" to="/login" color="white"
        variant="ghost" trailing-icon="i-heroicons-arrow-right-20-solid" class="hidden lg:flex" />
      <UButton v-else label="Sign out" color="red" variant="ghost" trailing-icon="i-heroicons-power"
        class="hidden lg:flex" @click="userStore.logout()" />
    </template>

    <template #panel>
      <UAsideLinks :links="links" />

      <UDivider class="my-6" />

      <UButton label="Sign in" to="/login" color="white" block class="mb-3" />
      <UButton label="Get started" block />
    </template>
  </UHeader>
</template>
