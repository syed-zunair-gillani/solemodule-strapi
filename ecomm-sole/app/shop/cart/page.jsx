"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Tooltip, Modal, Form, Input, message, Breadcrumb } from "antd";
import Link from "next/link";
import { auth } from "../../../firebase";
import {
  onRemoveProductFromCart,
  onChangeProductCartQuantity,
} from "../../../common/cartServices";
// import { fetchCartRequest } from "../../redux/actions/cartActions";
import { formatCurrency } from "../../../common/utils";
import {
  calculateTotalPrice,
  checkProductCartQuantity,
} from "../../../common/shopUtils";
import LayoutOne from "../../../components/layout/LayoutOne";
import Container from "../../../components/other/Container";
import FetchDataHandle from "../../../components/other/FetchDataHandle";
import QuantitySelector from "../../../components/other/QuantitySelector";
import ShopOrderStep from "../../../components/shop/ShopOrderStep";
// import PartnerOne from "../../components/sections/partners/PartnerOne";

import * as cartApis from "../../../apis/cart";

function cart() {
  const dispatch = useDispatch();
  const [cuponApplied, setCuponApplied] = useState(false);
  const [modalState, setModalState] = useState({
    visible: false,
    message: "Add some message",
    cartId: null,
  });
  const [user, setUser] = useState(null);

  const [cartData, setCartData] = useState([]);
  const [cartDataLoading, setCartDataLoading] = useState(false);
  const cartState = useSelector((state) => state.cartReducer);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user);
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  //   useEffect(() => {
  //     if (user) {
  //       dispatch(fetchCartRequest(user));
  //     }
  //   }, [user]);
  useEffect(() => {
    fetchCartsData(user);
  }, [user]);
  const fetchCartsData = (user) => {
    if (user) {
      setCartDataLoading(true);
      // dispatch(fetchCartRequest(user));
      cartApis
        .fetchCartData(user)
        .then((res) => {
          const cartResult = res.docs.map((doc) => ({
            id: doc.id,
            data: { ...doc.data() },
          }));
          console.log(cartResult);
          setCartData(cartResult);

          // console.log("res.data------------", res);
          // dispatch(fetchCartSuccess(res));
          setCartDataLoading(false);
        })
        .catch((err) => {
          // dispatch(fetchCartFail(err));
          setCartDataLoading(false);
        });
    }
  };
  const showModal = (message, cartId) => {
    setModalState({ ...modalState, visible: true, message: message, cartId });
  };
  const onChangeQuantity = (product, quantity) => {
    console.log(product);
    onChangeProductCartQuantity({
      product,
      quantity: quantity,
      onSuccess: (res) => {
        if (quantity && res) {
          cartApis
            .fetchCartData(user)
            .then((res) => {
              const cartResult = res.docs.map((doc) => ({
                id: doc.id,
                data: { ...doc.data() },
              }));
              console.log(cartResult);
              setCartData(cartResult);

              // console.log("res.data------------", res);
              // dispatch(fetchCartSuccess(res));
              setCartDataLoading(false);
            })
            .catch((err) => {
              // dispatch(fetchCartFail(err));
              setCartDataLoading(false);
            });
        }
      },
    });
  };
  const handleOk = (e) => {
    onRemoveProductFromCart({
      cartId: modalState.cartId,
      onSuccess: () => {
        setModalState({ ...modalState, visible: false });
        message.success("Product removed from cart");
        // dispatch(fetchCartRequest(user));

        cartApis
          .fetchCartData(user)
          .then((res) => {
            const cartResult = res.docs.map((doc) => ({
              id: doc.id,
              data: { ...doc.data() },
            }));
            console.log(cartResult);
            setCartData(cartResult);

            // console.log("res.data------------", res);
            // dispatch(fetchCartSuccess(res));
            setCartDataLoading(false);
          })
          .catch((err) => {
            // dispatch(fetchCartFail(err));
            setCartDataLoading(false);
          });
      },
      onError: (mes) => {
        setModalState({ ...modalState, visible: false });
        message.error(mes);
      },
    });
  };
  const handleCancel = (e) => {
    setModalState({ ...modalState, visible: false });
  };
  const onSubmitCoupon = (values) => {
    if (values.promo === "SOLE10") {
      setCuponApplied(true);
    }
    console.log("Success:", values);
  };
  const onSubmitCouponFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  let cartMetaData = {
    data: cartData,
    loading: cartDataLoading,
  };
  const items = [
    {
      route: "/",
      title: "Home",
      icon: <i className="fas fa-home" />,
    },

    {
      title: "Cart",
    },
  ];
  function itemRender(currentRoute, params, items, paths) {
    const isLast = currentRoute?.route === items[items.length - 1]?.route;

    return isLast ? (
      <span>{currentRoute.title}</span>
    ) : (
      <Link href={`${currentRoute.route}`}>
        {currentRoute.icon && currentRoute.icon}
        {currentRoute.title}
      </Link>
    );
  }
  return (
    <LayoutOne title="Shopping Cart">
      <Container>
        <Breadcrumb separator=">" itemRender={itemRender} items={items} />

        <ShopOrderStep current={1} />
        <FetchDataHandle
          emptyDescription="No product in cart"
          data={cartMetaData}
          renderData={(data) => {
            console.log("data-----", data);
            return (
              <div className="cart">
                <div className="shop-table">
                  <table>
                    <colgroup>
                      <col style={{ width: 150 / 16 + "em" }} />
                      <col style={{ width: "25%" }} />
                      <col style={{ width: "20%" }} />
                      <col style={{ width: "20%" }} />
                      <col style={{ width: "20%" }} />
                      <col style={{ width: "15%" }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>
                          <Tooltip title="Clear cart">
                            <Button
                              onClick={() =>
                                showModal(
                                  "Are you sure to remove all product from cart"
                                )
                              }
                              icon={<i className="fal fa-times" />}
                            ></Button>
                          </Tooltip>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length &&
                        data?.map((item, index) => (
                          <>
                            {index == 1 &&
                              console.log("I am data in map", item)}
                            <tr key={index}>
                              <td className="table-img">
                                <div className="table-img-wrapper">
                                  <img
                                    src={item.data.images[0]?.src}
                                    alt="Product image"
                                  />
                                </div>
                              </td>
                              <td className="table-name">{item.data.name}</td>
                              <td className="table-price">
                                {formatCurrency(item.data.price)}
                              </td>
                              <td>
                                <QuantitySelector
                                  max={item.quantity}
                                  onChange={(val) =>
                                    onChangeQuantity(item, val)
                                  }
                                  defaultValue={item.data.cartQuantity}
                                />
                              </td>
                              <td className="table-total">
                                {formatCurrency(
                                  item.data.price * item.data.cartQuantity
                                )}
                              </td>
                              <td className="table-remove">
                                <Tooltip title="Remove product">
                                  <Button
                                    onClick={() =>
                                      showModal(
                                        "Are you sure to remove this product from cart",
                                        item.id
                                      )
                                    }
                                    icon={<i className="fal fa-times" />}
                                  ></Button>
                                </Tooltip>
                              </td>
                            </tr>
                          </>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="cart-footer">
                  <div className="cart-footer__promo">
                    <Form
                      name="basic2"
                      onFinish={onSubmitCoupon}
                      onFinishFailed={onSubmitCouponFailed}
                    >
                      <Form.Item
                        name="promo"
                        rules={[
                          {
                            required: true,
                            message: "Please provide a coupon code",
                          },
                        ]}
                      >
                        <Input placeholder="Coupon code" />
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Apply coupon
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                  {/* <Button className="cart-footer__update" type="primary">
                    <Link
                      legacyBehavior
                      href={process.env.PUBLIC_URL + "/shop/shop-3-column"}
                    >
                      <a>Update cart</a>
                    </Link>
                  </Button> */}
                </div>
                <div className="cart-total">
                  <h5>Cart total</h5>
                  <table>
                    <tbody>
                      <tr>
                        <th>SUBTOTAL</th>
                        <td>{formatCurrency(calculateTotalPrice(cartData))}</td>
                      </tr>
                      <tr>
                        <th>SHIPPING</th>
                        <td>
                          <p>Free shipping</p>
                          <p>Calculate shipping</p>
                        </td>
                      </tr>
                      {cuponApplied && (
                        <tr>
                          <th>Coupon Applied</th>
                          <td>
                            <p>10% OFF</p>
                            <p></p>
                          </td>
                        </tr>
                      )}
                      <tr>
                        <th>Total</th>
                        <td>
                          {formatCurrency(
                            calculateTotalPrice(cartData, cuponApplied)
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="cart-total__checkout">
                    <Button type="primary" shape="round">
                      <Link
                        legacyBehavior
                        href={`${process.env.NEXT_PUBLIC_URL}/shop/checkout`}
                      >
                        <a>Proceed to Checkout</a>
                      </Link>
                    </Button>
                    <span> -</span>
                    <Button type="link">
                      <Link legacyBehavior href={process.env.PUBLIC_URL + "#"}>
                        <a>Check out with PayPal</a>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          }}
        />
        {/* <PartnerOne /> */}
      </Container>

      <Modal
        visible={modalState.visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{modalState.message}</p>
      </Modal>
    </LayoutOne>
  );
}

export default React.memo(cart);
