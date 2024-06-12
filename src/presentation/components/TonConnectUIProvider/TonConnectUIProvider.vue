<script lang="ts">
/* eslint-disable vue/require-default-prop */
import { provide, ref, onMounted } from 'vue'
import {
  TonConnectUI,
} from '@tonconnect/ui'
import { isClientSide } from '@/infra/utils/web'

export default {
  name: 'TonConnectUIProvider',
  props: {
    manifestUrl: String,
    connector: Object,
    restoreConnection: {
      type: Boolean,
      default: true,
    },
    language: {
      type: String,
      default: 'system',
    },
    widgetRootId: {
      type: String,
      default: 'div#tc-widget-root',
    },
    uiPreferences: Object,
    walletsListConfiguration: Object,
    actionsConfiguration: Object,
    enableAndroidBackHandler: {
      type: Boolean,
      default: true,
    },
  },
  setup(props: any) {
    const tonConnectUI = ref(null as any)

    provide('key', 'value') // TODO

    onMounted(() => {
      if (isClientSide()) {
        if (tonConnectUI.value == null) {
          tonConnectUI.value = new TonConnectUI(props)
        }
      }
      provide('tonConnectUI', tonConnectUI.value)
    })
  },
}
</script>

<template>
  <div>
    <slot />
  </div>
</template>
