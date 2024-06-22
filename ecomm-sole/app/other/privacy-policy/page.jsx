"use client";
import { Breadcrumb, Row, Col, Button, Form, Input } from "antd";
import React from "react";
import LayoutOne from "../../../components/layout/LayoutOne";
import Container from "../../../components/other/Container";
import IntroductionFive from "../../../components/sections/introduction/IntroductionFive";
import introductionData from "../../../data/sections/dale-of-week.json";
import data1 from "../../../data/pages/aboutSole.json";
import Link from "next/link";

function PrivacyPolicy() {
  const cancelationAndRefund = {
    paragraph:
      "[These terms form part of the Terms & Conditions relating to access of the website including the mobile applications. For other terms, kindly refer to Terms & Conditions’ section] ",
    pointers: [
      {
        pointHeader: "",
        pointDescription: null,
        points: [
          {
            point: `Solemodule.com and its mobile applications are defined as "Website" 
            Sole Enterprises is defined as “Company”, “We”, “Our” or “Us”
            User of website/mobile applications is defined as “You” or “Your”
            `,
            deepPoints: null,
          },
          {
            point: `To better protect Your privacy, We provide this policy explaining Our online information practices and the choices You can make about the way Your information is collected and used.`,
            deepPoints: null,
          },
          {
            point: `By visiting this Website, You express Your consent to Our Terms & Conditions including the Privacy Policy. If You do not agree to Our Terms & Conditions or Privacy Policy, please do not use or access Our Website.  `,
            deepPoints: null,
          },
          {
            point: `Our privacy policy is subject to change at any time without notice. Please visit this page periodically to stay up to date with any changes.`,
            deepPoints: null,
          },
        ],
      },
      {
        pointHeader: "Collection of personal information",
        pointDescription: null,
        points: [
          {
            point: `When You use this Website, We only collect and store the information provided by You from time to time. The primary purpose in collecting Your personal information is to optimize the user experience at the Website.`,
            deepPoints: null,
          },
          {
            point: `Regardless, You can browse through Our Website without informing Us who You are. We collect personally identifiable information such as name, phone number and email address and all information entered by You on Our Website when You place an order or setup an account or register for Our newsletter. Where possible We specify the fields, which are required, and which fields are optional.`,
            deepPoints: null,
          },
          {
            point: `Additionally, in operating Our Website, We may automatically collect and process certain data about You such as IP address, previous and next URL, location data and other communication data. We may use this information to do internal research on Our users' demographics, interests, and behavior to better understand, protect and serve Our user.`,
            deepPoints: null,
          },
          {
            point: `We also collect and process certain data about You such as information You may provide while filling up a form on Our Website, details of Your visits to Our Website and Your buying behavior when You transact on the Website. We also collect information when You send Us any communication/email about Your orders or queries relating thereto.`,
            deepPoints: null,
          },
          {
            point: `However, We do not collect any credit/debit card details or other payment information which is entered by You on a secured platform at the time of making the payment. We neither collect nor have access to Your Account password which is protected by a secured platform.`,
            deepPoints: null,
          },
        ],
      },
      {
        pointHeader: "Use of cookies",
        pointDescription: null,
        points: [
          {
            point: `Cookies are pieces of information saved by Your browser onto Your computer. Cookies are used to record various aspects of Your visit such as page flows, promotional campaign effectiveness, interest in collections, etc. We do not use cookies to save any Personal Information for outside use. Cookies can also help Us understand and provide information that is more targeted to Your interest. Most cookies are usually session cookies, which means that they are automatically deleted from Your storage drive at the end of each session. You are free to decline Our cookies if Your browser permits that feature. In that case, You might not be able to use some features on the Website and might be required to re-enter Your password frequently during each session.`,
            deepPoints: null,
          },
          {
            point: `We use Google Analytics to understand Our Website usage including geographic locations, user behavior, demographics and other information that can help Us identify user trends. Google Analytics is a web analysis service provided by Google. Google utilizes the data collected to track and examine the use of the Website, to prepare reports on its activities and share them with other Google services. Google may use the data collected to contextualize and personalize the ads of its own advertising network. More information on Google’s Privacy Policy can be found here – (https://www.google.com/intl/en/policies/privacy/). Users who do not want their data collected with Google Analytics can install the Google Analytics opt-out browser add-on.`,
            deepPoints: null,
          },
        ],
      },
      {
        pointHeader: "Use of collected information",
        pointDescription: null,
        points: [
          {
            point: `The Company owns all the information collected via the Website or applications installed on the Website. Information collected by the Website may be used to deliver Your product and services, process payments, communicate with You about Your order, Website related use, products, services, promotional offers, update Our records, generally maintain Your account with Us, display content such as wish lists and customer review and recommend merchandise and services that might be of interest to You.`,
            deepPoints: null,
          },
          {
            point: `We also use this information to monitor trends improve performance of Our platform, prevent or detect fraud or abuses of Our Website, to evaluate total number of visitors to the Website and to know the geographical locations of the users and overall provide You with a better shopping experience. This includes sending You emails regarding different offers or new promotions on the Website. You can choose to unsubscribe from such emails by clicking on ‘Unsubscribe’ on any marketing email You receive.`,
            deepPoints: null,
          },
        ],
      },
      {
        pointHeader: "Sharing of information",
        pointDescription: null,
        points: [
          {
            point: `We may share Your personal information with other corporate entities. These entities may market to You as a result of such sharing unless You explicitly opt-out.`,
            deepPoints: null,
          },
          {
            point: `Some of Your personal information may be shared with and used by third parties, such as payment gateways, delivery partners, vendors etc., who may need access to certain information to allow them and Us to perform Our duties to process and fulfill Your orders.`,
            deepPoints: null,
          },
          {
            point: `We reserve the right to share any of Your personal information to comply with the orders of subpoenas, court orders or other legal process. Your personal information may be disclosed pursuant to such subpoenas, court order or legal process, which shall be without notice to You.`,
            deepPoints: null,
          },
        ],
      },
      {
        pointHeader: "Security Precautions",
        pointDescription: null,
        points: [
          {
            point: `The Website has stringent security measures in place to protect the loss, misuse, and alteration of the information collected by Us. Whenever You change or access Your account information, We offer the use of a secure server. We adhere to strict security guidelines, protecting Your information against unauthorized access.`,
            deepPoints: null,
          },
          {
            point: `While We do not allow any unauthorized persons or organizations to use any information that We may collect through this Website, We are not responsible for any information collected or shared or used by any other website, due to Your computer or browser settings.`,
            deepPoints: null,
          },
          {
            point: `Please email Us to support@solemodule.com if You have any questions regarding Our privacy policy with the caption “Privacy Policy”.`,
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
      title: "Privacy Policy",
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
    <LayoutOne title="Privacy Policy">
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
                    Privacy Policy
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

export default React.memo(PrivacyPolicy);
