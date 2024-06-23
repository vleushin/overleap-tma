import { type Ref } from 'vue';

interface useMyLinkState {
  hashedId: Ref<string>;
  link: Ref<string>;
}

const hashedId = useState<string>('hashedId');
const link = useState<string>('link');

export const useMyLink = (): useMyLinkState => {
  return { hashedId, link };
};
