import React from "react";
import Link from "next/link";

import Container from "../../other/Container";
import Navigator from "../elements/Navigator";
import FunctionItems from "../elements/FunctionItems";
import MobileMenuOpener from "../elements/MobileMenuOpener";

export default function MenuOne() {
  return (
    <div className="menu -style-one">
      <Container>
        <div className="menu-wrapper">
          <MobileMenuOpener />
          <Link href={process.env.NEXT_PUBLIC_URL + "/"}>
            <span className="menu-logo">
              <img
                src={
                  process.env.NEXT_PUBLIC_URL + "/assets/images/soleLogo.png"
                }
                alt="Sole Module logo"
                style={{ height: "50px" }}
              />
            </span>
          </Link>
          <Navigator />
          <FunctionItems />
        </div>
      </Container>
    </div>
  );
}
