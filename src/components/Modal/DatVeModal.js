import { Tag } from "antd";
import React from "react";
import { history } from "../../App";
import { useDispatch } from "react-redux";
import { layDanhSachPhongVeAction } from "../../redux/actions/QuanLyDatVeActions";
import { CLOSE_MODAL } from "../../redux/types/ModalTypes";
import { useHistory } from "react-router-dom";
import { SET_COUNTDOWN_KEY } from "../../redux/types/CountdownTypes";

export default function DatVeModal(props) {
  const history = useHistory();

  const dispatch = useDispatch();
  const { thongTinPhim, danhSachVe, maLichChieu } = props.thongTinVe;
  return (
    <div>
      <h1 className="text-center text-2xl pb-4 font-bold text-orange-500">
        Đặt vé thành công
      </h1>
      <div>
        <h2 className="text-xl font-bold pb-4">Thông tin phim</h2>
        <div className="flex gap-4 items-center justify-between">
          <div>
            <img
              width={100}
              src={thongTinPhim?.hinhAnh}
              alt={thongTinPhim?.hinhAnh}
            />
          </div>
          <div className="flex-grow">
            <p>
              {" "}
              <span className="font-bold">Tên phim: </span>{" "}
              {thongTinPhim?.tenPhim}{" "}
            </p>
            <p>
              <span className="font-bold"> Ngày chiếu: </span>{" "}
              {thongTinPhim?.gioChieu} - {thongTinPhim?.ngayChieu}{" "}
            </p>
            <p>
              <span className="font-bold"> Cụm rạp: </span>{" "}
              {thongTinPhim?.tenRap} - {thongTinPhim?.tenCumRap}{" "}
            </p>
            <p>
              <span className="font-bold"> Địa chỉ: </span>
              {thongTinPhim?.diaChi}
            </p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold py-4">Thông tin đặt vé</h2>
        <p>
          <span className="font-bold">Tổng tiền: </span>{" "}
          <span>
            {danhSachVe
              ?.reduce((tongTien, ve) => {
                return (tongTien += ve.giaVe);
              }, 0)
              .toLocaleString()}{" "}
            vnđ
          </span>
        </p>
        <div className="flex gap-4 mt-2">
          <span className="font-bold">Vé</span>
          <span className="flex flex-wrap">
            {danhSachVe?.map((ve, index) => {
              return (
                <Tag color="orange" key={index}>
                  {ve.tenGhe}
                </Tag>
              );
            })}
          </span>
        </div>
        <p>Check email để kiểm tra thông tin đặt vé nhé</p>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          className="btn btn-muaVe text-white px-4 py-1"
          onClick={() => {
            dispatch(layDanhSachPhongVeAction(maLichChieu));
            dispatch({ type: CLOSE_MODAL });
            dispatch({ type: SET_COUNTDOWN_KEY });
          }}
        >
          Tiếp tục đặt vé
        </button>
        <button
          className="btn btn-datVe px-4 py-1"
          onClick={() => {
            history.push("/home");
            dispatch({ type: CLOSE_MODAL });
          }}
        >
          Về trang chủ
        </button>
      </div>
    </div>
  );
}
