import React, { useEffect, useState, Fragment } from "react";
import { Route } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { UpOutlined } from "@ant-design/icons";
import { ToastContainer } from "react-toastify";
import { USER_LOGIN } from "../../util/settings/settings";


export default function HomeTemplate(props) {
  const { Component, ...restParams } = props;
  const [isVisible, setIsVisible] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <Route
      {...restParams}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Header />
            <Component {...propsRoute} />
            <Footer />
            {isVisible && (
              <button
                className="btn btn-toTop fixed text-xl text-white p-2 w-10 h-10 bottom-5 right-5"
                style={{ borderRadius: "50%" }}
                onClick={scrollToTop}
              >
                <UpOutlined />
              </button>
            )}{" "}
            <ToastContainer autoClose={2000} />
          </Fragment>
        );
      }}
    />
  );
}
