<template>
  <div class="animate-wiggle mb-3 md:mb-6 mr-3 md:mr-6 w-16 md:w-32">
    <img
      class="block w-full"
      src="/img/doodles/snowman-320x320.png"
      :alt="label"
      :title="label"
    >
  </div>
</template>
<script>
export default {
  name: 'DoodleChristmas',
  data: () => ({
    label: 'Happy Christmas!'
  })
}
</script>
