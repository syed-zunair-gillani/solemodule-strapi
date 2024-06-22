import { Button, Col, Row } from "antd";
import Link from "next/link";
import React from "react";

export default function BannerTwo() {
  return (
    <div className="banner-two">
      <Row justify="center">
        <Col md={10}>
          <div className="up-down-anim">
            <img
              src={
                process.env.NEXT_PUBLIC_URL +
                "/assets/images/sections/banner/two/1.png"
              }
            />
          </div>
        </Col>
        <Col md={10}>
          <div className="banner-two-content">
            <div className="banner-two-content__discount">
              <h2>50</h2>
              <h3>
                %Off
                <br />
                Black
                <span> Friday</span>
              </h3>
            </div>
            <p className="banner-two-content__description">
              Lorem ipsum dolor sit amet, consectetur oce omnis iste natus error
              sit
            </p>
            <Button type="primary" shape="round">
              <Link href={process.env.NEXT_PUBLIC_URL + "/shop/shop-3-column"}>
                <span>Shop now</span>
              </Link>
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
