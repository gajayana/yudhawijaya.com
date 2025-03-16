export type Locale = "en" | "id";

// Notification types
export type ToastNotificationType = "error" | "success" | "warning";

export type ToastNotification = Readonly<{
  type: ToastNotificationType;
  message: string;
}>;

// Social media types
export type SocialAccount = Readonly<{
  icon: string;
  medium: string;
  url: string;
}>;
