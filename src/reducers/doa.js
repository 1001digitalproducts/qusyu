import { SELECT_DOA } from '@constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case SELECT_DOA: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
