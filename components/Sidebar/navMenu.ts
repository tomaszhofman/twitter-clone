export const NAV_MENU: Array<NavMenu> = [
  {
    text: 'Home',
    icon: 'home',
    href: '/home',
  },
  {
    text: 'Explore',
    icon: 'explore',
    href: '/explore',
  },
  {
    text: 'Notifications',
    icon: 'notification',
    href: '/notification',
  },
  {
    text: 'Messages',
    icon: 'messages',
    href: '/messages',
  },
  {
    text: 'Bookmarks',
    icon: 'bookmarks',
    href: '/bookmarks',
  },
  {
    text: 'List',
    icon: 'lists',
    href: '/lists',
  },
  {
    text: 'Profile',
    icon: 'profile',
    href: '/profile',
  },
  {
    text: 'More',
    icon: 'more',
    href: '/more',
  },
];

type NavMenu = {
  text: string;
  icon: string;
  href: string;
};
