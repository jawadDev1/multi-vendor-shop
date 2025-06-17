import { toast } from "sonner";

export const notifySuccess = (text: string) => {
  toast.success(text);
};

export const notifyError = (text: string) => {
  toast.error(text);
};
