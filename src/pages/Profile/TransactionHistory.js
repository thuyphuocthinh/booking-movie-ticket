import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinTaiKhoanAction } from "../../redux/actions/QuanLyNguoiDungActions";
import { Table, Tag } from "antd";
import dayjs from "dayjs";

export default function TransactionHistory() {
  const dispatch = useDispatch();
  const { thongTinTaiKhoan } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  useEffect(() => {
    dispatch(layThongTinTaiKhoanAction());
  }, []);

  const columns = [
    {
      title: "Mã vé",
      dataIndex: "maVe",
      key: "maVe",
      width: 100,
      fixed: "left",
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
      width: 200,
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text, record, index) => {
        return <img key={index} src={record.hinhAnh} width={100} />;
      },
    },
    {
      title: "Ngày đặt",
      dataIndex: "ngayDat",
      key: "ngayDat",
      render: (text, record, index) => {
        return (
          <p key={index}>
            {" "}
            {dayjs(record.ngayDat).format("DD/MM/YYYY")} -{" "}
            {dayjs(record.ngayDat).format("hh:mm")}{" "}
          </p>
        );
      },
    },
    {
      title: "Ghế",
      dataIndex: "danhSachGhe",
      key: "danhSachGhe",
      render: (text, record, index) => {
        return record.danhSachGhe?.map((ghe, index) => {
          return (
            <Tag key={index} color="orange">
              {" "}
              {ghe.tenGhe}{" "}
            </Tag>
          );
        });
      },
    },
    {
      title: "Rạp",
      dataIndex: "tenHeThongRap",
      key: "tenHeThongRap",
      render: (text, record, index) => {
        return (
          <Tag color="green" key={index}>
            {record.danhSachGhe[0].tenHeThongRap}
          </Tag>
        );
      },
    },
  ];
  return (
    <div
      style={{ maxWidth: "1200px", width: "100%" }}
      className="mx-auto mt-4 rounded-md bg-white"
    >
      <Table
        className="w-full"
        columns={columns}
        dataSource={thongTinTaiKhoan?.thongTinDatVe}
        bordered={false}
        scroll={{
          x: 1300,
        }}
      />
    </div>
  );
}
