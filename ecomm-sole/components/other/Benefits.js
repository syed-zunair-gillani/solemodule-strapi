import React from "react";
import { Row, Col } from "antd";
import classNames from "classnames";

import benefitsData from "../../data/benefits.json";

function Benefits({ containerFluid, column, threeCol, style, className }) {
  const renderCol = () => {
    return threeCol
      ? { xs: 24, md: 4 }
      : column
      ? { xs: 24, sm: 12, md: 6, lg: 24 }
      : { xs: 24, md: 6 };
  };
  const col = renderCol();
  return (
    <div
      className={`benefits  ${classNames(className, { "-column": column })}`}
      style={style}
    >
      <div
        className="benefits-wrapper"
        style={{
          background: "#e7e4dd",
          borderRadius: "10px",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.8)", // Add shadow here
        }}
      >
        <Row gutter={10} justify="space-between">
          {benefitsData.map((item, index) => (
            <Col key={index} {...renderCol()}>
              <div className="benefits-item">
                <img
                  style={{ height: "80px", width: "80px" }}
                  className="benefits-item__image"
                  src={process.env.NEXT_PUBLIC_URL + item.iconSrc}
                  alt="Benefit icon"
                />
                <h5 className="benefits-item__title p-3">{item.name}</h5>
                {/* <p className="benefits-item__description">{item.description}</p> */}
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default React.memo(Benefits);
