import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";

import { Dialog } from "./dialog";

export const AlertDialog = {
  Root: BaseAlertDialog.Root,
  Trigger: BaseAlertDialog.Trigger,
  Portal: Dialog.Portal,
  Backdrop: Dialog.Backdrop,
  Popup: Dialog.Popup,
  Title: Dialog.Title,
  Description: Dialog.Description,
  Close: Dialog.Close,
  Viewport: Dialog.Viewport,
};
