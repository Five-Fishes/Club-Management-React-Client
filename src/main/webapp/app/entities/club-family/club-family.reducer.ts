import axios, { AxiosError } from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IClubFamily, defaultValue } from 'app/shared/model/club-family.model';
import { AnyAction } from 'redux';
import { getClubFamilyDetails, getClubFamilyList } from 'app/shared/services/club-family-info.service';

export const ACTION_TYPES = {
  FETCH_CLUBFAMILY_LIST: 'clubFamily/FETCH_CLUBFAMILY_LIST',
  FETCH_CLUBFAMILY: 'clubFamily/FETCH_CLUBFAMILY',
  RESET: 'clubFamily/RESET',
};

const initialState: IClubFamilyState = {
  loading: false,
  errResponse: null,
  entities: [] as ReadonlyArray<IClubFamily>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export interface IClubFamilyState {
  loading: boolean;
  errResponse: null | AxiosError;
  entities: ReadonlyArray<IClubFamily>;
  entity: Readonly<IClubFamily>;
  updating: boolean;
  updateSuccess: boolean;
}

// Reducer

export default (state: IClubFamilyState = initialState, action: AnyAction): IClubFamilyState => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_CLUBFAMILY_LIST:
      return {
        ...state,
        loading: false,
        entities: action.payload,
      };
    case ACTION_TYPES.FETCH_CLUBFAMILY:
      return {
        ...state,
        loading: false,
        entity: action.payload,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

// Actions

export const getEntities: any = () => ({
  type: ACTION_TYPES.FETCH_CLUBFAMILY_LIST,
  payload: getClubFamilyList(),
});

export const getEntity: any = (code: string) => ({
  type: ACTION_TYPES.FETCH_CLUBFAMILY,
  payload: getClubFamilyDetails(code),
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
