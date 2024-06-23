import TonWeb from "tonweb";
import { findWalletUsdtJettonAddress } from "../../utils/usdt";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event);

  const query = getQuery(event);
  const address = query.address as string;

  if (address) {
    const { JettonWallet } = TonWeb.token.jetton;
    const usdtWalletAddress = findWalletUsdtJettonAddress(address).toString();
    const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC', {apiKey: runtimeConfig.tonCenterApiKey}));
    const balance = await tonweb.getBalance(address);

    const usdtWallet = new JettonWallet(tonweb.provider, {
      address: usdtWalletAddress
    });
    let usdtBalance = '0';
    if (usdtWallet) {
      try {
        const usdtData = await usdtWallet.getData();
        usdtBalance = usdtData.balance.toString();
      } catch (e) {
        // can be uninitialized so we cosider balance to be 0
      }
    }

    return {
      "address": address,
      "balance": balance,
      "usdtAddress": usdtWalletAddress,
      "usdtBalance": usdtBalance
    };
  }
  return {
    "address": '',
    "balance": '',
    "usdtAddress": '',
    "usdtBalance": ''
  };
});

