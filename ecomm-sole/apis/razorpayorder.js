import { firestore, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const razorpayOrdersCollectionRef = collection(firestore, "soleOrders");

export const addRazorpayOrderData = async (data) => {
    console.log('data-----------',data);
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  const userId = user.uid;
  const timestamp = new Date().getTime(); // Get the current timestamp in milliseconds
  const docData = { ...data, userId, timestamp }; // Add the user ID and timestamp to the document data
  const docRef = await addDoc(razorpayOrdersCollectionRef, docData);
  console.log('docref-----------',docRef);

  return { id: docRef.id }; // Return the new document's ID
};
