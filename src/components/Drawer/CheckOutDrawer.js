import React, { Fragment, useState } from "react";
import { Tag } from "antd";
import CheckOutStyle from "../../pages/CheckOut/CheckOut.module.css";

import _ from "lodash";
import { useDispatch } from "react-redux";
import { datVeAction } from "../../redux/actions/QuanLyDatVeActions";
import { CLOSE_DRAWER } from "../../redux/types/DrawerTypes";

export default function CheckOutDrawer(props) {
  const dispatch = useDispatch();
  const [thanhToan, setThanhToan] = useState("thanhToan");
  const {
    danhSachPhongVe,
    danhSachVeChon,
    thongTinNguoiDungLocal,
    maLichChieu,
    clockRef,
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
          <div>
            <p className="text-orange-300">Thông tin cá nhân</p>
            <div className="mt-2 flex flex-col gap-2">
              <div>
                <p>Email</p>
                <input
                  type="email"
                  readOnly
                  value={thongTinNguoiDungLocal.email}
                  className="border-none outline-none bg-transparent text-gray-400"
                />
              </div>
              <div>
                <p>Số điện thoại</p>
                <input
                  type="text"
                  readOnly
                  value={thongTinNguoiDungLocal.soDT}
                  className="border-none outline-none bg-transparent text-gray-400"
                />
              </div>
            </div>
          </div>
          <hr />
          <div>
            <p className="text-orange-300 mb-2"> Hình thức thanh toán</p>
            <div>
              <div class="inline-flex items-center">
                <label
                  class="relative flex items-center px-3 py-2 rounded-full cursor-pointer"
                  htmlFor="amber"
                >
                  <input
                    name="hinhThucThanhToan"
                    value="chuyenKhoan"
                    type="radio"
                    class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-amber-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-amber-500 checked:before:bg-amber-500 hover:before:opacity-10"
                    id="amber"
                    defaultChecked
                    onChange={handleChange}
                  />
                  <span class="absolute transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-amber-500 peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                    </svg>
                  </span>
                </label>
                <span> Chuyển khoản ngân hàng</span>
              </div>
              <div class="inline-flex items-center">
                <label
                  class="relative flex items-center px-3 py-2 rounded-full cursor-pointer"
                  htmlFor="amber"
                >
                  <input
                    name="hinhThucThanhToan"
                    value="tienMat"
                    type="radio"
                    class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-amber-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-amber-500 checked:before:bg-amber-500 hover:before:opacity-10"
                    id="amber"
                    onChange={handleChange}
                  />
                  <span class="absolute transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-amber-500 peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                    </svg>
                  </span>
                </label>
                <span> Chuyển tiền mặt tại quầy nhận vé </span>
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
            disabled={danhSachVeChon.length === 0 && !thanhToan}
            onClick={() => handleDatVe()}
          >
            ĐẶT VÉ
          </button>
        </div>
      </Fragment>
    </div>
  );
}
