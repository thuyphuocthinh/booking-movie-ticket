import { BaseService } from "./BaseService";

class QuanLyDatVeService extends BaseService {
  constructor() {
    super();
  }
  layDanhSachPhongVe(maLichChieu) {
    return this.get(
      `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
  }
  datVe(thongTinVe) {
    return this.post("/QuanLyDatVe/DatVe", thongTinVe);
  }
  taoLichChieu(thongTinLichChieu) {
    return this.post("/QuanLyDatVe/TaoLichChieu", thongTinLichChieu);
  }
}

export const quanLyDatVeService = new QuanLyDatVeService();
