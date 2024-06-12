import { inject, onMounted } from 'vue'
import { type TonConnectUI, type TonConnectUiOptions } from '@tonconnect/ui'
import { checkProvider } from '@/infra/utils/errors.ts'
import { isServerSide } from '@/infra/utils/web.ts'

interface useTonConnectUIState {
  tonConnectUI: TonConnectUI | null;
  setOptions: (options: TonConnectUiOptions) => void;
}

export const useTonConnectUI = (): useTonConnectUIState => {
  const tonConnectUI = inject<TonConnectUI | null>('tonConnectUI', null)
  const setOptions = (options: TonConnectUiOptions): void => {
    if (tonConnectUI != null) {
      tonConnectUI.uiOptions = options
    }
  }

  onMounted(() => {
    if (isServerSide()) {
      return
    }

    checkProvider(tonConnectUI)
  })

  return { tonConnectUI, setOptions }
}
