import { ref, onMounted, watch, type Ref } from 'vue'
import { type WalletsModalState } from '@tonconnect/ui'
import { useTonConnectUI } from './useTonConnectUI'

interface useTonConnectModalState {
  state: Ref<WalletsModalState | null>;
  close: () => void;
  open: () => void;
}

export const useTonConnectModal = (): useTonConnectModalState => {
  const { tonConnectUI } = useTonConnectUI()
  const state = ref<WalletsModalState | null>(
    tonConnectUI != null ? tonConnectUI.modal.state : null,
  )

  onMounted(() => {
    if (tonConnectUI != null) {
      state.value = tonConnectUI.modal.state
      tonConnectUI.onModalStateChange((value: WalletsModalState) => {
        state.value = value
      })
    }
  })

  watch(tonConnectUI, (newVal: any) => {
    if (newVal != null) {
      state.value = newVal.modal.state
    }
  })

  return {
    state,
    open: () => tonConnectUI?.modal.open(),
    close: () => tonConnectUI?.modal.close(),
  }
}
