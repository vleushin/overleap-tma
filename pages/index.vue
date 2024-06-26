<script setup lang="ts">
import Placeholder from "../components/Placeholder.vue";
import YourPrice from "../components/YourPrice.vue";
import Link from "../components/Link.vue";
import { usePrice } from "../composables/usePrice";
import { useMyLink } from "../composables/useMyLink";
import { useStorage } from '@vueuse/core';
import WebApp from '@twa-dev/sdk';

definePageMeta({
  middleware: ["deeplink", "tutorial"]
});

const userWalletInStorage = useStorage<string>('userWallet', '');
const tutorialCompleted = useStorage<boolean>('tutorialCompleted', false);
const { price, isReady, isLoading } = usePrice();
const { link } = useMyLink();
const { setOptions: setTonConnectOptions } = useTonConnectUI();
const { address } = useTonAddress();
const landing = ref<InstanceType<typeof Placeholder> | null>(null);

const resetTutorial = () => {
  tutorialCompleted.value = false;
  navigateTo('/tutorial');
};

const handleSendClick = () => {
  navigateTo('/send');
};

const runtimeConfig = useRuntimeConfig();
const startParam = WebApp.initDataUnsafe?.start_param;
onMounted(() => {
  WebApp.ready();
});
</script>
<template>
  <div class="home-page">
    <Placeholder v-if="!address" ref="landing" class="landing" title="Overleap"
      :caption="$t('proveYourIntent')"
      video-filename="/overleap-intro.mp4">
      <template #picture>
        <div class="landing-picture">
          <img src="/overleap.svg" aria-hidden="true" width="68">
        </div>
      </template>ļ
    </Placeholder>
    <h1 v-if="address">{{ WebApp.initDataUnsafe.user?.first_name || 'Name' }}</h1>
    <div class="tonconnect-button">
      <TonConnectButton button-root-id="ton-connect-button" />
    </div>
    <div v-if="address">
      <YourPrice :price="price" />
      <Link :link="link" />
    </div>
    <div class="bottom-buttons-container">
      <div v-if="startParam" class="secondary-button" @click="handleSendClick">✉️ {{ $t('send') }}</div>
      <!-- <div class="secondary-button" @click="navigateTo('/txSent')">💡 Tx</div> -->
      <div class="secondary-button" @click="navigateTo('/tutorial')">💡 {{ $t('guide') }}</div>
      <div class="secondary-button" @click="navigateTo('https://t.me/overleap_app', { external: true, open: { target: '_blank' }})">🤘 {{ $t('community') }}</div>
      <div class="secondary-button"
        @click="navigateTo('https://telegra.ph/FAQ--Overleap-06-21', { external: true, open: { target: '_blank' } })">🤔 {{ $t('faq') }}
      </div>
    </div>
  </div>
</template>
<style scoped>
@import '~/assets/css/theme/typescale.css';

.landing {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  will-change: height;
  transition: height 300ms ease;
  padding-block: 20px;

  &:not(&--loaded) {
    height: calc(var(--tg-viewport-stable-height) - var('40px') - var(--size-cell-h-margin) - var(--size-cell-v-margin));
  }

  &-picture {
    height: 110px;
    width: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.home-page {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  transform: translateZ(0);

  .sections {
    flex-grow: 1;
    grid-auto-rows: min-content;
  }
}

.tonconnect-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: var(--spacing-10)
}

h1 {
  @apply --title-2-semibold;
  text-align: center;
  margin-top: var(--spacing-10);
  margin-bottom: var(--spacing-10);
}

h3 {
  @apply --title-2-semibold;
  text-align: center;
  margin-bottom: var(--spacing-10);
}

.bottom-buttons-container {
  padding: 10px;
  margin-top: var(--spacing-28);
  display: flex;
  flex-flow: row;
  gap: var(--spacing-10);
  flex-wrap: wrap;
  justify-content: center;
}

.secondary-button {
  @apply --secondary-button;
}
</style>
