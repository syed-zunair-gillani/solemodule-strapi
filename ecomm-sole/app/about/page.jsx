"use client";
import { Breadcrumb, Row, Col, Button, Form, Input } from "antd";
import React from "react";
import CountUp from "react-countup";
import heroslideOneData from "../../data/sections/hero-slider.json";

import LayoutOne from "../../components/layout/LayoutOne";
import Container from "../../components/other/Container";
import SectionTitle from "../../components/other/SectionTitle";
import IntroductionFive from "../../components/sections/introduction/IntroductionFive";
import IntroductionSix from "../../components/sections/introduction/IntroductionSix";
import PartnerOne from "../../components/sections/partners/PartnerOne";
import introductionData from "../../data/sections/dale-of-week.json";
import data from "../../data/pages/about.json";
import data1 from "../../data/pages/aboutSole.json";
import HeroSliderOne from "@/components/sections/hero-slider/HeroSliderOne";
import HeroSliderAbout from "@/components/sections/hero-slider/HeroSliderAbout";
import FooterSubcribeInput from "@/components/footer/elements/FooterSubcribeInput";
import Link from "next/link";
function aboutUs() {
  const onFinish = () => {};
  const onFinishFailed = () => {};
  const items = [
    {
      route: "/",
      title: "Home",
      icon: <i className="fas fa-home" />,
    },

    {
      title: "About Us",
    },
  ];
  function itemRender(currentRoute, params, items, paths) {
    const isLast = currentRoute?.route === items[items.length - 1]?.route;

    return isLast ? (
      <span>{currentRoute.title}</span>
    ) : (
      <Link href={`${currentRoute.route}`}>
        {currentRoute.icon && currentRoute.icon}
        {currentRoute.title}
      </Link>
    );
  }
  return (
    <LayoutOne title="About us">
      <Container>
        <Breadcrumb separator=">" itemRender={itemRender} items={items} />
      </Container>
      <div className="about ">
        <HeroSliderAbout data={heroslideOneData.one} />
        <Container>
          <div
            className="container d-flex flex-column align-items-center "
            // style={{ backgroundColor: "red" }}
            style={{ paddingTop: "40px" }}
          >
            <div className="footer-subcribe">
              <Container>
                <Row align="center">
                  <h1 style={{ color: "#D9842A" }} className="dispaly-4">
                    Join Our Newsletter Now !
                  </h1>
                </Row>

                <Row align="center" xs={24} md={14}>
                  <div className="footer-subcribe__content">
                    <h2 style={{ color: "#242464", paddingTop: "10px" }}>
                      Get E-mail updates about our latest shop and special
                      offers.
                    </h2>
                  </div>
                </Row>
                <Row
                  align="center"
                  style={{ paddingTop: "20px" }}
                  xs={24}
                  md={10}
                >
                  <Form
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className="footer-subcribe__form"
                  >
                    <Form.Item
                      noStyle={true}
                      name="email"
                      rules={[
                        {
                          type: "email",
                          message: "The input is not valid E-mail!",
                        },
                        {
                          required: true,
                          message: "Please input your E-mail!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter your email"
                        style={{
                          backgroundColor: "white",
                          color: "black",
                        }}
                      />
                    </Form.Item>
                    <Form.Item noStyle={true}>
                      <Button
                        type="link"
                        htmlType="submit"
                        className="btn-customPrimary3"
                      >
                        SUBSCRIBE
                      </Button>
                    </Form.Item>
                  </Form>
                </Row>
              </Container>
            </div>
          </div>
          <div className="">
            <Container>
              {" "}
              <Row
                style={{
                  borderRadius: "8px",
                  border: "solid white 10px",
                  padding: "20px 10px",
                  marginTop: "20px",
                }}
                gutter={[10, 40]}
              >
                {data1.featuresData.map((item) => (
                  <Col
                    lg={4}
                    md={8}
                    xs={24}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      style={{
                        width: "160px",

                        borderRadius: "8px",
                      }}
                      src={process.env.NEXT_PUBLIC_URL + item.icon}
                      alt="Statistical icon"
                    />
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        </Container>
        <div className="about-introduction">
          <IntroductionFive data={introductionData.two} />
          {/* <IntroductionSix /> */}
        </div>

        {/* <div
          style={{
            paddingTop: "120px",
            paddingBottom: "120px",
          }}
          className="container-fluid"
        >
          <Container>
            <div className="about-story">
              {[1, 2, 3].map((ele) => (
                <Row gutter={40} style={{ paddingTop: "50px" }}>
                  <Col xs={24} sm={12}>
                    <div className="about-story__content">
                      <h2 className="display-3">
                        Tyna Giang's integrated agro-forestry farming model is
                        the
                      </h2>
                      <p>
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur
                        aut odit aut fugit. Neque porro quisquam est, sed quia
                        non numquam eius modi tempora incidunt ut labore et
                        dolore magnam aliquam quaerat voluptatem first project
                        in Vietnam to achieve the highest ranking in the "100
                        projects to combat climate change" by the Ministry of
                        Environment, Energy and Sea. France organized in 2016
                        ...
                      </p>
                    </div>
                  </Col>
                  <Col xs={24} sm={12}>
                    <div className="about-story__video">
                      <img
                        src={
                          process.env.NEXT_PUBLIC_URL +
                          "/assets/images/pages/contact/video.png"
                        }
                        alt="introduction image"
                      />
                      <Button
                        type="primary"
                        shape="circle"
                        icon={<i className="fas fa-play" />}
                      />
                    </div>
                  </Col>
                </Row>
              ))}
            </div>
          </Container>
        </div> */}
      </div>
    </LayoutOne>
  );
}

export default React.memo(aboutUs);
