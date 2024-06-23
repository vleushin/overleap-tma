<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
  /**
   * Name of the icon
   */
  tonBalance: string;
  usdtBalance: string;
}>();

const tonSvgSource = ref('');
const usdtSvgSource = ref('');

onMounted(async () => {
  const tonSvg = await import(`~/assets/icons/ton.svg?raw`);
  const usdtSvg = await import(`~/assets/icons/usdt.svg?raw`);

  tonSvgSource.value = tonSvg.default;
  usdtSvgSource.value = usdtSvg.default;
});
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="balance-container">
    <div class="token-container">
      <span class="icon-balance" v-html="tonSvgSource" />
      <span class="token-amount">{{ props.tonBalance || '...' }}</span>
      <span class="token-name">TON</span>
    </div>
    <div class="token-container">
      <span class="icon-balance" v-html="usdtSvgSource" />
      <span class="token-amount">{{ props.usdtBalance || '...' }}</span>
      <span class="token-name">USD₮</span>
    </div>
  </div>
</template>
<style>
@import '~/assets/css/theme/typescale.css';

.balance-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap:wrap
}

.token-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
}

.token-name {
  @apply --headline--semibold;
  padding: 0px 0px 0px 5px;
}

.token-amount {
  @apply --headline--semibold;
  font-family: SF Mono, Monospace;
}

.icon-balance svg {
  width: 32px;
  height: 32px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
