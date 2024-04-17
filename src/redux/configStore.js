import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { CLOSE_DRAWER, OPEN_DRAWER } from "./types/DrawerTypes";
import { DrawerReducer } from "./reducers/DrawerReducer";
import { QuanLyPhimReducer } from "./reducers/QuanLyPhimReducer";
import { ModalReducer } from "./reducers/ModalReducer";
import { CLOSE_MODAL, OPEN_MODAL } from "./types/ModalTypes";
import { QuanLyRapReducer } from "./reducers/QuanLyRapReducer";
import { LoadingReducer } from "./reducers/LoadingReducer";
import { QuanLyNguoiDungReducer } from "./reducers/QuanLyNguoiDungReducer";
import { QuanLyDatVeReducer } from "./reducers/QuanLyDatVeReducer";
import { SET_DANH_SACH_PHONG_VE } from "./types/QuanLyDatVeTypes";
import { SET_THONG_TIN_TAI_KHOAN } from "./types/QuanLyNguoiDungTypes";
import { CountdownReducer } from "./reducers/CountdownReducer";
import { SET_THONG_TIN_PHIM_THEO_MA_PHIM } from "./types/QuanLyPhimTypes";

const rootReducer = combineReducers({
  // reducers here
  DrawerReducer,
  QuanLyPhimReducer,
  ModalReducer,
  QuanLyRapReducer,
  LoadingReducer,
  QuanLyNguoiDungReducer,
  QuanLyDatVeReducer,
  CountdownReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          OPEN_DRAWER,
          CLOSE_DRAWER,
          OPEN_MODAL,
          CLOSE_MODAL,
          SET_DANH_SACH_PHONG_VE,
          SET_THONG_TIN_TAI_KHOAN,
          SET_THONG_TIN_PHIM_THEO_MA_PHIM,
        ],
        ignoredPaths: [
          "DrawerReducer.Component",
          "ModalReducer.Component",
          "QuanLyDatVeReducer.danhSachPhongVe",
          "QuanLyNguoiDungReducer.thongTinTaiKhoan",
          "QuanLyPhimReducer.thongTinPhimTheoMaPhim",
        ],
      },
    }).concat(thunk);
  },
});
