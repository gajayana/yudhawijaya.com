<template>
  <div class="container flex flex-col min-h-screen justify-center mx-auto py-8">
    <div class="px-4 mb-4 text-center">
      <p class="text-gray-700 text-xl">Nomor togel Anda</p>
      <p class="text-gray-700">Your lucky number</p>
      <p class="font-bold font-sans text-gray-500 text-6xl">{{ error.statusCode }}</p>
      <p class="bg-red-600 rounded px-2 py-1 text-white">{{ error.message }}</p>
    </div>
    <div class="px-4 text-center">
      <p class="mb-3 text-sm"><nuxt-link class="text-blue-500 underline" to="/">Kembali ke halaman muka</nuxt-link></p>
      <p class="text-xs"><nuxt-link class="text-blue-500 underline" to="/">Return to home page</nuxt-link></p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['error']
}
</script>
