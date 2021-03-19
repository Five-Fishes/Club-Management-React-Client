import { IPayload, IPayloadResult } from 'react-jhipster';

export declare type IGetAllByEventId<T> = (
  eventId: number,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export declare type IGetActionWithEventId<T> = (
  eventId: number | string,
  id?: number | string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export declare type IDeleteActionWithEventId<T> = (eventId: number | string, id?: number | string) => IPayload<T> | IPayloadResult<T>;
