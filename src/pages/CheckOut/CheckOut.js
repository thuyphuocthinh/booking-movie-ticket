import React, { useEffect } from "react";
import CheckOutStyle from "./CheckOut.module.css";
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachPhongVeAction } from "../../redux/actions/QuanLyDatVeActions";
import { USER_LOGIN } from "../../util/settings/settings";
import { useState } from "react";
import _ from "lodash";
import CheckOutSideBar from "./CheckOutSideBar";
import { CLOSE_DRAWER, OPEN_DRAWER } from "../../redux/types/DrawerTypes";
import CheckOutDrawer from "../../components/Drawer/CheckOutDrawer";
import Countdown, { zeroPad } from "react-countdown";
import { CLOSE_MODAL, OPEN_MODAL } from "../../redux/types/ModalTypes";
import { history } from "../../App";
import { useRef } from "react";
import { SET_COUNTDOWN_KEY } from "../../redux/types/CountdownTypes";

const thongTinNguoiDungLocal = JSON.parse(localStorage.getItem(USER_LOGIN));
const kiTuGhe = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"];
let date = Date.now();

export default function CheckOut(props) {
  const clockRef = useRef();
  const dispatch = useDispatch();
  const [danhSachVeChon, setDanhSachVeChon] = useState([]);
  const { danhSachPhongVe } = useSelector((state) => state.QuanLyDatVeReducer);
  const { key } = useSelector((state) => state.CountdownReducer);
  useEffect(() => {
    dispatch(layDanhSachPhongVeAction(props.match.params.id));
    xoaGheDaChon();
  }, []);

  useEffect(() => {
    date = Date.now();
  }, [key]);

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      dispatch({
        type: OPEN_MODAL,
        payload: {
          title: "",
          Component: (
            <p>
              Hết thời gian đặt vé.{" "}
              <span
                className="cursor-pointer text-orange-500"
                onClick={() => {
                  dispatch({ type: CLOSE_MODAL });
                  history.push(`/checkout/${props.match.params.id}`);
                  date = Date.now();
                  dispatch({ type: SET_COUNTDOWN_KEY });
                  dispatch({ type: CLOSE_DRAWER });
                }}
              >
                {" "}
                Đặt vé lại{" "}
              </span>
            </p>
          ),
          maskClosable: false,
          closeIcon: false,
        },
      });
    } else {
      return (
        <span>
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      );
    }
  };

  const xoaGheDaChon = () => {
    setDanhSachVeChon([]);
  };

  const handleDatGhe = (ghe, indexKiTuGhe) => {
    const index = _.findIndex(danhSachVeChon, function (gheItem) {
      return gheItem?.maGhe === ghe?.maGhe;
    });
    const newGhe = { ...ghe, tenGhe: kiTuGhe[indexKiTuGhe] + ghe?.tenGhe };
    if (index === -1) {
      setDanhSachVeChon([...danhSachVeChon, newGhe]);
    } else {
      setDanhSachVeChon(
        [...danhSachVeChon].filter(
          (gheItem) => gheItem?.maGhe !== danhSachVeChon[index]?.maGhe
        )
      );
    }
  };

  const renderDanhSachGhe = () => {
    let dayGhe = [];
    let hangGhe = [];
    let soGhe = 0;
    for (let i = 0; i < danhSachPhongVe.danhSachGhe.length; i++) {
      hangGhe.push(danhSachPhongVe.danhSachGhe[i]);
      soGhe++;
      if (soGhe === 16) {
        dayGhe.push(hangGhe);
        hangGhe = [];
        soGhe = 0;
      }
    }
    return dayGhe.map((hangGhe, indexKiTuGhe) => {
      return (
        <div key={indexKiTuGhe} className="flex gap-2 w-full justify-center">
          <span className="block mr-2 bg-gray-800 px-2 rounded-sm">
            {kiTuGhe[indexKiTuGhe]}
          </span>
          {hangGhe.map((ghe, index) => {
            const indexGheDangChon = _.findIndex(
              danhSachVeChon,
              function (gheItem) {
                return gheItem?.maGhe === ghe?.maGhe;
              }
            );
            let classLoaiGhe = ghe?.loaiGhe === "Vip" ? "gheVip" : "gheThuong";
            let classGheDaDat = ghe?.daDat === true ? "gheDaDat" : "";
            let classGheDangChon = indexGheDangChon !== -1 ? "gheDangChon" : "";
            return (
              <button
                className={`block rounded-sm ${CheckOutStyle[classLoaiGhe]} ${CheckOutStyle[classGheDaDat]} ${CheckOutStyle[classGheDangChon]} bg-opacity-80 hover:scale-95 duration-200`}
                style={{
                  width: "25px",
                  height: "25px",
                }}
                onClick={() => handleDatGhe(ghe, indexKiTuGhe)}
                disabled={ghe?.daDat && true}
                key={index}
              ></button>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className={`mt-24 ${CheckOutStyle.contentWidth}`}>
      <div className="text-white pb-6">
        <div className="flex flex-col">
          {/* Countdown */}
          <div
            className={`${CheckOutStyle.contentWidthHeader} flex-col flex items-center sm:flex-row sm:justify-between mx-auto mb-4`}
          >
            <p className={`${CheckOutStyle.tenCumRapEffect}`}>
              {danhSachPhongVe.thongTinPhim.tenCumRap}
            </p>
            <p>
              Thời gian giữ ghế:{" "}
              <span className="text-orange-500">
                <Countdown
                  date={date + 300005}
                  renderer={renderer}
                  ref={clockRef}
                  key={key}
                  autoStart={true}
                ></Countdown>
              </span>
            </p>
          </div>
          {/* Screen */}
          <div
            id="rapChieu"
            className="overflow-auto mx-auto py-4 lg:py-0"
            style={{ width: "90%" }}
          >
            <div id="manHinh">
              <div
                className="mx-auto h-2 bg-orange-400"
                style={{ width: "600px" }}
              ></div>
              <div
                className={`${CheckOutStyle.manHinhBlur} mx-auto relative`}
                style={{ width: "600px" }}
              >
                {" "}
                <span className="absolute text-sm text-black left-1/2 -translate-x-1/2 top-2">
                  Màn hình
                </span>{" "}
              </div>
            </div>

            <div
              id="dayGhe"
              className="flex flex-col gap-3 mt-6 mx-auto items-center justify-center"
              style={{ width: "600px" }}
            >
              {renderDanhSachGhe()}
            </div>
          </div>
          {/* Notes */}
          <div
            className={`flex justify-between items-center gap-2 mx-auto mt-6 flex-wrap ${CheckOutStyle.contentNotes}`}
          >
            <div className="flex gap-2 items-center">
              <span
                className={`${CheckOutStyle.gheThuong} block rounded-sm`}
                style={{ width: "20px", height: "20px" }}
              ></span>
              <span>Ghế thường</span>
            </div>
            <div className="flex gap-2 items-center">
              <span
                className={`${CheckOutStyle.gheVip} block rounded-sm`}
                style={{ width: "20px", height: "20px" }}
              ></span>
              <span>Ghế VIP</span>
            </div>
            <div className="flex gap-2 items-center">
              <span
                className={`${CheckOutStyle.gheDaDat} block rounded-sm`}
                style={{ width: "20px", height: "20px" }}
              ></span>
              <span>Ghế đã đặt</span>
            </div>
            <div className="flex gap-2 items-center">
              <span
                className={`${CheckOutStyle.gheDangChon} block rounded-sm`}
                style={{ width: "20px", height: "20px" }}
              ></span>
              <span>Ghế đang chọn</span>
            </div>
          </div>
          {/* Checkout mobile button */}
          <div className={`${CheckOutStyle.btnDatVeResponsive} mt-8`}>
            <button
              className={`btn ${
                danhSachVeChon.length > 0 ? "btn-muaVe" : "btn-disabled"
              } block w-full py-2`}
              disabled={danhSachVeChon.length === 0 && true}
              onClick={() => {
                dispatch({
                  type: OPEN_DRAWER,
                  payload: {
                    title: "",
                    Component: (
                      <CheckOutDrawer
                        danhSachPhongVe={danhSachPhongVe}
                        danhSachVeChon={danhSachVeChon}
                        thongTinNguoiDungLocal={thongTinNguoiDungLocal}
                        maLichChieu={props.match.params.id}
                        clockRef={clockRef}
                        xoaGheDaChon={xoaGheDaChon}
                      />
                    ),
                  },
                });
              }}
            >
              TIẾN HÀNH THANH TOÁN
            </button>
          </div>
        </div>
        {/* Checkout side bar */}
        <CheckOutSideBar
          danhSachPhongVe={danhSachPhongVe}
          danhSachVeChon={danhSachVeChon}
          thongTinNguoiDungLocal={thongTinNguoiDungLocal}
          maLichChieu={props.match.params.id}
          clockRef={clockRef}
          xoaGheDaChon={xoaGheDaChon}
        />
      </div>
    </div>
  );
}
