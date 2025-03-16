<script setup lang="ts">
interface LocaleConfig {
  locale: Locale;
  iconName: string;
}

// Define locale configurations as static constants to avoid recalculation
const LOCALE_CONFIGS: Record<string, LocaleConfig> = {
  en: {
    locale: "id",
    iconName: "circle-flags:id",
  },
  id: {
    locale: "en",
    iconName: "circle-flags:gb",
  },
} as const;

const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

// Memoize the computed value to prevent unnecessary recalculations
const nextLocale = computed(() => {
  return LOCALE_CONFIGS[locale.value] || LOCALE_CONFIGS.en;
});

// Pre-compute the uppercase locale for template
const upperLocale = computed(() => nextLocale.value.locale.toUpperCase());
</script>

<template>
  <ClientOnly>
    <NuxtLink
      :to="switchLocalePath(nextLocale.locale)"
      class="border border-solid border-zinc-200 flex font-medium gap-0 items-center justify-center no-underline outline-none active:outline-none focus:outline-none p-1 relative rounded-full text-sm text-black"
    >
      <span class="aspect-square flex h-6 w-6 rounded-full shadow">
        <Icon :name="nextLocale.iconName" class="h-full w-full" />
      </span>
      <span class="aspect-square flex h-6 items-center justify-center w-6">
        {{ upperLocale }}
      </span>
    </NuxtLink>
  </ClientOnly>
</template>
