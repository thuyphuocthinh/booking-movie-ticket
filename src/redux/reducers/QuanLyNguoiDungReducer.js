import { ThongTinTaiKhoan } from "../../_core/QuanLyNguoiDung/ThongTinTaiKhoan";
import { USER_LOGIN } from "../../util/settings/settings";
import {
  DANG_NHAP,
  SET_DANH_SACH_LOAI_NGUOI_DUNG,
  SET_DANH_SACH_NGUOI_DUNG,
  SET_THONG_TIN_NGUOI_DUNG,
  SET_THONG_TIN_NGUOI_DUNG_TIM_KIEM,
  SET_THONG_TIN_TAI_KHOAN,
} from "../types/QuanLyNguoiDungTypes";

let thongTinNguoiDungLocal = {};
if (localStorage.getItem(USER_LOGIN)) {
  thongTinNguoiDungLocal = JSON.parse(localStorage.getItem(USER_LOGIN));
} else {
  thongTinNguoiDungLocal = undefined;
}
const intialState = {
  thongTinNguoiDung: thongTinNguoiDungLocal,
  thongTinNguoiDungTimKiem: {},
  thongTinTaiKhoan: new ThongTinTaiKhoan(),
  danhSachNguoiDung: [],
  danhSachLoaiNguoiDung: [],
};

export const QuanLyNguoiDungReducer = (state = intialState, action) => {
  switch (action.type) {
    case DANG_NHAP: {
      return {
        ...state,
        thongTinNguoiDung: action.payload,
      };
    }
    case SET_THONG_TIN_NGUOI_DUNG_TIM_KIEM: {
      return {
        ...state,
        thongTinNguoiDungTimKiem: action.payload,
      };
    }
    case SET_THONG_TIN_TAI_KHOAN: {
      return {
        ...state,
        thongTinTaiKhoan: action.payload,
      };
    }
    case SET_THONG_TIN_NGUOI_DUNG: {
      return {
        ...state,
        thongTinNguoiDung: action.payload,
      };
    }
    case SET_DANH_SACH_NGUOI_DUNG: {
      return {
        ...state,
        danhSachNguoiDung: action.payload,
      };
    }
    case SET_DANH_SACH_LOAI_NGUOI_DUNG: {
      return {
        ...state,
        danhSachLoaiNguoiDung: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
