<script setup lang="ts">

const props = defineProps<{
  price: string;
  token: string
  label: string
}>();
</script>

<template>
  <div class="price-container">
    <Icon :name="props.token" />
    <span class="token-amount">{{ props.price || '...' }}</span>
    <span class="token-name">{{ props.label }}</span>
  </div>
</template>
<style scoped>
@import '~/assets/css/theme/typescale.css';

.price-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  vertical-align: middle;
  margin-bottom: var(--spacing-8);
}

.token-name {
  @apply --headline--semibold;
  padding: 0px 0px 0px 5px;
}

.token-amount {
  @apply --headline--semibold;
  font-family: SF Mono, Monospace;
}

:deep(svg) {
  width: 32px;
  height: 32px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
