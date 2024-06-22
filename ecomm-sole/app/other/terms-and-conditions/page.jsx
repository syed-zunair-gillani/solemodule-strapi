"use client";
import { Breadcrumb, Row, Col, Button, Form, Input } from "antd";
import React from "react";
import LayoutOne from "../../../components/layout/LayoutOne";
import Container from "../../../components/other/Container";
import IntroductionFive from "../../../components/sections/introduction/IntroductionFive";
import introductionData from "../../../data/sections/dale-of-week.json";
import data1 from "../../../data/pages/aboutSole.json";
import Link from "next/link";

function TermsAndConditions() {
  const termsAndConditions = {
    paragraph:
      "The terms and conditions for usage of the Sole Module Platform, as set out herein (“Terms of Use”) specifically govern your access and use of the Sole Module Platform, which provides a forum for you to inter alia enable you to discover, select and buy Products listed on Sole Module Platform at the indicated price at any time, from the locations serviceable by us.",
    pointers: [
      {
        pointHeader: "",
        pointDescription: null,
        points: [
          {
            point: `Please note that we may from time to time change the Terms of Use that govern your use of the Sole Module Platform. Every time you wish to use our Sole Module Platform, please check these Terms of Use to ensure you understand the terms and conditions that apply at that time. Further, please note that we reserve the right to either change the format and the content of the Sole Module Platform or suspend the operation of the Sole Module Platform for support or maintenance work, in order to update the content or for any other reason, at any time.`,
            deepPoints: null,
          },
          {
            point: `Any accessing, browsing, or otherwise indicates your agreement to these Terms of Use, the privacy policy of the Sole Module Platform and any other policies or guidelines that may be applicable on the Sole Module Platform at the time of your access and usage of the Sole Module Platform and which may be updated from time to time (collectively, the “Agreement”).`,
            deepPoints: null,
          },
          {
            point: `We authorise you to view and access the Sole Module Platform solely for identifying Products, carrying out purchases of Products and processing returns and refunds, in accordance with Return and Refund Policy, therefore, grant you a limited, revocable permission to access and use the Services.`,
            deepPoints: null,
          },
          {
            point: `By accepting this Agreement, you affirm that you are 18 (Eighteen) years of age or above and are fully competent to enter into this Agreement, and to abide by and comply with this Agreement. If a user is below 18 (Eighteen) years of age, it is assumed that he/she is using/browsing the Sole Module Platform under the supervision of his/her parent or legal guardian and that such user’s parent or legal guardian has read and agrees to the terms of this Agreement, including terms of purchase of Products on behalf of the minor user. In the event we are made aware that a user is under the age of 18 and is using/browsing the Sole Module Platform without the supervision of his/her parent or legal guardian, we reserve the right to deactivate such user’s account without further notice. Further, if you are using the Services on behalf of a company or organisation, you represent that you have authority to act on behalf of that entity, and that such entity accepts this Agreement.`,
            deepPoints: null,
          },
        ],
      },
      {
        pointHeader: "REGISTRATION OF YOUR ACCOUNT",
        pointDescription: null,
        points: [
          {
            point: `In order to purchase Products on the Sole Module  and/or avail the Services, you may choose to register on the Sole Module  or checkout as a guest. Registration is a one-time process. You will be eligible to further access and avail the Services upon receipt of a confirmation e-mail from us after filling in the necessary forms and after providing the necessary details as may be required by us at the time of your registration.`,
            deepPoints: null,
          },
          {
            point: `You are solely authorized to operate the account created by you. Consequently, it is your responsibility to maintain the confidentiality of the log in credentials of your account on the Sole Module  and for restricting access to your computer/mobile/other similar devices to prevent unauthorized access to your account. You shall remain solely liable for all the actions undertaken through your account.`,
            deepPoints: null,
          },
          {
            point: `You will: (a) immediately inform us of any unauthorized use of the account or any other security breach; and (b) ensure that you log out of your account at the end of each session. We, our employees, agents, directors and officers will not be liable for any loss or direct or indirect damage arising from your failure to comply with these Terms of Use. You may be held liable for any losses incurred to us or any other user due to unauthorized use of their account by you. We reserve the right to refuse access to the Sole Module , terminate accounts, remove or edit content at any time without notice to you`,
            deepPoints: null,
          },
        ],
      },
      {
        pointHeader: "COMMUNICATION AND UNSUBSCRIPTION",
        pointDescription: null,
        points: [
          {
            point: `By accepting the Terms of Use, you also accept to receive news, updates, offers/ campaign related SMS, to the mobile phone number provided by you. By accessing and using the Sole Module  and/ or verifying your contact number with us, you explicitly consent to receive such communications (through call, SMS, email or other digital and electronic means) from us and/or our authorized representatives regarding any new services or offerings, even if your contact number is registered under the DND/NCPR list under the Telecom Commercial Communications Customer Preference Regulations, 2018.`,
            deepPoints: null,
          },
          {
            point: `You can unsubscribe/ opt-out from receiving marketing/ promotional communications, newsletters and other notifications from us at any time by following the instructions set out in such communications.`,
            deepPoints: null,
          },
        ],
      },
      {
        pointHeader: "DISCLAIMER OF WARRANTIES, INACCURACIES OR ERRORS",
        pointDescription: null,
        points: [
          {
            point: `We will try to ensure that all information and recommendations, whether in relation to the Products, Services, offerings or otherwise (hereinafter “Information”) provided as part of this Sole Module  is correct at the time of inclusion on the Sole Module . We do not guarantee the accuracy of the Information. We make no representations or warranties as to the completeness or accuracy of Information.`,
            deepPoints: null,
          },
          {
            point: `You agree that Information is being supplied to you on the condition that you will make your own determination as to the suitability of such information for your purpose prior to use or in connection with the making of any decision. No Information on the Sole Module  shall constitute an invitation to invest in us or any affiliates. Any use of this Sole Module  or the Information is at your own risk. Neither we, our affiliates, nor their officers, employees or agents shall be liable for any loss, damage or expense arising out of any access to, use of, or reliance upon, this website, the Information, or any third-party website linked to this Sole Module . We are not responsible for the content of any third-party sites and do not make any representations regarding the content or accuracy of material on such sites. If you decide to access links of any third-party platforms, you are doing so entirely at your own risk and expense.`,
            deepPoints: null,
          },
          {
            point: `As means to assist the users in identifying the Products of their choice, we provide visual representations on the Sole Module  including graphics, illustrations, photographs, images, videos, charts, screenshots, infographics and other visual aids. While reasonable efforts are made to provide accurate visual representation, we disclaim any guarantee or warranty of exactness of such visual representation or description of the Product, with the actual Product ultimately delivered to users. The appearance of the Product when delivered may vary for various reasons.`,
            deepPoints: null,
          },
          {
            point: `Nothing contained herein is to be construed as a recommendation to use any Product, process, equipment or formulation, in conflict with any patent, or otherwise and we make no representation or warranty, express or implied that, the use thereof will not infringe any patent, or otherwise.`,
            deepPoints: null,
          },
          {
            point: `We do not covenant or provide any representations and warranties`,
            deepPoints: [
              `in respect of quality, suitability, accuracy, reliability, performance, safety, merchantability, fitness for a particular purpose/consumption or the content (including Product or pricing information and/or specifications) on Sole Module `,
              `that the Services will be made available at all times; and`,
              `that the operation of the Sole Module , including the functions contained in any content, information and materials on the Sole Module  or any third-party sites or services linked to the Sole Module  will be uninterrupted, or that the defects will be rectified, or that Sole Module  or the servers that make such content, information and materials available are free of viruses or other harmful components.`,
            ],
          },
          {
            point: `This Sole Module  and the services are provided to you on an “as is” and “where-is” basis, without any representations or warranties. we, for ourselves and any third-party providing materials, services, or content to this website, make no representations or warranties, either express, implied, statutory or otherwise of merchantability, fitness for a particular purpose, or non-infringement of third-party rights, with respect to the Sole Module , the information or any products or services to which the information refers. we will not be liable to you or any third party for any damages of any kind, including but not limited to, direct, indirect, incidental, consequential or punitive damages, arising from or connected with the site, including but not limited to, your use of this site or your inability to use the site, even if we have previously been advised of the possibility of such damages.`,
            deepPoints: null,
          },
          {
            point: `Disclaimer -To the extent permitted by applicable law, we, our officers, agents, employees and directors, disclaim any liability against any loss, damage, expenses, liabilities, claim, injury caused due to the failure of performance, omission, defect of products, or deletion, interruption, error, delay, virus, communication, unauthorised access, theft, destruction, alteration or use of records on the Sole Module .`,
            deepPoints: null,
          },
        ],
      },
      {
        pointHeader: "AVAILIBILITY AND ACCESIBILITY OF SOLE MODULE ",
        pointDescription: null,
        points: [
          {
            point: `We control and operate this Sole Module  from India and make no representation that the materials and the content available on the Sole Module  are appropriate to be used or will be available for use in other locations outside India. If you use this Sole Module  from outside India, you are entirely responsible for compliance with all applicable local laws. These Terms of Use do not constitute, nor may these Terms of Use be used for or in connection with any promotional activities or solicitation by anyone in any jurisdiction in which such promotional activities or solicitation are not authorized or to any person to whom it is unlawful to promote or solicit.`,
            deepPoints: null,
          },
          {
            point: `We have several websites offering Products, Services, content and various other functionalities to specific regions worldwide. The Services offered in one region may differ from those in other regions due to availability, local or regional laws, shipment and other considerations. We do not make any warranty or representation that a user in one region may obtain the Services from our site in another region and we may cancel a user's order or redirect a user to the site for that user’s region if a user attempts to order Services offered on a site in another region.`,
            deepPoints: null,
          },
          {
            point: `Information that we publish on the world wide web may contain references or cross references to our Products, programs and Services that are not announced or available in your country. Such references do not imply that we intend to announce such Products, programs or Services in your country. Consult our local business contact for information regarding the Products, programs and Services that may be available to you.`,
            deepPoints: null,
          },
          {
            point: `We constantly monitor the user’s account in order to avoid fraudulent accounts and transactions. Users with more than one account or availing referral vouchers fraudulently shall be liable for legal actions under law and we reserve the right to recover the cost of goods, collection charges and lawyer fees from persons using the Sole Module  fraudulently. We reserve the right to initiate legal proceedings against such persons for fraudulent use of the Sole Module  and any other unlawful acts or omissions in breach of these terms and conditions. In the event of detection of any fraudulent or declined transaction, prior to initiation of legal actions, we reserve the right to immediately delete such account and dishonour all past and pending orders without any liability. For the purpose of this clause, we shall owe no liability for any refunds.`,
            deepPoints: null,
          },
        ],
      },
      {
        pointHeader: "THIRD PARTY INTERACTION AND LINKS TO THIRD PARTY SITES",
        pointDescription: null,
        points: [
          {
            point: `In your use of the Sole Module , you may enter into correspondence with, purchase goods and/or services from, or participate in promotions of advertisers or members or sponsors of Sole Module  or access any other third-party website linked to the Sole Module . Unless otherwise stated, any such correspondence, advertisement, purchase or promotion, including the delivery of and the payment for goods and/or services, and any other term, condition, warranty or representation associated with such correspondence, purchase or promotion, is solely between you and the applicable third party. You agree that we have no liability, obligation or responsibility for any such correspondence, purchase or promotion, access or usage of any third-party website and the contract under such instances remains between you and any such third party.`,
            deepPoints: null,
          },
        ],
      },
      {
        pointHeader: "LICENSE AND USE OF YOUR CONTENT",
        pointDescription: null,
        points: [
          {
            point: `You grant to us a royalty-free, perpetual, irrevocable, non-exclusive right and license to adopt, publish, reproduce, disseminate, transmit, distribute, copy, use, create derivative works from, display worldwide, or act on any material posted by you on the platform without additional approval or consideration in any form, media, or technology now known or later developed, for the full term of any rights that may exist in such content, and you waive any claim over all feedback, comments, ideas or suggestions or any other content provided through or on the Sole Module . You agree to perform all further acts necessary to perfect any of the above rights granted by you to us, including the execution of deeds and documents, at its request.`,
            deepPoints: null,
          },
          {
            point: `You agree that we do not routinely monitor your postings on the Sole Module  but reserve the right to do so. However, if we become aware of inappropriate use of Sole Module  or any of its Services, we will respond in any way that, in its sole discretion, we deem appropriate. You acknowledge that we will have the right to report to law enforcement authorities of any actions that may be considered illegal, as well as any information it receives of such illegal conduct. When requested, we will co-operate fully with law enforcement agencies in any investigation of alleged illegal activity on the internet.`,
            deepPoints: null,
          },
          {
            point: `Submissions and unauthorised use of any materials contained on the Sole Module  may violate copyright laws, trademark laws, the laws of privacy and publicity, certain communications statutes and regulations and other applicable laws and regulations. You alone are responsible for your actions or the actions of any person using your username and/or password. As such, you shall indemnify and hold us and our officers, directors, employees, affiliates, agents, licensors, and business partners harmless from and against any and all loss, costs, damages, liabilities, and expenses (including attorneys' fees) incurred in relation to, arising from, or for the purpose of avoiding, any claim or demand from a third party that your use of the platform or the use of the platform by any person using your user name and/or password (including without limitation your participation in the posting areas or your Submissions) violates any applicable law or regulation, or the rights of any third party.`,
            deepPoints: null,
          },
          {
            point: `We reserve the right to terminate access to this platform at any time and without notice. Further this limited license terminates automatically, without notice to you, if you breach any of these Terms of Use. Upon termination, you must immediately destroy any downloaded and printed materials. Any provision of the Terms of Use which imposes an obligation or creates a right that by its nature will be valid after termination or expiration of the Terms of Use shall survive the termination or expiration of the Terms of Use.`,
            deepPoints: null,
          },
        ],
      },
      {
        pointHeader: "USER WARRANTIES AND RESTRICTIONS",
        pointDescription: null,
        points: [
          {
            point: `You represent and warrant that: (a) your use of Sole Module  and/or Services will not violate any applicable law or regulation; (b) all information that is submitted to us in connection with Sole Module  and/or Services is true, accurate and lawful; (c) use of the content and material you supply does not breach any applicable Agreement and will not cause injury to any person or entity (including that the content or material is not defamatory). If at any time, the information provided by you is found to be false or inaccurate, we will have the right to reject registration, cancel all orders, and restrict you from using the Services and other affiliated services in the future without any prior intimation whatsoever. You agree to indemnify us and our affiliates for all claims brought by a third party against it or its affiliates arising out of or in connection with a breach of any of these warranties.`,
            deepPoints: null,
          },
          {
            point: `You will use Sole Module  for lawful purposes only and will not undertake any activity that is harmful to Sole Module  or its content or otherwise not envisaged through the Sole Module . You have a limited license to access and use Sole Module , solely for the purpose of availing the Services, subject to these Terms of Use.`,
            deepPoints: null,
          },
          {
            point: `You will not do any of the following`,
            deepPoints: [
              `Delete or modify any content on Sole Module , such as any information regarding the Services, their performance, sales or pricing`,
              `Use any engine, software, tool, agent or other mechanism (such as spiders, robots, avatars, worms, time bombs etc.) to navigate or search Sole Module `,
              `Make false or malicious statements against the Services;`,
              `Post, copy, submit, upload, distribute, or otherwise transmit or make available any software or other computer files that contain a virus or other harmful component, or otherwise disrupt or damage Sole Module  and/or Services or any connected network, or otherwise interfere with any person or entity’s use or enjoyment of Sole Module  and/or the Services;`,
              `Probe, scan, or test the vulnerability of any system, security or authentication measures implemented by us or otherwise tamper or attempt to tamper with our technological design and architecture;`,
              `Hack into or introduce malicious software of any kind onto Sole Module ;`,
              `Gain unauthorized access to, or interfere with, or damage, or disrupt the server on which the details connected to the Services are stored, or any other server, computer, or database connected to the Services; or`,
              `Engage in any form of antisocial, disruptive, or destructive acts, including “flaming,” “spamming,” “flooding,” “trolling,”, “phishing” and “griefing” as those terms are commonly understood and used on the internet.`,
            ],
          },
          {
            point: `You are prohibited from hosting, displaying, uploading, modifying, publishing, transmitting, updating or sharing on or through Sole Module , any information that:`,
            deepPoints: [
              `Belongs to another person and to which you do not have any right;`,
              `is harmful, harassing, blasphemous, defamatory, obscene, pornographic, paedophilic, invasive of another’s privacy, hateful, relating to or encouraging money laundering or gambling, or otherwise harmful in any manner whatsoever;`,
              `harms minors in any way;`,
              `infringes any patent, trademark, copyright or other proprietary rights;`,
              `violates any law for the time being in force;`,
              `deceives or misleads the addressee about the origin of such messages or communicates any information which is grossly offensive or menacing in nature;`,
              `impersonates or defames another person; or`,
              `contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer resource.`,
            ],
          },
        ],
      },
      {
        pointHeader: "INDEMNIFICATION AND LIMITATION OF LIABILITY",
        points: null,
        pointDescription: `You agree to indemnify, defend and hold harmless us, our affiliates, officers, directors, employees, consultants, licensors, agents, and representatives from and against any and all third- party claims, losses, liabilities, damages, and/or costs (including reasonable attorney fees and costs) arising from your access to or use of Sole Module  or the Services, violation of these Terms of Use, or infringement of any of our or any third-party intellectual property or other rights. We will notify you promptly of any such claim, loss, liability, or demand, and in addition to the foregoing, you agree to provide us with reasonable assistance, at your expense, in defending any such claim, loss, liability, damage, or cost.`,
      },
      {
        pointHeader: "WAIVER",
        points: null,
        pointDescription: `No provision in these Terms of Use will be deemed waived and no breach excused, unless such waiver or consent is in writing and signed by us. Any consent by us to, or waiver of your breach, whether expressed or implied, will not constitute consent to, waiver of, or excuse for any other different or subsequent breach.`,
      },
      {
        pointHeader: "SEVERABILITY",
        points: null,
        pointDescription: `If any provision of these Terms of Use is held by a court of competent jurisdiction to be unenforceable under applicable law, then such provision will be excluded from these Terms of Use and the remainder of these Terms of Use will be interpreted as if such provision were so excluded and will be enforceable in accordance with its terms; provided however that, in such event, these Terms of Use will be interpreted so as to give effect, to the greatest extent consistent with and permitted by applicable law, to the meaning and intention of the excluded provision as determined by such court of competent jurisdiction.`,
      },
      {
        pointHeader: "AMENDMENT",
        points: null,
        pointDescription: `These Terms of Use are subject to amendments and modifications and may be updated from time to time, without any advance notice. You are requested to regularly review the Terms of Use as available on Sole Module . Your relationship with the Sole Module  will be governed by the most current version of these Terms of Use, as published on Sole Module .`,
      },
      {
        pointHeader: "MISCELLANEOUS",
        pointDescription: null,
        points: [
          {
            point: `In addition to these Terms of Use, you will also ensure that you are in compliance with the terms and conditions of the third parties, such as bank offers terms and conditions, brand promotional offers, whose links, if any, are contained/embedded in the Services. You agree that we will not be liable for any transaction between itself and any such third parties.`,
            deepPoints: null,
          },
          {
            point: `These Terms of Use supersede all previous oral and written terms and conditions (if any) communicated to you by us, for the use of Sole Module , and the rights and liabilities with respect to any Services to be provided by us shall be limited to the scope of these Terms of Use.`,
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
      title: "Terms & Condtions",
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
    <LayoutOne title="Tearm And Conditions">
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
                    Terms & Conditions
                  </h1>
                </Row>
              </Container>
            </div>
          </div>
        </Container>

        <Container>
          <h3 className="display-4" style={{ paddingTop: "20px" }}>
            {termsAndConditions.paragraph}
          </h3>
          {termsAndConditions.pointers &&
            termsAndConditions.pointers.map((pointer, index1) => (
              <Row gutter={40} style={{ paddingTop: "30px" }}>
                <h2 className="display-3">{`${index1 + 1}.  ${
                  pointer.pointHeader
                }`}</h2>
                {pointer.pointDescription && <p>{pointer.pointDescription}</p>}
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
                              }.${index2 + 1}.${index3 + 1}. ${deepPoint}`}</li>
                            ))}
                        </ul>
                      </>
                    ))}{" "}
                </ul>
              </Row>
            ))}
        </Container>
      </div>
    </LayoutOne>
  );
}

export default React.memo(TermsAndConditions);
