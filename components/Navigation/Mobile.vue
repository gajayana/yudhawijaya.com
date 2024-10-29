<script setup lang="ts">
const { cn } = useHelpers();
const { t } = useI18n({
  useScope: "local",
});
const open = ref<boolean>(false);
</script>

<i18n lang="yaml">
en:
  close: "Close"
  menu: "Menu"
id:
  close: "Tutup"
  menu: "Menu"
</i18n>

<template>
  <div class="flex md:hidden relative">
    <button
      class="border-2 border-solid border-black/50 flex items-center justify-center leading-none px-4 rounded-full text-xs uppercase h-9"
      :title="t('menu')"
      :aria-label="t('menu')"
      @click="open = !open"
    >
      Menu
    </button>

    <div
      :class="
        cn(
          'bg-white fixed flex flex-col h-screen left-0 top-0 w-screen z-[99]',
          'transition-transform duration-300',
          { 'translate-x-0': open, 'translate-x-full': !open }
        )
      "
    >
      <div class="flex item-center justify-end w-full">
        <button
          class="flex p-2"
          :title="t('close')"
          :aria-label="t('close')"
          @click="open = !open"
        >
          <icon name="mdi:close" size="2.5rem" />
        </button>
      </div>
      <div class="flex flex-col h-full w-full">
        <NavigationMenuMain @menu-clicked="open = false" />
        <div class="flex items center justify-center p-4">
          <ButtonLanguageSwitcher />
        </div>
      </div>
    </div>
  </div>
</template>
