<template>
  <UCard class="overflow-hidden">
    <!-- Image Skeleton -->
    <div class="aspect-video bg-neutral-100 overflow-hidden">
      <USkeleton class="h-full w-full" />
    </div>

    <!-- Content Skeleton -->
    <template #footer>
      <div class="flex flex-col gap-3 p-1">
        <!-- Title Skeleton -->
        <USkeleton class="h-6 w-3/4" />

        <!-- Excerpt Skeleton -->
        <div class="flex flex-col gap-2">
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-5/6" />
        </div>
      </div>
    </template>
  </UCard>
</template>
