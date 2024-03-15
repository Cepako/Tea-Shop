import { ReactNode, useImperativeHandle, forwardRef, useRef } from 'react';
import { createPortal } from 'react-dom';

import './Modal.scss';

export interface ModalMethods {
  open: () => void;
}

const Modal = forwardRef<ModalMethods, { children: ReactNode }>(function Modal(
  { children },
  ref
) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current?.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className='modal'>
      {children}
      <form method='dialog'>
        <button>Got It</button>
      </form>
    </dialog>,
    document.getElementById('modal')!
  );
});

export default Modal;
