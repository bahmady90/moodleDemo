import { ReactNode, useCallback, useEffect, useRef } from "react";


type ModalProps = {
  openModal: boolean; // Required boolean state to control modal visibility
  onClose?: () => void;
  children: ReactNode // Callback to handle modal close logic
};

export default function Modal({ openModal, onClose, children }: ModalProps) {

  
  const ref = useRef<HTMLDialogElement>(null);

  // Close modal when clicking outside
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (e.target === ref.current && onClose) {
        onClose();
      }
    },
    [onClose]
  );

  // Manage modal open/close state and attach/detach event listeners
  useEffect(() => {
    const dialog = ref.current;

    if (openModal) {
      dialog?.showModal();
      document.addEventListener("click", handleClickOutside);
    } else {
      dialog?.close();
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openModal, handleClickOutside]);

  return (
    <dialog
      className="w-fit h-fit rounded-2xl float relative outline-none"
      ref={ref}
      onClose={onClose} // Ensure `onClose` is called when dialog is closed
    > 
      {children} 
    </dialog>
  );
}
