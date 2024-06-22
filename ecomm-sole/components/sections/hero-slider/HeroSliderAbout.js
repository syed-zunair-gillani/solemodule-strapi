import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "antd";
import Container from "../../other/Container";
import SectionTitle from "@/components/other/SectionTitle";

function HeroSliderAbout({ data }) {
  const [headerHeight, setHeaderHeight] = useState("");

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (window.innerWidth <= 344) {
        setHeaderHeight("100px");
      } else if (window.innerWidth <= 768) {
        setHeaderHeight("130px");
      } else if (window.innerWidth <= 1200) {
        setHeaderHeight("260px");
      } else {
        setHeaderHeight("400px");
      }
    };

    // Set height initially
    updateHeaderHeight();
    // Update height on window resize
    window.addEventListener("resize", updateHeaderHeight);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);
  return (
    <div
      className="hero-slider -carousel  -style-one"
      style={{ background: "" }}
    >
      <div
        className="container-fluid"
        style={{
          height: headerHeight,
          backgroundImage: `url(${
            process.env.NEXT_PUBLIC_URL +
            "/assets/images/aboutPage/soleHeader.png"
          })`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
      ></div>

      <div
        style={{
          paddingTop: "120px",
          paddingBottom: "120px",
        }}
        className="container-fluid"
      >
        <Container>
          <div className="about-story">
            <Row gutter={40}>
              <Col xs={24} sm={12}>
                <div className="about-story__content">
                  <SectionTitle title="The Story About Us" className="-left " />
                  <p>
                    We pride ourselves on delivering innovative storage
                    solutions that not only saves space but also enhances
                    aesthetic appeal of your home and office. With a backdrop in
                    architecture and interior design and a passion for
                    functional aesthetic,Miti recognizes the need for high
                    quality,space saving storage solutions that seamleassly
                    blend form and function.
                  </p>
                  <p>
                    Every product in our collection is thoughtfully designed and
                    rigorously tested to ensure it meets the highest standard of
                    durability and style.
                  </p>
                  <p>
                    Our commitment to innovation,quality and sustainability is
                    at the core of everything we do.
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
          </div>
        </Container>
      </div>
    </div>
  );
}

export default React.memo(HeroSliderAbout);
