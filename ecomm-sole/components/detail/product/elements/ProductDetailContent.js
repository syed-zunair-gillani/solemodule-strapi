import { Button, Col, Rate, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { auth } from "../../../../firebase";
import { formatCurrency } from "../../../../common/utils";
import {
  checkProductCartQuantity,
  checkProductInWishlist,
} from "../../../../common/shopUtils";
import QuantitySelector from "../../../other/QuantitySelector";
import SocialIcons from "../../../other/SocialIcons";
import { onAddProductToCart } from "../../../../common/cartServices";
import { fetchCartRequest } from "../../../../redux/actions/cartActions";
import {
  addToCompare,
  removeFromCompare,
} from "../../../../redux/actions/compareActions";
import { onAddProductToWishlist } from "../../../../common/wishlistServices";
import { addWishlistData } from "../../../../apis/wishlist";
import { fetchWishListRequest } from "../../../../redux/actions/wishlistActions";
import * as wishlistApis from "../../../../apis/wishlist";
export default function ProductDetailContent({ data, type }) {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [addToWishlistLoading, setAddToWishlistLoading] = useState(false);
  const cartState = useSelector((state) => state.cartReducer);
  const compareState = useSelector((state) => state.compareReducer);
  const productInCompare = checkProductInWishlist(compareState, data?.id);
  const avaiableQuantity =
    data.quantity - checkProductCartQuantity(cartState?.data, data?.id);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    if (user) {
      wishlistApis
        .fetchWishlistData(user)
        .then((res) => {
          console.log(res);
          // dispatch(fetchWishListSuccess(res));
        })
        .catch((err) => {
          dispatch(fetchWishListFail(err));
        });
    }
  }, [user]);

  const onAddToCart = (product, quantity) => {
    if (addToCartLoading) {
      return;
    }
    setAddToCartLoading(true);
    onAddProductToCart({
      product,
      quantity,
      onSuccess: (data) => {
        setAddToCartLoading(false);
        message.success("Product added to cart");
        dispatch(fetchCartRequest(user));
      },
      onError: (mes, err) => {
        setAddToCartLoading(false);
        message.error(mes);
      },
    });
  };

  const onAddToWishlist = (product) => {
    if (addToWishlistLoading) {
      return;
    }
    setAddToWishlistLoading(true);
    onAddProductToWishlist({
      product,
      onSuccess: (data) => {
        setAddToWishlistLoading(false);
        message.success("Product added to Wishlist");
        dispatch(fetchWishListRequest(user));
      },
      onError: (mes, err) => {
        setAddToWishlistLoading(false);
        message.error(mes);
      },
    });
  };

  const onAddToCompare = (product) => {
    if (productInCompare) {
      dispatch(removeFromCompare(product.id));
      message.error("Product removed from compare");
    } else {
      dispatch(addToCompare(product));
      message.success("Product added to compare");
    }
  };
  if (type === "fluid") {
    return (
      <div className="product-detail-content -wide">
        <Row>
          <Col xs={24} sm={24} xl={16}>
            <div className="product-detail-content__left">
              <h5 className="product-type">{data?.category}</h5>
              <h2 className="product-detail-content__name">{data?.name}</h2>
              <div className="product-detail-content__description">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia mollit anim id est laborum.
                </p>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventor.
                </p>
                <p>
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                  odit aut fugit, sed quia consequuntur magni dolores eos qui
                  ratione voluptatem
                </p>
              </div>
              <ul className="product-detail-content__meta">
                <li>
                  <span>SKU:</span> A1359
                </li>
                <li>
                  <span>Categories:</span> Fastfood
                </li>
                <li>
                  <span>Tag:</span> Food, Organic
                </li>
              </ul>
              <div className="product-detail-content__share">
                <h5>Share link:</h5>
                <SocialIcons />
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} xl={8}>
            <div className="product-detail-content__right">
              <div className="product-detail-content__delivery">
                Free delivery
              </div>
              <h3 className="product-detail-content__price">
                {data?.discount && <del>{formatCurrency(data?.price)}</del>}
                <div className="product-detail-content__price-discount">
                  <h5>
                    {data?.discount
                      ? formatCurrency(data?.price - data?.discount)
                      : formatCurrency(data?.price)}
                  </h5>
                  <span>
                    <Rate defaultValue={data?.rate} />
                  </span>
                </div>
              </h3>
              <QuantitySelector
                onChange={(val) => setCurrentQuantity(val)}
                max={avaiableQuantity}
              />
              <div className="product-detail-content__actions">
                <Button
                  // style={{ backgroundColor: "red" }}
                  loading={addToCartLoading}
                  onClick={() => onAddToCart(data, currentQuantity)}
                  shape="round"
                >
                  Add to carttt
                </Button>
                <Button
                  onClick={() => onAddToCompare(data)}
                  className={classNames({
                    active: productInCompare,
                  })}
                  shape="round"
                >
                  Add to compare
                </Button>
              </div>
              <ul className="product-detail-content__benefits">
                <li>Satisfaction 100% Guaranteed</li>
                <li>Free shipping on orders over $99</li>
                <li>14 day easy Return</li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
  return (
    <div className="product-detail-content">
      <h5 className="product-type">{"Office Storage"}</h5>
      <h2 className="product-detail-content__name">{data?.Title}</h2>
      <Rate value={4} />
      <h3 className="product-detail-content__price">
        {data.discount && <del>{formatCurrency(data?.price)}</del>}{" "}
        <h5
          style={{ textAlign: "start" }}
          className="product-content text-muted"
        >
          {data?.discount
            ? formatCurrency(data?.price - data?.discount)
            : formatCurrency(data?.price)}{" "}
          / Unit (incl of all taxes)
        </h5>
        {/* <div className="product-detail-content__price-discount">
          <h5>
            {data?.discount
              ? formatCurrency(data?.price - data?.discount)
              : formatCurrency(data?.price)}
          </h5>
       
        </div> */}
      </h3>
      <div dangerouslySetInnerHTML={{ __html: data.short_description }} />
      {/* <div className="product-detail-content__delivery">Free delivery</div> */}

      <QuantitySelector
        onChange={(val) => setCurrentQuantity(val)}
        max={avaiableQuantity}
      />
      <div className="product-detail-content__actions">
        <Row>
          <Col>
            <Button
              style={{ border: "solid 1px", borderRadius: "10px" }}
              loading={addToCartLoading}
              onClick={() => onAddToCart(data)}
            >
              Add to cart
            </Button>
          </Col>
          <Col offset={1}>
            <Button
              style={{ border: "solid 1px", borderRadius: "10px" }}
              // loading={addToWishListLoading}
              // onClick={() => onAddToCompare(data)}
              onClick={() => {
                return onAddToWishlist(data);
              }}
              // shape="rounded"
            >
              Add to Wishlist
            </Button>
          </Col>
        </Row>
      </div>
      <div className="product-detail-content__share">
        <h5>Share link:</h5>
        <SocialIcons />
      </div>
    </div>
  );
}

React.memo(ProductDetailContent);
