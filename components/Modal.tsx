import { useRecoilState } from 'recoil';
import { modalState } from '../lib/atoms/modalAtom';
import { callAll } from '../lib/callAll';
import { cloneElement, ComponentProps, isValidElement } from 'react';
import ReactModal from 'react-modal';

function Modal({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

function ModalOpenButton({ children: child }: { children: React.ReactNode }) {
  const [, setIsOpen] = useRecoilState(modalState);

  if (isValidElement(child)) {
    return cloneElement(child, {
      onClick: callAll(() => setIsOpen(true), child.props.onClick),
    });
  }
}

function ModalContentBase(
  props: Omit<ComponentProps<typeof ReactModal>, 'isOpen' | 'onRequestClose'>,
) {
  const [open, setIsOpen] = useRecoilState(modalState);
  return <ReactModal isOpen={open} onRequestClose={() => setIsOpen(false)} {...props} />;
}

export { Modal, ModalOpenButton, ModalContentBase };
