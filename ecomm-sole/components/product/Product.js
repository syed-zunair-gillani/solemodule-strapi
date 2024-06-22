import React, { useEffect, useState } from "react";
import { Button, message, Rate, Tooltip, Modal } from "antd";
import Link from "next/link";
import classNames from "classnames";
import { LoadingOutlined } from "@ant-design/icons";
import * as cartApis from "../../apis/cart";
import * as wishlistApis from "../../apis/wishlist";
import { onAddProductToCart } from "../../common/cartServices";
import ProductDetailLayout from "../detail/product/ProductDetailLayout";
import { addWishlistData } from "../../apis/wishlist";
import { addCartData } from "../../apis/cart";
import { auth } from "@/firebase";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartRequest } from "@/redux/actions/cartActions";

function Product({ data, className, type, countdownLast = 100000000 }) {
  
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [addToWishlistLoading, setAddToWishlistLoading] = useState(false);
  const [user, setUser] = useState(null);
  const cartStateR = useSelector((state) => state.cartReducer);
  const [wishListData, setWishListData] = useState([]);
  const [wishListDataLoading, setWishListDataLoading] = useState([]);
  const [cartDataLoading, setCartDataLoading] = useState(false);
  const [fetchWishlist, setFetchWishList] = useState(false);
  const [fetchCartList, setFetchCartList] = useState(false);
  const [cartData, setCartData] = useState([]);
  const compareState = [];
  const wishlistState = {
    loading: wishListDataLoading,
    data: wishListData,
  };
  const cartState = {
    loading: wishListDataLoading,
    data: cartData,
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    console.log("Iam changed", cartStateR);
  }, [cartStateR]);
  useEffect(() => {
    setWishListDataLoading(true);
    if (user) {
      wishlistApis
        .fetchWishlistData(user)
        .then((res) => {
          setWishListData(res);
          console.log(res);
          setWishListDataLoading(false);
        })
        .catch((err) => {
          console.log(err);

          setWishListDataLoading(false);
        });
    }
  }, [user, fetchWishlist]);

  useEffect(() => {
    setCartDataLoading(true);
    if (user) {
      cartApis
        .fetchCartData(user)
        .then((res) => {
          console.log("function items function itemsssss", res);
          setCartData(
            res.docs.map((doc) => ({
              id: doc.id,
              data: { ...doc.data() },
            }))
          );

          setCartDataLoading(false);
        })
        .catch((err) => {
          console.log("function items function items", err);
          message.error("Please Login before adding product");
          setCartDataLoading(false);
        });
    }
  }, [user, fetchCartList]);

  const onModalClose = (e) => {
    setModalVisible(false);
  };

  const rederProductType = (type) => {
    switch (type) {
      default:
        return (
          <div
            style={{ borderRadius: "30px" }}
            className={`product ${classNames(className)}`}
          >
            <div className="product-img">
              <Link
                legacyBehavior
                href={process.env.PUBLIC_URL + `/product/[slug]`}
                as={process.env.NEXT_PUBLIC_URL + `/products/${data.Slug}`}
              >
                <a title={data.Title}>
                  <img
                    style={{
                      borderRadius: "9px",
                      objectFit: 'cover',
                      // boxSizing: "border-box",
                      width:
                        window.innerWidth <= 412
                          ? "140px" // Adjust as needed for screen width <= 413px
                          : window.innerWidth <= 768
                          ? "auto" // Adjust as needed for screen width <= 768px
                          : window.innerWidth <= 1024
                          ? "180px" // Adjust as needed for screen width <= 1024px
                          : "230px",

                      height:
                        window.innerWidth <= 412
                          ? "140px" // Adjust as needed for screen width <= 413px
                          : window.innerWidth <= 768
                          ? "150px" // Adjust as needed for screen width <= 768px
                          : window.innerWidth <= 1024
                          ? "180px" // Adjust as needed for screen width <= 1024px
                          : "230px",
                    }}
                    width={230}
                    height={230}
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${data?.Images?.data?.[0]?.attributes?.url}`}
                    alt={data?.Title}
                  />
                </a>
              </Link>

              <div
                className="product-content product-content-padding"
                style={{
                  textAlign: "start",
                  // marginTop: "60px",
                }}
              >
                <div className="product-content product-price ">
                  <i
                    onClick={() => setModalVisible(true)}
                    className="far fa-search -cursor"
                    style={{ paddingTop: "10px" }}
                  />
                  <i
                    onClick={async () => {
                      try {
                        await addWishlistData(data);
                        message.success("Product added to Wishlist");
                        setFetchWishList(!fetchWishlist);
                      } catch (err) {
                        message.error("Please Login before adding product");
                      }
                    }}
                    className={` ${
                      wishlistState?.data.find(
                        (ele) => ele.data.name === data.name
                      )
                        ? "fas"
                        : "far"
                    } fa-heart`}
                    style={{
                      paddingTop: "15px",
                      color: wishlistState?.data.find(
                        (ele) => ele.data.name == data.name
                      )
                        ? "red"
                        : "",
                    }}
                  />
                </div>
                <h3 style={{ marginTop: "10px" }}>
                  <b>{data.Title}</b>
                </h3>
                <h4
                  style={{ textAlign: "start" }}
                  className="product-content text-muted"
                >
                  {data?.category?.data?.attributes?.Name}
                </h4>
                <span className="product-content text-muted">
                  <Rate
                    value={4 + Math.random() * 2}
                    disabled
                    style={{
                      marginRight: "10px",
                    }}
                  />
                  ({Math.trunc(50 + Math.random() * 12)})
                </span>

                <h5
                  style={{ textAlign: "start" }}
                  className="product-content text-muted"
                >
                  ₹ {data.Price} / Unit (incl of all taxes)
                </h5>
              </div>

              <Tooltip title="Add to cart">
                <Button
                  onClick={async () => {
                    try {
                      dispatch(fetchCartRequest(!cartStateR));
                      await addCartData(data);
                      message.success("Product added to Cart");
                    } catch (err) {
                      message.error("Please Login before adding product");
                    }
                  }}
                  style={{
                    bottom: "2px",
                    background: "#55514e",
                    color: "white",

                    marginTop: "10px",
                    borderRadius: "8px", // Adjust the border radius to your desired roundness
                    height: "45px",
                    width:
                      window.innerWidth <= 412
                        ? "140px" // Adjust as needed for screen width <= 413px
                        : window.innerWidth <= 768
                        ? "200px" // Adjust as needed for screen width <= 768px
                        : window.innerWidth <= 1024
                        ? "200px" // Adjust as needed for screen width <= 1024px
                        : "240px", // Make the button full width
                  }}
                  data-delay="0.6"
                  icon={
                    addToCartLoading ? (
                      <LoadingOutlined spin />
                    ) : (
                      <i className="far fa-shopping-bag" />
                    )
                  }
                  data-animation="animate__fadeInDown"
                  shape="round"
                >
                  Add to Cart
                </Button>{" "}
                <hr className=" product-content pdDesc" />
              </Tooltip>
              <div
                style={{
                  alignItems: "start",
                  // paddingLeft: "10px",
                  paddingRight: "10px",
                  gap: "10px",
                  display: "grid",
                }}
                className="product-select"
              >
                {/* <p
                  style={{ textAlign: "start" }}
                  className="product-content pdDesc"
                >
                  Product Dimension - L 26 cm x B 22 cm x H 45 cm
                </p> */}
                <p
                  style={{ textAlign: "start" }}
                  className="product-content pdDesc"
                >
                  <strong>Width :</strong> {`${data?.Attributes?.Width} cm`}
                </p>{" "}
                <p
                  style={{ textAlign: "start" }}
                  className="product-content pdDesc"
                >
                  <strong>Height :</strong> {`${data?.Attributes?.Height} cm`}
                </p>{" "}
                <p
                  style={{ textAlign: "start" }}
                  className="product-content pdDesc"
                >
                  <strong>Length :</strong> {`${data?.Attributes?.Length} cm`}
                </p>
                {/* <div
                  className="product-content pdDesc"
                  dangerouslySetInnerHTML={{ __html: data.short_description }}
                /> */}
              </div>
            </div>
          </div>
        );
    }
  };


  return (
    <>
      {rederProductType(type)}
      <Modal
        visible={modalVisible}
        onCancel={onModalClose}
        footer={null}
        header={null}
        width={860}
      >
        <ProductDetailLayout style={{ marginBottom: 0 }} hideTab data={data} />
      </Modal>
    </>
  );
}

export default React.memo(Product);
