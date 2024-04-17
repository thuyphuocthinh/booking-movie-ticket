import React, { useState } from "react";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Switch,
  Upload,
  message,
} from "antd";
import { GROUP_ID } from "../../util/settings/settings";
import { useDispatch } from "react-redux";
import { themPhimUploadHinhAction } from "../../redux/actions/QuanLyPhimActions";

const { TextArea } = Input;

export default function FilmAdd() {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState();
  const [initialValues, setInitialValues] = useState({
    tenPhim: "",
    trailer: "",
    moTa: "",
    hinhAnh: null,
    ngayKhoiChieu: "",
    dangChieu: false,
    sapChieu: false,
    hot: false,
    soSao: 0,
    maNhom: GROUP_ID,
  });

  const setValues = (name, value) => {
    setInitialValues({
      ...initialValues,
      [name]: value,
    });
  };

  const handleInputText = (e) => {
    const { name, value } = e.target;
    setValues(name, value);
  };

  const handleInputNumber = (value) => {
    setValues("soSao", value);
  };

  const handleSwitch = (value, name) => {
    setValues(name, value);
  };

  const handleDatePicker = (date, dateString) => {
    console.log(date, dateString);;
    setValues("ngayKhoiChieu", dateString);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return false;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      const {file} = info;
      if (
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/gif"
      ) {
        // Tao doi tuong doc file
        let reader = new FileReader();
        // bat dau doc file
        reader.readAsDataURL(file);
        // doc file xong thi load file
        reader.onload = (e) => {
          setImageUrl(e.target.result);
        };
        setValues("hinhAnh", file);
      }
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const handleSubmit = (values) => {
    let formData = new FormData();
    for (let key in initialValues) {
      if (key !== "hinhAnh") {
        formData.append(key, initialValues[key]);
      } else {
        // append file se khac append cac du lieu khac do server quy dinh
        formData.append("File", initialValues.hinhAnh, initialValues.hinhAnh.name);
      }
    }
    dispatch(themPhimUploadHinhAction(formData));

  };

  return (
    <div>
      <h2 className="text-center text-xl font-bold">Thêm phim</h2>
      <div className="mt-6">
        <Form
          onFinish={handleSubmit}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          className="mx-auto"
          style={{
            maxWidth: 700,
            width: "100%",
          }}
        >
          <Form.Item
            label="Tên phim"
            name="tenPhim"
            rules={[{ required: true, message: "Không để trống trường này" }]}
          >
            <Input onChange={handleInputText} name="tenPhim" />
          </Form.Item>
          <Form.Item
            label="Ngày khởi chiếu"
            name="ngayKhoiChieu"
            rules={[{ required: true, message: "Không để trống trường này" }]}
          >
            <DatePicker
              name="ngayKhoiChieu"
              onChange={handleDatePicker}
              format="DD/MM/YYYY"
            />
          </Form.Item>
          <Form.Item
            label="Đánh giá"
            name="soSao"
            rules={[{ required: true, message: "Không để trống trường này" }]}
          >
            <InputNumber
              name="soSao"
              onChange={handleInputNumber}
              min={0}
              max={10}
            />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="moTa"
            rules={[{ required: true, message: "Không để trống trường này" }]}
          >
            <TextArea name="moTa" rows={4} onChange={handleInputText} />
          </Form.Item>
          <Form.Item
            label="Trailer"
            name="trailer"
            rules={[{ required: true, message: "Không để trống trường này" }]}
          >
            <Input name="trailer" onChange={handleInputText} />
          </Form.Item>
          <Form.Item
            label="Đang chiếu"
            name="dangChieu"
            valuePropName="checked"
          >
            <Switch
              name="dangChieu"
              onChange={(value) => handleSwitch(value, "dangChieu")}
            />
          </Form.Item>
          <Form.Item label="Sắp chiếu" name="sapChieu" valuePropName="checked">
            <Switch
              name="sapChieu"
              onChange={(value) => handleSwitch(value, "sapChieu")}
            />
          </Form.Item>
          <Form.Item label="Hot" name="hot" valuePropName="checked">
            <Switch
              name="hot"
              onChange={(value) => handleSwitch(value, "hot")}
            />
          </Form.Item>
          <Form.Item
            label="Upload"
            name="hinhAnh"
            rules={[{ required: true, message: "Không để trống trường này" }]}
          >
            <Upload
              name="hinhAnh"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={true}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="upload"
                  style={{
                    width: "100%",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item label="Actions">
            <Button htmlType="reset" type="default" className="mr-2">
              Reset
            </Button>
            <Button htmlType="submit" type="primary">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

