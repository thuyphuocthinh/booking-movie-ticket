import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Table, Tag } from "antd";
import {
  layThongTinCumRapTheoHeThongAction,
  layThongTinHeThongRapAction,
} from "../../redux/actions/QuanLyRapActions";
import { Fragment } from "react";
import { history } from "../../App";
const { Search } = Input;

export default function CinemaManagement() {
  const dispatch = useDispatch();
  const [maHeThongRapState, setMaHeThongRapState] = useState("");
  const { thongTinHeThongRap, thongTinCumRapTheoHeThong } = useSelector(
    (state) => state.QuanLyRapReducer
  );

  useEffect(() => {
    dispatch(layThongTinHeThongRapAction());
  }, []);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const expandedRowRender = () => {
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
        sortOrder:
          sortedInfo.columnKey === "maCumRap" ? sortedInfo.order : null,
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
        sortOrder:
          sortedInfo.columnKey === "tenCumRap" ? sortedInfo.order : null,
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
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: 150,
        render: (text, record, index) => {
          return (
            <Button
              className="bg-green-500 text-white"
              key={index}
              type="default"
              onClick={() =>
                history.push(
                  `/admin/cinema/detail/${maHeThongRapState}/${record.maCumRap}`
                )
              }
            >
              Chi tiết
            </Button>
          );
        },
      },
    ];
    return (
      <Table
        onChange={handleChange}
        columns={columns}
        dataSource={thongTinCumRapTheoHeThong}
        pagination={false}
      />
    );
  };

  const columns = [
    {
      title: "Mã hệ thống rạp",
      dataIndex: "maHeThongRap",
      key: "maHeThongRap",
      ellipsis: false,
      width: 200,
      sorter: (item1, item2) => {
        let maHeThongRap1 = item1.maHeThongRap.trim().toLowerCase();
        let maHeThongRap2 = item2.maHeThongRap.trim().toLowerCase();
        return maHeThongRap2 < maHeThongRap1 ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "maHeThongRap" ? sortedInfo.order : null,
      fixed: "left",
    },
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: (text, record, index) => {
        return <img key={index} src={record.logo} width={50} />;
      },
      width: 200,
      ellipsis: true,
    },
    {
      title: "Tên hệ thống rạp",
      dataIndex: "tenHeThongRap",
      key: "tenHeThongRap",
      sorter: (item1, item2) => {
        let tenHeThongRap1 = item1.tenHeThongRap.trim().toLowerCase();
        let tenHeThongRap2 = item2.tenHeThongRap.trim().toLowerCase();
        return tenHeThongRap2 < tenHeThongRap1 ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "tenHeThongRap" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: 200,
      render: (text, record, index) => {
        return (
          <Fragment key={index}>
            <Button
              type="primary"
              onClick={() =>
                history.push(`/admin/cinema/showtime/${record.maHeThongRap}`)
              }
            >
              Xem lịch chiếu
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const onSearch = (value, _e, info) => {
    console.log(value);
    // dispatch(layDanhSachNguoiDungAction(value));
  };

  const onSearchChange = (e) => {
    const { value } = e.target;
    if (value === "") {
      // dispatch(layDanhSachNguoiDungAction());
    }
  };

  return (
    <div>
      <h2 className="text-center text-xl font-bold">Quản lý hệ thống rạp</h2>
      <div className="my-4">
        <Search
          placeholder="Tìm kiếm hệ thống rạp"
          allowClear
          onSearch={onSearch}
          onChange={onSearchChange}
          enterButton
        />
      </div>
      <div className="mt-6">
        <Table
          columns={columns}
          dataSource={thongTinHeThongRap}
          onChange={handleChange}
          rowKey={(record) => record.maHeThongRap}
          expandable={{
            expandedRowRender: expandedRowRender,
            onExpand: (record, event) => {
              setMaHeThongRapState(event.maHeThongRap);
              dispatch(layThongTinCumRapTheoHeThongAction(event.maHeThongRap));
            },
          }}
        />
      </div>
    </div>
  );
}
