import { Redis } from "@upstash/redis";
import { Address } from "@ton/core";
import Sqids from 'sqids';
import { USER_ID_TO_NAME_MAP, USER_ID_TO_PRICE_MAP, USER_ID_TO_USERNAME_MAP, USER_ID_TO_WALLET_MAP } from '../keys';

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event);

  const query = getQuery(event);
  const hashedId = query.hashedId as string;

  if (hashedId) {
    const sqids = new Sqids({
      alphabet: runtimeConfig.sqidsAlphabet,
    });
    const redis = new Redis({
      url: runtimeConfig.redisUrl,
      token: runtimeConfig.redisToken,
    });

    const userId = sqids.decode(hashedId);
    const address = await redis.hget(USER_ID_TO_WALLET_MAP, String(userId)) as string;
    const name = await redis.hget(USER_ID_TO_NAME_MAP, String(userId)) as string;
    const username = await redis.hget(USER_ID_TO_USERNAME_MAP, String(userId)) as string;
    const price = await redis.hget(USER_ID_TO_PRICE_MAP, String(userId)) || runtimeConfig.public.defaultPrice;

    if (address) {
      return {
        "hashedId": hashedId,
        "name": name || username || hashedId,
        "address": Address.parse(address).toString({ urlSafe: true, bounceable: true }),
        "price": String(price)
      };
    }
  }
  return {
    "hashedId": hashedId,
    "address": runtimeConfig.public.overleapRouterAddress,
    "price": String(runtimeConfig.public.defaultPrice)
  };
});

