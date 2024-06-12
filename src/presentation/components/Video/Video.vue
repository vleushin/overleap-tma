<script setup lang="ts">

defineProps<{
  src: string;
}>();
</script>

<template>
  <video width="320" height="180" muted autoplay loop>
    <source
      :src="src"
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>
</template>
