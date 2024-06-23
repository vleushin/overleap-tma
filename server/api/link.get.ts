import { validate } from '@tma.js/init-data-node';
import { parseInitData } from '@tma.js/sdk';
import Sqids from 'sqids';

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event);

  const sqids = new Sqids({
    alphabet: runtimeConfig.sqidsAlphabet,
  });

  const authorizationHeader = event.headers.get('Authorization');
  if (authorizationHeader?.startsWith("tma")) {
    const initData = authorizationHeader.substring(4);
    if (initData) {
      try {
        validate(initData, runtimeConfig.telegramBotKey);
        const parsedInitiData = parseInitData(initData);
        const hashedId = sqids.encode([parsedInitiData.user?.id as number]);
        return {
          "hashedId": hashedId,
          "link": `https://t.me/${runtimeConfig.public.botName}/app?startapp=${hashedId}`
        };
      } catch (error) {
        console.error(error);
      }
    }
  }

  return {
    "hashedId": "hashedId",
    "link": `https://t.me/${runtimeConfig.public.botName}/app?startapp=hashedId`
  };
});

