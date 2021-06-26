import { Moment } from 'moment';
import { IImageStorage } from './image-storage.model';

export const enum EventStatus {
  OPEN = 'OPEN',
  POSTPONED = 'POSTPONED',
  CANCELLED = 'CANCELLED',
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
  imageStorageDTO?: IImageStorage;
  imageFile?: File;
}

export const defaultValue: Readonly<IEvent> = {
  requiredTransport: false,
};
