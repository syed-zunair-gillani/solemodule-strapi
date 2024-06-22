"use client";
import { useState } from "react";
import { Breadcrumb, Form, Input, Button, Row, Col, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter
import LayoutOne from "../../../components/layout/LayoutOne";
import Container from "../../../components/other/Container";
import PartnerOne from "../../../components/sections/partners/PartnerOne";
import { registerUser } from "../../../apis/register";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize useRouter

  const onFinish = async (values) => {
    const { email, password, firstName, lastName } = values;
    setLoading(true);
    try {
      const user = await registerUser(email, password, firstName, lastName);
      console.log("Success:", user);
      message.success("User registered successfully!");
      // Redirect to login page after successful registration
      router.push("/auth/login");
    } catch (error) {
      console.error("Registration failed:", error.message);
      if (error.code === "auth/email-already-in-use") {
        message.error("User is already registered. Please login.");
      } else {
        message.error("Registration failed. Please try again.");
      }
    }
    setLoading(false);
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
      title: "Register",
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
    <LayoutOne title="Register">
      <Container>
        <Breadcrumb separator=">" itemRender={itemRender} items={items} />

        <div className="auth">
          <Row>
            <Col xs={24} md={{ span: 12, offset: 6 }}>
              <h2>Register new account</h2>
              <div className="auth-form">
                <Form
                  layout="vertical"
                  name="register2"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your first name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your last name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Email address"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                      {
                        min: 6,
                        message: "Password must be at least 6 characters long!",
                      },
                      {
                        pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).*$/,
                        message:
                          "Password must contain at least one uppercase letter, one special character, and one number!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            "The two passwords that you entered do not match!"
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item className="form-submit">
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Register
                    </Button>
                    <Button type="link">
                      <Link
                        legacyBehavior
                        href={process.env.NEXT_PUBLIC_URL + "/auth/login"}
                      >
                        <a>OR Login</a>
                      </Link>
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
        {/* <PartnerOne /> */}
      </Container>
    </LayoutOne>
  );
};

export default Register;
