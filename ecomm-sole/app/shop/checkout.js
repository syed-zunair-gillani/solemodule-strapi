import React, { useState } from "react";
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
import { useRouter } from "next/router";
import { formatCurrency } from "../../common/utils";
import { calculateTotalPrice } from "../../common/shopUtils";
import LayoutOne from "../../components/layout/LayoutOne";
import Container from "../../components/other/Container";
import ShopOrderStep from "../../components/shop/ShopOrderStep";
import PartnerOne from "../../components/sections/partners/PartnerOne";
import FetchDataHandle from "../../components/other/FetchDataHandle";
import { auth } from "../../firebase";
import { storeCheckoutData, updateUserProfile } from "../../apis/users";
import { loadStripe } from "@stripe/stripe-js";
import { addWooCommerceOrder } from "../../services/wooComm";
import { LoadingOutlined } from "@ant-design/icons";

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderPlacedLoading, setOrderPlacedLoading] = useState(false);
  const router = useRouter();
  const cartState = useSelector((state) => state.cartReducer);
  const currentUser = auth.currentUser;
  const stripePromise = loadStripe(
    "pk_test_51OyRusSJA5mmgoyixOzKDvFMGzqdQDn6OUqpG9A54Pn9jvRxmmx71ffxlBLUJeHnKc0DMGKj3boEKxE47muC1JN300X97WRWyd"
  );
  const [form] = Form.useForm(); // Initialize form instance

  const onFinish = async (values) => {
    console.time("Order Placement Total Time");
    try {
      if (!currentUser) {
        throw new Error("No user authenticated");
      }
      console.timeEnd("Auth Check");
      // Validate form fields based on payment method
      console.time("Form Validation");
      if (paymentMethod === "cod") {
        // Validate fields for Cash on Delivery payment method
        const requiredFields = [
          "firstname",
          "lastname",
          "street",
          "city",
          "country",
          "email",
          "phone",
        ];
        for (const field of requiredFields) {
          if (!values[field]) {
            throw new Error(`${field} is required`);
          }
        }
      } else if (paymentMethod === "stripe") {
        // Validate fields for Stripe payment method
        const requiredFields = [
          "firstname",
          "lastname",
          "street",
          "city",
          "country",
          "email",
        ];
        for (const field of requiredFields) {
          if (!values[field]) {
            throw new Error(`${field} is required`);
          }
        }
      }
      console.timeEnd("Form Validation");
      // Store checkout data
      console.time("Store Checkout Data");
      await storeCheckoutData({ userId: currentUser.uid, ...values });
      console.timeEnd("Store Checkout Data");
      const orderData = {
        payment_method: paymentMethod, // Set appropriate payment method
        payment_method_title: "Payment on Delivery", // Set appropriate payment method title
        set_paid: false, // Set to true if you want the order to be marked as paid immediately
        status: "processing", // Set the status to "Processing"
        billing: {
          first_name: values?.firstname || "",
          last_name: values?.lastname || "",
          address_1: values?.street || "",
          city: values?.city || "",
          postcode: values?.zip || "",
          country: values?.country || "",
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
          country: values?.country || "",
        },
        line_items: cartState.data.map((item) => ({
          product_id: item.id, // Assuming item.id represents the product ID
          name: item.data.name, // Add product name
          quantity: item.data.cartQuantity,
          price: parseFloat(item.data?.price).toFixed(2), // Convert to string with 2 decimal places
          total: (
            parseFloat(item.data?.price) * item.data.cartQuantity
          ).toFixed(2), // Convert to string with 2 decimal places
        })),
        shipping_lines: [
          {
            method_id: "free_shipping", // Set the appropriate shipping method ID
            method_title: "Free shipping", // Set the appropriate shipping method title
            total: formatCurrency(calculateTotalPrice(cartState.data)), // Calculate total price of items
          },
        ],
        // customer_id: 123
      };

      // Place order
      if (paymentMethod === "cod") {
        // If Cash on Delivery, proceed directly
        console.time("Add WooCommerce Order");
        await addWooCommerceOrder(orderData);
        console.timeEnd("Add WooCommerce Order");
        router.push("/shop/order-complete");
      } else if (paymentMethod === "stripe") {
        // If Stripe, proceed to Stripe checkout
        handleStripePayment(orderData);
      }
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  const onPlaceOrder = () => {
    // Call onFinish to validate and process the order
    setOrderPlacedLoading(true);
    form
      .validateFields()
      .then(() => {
        onFinish(form.getFieldsValue());
      })
      .catch((error) => {
        console.error("Failed to validate fields:", error);
      })
      .finally(() => {
        setOrderPlacedLoading(false);
      });
  };

  const handleStripePayment = async (orderData) => {
    try {
      // Add the order to WooCommerce
      await addWooCommerceOrder(orderData);

      // Proceed with Stripe payment
      const stripe = await stripePromise;
      const lineItems = cartState.data.map((item) => ({
        price: "price_1OyXFjSJA5mmgoyirUQhUsqT", // Use the correct price ID or product ID from your Stripe account
        quantity: item.data.cartQuantity,
      }));

      const { error } = await stripe.redirectToCheckout({
        lineItems,
        mode: "payment",
        successUrl: "http://localhost:3000/shop/order-complete",
        cancelUrl: "http://localhost:3000/shop/checkout",
        clientReferenceId: currentUser.uid,
        customerEmail: currentUser.email,
      });

      if (error) {
        console.error("Error:", error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  const onChoosePaymentMethod = (e) => {
    const selectedMethod = e.target.value;
    setPaymentMethod(selectedMethod);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <LayoutOne title="Checkout">
      <Container>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <i className="fas fa-home" />
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item>Shop</Breadcrumb.Item>
          <Breadcrumb.Item>Checkout</Breadcrumb.Item>
        </Breadcrumb>
        <ShopOrderStep current={2} />
        <FetchDataHandle
          emptyDescription="No product in cart"
          data={cartState}
          renderData={(data) => (
            <div className="checkout">
              <Row gutter={50}>
                <Col xs={24} md={16}>
                  <div className="checkout-form">
                    <h3 className="checkout-title">Billing details</h3>
                    <Form
                      form={form} // Assign the form instance
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
                            label="Country"
                            name="country"
                            rules={[
                              {
                                required: true,
                                message: "Please choose your country!",
                              },
                            ]}
                          >
                            <Select defaultValue="vietnam">
                              <Select.Option value="vietnam">
                                vietnam
                              </Select.Option>
                              <Select.Option value="usa">USA</Select.Option>
                              <Select.Option value="japan">japan</Select.Option>
                            </Select>
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
                          <th>SUBTOTAL</th>
                          <td className="-bold -color">
                            {formatCurrency(calculateTotalPrice(data))}
                          </td>
                        </tr>

                        <tr>
                          <th>Total</th>
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
                      </Radio.Group>
                    </div>
                    <Button
                      className="checkout-sumbit"
                      type="primary"
                      shape="round"
                      onClick={onPlaceOrder} // Call onPlaceOrder when the button is clicked
                    >
                      Place order
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          )}
        />
        <PartnerOne />
      </Container>
    </LayoutOne>
  );
}

export default React.memo(Checkout);
