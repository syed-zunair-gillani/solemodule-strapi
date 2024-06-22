"use client";
import React from "react";
import { Breadcrumb } from "antd";

import LayoutOne from "../../../components/layout/LayoutOne";
import Container from "../../../components/other/Container";
import ShopOrderStep from "../../../components/shop/ShopOrderStep";
import PartnerOne from "../../../components/sections/partners/PartnerOne";
import Benefits from "../../../components/other/Benefits";
import Link from "next/link";

function OrderComplete() {
  const items = [
    {
      route: "/",
      title: "Home",
      icon: <i className="fas fa-home" />,
    },

    {
      title: "Order Complete",
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
    <LayoutOne title="Order Complete">
      <Container>
        <Breadcrumb separator=">" itemRender={itemRender} items={items} />

        <ShopOrderStep current={3} />
        <div className="order-complete">
          <h1>
            Congratulation! You’ve <span>completed</span> payment
          </h1>
        </div>
        <Benefits threeCol className="-bordered" />
        <PartnerOne />
      </Container>
    </LayoutOne>
  );
}

export default OrderComplete;
