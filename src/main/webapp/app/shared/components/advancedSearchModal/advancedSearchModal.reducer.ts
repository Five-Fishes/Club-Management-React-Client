import { AnyAction } from 'redux';

export const ACTION_TYPES = {
  SET_FILTER: 'filterSearchBa/SET_FILTER',
  RESET: 'filterSearchBar/RESET',
};

const initialState = {
  filters: null,
};

export interface IAdvancedSearchModalState {
  filters: null | IFilter;
}

export interface IFilter {
  memberName?: string;
  courseProgramId?: number;
  yearSession?: string;
}

export default (state: IAdvancedSearchModalState = initialState, action: AnyAction): IAdvancedSearchModalState => {
  switch (action.type) {
    case ACTION_TYPES.SET_FILTER:
      return {
        ...state,
        filters: action.payload,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const setEntity = (filters: IFilter) => ({
  type: ACTION_TYPES.SET_FILTER,
  payload: filters,
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
