// These lines of code should only run on server
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(async (_nuxtApp) => {
  const sb = useSb()
  await sb.serverInit()
})
