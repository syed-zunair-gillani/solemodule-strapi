import React from "react";

import Container from "../../other/Container";
import ProductDetailImages from "./elements/ProductDetailImages";
import ProductDetailContent from "./elements/ProductDetailContent";
import FetchDataHandle from "../../other/FetchDataHandle";
import { Col, Row } from "antd";
import ProductDetailTab from "./elements/ProductDetailTab";
import data1 from "../../../database.json";

function ProductDetailLayout({ data, type, hideTab, style }) {
  const productDataJson = JSON.parse(
    data.meta_data.find((data) => data.key === "product_data_json").value
  );
  console.log("jsondatafromwordpess", productDataJson);
  if (type === "fluid") {
    return (
      <div className="product-detail" style={style}>
        <Row gutter={30}>
          <Col md={10}>
            {/* <ProductDetailImages type="column" images={data?.images[0]?.src} /> */}
          </Col>
          <Col md={14}>
            <ProductDetailContent type="fluid" data={data} />
          </Col>
          <Col md={24}>
            {!hideTab && (
              <ProductDetailTab
                fullDescription={data.fullDescription}
                specifications={data.specifications}
                reviews={data.reviews}
              />
            )}
          </Col>
        </Row>
      </div>
    );
  }
  return (
    <div className="product-detail" style={style}>
      <Row gutter={30}>
        <Col md={12}>
          <ProductDetailImages images={`${process.env.NEXT_PUBLIC_BACKEND_URL}${data?.Images?.data}`} />
        </Col>
        <Col md={12}>
          <ProductDetailContent data={data} />
        </Col>
        <Col xs={24} md={24}>
          {!hideTab && (
            <ProductDetailTab
              fullDescription={productDataJson.full_description}
              specifications={productDataJson.specification}
              reviews={data1.product[0].reviews}
            />
          )}
        </Col>
      </Row>
    </div>
  );
}

export default React.memo(ProductDetailLayout);
