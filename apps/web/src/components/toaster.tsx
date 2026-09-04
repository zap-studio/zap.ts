import { Toast, useToastManager } from "@zap-ts/ui/components/toast";

const ToastList = () => {
  const { toasts } = useToastManager();

  return toasts.map((toast) => (
    <Toast.Root key={toast.id} toast={toast}>
      <Toast.Content>
        <Toast.Title />
        <Toast.Description />
        <Toast.Action />
        <Toast.Close />
      </Toast.Content>
    </Toast.Root>
  ));
};

export const Toaster = () => (
  <Toast.Portal>
    <Toast.Viewport>
      <ToastList />
    </Toast.Viewport>
  </Toast.Portal>
);
