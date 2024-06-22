import React from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { Form, Input, Button, Checkbox } from "antd";

const CustomForm = React.memo(({ status, message, onValidated }) => {
  const onFinish = (value) => {
    value &&
      onValidated({
        EMAIL: value.email,
      });
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <>
      <Form
        name="basic21"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="footer-subcribe__form"
      >
        <Form.Item
          noStyle={true}
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input
            placeholder="Enter your email"
            style={{
              backgroundColor: "#515192",
              color: "whitesmoke",
            }}
          />
        </Form.Item>
        <Form.Item noStyle={true}>
          <Button type="link" htmlType="submit" className="btn-customPrimary3">
            SUBSCRIBE
          </Button>
        </Form.Item>
      </Form>
      {status === "sending" && <div>sending...</div>}
      {status === "error" && (
        <div dangerouslySetInnerHTML={{ __html: message }} />
      )}
      {status === "success" && (
        <div dangerouslySetInnerHTML={{ __html: message }} />
      )}
    </>
  );
});

export default function FooterSubcribeInput({ url }) {
  return (
    <MailchimpSubscribe
      url={url}
      render={({ subscribe, status, message }) => (
        <CustomForm
          status={status}
          message={message}
          onValidated={(formData) => subscribe(formData)}
        />
      )}
    />
  );
}
