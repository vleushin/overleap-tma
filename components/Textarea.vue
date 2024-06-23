<script setup lang="ts">

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  maxLength: number;
}>();

defineEmits(['update:modelValue']);

const remainingSymbols = computed(() => {
  return props.maxLength - props.modelValue.length;
});
</script>
<template>
  <div class="textarea-container">
    <div class="textarea">
      <textarea :placeholder="placeholder" :value="modelValue" rows="5" cols="50" :maxlength="maxLength"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)" />
    </div>
    <div style="text-align: right">{{ remainingSymbols }} / {{ props.maxLength }}</div>
  </div>
</template>

<style scoped>
@import '~/assets/css/theme/typescale.css';

.textarea-container {
  display: flex;
  margin: var(--spacing-10);
  flex-flow: column;
  justify-content: center;
  align-items: right;
}

.textarea {
  color: var(--color-hint);
  display: flex;
  padding: 10px 12px;
  gap: 4px;
  background: var(--color-bg);
  border-radius: var(--size-border-radius-big);
  align-items: center;

  textarea {
    border: none;
    outline: none;
    background: transparent;
    color: inherit;
    width: 100%;
    padding: 0;
    margin: 0;
    appearance: none;
    color: var(--color-text);

    @apply --title-3-rounded-semibold;

    &::placeholder {
      color: var(--color-hint);
    }
  }
}
</style>
