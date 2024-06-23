<script setup lang="ts">
import WebApp from '@twa-dev/sdk';
import vkQr from '@vkontakte/vk-qr';

const props = defineProps<{
  link: string;
}>();


const isDarkTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
const qrSvg = vkQr.createQR(props.link, {
  foregroundColor: isDarkTheme() ? '#efeff4' : '#1c1c1d',
  qrSize: 150,
  isShowLogo: false,
  ecc: 0
});

</script>

<template>
  <div class="link-container">
    <p>Link for payments:</p>
    <LinkInput class="link-input" :model-value="props.link" right-icon="copy" />
    <div v-html="qrSvg" />
  </div>
</template>
<style>
@import '~/assets/css/theme/typescale.css';

.link-container {
  margin-top: var(--spacing-28);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  vertical-align: middle;
}

.link-container h1 {
  @apply --title-2;
}

.link-container h2 {
  @apply --title-3;
}

.link-input {
  font-size: 9px;
  font-family: SF Mono, Monospace;
  width: 90%;
  margin-bottom: var(--spacing-28);
}

.token-container {
  display: flex;
  justify-content: space-around;
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

p {
  @apply --body-semibold;
  color: var(--color-hint);
  text-align: center;
  margin-bottom: var(--spacing-10);
}
</style>
