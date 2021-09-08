import { IPayload, IPayloadResult } from 'react-jhipster';

export declare type IGetEntityWithoutParams<T> = () => IPayload<T> | ((dispatch: any) => IPayload<T>);

export declare type IGetUsersWithFamilyCode<T> = (familyCode: string, yearSession?: string) => IPayload<T> | IPayloadResult<T>;
