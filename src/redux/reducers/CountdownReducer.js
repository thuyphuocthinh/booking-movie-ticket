import { SET_COUNTDOWN_KEY } from "../types/CountdownTypes";

const initialState = {
  key: Math.random(),
};

export const CountdownReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COUNTDOWN_KEY: {
      return {
        ...state,
        key: Math.random(),
      };
    }
    default: {
      return state;
    }
  }
};
