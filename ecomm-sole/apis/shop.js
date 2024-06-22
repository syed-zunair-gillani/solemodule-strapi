import axiosService from "../common/axiosService";
import { API_URL } from "../common/defines";
import { renderParam } from "../common/utils";
import axios from "axios";

const url = "/product";

const renderUrl = (url, limit, category) => {
  return (
    url + "?" + renderParam("_limit", limit) + renderParam("category", category)
  );
};

//Fetch list of products
export const fetchProductsData = (query) => {
  let endpoint =
    renderUrl(API_URL + url, query.limit, query.category) +
    renderParam("_page", query.page) +
    renderParam("_sort", query.sort.sort) +
    renderParam("_order", query.sort.order) +
    renderParam("q", query.q) +
    renderParam("specifications.color", query.color) +
    renderParam("specifications.size", query.size) +
    renderParam("tag_like", query.tag);

  return axiosService.get(endpoint);
};

export const fetchSaleProductsData = (query) => {
  let endpoint = renderUrl(API_URL + url, query.limit, query.category);

  return axiosService.get(endpoint);
};

const WPAPI_URL = "http://localhost/wordpress/wp-json/wc/store";

export const fetchProductsData1 = async () => {
  try {
    const response = await axios.get(`${WPAPI_URL}/products`);

    return response.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchSoleModuleProductsData = () => {
  return axiosService.get(`${WPAPI_URL}/products`);
};

export const fetchFeaturedProductsData = (query) => {
  let endpoint = renderUrl(API_URL + url, query.limit, query.category);
  return axiosService.get(endpoint);
};

export const fetchBestSellerProductsData = (query) => {
  let endpoint = renderUrl(API_URL + url, query.limit, query.category);
  return axiosService.get(endpoint);
};

export const fetchDaleProductsData = (query) => {
  let endpoint = renderUrl(API_URL + url, query.limit, query.category);

  return axiosService.get(endpoint);
};

// //Fetch product detail
// export const fetchProductDetailData = (slug) => {
//   let endpoint = API_URL + url + "?" + renderParam("slug", slug);
//   return axiosService.get(endpoint);
// };

// export const fetchProductDetailData = async (slug) => {
//   try {
//     const response = await axios.get(`${WPAPI_URL}/products/${slug}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching product details:", error);
//     return null;
//   }
// };

export const fetchProductDetailData = async (slug) => {
  let endpoint = `${API_URL}/products/${slug}`;
  return axiosService.get(endpoint);
};

export const fetchSoleProductDetailData = async (slug) => {
  let endpoint = `${WPAPI_URL}/products/${slug}`;
  return axiosService.get(endpoint);
};

//Fetch serched product by query
export const fetchSearchedProductData = (query) => {
  let endpoint =
    API_URL +
    url +
    "?" +
    renderParam("q", query.input) +
    renderParam("category", query.category) +
    renderParam("_limit", query.limit);
  return axiosService.get(endpoint);
};
