import { Redis } from "@upstash/redis";
import { validate } from '@tma.js/init-data-node';
import { parseInitData } from '@tma.js/sdk';
import { USER_ID_TO_PRICE_MAP } from "../keys";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event);

  const authorizationHeader = event.headers.get('Authorization');
  if (authorizationHeader?.startsWith("tma")) {
    const initData = authorizationHeader.substring(4);
    if (initData) {
      try {
        validate(initData, runtimeConfig.telegramBotKey);
        const parsedInitiData = parseInitData(initData);
        const redis = new Redis({
          url: runtimeConfig.redisUrl,
          token: runtimeConfig.redisToken,
        });
        const price = await redis.hget(USER_ID_TO_PRICE_MAP, String(parsedInitiData.user?.id));
        return {
          "price": price
        };
      } catch (error) {
        console.error(error);
      }
    }
  }

  return {
    "price": "0.01"
  };
});

