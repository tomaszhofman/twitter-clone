import React from 'react';

import { Button, ButtonProps } from '@/components/Button';

const IconButton = ({
  icon,
  ariaLabel,
  children,
  ...props
}: ButtonProps<JSX.Element> & { icon?: JSX.Element }) => {
  return (
    <Button ariaLabel={ariaLabel} {...props}>
      <div className="relative h-full ">
        {children ? children : icon}
        <span className="icon" />
      </div>
    </Button>
  );
};

export { IconButton };
