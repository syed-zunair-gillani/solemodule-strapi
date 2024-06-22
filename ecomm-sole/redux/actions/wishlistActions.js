import { WISHLIST } from "../actionTypes";

import * as wishlistApis from "../../apis/wishlist";

//Get cart data
const fetchWishList = () => ({
  type: WISHLIST.FETCH_WISHLIST,
});

const fetchWishListSuccess = (data) => ({
  type: WISHLIST.FETCH_WISHLIST_SUCCESS,
  payload: {
    data,
  },
});

const fetchWishListFail = (err) => ({
  type: WISHLIST.FETCH_WISHLIST_FAIL,
  payload: {
    err,
  },
});

export const fetchWishListRequest = (user) => {
  return (dispatch) => {
    dispatch(fetchWishList());
    wishlistApis
      .fetchWishlistData(user)
      .then((res) => {
        dispatch(fetchWishListSuccess(res));
      })
      .catch((err) => {
        dispatch(fetchWishListFail(err));
      });
  };
};
