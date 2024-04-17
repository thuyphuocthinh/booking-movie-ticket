import { DanhSachPhongVe } from "../../_core/QuanLyDatVe/danhSachPhongVe";
import {
  SET_DANH_SACH_PHONG_VE,
} from "../types/QuanLyDatVeTypes";

const initialState = {
  danhSachPhongVe: new DanhSachPhongVe(),
};

export const QuanLyDatVeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DANH_SACH_PHONG_VE: {
      return {
        ...state,
        danhSachPhongVe: action.payload,
      };
    }
    
    default:
      return state;
  }
};
