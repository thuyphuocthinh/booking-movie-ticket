import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { OPEN_DRAWER } from "../../../redux/types/DrawerTypes";
import MobileMenuDrawer from "../../../components/Drawer/MobileMenuDrawer";
import { history } from "../../../App";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
} from "../../../redux/types/LoadingTypes";
import { USER_LOGIN, USER_TOKEN } from "../../../util/settings/settings";
import { toast } from "react-toastify";
import { SET_THONG_TIN_NGUOI_DUNG } from "../../../redux/types/QuanLyNguoiDungTypes";

export default function Header() {
  const dispatch = useDispatch();
  const { thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const handleScrollToSection = async (e) => {
    if (history.location.pathname !== "/home") {
      await history.push("/home");
    }
    const id = e.target.getAttribute("dataId");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleOpenMobileMenu = () => {
    dispatch({
      type: OPEN_DRAWER,
      payload: {
        title: "",
        Component: <MobileMenuDrawer />,
      },
    });
  };
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
  return (
    <header className="p-2 bg-black fixed top-0 left-0 right-0 z-50 text-white shadow-lg shadow-gray-800">
      <div className="container px-6 flex justify-between items-center h-14 mx-auto">
        <NavLink
          rel="noopener noreferrer"
          to="/home"
          aria-label="Back to homepage"
          className="flex items-center p-2"
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
          <span className="inline-block text-xl font-bold ml-2">TPTvie</span>
        </NavLink>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <button
              rel="noopener noreferrer"
              className="flex items-center px-4 header-link"
              dataId="phimDangChieu"
              onClick={handleScrollToSection}
            >
              Phim đang chiếu
            </button>
          </li>
          <li className="flex">
            <button
              rel="noopener noreferrer"
              className="flex items-center px-4 header-link"
              dataId="phimSapChieu"
              onClick={handleScrollToSection}
            >
              Phim sắp chiếu
            </button>
          </li>
          <li className="flex">
            <button
              rel="noopener noreferrer"
              dataId="cumRap"
              className="flex items-center px-4 header-link"
              onClick={handleScrollToSection}
            >
              Cụm rạp
            </button>
          </li>
        </ul>
        <div className="hidden md:block">
          {!thongTinNguoiDung ? (
            <>
              <button className="btn mr-2 hidden lg:inline">
                <NavLink to="/signup" className="px-4 py-1 block">
                  Đăng kí
                </NavLink>
              </button>
              <button className="btn btn-login">
                <NavLink to="/login" className="px-4 py-1 block">
                  Đăng nhập
                </NavLink>
              </button>
            </>
          ) : (
            <div className="flex gap-2 items-center">
              <NavLink to={`/profile`}>
                <div className="flex gap-2 items-center">
                  <img
                    src="https://picsum.photos/35/35"
                    className="rounded-full"
                    alt="avatar"
                  />
                  <p className="text-sm cursor-pointer hover:opacity-80 duration-200">
                    {" "}
                    {thongTinNguoiDung?.hoTen}{" "}
                  </p>
                </div>
              </NavLink>
              <button
                className="ml-4 px-4 py-1 block btn btn-logout"
                onClick={() => logout()}
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
        <button
          className="flex justify-end p-4 md:hidden hover:bg-orange-500 duration-300"
          onClick={() => handleOpenMobileMenu()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
