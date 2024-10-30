<script setup language="ts">
const { locales, locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const nextLocale = computed(() => {
  if (locale.value === "en")
    return {
      locale: "id",
      iconName: "circle-flags:id",
    };

  return {
    locale: "en",
    iconName: "circle-flags:gb",
  };
});
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
      <span class="aspect-square flex h-6 items-center justify-center w-6">{{
        nextLocale.locale.toUpperCase()
      }}</span>
    </NuxtLink>
  </ClientOnly>
</template>
