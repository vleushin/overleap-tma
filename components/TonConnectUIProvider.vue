<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">
/* eslint-disable vue/require-default-prop */
import { provide } from 'vue';
import {
  TonConnectUI,
  type ConnectedWallet,
} from '@tonconnect/ui';
import { useStorage } from '@vueuse/core';

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
    const userWalletInStorage = useStorage<string>('userWallet', '');
    const tonConnectUI = new TonConnectUI(props);
    tonConnectUI.onStatusChange((value: ConnectedWallet | null) => {
      userWalletInStorage.value = value?.account.address;
    });

    provide<TonConnectUI>("tonConnectUI", tonConnectUI);
  },
};
</script>

<template>
  <div>
    <slot />
  </div>
</template>,
type ConnectedWallet
