import { toast } from "react-toastify";
import DatVeModal from "../../components/Modal/DatVeModal";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { STATUS_CODE } from "../../util/settings/settings";
import { DISPLAY_LOADING, HIDE_LOADING } from "../types/LoadingTypes";
import { OPEN_MODAL } from "../types/ModalTypes";
import { SET_DANH_SACH_PHONG_VE } from "../types/QuanLyDatVeTypes";
import { layThongTinLichChieuHeThongRapAction } from "./QuanLyRapActions";

export const layDanhSachPhongVeAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DISPLAY_LOADING });
      const result = await quanLyDatVeService.layDanhSachPhongVe(maLichChieu);
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        dispatch({
          type: SET_DANH_SACH_PHONG_VE,
          payload: result.data.content,
        });
      }
    } catch (error) {
      console.log("Error lay danh sach phong ve: ", error);
    } finally {
      dispatch({ type: HIDE_LOADING });
    }
  };
};

export const datVeAction = (thongTinVe) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DISPLAY_LOADING });
      const result = await quanLyDatVeService.datVe(thongTinVe);
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        dispatch({
          type: OPEN_MODAL,
          payload: {
            title: "",
            Component: <DatVeModal thongTinVe={thongTinVe} />,
            maskClosable: false,
            closeIcon: false,
            width: 400,
          },
        });
      }
    } catch (error) {
      console.log("Error dat ve: ", error);
    } finally {
      dispatch({ type: HIDE_LOADING });
    }
  };
};

export const taoLichChieuAction = (thongTinLichChieu) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDatVeService.taoLichChieu(thongTinLichChieu);
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        toast.success("Tạo lịch chiếu thành công");
      }
    } catch (error) {
      console.log("Error tao lich chieu: ", error);
      toast.error(error.response?.data.content);
    }
  };
};
