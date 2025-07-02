// utils/toast.ts
import toast from "react-hot-toast";

interface ToastMessages {
  loading?: string;
  success?: string;
  error?: string | ((err: any) => string);
}

export const showToastPromise = <T>(
  promise: Promise<T>,
  messages: ToastMessages
): Promise<T> => {
  return toast.promise(promise, {
    loading: messages.loading || "Loading...",
    success: messages.success || "Success!",
    error: (err) => {
      if (typeof messages.error === "function") {
        return messages.error(err);
      }
      return messages.error || err?.message || "Something went wrong.";
    },
  });
};

export const showSuccess = (message: string) => toast.success(message);
export const showError = (message: string) => toast.error(message);