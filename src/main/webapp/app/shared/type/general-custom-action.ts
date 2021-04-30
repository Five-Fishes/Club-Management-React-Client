import { IPayload } from 'react-jhipster';

export declare type IGetActionWithoutParam<T> = () => IPayload<T> | ((dispatch: any) => any);
