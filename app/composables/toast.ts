import { toast } from 'vue-sonner'

export function useToast() {
  return {
    toastSuccess: ({ message }: { message: string }) => toast.success(message),
    toastError: ({ message }: { message: string }) => toast.error(message),
    toastWarning: ({ message }: { message: string }) => toast.warning(message),
    toastInfo: ({ message }: { message: string }) => toast.info(message),
  }
}
