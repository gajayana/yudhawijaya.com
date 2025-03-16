/**
 * Constants representing possible states of asynchronous data operations
 */
export const ASYNC_DATA_STATUS = {
  ERROR: "error",
  IDLE: "idle",
  PENDING: "pending",
  SUCCESS: "success",
} as const;

/**
 * Constants representing types of notification messages
 */
export const NOTIFICATION_TYPE = {
  ERROR: "error",
  WARNING: "warning",
  SUCCESS: "success",
} as const;

// Type definitions for better TypeScript support
export type AsyncDataStatus =
  (typeof ASYNC_DATA_STATUS)[keyof typeof ASYNC_DATA_STATUS];
export type NotificationType =
  (typeof NOTIFICATION_TYPE)[keyof typeof NOTIFICATION_TYPE];
