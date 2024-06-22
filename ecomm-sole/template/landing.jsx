"use client";
import React from "react";
import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { getDatabase } from "firebase/database";
import axios from "axios";
import * as shopActions from "@/redux/actions/shopActions";
import HeroSliderOne from "@/components/sections/hero-slider/HeroSliderOne";
import heroslideOneData from "@/data/sections/hero-slider.json";
import Benefits from "@/components/other/Benefits";
import CategoriesOne from "@/components/sections/categories/CategoriesOne";
import categoriesOneData from "@/data/sections/categories.json";
import ProductTab from "@/components/sections/product-thumb/ProductTab";
import categories from "@/data/categories.json";
import IntroductionOne from "@/components/sections/introduction/IntroductionOne";
import introductionOneData from "@/data/sections/introduction.json";
import DowOne from "@/components/sections/dale-of-week/DowOne";
import dowOneData from "@/data/sections/dale-of-week.json";
import PartnerOne from "@/components/sections/partners/PartnerOne";
import Container from "@/components/other/Container";

import database from "@/database.json";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import {
  fetchWooCommerceCategories,
  fetchWooCommerceProducts,
} from "../services/wooComm";
import Loading from "@/components/other/loading";
import LayoutOne from "@/components/layout/LayoutOne";

const LandingTemp = ({data}) => {
  console.log("🚀 ~ LandingTemp ~ data:", data)

  const [currentProductTabsCategory, setCurrentProductTabsCategory] = useState({
    daleProducts: "",
  });
  const [loading, setLoading] = useState(false);
  const [headerCategories, setHeaderCategories] = useState([]);
  const [products, setProducts] = useState(data);
  const [productsLoading, setProductsLoading] = useState(false);
  const { fetchDaleProductsRequest, fetchSoleModuleProductsRequest } =
    shopActions;
  // const shopState = useSelector((state) => state.shopReducer);



  let productMetaData = {
    data: products,
    loading: productsLoading,
  };
  // const {
  //   daleProducts,
  //   soleModuleProducts: [],
  // } = shopState;

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await axios.get(
  //         //   // "http://solemodule.com/wp-json/wc/store/products/categories"
  //         "http://localhost/wordpress/wp-json/wc/store/products/categories"
  //       );
  //       // );
  //       // const response = await fetchWooCommerceCategories();
  //       const categories = response.data.map((category) => category.name);

  //       setHeaderCategories(categories);
  //     } catch (error) {
  //       console.error("Failed to fetch categories:", error);
  //     }
  //   };
  //   fetchCategories();
  // }, []);

  useEffect(() => {}, [headerCategories]);

  // useEffect(() => {
  //   dispatch(
  //     fetchDaleProductsRequest({
  //       limit: 8,
  //       category: currentProductTabsCategory.daleProducts,
  //     })
  //   );
  // }, [currentProductTabsCategory.daleProducts]);

  return (
    <>
      {loading ? (
        <Container fluid={true}>
          <Loading />
        </Container>
      ) : (
        <LayoutOne title="Sole Module">
          <HeroSliderOne data={heroslideOneData.one} />
          <Container>
            <Benefits
              threeCol
              style={{
                marginTop: -75 / 16 + "em",
                position: "relative",
                zIndex: 2,
              }}
            />
          </Container>
          {/* <CategoriesOne data={categoriesOneData.one} /> */}
          <DowOne data={dowOneData.one} countdownLast={100000000} />

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
            {products.length != 0 && (
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
            )}
          </Container>
          <IntroductionOne data={introductionOneData.one} />
          {/* <Container>
        <PartnerOne />
      </Container> */}
        </LayoutOne>
      )}
    </>
  );
};

export default LandingTemp;
