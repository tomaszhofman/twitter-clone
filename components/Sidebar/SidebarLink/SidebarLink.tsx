import { ElementType } from 'react';

function SidebarLink({ text, Icon, IconActive, active }: Props) {
  return (
    <div
      className={`text-white flex items-center justify-center xl:justify-start text-xl space-x-3  hoverAnimation ${
        active && 'font-bold'
      } `}
    >
      {active ? <IconActive className="h-7" /> : <Icon className="h-7" />}
      <span className="hidden xl:inline">{text}</span>
    </div>
  );
}

export { SidebarLink };

type Props = {
  text: string;
  Icon: ElementType;
  IconActive: ElementType;
  active?: boolean;
};
