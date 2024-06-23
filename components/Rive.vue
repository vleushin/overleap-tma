<script setup lang=ts>
import { Rive } from '@rive-app/canvas';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  src: string;
}>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const canvas: any = ref();

onMounted(() => {
  const rive = new Rive({
    canvas: canvas.value,
    src: props.src,
    autoplay: true,
    stateMachines: 'State Machine 1',
    onLoad: () => {
      rive.resizeDrawingSurfaceToCanvas();
    },
  });
});
</script>
<template>
  <div>
    <canvas
      ref="canvas"
      class="small"
      width="640"
      height="360"
    />
  </div>
</template>
<style>
.small {
  width: 320px;
  height: 180px;
}
</style>
