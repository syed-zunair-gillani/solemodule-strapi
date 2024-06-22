import React from "react";
import Link from "next/link";
import { Row, Col } from "antd";

import footerLinks from "../../../data/footer-links.json";
import FooterInfomation from "./FooterInfomation";
import SocialIcons from "@/components/other/SocialIcons";

function FooterQuickLinks({ colSize }) {
  return (
    <div className="footer-links">
      <Row justify="space-between">
        <Col lg={8} md={8}>
          <div className="footer-links__group">
            <h5>{"About Us"}</h5>

            <p>
              From cluttered chaos to an oasis of order, we undertake a holistic
              approach to rejuvenate your living environment. From sorting and
              decluttering to optimizing storage solutions, we address every
              aspect of organization.
            </p>
            <SocialIcons
              type="secondary"
              shape="circle"
              className="-btn-light"
            />
          </div>
        </Col>
        {footerLinks.map((item, index) => (
          <Col key={index} lg={5} md={5}>
            <div className="footer-links__group">
              <h5>{item.title}</h5>
              <ul>
                {item.items.map((link, index) => (
                  <li key={index}>
                    <Link legacyBehavior href={link.href}>
                      <a> {link.title}</a>
                    </Link>{" "}
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        ))}
        <Col lg={4} md={4}>
          <div className="footer-links__group">
            <h5>{"Follow Us"}</h5>
            <img
              style={{ maxWidth: "120px" }}
              src={process.env.NEXT_PUBLIC_URL + "/assets/images/instaCode.png"}
            />
          </div>
        </Col>

        <Col lg={6} md={6}>
          <FooterInfomation />
        </Col>
      </Row>
    </div>
  );
}

export default React.memo(FooterQuickLinks);
