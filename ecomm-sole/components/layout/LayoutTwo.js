import React from "react";
import Head from "next/head";
import { BackTop, FloatButton } from "antd";

import HeaderTwo from "../header/HeaderTwo";
import withHeaderScroll from "../../common/withHeaderScroll";
import FooterFluid from "../footer/FooterFluid";

const ScrolledHeader = withHeaderScroll(HeaderTwo);

function LayoutOne({ title, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ScrolledHeader />
      {children}
      <FooterFluid />
      <FloatButton.BackTop />
    </>
  );
}

export default React.memo(LayoutOne);
