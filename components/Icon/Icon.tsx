import React from 'react';

import Home from '@/assets/icons/home.svg';
import Explore from '@/assets/icons/explore.svg';
import Bookmarks from '@/assets/icons/bookmarks.svg';
import Lists from '@/assets/icons/lists.svg';
import Messages from '@/assets/icons/messages.svg';
import Notification from '@/assets/icons/notification.svg';
import Profile from '@/assets/icons/profile.svg';
import More from '@/assets/icons/more.svg';
import DotsMenu from '@/assets/icons/dotsMenu.svg';

const iconTypes = {
  home: Home,
  explore: Explore,
  bookmarks: Bookmarks,
  lists: Lists,
  messages: Messages,
  notification: Notification,
  profile: Profile,
  more: More,
  dotsMenu: DotsMenu,
};

function Icon({ name, ...props }: Props) {
  const IconComponent = name ? iconTypes[name] : Home;
  return <IconComponent {...props} />;
}

export { Icon };

type Props = {
  name: string;
  className: string;
};
