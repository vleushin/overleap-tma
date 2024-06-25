<script setup lang="ts">
import useTelegram from "../composables/useTelegram";
import useLottie from "../composables/useLottie";
import { ref, onMounted, onUnmounted } from "vue";
import { onBeforeRouteLeave } from 'vue-router';
import { navigateTo } from "nuxt/app";
import { usePrice } from "../composables/usePrice";
import Lottie from "../components/Lottie.vue";


const telegram = useTelegram();
const { t } = useI18n()
const { price, setPrice } = usePrice();
const { animationData } = useLottie('hehehe');

const priceToSet = ref('');

onMounted(() => {
  telegram.showMainButton(t('save'), () => {
    if (priceToSet.value && Number(priceToSet.value) > 0) {
      setPrice(Math.abs(Number(priceToSet.value)));
    }
    navigateTo("/");
  });
  telegram.showBackButton(() => {
    navigateTo('/');
  });
});

onBeforeRouteLeave(() => {
  telegram.hideBackButton();
  telegram.hideMainButton();
});
</script>
<template>
  <div class="set-price-container">
    <h1>{{ $t('setYourAttentionPrice') }}</h1>
    <p>{{ $t('settingPricesIsIndividual') }} </p>
    <Lottie v-if="animationData" :animation-data="animationData" width="150px" height="150px" />
    <PriceInput v-model="priceToSet" :placeholder="price" />
  </div>
</template>
<style>
@import '~/assets/css/theme/typescale.css';

.set-price-container {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center
}

h1 {
  @apply --title-2-semibold;
  text-align: center;
  margin-top: var(--spacing-10);
  margin-bottom: var(--spacing-10);
}

p {
  margin-top: var(--spacing-8);
  color: var(--color-hint);
  max-width: 300px;
}
</style>
