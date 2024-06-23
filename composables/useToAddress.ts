import { ref, type Ref } from 'vue';

interface useToAddressState {
  toAddress: Ref<string>;
  toName: Ref<string>;
  toPrice: Ref<string>;
  isReady: Ref<boolean>;
  isLoading: Ref<boolean>;
}

const toAddress = ref('');
const toName = ref('');
const toPrice = ref('');
const isReady = ref(false);
const isLoading = ref(false);

type ApiAddressType = {
  hashedId: string,
  address: string,
  name: string,
  price: string,
}

export const useToAddress = (hashedId: string): useToAddressState => {
  if (hashedId) {
    useFetch<ApiAddressType>('/api/address', {
      query: { hashedId }
    }).then((result) => {
      if (result.data) {
        toAddress.value = result.data.value!.address;
        toName.value = result.data.value!.name;
        toPrice.value = String(result.data.value!.price);
        isReady.value = true;
        isLoading.value = false;
      } else {
        isReady.value = false;
        isLoading.value = true;
      }
    });
  }

  return { toAddress, toPrice, toName, isReady, isLoading };
};
