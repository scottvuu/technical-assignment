import { DateTime } from "luxon";

export const formatDate = (targetDate: Date, formatString?: string )  => {
  const now = DateTime.now();
  const targetDateTime = DateTime.fromJSDate(targetDate);
  const duration = now.diff(targetDateTime);

  if (duration.as('seconds') < 60) {
    return `${Math.round(duration.as('seconds'))}s`;
  }

  if (duration.as('days') >= 1) {
    return `${Math.round(duration.as('days'))}d`;
  }

  return targetDateTime.toFormat(formatString || 'yyyy-MM-dd HH:mm:ss');
}