import React from "react";
import classNames from "classnames";
import { Button } from "antd";

export default function SocialIcons({ className, type = "link", shape }) {
  return (
    <ul className={`social-icons ${classNames(className)}`}>
      <li>
        <a
          href="https://www.facebook.com/solemodule?mibextid=LQQJ4d"
          target="_blank"
          rel="noopener noreferrer" // Adds security to prevent tab nabbing
        >
          <Button type={type} shape={shape}>
            <i className="fab fa-facebook-f" style={{ color: "#242464" }}></i>
          </Button>
        </a>
      </li>
      <li>
        <a
          href="https://www.instagram.com/solemodule"
          target="_blank"
          rel="noopener noreferrer" // Adds security to prevent tab nabbing
        >
          <Button type={type} shape={shape}>
            <i className="fab fa-instagram" style={{ color: "#242464" }}></i>
          </Button>
        </a>
      </li>
      <li>
        <a
          href="https://wa.me/message/Z7NNLDDLSPMIH1"
          target="_blank"
          rel="noopener noreferrer" // Adds security to prevent tab nabbing
        >
          <Button type={type} shape={shape}>
            <i className="fab fa-whatsapp" style={{ color: "#242464" }}></i>
          </Button>
        </a>
      </li>
      {/* <li>
        <Button type={type} shape={shape} href="#">
          <i className="fab fa-pinterest-p" style={{ color: "whitesmoke" }}></i>
        </Button>
      </li> */}
    </ul>
  );
}
