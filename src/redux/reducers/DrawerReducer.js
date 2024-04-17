import { CLOSE_DRAWER, OPEN_DRAWER } from "../types/DrawerTypes";

const initialState = {
  IsDrawerOpen: false,
  title: "",
  Component: <p></p>,
};

export const DrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER: {
      return {
        ...state,
        IsDrawerOpen: true,
        title: action.payload.title,
        Component: action.payload.Component,
      };
    }
    case CLOSE_DRAWER: {
      return {
        ...state,
        IsDrawerOpen: false,
        title: "",
        Component: <p></p>,
      };
    }
    default: {
      return state;
    }
  }
};
