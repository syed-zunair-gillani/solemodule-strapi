import { CART } from "../actionTypes";

const initialState = {
  loading: true,
  data: false,
  error: false,
  cartProducts: 0,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case CART.FETCH_CART:
      return {
        ...state,
        data: action.payload,
      };
    case CART.FETCH_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };
    case CART.FETCH_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}
