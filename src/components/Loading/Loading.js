import React from "react";
import { useSelector } from "react-redux";
import LoadingStyle from "./Loading.module.css";

export default function Loading() {
  const { IsLoading } = useSelector((state) => state.LoadingReducer);
  if (IsLoading)
    return (
      <div className={`${LoadingStyle.isLoading}`}>
        <img
          src={require("../../assets/img/Loading.gif")}
          alt="Loading Gif"
          style={{ width: "400px" }}
        />
      </div>
    );
  else return "";
}
