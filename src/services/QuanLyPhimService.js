import { GROUP_ID } from "../util/settings/settings";
import { BaseService } from "./BaseService";

class QuanLyPhimService extends BaseService {
  constructor() {
    super();
  }

  layDanhSachBanner() {
    return this.get("/QuanLyPhim/LayDanhSachBanner");
  }

  layDanhSachPhim(tenPhim) {
    if (tenPhim === "") {
      return this.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`);
    }
    return this.get(
      `/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}&tenPhim="${tenPhim}`
    );
  }
  xoaPhim(maPhim) {
    return this.delete(`/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
  }
  themPhimUploadHinh(thongTinPhim) {
    return this.post("/QuanLyPhim/ThemPhimUploadHinh", thongTinPhim);
  }
  layThongTinPhim(maPhim) {
    return this.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
  }
  capNhatPhimUpload(thongTinPhimCapNhat) {
    return this.post("/QuanLyPhim/CapNhatPhimUpload", thongTinPhimCapNhat);
  }
}

export const quanLyPhimService = new QuanLyPhimService();
