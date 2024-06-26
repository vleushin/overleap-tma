<script setup lang="ts">
defineProps<{
  /**
   * Title of the placeholder. Will be displayed in a large font below the picture.
   */
  title: string;

  /**
   * Caption of the placeholder. Will be displayed in a smaller font below the title.
   */
  caption: string;

  /**
   * Link text of CTA link
   */
  linkText?: string;

  /**
   * Whether the placeholder should be compact
   */
  compact?: boolean;

  /**
   * Whether the placeholder should have a background
   */
  withBackground?: boolean;

  /**
   * Filename of of the video file to play
   */
  videoFilename?: string;
}>();
</script>

<template>
  <div
    class="placeholder"
    :class="{
      'placeholder--compact': compact,
      'placeholder--bg': withBackground
    }"
  >
    <slot name="picture" />

    <h1 class="title">
      {{ title }}
    </h1>

    <p class="caption">
      {{ caption }}
    </p>

    <a
      v-if="linkText"
      class="link"
      href="/"
    >
      {{ linkText }}
    </a>

    <video
      v-if="videoFilename"
      class="intro-video"
      width="320"
      height="180"
      muted
      autoplay
      loop
      playsinline="true"
    >
      <source
        :src="videoFilename"
        type="video/mp4">
      Your browser does not support the video tag.
    </video>
   <!-- <Rive src="/overleap_intro.riv" /> -->
  </div>
</template>

<style scoped>
@import '~/assets/css/theme/typescale.css';

.placeholder {
  --padding: 40px 28px;
  --pic-size: 112px;

  padding: var(--padding);
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  justify-content: center;
  place-items: center;
  text-align: center;

  @apply --body;

  &--compact {
    --padding: 16px 28px 32px;
    --pic-size: 92px;

    @apply --footnote;
  }

  &--bg {
    background-color: var(--color-bg);
  }

  .title {
    @apply --title-2-semibold;

    margin-top: var(--spacing-10);
    user-select: text;
  }

  &--compact .title {
    @apply --body-semibold;
  }

  .caption {
    margin-top: var(--spacing-8);
    color: var(--color-hint);
    max-width: 300px;
  }

  &--compact .caption {
    margin-top: var(--spacing-3);
  }

  .link {
    display: block;
    margin: 0 auto;
    margin-top: var(--spacing-28);
    color: var(--color-link);
  }

  &--compact .link {
    margin-top: var(--spacing-20);
  }

  .intro-video {
    margin-top: var(--spacing-28);
  }
}
</style>
