<template>
  <div v-if="teaser" class="bg-gray-100 shadow-md">
    <div class="container flex flex-col items-center mx-auto px-4 py-20">
      <h1 class="font-bold font-sans leading-tight mb-4 text-center text-gray-600 text-4xl sm:text-6xl">{{ teaser.headline }}</h1>
      <span class="mb-2 text-center text-base sm:text-2xl text-gray-600">{{ teaser.occupation }}</span>
      <ul class="flex -mx-4">
        <li v-for="(item, key) in socialAccounts" :key="`social-${key}`" class="px-4">
          <a :href="item.link" :title="item.link" class="text-gray-500 hover:text-gray-600 text-3xl sm:text-2xl" target="_blank">
            <font-awesome-icon :icon="item.icon" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>

export default {
 name: 'HomeHero',
 props: {
   teaser: {
     type: Object,
     default: () => ({})
   }
 },
 computed: {
  // ...mapGetters({
  //   teaser: 'home/teaser',
  // }),
  socialAccounts() {
    if (this.teaser.social_accounts) return this.$socialParser(this.teaser.social_accounts)
  }
 }
}
</script>
