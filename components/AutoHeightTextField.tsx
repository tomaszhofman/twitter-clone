import React, { useEffect, useRef } from 'react';
import { TextField, TextFieldProps } from '@/components/TextField';

const AutoHeightTextField = ({ onChange, value, ...props }: Omit<TextFieldProps, 'ref'>) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current.style.height = '0px';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [value]);

  return <TextField value={value} ref={textareaRef} onChange={onChange} {...props} />;
};

export { AutoHeightTextField };
