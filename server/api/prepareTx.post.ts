import { Address, beginCell } from '@ton/ton';
import { findWalletUsdtJettonAddress } from "../../utils/usdt";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event);

  const body = await readBody(event)
  const fromAddress = body.fromAddress as string;
  const toAddress = body.toAddress as string;
  const price = body.price as string;

  const forwardPayload = beginCell()
    .storeAddress(Address.parse(toAddress))
    .storeUint(0, 1) // without referral
    .endCell();

  const payload = beginCell()
    .storeUint(0xf8a7ea5, 32)      // jetton transfer op code
    .storeUint(0, 64)              // query_id:uint64
    .storeCoins(BigInt(Number(price) * 10 ** 6))                                           // amount:(VarUInteger 16) -  Jetton amount for transfer (decimals = 6 - jUSDT, 9 - default)
    .storeAddress(Address.parse(runtimeConfig.public.overleapRouterAddress as string))     // destination:MsgAddress
    .storeAddress(Address.parse(fromAddress))   // response_destination:MsgAddress
    .storeBit(0)                   // no custom payload
    .storeCoins(40000000)          // forward amount (if >0, will send notification message)
    .storeBit(1)                   // we store forwardPayload as a reference
    .storeRef(forwardPayload)
    .endCell();

  const fromAddressUsdtWallet = await findWalletUsdtJettonAddress(fromAddress).toString();
  const payloadBase64 = payload.toBoc().toString('base64');
  return {
    validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
    messages: [
      {
        address: fromAddressUsdtWallet,
        amount: "60000000",
        payload: payloadBase64
      }
    ]
  };
});

