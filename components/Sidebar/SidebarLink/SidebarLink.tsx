import { Icon } from '@/components/Icon';

function SidebarLink({ text, icon = 'home', active }: Props) {
  console.log(icon);
  return (
    <div
      className={`text-white flex items-center justify-center xl:justify-start text-xl space-x-3  hoverAnimation ${
        active && 'font-bold'
      } `}
    >
      <Icon name={icon} className="h-7 fill-amber-500 caret-amber-900" />
      <span className="hidden xl:inline">{text}</span>
    </div>
  );
}

export { SidebarLink };

type Props = {
  text: string;
  icon: string;
  active?: boolean;
};
