import React from "react";
import TopNavOne from "./top-nav/TopNavOne";
import TopNavTwo from "./top-nav/TopNavTwo";
import MenuOne from "./menu/MenuOne";
import FunctionMenuOne from "./function-menu/FunctionMenuOne";

export default function HeaderOne({ activeHeaderCollapse }) {
  return (
    <>
      <TopNavOne />
      {/* <TopNavTwo style={{ backgroundColor: "red" }} /> */}
      <MenuOne />
      {/* <FunctionMenuOne activeHeaderCollapse={activeHeaderCollapse} /> */}
    </>
  );
}
