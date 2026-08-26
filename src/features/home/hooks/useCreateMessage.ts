import { MESSAGES } from "@/shared/constants/message.constant";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createPublicMessage } from "../services/home.service";
import { CreateMessagePayload } from "../types/home.type";

export const useCreateMessage = () => {
  return useMutation({
    mutationFn: (payload: CreateMessagePayload) => createPublicMessage(payload),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || MESSAGES.CONTACT.SUCCESS);
      } else {
        toast.error(res.error || MESSAGES.CONTACT.ERROR);
      }
    },
    onError: (err) => {
      toast.error(err.message || MESSAGES.ERROR.SERVER_ERROR);
    },
  });
};