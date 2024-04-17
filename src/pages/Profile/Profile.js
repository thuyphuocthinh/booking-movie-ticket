import React from "react";
import { Tabs } from "antd";
import UserInfo from "./UserInfo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { timKiemNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungActions";
import UpdatePassword from "./UpdatePassword";
import TransactionHistory from "./TransactionHistory";
import { history } from "../../App";
const { TabPane } = Tabs;

export default function Profile() {
  const dispatch = useDispatch();
  const { thongTinNguoiDung, thongTinNguoiDungTimKiem } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  useEffect(() => {
    dispatch(
      timKiemNguoiDungAction(
        thongTinNguoiDung.email,
        thongTinNguoiDung.taiKhoan
      )
    );
  }, []);

  return (
    <div
      style={{ maxWidth: "1200px", width: "90%", minHeight: "400px" }}
      className="mx-auto mt-32 mb-10 text-white"
    >
      <h1 className="text-center text-2xl md:text-3xl font-bold mb-4">
        Thông tin cá nhân
      </h1>
      <div>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Tài khoản" key={1}>
            <UserInfo thongTinNguoiDungTimKiem={thongTinNguoiDungTimKiem} />
          </TabPane>
          <TabPane tab="Cập nhật mật khẩu" key={2}>
            <UpdatePassword
              thongTinNguoiDungTimKiem={thongTinNguoiDungTimKiem}
            />
          </TabPane>
          <TabPane tab="Lịch sử đặt vé" key={3}>
            <TransactionHistory />
          </TabPane>
          {thongTinNguoiDung.maLoaiNguoiDung?.toLowerCase() === "quantri" && (
            <TabPane tab="Admin" key={4}>
              <div className="text-center mt-2">
                <button
                  className="py-2 px-6 btn-quanTri rounded-md text-white hover:scale-95 duration-200"
                  onClick={() => {
                    history.push("/admin/statistics");
                  }}
                >
                  Vào trang quản trị
                </button>
              </div>
            </TabPane>
          )}
        </Tabs>
      </div>
    </div>
  );
}

/**
 * Account 1: KH
 * thuythinh
 * 123456789
 *
 * Account 2: Admin
 * admin2022
 * 123456789
 *
 */
