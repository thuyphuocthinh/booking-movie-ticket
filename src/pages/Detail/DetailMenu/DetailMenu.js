import React, { Fragment } from "react";
import { Collapse, Tabs, Tag } from "antd";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";
const { TabPane } = Tabs;

export default function DetailMenu(props) {
  const { thongTinLichChieuPhim } = props;
  const renderCollapse = (heThongRap) => {
    return heThongRap.cumRapChieu?.map((cumRap, index) => {
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
        children: cumRap.lichChieuPhim?.map((lichChieu, index) => {
          return (
            <div key={index} className="flex gap-4 py-2 px-2">
              <div style={{ width: "100px" }}>
                <img
                  src={thongTinLichChieuPhim?.hinhAnh}
                  alt={thongTinLichChieuPhim?.hinhAnh}
                  className="w-full"
                  style={{ height: "150px", width: "100%" }}
                />
              </div>
              <div className="w-5/6">
                <h3 className="text-orange-400 font-bold text-md mb-2 text-left">
                  {thongTinLichChieuPhim?.tenPhim}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {
                    <span key={index} className="text-white">
                      <Tag color="orange">
                        <NavLink to={`/checkout/${lichChieu.maLichChieu}`}>
                          {" "}
                          {dayjs(lichChieu.ngayChieuGioChieu).format("hh:mm A")}
                          -
                          {dayjs(lichChieu.ngayChieuGioChieu).format(
                            "DD/MM/YYYY"
                          )}
                        </NavLink>
                      </Tag>
                    </span>
                  }
                </div>
              </div>
            </div>
          );
        }),
      };
    });
  };
  const renderLichChieuPhimDesktop = () => {
    return (
      <Fragment>
        {thongTinLichChieuPhim.heThongRapChieu?.map((heThongRap, index) => {
          return (
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
                {heThongRap.cumRapChieu?.map((cumRap, index) => {
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
                            <p className="font-bold">
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
                      {cumRap.lichChieuPhim?.map((lichChieu, index) => {
                        return (
                          <div key={index} className="flex gap-4 py-2 px-2">
                            <div style={{ width: "100px" }}>
                              <img
                                src={thongTinLichChieuPhim?.hinhAnh}
                                alt={thongTinLichChieuPhim?.hinhAnh}
                                className="w-full"
                                style={{ height: "150px", width: "100%" }}
                              />
                            </div>
                            <div className="w-5/6">
                              <h3 className="text-orange-400 font-bold text-md mb-2">
                                {thongTinLichChieuPhim?.tenPhim}
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {
                                  <span key={index} className="text-white">
                                    <Tag color="orange">
                                      <NavLink
                                        to={`/checkout/${lichChieu.maLichChieu}`}
                                      >
                                        {" "}
                                        {dayjs(
                                          lichChieu.ngayChieuGioChieu
                                        ).format("hh:mm A")}
                                        -
                                        {dayjs(
                                          lichChieu.ngayChieuGioChieu
                                        ).format("DD/MM/YYYY")}
                                      </NavLink>
                                    </Tag>
                                  </span>
                                }
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
          );
        })}
      </Fragment>
    );
  };
  const renderLichChieuPhimMobile = () => {
    return thongTinLichChieuPhim.heThongRapChieu?.map((heThongRap, index) => {
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
      <div className="lg:block hidden">
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Lịch chiếu" key={1}>
            {thongTinLichChieuPhim.heThongRapChieu?.length > 0 ? (
              <Tabs defaultActiveKey="1" tabPosition="left">
                {renderLichChieuPhimDesktop()}
              </Tabs>
            ) : (
              <p className="text-center text-white">
                Hiện không có suất chiếu nào.
              </p>
            )}
          </TabPane>
          <TabPane tab="Thông tin" key={2}>
            <div className="flex flex-row gap-5">
              <div>
                <img
                  src={thongTinLichChieuPhim?.hinhAnh}
                  alt={thongTinLichChieuPhim?.hinhAnh}
                  width={500}
                />
              </div>
              <p className="text-white text-justify">
                {thongTinLichChieuPhim?.moTa}
              </p>
            </div>
          </TabPane>
        </Tabs>
      </div>
      <div className="block lg:hidden">
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Lịch chiếu" key={1}>
            <Tabs defaultActiveKey="1" tabPosition="top" centered>
              {thongTinLichChieuPhim.heThongRapChieu?.length > 0 ? (
                renderLichChieuPhimMobile()
              ) : (
                <p className="text-center text-white">
                  Hiện không có suất chiếu nào.
                </p>
              )}
            </Tabs>
          </TabPane>
          <TabPane tab="Thông tin" key={2}>
            <div className="flex flex-col items-center gap-5">
              <div>
                <img
                  src={thongTinLichChieuPhim?.hinhAnh}
                  alt={thongTinLichChieuPhim?.hinhAnh}
                  width={300}
                />
              </div>
              <p className="text-white text-justify">
                {thongTinLichChieuPhim?.moTa}
              </p>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Fragment>
  );
}
