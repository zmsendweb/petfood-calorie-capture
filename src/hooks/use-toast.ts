
// Forward toast functionality from sonner
import { toast as sonnerToast, ToastT } from "sonner";

// Type definitions for consistency
export type ToastProps = Parameters<typeof sonnerToast>[1];

export type ToastActionElement = {
  label: string;
  onClick: () => void;
};

// Simple wrapper to maintain backwards compatibility if needed
export function toast(message: string, props?: ToastProps) {
  return sonnerToast(message, props);
}

// Since sonner doesn't have useToast, create a minimal implementation to avoid breaking code
export function useToast() {
  return {
    toast,
    dismiss: (toastId?: string) => {
      if (toastId) {
        sonnerToast.dismiss(toastId);
      } else {
        sonnerToast.dismiss();
      }
    }
  };
}
