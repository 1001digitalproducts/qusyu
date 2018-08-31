// @flow
import { SELECT_DOA } from '@constants/actionTypes';

export const selectDoa = (doa: {}) => ({
  type: SELECT_DOA,
  payload: doa,
});
