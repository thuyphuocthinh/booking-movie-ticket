import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { capNhatThongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungActions";

export default function UpdatePassword(props) {
  const dispatch = useDispatch();
  const validate = (values) => {
    let errors = {};
    if (!values.matKhau) {
      errors.matKhau = "Không bỏ trống trường này";
    } else if (values.matKhau.length < 2) {
      errors.matKhau = "Độ dài tối thiểu là 2";
    } else if (values.matKhau.length > 50) {
      errors.matKhau = "Mật khẩu quá dài";
    }
    if (!values.xacNhanMatKhau) {
      errors.xacNhanMatKhau = "Không bỏ trống trường này";
    } else if(values.matKhau.length < 2) {
      errors.xacNhanMatKhau = "Độ dài tối thiểu là 2"
    } 
    else if (values.matKhau !== values.xacNhanMatKhau) {
      errors.xacNhanMatKhau = "Xác nhận mật khẩu không khớp";
    }
    return errors;
  };
  const { thongTinNguoiDungTimKiem } = props;
  const formik = useFormik({
    initialValues: {
      matKhau: "",
      xacNhanMatKhau: "",
    },
    isInitialValid:false,
    validate: validate,
    onSubmit: (values, { resetForm }) => {
      const thongTinCapNhat = {
        ...thongTinNguoiDungTimKiem,
        ["matKhau"]: values.matKhau,
      };
      console.log(thongTinCapNhat);
      dispatch(capNhatThongTinNguoiDungAction(thongTinCapNhat));
      resetForm();
    },
  });
 
  return (
    <div style={{ maxWidth: "450px", width: "100%" }} className="mx-auto mt-4">
      <form
        onSubmitCapture={formik.handleSubmit}
        className="flex flex-col gap-4 text-white items-center w-full"
      >
        <div className="form-group flex flex-col mx-auto gap-2 w-full">
          <label for="matKhau"> Mật khẩu mới </label>
          <input
            type="password"
            id="matKhau"
            name="matKhau"
            value={formik.values.matKhau}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`bg-transparent border-solid border-2 border-white rounded-md outline-none px-4 color-white leading-8 ${
              formik.errors.matKhau && formik.touched.matKhau
                ? "input-error"
                : ""
            }`}
            autoComplete="off"
          />
          {formik.errors.matKhau && formik.touched.matKhau && (
            <p className="text-red-500 text-sm"> {formik.errors.matKhau} </p>
          )}
        </div>
        <div className="form-group flex flex-col mx-auto gap-2 w-full">
          <label for="xacNhanMatKhau"> Xác nhận mật khẩu </label>
          <input
            type="password"
            id="xacNhanMatKhau"
            name="xacNhanMatKhau"
            value={formik.values.xacNhanMatKhau}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`bg-transparent border-solid border-2 border-white rounded-md outline-none px-4 color-white leading-8 ${
              formik.errors.xacNhanMatKhau && formik.touched.xacNhanMatKhau
                ? "input-error"
                : ""
            }`}
            autoComplete="off"
          />
          {formik.errors.xacNhanMatKhau && formik.touched.xacNhanMatKhau && (
            <p className="text-red-500 text-sm">
              {" "}
              {formik.errors.xacNhanMatKhau}{" "}
            </p>
          )}
        </div>
        <div className="mt-4 w-full flex gap-2">
          <button
            className="w-1/2 bg-white block text-black rounded-md hover:scale-95 duration-200"
            onClick={() => {
              formik.resetForm();
            }}
            type="reset"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            className={`btn btn-capNhat py-1 px-4 text-white w-1/2 block ${!formik.isValid && "btn-disabled"}`}
            disabled={!formik.isValid && true}
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
}
