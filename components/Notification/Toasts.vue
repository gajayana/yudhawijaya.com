<script setup lang="ts">
import { useToastNotifications } from '~/stores/toastNotifications'
import { ToastNotification } from '~/utils/types'

const notifications = useToastNotifications()
const items = notifications.notifications

const wrapperClasses = (notification: ToastNotification): string => {
  const core = ['border', 'border-solid', 'flex', 'items-center', 'gap-2', 'p-2', 'rounded-md']

  if (notification.type === 'error') { return [...core, 'bg-red-200', 'border-red-700'].join(' ') }

  return core.join(' ')
}

</script>

<template>
  <div v-if="items.length > 0" class="fixed flex flex-col right-4 top-4 w-full max-w-xs">
    <div v-for="(item, id) in items" :key="`notification-${id}`" :class="wrapperClasses(item)">
      <Icon name="mdi:alert-circle" class="text-red-700" />
      <p class="flex-1 font-sans">
        Message here
      </p>
      <button>
        <Icon name="mdi:close" />
      </button>
    </div>
  </div>
</template>
