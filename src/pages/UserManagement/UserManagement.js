import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungActions";
import { Input, Table, Tag } from "antd";
const { Search } = Input;

export default function UserManagement() {
  const dispatch = useDispatch();
  const { danhSachNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  useEffect(() => {
    dispatch(layDanhSachNguoiDungAction());
  }, []);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      ellipsis: false,
      render: (text, record, index) => {
        return <span key={index}>{index + 1}</span>;
      },
      width: 100,
      fixed: "left",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
      sorter: (item1, item2) => {
        let hoTen1 = item1.hoTen.trim().toLowerCase();
        let hoTen2 = item2.hoTen.trim().toLowerCase();
        return hoTen2 < hoTen1 ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "hoTen" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (item1, item2) => {
        let email1 = item1.email.trim().toLowerCase();
        let email2 = item2.email.trim().toLowerCase();
        return email2 < email1 ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      key: "soDt",
      ellipsis: true,
    },
    {
      title: "Vai trò",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      render: (text, record, index) => {
        return (
          <Tag key={index} color="orange">
            {record.maLoaiNguoiDung}
          </Tag>
        );
      },
      sorter: (item1, item2) => {
        let vaiTro1 = item1.maLoaiNguoiDung.trim().toLowerCase();
        let vaiTro2 = item2.maLoaiNguoiDung.trim().toLowerCase();
        return vaiTro2 < vaiTro1 ? -1 : 1;
      },
      sortOrder:
        sortedInfo.columnKey === "maLoaiNguoiDung" ? sortedInfo.order : null,
      width: 200,
    },
  ];

  const onSearch = (value, _e, info) => {
    console.log(value);
    dispatch(layDanhSachNguoiDungAction(value));
  };

  const onSearchChange = (e) => {
    const { value } = e.target;
    if (value === "") {
      dispatch(layDanhSachNguoiDungAction());
    }
  };

  return (
    <div>
      <h2 className="text-center text-xl font-bold">Quản lý người dùng</h2>
      <div className="my-4">
        <Search
          placeholder="Tìm kiếm người dùng"
          allowClear
          onSearch={onSearch}
          onChange={onSearchChange}
          enterButton
        />
      </div>
      <div className="mt-6">
        <Table
          columns={columns}
          dataSource={danhSachNguoiDung}
          onChange={handleChange}
          scroll={{
            x: 1300,
          }}
        />
      </div>
    </div>
  );
}
