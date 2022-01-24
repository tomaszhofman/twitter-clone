import dayjs, { extend } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

extend(relativeTime);

export const timeFromNowFormater = (time: string): string => dayjs(time).fromNow(true);
