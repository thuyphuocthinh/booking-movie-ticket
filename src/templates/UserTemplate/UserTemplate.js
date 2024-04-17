import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function UserTemplate(props) {
  const { Component, ...restParams } = props;
  return (
    <Route
      {...restParams}
      render={(propsRoute) => {
        return (
          <div
            style={{
              backgroundImage: `url(${require("../../assets/img/userTemplateBackground.jpg")})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              minHeight: "100vh",
              position: "relative",
            }}
            className="flex justify-center items-center"
          >
            <div className="absolute top-0 right-0 left-0 bottom-0 bg-black bg-opacity-35"></div>
            <Component {...propsRoute} />
            <ToastContainer autoClose={2000} />
          </div>
        );
      }}
    />
  );
}
