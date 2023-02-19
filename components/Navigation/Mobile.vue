<script setup lang="ts">
const open = ref<boolean>(false)

</script>

<template>
  <div class="flex md:hidden relative">
    <button 
      class="border border-solid border-indigo-600 flex items-center justify-center leading-none px-4 rounded text-indigo-600 text-xs uppercase h-9"
      @click="open = !open"
    >
      Menu
    </button>

    <div 
      v-if="open" 
      class="bg-white fixed flex flex-col h-screen left-0 top-0 w-screen"
    >
      <div class="flex item-center justify-end w-full">
        <button class="flex p-2" @click="open = !open">
          <icon name="mdi:close" size="2.5rem" />
        </button>
      </div>
      <div class="flex flex-col w-full">
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