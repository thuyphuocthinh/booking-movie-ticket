import React from "react";
import { useSelector } from "react-redux";

export default function TrailerModal() {
  const { trailerLink } = useSelector((state) => state.ModalReducer);
  return (
    <div
      style={{
        height: "350px",
        width: "100%",
      }}
    >
      <iframe
        width="100%"
        height="100%"
        src={trailerLink}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  );
}
