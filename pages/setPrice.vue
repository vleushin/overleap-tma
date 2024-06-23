<script setup lang="ts">
import useTelegram from "../composables/useTelegram";
import useLottie from "../composables/useLottie";
import { ref, onMounted, onUnmounted } from "vue";
import { navigateTo } from "nuxt/app";
import { usePrice } from "../composables/usePrice";
import Lottie from "../components/Lottie.vue";


const telegram = useTelegram();
const { price, setPrice } = usePrice();
const { animationData } = useLottie('hehehe');

const priceToSet = ref('');

onMounted(() => {
  telegram.showMainButton("Set", () => {
    if (priceToSet.value && Number(priceToSet.value) > 0) {
      setPrice(Math.abs(Number(priceToSet.value)));
    }
    navigateTo("/");
  });
  telegram.showBackButton(() => {
    navigateTo('/');
  });
});

onUnmounted(() => {
  telegram.hideBackButton();
  telegram.hideMainButton();
});
</script>
<template>
  <div class="set-price-container">
    <h1>Set price</h1>
    <p>Setting prices is individual for everybody. We recommend starting between $1 and
      $5. But sky is the limit.</p>
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
