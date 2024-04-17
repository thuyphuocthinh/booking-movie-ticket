import { ThongTinPhimTheoMaPhim } from "../../_core/QuanLyPhim/ThongTinPhimTheoMaPhim";
import {
  SET_DANH_SACH_BANNER,
  SET_DANH_SACH_PHIM,
  SET_THONG_TIN_PHIM_THEO_MA_PHIM,
} from "../types/QuanLyPhimTypes";

const initialState = {
  danhSachBanner: [],
  danhSachTatCaPhim: [],
  thongTinPhimTheoMaPhim: new ThongTinPhimTheoMaPhim(),
};

export const QuanLyPhimReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DANH_SACH_BANNER: {
      return {
        ...state,
        danhSachBanner: action.payload,
      };
    }

    case SET_DANH_SACH_PHIM: {
      return {
        ...state,
        danhSachTatCaPhim: action.payload,
      };
    }
    
    case SET_THONG_TIN_PHIM_THEO_MA_PHIM: {
      return {
        ...state,
        thongTinPhimTheoMaPhim: action.payload,
      };
    }
    default:
      return state;
  }
};
