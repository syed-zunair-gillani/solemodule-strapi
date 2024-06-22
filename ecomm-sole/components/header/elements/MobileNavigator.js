import React, { useState } from "react";
import { Menu } from "antd";

import navigatorData from "../../../data/navigator.json";
import Link from "next/link";
import SocialIcons from "../../other/SocialIcons";

function MobileNavigator() {
  const { SubMenu } = Menu;
  const [current, setCurrent] = useState("mail");
  const handleClick = (e) => {
    console.log("e value ----------", e);
    setCurrent(e.key);
  };
  return (
    <div className="menu-mobile">
      <Menu
        className="menu-mobile-navigator"
        onClick={handleClick}
        selectedKeys={[current]}
        mode="inline"
      >
        <SubMenu key="homepage" title={navigatorData.HOME.title}>
          {navigatorData.HOME.subMenu.map((item) => (
            <Menu.Item key={item.title}>
              <Link href={process.env.NEXT_PUBLIC_URL + item.href}>
                {/* <a> */}
                {item.title}
                {/* </a> */}
              </Link>
            </Menu.Item>
          ))}
        </SubMenu>
        <SubMenu key="shop" title={navigatorData.SHOP.title}>
          <SubMenu key="shop layout" title="Layout shop">
            {navigatorData.SHOP.subMenu.layout.map((item) => (
              <Menu.Item key={item.title}>
                <Link href={process.env.NEXT_PUBLIC_URL + item.href}>
                  {/* <a>  */}
                  {item.title}
                  {/* </a> */}
                </Link>
              </Menu.Item>
            ))}
          </SubMenu>
          <SubMenu key="shop detail" title="Detail shop">
            {navigatorData.SHOP.subMenu.detail.map((item) => (
              <Menu.Item key={item.title}>
                <Link href={process.env.NEXT_PUBLIC_URL + item.href}>
                  {/* <a> */}
                  {item.title}
                  {/* </a> */}
                </Link>
              </Menu.Item>
            ))}
          </SubMenu>
          <SubMenu key="shop pages" title="Pages shop">
            {navigatorData.SHOP.subMenu.pages.map((item) => (
              <Menu.Item key={item.title}>
                <Link href={process.env.NEXT_PUBLIC_URL + item.href}>
                  {/* <a>  */}
                  {item.title}
                  {/* </a> */}
                </Link>
              </Menu.Item>
            ))}
          </SubMenu>
        </SubMenu>
        <SubMenu key="pages" title={navigatorData.PAGES.title}>
          {navigatorData.PAGES.subMenu.map((item) => (
            <Menu.Item key={item.title}>
              <Link href={process.env.NEXT_PUBLIC_URL + item.href}>
                {/* <a>  */}
                {item.title}
                {/* </a> */}
              </Link>
            </Menu.Item>
          ))}
        </SubMenu>
        <Menu.Item key="alipay">
          <Link href={process.env.NEXT_PUBLIC_URL + navigatorData.ABOUT.href}>
            {/* <a
              href="https://ant.design"
              target="_blank"
              rel="noopener noreferrer"
            > */}
            {navigatorData.ABOUT.title}
            {/* </a> */}
          </Link>
        </Menu.Item>
      </Menu>
      <div className="menu-mobile-functions">
        <Link href={process.env.NEXT_PUBLIC_URL + "/other/login"}>
          <span className="menu-mobile-functions__login">Login / Register</span>
        </Link>
        <SocialIcons />
      </div>
    </div>
  );
}

export default React.memo(MobileNavigator);
