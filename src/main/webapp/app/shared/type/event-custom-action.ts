import { IPayload, IPayloadResult } from 'react-jhipster';

export declare type IGetAllByEventId<T> = (
  eventId: string,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export declare type IDeleteEvent<T> = (id?: number | string, eventId?: number | string) => IPayload<T> | IPayloadResult<T>;
export declare type IPutEvent<T> = (data?: T, eventId?: number | string) => IPayload<T> | IPayloadResult<T>;
export declare type IGetEvent<T> = (id: string | number, eventId?: number | string) => IPayload<T> | ((dispatch: any) => IPayload<T>);
