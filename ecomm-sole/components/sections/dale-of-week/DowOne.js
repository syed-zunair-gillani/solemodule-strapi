import React from "react";
import classNames from "classnames";
import Countdown, { zeroPad } from "react-countdown";
import { Row, Col, Button } from "antd";

import Container from "../../other/Container";
import SectionTitle from "../../other/SectionTitle";
import Link from "next/link";

const DownOneItem = React.memo(({ reverse, data }) => {
  return (
    <div
      className={`dow-one-content__item ${classNames({ "-reverse": reverse })}`}
    >
      <div
        style={{ width: "80px", height: "80px" }}
        className="dow-one-content__item-image"
      >
        <img
          style={{ maxHeight: "50px" }}
          src={process.env.NEXT_PUBLIC_URL + data.iconSrc}
          alt="Dale of the week icon"
        />
      </div>
      <div className="dow-one-content__item-content">
        <h5>{data.title}</h5>
        <p>{data.description}</p>
      </div>
    </div>
  );
});

function DowOne({ data, countdownLast }) {
  return (
    <div className="dow-one">
      <Container>
        <SectionTitle title="Deal Of The Week" className="-center" />
        <div className="dow-one-content">
          <Row align="center" gutter={15}>
            <Col md={12} lg={8}>
              <Row gutter={[0, 30]}>
                {data.slice(0, 2).map((item, index) => (
                  <Col key={index} span={24}>
                    <DownOneItem reverse data={item} />
                  </Col>
                ))}
              </Row>
            </Col>
            <Col md={0} lg={8} className="centered-content">
              <img
                // className="dow-one-image "
                src={
                  process.env.NEXT_PUBLIC_URL +
                  "/assets/images/sections/dale-of-week/one/withArrow.png"
                }
                alt="Dale of the week image"
              />
              {/* <Button
                data-delay="0.6"
                data-animation="animate__fadeInDown"
                type="primary"
                shape="round"
                className="btn-customPrimary2"
              >
                <Link href={process.env.NEXT_PUBLIC_URL + "/products/holder"}>
                  <span>Shop now</span>
                </Link>
              </Button> */}
            </Col>
            <Col md={12} lg={8}>
              <Row gutter={[0, 30]}>
                {data.slice(2, 4).map((item, index) => (
                  <Col key={index} span={24}>
                    <DownOneItem data={item} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </div>

        <Countdown
          date={Date.now() + countdownLast}
          renderer={({ days, hours, minutes, seconds }) => {
            return (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  // backgroundColor: "red",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // height: "100vh", // Adjust height as needed
                }}
              >
                <Button
                  data-delay="0.6"
                  data-animation="animate__fadeInDown"
                  type="primary"
                  shape="round"
                  className="btn-customPrimary2"
                  style={{
                    padding: "20px 40px", // Adjust padding for bigger button
                    fontSize: "18px", // Adjust font size for bigger text
                    height: "60px", // Adjust height for bigger button
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  href={process.env.NEXT_PUBLIC_URL + "/products/caddy"}
                >
                  Shop now
                </Button>
              </div>
            );
          }}
        />
      </Container>
    </div>
  );
}

export default React.memo(DowOne);
