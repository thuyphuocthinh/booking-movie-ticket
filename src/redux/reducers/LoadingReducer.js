import { DISPLAY_LOADING, HIDE_LOADING } from "../types/LoadingTypes";

const initialState = {
  IsLoading: false,
};

export const LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_LOADING: {
      return {
        ...state,
        IsLoading: true,
      };
    }
    case HIDE_LOADING: {
      return {
        ...state,
        IsLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};
