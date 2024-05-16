import { ReactNode, useImperativeHandle, forwardRef, useRef } from 'react';
import { createPortal } from 'react-dom';

import './Modal.scss';

export interface ModalMethods {
  open: () => void;
  close: () => void;
}

const Modal = forwardRef<
  ModalMethods,
  { children: ReactNode; closeButtonValue: string; className?: string }
>(function Modal({ children, closeButtonValue, className }, ref) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current?.showModal();
      },
      close() {
        dialog.current?.close();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`}>
      {children}
      <form method='dialog'>
        <button>{closeButtonValue}</button>
      </form>
    </dialog>,
    document.getElementById('modal')!
  );
});

export default Modal;
