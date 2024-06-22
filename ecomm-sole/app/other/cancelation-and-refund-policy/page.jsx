"use client";
import { Breadcrumb, Row, Col, Button, Form, Input } from "antd";
import React from "react";
import LayoutOne from "../../../components/layout/LayoutOne";
import Container from "../../../components/other/Container";
import IntroductionFive from "../../../components/sections/introduction/IntroductionFive";
import introductionData from "../../../data/sections/dale-of-week.json";
import data1 from "../../../data/pages/aboutSole.json";
import Link from "next/link";

function CancelationAndRefund() {
  const cancelationAndRefund = {
    paragraph: "TERMS FOR CANCELLATION, RETURN AND REFUND OF ORDERS",
    pointers: [
      {
        pointHeader: "Cancellation of Products",
        pointDescription: null,
        points: [
          {
            point: `You can cancel orders for Products partially or fully prior to the shipment of the Products is initiated. Orders cannot be cancelled once the Product has been shipped.`,
            deepPoints: null,
          },
          {
            point: `In case you change your mind in relation to a particular order of the Products, you may cancel the placed purchase order, by referencing the unique tracking identity number (which enables the User in tracking the status of delivery of the purchased Products) received by you from us and requesting us to process a cancellation by sending an email to Urban Ladder`,
            deepPoints: null,
          },
          {
            point: `On receipt of the cancellation, we shall cancel the order and initiate the refund for the Products within 7 (Seven) business days from the receipt of the cancellation request from you or pick up of the products, if applicable. The amount shall be refunded to you through the same mode of payment used by you for the purchase. All refunds shall be subject to applicable policies and charges of the User’s bank/ financial institution.`,
            deepPoints: null,
          },
          {
            point: `The cancellation policies mentioned here do not apply to certain pin codes. To know the specific cancellation policy for your delivery location, please enter your pin code in the box provided on the SOLE MODULE PLATFORM.`,
            deepPoints: null,
          },
          {
            point: `The Product specific cancellation policy will be mentioned on the product listing page. The cancellation policy for third party Products will be mentioned on such Product listing page.`,
            deepPoints: null,
          },
        ],
      },
      {
        pointHeader: "Refund",
        pointDescription: null,
        points: [
          {
            point: `At the time of raising a request for return or cancelling the Products on the SOLE MODULE PLATFORM, you may seek refund for the Product. Such refund will be made to the you only in the event the payment has been received by us for the Product.`,
            deepPoints: null,
          },
          {
            point: `Please be informed that when you opt to cancel or return the Products, upon our verification and assessment of the Products and the documents relating thereto, the refund amount for such Products which are eligible for return as per the terms of this Policy, will be processed within a period of 7 (Seven) business days from the date of us verifying the defect or the non-compliance in the Product. Your refund will be processed only when the conditions as may be stipulated by us are fulfilled, such as the Product being returned in original condition, along with the price tag intact including original packaging of the product, the brand outer packaging of the Product and all accessories therein. For the sake of abundant clarity, it is clarified that we shall not make any refund in respect of a Product that is deemed ineligible for a refund based on our verification and assessment. The refund amount will be credited to the original payment mode opted by you. You acknowledge that after initiation of refund, it may take additional time for your refund to reflect in your account which is subject to your financial institution or payment solution provider terms and conditions.`,
            deepPoints: null,
          },
          {
            point: `We do not make any cash refunds. The amount will be refunded to you within 7 (Seven) working days depending upon the mode of payment chosen by you. Sometimes banks or financial intermediaries take a longer time to process the refund request. However, if the refund does not happen by the date advised, you may contact us, and we will gladly help you.`,
            deepPoints: null,
          },
          {
            point: `Refund to be made to the User shall not include any amount paid towards shipping charges or any other such charges applicable from time to time. However, in the event a Product has been delivered with a defect or damage (for reasons attributable to, and accepted by us after due verification at its sole discretion) we may refund the shipping charges to you. You will be provided with a refund if you have received a non-returnable Product in a damaged or defective condition subject to verification and examination of the damage or defect of the Product by us.`,
            deepPoints: null,
          },
          {
            point: `We reserve the right to reject a refund request for a Product, if it does not satisfy the quality conditions specified under this Policy on our assessment pursuant to its return. We may in such cases notify you and send the returned Product back without initiating a refund.`,
            deepPoints: null,
          },
        ],
      },
    ],
  };

  const items = [
    {
      route: "/",
      title: "Home",
      icon: <i className="fas fa-home" />,
    },

    {
      title: "Cancelation & Refund Policy",
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
    <LayoutOne title="Cancelation & Refund Policy">
      <Container>
        <Breadcrumb separator=">" itemRender={itemRender} items={items} />
      </Container>
      <div className="about ">
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
                    Cancelation & Refund Policy
                  </h1>
                </Row>
              </Container>
            </div>
          </div>
        </Container>

        <Container>
          <div className="">
            {cancelationAndRefund.pointers &&
              cancelationAndRefund.pointers.map((pointer, index1) => (
                <Row gutter={40} style={{ paddingTop: "30px" }}>
                  <h2 className="display-3">{`${index1 + 1}.  ${
                    pointer.pointHeader
                  }`}</h2>
                  {pointer.pointDescription && (
                    <p>{pointer.pointDescription}</p>
                  )}
                  <ul
                    className="container"
                    style={{ fontSize: "18px", listStyleType: "none" }}
                  >
                    {pointer.points &&
                      pointer.points.map((point, index2) => (
                        <>
                          <li style={{ paddingTop: "20px" }}>{`${index1 + 1}.${
                            index2 + 1
                          }. ${point.point}`}</li>
                          <ul
                            className="container"
                            style={{
                              fontSize: "18px",
                              listStyleType: "none",
                              paddingTop: "20px",
                            }}
                          >
                            {point.deepPoints &&
                              point.deepPoints.map((deepPoint, index3) => (
                                <li style={{ paddingTop: "10px" }}>{`${
                                  index1 + 1
                                }.${index2 + 1}.${
                                  index3 + 1
                                }. ${deepPoint}`}</li>
                              ))}
                          </ul>
                        </>
                      ))}{" "}
                  </ul>
                </Row>
              ))}
          </div>
        </Container>
      </div>
    </LayoutOne>
  );
}

export default React.memo(CancelationAndRefund);
