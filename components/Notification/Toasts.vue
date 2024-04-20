<script setup lang="ts">
const notifications = useToastNotifications()
const items = notifications.notifications

const icon = (notification: ToastNotification): string => {
  switch (notification.type) {
    case 'error':
      return 'mdi:alert-circle'
    case 'warning':
      return 'mdi:alert-circle-outline'
    case 'success':
      return 'mdi:checkbox-marked-circle'
    default:
      return 'mdi:alert-circle'
  }
}

const wrapperClasses = (notification: ToastNotification): string => {
  const core = ['border', 'border-solid', 'flex', 'items-center', 'gap-2', 'mb-2', 'last:mb-0', 'p-2', 'rounded-md']

  if (notification.type === 'error') { return [...core, 'bg-red-200', 'border-red-700', 'text-red-700'].join(' ') }

  if (notification.type === 'success') { return [...core, 'bg-lime-200', 'border-lime-700', 'text-lime-700'].join(' ') }

  if (notification.type === 'warning') { return [...core, 'bg-yellow-200', 'border-yellow-700', 'text-yellow-700'].join(' ') }

  return core.join(' ')
}

const handleClose = (id:number): void => {
  notifications.remove(id)
}

</script>

<template>
  <div v-if="items.length > 0" class="fixed flex flex-col right-4 top-4 w-full max-w-xs">
    <div v-for="(item, id) in items" :key="`notification-${id}`" :class="wrapperClasses(item)">
      <Icon :name="icon(item)" />
      <p class="flex-1 font-sans text-slate-800">
        {{ item.message }}
      </p>
      <button @click="handleClose(id)">
        <Icon name="mdi:close" />
      </button>
    </div>
  </div>
</template>
