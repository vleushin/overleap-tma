import { validate } from '@tma.js/init-data-node';
import { parseInitData } from '@tma.js/sdk';
import { Telegram } from "telegraf";
import TonWeb from "tonweb";
import Sqids from 'sqids';

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event);

  const body = await readBody(event)
  const fromAddress = body.fromAddress as string;
  const toAddress = body.toAddress as string;
  const toHashedId = body.toHashedId as string;
  const price = body.price as string;
  const message = body.message as string;
  const boc = body.boc as string;
  const bocCells = TonWeb.boc.Cell.oneFromBoc(Buffer.from(boc, 'base64').toString('hex'));
  const hashArray = await bocCells.hash();
  const txHash = Buffer.from(hashArray).toString('hex');
  console.log('TX: ', txHash);

  const authorizationHeader = event.headers.get('Authorization');
  if (authorizationHeader?.startsWith("tma")) {
    const initData = authorizationHeader.substring(4);
    if (initData) {
      try {
        validate(initData, runtimeConfig.telegramBotKey);
        const parsedInitiData = parseInitData(initData);

        const sqids = new Sqids({
          alphabet: runtimeConfig.sqidsAlphabet,
        });
        // TODO checks
        // const redis = new Redis({
        //   url: runtimeConfig.redisUrl,
        //   token: runtimeConfig.redisToken,
        // });
        // const price = await redis.hget(USER_ID_TO_PRICE_MAP, String(parsedInitiData.user?.id));

        const fromUserId = parsedInitiData.user?.id;
        const fromUsername = parsedInitiData.user?.username;
        const toUserId = Number(sqids.decode(toHashedId));

        const telegram = new Telegram(runtimeConfig.telegramBotKey)
        await telegram.sendMessage(toUserId, `You got message from @${fromUsername} (paid ${price} USDT)!\n\n` + message,
                {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: `Answer`,
                                    url: `https://t.me/${fromUsername}`
                                }
                            ]
                        ]
                    }
                }
            );
            return {
              txHash
            };
      } catch (error) {
        console.error(error);
      }
    }
  }

  return {
  };
});

