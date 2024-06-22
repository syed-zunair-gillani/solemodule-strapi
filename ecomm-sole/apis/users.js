import { firestore, auth } from "../firebase";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
} from "firebase/firestore";

export const updateUserProfile = async (user, data) => {
  if (!user || !user.uid) {
    throw new Error("Invalid user data");
  }

  const userDocRef = doc(firestore, "users", user.uid);

  try {
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();

    if (userDocSnapshot.exists()) {
      // Update user data with the provided data
      const updatedUserData = { ...userData, ...data };

      // Check if address data is provided and update it directly in the user document
      if (
        data.flatno &&
        data.street &&
        data.area &&
        data.city &&
        data.state &&
        data.postalCode &&
        data.country
      ) {
        updatedUserData.flatno = data.flatno || "";
        updatedUserData.street = data.street || "";
        updatedUserData.area = data.area || "";
        updatedUserData.city = data.city || "";
        updatedUserData.state = data.state || "";
        updatedUserData.postalCode = data.postalCode || "";
        updatedUserData.country = data.country || "";
      }

      await setDoc(userDocRef, updatedUserData);
    } else {
      const defaultData = {
        // Set name, email, uid based on user authentication data
        name: user.displayName || "",
        email: user.email || "",
        uid: user.uid || "",
        // Spread other data from the form
        ...data,
      };

      // If address data is provided, include it directly in the user document
      if (
        data.flatno &&
        data.street &&
        data.area &&
        data.city &&
        data.state &&
        data.postalCode &&
        data.country
      ) {
        defaultData.flatno = data.flatno || "";
        defaultData.street = data.street || "";
        defaultData.area = data.area || "";
        defaultData.city = data.city || "";
        defaultData.state = data.state || "";
        defaultData.postalCode = data.postalCode || "";
        defaultData.country = data.country || "";
      }

      await setDoc(userDocRef, defaultData);
    }

    return true;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const fetchUpdatedUserData = async (userId) => {
  try {
    const userDocRef = doc(firestore, "users", userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();

      return userData;
    } else {
      // Fetch user data from Firebase Authentication
      const currentUser = auth.currentUser;
      if (currentUser) {
        const { displayName, email, uid } = currentUser;
        // Set default user data
        const defaultUserData = {
          name: displayName || "",
          email: email || "",
          uid: uid || "",
        };
        // Store default user data to Firestore
        await setDoc(userDocRef, defaultUserData);

        return defaultUserData;
      } else {
        return null;
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const storeCheckoutData = async (checkoutData) => {
  try {
    // Validate checkoutData object to ensure no undefined values
    for (const key in checkoutData) {
      if (checkoutData[key] === undefined) {
        delete checkoutData[key]; // Remove undefined fields
      }
    }

    // Check if userId is provided in checkoutData
    if (!checkoutData.userId) {
      throw new Error("Invalid checkout data. userId is missing.");
    }

    const userId = checkoutData.userId; // Extract userId
    delete checkoutData.userId; // Remove userId from checkoutData

    // Proceed to store checkout data only if no undefined values are found
    if (Object.keys(checkoutData).length > 0) {
      const userDocRef = doc(firestore, "users", userId);

      // Store checkout data in the user's document
      await setDoc(userDocRef, checkoutData, { merge: true });

      return true;
    } else {
      console.error("Invalid checkout data. No undefined values allowed.");
      return false;
    }
  } catch (error) {
    console.error("Error storing checkout data:", error);
    throw error;
  }
};
