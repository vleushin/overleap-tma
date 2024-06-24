<script setup lang="ts">

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
}>();

defineEmits(['update:modelValue']);

const telegram = useTelegram();

const usdtSvgSource = ref('');

onMounted(async () => {
  const usdtSvg = await import(`~/assets/icons/usdt.svg?raw`);
  usdtSvgSource.value = usdtSvg.default;
});

</script>

<template>
  <div class="price-input-container">
    <span class="icon-price" v-html="usdtSvgSource" />
    <div class="input">
      <input
type="number" :placeholder="placeholder" :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)">
    </div>
    <span class="token-name">USD₮</span>
  </div>
</template>

<style scoped>
@import '~/assets/css/theme/typescale.css';

.input {
  color: var(--color-hint);
  display: flex;
  padding: 10px 12px;
  margin: var(--spacing-10);
  gap: 4px;
  width: 100px;
  background: var(--color-bg);
  border-radius: var(--size-border-radius-big);
  align-items: center;

  input {
    border: none;
    outline: none;
    background: transparent;
    color: inherit;
    width: 100%;
    padding: 0;
    margin: 0;
    appearance: none;
    color: var(--color-text);

    @apply --body;
    font-family: SF Mono, Monospace;
    font-feature-settings: 'tnum' on, 'lnum' on;

    &::placeholder {
      color: var(--color-hint);
    }
  }
}

.price-input-container {
  display: flex;
  justify-content: center;
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

.icon-price :deep(svg) {
  width: 32px;
  height: 32px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
