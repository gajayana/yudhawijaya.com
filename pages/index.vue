<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        nuxt-ts
      </h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import consola from 'consola'
export default defineComponent({
  setup () {
    consola.log(useContext())
    // consola.log(useAsync())
  }
})
</script>
