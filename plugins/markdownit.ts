// See https://github.com/jyotirmaybarman/nuxt3-tailwind-pinia/blob/main/plugins/markdownit.js
import mdit from 'markdown-it'
import { defineNuxtPlugin } from '#app'
// eslint-disable-next-line new-cap
const markdownit = new mdit({
  html: true,
  xhtmlOut: false,
  breaks: false,
  langPrefix: 'language-',
  linkify: true,
  typographer: true,
  quotes: '“”‘’'
})

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('mdit', markdownit)
})
