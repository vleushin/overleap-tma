<script setup lang="ts">
/* eslint-disable vue/no-dupe-keys */
import { onMounted, onUnmounted } from 'vue';
import { useTonConnectUI } from '../composables/useTonConnectUI';

const props = defineProps<{
  buttonRootId?: string;
  className?: string;
  style?: object;
}>();

onMounted(() => {
  const { setOptions } = useTonConnectUI();
  setOptions({ buttonRootId: props.buttonRootId });
});

onUnmounted(() => {
  const { setOptions } = useTonConnectUI();
  setOptions({ buttonRootId: null });
});
</script>

<template>
  <div :id="props.buttonRootId" :class="props.className" :style="{ width: 'fit-content', ...props.style }" />
</template>
