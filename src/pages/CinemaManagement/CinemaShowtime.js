import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinLichChieuHeThongRapAction } from "../../redux/actions/QuanLyRapActions";
import { Button, Input, Table, Tag } from "antd";
import dayjs from "dayjs";

export default function CinemaShowtime(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      layThongTinLichChieuHeThongRapAction(props.match?.params.maHeThongRap)
    );
  }, []);
  const { lichChieuTheoHeThongRap } = useSelector(
    (state) => state.QuanLyRapReducer
  );
  const [danhSachPhim, setDanhSachPhim] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  console.log(lichChieuTheoHeThongRap);
  const expandedRowRender = () => {
    const columns = [
      {
        title: "Mã phim",
        dataIndex: "maPhim",
        key: "maPhim",
        ellipsis: true,
        width: 150,
        sorter: (item1, item2) => item2.maPhim < item1.maPhim,
        sortOrder: sortedInfo.columnKey === "maPhim" ? sortedInfo.order : null,
      },
      {
        title: "Hình ảnh",
        dataIndex: "hinhAnh",
        key: "hinhAnh",
        ellipsis: true,
        width: 300,
        render: (text, record, index) => {
          return <img src={record.hinhAnh} key={index} width={100} />;
        },
      },
      {
        title: "Tên phim",
        dataIndex: "tenPhim",
        key: "tenPhim",
        width: 300,
        ellipsis: true,
        sorter: (item1, item2) => {
          let tenPhim1 = item1.tenPhim.trim().toLowerCase();
          let tenPhim2 = item2.tenPhim.trim().toLowerCase();
          return tenPhim2 < tenPhim1 ? -1 : 1;
        },
        sortOrder: sortedInfo.columnKey === "tenPhim" ? sortedInfo.order : null,
      },
      {
        title: "Ngày chiếu giờ chiếu",
        dataIndex: "ngayChieuGioChieu",
        key: "ngayChieuGioChieu",
        render: (text, record, index) => {
          return (
            <Tag color="orange">
              {dayjs(record.ngayChieuGioChieu).format("DD/MM/YYYY hh:mm")}
            </Tag>
          );
        },
      },
    ];
    return (
      <Table
        onChange={handleChange}
        columns={columns}
        dataSource={danhSachPhim}
        pagination={true}
      />
    );
  };
  const columns = [
    {
      title: "Mã cụm rạp",
      dataIndex: "maCumRap",
      key: "maCumRap",
      ellipsis: true,
      width: 250,
      sorter: (item1, item2) => {
        let maCumRap1 = item1.maCumRap.trim().toLowerCase();
        let maCumRap2 = item2.maCumRap.trim().toLowerCase();
        return maCumRap2 < maCumRap1 ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "maCumRap" ? sortedInfo.order : null,
    },
    {
      title: "Tên cụm rạp",
      dataIndex: "tenCumRap",
      key: "tenCumRap",
      ellipsis: true,
      width: 300,
      sorter: (item1, item2) => {
        let tenCumRap1 = item1.tenCumRap.trim().toLowerCase();
        let tenCumRap2 = item2.tenCumRap.trim().toLowerCase();
        return tenCumRap2 < tenCumRap1 ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "tenCumRap" ? sortedInfo.order : null,
    },
    {
      title: "Địa chỉ",
      dataIndex: "diaChi",
      key: "diaChi",
      width: 300,
      ellipsis: true,
      sorter: (item1, item2) => {
        let diaChi1 = item1.diaChi.trim().toLowerCase();
        let diaChi2 = item2.diaChi.trim().toLowerCase();
        return diaChi2 < diaChi1 ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "diaChi" ? sortedInfo.order : null,
    },
  ];
  return (
    <div>
      <h2 className="text-center text-xl font-bold">
        Lịch chiếu hệ thống rạp {lichChieuTheoHeThongRap[0]?.tenHeThongRap}{" "}
      </h2>
      <div className="mt-6">
        <Table
          columns={columns}
          dataSource={lichChieuTheoHeThongRap[0]?.lstCumRap}
          onChange={handleChange}
          rowKey={(record) => record.maCumRap}
          expandable={{
            expandedRowRender: expandedRowRender,
            onExpand: (value, record) => {
              setDanhSachPhim(record.danhSachPhim);
            },
          }}
        />
      </div>
    </div>
  );
}
