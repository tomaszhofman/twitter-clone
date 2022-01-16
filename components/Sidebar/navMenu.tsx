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
import { ElementType } from 'react';

export const NAVIGATION_LINKS: NavigationTypes[] = [
  {
    text: 'Home',
    Icon: HomeIcon,
  },
  {
    text: 'Explore',
    Icon: HashtagIcon,
  },
  {
    text: 'Notification',
    Icon: BellIcon,
  },
  {
    text: 'Messages',
    Icon: InboxIcon,
  },
  {
    text: 'Book Marks',
    Icon: BookmarkIcon,
  },
  {
    text: 'List',
    Icon: ClipboardListIcon,
  },
  {
    text: 'Profile',
    Icon: UserIcon,
  },
  {
    text: 'More',
    Icon: DotsCircleHorizontalIcon,
  },
];

type NavigationTypes = {
  text: string;
  Icon: ElementType;
};
