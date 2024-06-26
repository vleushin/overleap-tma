import mixpanel from 'mixpanel-browser';
import WebApp from '@twa-dev/sdk';

const runtimeConfig = useRuntimeConfig();
mixpanel.init(runtimeConfig.public.mixpanelToken, {
  debug: true,
  ignore_dnt: true,
  track_pageview: true,
  persistence: 'localStorage'});
const userId = WebApp.initDataUnsafe.user?.id;
if (userId) {
  mixpanel.identify(String(userId));
}

interface useMixpanelState {
  trackEvent: (eventName: string, params: any) => void;
}

export const useMixpanel = (): useMixpanelState => {
  const trackEvent = (eventName: string, params: any) => {
    const telegramInfo = {
      distinct_id: WebApp.initDataUnsafe.user?.id,
      language_code: WebApp.initDataUnsafe.user?.language_code,
      is_premium: WebApp.initDataUnsafe.user?.is_premium,
    }
    mixpanel.track(eventName, {
      ...telegramInfo,
      ...params,
    })
  }

  return { trackEvent };
};
