import React, { useState } from "react";
import { Fragment } from "react";
import { Route } from "react-router-dom";
import {
  DesktopOutlined,
  UserOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Menu, Result, theme } from "antd";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../App";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../redux/types/LoadingTypes";
import { USER_LOGIN, USER_TOKEN } from "../../util/settings/settings";
import { SET_THONG_TIN_NGUOI_DUNG } from "../../redux/types/QuanLyNguoiDungTypes";
import { ToastContainer, toast } from "react-toastify";
import _ from "lodash";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(
    <NavLink to="/admin/statistics">Thống kê</NavLink>,
    "1",
    <PieChartOutlined />
  ),
  getItem("Phim", "2", <DesktopOutlined />, [
    getItem(<NavLink to="/admin/film/management">Danh sách</NavLink>, "3"),
    getItem(<NavLink to="/admin/film/add">Thêm</NavLink>, "4"),
  ]),
  getItem("Users", "5", <UserOutlined />, [
    getItem(<NavLink to="/admin/user/management">Danh sách</NavLink>, "6"),
    getItem(<NavLink to="/admin/user/add">Thêm</NavLink>, "7"),
  ]),
  getItem("Hệ thống rạp", "8", <DesktopOutlined />, [
    getItem(<NavLink to="/admin/cinema/management">Danh sách</NavLink>, "9"),
    getItem(
      <NavLink to="/admin/cinema/createShowtime">Tạo lịch chiếu</NavLink>,
      "10"
    ),
  ]),
];
export default function AdminTemplate(props) {
  // state
  const dispatch = useDispatch();
  const { thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const { Component, ...restParams } = props;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const pathname = _.split(history.location.pathname, "/");

  // methods
  const logout = async () => {
    dispatch({ type: DISPLAY_LOADING });
    if (localStorage.getItem(USER_LOGIN) && localStorage.getItem(USER_TOKEN)) {
      localStorage.removeItem(USER_LOGIN);
      localStorage.removeItem(USER_TOKEN);
      dispatch({ type: HIDE_LOADING });
      toast.success("Logout successfully", {
        position: "top-right",
      });
      dispatch({
        type: SET_THONG_TIN_NGUOI_DUNG,
        payload: null,
      });
      history.push("/home");
    }
  };
  // return
  if (thongTinNguoiDung.maLoaiNguoiDung.toLowerCase() === "quantri") {
    return (
      <Route
        {...restParams}
        render={(propsRoute) => {
          return (
            <Fragment>
              <Layout
                style={{
                  minHeight: "100vh",
                  backgroundColor: "white",
                }}
              >
                <Sider
                  collapsible
                  collapsed={collapsed}
                  onCollapse={(value) => setCollapsed(value)}
                >
                  <div className="demo-logo-vertical py-4 text-center text-white">
                    <NavLink
                      rel="noopener noreferrer"
                      to="/home"
                      aria-label="Back to homepage"
                      className="flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                        className="w-10 h-10 dark:text-violet-600"
                      >
                        <path d="M27.912 7.289l-10.324-5.961c-0.455-0.268-1.002-0.425-1.588-0.425s-1.133 0.158-1.604 0.433l0.015-0.008-10.324 5.961c-0.955 0.561-1.586 1.582-1.588 2.75v11.922c0.002 1.168 0.635 2.189 1.574 2.742l0.016 0.008 10.322 5.961c0.455 0.267 1.004 0.425 1.59 0.425 0.584 0 1.131-0.158 1.602-0.433l-0.014 0.008 10.322-5.961c0.955-0.561 1.586-1.582 1.588-2.75v-11.922c-0.002-1.168-0.633-2.189-1.573-2.742zM27.383 21.961c0 0.389-0.211 0.73-0.526 0.914l-0.004 0.002-10.324 5.961c-0.152 0.088-0.334 0.142-0.53 0.142s-0.377-0.053-0.535-0.145l0.005 0.002-10.324-5.961c-0.319-0.186-0.529-0.527-0.529-0.916v-11.922c0-0.389 0.211-0.73 0.526-0.914l0.004-0.002 10.324-5.961c0.152-0.090 0.334-0.143 0.53-0.143s0.377 0.053 0.535 0.144l-0.006-0.002 10.324 5.961c0.319 0.185 0.529 0.527 0.529 0.916z" />
                        <path d="M22.094 19.451h-0.758c-0.188 0-0.363 0.049-0.515 0.135l0.006-0.004-4.574 2.512-5.282-3.049v-6.082l5.282-3.051 4.576 2.504c0.146 0.082 0.323 0.131 0.508 0.131h0.758c0.293 0 0.529-0.239 0.529-0.531v-0.716c0-0.2-0.11-0.373-0.271-0.463l-0.004-0.002-5.078-2.777c-0.293-0.164-0.645-0.26-1.015-0.26-0.39 0-0.756 0.106-1.070 0.289l0.010-0.006-5.281 3.049c-0.636 0.375-1.056 1.055-1.059 1.834v6.082c0 0.779 0.422 1.461 1.049 1.828l0.009 0.006 5.281 3.049c0.305 0.178 0.67 0.284 1.061 0.284 0.373 0 0.723-0.098 1.027-0.265l-0.012 0.006 5.080-2.787c0.166-0.091 0.276-0.265 0.276-0.465v-0.716c0-0.293-0.238-0.529-0.529-0.529z" />
                      </svg>
                    </NavLink>
                  </div>
                  <Menu
                    theme="dark"
                    defaultSelectedKeys={["1"]}
                    mode="inline"
                    items={items}
                  />
                </Sider>
                <Layout>
                  <Header
                    style={{
                      padding: "0 20px",
                      background: colorBgContainer,
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="flex items-center gap-2 cursor-pointer hover:text-orange-500 duration-200"
                        onClick={() => {
                          history.push("/profile");
                        }}
                      >
                        <span className="text-xl">
                          <UserOutlined />
                        </span>
                        <p>{thongTinNguoiDung?.hoTen}</p>
                      </div>
                      <div>
                        <span
                          className="bg-blue-400 py-2 px-4 rounded-md hover:opacity-80 text-white cursor-pointer duration-200"
                          onClick={() => logout()}
                        >
                          Đăng xuất
                        </span>
                      </div>
                    </div>
                  </Header>
                  <Content
                    style={{
                      margin: "0 16px",
                    }}
                  >
                    <Breadcrumb
                      style={{
                        margin: "16px 0",
                      }}
                    >
                      {pathname.slice(1).map((item, index) => {
                        return (
                          <Breadcrumb.Item key={index}>
                            {" "}
                            {item.toUpperCase()}{" "}
                          </Breadcrumb.Item>
                        );
                      })}
                    </Breadcrumb>
                    <div
                      style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                      }}
                    >
                      <Component {...propsRoute} />
                    </div>
                  </Content>
                  <Footer
                    style={{
                      textAlign: "center",
                    }}
                  >
                    TPTvie @{new Date().getFullYear()} Created by Thuy Phuoc
                    Thinh
                  </Footer>
                </Layout>
              </Layout>
              <ToastContainer autoClose={2000} />
            </Fragment>
          );
        }}
      />
    );
  } else {
    return (
      <div className="flex items-center justify-center w-full bg-white">
        <Result
          style={{ minHeight: "100vh" }}
          status="403"
          title="403"
          subTitle="Bạn không đủ quyền truy cập trang này."
          extra={
            <Button
              type="primary"
              onClick={() => {
                history.push("/home");
              }}
            >
              Về trang chủ
            </Button>
          }
        />
      </div>
    );
  }
}
