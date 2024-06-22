import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "antd";
import Slider from "react-slick";
import Link from "next/link";
import classNames from "classnames";

import { formatCurrency } from "../../../common/utils";
import { NextArrow, PrevArrow } from "../../other/SliderArrow";
import Container from "../../other/Container";

function HeroSliderOne({ data }) {
  const [currentSlideIndex, setNextSlideIndex] = useState(0);

  const settings = {
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  const beforeChange = (oldIndex, newIndex) => {
    setNextSlideIndex(newIndex);
  };
  useEffect(() => {
    const currentSlide = document.querySelector(
      `.hero-slider.-style-one .slick-slide[data-index="${currentSlideIndex}"]`
    );
    const animationItems = currentSlide.querySelectorAll("[data-animation]");
    animationItems.forEach((item, index) => {
      const animationName = item.dataset.animation;
      const animationDelay = item.dataset.delay;

      item.classList.add("animate__animated", animationName);
      item.style.animationDelay = animationDelay + "s";
      item.addEventListener("animationend", function () {
        this.classList.remove("animate__animated", animationName);
        this.removeEventListener("animationend", function () {
          return;
        });
      });
    });
  }, [currentSlideIndex]);

  return (
    <div
      className="hero-slider -carousel  -style-one"
      style={{ background: "" }}
    >
      {/* <div
      className="hero-slider -carousel -style-one"
      style={{ background: "#f9f5eb" }}
    > */}
      <Slider
        style={{ background: "#f9f5eb" }}
        beforeChange={beforeChange}
        className="arrow-center"
        {...settings}
      >
        {data.map((item, index) => (
          <div
            style={{ background: "#f9f5eb" }}
            key={index}
            className={`slick-slider-item ${classNames({
              active: index === currentSlideIndex,
            })}`}
          >
            <div className="hero-slider-background">
              <img
                src={process.env.NEXT_PUBLIC_URL + item.background}
                alt="Hero slider background image"
              />
            </div>
            <Container>
              <div className="hero-slider-content-wrapper">
                <Row align="middle" gutter={40}>
                  <Col sm={12}>
                    <div className="hero-slider-content">
                      <h1
                        data-delay="0.4"
                        data-animation="animate__fadeInDown"
                        style={{
                          fontSize: "30px",
                        }}
                      >
                        <span>MOST SELLING PRODUCT</span>
                      </h1>
                      <h1
                        data-delay="0.2"
                        data-animation="animate__fadeInDown"
                        style={{ color: "rgb(217, 132, 42)" }}
                      >
                        TRANSFORMING CHAOS{" "}
                      </h1>
                      <h1
                        data-delay="0.2"
                        data-animation="animate__fadeInDown"
                        style={{ color: "#242464" }}
                      >
                        <span>INTO CALM</span>
                      </h1>
                      <h1
                        data-delay="0.2"
                        data-animation="animate__fadeInDown"
                      ></h1>
                      <h1
                        data-delay="0.4"
                        data-animation="animate__fadeInDown"
                        style={{
                          paddingTop: "20px",
                          fontSize: "20px",
                          paddingBottom: "15px",
                        }}
                      >
                        <span>Caddy Colors</span>
                      </h1>
                      <img
                        src={
                          process.env.NEXT_PUBLIC_URL +
                          "/assets/images/hero-slider/one/colorChips.png"
                        }
                        style={{
                          width: "65%", // Makes the image take the full width of the container
                          height: "70%", // Makes the image take the full height of the container
                          objectFit: "content", // Ensures the image covers the container without distortion
                        }}
                      />
                    </div>
                  </Col>
                  <Col sm={12}>
                    <div
                      data-delay="0.8"
                      data-animation="animate__zoomInRight"
                      className="hero-slider-image"
                    >
                      <Link href="/products/caddy">
                        {" "}
                        <img
                          src={
                            process.env.NEXT_PUBLIC_URL +
                            "/assets/images/hero-slider/one/1.png"
                          }
                          style={{
                            width: "100%", // Makes the image take the full width of the container
                            height: "100%", // Makes the image take the full height of the container
                            objectFit: "content", // Ensures the image covers the container without distortion
                          }}
                          alt="Hero slider image"
                        />
                      </Link>
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default React.memo(HeroSliderOne);
