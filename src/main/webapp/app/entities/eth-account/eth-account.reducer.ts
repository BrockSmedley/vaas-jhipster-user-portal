import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEthAccount, defaultValue } from 'app/shared/model/eth-account.model';

export const ACTION_TYPES = {
  FETCH_ETHACCOUNT_LIST: 'ethAccount/FETCH_ETHACCOUNT_LIST',
  FETCH_ETHACCOUNT: 'ethAccount/FETCH_ETHACCOUNT',
  CREATE_ETHACCOUNT: 'ethAccount/CREATE_ETHACCOUNT',
  UPDATE_ETHACCOUNT: 'ethAccount/UPDATE_ETHACCOUNT',
  DELETE_ETHACCOUNT: 'ethAccount/DELETE_ETHACCOUNT',
  RESET: 'ethAccount/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEthAccount>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EthAccountState = Readonly<typeof initialState>;

// Reducer

export default (state: EthAccountState = initialState, action): EthAccountState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ETHACCOUNT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ETHACCOUNT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ETHACCOUNT):
    case REQUEST(ACTION_TYPES.UPDATE_ETHACCOUNT):
    case REQUEST(ACTION_TYPES.DELETE_ETHACCOUNT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ETHACCOUNT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ETHACCOUNT):
    case FAILURE(ACTION_TYPES.CREATE_ETHACCOUNT):
    case FAILURE(ACTION_TYPES.UPDATE_ETHACCOUNT):
    case FAILURE(ACTION_TYPES.DELETE_ETHACCOUNT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ETHACCOUNT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ETHACCOUNT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ETHACCOUNT):
    case SUCCESS(ACTION_TYPES.UPDATE_ETHACCOUNT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ETHACCOUNT):
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

const apiUrl = 'api/eth-accounts';

// Actions

export const getEntities: ICrudGetAllAction<IEthAccount> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ETHACCOUNT_LIST,
  payload: axios.get<IEthAccount>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IEthAccount> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ETHACCOUNT,
    payload: axios.get<IEthAccount>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEthAccount> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ETHACCOUNT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEthAccount> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ETHACCOUNT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEthAccount> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ETHACCOUNT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
