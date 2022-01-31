import { useRecoilState } from 'recoil';
import { modalState } from '../lib/atoms/modalAtom';
import { callAll } from '../lib/callAll';
import { cloneElement, ComponentProps, isValidElement, useEffect } from 'react';
import ReactModal from 'react-modal';

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    top: '15%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '600px',
    maxHeight: '300px',
    borderRadius: '16px',
  },
};

function Modal({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

function ModalOnInitialOpen({ query }) {
  const [, setIsOpen] = useRecoilState(modalState);

  useEffect(() => {
    setIsOpen((prevState) => !prevState);
  }, [setIsOpen, query]);

  return null;
}

function ModalOpenButton({ children: child }: { children: React.ReactNode }) {
  const [, setIsOpen] = useRecoilState(modalState);

  if (isValidElement(child)) {
    return cloneElement(child, {
      onClick: callAll(() => setIsOpen(true), child.props.onClick),
    });
  }
}

function ModalCloseButton({ children: child }: { children: React.ReactNode }) {
  const [, setIsOpen] = useRecoilState(modalState);

  if (isValidElement(child)) {
    return cloneElement(child, {
      onClick: callAll(() => setIsOpen(false), child.props.onClick),
    });
  }
}

function ModalContentBase(
  props: Omit<ComponentProps<typeof ReactModal>, 'isOpen' | 'onRequestClose'>,
) {
  const [open, setIsOpen] = useRecoilState(modalState);
  return (
    <ReactModal
      style={modalStyles}
      isOpen={open}
      onRequestClose={() => setIsOpen(false)}
      contentLabel="Compose tweet modal"
      ariaHideApp={false}
      {...props}
    />
  );
}

export { Modal, ModalOpenButton, ModalContentBase, ModalOnInitialOpen, ModalCloseButton };
