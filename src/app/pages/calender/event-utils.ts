
import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
const date = new Date();
const TODAY_STR = date.toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
date.setDate(date.getDate() - 2);
const TWO_DAYS_AGO_STR = date.toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of two days ago
date.setDate(date.getDate() - 16);
const EIGHTEEN_DAYS_AGO_STR  = date.toISOString().replace(/T.*$/, '');
export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: TODAY_STR
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T12:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TWO_DAYS_AGO_STR + 'T12:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: EIGHTEEN_DAYS_AGO_STR  + 'T12:00:00'
  }
];

export function createEventId() {
  return String(eventGuid++);
}
