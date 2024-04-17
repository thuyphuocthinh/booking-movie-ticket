import React, { Fragment, useEffect, useState } from "react";
import Carousel from "../../components/Carousel/Carousel";
import Slider from "react-slick";
import HomeStyle from "./Home.module.css";
import {
  RightOutlined,
  LeftOutlined,
  DesktopOutlined,
  FieldTimeOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Select, Badge, Cascader } from "antd";
import HomeMenu from "./HomeMenu/HomeMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  layDanhSachBannerAction,
  layDanhSachPhimAction,
} from "../../redux/actions/QuanLyPhimActions";
import TrailerModal from "../../components/Modal/TrailerModal";
import { OPEN_MODAL } from "../../redux/types/ModalTypes";
import {
  layThongTinLichChieuHeThongRapAction,
  layThongTinLichChieuPhimBookingBarAction,
} from "../../redux/actions/QuanLyRapActions";
import _ from "lodash";
import dayjs from "dayjs";
import { history } from "../../App";
import { useRef } from "react";
import { NavLink } from "react-router-dom";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${HomeStyle.arrow} ${HomeStyle.nextArrow}`}
      style={{ ...style }}
      onClick={onClick}
    >
      <RightOutlined />
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${HomeStyle.arrow} ${HomeStyle.prevArrow}`}
      style={{ ...style }}
      onClick={onClick}
    >
      <LeftOutlined />
    </div>
  );
}

export default function Home() {
  // states
  const dispatch = useDispatch();
  const { danhSachBanner } = useSelector((state) => state.QuanLyPhimReducer);
  const { danhSachTatCaPhim } = useSelector((state) => state.QuanLyPhimReducer);
  const { lichChieuTheoHeThongRap } = useSelector(
    (state) => state.QuanLyRapReducer
  );
  const { thongTinLichChieuPhimForBookingBar } = useSelector(
    (state) => state.QuanLyRapReducer
  );
  const [lichChieuPhimTheoCumRap, setLichChieuPhimTheoCumRap] = useState([]);
  const [ngayChieuGioChieu, setNgayChieuGioChieu] = useState("");
  const maLichChieuBookingBarRef = useRef(null);

  const [isDisabled, setIsDisabled] = useState(true);
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    autoplay: true,
    centerPadding: "5px",
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          rows: 2,
          slidesPerRow: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          rows: 2,
          slidesPerRow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          rows: 2,
          slidesPerRow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    // Lay danh sach banner - quanLyPhimService
    dispatch(layDanhSachBannerAction());
    // Lay danh sach phim theo ma nhom - quanLyPhimService
    dispatch(layDanhSachPhimAction());
    // Lay danh sach lich chieu theo he thong rap - quanLyRapService
    dispatch(layThongTinLichChieuHeThongRapAction());
  }, []);

  // methods
  const openTrailer = (trailerLink) => {
    dispatch({
      type: OPEN_MODAL,
      payload: {
        title: "Trailer",
        Component: <TrailerModal />,
        trailerLink,
        width: 700,
        maskClosable: true,
      },
    });
  };

  const renderDanhSachPhimDangChieu = () => {
    return danhSachTatCaPhim?.map((phimDangChieu, index) => {
      if (phimDangChieu.dangChieu) {
        return (
          <div key={index} className="px-4 mb-10 w-72 ">
            <Badge.Ribbon color="volcano" text="HOT">
              <div
                className={`w-full relative rounded-lg ${HomeStyle.movieCard}`}
                style={{ height: "350px" }}
              >
                <img
                  className="rounded-lg w-full h-full object-cover object-center mb-6"
                  src={phimDangChieu.hinhAnh}
                  alt={phimDangChieu.hinhAnh}
                />
                <div
                  className={`absolute rounded-lg top-0 bottom-0 right-0 left-0 bg-white bg-opacity-50  ${HomeStyle.movieOverlay}`}
                >
                  <div className="flex flex-col gap-4 items-center">
                    <button
                      className="text-black text-2xl rounded-full border-black border-solid border-2 w-12 h-12"
                      onClick={() => {
                        openTrailer(phimDangChieu.trailer);
                      }}
                    >
                      <i className="fa-solid fa-play" />
                    </button>
                  </div>
                </div>
              </div>
            </Badge.Ribbon>
            <p className="text-center font-bold text-md pt-4 pb-4 text-orange-400">
              {phimDangChieu.tenPhim.trim().length > 20
                ? phimDangChieu.tenPhim.trim().slice(0, 20) + "..."
                : phimDangChieu.tenPhim}
            </p>
            <div>
              <button
                className="btn text-white btn-muaVe px-4 py-1 w-full"
                onClick={() => {
                  history.push(`/detail/${phimDangChieu.maPhim}`);
                }}
              >
                Mua vé
              </button>
            </div>
          </div>
        );
      }
    });
  };

  const renderDanhSachPhimSapChieu = () => {
    return danhSachTatCaPhim?.map((phimSapChieu, index) => {
      if (phimSapChieu.sapChieu) {
        return (
          <div key={index} className="px-4 mb-10 w-72 ">
            <Badge.Ribbon color="volcano" text="HOT">
              <div
                className={`w-full relative rounded-lg ${HomeStyle.movieCard}`}
                style={{ height: "350px" }}
              >
                <img
                  className="rounded-lg w-full h-full object-cover object-center mb-6"
                  src={phimSapChieu.hinhAnh}
                  alt={phimSapChieu.hinhAnh}
                />
                <div
                  className={`absolute rounded-lg top-0 bottom-0 right-0 left-0 bg-white bg-opacity-50  ${HomeStyle.movieOverlay}`}
                >
                  <div className="flex flex-col gap-4 items-center">
                    <button
                      className="text-black text-2xl rounded-full border-black border-solid border-2 w-12 h-12"
                      onClick={() => {
                        openTrailer(phimSapChieu.trailer);
                      }}
                    >
                      <i className="fa-solid fa-play" />
                    </button>
                  </div>
                </div>
              </div>
            </Badge.Ribbon>
            <p className="text-center font-bold text-md pt-4 pb-4 text-orange-400">
              {phimSapChieu.tenPhim.trim().length > 20
                ? phimSapChieu.tenPhim.trim().slice(0, 20) + "..."
                : phimSapChieu.tenPhim}
            </p>
            <div>
              <button
                className="btn text-white btn-muaVe px-4 py-1 w-full"
                onClick={() => {
                  history.push(`/detail/${phimSapChieu.maPhim}`);
                }}
              >
                Mua vé
              </button>
            </div>
          </div>
        );
      }
    });
  };

  const handleChonPhimBookingBar = (value) => {
    dispatch(layThongTinLichChieuPhimBookingBarAction(value));
    setIsDisabled(true);
  };

  const handleChonRapBookingBar = async (value) => {
    const lichChieuPhimTheoHeThongRap = await _.find(
      thongTinLichChieuPhimForBookingBar?.heThongRapChieu,
      function (item) {
        return item?.maHeThongRap === value[0];
      }
    );
    const lichChieuPhimTheoCumRap = await _.find(
      lichChieuPhimTheoHeThongRap?.cumRapChieu,
      function (item) {
        return item.maCumRap === value[1];
      }
    );
    setLichChieuPhimTheoCumRap(lichChieuPhimTheoCumRap);
    setIsDisabled(true);
  };

  const handleChonNgayBookingBar = async (value) => {
    const whiteSpacePosition = value.indexOf(" ", 0);
    const ngayChieuGioChieuSplitFromValue = value.slice(0, whiteSpacePosition);
    const maLichChieuSplitFromValue = value.slice(whiteSpacePosition + 1);
    setNgayChieuGioChieu(ngayChieuGioChieuSplitFromValue);
    maLichChieuBookingBarRef.current = maLichChieuSplitFromValue;
    setIsDisabled(true);
  };

  return (
    <Fragment>
      <Carousel danhSachBanner={danhSachBanner} />
      <div
        className="container mx-auto md:block hidden z-30 relative "
        style={{ marginTop: "-45px" }}
      >
        <div
          className="bg-white text-black py-4 grid grid-cols-6 gap-2 px-4 rounded-md shadow-gray-200 shadow-sm"
          id="bookingBar"
        >
          <div
            id="bookingChonPhim"
            className="flex items-center overflow-hidden"
          >
            <span className="block w-5">
              <DesktopOutlined />
            </span>
            <Select
              variant="borderless"
              showSearch
              filterOption={(inputValue, option) =>
                option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
              defaultValue="Chọn phim"
              style={{
                width: "100%",
              }}
              className="bookingSelect h-full"
              options={danhSachTatCaPhim?.map((phim, index) => {
                return {
                  label: phim.tenPhim,
                  value: phim.maPhim,
                };
              })}
              onChange={(value) => handleChonPhimBookingBar(value)}
            />
          </div>
          <div
            id="bookingChonRap"
            className="flex items-center overflow-hidden col-span-2"
          >
            <span className="block w-5">
              <EnvironmentOutlined />
            </span>
            <Cascader
              variant="borderless"
              allowClear={false}
              defaultValue="Chọn rạp"
              notFoundContent="Vui lòng chọn phim"
              style={{
                width: "100%",
              }}
              className="bookingSelect h-full"
              options={thongTinLichChieuPhimForBookingBar.heThongRapChieu?.map(
                (lichChieuHeThong, index) => {
                  {
                    return {
                      label:
                        "Hệ thống rạp " +
                        lichChieuHeThong.tenHeThongRap.toUpperCase(),
                      value: lichChieuHeThong.maHeThongRap,
                      children: lichChieuHeThong.cumRapChieu?.map(
                        (lichChieuCumRap, index) => {
                          return {
                            label: lichChieuCumRap.tenCumRap,
                            value: lichChieuCumRap.maCumRap,
                          };
                        }
                      ),
                    };
                  }
                }
              )}
              onChange={(value) => handleChonRapBookingBar(value)}
            />
          </div>
          <div
            id="bookingChonNgay"
            className="flex items-center  overflow-hidden"
          >
            <span className="block w-5">
              <FieldTimeOutlined />
            </span>
            <Select
              variant="borderless"
              defaultValue="Chọn ngày"
              style={{
                width: "100%",
              }}
              notFoundContent="Vui lòng phim và rạp"
              className="bookingSelect h-full"
              options={lichChieuPhimTheoCumRap?.lichChieuPhim?.map(
                (lichChieuCumRap, index) => {
                  return {
                    value:
                      lichChieuCumRap.ngayChieuGioChieu +
                      " " +
                      lichChieuCumRap.maLichChieu,
                    label: dayjs(lichChieuCumRap.ngayChieuGioChieu).format(
                      "DD/MM/YYYY"
                    ),
                  };
                }
              )}
              onChange={(value) => handleChonNgayBookingBar(value)}
            />
          </div>
          <div
            id="bookingChonGio"
            className="flex items-center  overflow-hidden"
          >
            <span className="block w-5">
              <FieldTimeOutlined />
            </span>
            <Select
              defaultValue="Chọn giờ"
              variant="borderless"
              notFoundContent="Vui lòng chọn phim, rạp, và ngày chiếu"
              style={{
                width: "100%",
              }}
              className="bookingSelect h-full"
              options={[
                {
                  value: ngayChieuGioChieu,
                  label: dayjs(ngayChieuGioChieu).format("hh:mm A"),
                },
              ]}
              onSelect={(value) => {
                if (value !== "") {
                  setIsDisabled(false);
                }
              }}
            />
          </div>
          <div id="bookingBar-datVeBtn">
            <button
              className={`btn ${
                isDisabled ? "btn-disabled" : "btn-muaVe"
              } px-8 lg:px-10 w-full text-sm lg:text-md py-2 block mx-auto`}
              disabled={isDisabled && true}
              onClick={() => {
                history.push(`/checkout/${maLichChieuBookingBarRef.current}`);
              }}
            >
              Đặt vé
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto" style={{ maxWidth: "1200px", width: "90%" }}>
        <section className="text-gray-600 body-font" id="phimDangChieu">
          <div className="py-16 mx-auto">
            <div className="flex flex-wrap w-full mb-10">
              <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
                  Phim đang chiếu
                </h1>
                <div className="h-1 w-20 bg-white rounded" />
              </div>
            </div>
            <div className="slider-container">
              <Slider {...settings}>{renderDanhSachPhimDangChieu()}</Slider>
            </div>
          </div>
        </section>
        <section className="text-gray-600 body-font" id="phimSapChieu">
          <div className="pb-16 mx-auto">
            <div className="flex flex-wrap w-full mb-10">
              <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
                  Phim sắp chiếu
                </h1>
                <div className="h-1 w-20 bg-white rounded" />
              </div>
            </div>
            <div className="slider-container">
              <Slider {...settings}>{renderDanhSachPhimSapChieu()}</Slider>
            </div>
          </div>
        </section>
        <section className="text-gray-600 body-font" id="cumRap">
          <div className="pb-16 mx-auto">
            <div className="flex flex-wrap w-full mb-10">
              <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
                  Các rạp chiếu
                </h1>
                <div className="h-1 w-20 bg-white rounded" />
              </div>
            </div>
            <div className="bg-gray-900 py-2 rounded-sm">
              <HomeMenu lichChieuTheoHeThongRap={lichChieuTheoHeThongRap} />
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
}
