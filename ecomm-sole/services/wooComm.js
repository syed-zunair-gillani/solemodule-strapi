// Rename this file to reflect its purpose, e.g., wooCommerceOrdersApi.js
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// Initialize the WooCommerceRestApi
// const api = new WooCommerceRestApi({
//   url: "http://localhost/wordpress",
//   consumerKey: "ck_471eb9b7a1e527e530ae822434889067da5709ca",
//   consumerSecret: "cs_cbdfc38dd56cade51b9088b1a8a78bd7f782fe5f",
//   version: "wc/v3",
//   wpAPI: true,
//   axiosConfig: {
//     headers: {
//       "Content-Type": "application/json",
//       // "Access-Control-Allow-Origin": "*",
//       // withCredentials: true,
//     },
//   },
// });

// Initialize the WooCommerceRestApi
const api = new WooCommerceRestApi({
  url: "https://admin.solemodule.com",
  consumerKey: "ck_c7178cc40d93868cf023ebea325895bca94296e2",
  consumerSecret: "cs_8c640b272081567bce4c51351de331f65892c5f4",
  version: "wc/v3",
  wpAPI: true,
  axiosConfig: {
    headers: {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*",
      // withCredentials: true,
    },
  },
});
// Fetch all orders from WooCommerce
export async function fetchWooCommerceOrders() {
  try {
    const response = await api.get("orders");

    return response;
  } catch (error) {
    console.error("Error fetching orders:", error); // Log the error
    throw new Error(error);
  }
}

// Fetch all products from WooCommerce
export async function fetchWooCommerceProducts() {
  try {
    const response = await api.get("products");
    return response;
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
}

export async function addWooCommerceOrder(orderData) {
  try {
    const response = await api.post("orders", orderData);

    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("Error adding order:", error.response);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error("Error setting up request:", error.message);
    }
    throw new Error(error);
  }
}

export async function fetchWooCommerceCategories() {
  try {
    const response = await api.get("products/categories");

    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error(error);
  }
}
