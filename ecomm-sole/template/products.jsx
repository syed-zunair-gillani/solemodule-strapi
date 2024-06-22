"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase } from "firebase/database";
import axios from "axios";
// import * as shopActions from "../../redux/actions/shopActions";

import HeroSliderOne from "@/components/sections/hero-slider/HeroSliderOne";
import heroslideOneData from "@/data/sections/hero-slider.json";
import Benefits from "@/components/other/Benefits";
import CategoriesOne from "@/components/sections/categories/CategoriesOne";
// import categoriesOneData from "../data/sections/categories.json";
import ProductTab from "@/components/sections/product-thumb/ProductTab";
// import categories from "../data/categories.json";
import IntroductionOne from "@/components/sections/introduction/IntroductionOne";
import introductionOneData from "@/data/sections/introduction.json";
import DowOne from "@/components/sections/dale-of-week/DowOne";
import dowOneData from "@/data/sections/dale-of-week.json";
import PartnerOne from "@/components/sections/partners/PartnerOne";
import Container from "@/components/other/Container";

// import database from "../../database.json";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { fetchWooCommerceProducts } from "@/services/wooComm";
import LayoutOne from "@/components/layout/LayoutOne";
// import { fetchWooCommerceCategories } from "../services/wooComm";
function ProductsTemp({data}) {

  const [currentProductTabsCategory, setCurrentProductTabsCategory] = useState({
    daleProducts: "",
  });
  
  const [headerCategories, setHeaderCategories] = useState([]);
  const [products, setProducts] = useState(data);
  console.log("🚀 ~ ProductsTemp ~ products:", products)
  const [productsLoading, setProductsLoading] = useState(false);

  let productMetaData = {
    data: products,
    loading: productsLoading,
  };

  return (
    <LayoutOne title="Sole Module">
      {/* <HeroSliderOne data={heroslideOneData.one} /> */}
      {/* <Container>
        <Benefits
          threeCol
          style={{
            marginTop: -75 / 16 + "em",
            position: "relative",
            zIndex: 2,
          }}
        />
      </Container> */}
      {/* <CategoriesOne data={categoriesOneData.one} /> */}
      <Container>
        {/* <ProductTab
          data={daleProducts}
          productCol={{ xs: 12, sm: 8, lg: 6 }}
          onTabChange={(val) =>
            setCurrentProductTabsCategory({
              ...currentProductTabsCategory,
              daleProducts: val,
            })
          }
          headerCategories={categories.slice(0, 5).map((item) => item.name)}
          headerTitle="Deal of the week"
        /> */}
        <ProductTab
          data={productMetaData}
          productCol={{ xs: 12, sm: 8, lg: 6 }}
          onTabChange={(val) =>
            setCurrentProductTabsCategory({
              ...currentProductTabsCategory,
              soleModuleProducts: val,
            })
          }
          headerCategories={headerCategories}
          headerTitle="Our Products"
        />
      </Container>
      {/* <IntroductionOne data={introductionOneData.one} /> */}
      {/* <DowOne data={dowOneData.one} countdownLast={100000000} /> */}
      <Container>{/* <PartnerOne /> */}</Container>
    </LayoutOne>
  );
}

export default  ProductsTemp;
