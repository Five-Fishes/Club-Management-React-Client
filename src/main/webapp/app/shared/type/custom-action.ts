import { IPayload, IPayloadResult } from 'react-jhipster';

export declare type IGetEntityWithoutParams<T> = () => IPayload<T> | ((dispatch: any) => IPayload<T>);

export declare type IGetUsersWithFilters<T> = (familyCode: string, filters?: any) => IPayload<T> | IPayloadResult<T>;
