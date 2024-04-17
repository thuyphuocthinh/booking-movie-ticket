import React from "react";
import Slider from "react-slick";
import CarouselStyle from "./Carousel.module.css";
import {
  RightOutlined,
  LeftOutlined,
  PlayCircleOutlined,
  PlayCircleFilled,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { OPEN_MODAL } from "../../redux/types/ModalTypes";
import TrailerModal from "../Modal/TrailerModal";
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${CarouselStyle.arrow} ${CarouselStyle.nextArrow}`}
      style={{ ...style }}
      onClick={onClick}
    >
      <RightOutlined />
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${CarouselStyle.arrow} ${CarouselStyle.prevArrow}`}
      style={{ ...style }}
      onClick={onClick}
    >
      <LeftOutlined />
    </div>
  );
}

export default function Carousel(props) {
  const dispatch = useDispatch();
  const settings = {
    fade: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  const { danhSachBanner } = props;
  return (
    <div className="slider-container w-full md:mt-0 mt-16">
      <Slider {...settings} className="relative w-full">
        {danhSachBanner?.map((banner, index) => {
          return (
            <div key={index} className="h-full">
              <div
                className="relative"
                style={{
                  minHeight: "650px",
                  maxHeight: "700px",
                  backgroundImage: `url(${banner.hinhAnh})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <button
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-5xl z-20"
                  onClick={() => {
                    dispatch({
                      type: OPEN_MODAL,
                      payload: {
                        title: "Trailer",
                        Component: <TrailerModal />,
                        trailerLink:
                          "https://www.youtube.com/embed/9nyV-pgMX4I?si=SZZuAFQADEQF5hfM",
                        width: 700,
                        
                      },
                    });
                  }}
                >
                  <PlayCircleFilled />
                </button>
                <div
                  className={`absolute top-0 bottom-0 left-0 right-0 ${CarouselStyle.carouselOverlay} z-10`}
                ></div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
