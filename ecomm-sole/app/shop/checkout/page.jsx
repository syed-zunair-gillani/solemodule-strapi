"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSelector } from "react-redux";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Select,
  Radio,
  Breadcrumb,
} from "antd";
import useRazorpay from "react-razorpay";

import { formatCurrency } from "../../../common/utils";
import { calculateTotalPrice } from "../../../common/shopUtils";
import LayoutOne from "../../../components/layout/LayoutOne";
import Container from "../../../components/other/Container";
import ShopOrderStep from "../../../components/shop/ShopOrderStep";
import PartnerOne from "../../../components/sections/partners/PartnerOne";
import FetchDataHandle from "../../../components/other/FetchDataHandle";
import { auth } from "../../../firebase";
import { storeCheckoutData, updateUserProfile } from "../../../apis/users";
import { loadStripe } from "@stripe/stripe-js";
import { addWooCommerceOrder } from "../../../services/wooComm";
import * as cartApis from "../../../apis/cart";
import Link from "next/link";
import { getDatabase, ref, push, set } from "firebase/database";
import { addRazorpayOrderData } from "@/apis/razorpayorder";
import { useRouter } from "next/navigation";
import { LoadingOutlined } from "@ant-design/icons";

function Checkout() {
  const [Razorpay] = useRazorpay();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [placeOrderLoading, setPlaceOrderloading] = useState(false);
  const [cartDataLoading, setCartDataLoading] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [user, setUser] = useState(null);
  const stripePromise = loadStripe(
    "pk_test_51OyRusSJA5mmgoyixOzKDvFMGzqdQDn6OUqpG9A54Pn9jvRxmmx71ffxlBLUJeHnKc0DMGKj3boEKxE47muC1JN300X97WRWyd"
  );
  const [form] = Form.useForm();
  // const searchParams = useSearchParams();
  // const cuponApplied = searchParams.get("cuponApplied");
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user);
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchCartsData(user);
  }, [user]);

  const fetchCartsData = (user) => {
    if (user) {
      setCartDataLoading(true);
      cartApis
        .fetchCartData(user)
        .then((res) => {
          const cartResult = res.docs.map((doc) => ({
            id: doc.id,
            data: { ...doc.data() },
          }));
          console.log(cartResult);
          setCartData(cartResult);
          setCartDataLoading(false);
        })
        .catch((err) => {
          setCartDataLoading(false);
        });
    }
  };

  let cartMetaData = {
    data: cartData,
    loading: cartDataLoading,
  };

  const onFinish = async (values) => {
    try {
      if (!user) {
        throw new Error("No user authenticated");
      }

      if (paymentMethod === "cod") {
        const requiredFields = [
          "firstname",
          "lastname",
          "street",
          "city",
          // "country",
          "email",
          "phone",
        ];
        for (const field of requiredFields) {
          if (!values[field]) {
            throw new Error(`${field} is required`);
          }
        }
      } else if (paymentMethod === "stripe") {
        const requiredFields = [
          "firstname",
          "lastname",
          "street",
          "city",
          // "country",
          "email",
        ];
        for (const field of requiredFields) {
          if (!values[field]) {
            throw new Error(`${field} is required`);
          }
        }
      }

      await storeCheckoutData({ userId: user.uid, ...values });

      const orderData = {
        payment_method: paymentMethod,
        payment_method_title: "Payment on Delivery",
        set_paid: false,
        status: "processing",
        billing: {
          first_name: values?.firstname || "",
          last_name: values?.lastname || "",
          address_1: values?.street || "",
          city: values?.city || "",
          postcode: values?.zip || "",
          // country: values?.country || "",
          email: values?.email || "",
          phone: values?.phone || "",
          company: values?.company || "",
        },
        shipping: {
          first_name: values?.firstname || "",
          last_name: values?.lastname || "",
          address_1: values?.street || "",
          city: values?.city || "",
          postcode: values?.zip || "",
          // country: values?.country || ""
        },
        line_items: cartData?.map((item) => ({
          product_id: item.id,
          name: item.data.name,
          quantity: item.data.cartQuantity,
          price: parseFloat(item.data?.price).toFixed(2),
          total: (
            parseFloat(item.data?.price) * item.data.cartQuantity
          ).toFixed(2),
        })),
        shipping_lines: [
          {
            method_id: "free_shipping",
            method_title: "Free shipping",
            total: "0.00",
          },
        ],
      };

      if (paymentMethod === "cod") {
        await addWooCommerceOrder(orderData);
        router.push("/shop/order-complete");
      } else if (paymentMethod === "stripe") {
        handleStripePayment(orderData);
      } else if (paymentMethod === "razorpay") {
        handleRazorpayPayment(orderData, values);
      }
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  const onPlaceOrder = () => {
    setPlaceOrderloading(true);
    form
      .validateFields()
      .then(() => {
        onFinish(form.getFieldsValue());
      })
      .catch((error) => {
        console.error("Failed to validate fields:", error);
        setPlaceOrderloading(false);
      })
      .finally(() => {});
  };

  const handleStripePayment = async (orderData) => {
    try {
      await addWooCommerceOrder(orderData);
      const stripe = await stripePromise;
      const lineItems = cartData.map((item) => ({
        price: "price_1OyXFjSJA5mmgoyirUQhUsqT",
        quantity: item.data.cartQuantity,
      }));

      const { error } = await stripe.redirectToCheckout({
        lineItems,
        mode: "payment",
        successUrl: "http://localhost:3000/shop/order-complete",
        cancelUrl: "http://localhost:3000/shop/checkout",
        clientReferenceId: user.uid,
        customerEmail: user.email,
      });

      if (error) {
        console.error("Error:", error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRazorpayPayment = async (orderData, values) => {
    try {
      const totalAmount = calculateTotalPrice(cartData); // Convert to paisa
      const response = await fetch(
        "https://solemodulerazorpaygetpayment-a63zwdp6ta-uc.a.run.app/get-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: totalAmount }),
        }
      );
      const data = await response.json();
      const options = {
        key: "rzp_live_AYX3IdgKp4qIz1",
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Sole Module",
        description: "Sole Module",
        image: process.env.NEXT_PUBLIC_URL + "/assets/images/soleLogo.png",
        order_id: data.order.id,
        handler: function (response) {
          // Save the order data to the database
          const orderDataToSave = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            customer_details: {
              name: values.firstname + " " + values.lastname,
              email: values.email,
              phone: values.phone,
              address:
                values.street + ", " + values.city + ", " + values.country,
            },
            total_amount: totalAmount,
            payment_method: "razorpay",
          };

          // Save Razorpay order data to Firebase
          addRazorpayOrderData(orderDataToSave)
            .then(() => {
              console.log("Order data saved to Firebase");
              // After saving order data to Firebase, add the order to WooCommerce
              addWooCommerceOrder(orderData)
                .then(() => {
                  console.log("Order added to WooCommerce");
                  router.push("/shop/order-complete"); // Redirect to order completion page
                })
                .catch((error) => {
                  console.error("Error adding order to WooCommerce:", error);
                });
            })
            .catch((error) => {
              console.error("Error saving order data to Firebase:", error);
            });
        },
        theme: {
          color: "#3399cc",
        },
      };
      const paymentObject = new Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onChoosePaymentMethod = (e) => {
    const selectedMethod = e.target.value;
    setPaymentMethod(selectedMethod);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const items = [
    {
      route: "/",
      title: "Home",
      icon: <i className="fas fa-home" />,
    },
    {
      title: "Checkout Page",
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
    <LayoutOne title="Checkout">
      <Container>
        <Breadcrumb separator=">" itemRender={itemRender} items={items} />
        <ShopOrderStep current={2} />

        <FetchDataHandle
          emptyDescription="No product in cart"
          data={cartMetaData}
          renderData={(data) => (
            <div className="checkout">
              <Row gutter={50}>
                <Col xs={24} md={16}>
                  <div className="checkout-form">
                    <h3 className="checkout-title">Billing details</h3>

                    <Form
                      form={form}
                      name="checkout2"
                      layout="vertical"
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      id="checkout-form"
                    >
                      <Row gutter={15}>
                        <Col xs={24} sm={12}>
                          <Form.Item
                            label="First name"
                            name="firstname"
                            rules={[
                              {
                                required: true,
                                message: "Please input your first name!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Form.Item
                            label="Last name"
                            name="lastname"
                            rules={[
                              {
                                required: true,
                                message: "Please input your last name!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            label="Company name (optional)"
                            name="company"
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            label="Street address"
                            name="street"
                            rules={[
                              {
                                required: true,
                                message: "Please input your street addres!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            label="Postcode / ZIP (optional)"
                            name="zip"
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            label="Town / City"
                            name="city"
                            rules={[
                              {
                                required: true,
                                message: "Please input your Town/City!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[
                              {
                                required: true,
                                message: "Please input your phone!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            label="Email address"
                            name="email"
                            rules={[
                              {
                                required: true,
                                message: "Please input your email address!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item name="other-address">
                            <h3 className="checkout-title">Shipping Address</h3>
                            <Checkbox>Ship to a different address?</Checkbox>
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item label="Order notes (optional)" name="note">
                            <Input.TextArea />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Col>
                <Col xs={24} md={8}>
                  <div className="checkout-total">
                    <h3 className="checkout-title">Your order</h3>
                    <table className="checkout-total__table">
                      <tbody>
                        {data.map((item, index) => (
                          <tr key={index}>
                            <td>
                              {item.data.name} x {item.data.cartQuantity}
                            </td>
                            <td className="-bold ">
                              {formatCurrency(
                                item.data.price * item.data.cartQuantity
                              )}
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td className="-bold">SUBTOTAL</td>
                          <td className="-bold -color">
                            {formatCurrency(calculateTotalPrice(data))}
                          </td>
                        </tr>

                        {true && (
                          <tr>
                            <td className="-bold">COUPON APPLIED</td>
                            <td>
                              <p>SOLE10 10% 0FF</p>
                            </td>
                          </tr>
                        )}
                        <tr>
                          <td className="-bold">Total</td>
                          <td
                            style={{ fontSize: 20 / 16 + "em" }}
                            className="-bold -color"
                          >
                            {formatCurrency(calculateTotalPrice(data, true))}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="checkout-total__footer">
                      <Radio.Group
                        onChange={onChoosePaymentMethod}
                        value={paymentMethod}
                      >
                        <Radio style={{ display: "block" }} value="cod">
                          Cash on delivery
                        </Radio>
                        <Radio style={{ display: "block" }} value="stripe">
                          Stripe
                        </Radio>
                        <Radio style={{ display: "block" }} value="razorpay">
                          RazorPay
                        </Radio>
                      </Radio.Group>
                    </div>
                    <Button
                      className="checkout-sumbit"
                      type="primary"
                      shape="round"
                      onClick={onPlaceOrder}
                      icon={
                        placeOrderLoading ? (
                          <LoadingOutlined spin />
                        ) : (
                          <i className="" />
                        )
                      }
                    >
                      Place order
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          )}
        />

        {/* <PartnerOne /> */}
      </Container>
    </LayoutOne>
  );
}

export default React.memo(Checkout);
