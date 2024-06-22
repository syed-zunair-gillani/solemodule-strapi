"use client";
import { Breadcrumb, Row, Col, Form, Input, Button, Select } from "antd";
import React, { useEffect, useState } from "react";
import LayoutOne from "../../../components/layout/LayoutOne";
import Container from "../../../components/other/Container";
import { auth } from "../../../firebase";
import { updateUserProfile, fetchUpdatedUserData } from "../../../apis/users";
import { min } from "moment";
import Link from "next/link";
const { Option } = Select;

function MyProfile() {
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState({
    flatno: "",
    street: "",
    area: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [loading, setLoading] = useState(true);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const userData = await fetchUpdatedUserData(currentUser.uid);
        setUser(userData);
        setAddress(userData.address || {}); // Set address fields from user data
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const onFinish = async (values) => {
    try {
      if (!user) {
        throw new Error("No user authenticated");
      }

      await updateUserProfile(user, { ...address }); // Update profile with new address

      // Fetch updated user data after profile update
      const updatedUserData = await fetchUpdatedUserData(user.uid);

      setUser(updatedUserData); // Update user state with the fetched data
      setIsEditingAddress(false); // Hide the form after updating address
    } catch (error) {
      console.error("Failed to update profile:", error);
      setError(error.message); // Set error message
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setError("Failed to update profile");
  };

  const onAddressInputChange = (fieldName) => (e) => {
    setAddress({
      ...address,
      [fieldName]: e.target.value,
    });
  };

  const handleEditAddress = () => {
    setIsEditingAddress(true);
  };

  const states = ["Maharashtra", "Alaska", "Arizona", "Arkansas"];

  if (loading) return <div>Loading user...</div>;
  const items = [
    {
      route: "/",
      title: "Home",
      icon: <i className="fas fa-home" />,
    },

    {
      title: "My Profile",
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
    <LayoutOne title="My Profile">
      <Container>
        <Breadcrumb separator=">" itemRender={itemRender} items={items} />

        <div className="myprofile">
          <Row gutter={16}>
            <Col span={12}>
              <div className="myprofile-details">
                <div>
                  <p>
                    <strong>Name:</strong> {user.name}
                  </p>
                </div>

                <div>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Flat, House no, Building:</strong> {user.flatno}
                  </p>
                  <p>
                    <strong>Area, Street, Sector, village:</strong>{" "}
                    {user.street}
                  </p>
                  <p>
                    <strong>Landmark:</strong> {user.area}
                  </p>
                  <p>
                    <strong>City:</strong> {user.city}
                  </p>
                  <p>
                    <strong>State:</strong> {user.state}
                  </p>
                  <p>
                    <strong>Postcode / ZIP (optional):</strong>{" "}
                    {user.postalCode}
                  </p>
                  <p>
                    <strong>Country:</strong> {user.country}
                  </p>
                </div>
              </div>
            </Col>
            <Col span={12}>
              {isEditingAddress ? (
                <Form
                  name="edit-address"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item label="Flat, House no, Building" name="flatno">
                    <Input
                      placeholder=""
                      value={address.flatno}
                      onChange={onAddressInputChange("flatno")}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Area, Street, Sector, village"
                    name="street"
                  >
                    <Input
                      placeholder=""
                      value={address.street}
                      onChange={onAddressInputChange("street")}
                      rules={[
                        {
                          required: false,
                          message: "Enter street name",
                        },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item label="Landmark" name="area">
                    <Input
                      placeholder=""
                      value={address.area}
                      onChange={onAddressInputChange("area")}
                    />
                  </Form.Item>
                  <Form.Item
                    label="City"
                    name="city"
                    rules={[
                      {
                        required: true,
                        message: "Enter a city!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="City"
                      value={address.city}
                      onChange={onAddressInputChange("city")}
                    />
                  </Form.Item>
                  <Form.Item
                    label="State"
                    name="state"
                    rules={[
                      {
                        required: true,
                        message: "Please select a state!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select a state"
                      value={address.state}
                      onChange={(value) =>
                        onAddressInputChange("state")({ target: { value } })
                      }
                    >
                      {states.map((state) => (
                        <Option key={state} value={state}>
                          {state}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Postcode / ZIP (optional)"
                    name="postalCode"
                    rules={[
                      {
                        min: 6,
                        message: "Password must be at least 6 characters long!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="6 digits [0-9] PIN code"
                      value={address.postalCode}
                      onChange={onAddressInputChange("postalCode")}
                    />
                  </Form.Item>
                  <Form.Item label="Country" name="country">
                    <Input
                      placeholder="Country"
                      value={address.country}
                      onChange={onAddressInputChange("country")}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Update Profile
                    </Button>
                  </Form.Item>
                </Form>
              ) : (
                <Button type="primary" onClick={handleEditAddress}>
                  Edit Address
                </Button>
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </LayoutOne>
  );
}

export default React.memo(MyProfile);
