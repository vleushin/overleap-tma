<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
  price: string;
}>();

const usdtSvgSource = ref('');

onMounted(async () => {
  const usdtSvg = await import(`~/assets/icons/usdt.svg?raw`);
  usdtSvgSource.value = usdtSvg.default;
});

const changeButtonClick = () => {
  navigateTo("/setPrice");
};
</script>

<template>
  <div class="price-container">
    <h1>Price</h1>
    <div class="token-container">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span class="icon-price" v-html="usdtSvgSource" />
      <span class="token-amount">{{ props.price || '...' }}</span>
      <span class="token-name">USD₮</span>
    </div>
    <div class="secondary-button" @click="changeButtonClick">🚀 Set</div>
  </div>
</template>
<style>
@import '~/assets/css/theme/typescale.css';

.price-container {
  margin-top: var(--spacing-10);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  vertical-align: middle;
}

.price-container h1 {
  @apply --title-2;
}

.price-container h2 {
  @apply --title-3;
}

.token-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  vertical-align: middle;
}

.token-name {
  @apply --headline--semibold;
  padding: 0px 0px 0px 5px;
}

.token-amount {
  @apply --headline--semibold;
  font-family: SF Mono, Monospace;
}

.icon-price svg {
  width: 32px;
  height: 32px;
  padding-left: 10px;
  padding-right: 10px;
}

.secondary-button {
  @apply --secondary-button;
}
</style>
