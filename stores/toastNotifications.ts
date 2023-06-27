import { defineStore } from 'pinia'
import { ToastNotification } from 'utils/types'

type State = {
  notifications: ToastNotification[]
}

export const useToastNotifications = defineStore(
  'toastNotifications',
  {
    state: (): State => ({
      notifications: []
    }),
    actions: {
      add (item: ToastNotification) {
        this.notifications.push(item)
      },
      remove (index: number) {
        if (index < -1) { return }
        this.notifications.splice(index, 1)
      },
      reset () {
        this.notifications = []
      }
    }
  }
)
