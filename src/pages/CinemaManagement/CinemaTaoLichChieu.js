import React from "react";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimActions";
import {
  layThongTinCumRapTheoHeThongAction,
  layThongTinHeThongRapAction,
} from "../../redux/actions/QuanLyRapActions";
import { useState } from "react";
import dayjs from "dayjs";
import { taoLichChieuAction } from "../../redux/actions/QuanLyDatVeActions";
const { Option } = Select;

export default function CinemaTaoLichChieu() {
  // states
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { danhSachTatCaPhim } = useSelector((state) => state.QuanLyPhimReducer);
  const { thongTinHeThongRap, thongTinCumRapTheoHeThong } = useSelector(
    (state) => state.QuanLyRapReducer
  );
  useEffect(() => {
    dispatch(layDanhSachPhimAction());
    dispatch(layThongTinHeThongRapAction());
  }, []);
  // methods
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const handleSubmit = (values) => {
    const thongTinLichChieu = {
      maPhim: values.maPhim,
      maRap: values.maCumRap,
      ngayChieuGioChieu: dayjs(values.ngayChieuGioChieu).format(
        "DD/MM/YYYY hh:mm:ss"
      ),
      giaVe: values.giaVe,
    };
    dispatch(taoLichChieuAction(thongTinLichChieu));
  };
  return (
    <div>
      <h2 className="text-center text-xl font-bold">Tạo lịch chiếu</h2>
      <div className="mt-6">
        <Form
          layout="vertical"
          form={form}
          style={{ maxWidth: "500px", width: "100%" }}
          className="mx-auto"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="maPhim"
            label="Phim"
            rules={[
              {
                required: true,
                message: "Không bỏ trống trường này",
              },
            ]}
          >
            <Select allowClear>
              {danhSachTatCaPhim?.map((phim, index) => {
                return (
                  <Option key={index} value={phim.maPhim}>
                    {phim.tenPhim}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="maHeThongRap"
            label="Hệ thống rạp"
            rules={[
              {
                required: true,
                message: "Không bỏ trống trường này",
              },
            ]}
          >
            <Select
              allowClear
              onSelect={(value) => {
                dispatch(layThongTinCumRapTheoHeThongAction(value));
              }}
            >
              {thongTinHeThongRap?.map((heThongRap, index) => {
                return (
                  <Option key={index} value={heThongRap.maHeThongRap}>
                    {heThongRap.tenHeThongRap}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="maCumRap"
            label="Cụm rạp"
            rules={[
              {
                required: true,
                message: "Không bỏ trống trường này",
              },
            ]}
          >
            <Select
              allowClear
            >
              {thongTinCumRapTheoHeThong?.map((cumRap, index) => {
                return (
                  <Option key={index} value={cumRap.maCumRap}>
                    {cumRap.tenCumRap}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Chọn ngày giờ chiếu"
            name="ngayChieuGioChieu"
            rules={[
              {
                required: true,
                message: "Không bỏ trống trường này",
              },
            ]}
          >
            <DatePicker
              onChange={onChange}
              showTime
              needConfirm={false}
              className="w-full"
              format={"DD/MM/YY hh:mm:ss"}
            />
          </Form.Item>
          <Form.Item
            label="Giá vé"
            name="giaVe"
            rules={[
              {
                required: true,
                message: "Không bỏ trống trường này",
              },
            ]}
            className="w-full"
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="reset" type="default">
              Reset
            </Button>
            <Button htmlType="submit" className="ml-2" type="primary">
              Tạo
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
