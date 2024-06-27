<script setup lang="ts">
import WebApp from '@twa-dev/sdk';

onMounted(() => {
  WebApp.expand();
});

const hashedId = useState('hashedId');
const link = useState('link');
await callOnce(async () => {
  const data = await $fetch('/api/link', {
    headers: {
      'Authorization': `tma ${WebApp.initData}`
    }
  });
  if (data) {
    hashedId.value = data.hashedId;
    link.value = data.link;
  }
});

const runtimeConfig = useRuntimeConfig();
const { setLocale } = useI18n()
const locale = WebApp.initDataUnsafe?.user?.language_code || 'en'
setLocale(locale);
</script>
<template>
  <div class="app">
    <TonConnectUIProvider
      :manifest-url="`${runtimeConfig.public.tonconnectManifestUrl}`"
      :actions-configuration="{ twaReturnUrl: `https://t.me/${runtimeConfig.public.botName}` }"
      :language="locale">
      <div class="app-header" /><!--Teleport location for PageWithHeader component-->
      <NuxtPage />
    </TonConnectUIProvider>
  </div>
</template>
<style>
@import '~/assets/css/theme/typescale.css';

:root {
  color-scheme: light dark;
}

body {
  margin: 0;
  display: flex;
  min-width: 320px;
  min-height: 100vh;
  background-color: var(--color-bg-secondary);
}

#__nuxt {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 1fr;
  min-height: 100%;
  width: 100%;
  font-family: var(--family);

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;

  @media (min-width: 460px) {
    max-width: 390px;
    margin: 0 auto;
  }
}

.app {
  color: var(--color-text);
  position: relative;
  user-select: none;
}

.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.default-segue-leave-active {
  visibility: hidden;
  height: 0;
  overflow: hidden;
}

.default-segue-enter-active {
  transition: opacity 500ms ease;
  will-change: opacity;
}

.default-segue-enter-from,
.default-segue-leave-to {
  opacity: 0;
}
</style>
