import { toast } from "react-toastify";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { STATUS_CODE } from "../../util/settings/settings";
import { DISPLAY_LOADING, HIDE_LOADING } from "../types/LoadingTypes";
import {
  SET_DANH_SACH_BANNER,
  SET_DANH_SACH_PHIM,
  SET_THONG_TIN_PHIM_THEO_MA_PHIM,
} from "../types/QuanLyPhimTypes";

export const layDanhSachBannerAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layDanhSachBanner();
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        dispatch({
          type: SET_DANH_SACH_BANNER,
          payload: result.data.content,
        });
      }
    } catch (error) {
      console.log("Error lay danh sach banner: ", error);
    }
  };
};

export const layDanhSachPhimAction = (tenPhim = "") => {
  return async (dispatch) => {
    try {
      // dispatch({ type: DISPLAY_LOADING });
      const result = await quanLyPhimService.layDanhSachPhim(tenPhim);
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        dispatch({
          type: SET_DANH_SACH_PHIM,
          payload: result.data.content,
        });
      }
    } catch (error) {
      console.log("Error lay danh sach phim: ", error);
    } finally {
      // await dispatch({ type: HIDE_LOADING });
    }
  };
};

export const xoaPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.xoaPhim(maPhim);
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        toast.success("Xóa phim thành công");
        layDanhSachPhimAction();
      }
    } catch (error) {
      console.log("Error xoa phim: ", error);
      toast.error(error.response?.data.content);
    }
  };
};

export const themPhimUploadHinhAction = (thongTinPhim) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.themPhimUploadHinh(thongTinPhim);
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        toast.success("Thêm phim thành công");
        layDanhSachPhimAction();
      }
    } catch (error) {
      console.log("Error them phim upload hinh: ", error);
      toast.error(error.response?.data.content);
    }
  };
};

export const layThongTinPhimTheoMaPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layThongTinPhim(maPhim);
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        dispatch({
          type: SET_THONG_TIN_PHIM_THEO_MA_PHIM,
          payload: result.data.content,
        });
      }
    } catch (error) {
      console.log("Error lay thong tin phim theo ma phim: ", error);
    }
  };
};

export const capNhatPhimUploadAction = (thongTinPhimCapNhat) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.capNhatPhimUpload(
        thongTinPhimCapNhat
      );
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        toast.success("Cập nhật thành công");
        layDanhSachPhimAction();
      }
    } catch (error) {
      console.log("Error cap nhat thong tin phim: ", error);
      toast.error(error.response?.data.message);
    }
  };
};
