import { IPayload } from 'react-jhipster';

export declare type IGetAllByEventId<T> = (
  eventId: string,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);
