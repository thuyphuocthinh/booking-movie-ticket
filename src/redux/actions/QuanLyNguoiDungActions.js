import { toast } from "react-toastify";
import { history } from "../../App";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import {
  STATUS_CODE,
  USER_LOGIN,
  USER_TOKEN,
} from "../../util/settings/settings";
import { DISPLAY_LOADING, HIDE_LOADING } from "../types/LoadingTypes";
import {
  DANG_NHAP,
  SET_DANH_SACH_LOAI_NGUOI_DUNG,
  SET_DANH_SACH_NGUOI_DUNG,
  SET_THONG_TIN_NGUOI_DUNG_TIM_KIEM,
  SET_THONG_TIN_TAI_KHOAN,
} from "../types/QuanLyNguoiDungTypes";
import _ from "lodash";

export const dangNhapAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        dispatch({ type: DISPLAY_LOADING });
        dispatch({
          type: DANG_NHAP,
          payload: result.data.content,
        });
        const { accessToken } = result.data.content;
        localStorage.setItem(USER_LOGIN, JSON.stringify(result.data.content));
        localStorage.setItem(USER_TOKEN, accessToken);

        const locationState = history.location.state?.checkout;
        const prevPath = history.location.state?.from;
        if (locationState === "checkout") {
          history.push(prevPath);
        } else {
          history.push("/home");
        }
        toast.success("Login successfully", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.log("Error dang nhap: ", error);
      toast.error(error.response?.data.content, {
        position: "top-right",
      });
    } finally {
      dispatch({ type: HIDE_LOADING });
    }
  };
};

export const dangKyAction = (thongTinDangKy) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        toast.success(
          "Signup successfully! Please log in to access our website",
          { position: "top-right" }
        );
        history.push("/login");
      }
    } catch (error) {
      console.log("Error dang ky: ", error);
      toast.error(error.response?.data.content, { position: "top-right" });
    }
  };
};

export const timKiemNguoiDungAction = (email, taiKhoan) => {
  console.log(email, taiKhoan);
  return async (dispatch) => {
    try {
      dispatch({ type: DISPLAY_LOADING });
      const result = await quanLyNguoiDungService.timKiemNguoiDung(taiKhoan);
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        const timKiemTheoEmail = await _.find(
          result.data.content,
          function (nguoiDung) {
            return nguoiDung.email === email;
          }
        );
        await dispatch({
          type: SET_THONG_TIN_NGUOI_DUNG_TIM_KIEM,
          payload: timKiemTheoEmail,
        });
      }
    } catch (error) {
      console.log("Error tim kiem nguoi dung theo ten: ", error);
    } finally {
      dispatch({ type: HIDE_LOADING });
    }
  };
};

export const capNhatThongTinNguoiDungAction = (thongTinCapNhat) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(
        thongTinCapNhat
      );
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        const { content } = result.data;
        const capNhatLocal = {
          taiKhoan: content.taiKhoan,
          email: content.email,
          soDT: content.soDT,
          hoTen: content.hoTen,
          maLoaiNguoiDung: content.maLoaiNguoiDung,
          maNhom: content.maNhom,
        };
        dispatch({
          type: SET_THONG_TIN_NGUOI_DUNG_TIM_KIEM,
          payload: {
            ...content,
            soDt: content.soDT,
          },
        });
        localStorage.removeItem(USER_LOGIN);
        localStorage.setItem(USER_LOGIN, JSON.stringify(capNhatLocal));
        toast.success("Updated profile successfully");
      }
    } catch (error) {
      console.log("Error cap nhat thong tin nguoi dung: ", error);
      toast.success(error.response?.data.content);
    }
  };
};

export const layThongTinTaiKhoanAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.thongTinTaiKhoan();
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        dispatch({
          type: SET_THONG_TIN_TAI_KHOAN,
          payload: result.data.content,
        });
      }
    } catch (error) {
      console.log("Error lay thong tin tai khoan: ", error);
    }
  };
};

export const layDanhSachNguoiDungAction = (tuKhoa = "") => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layDanhSachNguoiDung(tuKhoa);
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        dispatch({
          type: SET_DANH_SACH_NGUOI_DUNG,
          payload: result.data.content,
        });
      }
    } catch (error) {
      console.log("Error lay danh sach nguoi dung: ", error);
    }
  };
};

export const layDanhSachLoaiNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layDanhSachLoaiNguoiDung();
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        dispatch({
          type: SET_DANH_SACH_LOAI_NGUOI_DUNG,
          payload: result.data.content,
        });
      }
    } catch (error) {
      console.log("Error lay danh sach loai nguoi dung: ", error);
    }
  };
};

export const themNguoiDungAction = (thongTinNguoiDung) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.themNguoiDung(
        thongTinNguoiDung
      );
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        toast.success("Thêm người dùng thành công");
        layDanhSachNguoiDungAction();
      }
    } catch (error) {
      console.log("Error them nguoi dung: ", error);
      toast.error(error.response?.data.content);
    }
  };
};
