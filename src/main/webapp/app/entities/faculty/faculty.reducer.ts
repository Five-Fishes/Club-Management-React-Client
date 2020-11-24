import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFaculty, defaultValue } from 'app/shared/model/faculty.model';

export const ACTION_TYPES = {
  FETCH_FACULTY_LIST: 'faculty/FETCH_FACULTY_LIST',
  FETCH_FACULTY: 'faculty/FETCH_FACULTY',
  CREATE_FACULTY: 'faculty/CREATE_FACULTY',
  UPDATE_FACULTY: 'faculty/UPDATE_FACULTY',
  DELETE_FACULTY: 'faculty/DELETE_FACULTY',
  RESET: 'faculty/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFaculty>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FacultyState = Readonly<typeof initialState>;

// Reducer

export default (state: FacultyState = initialState, action): FacultyState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FACULTY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FACULTY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FACULTY):
    case REQUEST(ACTION_TYPES.UPDATE_FACULTY):
    case REQUEST(ACTION_TYPES.DELETE_FACULTY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FACULTY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FACULTY):
    case FAILURE(ACTION_TYPES.CREATE_FACULTY):
    case FAILURE(ACTION_TYPES.UPDATE_FACULTY):
    case FAILURE(ACTION_TYPES.DELETE_FACULTY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FACULTY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FACULTY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FACULTY):
    case SUCCESS(ACTION_TYPES.UPDATE_FACULTY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FACULTY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/faculties';

// Actions

export const getEntities: ICrudGetAllAction<IFaculty> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FACULTY_LIST,
  payload: axios.get<IFaculty>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFaculty> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FACULTY,
    payload: axios.get<IFaculty>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFaculty> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FACULTY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFaculty> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FACULTY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFaculty> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FACULTY,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
