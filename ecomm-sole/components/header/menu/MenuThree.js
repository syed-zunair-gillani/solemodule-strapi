import Link from "next/link";
import React from "react";

import Container from "../../other/Container";
import FunctionItems from "../elements/FunctionItems";
import MobileMenuOpener from "../elements/MobileMenuOpener";
import Navigator from "../elements/Navigator";
import SearchForm from "../elements/SearchForm";

export default function MenuThree() {
  return (
    <div className="menu -style-three">
      <Container>
        <div className="menu-wrapper">
          <MobileMenuOpener />
          <Link href={process.env.NEXT_PUBLIC_URL + "/"}>
            <span className="menu-logo">
              <img
                src={
                  process.env.NEXT_PUBLIC_URL + "/assets/images/logo-white.png"
                }
                alt="Ogami logo"
              />
            </span>
          </Link>
          <Navigator />
          <SearchForm hideSelect enterButton={<i className="icon_search" />} />
          <FunctionItems hideWishlist hideTotal />
        </div>
      </Container>
    </div>
  );
}
