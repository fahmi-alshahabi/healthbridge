/* eslint-disable no-unused-vars */
// Import Firebase methods and database config
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import firestoreDatabase from "../firebaseConfig";

// Book new appointment
export const BookDoctorAppointment = async (payload) => {
  try {
    const result = await addDoc(
      collection(firestoreDatabase, "appointments"),
      payload
    );
    return {
      success: true,
      message: "Appointment booked successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Get doctor's appointments for specific date
export const GetDoctorAppointmentsOnDate = async (doctorId, date) => {
  try {
    const appointmentsRef = collection(firestoreDatabase, "appointments");
    const appointmentQuery = query(
      appointmentsRef,
      where("doctorId", "==", doctorId),
      where("date", "==", date)
    );

    const querySnapshot = await getDocs(appointmentQuery);
    const data = querySnapshot.docs.map((doc) => doc.data());

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Get all appointments for a doctor
export const GetDoctorAppointments = async (doctorId) => {
  try {
    const appointmentsRef = collection(firestoreDatabase, "appointments");
    const appointmentQuery = query(
      appointmentsRef,
      where("doctorId", "==", doctorId)
    );

    const querySnapshot = await getDocs(appointmentQuery);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Get all appointments for a user
export const GetUserAppointments = async (userId) => {
  try {
    const appointmentsRef = collection(firestoreDatabase, "appointments");
    const appointmentQuery = query(
      appointmentsRef,
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(appointmentQuery);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Update appointment status
export const UpdateAppointmentStatus = async (id, status) => {
  try {
    const appointmentRef = doc(firestoreDatabase, "appointments", id);
    await updateDoc(appointmentRef, { status });

    return {
      success: true,
      message: "Appointment status updated",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
