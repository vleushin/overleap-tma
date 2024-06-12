<script setup lang="ts">
import { onBeforeMount, onErrorCaptured } from 'vue'
import { useTelegram } from '@/application/services'
import { TonConnectUIProvider } from '@/presentation/components'

import mixpanel from 'mixpanel-browser'

mixpanel.init('89b8250840a021dcff3d9b8204c38788', {
  debug: true,
  track_pageview: true,
  ignore_dnt: true,
  persistence: 'localStorage',
})

const { colorScheme } = useTelegram()

/**
 * Hook will be called when next screen just added to the DOM
 * We use it to scroll to the top of the page
 */
function onBeforeSegue(): void {
  requestAnimationFrame(() => {
    window.scrollTo(0, 0)
  })
}

onErrorCaptured((error: Error) => {
  console.error(error)
})

onBeforeMount(() => {
  if (colorScheme !== undefined) {
    document.body.classList.add(colorScheme)
  }
})
</script>

<template>
  <TonConnectUIProvider
    :manifestUrl="'https://gist.githubusercontent.com/vleushin/2b277da333b26d5724dd61d035d899db/raw/67d05f9690167e795a4be173442eaab70e892aa7/gistfile1.txt'">
    <div class="app">
      <div class="app-header"></div><!--Teleport location for PageWithHeader component-->
      <RouterView v-slot="{ Component }">
        <transition
          name="default-segue"
          @before-enter="onBeforeSegue">
          <component :is="Component"/>
        </transition>
      </RouterView>
    </div>
  </TonConnectUIProvider>
</template>

<style>
@import '@/presentation/styles/theme/typescale.css';

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

#app {
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
