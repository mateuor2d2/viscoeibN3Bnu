export default defineEventHandler((event) => {
  const { NUXT_VPV_LICENSE_KEY } = useRuntimeConfig(event);
  return {
    licenseKey: NUXT_VPV_LICENSE_KEY,
  };
});
