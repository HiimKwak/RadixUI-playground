import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { ReactNode } from "react";

export default function Modal({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
}

function ModalContent({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="data-[state=open]:animate-[dialog-overlay-show_200ms] data-[state=closed]:animate-[dialog-overlay-hide_200ms] fixed inset-0 bg-black/50" />
      <Dialog.Content className="data-[state=open]:animate-[dialog-content-show_200ms] data-[state=closed]:animate-[dialog-content-hide_200ms] fixed w-full max-w-md p-8 text-gray-900 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow left-1/2 top-1/2">
        <div className="flex items-center justify-between">
          <Dialog.Title className="text-xl">{title}</Dialog.Title>
          <Dialog.Close className="text-gray-400 hover:text-gray-500">
            <Cross1Icon />
          </Dialog.Close>
        </div>

        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}

Modal.Button = Dialog.Trigger;
Modal.Content = Dialog.Content;
Modal.Close = Dialog.Close;
