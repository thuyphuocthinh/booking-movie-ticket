import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Table, Tag } from "antd";
import {
  layThongTinCumRapTheoHeThongAction,
  layThongTinHeThongRapAction,
} from "../../redux/actions/QuanLyRapActions";
import { Fragment } from "react";
const { Search } = Input;

export default function CinemaManagement(props) {
  const dispatch = useDispatch();
  const { thongTinCumRapTheoHeThong } = useSelector(
    (state) => state.QuanLyRapReducer
  );
  const [thongTinTungCumRap, setThongTinTungCumRap] = useState([]);
  useEffect(() => {
    dispatch(
      layThongTinCumRapTheoHeThongAction(props.match?.params.maHeThongRap)
    );
  }, []);

  useEffect(() => {
    setThongTinTungCumRap(
      thongTinCumRapTheoHeThong.filter(
        (cumRap) => cumRap.maCumRap === props.match?.params.maCumRap
      )
    );
  }, [thongTinCumRapTheoHeThong]);

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "Mã rạp",
      dataIndex: "maRap",
      key: "maRap",
      ellipsis: false,
      width: 200,
      sorter: (item1, item2) => item2.maRap < item1.maRap,
      sortOrder: sortedInfo.columnKey === "maRap" ? sortedInfo.order : null,
    },
    {
      title: "Tên rạp",
      dataIndex: "tenRap",
      key: "tenRap",
      ellipsis: false,
      width: 200,
      sorter: (item1, item2) => {
        let tenRap1 = item1.tenRap.trim().toLowerCase();
        let tenRap2 = item2.tenRap.trim().toLowerCase();
        return tenRap2 < tenRap1 ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "tenRap" ? sortedInfo.order : null,
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
      <h2 className="text-center text-xl font-bold">Chi tiết cụm rạp </h2>
      <div className="my-4">
        <Search
          placeholder="Tìm kiếm cụm rạp"
          allowClear
          onSearch={onSearch}
          onChange={onSearchChange}
          enterButton
        />
      </div>
      <div className="mt-6">
        <Table
          columns={columns}
          dataSource={thongTinTungCumRap[0]?.danhSachRap}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
