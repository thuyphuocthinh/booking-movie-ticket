import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Header from "./Header/Header";
import { USER_LOGIN } from "../../util/settings/settings";
import { history } from "../../App";
import { ToastContainer } from "react-toastify";

export default function CheckOutTemplate(props) {
  const { Component, ...restParams } = props;
  const userLocal = JSON.parse(localStorage.getItem(USER_LOGIN));
  if (userLocal) {
    return (
      <Route
        {...restParams}
        render={(propsRoute) => {
          return (
            <Fragment>
              <Header />
              <Component {...propsRoute} />
              <ToastContainer autoClose={2000} />
            </Fragment>
          );
        }}
      />
    );
  } else {
    history.push("/login", {
      from: `${props.location?.pathname}`,
      checkout: "checkout",
    });
  }
}
