<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { navigateTo, useRuntimeConfig } from "nuxt/app";
import useTelegram from "../composables/useTelegram";
import { useTonConnectUI } from "../composables/useTonConnectUI";
import { useTonAddress } from "../composables/useTonAddress";
import { useToAddress } from "../composables/useToAddress";
import { useBalances } from "../composables/useBalances";
import useLottie from "../composables/useLottie";
import Balances from "../components/Balances.vue";
import Textarea from "../components/Textarea.vue";
import WebApp from "@twa-dev/sdk";

const { tonBalance, usdtBalance } = useBalances();
const { tonConnectUI, setOptions: setTonConnectOptions } = useTonConnectUI();
const { address: fromAddress } = useTonAddress();
const startParam = WebApp.initDataUnsafe.start_param;
const { toAddress, toName, toPrice } = useToAddress(startParam || 'xxx');
const { animationData } = useLottie('deal');
const textToSend = ref('');

const runtimeConfig = useRuntimeConfig();

type PostTxType = {
  payload: string
  fromAddressUsdtWallet: string
}

const sendTx = async (fromAddress: string, toAddress: string, price: string) => {
  if (!tonConnectUI) {
    return;
  }

  const { data } = await useFetch<PostTxType>('/api/tx', {
    method: 'POST',
    params: {
      fromAddress,
      toAddress,
      price
    },
    headers: {
      'Authorization': `tma ${WebApp.initData}`
    }
  });
  if (data.value) {
    const payload = data.value.payload;
    const fromAddressUsdtWallet = data.value.fromAddressUsdtWallet;

    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
      messages: [
        {
          address: fromAddressUsdtWallet,
          amount: "60000000",
          payload: payload
        }
      ]
    };

    try {
      const result = await tonConnectUI.sendTransaction(transaction);
      console.log(result);

      // you can use signed boc to find the transaction
      //const someTxData = await myAppExplorerService.getTransaction(result.boc);
      //alert('Transaction was sent successfully', someTxData);
    } catch (e) {
      console.error(e);
    }
  }
};

const showMainButton = () => {
  if (fromAddress.value) {
    telegram.showMainButton("Send", () => {
      sendTx(
        fromAddress.value,
        toAddress.value,
        toPrice.value);
    });
  } else {
    telegram.hideMainButton();
  }
};

const telegram = useTelegram();
onMounted(() => {
  showMainButton();
  watch(fromAddress, (newValue, oldValue) => {
    showMainButton();
  });
  telegram.showBackButton(() => {
    console.log("BACK");
    //setTonConnectOptions({ buttonRootId: null });
    navigateTo('/');
  });
  WebApp.ready();
});

onUnmounted(() => {
  telegram.hideBackButton();
  telegram.hideMainButton();
});
</script>
<template>
  <div class="send-container">
    <h1>{{ WebApp.initDataUnsafe.user?.first_name || 'Name' }}</h1>
    <div class="tonconnect-button">
      <TonConnectButton button-root-id="ton-connect-button2" />
    </div>
    <!-- <Input v-model="textToSend" placeholder="Enter message to send" /> -->
    <Balances v-if="fromAddress" :ton-balance="tonBalance" :usdt-balance="usdtBalance" />
    <h2 v-if="!fromAddress">Please connect wallet first ☝️</h2>
    <Lottie v-if="!fromAddress && animationData" :animation-data="animationData" width="150px" height="150px" />
    <p v-if="fromAddress && toAddress">Your message to <strong>{{ toName }}</strong>:</p>
    <Textarea v-if="fromAddress && toAddress" class="message-textarea" v-model="textToSend" :max-length="160"
      placeholder="Enter message to send" />
    <h3 v-if="fromAddress && toAddress"><strong>{{ toName }}</strong>'s price:</h3>
    <Price v-if="fromAddress && toAddress" :price="toPrice" token="usdt" label="USD₮" />
  </div>
</template>
<style scoped>
@import '~/assets/css/theme/typescale.css';

.send-container {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center
}

h1 {
  @apply --title-2-semibold;
  text-align: center;
  margin-top: var(--spacing-10);
  margin-bottom: var(--spacing-10);
}

h2 {
  @apply --title-2-semibold;
  text-align: center;
  margin-top: var(--spacing-10);
  margin-bottom: var(--spacing-10);
}

h3 {
  @apply --title-2-semibold;
  text-align: center;
  color: var(--color-hint);
}

:deep(strong) {
  font-weight: bold;
  color: var(--color-text);
}

.tonconnect-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: var(--spacing-10)
}

p {
  margin-top: var(--spacing-10);
  color: var(--color-hint);
  max-width: 300px;
}
</style>
