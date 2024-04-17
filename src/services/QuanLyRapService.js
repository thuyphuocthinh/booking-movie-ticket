import { GROUP_ID } from "../util/settings/settings";
import { BaseService } from "./BaseService";

class QuanLyRapService extends BaseService {
  constructor() {
    super();
  }
  layThongTinLichChieuHeThongRap(maHeThongRap = "") {
    if (maHeThongRap === "") {
      return this.get(
        `/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`
      );
    }
    return this.get(
      `/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=${GROUP_ID}`
    );
  }
  layThongTinLichChieuPhim(maPhim) {
    return this.get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
  }
  layThongTinHeThongRap() {
    return this.get("/QuanLyRap/LayThongTinHeThongRap");
  }
  layThongTinCumRapTheoHeThong(maHeThongRap) {
    return this.get(
      `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
    );
  }
}

export const quanLyRapService = new QuanLyRapService();
