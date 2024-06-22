import axios from "axios";

const createPaymentIntent = async (amount, paymentMethod) => {
  try {
    // Send a POST request to your backend endpoint using axios
    const response = await axios.post("/create-payment-intent", {
      amount,
      paymentMethod,
    });

    // If the response is successful, return the client secret
    if (response.status === 200) {
      return response.data.clientSecret;
    } else {
      // If there's an error, throw an error with the message from the backend
      throw new Error(response.data.error);
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error creating payment intent:", error.message);
    throw error;
  }
};

export default createPaymentIntent;
