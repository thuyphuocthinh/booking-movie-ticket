import React from "react";
import { Button, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { layDanhSachLoaiNguoiDungAction, themNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungActions";
import { GROUP_ID } from "../../util/settings/settings";
const { Option } = Select;

export default function UserAdd() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { danhSachLoaiNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const handleSubmit = (values) => {
    values = {
      ...values,
      maNhom: GROUP_ID,
    };
    dispatch(themNguoiDungAction(values));
  };
  useEffect(() => {
    dispatch(layDanhSachLoaiNguoiDungAction());
  }, []);
  return (
    <div>
      <h2 className="text-center text-xl font-bold">Thêm người dùng</h2>
      <div className="mt-6">
        <Form
          layout="vertical"
          form={form}
          style={{ maxWidth: "500px", width: "100%" }}
          className="mx-auto"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Tài khoản"
            name="taiKhoan"
            rules={[
              {
                required: true,
                message: "Không để trống trường này",
              },
              {
                min: 6,
                message: "Tối thiểu 6 kí tự",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="matKhau"
            rules={[
              {
                required: true,
                message: "Không để trống trường này",
              },
              {
                min: 8,
                message: "Tối thiểu 8 kí tự",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="maLoaiNguoiDung"
            label="Loại người dùng"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select allowClear>
              {danhSachLoaiNguoiDung?.map((loaiNguoiDung, index) => {
                return (
                  <Option key={index} value={loaiNguoiDung.maLoaiNguoiDung}>
                    {loaiNguoiDung.tenLoai}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Không để trống trường này",
              },
              {
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Vui lòng nhập đúng định dạng email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="soDt"
            rules={[
              {
                required: true,
                message: "Không để trống trường này",
              },
              {
                pattern: /([0-9]{10})\b/g,
                message: "Nhập đúng định dạng số điện thoại",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Họ tên"
            name="hoTen"
            rules={[
              {
                required: true,
                message: "Không để trống trường này",
              },
              {
                min: 8,
                message: "Tối thiểu 8 kí tự",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="reset" type="default">
              Reset
            </Button>
            <Button htmlType="submit" className="ml-2" type="primary">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
