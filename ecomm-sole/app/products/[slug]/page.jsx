"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "antd";

// import {
//   fetchProductDetailRequest,
//   fetchSoleProductDetailRequest,
// } from "../../../ redux/actions/shopActions";
import LayoutOne from "../../../components/layout/LayoutOne";
import ProductDetailLayout from "../../../components/detail/product/ProductDetailLayout";
import Container from "../../../components/other/Container";
import { fetchWooCommerceProducts } from "@/services/wooComm";
import ShopSidebar from "@/components/shop/ShopSidebar";

function productDetail() {
  const dispatch = useDispatch();
  const params = useParams();
  const { slug } = params;
  console.log("params -------", slug);
  const [selectedProds, setSelectedProds] = useState(null);
  //   const shopState = useSelector((state) => state.shopReducer);
  //   const { productDetail, soleProductDetail, soleModuleProducts } = shopState;
  useEffect(() => {
    fetchWooCommerceProducts({ limit: 8 })
      .then((res) => {
        // setProducts(res.data);
        let productData = res.data.find((product) => product.slug === slug);
        setSelectedProds(productData);
        console.log(res.data);
        console.log(productData);
        // dispatch(fetchSoleModuleProductsSuccess(res.data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
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
    console.log("selected products here", selectedProds);
  }, [selectedProds]);
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
}

export default React.memo(productDetail);
