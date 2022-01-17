export const NAV_MENU: Array<NavMenu> = [
  {
    text: 'Home',
    icon: 'home',
    href: '/',
  },
  {
    text: 'Explore',
    icon: 'explore',
    href: '/home',
  },
  {
    text: 'Notification',
    icon: 'notification',
    href: '/home',
  },
  {
    text: 'Messages',
    icon: 'messages',
    href: '/home',
  },
  {
    text: 'Bookmarks',
    icon: 'bookmarks',
    href: '/home',
  },
  {
    text: 'List',
    icon: 'lists',
    href: '/home',
  },
  {
    text: 'Profile',
    icon: 'profile',
    href: '/home',
  },
  {
    text: 'More',
    icon: 'more',
    href: '/home',
  },
];

type NavMenu = {
  text: string;
  icon: string;
  href: string;
};
