export const MESSAGE_STATUS = {
  UNREAD: "unread",
  READ: "read",
  ARCHIVED: "archived",
  SPAM: "spam",
} as const;

export type MessageStatus = (typeof MESSAGE_STATUS)[keyof typeof MESSAGE_STATUS];
