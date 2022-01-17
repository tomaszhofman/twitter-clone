import {
  BellIcon,
  BookmarkIcon,
  ClipboardListIcon,
  DotsCircleHorizontalIcon,
  HashtagIcon,
  HomeIcon,
  InboxIcon,
  UserIcon,
} from '@heroicons/react/outline';
import { HomeIcon as HomeIconActive } from '@heroicons/react/solid';
import { ElementType } from 'react';

export const NAVIGATION_LINKS: NavigationTypes[] = [
  {
    text: 'Home',
    Icon: HomeIcon,
    IconActive: HomeIconActive,
    href: '/',
  },
  {
    text: 'Explore',
    Icon: HashtagIcon,
    IconActive: HomeIconActive,
    href: '/home',
  },
  {
    text: 'Notification',
    Icon: BellIcon,
    IconActive: HomeIconActive,
    href: '/home',
  },
  {
    text: 'Messages',
    Icon: InboxIcon,
    IconActive: HomeIconActive,
    href: '/home',
  },
  {
    text: 'Bookmarks',
    Icon: BookmarkIcon,
    IconActive: HomeIconActive,
    href: '/home',
  },
  {
    text: 'List',
    Icon: ClipboardListIcon,
    IconActive: HomeIconActive,
    href: '/home',
  },
  {
    text: 'Profile',
    Icon: UserIcon,
    IconActive: HomeIconActive,
    href: '/home',
  },
  {
    text: 'More',
    Icon: DotsCircleHorizontalIcon,
    IconActive: HomeIconActive,
    href: '/home',
  },
];

type NavigationTypes = {
  text: string;
  Icon: ElementType;
  IconActive?: ElementType;
  href: string;
};
