<script setup>
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});
const title = computed(() => SEO_TITLE_DEFAULT);
</script>

<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Head>
      <Title>{{ title }}</Title>
      <template v-for="link in head.link" :key="link.id">
        <Link
          :id="link.id"
          :rel="link.rel"
          :href="link.href"
          :hreflang="link.hreflang"
        />
      </template>
      <template v-for="meta in head.meta" :key="meta.id">
        <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
      </template>
    </Head>
    <Body class="bg-white">
      <div class="flex flex-col relative w-full">
        <!-- <BackgroundPage /> -->
        <HeaderDefault />
        <slot />
        <FooterDefault />
        <NotificationToasts />
      </div>
    </Body>
  </Html>
</template>
