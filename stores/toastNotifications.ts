/**
 * Type definition for toast notification state
 */
type State = {
  notifications: ToastNotification[];
};

/**
 * Store for managing toast notifications with auto-removal functionality
 */
export const useToastNotifications = defineStore("toastNotifications", {
  state: (): State => ({
    notifications: [],
  }),
  actions: {
    /**
     * Add a new notification and automatically remove it after delay
     * @param item Notification to add
     */
    add(item: ToastNotification) {
      // Limit max notifications to prevent memory issues
      if (this.notifications.length >= 5) {
        this.notifications.shift();
      }

      const id = this.notifications.length;
      this.notifications.push(item);

      // Auto remove after delay
      setTimeout(() => {
        this.remove(id);
      }, 5000);
    },

    /**
     * Remove notification at specified index
     * @param index Index of notification to remove
     */
    remove(index: number) {
      if (index < 0 || index >= this.notifications.length) {
        return;
      }
      this.notifications.splice(index, 1);
    },

    /**
     * Reset notifications array
     */
    reset() {
      this.notifications = [];
    },
  },
});
