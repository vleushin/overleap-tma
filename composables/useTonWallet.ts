import { ref, onMounted, type Ref } from 'vue';
import {
  type ConnectedWallet,
  type Wallet,
  type WalletInfoWithOpenMethod,
} from '@tonconnect/ui';
import { useTonConnectUI } from './useTonConnectUI';
import WebApp from '@twa-dev/sdk';

interface useTonWalletState {
  wallet: Ref<Wallet | (Wallet & WalletInfoWithOpenMethod) | null>;
}

export const useTonWallet = (): useTonWalletState => {
  const { tonConnectUI } = useTonConnectUI();
  const wallet = ref<Wallet | (Wallet & WalletInfoWithOpenMethod) | null>(
    tonConnectUI != null ? tonConnectUI.wallet : null,
  );

  onMounted(() => {
    if (tonConnectUI != null) {
      wallet.value = tonConnectUI.wallet;
      tonConnectUI.onStatusChange((value: ConnectedWallet | null) => {
        wallet.value = value;
        const address = wallet.value?.account.address;
        console.log("onStatusChange!", address);
        if (address) {
          useFetch('/api/address', {
            method: 'POST',
            params: { address },
            headers: {
              'Authorization': `tma ${WebApp.initData}`
            }
          }).then();
        }
      });
    }
  });

  return { wallet };
};
