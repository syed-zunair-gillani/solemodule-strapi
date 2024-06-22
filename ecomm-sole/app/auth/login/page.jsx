"use client";
import {
  Breadcrumb,
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  message,
} from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import LayoutOne from "../../../components/layout/LayoutOne";
import Container from "../../../components/other/Container";
// import PartnerOne from "../../components/sections/partners/PartnerOne";
import { logInUser } from "../../../apis/login";
import { auth } from "../../../firebase";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if the user is already authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // If user is authenticated, redirect to homepage
        router.push("/");
      }
    });

    // Clean up function to unsubscribe from the auth state listener
    return () => unsubscribe();
  }, []);

  const onFinish = async (values) => {
    const { username, password } = values;
    setLoading(true);
    try {
      await logInUser(username, password);
      const user = auth.currentUser;

      if (user) {
        if (user.emailVerified) {
          // Redirect user to dashboard page if email is verified
          router.push("/");
        } else {
          message.error(
            "Your email is not verified. Please verify your email."
          );
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Sign-in failed:", error.message);
      if (error.code === "auth/invalid-credential") {
        message.error(
          "Invalid username or password. Please check your credentials."
        );
      } else {
        message.error("Sign-in failed. Please check your credentials.");
      }
      setLoading(false);
    }
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
      title: "Login",
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
    <LayoutOne title="Login">
      <Container>
        <Breadcrumb separator=">" itemRender={itemRender} items={items} />

        <div className="auth">
          <Row>
            <Col xs={24} md={{ span: 12, offset: 6 }}>
              <h2>Login</h2>
              <div className="auth-form">
                <Form
                  layout="vertical"
                  name="login"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Email address"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Email address!",
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
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    className="form-functions"
                    name="remember"
                    // valuePropName="checked"
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Button
                      type="link"
                      style={{ color: "#242464", fontSize: "16px" }}
                    >
                      <Link
                        legacyBehavior
                        href={
                          process.env.NEXT_PUBLIC_URL + "/auth/forgotPassword"
                        }
                      >
                        <a>Forgot Password?</a>
                      </Link>
                    </Button>
                  </Form.Item>
                  <Form.Item className="form-submit">
                    <Button
                      style={{
                        backgroundColor: "#242464",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                      htmlType="submit"
                      loading={loading}
                    >
                      Sign in
                    </Button>
                    <Button type="link">
                      <Link
                        legacyBehavior
                        href={process.env.NEXT_PUBLIC_URL + "/auth/register"}
                      >
                        <a>OR CREATE AN ACCOUNT</a>
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

export default Login;
