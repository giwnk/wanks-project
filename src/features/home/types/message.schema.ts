import { MESSAGES } from "@/shared/constants/message.constant";
import z from "zod";

export const MessageSchema = z.object({
  sender_name: z
    .string()
    .min(1, { message: MESSAGES.VALIDATION.REQUIRED("Nama") }),
  sender_email: z
    .string()
    .min(1, { message: MESSAGES.VALIDATION.REQUIRED("Email") })
    .email({ message: MESSAGES.VALIDATION.INVALID_EMAIL }),
  subject: z.string().min(1, {message: MESSAGES.VALIDATION.REQUIRED("Subyek")}),
  message_body: z.string().optional(),
})