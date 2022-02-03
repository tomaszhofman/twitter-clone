import { forwardRef, Ref } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useRouter } from 'next/router';
import { useToggleRouterQuery } from '../../lib/hooks/useToggleRouterQuery';

export type ModalBaseProps = React.ComponentProps<typeof DialogPrimitive['Root']>;

// function ModalOpenButton({ children: child }: { children: React.ReactNode }) {
//   const [, setIsOpen] = useRecoilState(modalState);
//
//   if (isValidElement(child)) {
//     return cloneElement(child, {
//       onClick: callAll(() => setIsOpen(true), child.props.onClick),
//     });
//   }
// }

// function ModalCloseButton({ children: child }: { children: React.ReactNode }) {
//   const [, setIsOpen] = useRecoilState(modalState);
//
//   if (isValidElement(child)) {
//     return cloneElement(child, {
//       onClick: callAll(() => setIsOpen(false), child.props.onClick),
//     });
//   }
// }

function Modal(props: ModalBaseProps) {
  const modalState = useToggleRouterQuery('compose');
  const { children, onOpenChange, open, ...restProps } = props;
  const router = useRouter();

  async function closeModal(isOpen) {
    if (!isOpen) {
      await router.replace({
        pathname: router.pathname,
      });
    }
  }

  return (
    <DialogPrimitive.Root
      onOpenChange={Boolean(onOpenChange) ? onOpenChange : closeModal}
      open={open ? open : modalState.isOn}
      {...restProps}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={'z-9 fixed inset-0 bg-gray-500 bg-opacity-75 '} />
        {children}
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const _ModalContent = ({ children, ...props }: DialogContentProps, ref: Ref<HTMLDivElement>) => (
  <DialogPrimitive.Content
    ref={ref}
    {...props}
    className=" z-10 min-w-[360px] fixed left-1/2 top-1/2 p-6 text-left bg-white rounded shadow-xl -translate-x-1/2 -translate-y-1/2 sm:align-middle sm:w-full sm:max-w-lg"
  >
    {children}
  </DialogPrimitive.Content>
);

type DialogContentProps = React.ComponentProps<typeof DialogPrimitive['Content']>;

const ModalContent = forwardRef<HTMLDivElement, DialogContentProps>(
  _ModalContent,
) as typeof _ModalContent;

export { Modal, ModalContent };
