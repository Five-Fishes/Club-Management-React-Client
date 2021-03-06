import moment from 'moment';

import { APP_LOCAL_DATETIME_FORMAT, APP_LOCAL_DATETIME_FORMAT_Z, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export function convertDateTimeFromServer(date?: moment.MomentInput): string | null {
  if (!date) return null;
  return moment(date).format(APP_LOCAL_DATETIME_FORMAT);
}

export function convertDateTimeToServer(date?: moment.MomentInput): Date | null {
  if (!date) return null;
  return moment(date, APP_LOCAL_DATETIME_FORMAT_Z).toDate();
}

export function convertDateTimeFromServerToLocaleDate(date?: moment.MomentInput): string {
  if (!date) return '';
  date = new Date(date.toLocaleString());
  return moment(date).format(APP_LOCAL_DATE_FORMAT);
}

export function convertDateTimeFromServerToLocaleDateTime(date?: moment.MomentInput): string {
  if (!date) return '';
  date = new Date(date.toLocaleString());
  return moment(date).format(APP_LOCAL_DATETIME_FORMAT);
}
