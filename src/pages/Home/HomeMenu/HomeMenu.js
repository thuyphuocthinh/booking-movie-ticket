import React, { Fragment } from "react";
import { Tabs, Tag, Collapse } from "antd";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";
const { TabPane } = Tabs;

export default function HomeMenu(props) {
  const { lichChieuTheoHeThongRap } = props;
  const renderCollapse = (heThongRap) => {
    return heThongRap.lstCumRap?.map((cumRap, index) => {
      return {
        key: index,
        label: (
          <div className="flex items-center text-white gap-2">
            <img
              src={heThongRap?.logo}
              alt={heThongRap?.logo}
              className="rounded-full w-9 md:w-12"
            />
            <div className="text-left ">
              <p className="font-bold">{cumRap.tenCumRap}</p>
              <p style={{ fontSize: "12px" }}>{cumRap.diaChi}</p>
            </div>
          </div>
        ),
        children: cumRap.danhSachPhim?.map((phim, index) => {
          return (
            <div
              key={index}
              className="flex gap-4 py-2 px-2 border-solid border-b-2 border-gray-700"
            >
              <div style={{ width: "100px" }}>
                <img
                  src={phim.hinhAnh}
                  alt={phim.hinhAnh}
                  className="w-full"
                  style={{ height: "150px", width: "100%" }}
                />
              </div>
              <div className="w-5/6">
                <h3 className="text-orange-400 text-left font-bold text-md mb-2">
                  {phim.tenPhim}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {phim.lstLichChieuTheoPhim
                    ?.slice(1, 8)
                    .map((lichChieuTungPhim, index) => {
                      return (
                        <span key={index} className="text-white">
                          <Tag color="orange">
                            <NavLink
                              to={`/checkout/${lichChieuTungPhim.maLichChieu}`}
                            >
                              {dayjs(
                                lichChieuTungPhim.ngayChieuGioChieu
                              ).format("hh:mm A")}
                              -
                              {dayjs(
                                lichChieuTungPhim.ngayChieuGioChieu
                              ).format("DD/MM/YYYY")}
                            </NavLink>
                          </Tag>
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
          );
        }),
      };
    });
  };
  const renderLichChieuHeThongRapDesktop = () => {
    return lichChieuTheoHeThongRap.map((heThongRap, index) => {
      return (
        <Fragment key={index}>
          <TabPane
            tab={
              <img
                src={heThongRap?.logo}
                alt={heThongRap?.logo}
                className="rounded-full"
                width={50}
              />
            }
            key={index + 1}
          >
            <Tabs defaultActiveKey="1" tabPosition="left">
              {heThongRap.lstCumRap?.map((cumRap, index) => {
                return (
                  <TabPane
                    tab={
                      <div className="flex items-center text-white gap-2">
                        <img
                          src={heThongRap?.logo}
                          alt={heThongRap?.logo}
                          className="rounded-full"
                          width={50}
                        />
                        <div className="text-left ">
                          <p className="font-bold ">
                            {" "}
                            {cumRap.tenCumRap.trim().length > 30
                              ? cumRap.tenCumRap.trim().slice(0, 30) + "..."
                              : cumRap.tenCumRap}{" "}
                          </p>
                          <p style={{ fontSize: "12px" }}>
                            {" "}
                            {cumRap.diaChi.trim().length > 30
                              ? cumRap.diaChi.trim().slice(0, 30) + "..."
                              : cumRap.diaChi}{" "}
                          </p>
                        </div>
                      </div>
                    }
                    key={index + 1}
                  >
                    {cumRap.danhSachPhim?.map((phim, index) => {
                      return (
                        <div
                          key={index}
                          className="flex gap-4 py-2 px-2 border-solid border-b-2 border-gray-800"
                        >
                          <div style={{ width: "100px" }}>
                            <img
                              src={phim.hinhAnh}
                              alt={phim.hinhAnh}
                              className="w-full"
                              style={{ height: "150px", width: "100%" }}
                            />
                          </div>
                          <div className="w-5/6">
                            <h3 className="text-orange-400 font-bold text-md mb-2">
                              {phim.tenPhim}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {phim.lstLichChieuTheoPhim
                                ?.slice(1, 8)
                                .map((lichChieuTungPhim, index) => {
                                  return (
                                    <span key={index} className="text-white">
                                      <Tag color="orange">
                                        <NavLink
                                          to={`/checkout/${lichChieuTungPhim.maLichChieu}`}
                                        >
                                          {dayjs(
                                            lichChieuTungPhim.ngayChieuGioChieu
                                          ).format("hh:mm A")}
                                          -
                                          {dayjs(
                                            lichChieuTungPhim.ngayChieuGioChieu
                                          ).format("DD/MM/YYYY")}
                                        </NavLink>
                                      </Tag>
                                    </span>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </TabPane>
                );
              })}
            </Tabs>
          </TabPane>
        </Fragment>
      );
    });
  };
  const renderLichChieuHeThongRapMobile = () => {
    return lichChieuTheoHeThongRap.map((heThongRap, index) => {
      return (
        <Fragment key={index}>
          <TabPane
            tab={
              <img
                src={heThongRap?.logo}
                alt={heThongRap?.logo}
                className="rounded-full w-9 md:w-12"
                width={50}
              />
            }
            style={{ textAlign: "center" }}
            key={index + 1}
          >
            <Collapse
              bordered={false}
              accordion
              items={renderCollapse(heThongRap)}
              className="flex flex-col"
              style={{ border: "none" }}
            />
          </TabPane>
        </Fragment>
      );
    });
  };
  return (
    <Fragment>
      <div
        className="lg:block hidden"
        style={{ height: "500px", overflowY: "auto" }}
      >
        <Tabs defaultActiveKey="1" tabPosition="left">
          {renderLichChieuHeThongRapDesktop()}
        </Tabs>
      </div>
      <div className="block lg:hidden">
        <Tabs centered defaultActiveKey="1" tabPosition="top">
          {renderLichChieuHeThongRapMobile()}
        </Tabs>
      </div>
    </Fragment>
  );
}
