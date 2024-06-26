import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import WebApp from '@twa-dev/sdk';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineNuxtRouteMiddleware((to, from) => {
  const { trackEvent } = useMixpanel();
  const lastProcessedStartParam = useState('lastProcessedStartParam', () => '');
  const startParam = WebApp.initDataUnsafe?.start_param;
  if (startParam && (lastProcessedStartParam.value !== startParam)) {
    lastProcessedStartParam.value = startParam;
    return navigateTo('/send');
  }
});
