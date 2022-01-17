import { Icon } from '@/components/Icon';
import { IconTypesEnum } from '../../../types/iconsTypes';

function SidebarLink({ text, icon, active }: Props) {
  const hideOnTallScreen = icon === IconTypesEnum.Bookmarks || icon === IconTypesEnum.Lists;

  return (
    <div className={`${hideOnTallScreen ? 'stall:hidden' : 'stall:inline'}`}>
      <div
        className={`text-white flex items-center justify-center xl:justify-start text-xl space-x-3  hoverAnimation  ${
          active && 'font-bold'
        } `}
      >
        <Icon name={icon} className="h-7 fill-white " />
        <span className="hidden xl:inline">{text}</span>
      </div>
    </div>
  );
}

export { SidebarLink };

type Props = {
  text: string;
  icon: string;
  active?: boolean;
};
