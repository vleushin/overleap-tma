import { ref, type Ref } from 'vue';
import WebApp from '@twa-dev/sdk';

interface usePriceState {
  price: Ref<string>;
  setPrice: (newPrice: number) => void;
  isReady: Ref<boolean>;
  isLoading: Ref<boolean>;
}

type PostPriceType = {
  price: string
}

type GetPriceType = {
  price: string
}

const price = useState('price', () => '');
const isReady = ref(false);
const isLoading = ref(false);

const setPrice = async (newPrice: number) => {
  price.value = '';
  isReady.value = false;
  isLoading.value = true;
  const { data } = await useFetch<PostPriceType>('/api/price', {
    method: 'POST',
    params: { price: newPrice },
    headers: {
      'Authorization': `tma ${WebApp.initData}`
    }
  });
  if (data.value) {
    price.value = (Number(data.value.price)).toFixed(2);
    isReady.value = true;
    isLoading.value = false;
  } else {
    isReady.value = false;
    isLoading.value = true;
  }
};

export const usePrice = (): usePriceState => {
  isReady.value = false;
  isLoading.value = true;
  useFetch<GetPriceType>('/api/price', {
    headers: {
      'Authorization': `tma ${WebApp.initData}`
    }
  }).then((result) => {
    if (result.data) {
      price.value = (Number(result.data.value!.price)).toFixed(2);
      isReady.value = true;
      isLoading.value = false;
    } else {
      isReady.value = false;
      isLoading.value = true;
    }
  });

  return { price, setPrice, isReady, isLoading };
};
