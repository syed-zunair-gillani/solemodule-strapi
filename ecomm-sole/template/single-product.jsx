"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "antd";

// import {
//   fetchProductDetailRequest,
//   fetchSoleProductDetailRequest,
// } from "../../../ redux/actions/shopActions";
import LayoutOne from "@/components/layout/LayoutOne";
import ProductDetailLayout from "@/components/detail/product/ProductDetailLayout";
import Container from "@/components/other/Container";
import { fetchWooCommerceProducts } from "@/services/wooComm";
import ShopSidebar from "@/components/shop/ShopSidebar";

const SingleProductTemp = ({data}) => {
  const dispatch = useDispatch();
  const params = useParams();
  const { slug } = params;
  console.log("params -------", slug);
  const [selectedProds, setSelectedProds] = useState(data);
  //   const shopState = useSelector((state) => state.shopReducer);
  //   const { productDetail, soleProductDetail, soleModuleProducts } = shopState;

  //   useEffect(() => {
  //     dispatch(fetchProductDetailRequest(slug));
  //     dispatch(fetchSoleProductDetailRequest(slug));
  //     // selectedProduct = soleModuleProducts.find(
  //     //   (product) => product.slug === slug
  //     // );

  //     setSelectedProds(
  //       soleModuleProducts.data.find((product) => product.slug === slug)
  //     );
  //   }, []);

  useEffect(() => {
    setSelectedProds(data)
  }, []);

  return (
    <LayoutOne title="Product detail">
      <div className="product-detail">
        <Container>
          <Row>
            {/* <Col xs={24} md={6}>
              <ShopSidebar showShortcut />
            </Col> */}
            <Col offset={1} xs={48}>
              {selectedProds && <ProductDetailLayout data={selectedProds} />}
            </Col>
          </Row>
        </Container>
      </div>
      {/* <Container>
        <PartnerOne />
      </Container> */}
    </LayoutOne>
  );
};

export default SingleProductTemp;
