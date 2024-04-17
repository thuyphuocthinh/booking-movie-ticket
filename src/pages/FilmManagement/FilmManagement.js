import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  layDanhSachPhimAction,
  xoaPhimAction,
} from "../../redux/actions/QuanLyPhimActions";
import { Button, Table, Input, Popconfirm } from "antd";
import { OPEN_MODAL } from "../../redux/types/ModalTypes";
import TrailerModal from "../../components/Modal/TrailerModal";
import dayjs from "dayjs";
import {NavLink} from "react-router-dom";
const { Search } = Input;

export default function FilmManagement() {
  const dispatch = useDispatch();
  const { danhSachTatCaPhim } = useSelector((state) => state.QuanLyPhimReducer);
  useEffect(() => {
    dispatch(layDanhSachPhimAction());
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
      title: "Mã phim",
      dataIndex: "maPhim",
      key: "maPhim",
      ellipsis: false,
      width: 100,
      sorter: (item1, item2) => Number(item1.maPhim) > Number(item2.maPhim),
      sortOrder: sortedInfo.columnKey === "maPhim" ? sortedInfo.order : null,
      fixed: "left",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      ellipsis: false,
      width: 200,
      render: (text, record, index) => {
        return (
          <img
            src={record.hinhAnh}
            alt={record.hinhAnh}
            key={index}
            width={100}
          />
        );
      },
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
      width: 300,
      sorter: (item1, item2) => {
        let tenPhim1 = item1.tenPhim.trim().toLowerCase();
        let tenPhim2 = item2.tenPhim.trim().toLowerCase();
        return tenPhim2 < tenPhim1 ? -1 : 1;
      },
      sortOrder: sortedInfo.columnKey === "tenPhim" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Trailer",
      dataIndex: "trailer",
      key: "trailer",
      width: 100,
      render: (text, record, index) => {
        return (
          <Button
            key={index}
            type="primary"
            onClick={() => {
              dispatch({
                type: OPEN_MODAL,
                payload: {
                  title: "Trailer",
                  Component: <TrailerModal />,
                  trailerLink: record.trailer,
                  width: 700,
                },
              });
            }}
          >
            Xem
          </Button>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "Actions",
      key: "Actions",
      width: 200,
      render: (text, record, index) => {
        return (
          <div key={index}>
            <Popconfirm
              placement="bottom"
              title={"Xóa phim"}
              description="Bạn có chắc muốn xóa phim này"
              okText="Yes"
              onConfirm={() => {
                dispatch(xoaPhimAction(record.maPhim));
              }}
              cancelText="No"
            >
              <Button type="default" className="bg-red-500 mr-2 text-white">
                Xóa
              </Button>
            </Popconfirm>
            <Button type="default" className="mr-2">
              {" "}
              <NavLink to={`/admin/film/edit/${record.maPhim}/${record.tenPhim}`}>
                Cập nhật
              </NavLink>
            </Button>
          </div>
        );
      },
    },
  ];

  const onSearch = (value, _e, info) => {
    dispatch(layDanhSachPhimAction(value));
  };

  const onSearchChange = (e) => {
    const { value } = e.target;
    if (value === "") {
      dispatch(layDanhSachPhimAction());
    }
  };

  return (
    <div>
      <h2 className="text-center text-xl font-bold">Quản lý phim</h2>
      <div className="my-4">
        <Search
          placeholder="Tìm kiếm phim"
          allowClear
          onSearch={onSearch}
          onChange={onSearchChange}
          enterButton
        />
      </div>
      <div className="mt-6">
        <Table
          columns={columns}
          dataSource={danhSachTatCaPhim}
          onChange={handleChange}
          scroll={{
            x: 1300,
            y: 800,
          }}
          rowKey={(record) => record.maPhim}
          expandable={{
            expandedRowRender: (record) => {
              return (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4">
                    <span
                      className="font-bold w-1/6"
                      style={{ width: "100px" }}
                    >
                      Mô tả:
                    </span>
                    <p className="w-5/6">{record.moTa}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className="font-bold w-1/6"
                      style={{ width: "100px" }}
                    >
                      Đánh giá:{" "}
                    </span>
                    <p className="w-5/6">{record.danhGia}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className="font-bold w-1/6"
                      style={{ width: "100px" }}
                    >
                      Khởi chiếu:
                    </span>
                    <p className="w-5/6">
                      {" "}
                      {dayjs(record.ngayKhoiChieu).format("DD/MM/YYYY")}{" "}
                    </p>
                  </div>
                </div>
              );
            },
          }}
        />
      </div>
    </div>
  );
}
