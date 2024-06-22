import { firestore, auth } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";

const url = "/wishlist";
const wishlistCollectionRef = collection(firestore, "wishlist");

export const fetchWishlistData = async (user) => {
  try {
    if (!user) {
      throw new Error("User not authenticated");
    }

    const userId = user.uid;

    const snapshot = await getDocs(
      query(
        wishlistCollectionRef,
        where("userId", "==", userId),
        orderBy("timestamp", "desc")
      )
    );

    const wishlistResult = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: { ...doc.data() },
    }));

    return wishlistResult;
  } catch (error) {
    console.error("Error fetching wishlist data:", error);
    throw error;
  }
};

export const fetchProductIdWishlistData = async (pid) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated");
    }

    const userId = user.uid;

    const q = query(
      wishlistCollectionRef,
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
    console.error("Error fetching wishlist data:", error);
    throw error;
  }
};

export const addWishlistData = async (data) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  const userId = user.uid;
  const timestamp = new Date().getTime(); // Get the current timestamp in milliseconds
  const docData = { ...data, userId, timestamp }; // Add the user ID and timestamp to the document data
  const docRef = await addDoc(wishlistCollectionRef, docData);

  return { id: docRef.id }; // Return the new document's ID
};

export const removeWishlistData = async (wishlistId) => {
  const wishlistDocRef = doc(firestore, "wishlist", wishlistId);
  const result = await deleteDoc(wishlistDocRef);
  return result;
};
