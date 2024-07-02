<script setup lang="ts">
import { useClipboard, useStorage } from '@vueuse/core';

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  rightIcon?: string;
}>();

const telegram = useTelegram();
const { copy } = useClipboard({ source: props.modelValue });

const copyLinkClickedInStorage = useStorage<boolean>('copyLinkClicked', false);

const copyToClipboard = () => {
  copy();
  copyLinkClickedInStorage.value = true
  telegram.vibrate('success');
}

</script>

<template>
  <div class="input">
    <input type="text" :placeholder="placeholder" :value="modelValue" readonly>
    <Icon v-if="rightIcon" :name="rightIcon" @click="copyToClipboard" />
  </div>
</template>

<style scoped>
@import '~/assets/css/theme/typescale.css';

.input {
  color: var(--color-hint);
  display: flex;
  padding: 10px 12px;
  gap: 4px;
  background: var(--color-bg);
  border-radius: var(--size-border-radius-big);
  align-items: center;

  :deep(.icon) {
    display: flex;
    align-content: center;
    justify-content: center;
    self-align: center;
    width: 22px;
    height: 22px;
  }

  :deep(svg) {
    fill: currentColor;
    width: 21px;
    height: 22px;
  }

  :deep(svg:hover) {
    fill: var(--color-text);
  }

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
    font-size: 14px;

    &::placeholder {
      color: var(--color-hint);
    }
  }
}
</style>
