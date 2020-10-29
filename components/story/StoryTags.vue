<template>
  <div class="flex flex-wrap items-start">
    <chip v-for="tag in tags" :key="`tag-${tag}`" class="flex-shrink-0 mb-1 mr-1">
      #{{ tag }}
    </chip>
  </div>
</template>
<script>
export default {
  name: 'StoryTags',
  props: {
    tags: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>
