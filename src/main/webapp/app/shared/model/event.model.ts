import { Moment } from 'moment';

export const enum EventStatus {
  OPEN = 'OPEN',
  POSTPONED = 'POSTPONED',
  CANCELLED = 'CANCELLED'
}

export interface IEvent {
  id?: number;
  name?: string;
  description?: any;
  remarks?: string;
  venue?: string;
  startDate?: Moment;
  endDate?: Moment;
  fee?: number;
  requiredTransport?: boolean;
  status?: EventStatus;
  imageUrl?: string;
  fileName?: string;
  fileType?: string;
}

export const defaultValue: Readonly<IEvent> = {
  requiredTransport: false
};
