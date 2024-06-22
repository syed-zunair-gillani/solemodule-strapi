import { Axios } from "@/config/Axios";
import SingleProductTemp from "@/template/single-product";
import React from "react";
var qs = require('qs')

async function getData(slug) {
  const params = qs.stringify({
    populate: [
      'Images', 'Attributes', "Other_Attributes", "Reviews", "category"
    ],
    'filters[Slug][$eq]': slug
  })

  console.log("🚀 ~ getData ~ params:", params)

  const product = await Axios.get(`/products?${params}`);
  const data = product.data.data?.[0]?.attributes  ;
 
  return {
    data: data
  }
}

async function productDetail(props) {
  const { data } = await getData(props?.params?.slug)
  return (
    <SingleProductTemp data={data}/>
  );
}

export default React.memo(productDetail);
