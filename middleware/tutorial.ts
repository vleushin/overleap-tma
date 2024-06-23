import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import { useStorage } from '@vueuse/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineNuxtRouteMiddleware((to, from) => {
  const userWalletInStorage = useStorage<string>('userWallet', '');
  const tutorialCompleted = useStorage<boolean>('tutorialCompleted', false);

  if (!userWalletInStorage.value && !tutorialCompleted.value) {
    return navigateTo('/tutorial');
  }
});
