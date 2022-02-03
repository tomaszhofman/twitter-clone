import dayjs, { extend } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

extend(relativeTime);

export const timeFromNowFormater = (time: number): string => dayjs(time).fromNow(true);
