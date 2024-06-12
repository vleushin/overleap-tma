import { type TonConnectUI } from '@tonconnect/ui'
import { TonConnectProviderNotSetError } from '@/infra/errors'

export function checkProvider(
  provider: TonConnectUI | null,
): provider is TonConnectUI {
  if (provider == null) {
    throw new TonConnectProviderNotSetError(
      'You should add <TonConnectUIProvider> on the top of the app to use TonConnect',
    )
  }

  return true
}
