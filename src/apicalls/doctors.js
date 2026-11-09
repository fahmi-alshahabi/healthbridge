import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore"; // Importing Firestore methods for database operations
import firestoreDatabase from "../firebaseConfig"; // Importing Firebase configuration

// Function to add a new doctor to the 'doctors' collection and update their role in the 'users' collection
export const AddDoctor = async (payload) => {
  try {
    const doctorRef = doc(firestoreDatabase, "doctors", payload.userId); // Reference to 'doctors' collection
    const userRef = doc(firestoreDatabase, "users", payload.userId); // Reference to 'users' collection

    // Add doctor data to the 'doctors' collection
    await setDoc(doctorRef, payload);
    // Update user role to 'doctor' in the 'users' collection
    await updateDoc(userRef, { role: "doctor" });

    return {
      success: true,
      message: "Doctor added successfully, please wait for approval",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message, // Return error message if something goes wrong
    };
  }
};

// Function to check if a doctor account has been applied using the user's ID
export const CheckIfDoctorAccountIsApplied = async (id) => {
  try {
    const doctorsRef = collection(firestoreDatabase, "doctors"); // Reference to 'doctors' collection
    const doctorQuery = query(doctorsRef, where("userId", "==", id)); // Query to find doctor by userId
    const doctors = await getDocs(doctorQuery); // Execute the query

    if (doctors.size > 0) {
      // If there is a doctor document
      const doctorData = doctors.docs.map((doc) => ({
        ...doc.data(), // Get doctor data
        id: doc.id, // Get document ID
      }))[0];

      return {
        success: true,
        message: "Doctor account already applied", // Return success message with data
        data: doctorData,
      };
    }

    return {
      success: false,
      message: "Doctor account not applied", // Return message if doctor account doesn't exist
    };
  } catch (error) {
    return {
      success: false,
      message: error.message, // Return error message if an error occurs
    };
  }
};

// Function to retrieve all doctors from the 'doctors' collection
export const GetAllDoctors = async () => {
  try {
    const doctorsRef = collection(firestoreDatabase, "doctors"); // Reference to 'doctors' collection
    const doctorsSnapshot = await getDocs(doctorsRef); // Get all documents from the 'doctors' collection

    const doctorsData = doctorsSnapshot.docs.map((doc) => ({
      ...doc.data(), // Get doctor data
      id: doc.id, // Get document ID
    }));

    return {
      success: true,
      data: doctorsData, // Return success message with all doctor data
    };
  } catch (error) {
    return {
      success: false,
      message: error.message, // Return error message if an error occurs
    };
  }
};

// Function to update the details of a specific doctor in the 'doctors' collection
export const UpdateDoctor = async (payload) => {
  try {
    const doctorRef = doc(firestoreDatabase, "doctors", payload.id); // Reference to the specific doctor document
    await setDoc(doctorRef, payload); // Update doctor document with new data

    return {
      success: true,
      message: "Doctor updated successfully", // Return success message
    };
  } catch (error) {
    return {
      success: false,
      message: error.message, // Return error message if an error occurs
    };
  }
};

// Function to retrieve a specific doctor's details by their document ID
export const GetDoctorById = async (id) => {
  try {
    const doctorRef = doc(firestoreDatabase, "doctors", id); // Reference to the specific doctor document
    const doctorSnapshot = await getDoc(doctorRef); // Get the document by ID

    return {
      success: true,
      data: doctorSnapshot.data(), // Return the doctor's data
    };
  } catch (error) {
    return {
      success: false,
      message: error.message, // Return error message if an error occurs
    };
  }
};
