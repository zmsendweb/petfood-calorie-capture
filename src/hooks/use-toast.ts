
// Forward toast functionality from sonner
import { toast as sonnerToast, ToastT } from "sonner";

// Type definitions for consistency
export type ToastProps = Parameters<typeof sonnerToast>[1];

export type ToastActionElement = {
  label: string;
  onClick: () => void;
};

// Simple wrapper to maintain backwards compatibility with both string and object patterns
export function toast(message: string | { title: string; description?: string; variant?: string; [key: string]: any }, props?: ToastProps) {
  if (typeof message === 'string') {
    return sonnerToast(message, props);
  } else {
    // Extract the title, description, and variant
    const { title, description, variant, ...restProps } = message;
    
    // Merge the extracted properties with any additional props
    const mergedProps = {
      ...restProps,
      ...(description && { description }),
      ...(variant === 'destructive' && { style: { backgroundColor: 'rgba(239, 68, 68, 0.9)', color: 'white' } }),
      ...props
    };
    
    return sonnerToast(title, mergedProps);
  }
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
    },
    // Add a dummy toasts property for compatibility with toaster.tsx
    toasts: [] 
  };
}
