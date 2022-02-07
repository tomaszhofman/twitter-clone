import React, { forwardRef, HTMLProps } from 'react';

type Props = {
  name: string;
  value: string;
  placeholder: string;
  className?: string;
  autoResize?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
};

type NativeProps = Omit<HTMLProps<HTMLTextAreaElement>, keyof Props>;
export type TextFieldProps = NativeProps & Props;

const TextField = forwardRef<HTMLTextAreaElement, TextFieldProps>(
  ({ autoResize, name, value, className, placeholder, onChange, onBlur, ...props }, ref) => {
    const fieldProps = {
      ...props,
      name,
      ref,
      value,
      onChange,
      onBlur,
      placeholder,
    };

    return (
      <textarea
        className={
          className
            ? className
            : 'resize-none bg-transparent outline-none w-full h-auto flex-grow text-[20px] self-end '
        }
        {...fieldProps}
      />
    );
  },
);

TextField.displayName = 'TextField';
export { TextField };
