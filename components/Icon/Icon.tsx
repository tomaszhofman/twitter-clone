import React from 'react';

import Home from '@/assets/icons/home.svg';

const iconTypes = {
  home: Home,
};

function Icon({ name, ...props }: Props) {
  const IconComponent = iconTypes[name];
  return <IconComponent {...props} />;
}

export { Icon };

type Props = {
  name: string;
};
