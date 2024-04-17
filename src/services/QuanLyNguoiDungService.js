import { GROUP_ID, USER_TOKEN } from "../util/settings/settings";
import { BaseService } from "./BaseService";

class QuanLyNguoiDungService extends BaseService {
  constructor() {
    super();
  }

  dangNhap(thongTinDangNhap) {
    return this.post("/QuanLyNguoiDung/DangNhap", thongTinDangNhap);
  }

  dangKy(thongTinDangKy) {
    return this.post("/QuanLyNguoiDung/DangKy", thongTinDangKy);
  }
  timKiemNguoiDung(tuKhoa) {
    return this.get(
      `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${tuKhoa}`
    );
  }
  capNhatThongTinNguoiDung(thongTinCapNhat) {
    return this.put(
      "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      thongTinCapNhat
    );
  }
  thongTinTaiKhoan() {
    return this.post(
      "/QuanLyNguoiDung/ThongTinTaiKhoan",
      localStorage.getItem(USER_TOKEN)
    );
  }
  layDanhSachNguoiDung(tuKhoa) {
    if (tuKhoa === "") {
      return this.get(
        `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`
      );
    }
    return this.get(
      `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${tuKhoa}`
    );
  }
  layDanhSachLoaiNguoiDung() {
    return this.get("/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung");
  }
  themNguoiDung (thongTinNguoiDung) {
    return this.post("/QuanLyNguoiDung/ThemNguoiDung", thongTinNguoiDung);
  }
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
