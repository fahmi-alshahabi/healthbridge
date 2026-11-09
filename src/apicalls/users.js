// Import Firebase configuration and required methods
import firestoreDatabase from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";

// Import CryptoJS for password encryption/decryption
import CryptoJS from "crypto-js";

// Secret used for password encryption (see .env.example)
const PASSWORD_SECRET = process.env.REACT_APP_PASSWORD_SECRET;

/**
 * Creates a new user in the Firebase database
 * @param {Object} payload - Contains user information (email, password, etc.)
 * @returns {Object} - Success/error status and message
 */
export const CreateUser = async (payload) => {
  try {
    // Check for existing user with the same email
    // This prevents duplicate accounts
    const qry = query(
      collection(firestoreDatabase, "users"),
      where("email", "==", payload.email)
    );
    const querySnapshot = await getDocs(qry);

    // If user exists, prevent account creation
    if (querySnapshot.size > 0) {
      throw new Error("User already exists");
    }

    // Encrypt the password before storing
    // Using AES encryption with a secret key supplied via environment variable
    const hashedPassword = CryptoJS.AES.encrypt(
      payload.password,
      PASSWORD_SECRET
    ).toString();
    payload.password = hashedPassword;

    // Create new user document in Firestore
    const docRef = collection(firestoreDatabase, "users");
    await addDoc(docRef, payload);

    // Return success response
    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error) {
    return error;
  }
};

/**
 * Authenticates a user login attempt
 * @param {Object} payload - Contains login credentials (email, password)
 * @returns {Object} - Success/error status, message, and user data if successful
 */
export const LoginUser = async (payload) => {
  try {
    // Search for user with provided email
    const qry = query(
      collection(firestoreDatabase, "users"),
      where("email", "==", payload.email)
    );
    const userSnapshots = await getDocs(qry);

    // Handle case where user doesn't exist
    if (userSnapshots.size === 0) {
      throw new Error("User does not exist");
    }

    // Get user data and decrypt stored password
    const user = userSnapshots.docs[0].data();
    user.id = userSnapshots.docs[0].id;
    const bytes = CryptoJS.AES.decrypt(user.password, PASSWORD_SECRET);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    // Verify password match
    if (originalPassword !== payload.password) {
      throw new Error("Incorrect password");
    }

    // Return success with user data
    return {
      success: true,
      message: "User logged in successfully",
      data: user,
    };
  } catch (error) {
    return error;
  }
};

/**
 * Retrieves all users from the database
 * @returns {Object} - Success/error status and array of user data
 */
export const GetAllUsers = async () => {
  try {
    // Fetch all user documents
    const users = await getDocs(collection(firestoreDatabase, "users"));

    // Transform documents to include both data and document ID
    return {
      success: true,
      data: users.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      }),
    };
  } catch (error) {
    return error;
  }
};

/**
 * Retrieves a specific user by their ID
 * @param {string} id - The user's document ID
 * @returns {Object} - Success/error status and user data
 */
export const GetUserById = async (id) => {
  try {
    // Fetch specific user document using ID
    const user = await getDoc(doc(firestoreDatabase, "users", id));

    // Return user data with document ID included
    return {
      success: true,
      data: {
        ...user.data(),
        id: user.id,
      },
    };
  } catch (error) {
    return error;
  }
};
