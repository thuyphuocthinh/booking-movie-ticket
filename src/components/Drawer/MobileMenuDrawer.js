import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_DRAWER } from "../../redux/types/DrawerTypes";
import { NavLink } from "react-router-dom";
import { history } from "../../App";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../redux/types/LoadingTypes";
import { USER_LOGIN, USER_TOKEN } from "../../util/settings/settings";
import { toast } from "react-toastify";
import { SET_THONG_TIN_NGUOI_DUNG } from "../../redux/types/QuanLyNguoiDungTypes";

export default function MobileMenuDrawer() {
  const dispatch = useDispatch();
  const handleScrollToSection = async (e) => {
    if (history.location.pathname !== "/home") {
      await history.push("/home");
    }
    const id = e.target.getAttribute("dataId");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      dispatch({ type: CLOSE_DRAWER });
    }
  };
  const { thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const logout = async () => {
    dispatch({ type: DISPLAY_LOADING });
    if (localStorage.getItem(USER_LOGIN) && localStorage.getItem(USER_TOKEN)) {
      localStorage.removeItem(USER_LOGIN);
      localStorage.removeItem(USER_TOKEN);
      toast.success("Logout successfully", {
        position: "top-right",
      });
      dispatch({
        type: SET_THONG_TIN_NGUOI_DUNG,
        payload: null,
      });
      history.push("/home");
    }
    dispatch({ type: CLOSE_DRAWER });
    dispatch({ type: HIDE_LOADING });
  };
  return (
    <header className="p-2 bg-black text-white h-full">
      <div className="container px-2 flex flex-col-reverse h-full justify-between mx-auto">
        <ul className="flex flex-col gap-5 my-6 flex-grow text-lg">
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
        <div className="flex flex-col gap-4">
          {!thongTinNguoiDung ? (
            <>
              <button className="btn mr-2 hidden lg:inline">
                <NavLink to="/signup" className="px-4 py-1 block">
                  Đăng kí
                </NavLink>
              </button>
              <button
                className="btn btn-login"
                onClick={() => dispatch({ type: CLOSE_DRAWER })}
              >
                <NavLink to="/login" className="px-4 py-1 block">
                  Đăng nhập
                </NavLink>
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-4 items-center">
              <div
                className="flex flex-col items-center gap-2"
                onClick={() => {
                  history.push("/profile");
                  dispatch({ type: CLOSE_DRAWER });
                }}
              >
                <img
                  src="https://picsum.photos/35/35"
                  className="rounded-full"
                />
                <p className="text-md cursor-pointer hover:opacity-80 duration-200">
                  {" "}
                  {thongTinNguoiDung?.hoTen}{" "}
                </p>
              </div>
              <button
                className="px-4 py-1 w-full block btn btn-logout"
                onClick={() => logout()}
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
