import { CART } from "../actionTypes";

import * as cartApis from "../../apis/cart";

//Get cart data
export const fetchCart = (data) => ({
  type: CART.FETCH_CART,
  payload: {
    data,
  },
});

export const fetchCartSuccess = (data) => ({
  type: CART.FETCH_CART_SUCCESS,
  payload: {
    data,
  },
});

export const fetchCartFail = (err) => ({
  type: CART.FETCH_CART_FAIL,
  payload: {
    err,
  },
});

export const fetchCartRequest = (data) => {
  return (dispatch) => {
    dispatch(fetchCart(data));
    // cartApis
    //   .fetchCartData(user)
    //   .then((res) => {
    //     dispatch(fetchCartSuccess(res));
    //   })
    //   .catch((err) => {
    //     dispatch(fetchCartFail(err));
    //   });
  };
};
