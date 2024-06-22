// register.js
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const registerUser = async (email, password, firstName, lastName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update user profile with first name and last name
    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`,
    });

    // User created
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
