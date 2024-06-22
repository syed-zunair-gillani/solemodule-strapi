import React, { useState, useEffect } from "react";
import Container from "../../other/Container";
import SocialIcons from "../../other/SocialIcons";
import { Select, Button, Menu, Dropdown, message } from "antd";
import Link from "next/link";
import { auth } from "../../../firebase";

const flagData = [
  { name: "english", image: "/assets/images/header/flag-usa.png" },
  { name: "japanese", image: "/assets/images/header/flag-jp.png" },
  { name: "vietnamese", image: "/assets/images/header/flag-vn.png" },
];

const TopNavTwo = ({ containerFluid }) => {
  const { Option } = Select;
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is already authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Clean up function to unsubscribe from the auth state listener
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        message.success("User Logout Successfully");
      })
      .catch((error) => {
        console.error("Error occurred during logout:", error.message);
      });
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <Link href="/auth/profile">
          <span>My Profile</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="top-nav-one">
      <Container fluid={containerFluid}>
        <div
          className="top-nav-one-wrapper"
          style={{ backgroundColor: "grey" }}
        >
          <div className="top-nav-one-left">
            <ul>
              <li>
                <i className="fas fa-envelope" />
                info.deercreative@gmail.com
              </li>
              <li>
                <i className="fas fa-phone-alt" />
                +65 11.188.888
              </li>
            </ul>
          </div>
          <div className="top-nav-one-right">
            <div className="top-nav-one-right__item">
              <SocialIcons />
            </div>
            <div className="top-nav-one-right__item">
              <Select defaultValue="english" width={125} bordered={false}>
                {flagData.map((item, index) => (
                  <Option key={index} value={item.name}>
                    <img
                      style={{
                        height: 13 / 16 + "em",
                        width: 20 / 16 + "em",
                        objectFit: "contain",
                        marginTop: -3 / 16 + "em",
                        marginRight: 5 / 16 + "em",
                      }}
                      src={process.env.NEXT_PUBLIC_URL + item.image}
                      alt=""
                    />
                    {item.name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TopNavTwo;
