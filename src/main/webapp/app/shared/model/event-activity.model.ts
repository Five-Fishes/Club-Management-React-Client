import { Moment } from 'moment';

export interface IEventActivity {
  id?: number;
  eventId?: number;
  startDate?: Moment;
  durationInDay?: number;
  name?: string;
  description?: any;
}

export const defaultValue: Readonly<IEventActivity> = {};
