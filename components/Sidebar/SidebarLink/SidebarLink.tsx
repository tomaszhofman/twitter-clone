import * as React from 'react';
import { removeSlashes } from '../../../lib/removeShlashes';

type Props = {
  text: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  active?: boolean;
  href: string;
};

function SidebarLink({ text, icon, active, href, activeIcon }: Props) {
  const iconName = removeSlashes(href);
  const hideOnTallScreen = iconName === 'bookmarks' || iconName === 'lists';

  return (
    <div className={`${hideOnTallScreen ? 'stall:hidden' : 'stall:inline'}`}>
      <li
        className={`text-white flex items-center justify-center xl:justify-start text-xl space-x-3  hoverAnimation  ${
          active && 'font-bold'
        } `}
      >
        {active ? activeIcon : icon}
        <span className="hidden xl:inline">{text}</span>
      </li>
    </div>
  );
}

export { SidebarLink };
