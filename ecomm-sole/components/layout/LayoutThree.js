import React from "react";
import Head from "next/head";
import { FloatButton } from "antd";

import HeaderThree from "../header/HeaderThree";
import withHeaderScroll from "../../common/withHeaderScroll";
import Footer from "../footer/Footer";

const ScrolledHeader = withHeaderScroll(HeaderThree);

function LayoutOne({ title, children, headerClass, footerClass }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ScrolledHeader className={headerClass} />
      {children}
      <Footer className={footerClass} />
      <FloatButton.BackTop />
    </>
  );
}

export default React.memo(LayoutOne);
