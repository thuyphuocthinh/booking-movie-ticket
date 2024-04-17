import { useFormik } from "formik";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import * as Yup from "yup";
import { GROUP_ID } from "../../util/settings/settings";
import { useDispatch } from "react-redux";
import { capNhatThongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungActions";

export default function UserInfo(props) {
  const dispatch = useDispatch();
  const { thongTinNguoiDungTimKiem } = props;
  const [isFormEditVisible, setIsFormEditVisible] = useState(false);
  const updateSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    soDt: Yup.string()
      .required("PhoneNumber is required")
      .matches(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/, {
        message: "Please enter valid number.",
        excludeEmptyString: false,
      }),
    hoTen: Yup.string()
      .required("Fullname is required")
      .min(2, "Fullname is too short")
      .max(50, "Fullname is too long"),
  });

  const formik = useFormik({
    initialValues: {
      taiKhoan: thongTinNguoiDungTimKiem?.taiKhoan,
      email: thongTinNguoiDungTimKiem?.email,
      soDt: thongTinNguoiDungTimKiem?.soDt,
      hoTen: thongTinNguoiDungTimKiem?.hoTen,
    },
    isInitialValid: false,
    validationSchema: updateSchema,
    onSubmit: async (values) => {
      values = {
        ...values,
        maNhom: GROUP_ID,
        matKhau: thongTinNguoiDungTimKiem.matKhau,
        maLoaiNguoiDung: thongTinNguoiDungTimKiem.maLoaiNguoiDung,
      };
      console.log("values", values);
      dispatch(capNhatThongTinNguoiDungAction(values));
      setIsFormEditVisible(false);
    },
  });

  useEffect(() => {
    formik.setFieldValue("taiKhoan", thongTinNguoiDungTimKiem?.taiKhoan);
    formik.setFieldValue("email", thongTinNguoiDungTimKiem?.email);
    formik.setFieldValue("soDt", thongTinNguoiDungTimKiem?.soDt);
    formik.setFieldValue("hoTen", thongTinNguoiDungTimKiem?.hoTen);
  }, [thongTinNguoiDungTimKiem]);

  return (
    <div>
      {isFormEditVisible ? (
        <div
          style={{ maxWidth: "450px", width: "100%" }}
          className="mx-auto mt-4"
        >
          <form
            onSubmitCapture={formik.handleSubmit}
            className="flex flex-col gap-4 text-white items-center w-full"
          >
            <div className="form-group flex flex-col mx-auto gap-2 w-full">
              <label for="taiKhoan"> Tài khoản (read-only) </label>
              <input
                type="text"
                id="taiKhoan"
                name="taiKhoan"
                value={formik.values.taiKhoan}
                readOnly
                disabled
                className={`bg-transparent border-solid border-2 border-white rounded-md outline-none px-4 color-white leading-8`}
                autoComplete="off"
              />
            </div>
            <div className="form-group flex flex-col mx-auto gap-2 w-full">
              <label for="email"> Email </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`bg-transparent border-solid border-2 border-white rounded-md outline-none px-4 color-white leading-8 ${
                  formik.errors.email && formik.touched.email
                    ? "input-error"
                    : ""
                }
                }`}
                autoComplete="off"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500 text-sm"> {formik.errors.email} </p>
              )}
            </div>
            <div className="form-group flex flex-col mx-auto gap-2 w-full">
              <label for="soDt"> Số điện thoại </label>
              <input
                type="tel"
                id="soDt"
                name="soDt"
                className={`bg-transparent border-solid border-2 border-white rounded-md outline-none px-4 color-white leading-8 ${
                  formik.errors.soDt && formik.touched.soDt ? "input-error" : ""
                }
                  }`}
                autoComplete="off"
                value={formik.values.soDt}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.soDt && formik.touched.soDt && (
                <p className="text-red-500 text-sm"> {formik.errors.soDt} </p>
              )}
            </div>
            <div className="form-group flex flex-col mx-auto gap-2 w-full">
              <label for="hoTen"> Họ tên </label>
              <input
                type="text"
                id="hoTen"
                name="hoTen"
                className={`bg-transparent border-solid border-2 border-white rounded-md outline-none px-4 color-white leading-8 ${
                  formik.errors.hoTen && formik.touched.hoTen
                    ? "input-error"
                    : ""
                }
                  }`}
                autoComplete="off"
                value={formik.values.hoTen}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.hoTen && formik.touched.hoTen && (
                <p className="text-red-500 text-sm"> {formik.errors.hoTen} </p>
              )}
            </div>
            <div className="mt-4 w-full flex gap-2">
              <button
                className="w-1/2 bg-white block text-black rounded-md hover:scale-95 duration-200"
                onClick={() => {
                  setIsFormEditVisible(false);
                  formik.setFieldValue(
                    "taiKhoan",
                    thongTinNguoiDungTimKiem?.taiKhoan
                  );
                  formik.setFieldValue(
                    "email",
                    thongTinNguoiDungTimKiem?.email
                  );
                  formik.setFieldValue("soDt", thongTinNguoiDungTimKiem?.soDt);
                  formik.setFieldValue(
                    "hoTen",
                    thongTinNguoiDungTimKiem?.hoTen
                  );
                }}
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className={`btn btn-capNhat py-1 px-4 text-white w-1/2 block`}
              >
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-4 text-white text-md items-center pt-6">
          <div className="flex flex-col items-start md:flex-row gap-2 md:items-center justify-between">
            <p className="text-orange-500" style={{ width: "100px" }}>
              Tài khoản
            </p>
            <p className="" style={{ minWidth: "250px" }}>
              {thongTinNguoiDungTimKiem?.taiKhoan}
            </p>
          </div>
          <div className="flex flex-col items-start md:flex-row gap-2 md:items-center justify-between">
            <p className="text-orange-500" style={{ width: "100px" }}>
              Email
            </p>
            <p className="" style={{ minWidth: "250px" }}>
              {!thongTinNguoiDungTimKiem?.email
                ? "Chưa thiết lập"
                : thongTinNguoiDungTimKiem?.email}
            </p>
          </div>
          <div className="flex flex-col items-start md:flex-row gap-2 md:items-center justify-between">
            <p className="text-orange-500" style={{ width: "100px" }}>
              Số điện thoại
            </p>
            <p className="" style={{ minWidth: "250px" }}>
              {!thongTinNguoiDungTimKiem?.soDt
                ? "Chưa thiết lập"
                : thongTinNguoiDungTimKiem?.soDt}
            </p>
          </div>
          <div className="flex flex-col items-start md:flex-row gap-2 md:items-center justify-between">
            <p className="text-orange-500" style={{ width: "100px" }}>
              Họ tên
            </p>
            <p className="" style={{ minWidth: "250px" }}>
              {!thongTinNguoiDungTimKiem?.hoTen
                ? "Chưa thiết lập"
                : thongTinNguoiDungTimKiem?.hoTen}
            </p>
          </div>
          <div className="mt-4">
            <button
              className="btn btn-capNhat px-6 py-1"
              onClick={() => setIsFormEditVisible(true)}
            >
              Thay đổi thông tin
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
