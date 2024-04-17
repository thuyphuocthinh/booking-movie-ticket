import {
  SET_LICH_CHIEU_THEO_HE_THONG_RAP,
  SET_THONG_TIN_CUM_RAP_THEO_HE_THONG,
  SET_THONG_TIN_HE_THONG_RAP,
  SET_THONG_TIN_LICH_CHIEU_PHIM,
  SET_THONG_TIN_LICH_CHIEU_PHIM_BOOKING_BAR,
} from "../types/QuanLyRapTypes";

const initialState = {
  lichChieuTheoHeThongRap: [],
  thongTinLichChieuPhim: [],
  thongTinLichChieuPhimForBookingBar: [],
  thongTinHeThongRap: [],
  thongTinCumRapTheoHeThong: [],
};

export const QuanLyRapReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LICH_CHIEU_THEO_HE_THONG_RAP: {
      return {
        ...state,
        lichChieuTheoHeThongRap: action.payload,
      };
    }
    case SET_THONG_TIN_LICH_CHIEU_PHIM: {
      return {
        ...state,
        thongTinLichChieuPhim: action.payload,
      };
    }
    case SET_THONG_TIN_LICH_CHIEU_PHIM_BOOKING_BAR: {
      return {
        ...state,
        thongTinLichChieuPhimForBookingBar: action.payload,
      };
    }
    case SET_THONG_TIN_HE_THONG_RAP: {
      return {
        ...state,
        thongTinHeThongRap: action.payload,
      };
    }
    case SET_THONG_TIN_CUM_RAP_THEO_HE_THONG: {
      return {
        ...state,
        thongTinCumRapTheoHeThong: action.payload,
      };
    }
    default:
      return state;
  }
};
