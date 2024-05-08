import React, { Fragment, useState } from "react";
import { Tag } from "antd";
import CheckOutStyle from "./CheckOut.module.css";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { datVeAction } from "../../redux/actions/QuanLyDatVeActions";

export default function CheckOutSideBar(props) {
  const dispatch = useDispatch();
  const [thanhToan, setThanhToan] = useState("chuyenKhoan");
  const {
    danhSachPhongVe,
    danhSachVeChon,
    thongTinNguoiDungLocal,
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
    xoaGheDaChon();
    dispatch(
      datVeAction({
        thongTinPhim: danhSachPhongVe.thongTinPhim,
        maLichChieu,
        danhSachVe: danhSachVeChon,
      })
    );
    setThanhToan("chuyenKhoan");
  };
  return (
    <div
      id="checkOut"
      className={`${CheckOutStyle.checkOutWidth} px-4 flex flex-col gap-4 fixed right-0 bottom-0 top-16 pb-4 bg-gray-800`}
    >
      <Fragment>
        <div>
          <p className="pt-6 text-center text-3xl">
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
          {/* Personal Info */}
          <hr />
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
              <form>
                <div className="flex items-center mb-4">
                  <input
                    id="chuyenKhoan"
                    type="radio"
                    name="thanhToan"
                    value="chuyenKhoan"
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
                    value="tienMat"
                    className="w-5 h-5 border-gray-300 cursor-pointer"
                  />
                  <label
                    htmlFor="tienMat"
                    className="block ms-2 text-md text-white dark:text-gray-300 cursor-pointer"
                  >
                    Tiền mặt
                  </label>
                </div>
              </form>
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
