import { IPayload } from 'react-jhipster';

export declare type IGetEntityWithoutParams<T> = () => IPayload<T> | ((dispatch: any) => IPayload<T>);
