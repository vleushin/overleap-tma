<script lang="ts">
/* eslint-disable vue/no-dupe-keys */
import { onMounted, onUnmounted } from 'vue'
import { useTonConnectUI } from '@/application/services/useTonConnectUI'

const buttonRootId = 'ton-connect-button'

export default {
  name: 'TonConnectButton',
  props: {
    className: String,
    style: Object,
  },
  setup(props) {
    const { setOptions } = useTonConnectUI()

    onMounted(() => {
      setOptions({ buttonRootId })
    })

    onUnmounted(() => {
      setOptions({ buttonRootId: null })
    })

    return {
      buttonRootId,
      className: props.className,
      style: props.style,
    }
  },
}
</script>

<template>
  <div
    :id="buttonRootId"
    :class="className"
    :style="{ width: 'fit-content', ...style }"
  />
</template>
