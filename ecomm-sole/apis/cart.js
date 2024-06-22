import axiosService from "../common/axiosService";
import { API_URL } from "../common/defines";
import { renderParam } from "../common/utils";
import { firestore, auth } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";

const url = "/cart";

const cartCollectionRef = collection(firestore, "cart");

export const fetchCartData = async (user) => {
  try {
    console.log(user);
    if (!user) {
      throw new Error("User not authenticated");
    }

    const userId = user.uid;

    const snapshot = await getDocs(
      query(
        cartCollectionRef,
        where("userId", "==", userId),
        orderBy("timestamp", "desc")
      )
    );

    console.log("Cart Snapshot from firebase", snapshot);
    return snapshot;
  } catch (error) {
    console.error("Error fetching cart data:", error);
    throw error;
  }
};

export const fetchProductIdCartData = async (pid) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User not authenticated");
    }

    const userId = user.uid;

    const q = query(
      cartCollectionRef,
      where("productId", "==", pid),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(q);
    const result = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return result;
  } catch (error) {
    console.error("Error fetching cart data:", error);
    throw error;
  }
};

export const addCartData = async (data) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  const userId = user.uid;
  const timestamp = new Date().getTime(); // Get the current timestamp in milliseconds
  const docData = { ...data, userId, timestamp }; // Add the user ID and timestamp to the document data
  const docRef = await addDoc(cartCollectionRef, docData);

  return { id: docRef.id }; // Return the new document's ID
};

export const removeCartData = async (cartId) => {
  const cartDocRef = doc(firestore, "cart", cartId);

  const result = await deleteDoc(cartDocRef);

  return result;
};

export const updateCartData = async (cartId, data) => {
  try {
    const cartDocRef = doc(firestore, "cart", cartId);
    const cartDocSnapshot = await getDoc(cartDocRef);
    if (cartDocSnapshot.exists()) {
      await updateDoc(cartDocRef, data);
      const updatedCartDocSnapshot = await getDoc(cartDocRef);
      const updatedData = updatedCartDocSnapshot.data();

      return updatedData;
    } else {
      console.error("Document does not exist for cartId:", cartId);
      throw new Error("Document does not exist");
    }
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};
