import React, { Fragment, useState } from "react";
import { Tag } from "antd";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { datVeAction } from "../../redux/actions/QuanLyDatVeActions";
import { CLOSE_DRAWER } from "../../redux/types/DrawerTypes";
import { USER_LOGIN } from "../../util/settings/settings";

const thongTinNguoiDungLocal = JSON.parse(localStorage.getItem(USER_LOGIN));
export default function CheckOutDrawer(props) {
  const dispatch = useDispatch();
  const [thanhToan, setThanhToan] = useState("chuyenKhoan");
  const {
    danhSachPhongVe,
    danhSachVeChon,
    maLichChieu,
    clockRef,
    xoaGheDaChon,
  } = props;
  const handleChange = (e) => {
    const { value } = e.target;
    setThanhToan(value);
  };
  const handleDatVe = () => {
    clockRef.current.pause();
    dispatch(
      datVeAction({
        thongTinPhim: danhSachPhongVe.thongTinPhim,
        maLichChieu,
        danhSachVe: danhSachVeChon,
      })
    );
    dispatch({ type: CLOSE_DRAWER });
    xoaGheDaChon();
    setThanhToan("chuyenKhoan");
  };
  return (
    <div id="checkOut" className={`h-full flex flex-col gap-4 pb-4`}>
      <Fragment>
        <div>
          <p className="text-center text-3xl">
            {danhSachVeChon
              .reduce((tongTien, gheDangChon) => {
                return (tongTien += gheDangChon.giaVe);
              }, 0)
              .toLocaleString()}{" "}
            vnđ
          </p>
        </div>
        <div className="flex flex-col gap-4 flex-grow overflow-y-auto">
          {/* Booking Info */}
          <div className="flex justify-between">
            <p className="text-orange-300">Phim</p>
            <p>{danhSachPhongVe.thongTinPhim.tenPhim}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-orange-300">Ngày chiếu giờ chiếu</p>
            <p>
              {danhSachPhongVe.thongTinPhim.ngayChieu} -{" "}
              <span className="text-orange-500">
                {" "}
                {danhSachPhongVe.thongTinPhim.gioChieu}{" "}
              </span>
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-orange-300">Rạp</p>
            <p> {danhSachPhongVe.thongTinPhim.tenRap} </p>
          </div>
          <div className="flex justify-between gap-4">
            <p className="text-orange-300 w-1/4">Ghế chọn</p>
            <div className="w-3/4">
              {_.sortBy(danhSachVeChon, [
                function (gheItem) {
                  return gheItem.maGhe;
                },
              ]).map((gheDangChon, index) => {
                return (
                  <Tag color="orange" key={index}>
                    {gheDangChon?.tenGhe}
                  </Tag>
                );
              })}
            </div>
          </div>
          <hr />
          {/* Personal Info */}
          <div>
            <p className="text-orange-300">Thông tin cá nhân</p>
            <div className="mt-2 flex flex-col gap-2">
              <div>
                <p>Email</p>
                <input
                  type="email"
                  readOnly
                  value={thongTinNguoiDungLocal?.email}
                  className="border-none outline-none bg-transparent text-gray-400"
                />
              </div>
              <div>
                <p>Số điện thoại</p>
                <input
                  type="text"
                  readOnly
                  value={thongTinNguoiDungLocal?.soDT}
                  className="border-none outline-none bg-transparent text-gray-400"
                />
              </div>
            </div>
          </div>
          <hr />
          {/* Payment method */}
          <div>
            <p className="text-orange-300 mb-2"> Hình thức thanh toán</p>
            <div>
              <div className="flex items-center mb-4">
                <input
                  id="chuyenKhoan"
                  type="radio"
                  name="thanhToan"
                  defaultValue="chuyenKhoan"
                  className="w-5 h-5 border-gray-300 cursor-pointer"
                  onChange={handleChange}
                  defaultChecked
                />
                <label
                  htmlFor="chuyenKhoan"
                  className="block ms-2 text-md text-white dark:text-gray-300 cursor-pointer"
                >
                  Chuyển khoản ngân hàng
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="tienMat"
                  type="radio"
                  name="thanhToan"
                  onChange={handleChange}
                  defaultValue="tienMat"
                  className="w-5 h-5 border-gray-300 cursor-pointer"
                />
                <label
                  htmlFor="tienMat"
                  className="block ms-2 text-md text-white dark:text-gray-300 cursor-pointer"
                >
                  Tiền mặt
                </label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            className={`btn ${
              danhSachVeChon.length > 0 && thanhToan
                ? "btn-muaVe"
                : "btn-disabled"
            } block w-full py-2`}
            disabled={danhSachVeChon.length === 0 || !thanhToan}
            onClick={() => handleDatVe()}
          >
            ĐẶT VÉ
          </button>
        </div>
      </Fragment>
    </div>
  );
}
