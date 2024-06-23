import { inject, onMounted } from 'vue';
import { type TonConnectUI, type TonConnectUiOptions } from '@tonconnect/ui';
import { checkProvider } from '../utils/errors';
import { isServerSide } from '../utils/web';

interface useTonConnectUIState {
  tonConnectUI: TonConnectUI | null;
  setOptions: (options: TonConnectUiOptions) => void;
}

export const useTonConnectUI = (): useTonConnectUIState => {
  const tonConnectUI = inject<TonConnectUI | null>("tonConnectUI", null);

  const setOptions = (options: TonConnectUiOptions): void => {
    if (tonConnectUI != null) {
      tonConnectUI.uiOptions = options;
    }
  };

  onMounted(() => {
    if (isServerSide()) {
      return;
    }

    checkProvider(tonConnectUI);
  });

  return { tonConnectUI, setOptions };
};
