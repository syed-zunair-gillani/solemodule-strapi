import React from "react";
import { Row, Col, Button } from "antd";
import Link from "next/link";

function IntroductionOne({ data }) {
  console.log("process env", process.env.PUBLIC_URL);
  return (
    <div className="introduction-one">
      {data.map((item, index) => (
        <div
          key={index}
          className="introduction-one-item"
          style={{ backgroundImage: `url('${item.background}')` }}
          // style={{ backgroundImage: url("${item.background}") }}
        >
          <img
            style={{ objectFit: "fit" }}
            src={item.image}
            alt="Introduction image"
          />

          <Button type="primary" shape="round" className="btn-customPrimary2">
            <Link legacyBehavior href={item.path}>
              <>
                <a href={item.path}>
                  Shop Now
                  <p
                    style={{
                      position: "absolute",
                      bottom: "40px",
                    }}
                  >
                    {" "}
                    {`₹ ${item.price} Only`}
                  </p>
                </a>
              </>
            </Link>
          </Button>
        </div>
      ))}
    </div>
  );
}

export default React.memo(IntroductionOne);
