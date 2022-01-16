import { ElementType } from 'react';

function SidebarLink({ text, Icon }: Props) {
  return (
    <div className="text-white flex items-center justify-center xl:justify-start text-xl space-x-3">
      <Icon className="h-7" />
      <span>{text}</span>
    </div>
  );
}

export { SidebarLink };

type Props = {
  text: string;
  Icon: ElementType;
  active?: boolean;
};
