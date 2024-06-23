import { ref, watch, type Ref } from 'vue';
import { useTonAddress } from "./useTonAddress";

interface useTonAddressState {
  tonBalance: Ref<string>;
  usdtBalance: Ref<string>;
  isReady: Ref<boolean>;
  isLoading: Ref<boolean>;
}

const tonBalance = ref('');
const usdtBalance = ref('');
const isReady = ref(false);
const isLoading = ref(false);

type ApiBalanceType = {
  address: string,
  balance: string,
  usdtAddress: string,
  usdtBalance: string
}

export const useBalances = (): useTonAddressState => {
  const { address } = useTonAddress();
  watch(address, (newValue, oldValue) => {
    if (newValue) {
      useFetch<ApiBalanceType>('/api/balance', {
        query: { address: address.value }
      }).then((result) => {
        if (result.data.value) {
          tonBalance.value = (Number(result.data.value!.balance) / 1000000000).toFixed(2);
          usdtBalance.value = (Number(result.data.value!.usdtBalance) / 1000000).toFixed(2);
          isReady.value = true;
          isLoading.value = false;
        } else {
          isReady.value = false;
          isLoading.value = true;
        }
      });
    }
  });

  return { tonBalance, usdtBalance, isReady, isLoading };
};
