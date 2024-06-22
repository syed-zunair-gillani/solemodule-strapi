"use client";
import { useState } from "react";
import { Form, Input, Button, message, Row, Col } from "antd";
import axios from "axios"; // Import axios to make HTTP requests
import Container from "../../../components/other/Container";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    const { email } = values;
    setLoading(true);
    try {
      // Make a POST request to your Express API endpoint
      const response = await axios.post(
        "https://soleresetpassword-a63zwdp6ta-uc.a.run.app/api/passwordReset",
        { email }
      );
      const { status, message: responseMessage } = response.data.data; // Extract status and message from the response
      if (status === "success") {
        message.success("Email sent successfully"); // Display success message from the response
      } else {
        message.error(responseMessage); // Display error message from the response
      }
    } catch (error) {
      if (error.response) {
        // Handle HTTP errors from backend
        message.error(error.response.data.error);
      } else {
        console.error("Error sending password reset email:", error);
        message.error("Failed to send password reset email.");
      }
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <>
      <Container>
        <div className="auth" style={{ margin: "50px" }}>
          <Row>
            <Col xs={24} md={{ span: 12, offset: 6 }}>
              <h2>Reset Password</h2>
              <div className="auth-form">
                <Form
                  layout="vertical"
                  name="forgotPassword"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Email address"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Email address!",
                      },
                      {
                        type: "email",
                        message: "Please enter a valid email address",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item className="form-submit">
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Send Reset Email
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default ForgotPassword;
