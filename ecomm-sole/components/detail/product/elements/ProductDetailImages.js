"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import classNames from "classnames";
import { Button, Modal } from "antd";

function ProductDetailImages({ type, images }) {
  console.log("🚀 ~ ProductDetailImages ~ images:", images);

  const [caruselShow, setCarauselShow] = React.useState(false);
  const onModalClose = (e) => {
    setCarauselShow(false);
  };

  const slider1Settings = {
    arrows: false,
  };
  const slider2Settings = {
    arrows: false,
    slidesToShow: 3,
    focusOnSelect: true,
    vertical: type === "column" ? true : false,
    // prevArrow: <PrevArrow />,
    // nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          vertical: type === "column" && false,
        },
      },
    ],
  };
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  // if (type === "column") {
  //   return <h1>Column</h1>;
  // }
  return (
    <>
      <div
        className={`product-detail-images ${classNames({
          "-column": type === "column",
        })}`}
      >
        <div
          style={{ cursor: "pointer" }}
          className="product-detail-images-big"
          onClick={() => setCarauselShow(true)}
        >
          <Slider asNavFor={nav2} ref={(c) => setNav1(c)} {...slider1Settings}>
            {images &&
              images.map((img, index) => (
                <div key={index} className="slide-item">
                  <img
                    src={
                      process.env.NEXT_PUBLIC_BACKEND_URL + img?.attributes?.url
                    }
                    alt="Product image"
                  />
                </div>
              ))}
          </Slider>
        </div>
        <div className="product-detail-images-small">
          <Slider asNavFor={nav1} ref={(c) => setNav2(c)} {...slider2Settings}>
            {images &&
              images.map((img, index) => {
                return (
                  <div key={index} className="slide-item">
                    <img
                      src={
                        process.env.NEXT_PUBLIC_BACKEND_URL +
                        img?.attributes?.url
                      }
                      alt="Product image"
                    />
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>

      <Modal
        visible={caruselShow}
        onHide={() => setCarauselShow(false)}
        onCancel={onModalClose}
        footer={null}
        header={null}
        width={860}
      >
        <div
          className={`product-detail-images ${classNames({
            "-column": type === "column",
          })}`}
        >
          <div
            className="product-detail-images-big"
            onClick={() => setCarauselShow(true)}
          >
            <Slider
              asNavFor={nav2}
              ref={(c) => setNav1(c)}
              {...slider1Settings}
            >
              {images &&
                images.map((img, index) => (
                  <div key={index} className="slide-item">
                    <img
                      src={
                        process.env.NEXT_PUBLIC_BACKEND_URL +
                        img?.attributes?.url
                      }
                      alt="Product image"
                    />
                  </div>
                ))}
            </Slider>
          </div>
          <div className="product-detail-images-small">
            <Slider
              asNavFor={nav1}
              ref={(c) => setNav2(c)}
              {...slider2Settings}
            >
              {images &&
                images.map((img, index) => (
                  <div key={index} className="slide-item">
                    <img
                      src={
                        process.env.NEXT_PUBLIC_BACKEND_URL +
                        img?.attributes?.url
                      }
                      alt="Product image"
                    />
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default React.memo(ProductDetailImages);
