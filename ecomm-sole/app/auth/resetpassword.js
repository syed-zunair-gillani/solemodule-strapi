import { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../../firebase"; // Import auth from your firebase configuration
import { Form, Input, Button, message, Breadcrumb, Row, Col } from "antd";
import { confirmPasswordReset } from "firebase/auth";
import LayoutOne from "../../components/layout/LayoutOne";
import Container from "../../components/other/Container";
import PartnerOne from "../../components/sections/partners/PartnerOne";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const onFinish = async () => {
    setLoading(true);
    try {
      if (newPassword !== confirmPassword) {
        message.error("Passwords do not match. Please try again.");
        return;
      }

      const oobCode = router.query.oobCode; // Extract oobCode from the router query

      await confirmPasswordReset(auth, oobCode, newPassword); // Confirm password reset with the oobCode and new password
      message.success("Password reset successfully.");
      router.push("/auth/login"); // Redirect to the login page after password reset
    } catch (error) {
      console.error("Error resetting password:", error);
      message.error("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Container>
      <div className="auth" style={{ margin: "50px" }}>
        <Row>
          <Col xs={24} md={{ span: 12, offset: 6 }}>
            <h2>Reset Password</h2>
            <div className="auth-form">
              <Form
                layout="vertical"
                name="resetPassword"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="New Password"
                  name="newPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your new password.",
                    },
                    {
                      min: 6,
                      message: "Password must be at least 6 characters.",
                    },
                  ]}
                >
                  <Input.Password
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your new password.",
                    },
                    {
                      validator: (_, value) => {
                        if (!value || value === newPassword) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("The two passwords do not match.")
                        );
                      },
                    },
                  ]}
                >
                  <Input.Password
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Reset Password
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ResetPassword;
