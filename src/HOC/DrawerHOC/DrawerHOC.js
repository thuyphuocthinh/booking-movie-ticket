import React, { useEffect } from "react";
import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_DRAWER } from "../../redux/types/DrawerTypes";
export default function DrawerHOC() {
  const dispatch = useDispatch();
  const { IsDrawerOpen, Component, title } = useSelector(
    (state) => state.DrawerReducer
  );

  const onClose = () => {
    dispatch({
      type: CLOSE_DRAWER,
    });
  };

  useEffect(() => {
    window.onresize = () => {
      if (window.innerWidth > 768) {
        dispatch({
          type: CLOSE_DRAWER,
        });
      }
    };
  }, []);

  return (
    <div className="block md:hidden">
      <Drawer
        title={title}
        onClose={onClose}
        open={IsDrawerOpen}
        className="shadow-gray-600 shadow-lg block md:hidden"
        keyboard={true}
        style={{ backgroundColor: "black", color: "white" }}
      >
        {Component}
      </Drawer>
    </div>
  );
}
