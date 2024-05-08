import { useFormik } from "formik";
import React from "react";
import { NavLink } from "react-router-dom";
import { GROUP_ID } from "../../util/settings/settings";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { dangKyAction } from "../../redux/actions/QuanLyNguoiDungActions";

export default function Signup() {
  const dispatch = useDispatch();
  const signupSchema = Yup.object().shape({
    taiKhoan: Yup.string()
      .required("Username is required")
      .min(2, "Username is too short")
      .max(50, "Username is too long"),
    matKhau: Yup.string()
      .required("Password is required")
      .min(8, "Password must contain at least 8 characters")
      .max(50, "Password is too long"),
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
    // enableReinitialize: true,
    validationSchema: signupSchema,
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: GROUP_ID,
      hoTen: "",
    },
    onSubmit: (values) => {
      dispatch(dangKyAction(values));
    },
  });

  return (
    <div
      className="text-white bg-black bg-opacity-80 rounded-md shadow-xl z-30 py-4"
      style={{ maxWidth: "550px", width: "100%" }}
    >
      <div className="text-center">
        <NavLink
          rel="noopener noreferrer"
          to="/home"
          aria-label="Back to homepage"
          className="flex items-center p-2 justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 32 32"
            className="w-10 h-10 dark:text-violet-600"
          >
            <path d="M27.912 7.289l-10.324-5.961c-0.455-0.268-1.002-0.425-1.588-0.425s-1.133 0.158-1.604 0.433l0.015-0.008-10.324 5.961c-0.955 0.561-1.586 1.582-1.588 2.75v11.922c0.002 1.168 0.635 2.189 1.574 2.742l0.016 0.008 10.322 5.961c0.455 0.267 1.004 0.425 1.59 0.425 0.584 0 1.131-0.158 1.602-0.433l-0.014 0.008 10.322-5.961c0.955-0.561 1.586-1.582 1.588-2.75v-11.922c-0.002-1.168-0.633-2.189-1.573-2.742zM27.383 21.961c0 0.389-0.211 0.73-0.526 0.914l-0.004 0.002-10.324 5.961c-0.152 0.088-0.334 0.142-0.53 0.142s-0.377-0.053-0.535-0.145l0.005 0.002-10.324-5.961c-0.319-0.186-0.529-0.527-0.529-0.916v-11.922c0-0.389 0.211-0.73 0.526-0.914l0.004-0.002 10.324-5.961c0.152-0.090 0.334-0.143 0.53-0.143s0.377 0.053 0.535 0.144l-0.006-0.002 10.324 5.961c0.319 0.185 0.529 0.527 0.529 0.916z" />
            <path d="M22.094 19.451h-0.758c-0.188 0-0.363 0.049-0.515 0.135l0.006-0.004-4.574 2.512-5.282-3.049v-6.082l5.282-3.051 4.576 2.504c0.146 0.082 0.323 0.131 0.508 0.131h0.758c0.293 0 0.529-0.239 0.529-0.531v-0.716c0-0.2-0.11-0.373-0.271-0.463l-0.004-0.002-5.078-2.777c-0.293-0.164-0.645-0.26-1.015-0.26-0.39 0-0.756 0.106-1.070 0.289l0.010-0.006-5.281 3.049c-0.636 0.375-1.056 1.055-1.059 1.834v6.082c0 0.779 0.422 1.461 1.049 1.828l0.009 0.006 5.281 3.049c0.305 0.178 0.67 0.284 1.061 0.284 0.373 0 0.723-0.098 1.027-0.265l-0.012 0.006 5.080-2.787c0.166-0.091 0.276-0.265 0.276-0.465v-0.716c0-0.293-0.238-0.529-0.529-0.529z" />
          </svg>
          <span className="inline-block text-xl font-bold ml-2">TPTvie</span>
        </NavLink>
      </div>
      <h2 className="text-center my-4 font-bold text-2xl text-orange-400">
        Signup To TPTvie
      </h2>
      <form
        onSubmitCapture={formik.handleSubmit}
        className="flex flex-col gap-4 pb-4"
      >
        <div className="form-group flex flex-col w-3/4 mx-auto gap-2">
          <label for="taiKhoan"> Username </label>
          <input
            type="text"
            required
            id="taiKhoan"
            name="taiKhoan"
            className={`bg-transparent border-solid border-2 border-white rounded-md outline-none px-4 color-white leading-8 ${
              formik.errors.taiKhoan && formik.touched.taiKhoan
                ? "input-error"
                : ""
            }`}
            autoComplete="off"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.taiKhoan && formik.touched.taiKhoan && (
            <p className="text-red-500 text-sm"> {formik.errors.taiKhoan} </p>
          )}
        </div>
        <div className="form-group flex flex-col w-3/4 mx-auto gap-2">
          <label for="matKhau"> Password </label>
          <input
            type="password"
            required
            id="matKhau"
            name="matKhau"
            className={`bg-transparent border-solid border-2 border-white rounded-md outline-none px-4 color-white leading-8 ${
              formik.errors.matKhau && formik.touched.matKhau
                ? "input-error"
                : ""
            }`}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.matKhau && formik.touched.matKhau && (
            <p className="text-red-500 text-sm"> {formik.errors.matKhau} </p>
          )}
        </div>
        <div className="form-group flex flex-col w-3/4 mx-auto gap-2">
          <label for="hoTen"> Fullname </label>
          <input
            type="text"
            required
            id="hoTen"
            name="hoTen"
            className={`bg-transparent border-solid border-2 border-white rounded-md outline-none px-4 color-white leading-8 ${
              formik.errors.hoTen && formik.touched.hoTen ? "input-error" : ""
            }`}
            autoComplete="off"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.hoTen && formik.touched.hoTen && (
            <p className="text-red-500 text-sm"> {formik.errors.hoTen} </p>
          )}
        </div>
        <div className="form-group flex flex-col w-3/4 mx-auto gap-2">
          <label for="email"> Email </label>
          <input
            type="email"
            required
            id="email"
            name="email"
            className={`bg-transparent border-solid border-2 border-white rounded-md outline-none px-4 color-white leading-8 ${
              formik.errors.email && formik.touched.email ? "input-error" : ""
            }`}
            autoComplete="off"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 text-sm"> {formik.errors.email} </p>
          )}
        </div>
        <div className="form-group flex flex-col w-3/4 mx-auto gap-2">
          <label for="soDt"> Phone </label>
          <input
            type="tel"
            id="soDt"
            required
            name="soDt"
            className={`bg-transparent border-solid border-2 border-white rounded-md outline-none px-4 color-white leading-8 ${
              formik.errors.soDt && formik.touched.soDt ? "input-error" : ""
            }`}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            autoComplete="off"
          />
          {formik.errors.soDt && formik.touched.soDt && (
            <p className="text-red-500 text-sm"> {formik.errors.soDt} </p>
          )}
        </div>
        <div className="form-group w-3/4 mx-auto">
          <button
            type="submit"
            className="block w-full bg-white text-black py-1 rounded-md hover:bg-opacity-80 duration-300"
          >
            Signup
          </button>
        </div>
      </form>
      <div className="flex justify-between py-4 w-3/4 mx-auto">
        <p>
          Already registered?{" "}
          <NavLink to="/login" className="text-orange-400 hover:underline">
            Login
          </NavLink>{" "}
        </p>
        <p>
          <NavLink to="/home" className="text-orange-400 hover:underline">
            Homepage
          </NavLink>{" "}
        </p>
      </div>
    </div>
  );
}
