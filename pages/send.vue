<script setup lang="ts">
import { ref, onMounted } from "vue";
import { onBeforeRouteLeave } from 'vue-router';
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
const { t } = useI18n()

const startParam = WebApp.initDataUnsafe.start_param;
const { toAddress, toHashedId, toName, toPrice } = useToAddress(startParam || '');
const { animationData } = useLottie('deal');
const { trackEvent } = useMixpanel();
const textToSend = ref('');

const hasEnoughUsdt = computed(() => {
  if (toPrice.value && usdtBalance.value) {
    return Number(usdtBalance.value) - Number(toPrice.value) > 0;
  } else {
    return true;
  }
});

const hasEnoughTon = computed(() => {
  if (tonBalance.value) {
    return Number(tonBalance.value) > 0.1;
  } else {
    return true;
  }
});

const hasEnoughFunds = computed(() => {
  return hasEnoughUsdt.value && hasEnoughTon.value;
});

const runtimeConfig = useRuntimeConfig();

type PostPrepareTxType = {
  validUntil: number
  messages: []
}

type PostSentTxType = {
  txHash: string
}

const sendTx = async (fromAddress: string, toAddress: string, price: string) => {
  if (!tonConnectUI) {
    return;
  }

  const { data } = await useFetch<PostPrepareTxType>('/api/prepareTx', {
    method: 'POST',
    body: {
      fromAddress,
      toAddress,
      price,
      message: textToSend.value,
    },
    headers: {
      'Authorization': `tma ${WebApp.initData}`
    }
  });
  if (data.value) {
    const result = await tonConnectUI.sendTransaction(data.value);
    trackEvent("transaction_sent", {hashedId: startParam, price: Number(toPrice.value)})

    const { data: txData } = await useFetch<PostSentTxType>('/api/sentTx', {
      method: 'POST',
      body: {
        fromAddress,
        toAddress,
        toHashedId: startParam,
        price,
        message: textToSend.value,
        boc: result.boc
      },
      headers: {
        'Authorization': `tma ${WebApp.initData}`
      }
    });

    if (txData.value) {
      navigateTo(`/txSent?txHash=${txData.value.txHash}`);
    }
  }
};

const showMainButton = () => {
  if (fromAddress.value) {
    telegram.showMainButton(t('send'), () => {
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
    navigateTo('/');
  });
  WebApp.ready();
  trackEvent("deeplink_send", { hashedId: startParam });
});

onBeforeRouteLeave(() => {
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
    <h2 v-if="!fromAddress">{{ $t('pleaseConnectYourWallet') }}</h2>
    <Lottie v-if="!fromAddress && animationData" :animation-data="animationData" width="150px" height="150px" />
    <p v-if="fromAddress && toAddress">{{ $t('yourMessageTo') }} <strong>{{ toName }}</strong>:</p>
    <Textarea v-if="fromAddress && toAddress" class="message-textarea" v-model="textToSend" :max-length="160"
      :placeholder="$t('enterMessageToSend')" />
    <h3 v-if="fromAddress && toAddress" v-html="$t('toUserPrice', { toName })"></h3>
    <Price v-if="fromAddress && toAddress" :price="toPrice" token="usdt" label="USD₮" />
    <p v-if="!hasEnoughFunds" class="error">{{ $t('topUp0') }}</p>
    <p v-if="!hasEnoughFunds" class="error">{{ $t('topUp1') }}</p>
    <p v-if="!hasEnoughFunds" class="error">{{ $t('topUp2') }}</p>
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
  text-align: center;
}

.error {
  color: salmon;
  font-weight: 800;
}
</style>
