import React from "react";
import { Rate, Tabs, Form, Input, Button, Row, Col } from "antd";
import Markdown from "react-markdown";


const { TabPane } = Tabs;

const ReviewItem = ({ data }) => {
  return (
    <div className="product-detail-tab__reviews-item">
      <div className="product-detail-tab__reviews-item__avatar">
        <img src={data.user.avatar} alt="Customer avatar" />
        <Rate defaultValue={5} disabled />
      </div>
      <div className="product-detail-tab__reviews-item__content">
        <h5>{data.commentDate}</h5>
        <h3>{data.user.name}</h3>
        <p>{data.review}</p>
      </div>
    </div>
  );
};

function ProductDetailTab({ fullDescription, specifications, reviews }) {

  const onFinish = (values) => {};

  const onFinishFailed = (errorInfo) => {};
  return (
    <div className="product-detail-tab">
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Description" key="1">
          {/* <div className="product-detail-tab__description">
            {fullDescription}
          </div> */}
          <div style={{ fontSize: "18px", listStyleType: "none" }}>
            <Markdown>{fullDescription}</Markdown>
          </div>

          {/* <div dangerouslySetInnerHTML={{ __html: fullDescription }} /> */}
        </TabPane>
        <TabPane tab="Specifications" key="2">
          <div className="product-detail-tab__specifications">
            <table>
              <tbody>
                <tr>
                  <td>Weight</td>
                  <td>{specifications?.Weight}</td>
                </tr>

                <tr>
                  <td>Dimensions</td>
                  <td>
                    {specifications?.Length} x {specifications?.Width} x{" "}
                    {specifications?.Height}
                  </td>
                </tr>
                <tr>
                  <td>Color</td>
                  <td>{specifications?.Color}</td>
                </tr>
                <tr>
                  <td>Material</td>
                  <td>{specifications?.Material}</td>
                </tr>
                <tr>
                  <td>Accessories</td>
                  <td>{specifications?.Accessories}</td>
                </tr>
                <tr>
                  <td>Assembly</td>
                  <td>{specifications?.Assembly}</td>
                </tr>
              </tbody>
            </table>
            {/* <div
              className="product-content pdDesc"
              dangerouslySetInnerHTML={{ __html: specifications }}
            /> */}
          </div>
        </TabPane>
        <TabPane tab="Reviews" key="3">
          <div className="product-detail-tab__reviews">
            {reviews.map((item, index) => (
              <ReviewItem key={index} data={item} />
            ))}
            <div className="product-detail-tab__reviews-form">
              <h5>Add Review</h5>
              <Form
                name="review"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Row gutter={15}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="name"
                      rules={[
                        { required: true, message: "Please input your name!" },
                      ]}
                    >
                      <Input placeholder="Name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="email"
                      rules={[
                        { required: true, message: "Please input your email!" },
                      ]}
                    >
                      <Input placeholder="Email" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="rate" label="Your rating">
                      <Rate />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="message">
                      <Input.TextArea placeholder="Message" />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" shape="round">
                        Submit Review
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default React.memo(ProductDetailTab);
