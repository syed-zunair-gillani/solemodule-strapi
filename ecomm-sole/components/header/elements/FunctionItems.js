import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../../firebase";
import { formatCurrency } from "../../../common/utils";
import { calculateTotalPrice } from "../../../common/shopUtils";
import {
  Select,
  Button,
  Menu,
  Dropdown,
  message,
  Drawer,
  Tooltip,
  Modal,
} from "antd";
import * as cartApis from "../../../apis/cart";
import FetchDataHandle from "@/components/other/FetchDataHandle";
import QuantitySelector from "@/components/other/QuantitySelector";
import {
  onChangeProductCartQuantity,
  onRemoveProductFromCart,
} from "@/common/cartServices";
function FunctionItems({ hideTotal, hideWishlist }) {
  const [user, setUser] = useState(null);
  const cartState = useSelector((state) => state.cartReducer);
  const [modalState, setModalState] = useState({
    visible: false,
    message: "Add some message",
    cartId: null,
  });
  const [cartData, setCartData] = useState([]);
  const [cartDataLoading, setCartDataLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  let cartMetaData = {
    data: cartData,
    loading: cartDataLoading,
  };
  const onShowDrawer = () => {
    setVisible(true);
  };
  const showModal = (message, cartId) => {
    setModalState({ ...modalState, visible: true, message: message, cartId });
  };
  const onCloseDrawer = () => {
    setVisible(false);
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

  useEffect(() => {
    // Check if the user is already authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Clean up function to unsubscribe from the auth state listener
    return () => unsubscribe();
  }, []);

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
  }, [user, cartState]);
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
          console.log("function items function items", cartResult);
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
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        message.success("User Logout Successfully");
      })
      .catch((error) => {
        console.error("Error occurred during logout:", error.message);
      });
  };

  const menu = (
    <Menu>
      <Menu.Item legacyBehavior key="profile">
        <Link legacyBehavior href="/auth/profile">
          <a>My Profile</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <div className="function-items px-1 " style={{ display: "flex" }}>
        {!hideWishlist && (
          <Link
            legacyBehavior
            href={process.env.NEXT_PUBLIC_URL + "/shop/wishlist"}
          >
            <a className="function-items-item">
              <img
                src={
                  process.env.NEXT_PUBLIC_URL +
                  "/assets/images/header/heart.svg"
                }
                style={{ height: "30px" }}
              />
            </a>
          </Link>
        )}
        {/* <>
          <a
            onClick={onShowDrawer}
            className="function-items-item"
            style={{ position: "relative", display: "inline-block" }}
          >
            <img
              src={
                process.env.NEXT_PUBLIC_URL +
                "/assets/images/header/addToCart.svg"
              }
              style={{ height: "30px" }}
            />
            <span
              style={{
                position: "absolute",
                top: "0px",
                left: "19px",
                color: "white",

                fontSize: "15px",
              }}
            >
              {cartData.length}
            </span>
          </a>
        </> */}
        <Link legacyBehavior href={process.env.NEXT_PUBLIC_URL + "/shop/cart"}>
          <a
            className="function-items-item"
            style={{ position: "relative", display: "inline-block" }}
          >
            <img
              src={
                process.env.NEXT_PUBLIC_URL +
                "/assets/images/header/addToCart.svg"
              }
              style={{ height: "30px" }}
            />
            <span
              style={{
                position: "absolute",
                top: "0px",
                left: "19px",
                color: "white",

                fontSize: "15px",
              }}
            >
              {""}
            </span>
          </a>
        </Link>
        <Link legacyBehavior href={process.env.NEXT_PUBLIC_URL + "/shop/cart"}>
          <>
            {user ? (
              <>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <span style={{ cursor: "pointer" }}>
                    <img
                      src={
                        process.env.NEXT_PUBLIC_URL +
                        "/assets/images/header/account.svg"
                      }
                      style={{ height: "30px" }}
                    />
                  </span>
                </Dropdown>
                <span className="text-muted" style={{ marginLeft: "10px" }}>
                  {" "}
                  Hi, {user.displayName}
                </span>
              </>
            ) : (
              <>
                {" "}
                <img
                  src={
                    process.env.NEXT_PUBLIC_URL +
                    "/assets/images/header/account.svg"
                  }
                  style={{ height: "25px" }}
                />
                <Link href="/auth/login" style={{ marginLeft: "10px" }}>
                  {" "}
                  Login{" "}
                </Link>
              </>
            )}
          </>
        </Link>
      </div>
      <>
        <Drawer
          title="Close"
          placement="right"
          closable={true}
          onClose={onCloseDrawer}
          open={visible}
          width={820}
        >
          <FetchDataHandle
            emptyDescription="No product in cart"
            data={cartMetaData}
            renderData={(data) => {
              console.log("data-----", data);
              return (
                <>
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
                                  <td className="table-name">
                                    {item.data.name}
                                  </td>
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
                  </div>
                  <li className="navigation-item">
                    <Button
                      legacyBehavior
                      leg
                      href={process.env.NEXT_PUBLIC_URL + `shop/cart`}
                    >
                      <a className="navigation-item__title">Proceed To Cart</a>
                    </Button>
                  </li>
                </>
              );
            }}
          />
        </Drawer>
        <Modal
          visible={modalState.visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>{modalState.message}</p>
        </Modal>
      </>
    </>
  );
}

export default React.memo(FunctionItems);
