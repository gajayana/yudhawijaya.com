<script setup lang="ts">
const open = ref<boolean>(false)

</script>

<template>
  <div class="flex md:hidden relative">
    <button
      class="border-2 border-solid border-white/20 flex items-center justify-center leading-none px-4 rounded-full text-white text-xs uppercase h-9"
      @click="open = !open"
    >
      Menu
    </button>

    <div
      :class="[
        'bg-black fixed flex flex-col h-screen left-0 top-0 w-screen z-[99]',
        'transition-transform duration-300',
        open ? 'translate-x-0' : 'translate-x-full'
      ]"
    >
      <div class="flex item-center justify-end w-full">
        <button class="flex p-2" @click="open = !open">
          <icon name="mdi:close" size="2.5rem" class="text-white/50" />
        </button>
      </div>
      <div class="flex flex-col h-full w-full">
        <NavigationMenuMain
          @menu-clicked="open = false"
        />
        <div
          class="flex items center justify-center p-4"
        >
          <ButtonLanguageSwitcher />
        </div>
      </div>
    </div>
  </div>
</template>
