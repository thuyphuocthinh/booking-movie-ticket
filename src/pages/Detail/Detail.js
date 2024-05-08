import React, { useEffect } from "react";
import DetailStyle from "./Detail.module.css";
import { Progress } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinLichChieuPhimAction } from "../../redux/actions/QuanLyRapActions";
import DetailMenu from "./DetailMenu/DetailMenu";
import dayjs from "dayjs";
import Rating from "@mui/material/Rating";
import { OPEN_MODAL } from "../../redux/types/ModalTypes";
import TrailerModal from "../../components/Modal/TrailerModal";

export default function Detail(props) {
  const dispatch = useDispatch();
  const { thongTinLichChieuPhim } = useSelector(
    (state) => state.QuanLyRapReducer
  );

  useEffect(() => {
    dispatch(layThongTinLichChieuPhimAction(props.match.params.id));
  }, []);

  const openTrailer = (trailerLink) => {
    dispatch({
      type: OPEN_MODAL,
      payload: {
        title: "Trailer",
        Component: <TrailerModal />,
        trailerLink,
        width: 700,
      },
    });
  };

  return (
    <div>
      {/* Desktop */}
      <div
        className="hidden md:block"
        style={{
          backgroundImage: `url(${thongTinLichChieuPhim?.hinhAnh})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
          position: "relative",
          marginTop: "2rem",
        }}
      >
        <div className={`${DetailStyle.glassMorphinBlack} h-full`}>
          <div
            className="h-full mx-auto"
            style={{ maxWidth: "800px", width: "100%" }}
          >
            <div className="flex justify-between items-center h-full flex-wrap">
              <div
                id="thongTinPhim"
                className="flex items-center gap-2 flex-wrap w-3/4"
              >
                <div className="relative">
                  <img
                    src={thongTinLichChieuPhim?.hinhAnh}
                    alt={thongTinLichChieuPhim?.hinhAnh}
                    width={230}
                  />
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                    <button
                      className="text-white bg-black bg-opacity-50 text-2xl rounded-full border-black border-solid border-2 w-12 h-12"
                      onClick={() => {
                        openTrailer(thongTinLichChieuPhim?.trailer);
                      }}
                    >
                      <i className="fa-solid fa-play" />
                    </button>
                  </div>
                </div>
                <div className="text-white">
                  <p className="font-bold text-xl">
                    {thongTinLichChieuPhim?.tenPhim}
                  </p>
                  <p>
                    Khởi chiếu:{" "}
                    <span>
                      {dayjs(thongTinLichChieuPhim?.ngayKhoiChieu).format(
                        "DD/MM/YYYY"
                      )}
                    </span>
                  </p>
                </div>
              </div>
              <div
                id="danhGiaPhim"
                className="flex flex-col gap-2 items-center w-1/4"
              >
                <Progress
                  strokeColor="orange"
                  trailColor="white"
                  style={{ color: "white" }}
                  strokeLinecap="butt"
                  type="circle"
                  percent={thongTinLichChieuPhim?.danhGia * 10}
                  format={(percent) => percent / 10}
                  strokeWidth={8}
                />
                <Rating
                  name="read-only"
                  value={thongTinLichChieuPhim?.danhGia / 2}
                  readOnly
                  precision={0.5}
                  min={1}
                  max={5}
                  size="large"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div
        className="block md:hidden relative"
        style={{
          backgroundImage: `url(${thongTinLichChieuPhim?.hinhAnh})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "70vh",
          position: "relative",
          marginTop: "2rem",
        }}
      >
        <div className="absolute right-0 left-0 bottom-0 text-white p-4 bg-black bg-opacity-75 text-center">
          <p className="font-bold text-xl">{thongTinLichChieuPhim?.tenPhim}</p>
          <p>
            Khởi chiếu:{" "}
            <span>
              {dayjs(thongTinLichChieuPhim?.ngayKhoiChieu).format("DD/MM/YYYY")}
            </span>
          </p>
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <button
            className="text-black text-2xl rounded-full border-black border-solid border-2 w-12 h-12"
            onClick={() => {
              openTrailer(thongTinLichChieuPhim?.trailer);
            }}
          >
            <i className="fa-solid fa-play" />
          </button>
        </div>
      </div>
      {/* Lich chieu - thong tin */}
      <div className="bg-gray-900 py-4" style={{ minHeight: "50vh" }}>
        <div className="container mx-auto">
          <DetailMenu thongTinLichChieuPhim={thongTinLichChieuPhim} />
        </div>
      </div>
    </div>
  );
}
