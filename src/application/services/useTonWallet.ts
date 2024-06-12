import { ref, watch, onMounted, type Ref } from 'vue'
import {
  type ConnectedWallet,
  type Wallet,
  type WalletInfoWithOpenMethod,
} from '@tonconnect/ui'
import { useTonConnectUI } from './useTonConnectUI'

interface useTonWalletState {
  wallet: Ref<Wallet | (Wallet & WalletInfoWithOpenMethod) | null>;
}

export const useTonWallet = (): useTonWalletState => {
  const { tonConnectUI } = useTonConnectUI()
  const wallet = ref<Wallet | (Wallet & WalletInfoWithOpenMethod) | null>(
    tonConnectUI != null ? tonConnectUI.wallet : null,
  )

  onMounted(() => {
    if (tonConnectUI != null) {
      wallet.value = tonConnectUI.wallet
      tonConnectUI.onStatusChange((value: ConnectedWallet | null) => {
        wallet.value = value
      })
    }
  })

  watch(tonConnectUI, (newVal: any) => {
    if (newVal != null) {
      wallet.value = newVal.wallet
    }
  })

  return { wallet }
}
