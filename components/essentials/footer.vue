<template>
  <div class="bg-gray-900 px-4 pb-8 pt-6 text-center">
    <span class="font-mono text-white text-xs" v-html="$md.render(text)"></span>
  </div>
</template>
<script>
export default {
  name: 'AppFooter',
  data: () => ({
    text: 'Terbikin dengan penuh [🤔](https://kbbi.kemdikbud.go.id/entri/kemelitan) oleh Yosef Yudha Wijaya'
  })
}
</script>
