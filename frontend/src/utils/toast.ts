import { toast } from "sonner";

export const notifySuccess = (text: string) => {
  if(typeof text !== 'string') return;
  toast.success(text);
};

export const notifyError = (text: string) => {
  toast.error(text);
};
