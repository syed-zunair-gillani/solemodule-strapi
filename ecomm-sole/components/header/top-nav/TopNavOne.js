import React, { useEffect, useState } from "react";
import Container from "../../other/Container";
import SocialIcons from "../../other/SocialIcons";
import { Select } from "antd";
import Link from "next/link";

const flagData = [
  { name: "english", image: "/assets/images/header/flag-usa.png" },
  { name: "japanese", image: "/assets/images/header/flag-jp.png" },
  { name: "vietnamese", image: "/assets/images/header/flag-vn.png" },
];

export default function TopNavOne({ containerFluid }) {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const strings = [
    "CODE SOLE10 : EMBRACE THE UNUSUAL - 10% OFF YOUR FIRST ORDER",
    "SLEEK STYLISH RETRACTABLE HIDDEN",
  ]; // Strings you want to display
  const [displayedString, setDisplayedString] = useState("");

  useEffect(() => {
    const typingInterval = 3000; // Interval between displaying strings (in milliseconds)

    const displayNextString = () => {
      if (currentStringIndex < strings.length) {
        // Get the next string from the array
        const nextString = strings[currentStringIndex];
        // Update the displayed string
        setDisplayedString(nextString);
        // Increment the index for the next string
        setCurrentStringIndex(currentStringIndex + 1);
      } else {
        // Reset to display the first string again after displaying all strings
        setCurrentStringIndex(0);
      }
    };

    // Start displaying strings after the component mounts
    const intervalId = setInterval(displayNextString, typingInterval);

    // Clean up interval when component unmounts
    return () => clearInterval(intervalId);
  }, [currentStringIndex, strings]);
  const { Option } = Select;
  return (
    <div className="top-nav-one">
      <Container fluid={containerFluid}>
        <div
          className="top-nav-one-wrapper"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p className="" style={{ color: "#f9f5eb" }}>
            {!displayedString && (
              <span>
                <strong> CODE SOLE10 </strong> : EMBRACE THE UNUSUAL - 10% OFF
                YOUR FIRST ORDER
              </span>
            )}
            {displayedString === strings[0] ? (
              <span>
                <strong> CODE SOLE10 </strong>: EMBRACE THE UNUSUAL - 10% OFF
                YOUR FIRST ORDER
              </span>
            ) : (
              <span style={{ wordSpacing: "10px" }}>{displayedString}</span>
            )}
          </p>
        </div>
      </Container>
    </div>
  );
}
