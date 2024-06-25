<script setup lang="ts">
import { onMounted } from "vue";
import { onBeforeRouteLeave } from 'vue-router';
import { navigateTo, useRuntimeConfig } from "nuxt/app";
import useTelegram from "../composables/useTelegram";
import useLottie from "../composables/useLottie";
import WebApp from "@twa-dev/sdk";

const { animationData } = useLottie('simp');

const runtimeConfig = useRuntimeConfig();

const telegram = useTelegram();
const { t } = useI18n()

onMounted(() => {
  console.log('onMounted txSent!')
  telegram.showMainButton(t('done'), () => {
    navigateTo('/');
  });
  telegram.showBackButton(() => {
    navigateTo('/');
  });
  WebApp.ready();
});

onBeforeRouteLeave(() => {
  console.log('onUnmounted txSent!')
  telegram.hideBackButton();
  telegram.hideMainButton();
});

const route = useRoute();
const txHash = route.query.txHash;
</script>
<template>
  <div class="tx-sent-page">
    <h1>{{ $t('transactionSent')}}</h1>
    <p class="caption">
      {{ $t('itUsuallyTakes20Seconds')}}
    </p>
    <Lottie v-if="animationData" :animation-data="animationData" width="150px" height="150px" />
    <div class="tonscan-container">
      <div class="secondary-button"
        @click="navigateTo(`https://tonviewer.com/transaction/${txHash}`, { external: true, open: { target: '_blank' } })">
        <Icon name="tonviewer"></Icon>TonViewer
      </div>
      <div class="secondary-button"
        @click="navigateTo(`https://tonscan.org/tx/${txHash}`, { external: true, open: { target: '_blank' } })">
        <Icon name="tonscan"></Icon> TonScan
      </div>
    </div>
  </div>
</template>
<style scoped>
@import '~/assets/css/theme/typescale.css';

.tx-sent-page {
  display: flex;
  flex-flow: column;
  justify-content: center;
  place-items: center;
  text-align: center;
}

h1 {
  @apply --title-2-semibold;
  text-align: center;
  margin-top: var(--spacing-10);
  margin-bottom: var(--spacing-10);
}

.caption {
  margin-top: var(--spacing-8);
  margin-bottom: var(--spacing-28);
  color: var(--color-hint);
  max-width: 300px;
}

.tonscan-container {
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
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(svg) {
  width: 30px;
  height: 30px;
  padding-right: 5px;
}
</style>
