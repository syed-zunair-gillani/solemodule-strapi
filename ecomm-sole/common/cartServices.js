import { v4 as uuidv4 } from "uuid";
import {
  fetchProductIdCartData,
  addCartData,
  updateCartData,
  removeCartData,
} from "../apis/cart";

export const onAddProductToCart = ({
  product,
  quantity = 1,
  onSuccess,
  onError,
  getQuantityAvailable = () => true,
}) => {
  console.log("error Handling Cart", product);
  fetchProductIdCartData(product.id)
    .then((res) => {
      if (res.length === 0) {
        if (product.quantity === 0) {
          onError && onError("Reached maximum number of products");
          getQuantityAvailable && getQuantityAvailable(false);
        } else {
          addCartData({
            ...product,
            id: uuidv4(),
            productId: product.id,
            cartQuantity: quantity,
          })
            .then((res) => onSuccess && onSuccess(res))
            .catch(
              (err) => onError && onError("Login Before adding to Cart !", err)
            );
        }
      } else {
        let pData = res.data[0];
        if (pData.cartQuantity + quantity > pData.quantity) {
          onError && onError("Reached maximum number of products");
          getQuantityAvailable(false);
        } else {
          updateCartData(pData.id, {
            cartQuantity: pData.cartQuantity + quantity,
          })
            .then((res) => {
              onSuccess && onSuccess(res);
            })
            .catch(
              (err) =>
                onError &&
                onError("Add product to cart failed, please try again2", err)
            );
        }
      }
    })
    .catch(
      (err) =>
        onError && onError("Please login before adding product into cart", err)
    );
};

export const onRemoveProductFromCart = ({ cartId, onSuccess, onError }) => {
  if (cartId && cartId !== "" && cartId !== null) {
    removeCartData(cartId)
      .then((res) => onSuccess && onSuccess(res))
      .catch(
        (err) =>
          onError && onError("Remove product failm, pleaser try again", err)
      );
  }
};

export const onChangeProductCartQuantity = ({
  product,
  quantity,
  onSuccess,
}) => {
  if (quantity > product.quantity || quantity < 1) {
    return;
  }
  updateCartData(product.id, { cartQuantity: quantity })
    .then((res) => onSuccess && onSuccess(res))
    .catch((err) => console.log(err));
};
