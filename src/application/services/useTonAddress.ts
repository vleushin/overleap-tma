import { computed, type ComputedRef } from 'vue'
import { CHAIN, toUserFriendlyAddress } from '@tonconnect/ui'
import { useTonWallet } from './useTonWallet'

interface useTonAddressState {
  address: ComputedRef<string>;
}

export const useTonAddress = (userFriendly = true): useTonAddressState => {
  const { wallet } = useTonWallet()
  const address = computed(() => {
    if (wallet != null) {
      if (wallet.value != null) {
        return userFriendly
          ? toUserFriendlyAddress(
            wallet.value.account.address,
            wallet.value.account.chain === CHAIN.TESTNET,
          )
          : wallet.value.account.address
      }
    }
    return ''
  })

  return { address }
}
