"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumb, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";

// import {
//   fetchPostDetailRequest,
//   fetchRecentPostsRequest,
// } from "../../../redux/actions/blogActions";
import LayoutOne from "@/components/layout/LayoutOne";
import Container from "@/components/other/Container";
// import BlogSidebar from "../../../components/blog/BlogSidebar";
import PostDetailLayout from "@/components/detail/post/PostDetailLayout";
// import FetchDataHandle from "../../../components/other/FetchDataHandle";
// import PartnerOne from "../../../components/sections/partners/PartnerOne";
import data from "@/database.json";
import Link from "next/link";

function SingleBlogPostTemp({data}) {
    console.log("🚀 ~ SingleBlogPostTemp ~ data:", data)
  const dispatch = useDispatch();
  const router = useRouter();
  //   const { slug } = router.query;
  //   const blogState = useSelector((state) => state.blogReducer);
  //   const { postDetail, recentPosts } = blogState;
  //   useEffect(() => {
  //     dispatch(fetchPostDetailRequest(slug));
  //     dispatch(fetchRecentPostsRequest({ limit: 4 }));
  //   }, []);

  //   useEffect(() => {
  //     console.log("detail of blogs here1", blogState);
  //     console.log("detail of blogs here2", data);
  //   }, [blogState, data]);
  const items = [
    {
      route: "/",
      title: "Home",
      icon: <i className="fas fa-home" />,
    },
    {
      route: "/other/blog",
      title: "Blogs",
      // icon: <i className="fas fa-home" />,
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
    <LayoutOne title="Post detail">
      <Container>
        <Breadcrumb separator=">" itemRender={itemRender} items={items} />

        <div className="blog-detail">
          <Row gutter={30}>
            {/* <Col xs={24} lg={6}>
              <BlogSidebar recentPostsData={recentPosts} />
            </Col> */}
            <Col xs={24} lg={24}>
              <PostDetailLayout data={data} />
            </Col>
          </Row>
        </div>
        {/* <PartnerOne /> */}
      </Container>
    </LayoutOne>
  );
}

export default SingleBlogPostTemp;