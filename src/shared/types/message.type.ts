export interface Message {
  id: string;
  sender_name: string;
  sender_email: string;
  subject: string;
  message_body?: string;
  status: string;
  created_at: string;
}

export type CreateMessagePayload = Omit<
  Message,
  "id" | "status" | "created_at"
>;
