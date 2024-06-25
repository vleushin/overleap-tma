<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
import { useStorage } from '@vueuse/core';
import { useRoute } from "vue-router";
import useLottie from '../composables/useLottie';
import WebApp from '@twa-dev/sdk';

const telegram = useTelegram();
const { t } = useI18n()
const { animationData: animationData1 } = useLottie('love');
const { animationData: animationData2 } = useLottie('simp');
const { animationData: animationData3 } = useLottie('money');

const textsTop: { [key: number]: string } = {
  1: t('tutorial0'),
  2: t('tutorial2'),
  3: ""
};

const textsBottom: { [key: number]: string } = {
  1: t('tutorial1'),
  2: t('tutorial3'),
  3: t('tutorial4')
};

const animations: { [key: number]: any } = {
  1: animationData1,
  2: animationData2,
  3: animationData3
};

const myCarousel = ref<any>(null);
const slidingToIndex = ref(0);
const slidesCount = ref(3);
const isLastSlide = computed(() => {
  return slidingToIndex.value == slidesCount.value - 1;
});
const isFirstSlide = computed(() => {
  return slidingToIndex.value == 0;
});


const nextSlide = () => {
  myCarousel.value?.next();
};

const previousSlide = () => {
  myCarousel.value?.prev();
};

const finishTutorial = () => {
  const tutorialCompleted = useStorage<boolean>('tutorialCompleted', false);
  telegram.hideBackButton();
  telegram.hideMainButton();
  tutorialCompleted.value = true;
  navigateTo("/");
};

const handleInit = () => {
  telegram.showMainButton(t('next'), nextSlide);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleSlideStart = (data: any) => {
  slidingToIndex.value = data.slidingToIndex;
  slidesCount.value = data.slidesCount;
  if (isLastSlide.value) {

    telegram.showMainButton(t('finish'), finishTutorial);
  } else {
    telegram.showMainButton(t('next'), nextSlide);
  }

  if (!isFirstSlide.value) {
    telegram.showBackButton(previousSlide);
  } else {
    telegram.hideBackButton();
  }
};

const route = useRoute();
const queryParams = route.query;
const initData = WebApp.initDataUnsafe;
const startParam = initData.start_param || queryParams["startapp"];
</script>
<template>
  <Carousel ref="myCarousel" :items-to-show="1" @init="handleInit" @slide-start="handleSlideStart">
    <Slide v-for="slide in 3" :key="slide">
      <div class="carousel__item">
        <h1>{{ textsTop[slide] }}</h1>
        <Lottie v-if="animations[slide].value" :animation-data="animations[slide].value" width="150px" height="150px" />
        <h1>{{ textsBottom[slide] }}</h1>
      </div>
    </Slide>
  </Carousel>
</template>
<style scoped>
@import '~/assets/css/theme/typescale.css';

.carousel__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(var(--tg-viewport-stable-height) - var(--size-cell-v-margin) - var(--size-cell-h-margin));
  width: 100%;
  background-color: var(--color-bg-tertiary);
  color: var(--color-text);
  font-size: 20px;
  border-radius: 8px;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}

h1 {
  margin-top: var(--spacing-28);
  margin-bottom: var(--spacing-28);
  max-width: 300px;
}
</style>
