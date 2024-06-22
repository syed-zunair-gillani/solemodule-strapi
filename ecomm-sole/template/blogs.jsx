"use client";
import { Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutOne from "@/components/layout/LayoutOne";
import Post from "@/components/post/Post";

import Container from "@/components/other/Container";
import data from "@/database.json";
import Link from "next/link";

export default function BlogTemp({blogsData}) {

  const items = [
    {
      route: "/",
      title: "Home",
      icon: <i className="fas fa-home" />,
    },

    {
      title: "Blog",
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
    <LayoutOne title="Blog masonry">
      <Container>
        <Breadcrumb separator=">" itemRender={itemRender} items={items} />
        <div className="blog-masonry">
          <div className="blog-masonry-content">
            {blogsData?.map((item) => (
              <div className="blog-masonry-content__item" xs={24} md={12}>
                <Post className="-release-height" data={item?.attributes} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </LayoutOne>
  );
}
