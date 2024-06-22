import React from "react";
import Link from "next/link";

import SocialIcons from "../../other/SocialIcons";

export default function FooterInfomation() {
  return (
    <div className="footer-info">
      <Link href={process.env.NEXT_PUBLIC_URL + "/"}>
        {/* <a className="footer-info__logo"> */}
        <img
          style={{ maxHeight: "20px" }}
          src={process.env.NEXT_PUBLIC_URL + "/assets/images/soleLogo.png"}
          alt="Ogami Logo"
        />
        {/* </a> */}
      </Link>
      <p>
        We are available from Monday to Saturday from 9:00 am to 9:00 pm and are
        closed on National Holidays.
      </p>
      <strong>Address:</strong>{" "}
      <p>Mumbai - Veena Industrial Estate, LBS Marg, Vikhroli west 400083</p>
      <strong>Phone & Whatsapp:</strong> +918928387008
      <strong> Email:</strong>
      support@solemodule.com
    </div>
  );
}
