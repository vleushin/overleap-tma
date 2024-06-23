import { Redis } from "@upstash/redis";
import { validate } from '@tma.js/init-data-node';
import { parseInitData } from '@tma.js/sdk';
import { Address } from '@ton/ton';
import { USER_ID_TO_NAME_MAP, USER_ID_TO_USERNAME_MAP, USER_ID_TO_WALLET_MAP } from '../keys';

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event);

  const query = getQuery(event);
  const address = query.address as string;
  const rawAddress = Address.parse(address).toRawString();

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

        const key = String(parsedInitiData.user?.id);
        const firstName = parsedInitiData.user?.firstName;
        const username = parsedInitiData.user?.username;
        await redis.hset(USER_ID_TO_WALLET_MAP, {[key]: rawAddress});
        if (firstName) {
          await redis.hset(USER_ID_TO_NAME_MAP, {[key]: firstName});
        }
        if (username) {
          await redis.hset(USER_ID_TO_USERNAME_MAP, {[key]: username});
        }
        return {
          "address": rawAddress,
          "name": firstName,
          "username": username,
        };
      } catch (error) {
        console.error(error);
      }
    }
  }

  return {
    "address": runtimeConfig.public.overleapRouterAddress,
    "name": "Name",
    "username": "username",
  };
});

