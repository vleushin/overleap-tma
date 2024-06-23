import { onMounted, shallowRef, type ShallowRef } from 'vue';

interface useLottieComposableState {
  /**
   * Prepare lottie data
   */
  animationData: ShallowRef<object | null>;
}

/**
 * Preloads lottie animation
 *
 * @param name - animation name
 */
export default function useLottie(name: 'simp' | 'eyes' | 'love' | 'money' | 'hehehe' | 'deal'): useLottieComposableState {
  /**
   * Lottie animation data
   */
  const animationData = shallowRef<object | null>(null);

  onMounted(() => {
    void import(`~/assets/lottie/${name}.json`)
      .then(({ default: data }) => {
        animationData.value = data;
      });
  });

  return {
    animationData,
  };
}
