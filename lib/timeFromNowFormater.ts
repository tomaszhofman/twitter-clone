import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const timeFromNowFormater = (time: string): string => dayjs(time).fromNow(true);
