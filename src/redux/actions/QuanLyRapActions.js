import { quanLyRapService } from "../../services/QuanLyRapService";
import { STATUS_CODE } from "../../util/settings/settings";
import { DISPLAY_LOADING, HIDE_LOADING } from "../types/LoadingTypes";
import {
  SET_LICH_CHIEU_THEO_HE_THONG_RAP,
  SET_THONG_TIN_CUM_RAP_THEO_HE_THONG,
  SET_THONG_TIN_HE_THONG_RAP,
  SET_THONG_TIN_LICH_CHIEU_PHIM,
  SET_THONG_TIN_LICH_CHIEU_PHIM_BOOKING_BAR,
} from "../types/QuanLyRapTypes";

export const layThongTinLichChieuHeThongRapAction = (maHeThongRap = "") => {
  return async (dispatch) => {
    try {
      dispatch({ type: DISPLAY_LOADING });
      const result = await quanLyRapService.layThongTinLichChieuHeThongRap(maHeThongRap);
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        dispatch({
          type: SET_LICH_CHIEU_THEO_HE_THONG_RAP,
          payload: result.data.content,
        });
      }
    } catch (error) {
      console.log("Error lay thong tin lich chieu he thong rap: ", error);
    } finally {
      dispatch({ type: HIDE_LOADING });
    }
  };
};

export const layThongTinLichChieuPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DISPLAY_LOADING });
      const result = await quanLyRapService.layThongTinLichChieuPhim(maPhim);
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        dispatch({
          type: SET_THONG_TIN_LICH_CHIEU_PHIM,
          payload: result.data.content,
        });
      }
    } catch (error) {
      console.log("Error lay thong tin lich chieu phim: ", error);
    } finally {
      await dispatch({ type: HIDE_LOADING });
    }
  };
};

export const layThongTinLichChieuPhimBookingBarAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.layThongTinLichChieuPhim(maPhim);
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        dispatch({
          type: SET_THONG_TIN_LICH_CHIEU_PHIM_BOOKING_BAR,
          payload: result.data.content,
        });
      }
    } catch (error) {
      console.log("Error lay thong tin lich chieu phim: ", error);
    }
  };
};

export const layThongTinHeThongRapAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.layThongTinHeThongRap();
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        dispatch({
          type: SET_THONG_TIN_HE_THONG_RAP,
          payload: result.data.content,
        });
      }
    } catch (error) {
      console.log("Error lay thong tin he thong rap: ", error);
    }
  };
};

export const layThongTinCumRapTheoHeThongAction = (maHeThongRap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.layThongTinCumRapTheoHeThong(
        maHeThongRap
      );
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        dispatch({
          type: SET_THONG_TIN_CUM_RAP_THEO_HE_THONG,
          payload: result.data.content,
        });
      }
    } catch (error) {
      console.log("Error lay thong tin cum rap theo he thong: ", error);
    }
  };
};
