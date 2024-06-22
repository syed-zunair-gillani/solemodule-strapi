export const getProductsBySlug = (arr, slug) => {
  return slug && typeof slug === "string"
    ? arr.find((p) => p.slug.toLowerCase() === slug.toLowerCase())
    : arr;
};

export const calculateTotalPrice = (arr, cuponApplied) => {
  let total = 0;
  console.log("calculate price", arr);
  arr.forEach((item) => {
    if (item.discount) {
      total += item.data.cartQuantity
        ? (item.price - item.discount) * item.data.cartQuantity
        : item.price - item.discount;
    } else {
      total += item.data.cartQuantity
        ? item.data.price * item.data.cartQuantity
        : item.data.price;
    }
  });
  return total;
};

//Cart
export const checkProductInCart = (cartArr, pid) => {
  return pid ? cartArr?.find((item) => item.productId === pid) : undefined;
};

export const checkProductCartQuantity = (cartArr = [], pid) => {
  const productsInCart = cartArr.filter((item) => item.productId === pid);
  if (productsInCart && productsInCart.length > 0) {
    const totalProductQuantityInCart = productsInCart.reduce(
      (total, item) => total + item.cartQuantity,
      0
    );
    return totalProductQuantityInCart;
  } else {
    return 0;
  }
};

//Wishlist
export const checkProductInWishlist = (wishlistArr = [], pid) => {
  return pid ? wishlistArr.find((item) => item.id === pid) : undefined;
};
