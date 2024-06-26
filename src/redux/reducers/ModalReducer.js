import { CLOSE_MODAL, OPEN_MODAL } from "../types/ModalTypes";

const initialState = {
  IsModalOpen: false,
  title: "",
  Component: <p></p>,
  trailerLink: "",
  maskClosable: true,
  closeIcon: true,
  width: 700,
};

export const ModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        IsModalOpen: true,
        title: action.payload.title,
        Component: action.payload.Component,
        trailerLink: action.payload.trailerLink,
        maskClosable: action.payload.maskClosable,
        closeIcon: action.payload.closeIcon,
        width: action.payload.width,
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        IsModalOpen: false,
        title: "",
        Component: <p></p>,
        trailerLink: "",
        maskClosable: true,
        closeIcon: true,
      };
    }
    default: {
      return state;
    }
  }
};
