// Import necessary dependencies from libraries
import { Col, message, Row } from "antd";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllDoctors } from "../../apicalls/doctors";
import { ShowLoader } from "../../redux/loaderSlice";

/**
 * DoctorCard Component
 * Renders individual doctor information in a card format
 * @param {Object} doctor - Doctor information object
 * @param {Function} onClick - Click handler for the card
 */
const DoctorCard = ({ doctor, onClick }) => {
  // Define details array for consistent rendering of doctor information
  const details = [
    { label: "Speciality", value: doctor.speciality },
    { label: "Experience", value: `${doctor.experience} Years` },
    { label: "Email", value: doctor.email },
    { label: "Phone", value: doctor.phone },
  ];

  return (
    <div
      className="bg-white p-1 flex flex-col gap-1 cursor-pointer"
      onClick={onClick}
    >
      {/* Doctor name header */}
      <div className="flex justify-between w-full">
        <h2 className="uppercase">
          {doctor.firstName} {doctor.lastName}
        </h2>
      </div>
      <hr />
      {/* Map through doctor details */}
      {details.map(({ label, value }) => (
        <div key={label} className="flex justify-between w-full">
          <h4>
            <b>{label} : </b>
          </h4>
          <h4>{value}</h4>
        </div>
      ))}
    </div>
  );
};

/**
 * Home Component
 * Main component for displaying the list of doctors and search functionality
 */
const Home = () => {
  // State management
  const [doctors, setDoctors] = useState([]); // Store all doctors
  const [searchQuery, setSearchQuery] = useState(""); // Store search input
  const [filteredDoctors, setFilteredDoctors] = useState([]); // Store filtered doctors based on search

  // Initialize hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  /**
   * Fetch doctors data from the API
   * Uses useCallback to memoize the function
   */
  const fetchDoctors = useCallback(async () => {
    try {
      dispatch(ShowLoader(true)); // Show loading state
      const response = await GetAllDoctors();

      if (response.success) {
        setDoctors(response.data);
        setFilteredDoctors(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(ShowLoader(false)); // Hide loading state
    }
  }, [dispatch]);

  // Fetch doctors data on component mount
  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  /**
   * Filter doctors based on search query
   * Updates whenever search query or doctors list changes
   */
  useEffect(() => {
    const filtered = doctors.filter(
      (doctor) =>
        doctor.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.speciality.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [searchQuery, doctors]);

  // Return null if no user is logged in
  if (!user) {
    return null;
  }

  return (
    <div>
      {/* Search and Apply Doctor section */}
      <div className="flex justify-between">
        <div>
          <input
            placeholder="Search doctors by name or speciality"
            className="w-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* Show Apply Doctor button only for non-doctor users */}
        {user?.role !== "doctor" && (
          <button
            className="apply-doctor press-to-go-back"
            onClick={() => navigate("/apply-doctor")}
          >
            Apply doctor
          </button>
        )}
      </div>

      {/* Doctors grid layout */}
      <Row gutter={[16, 16]} className="my-1">
        {filteredDoctors.map((doctor) => (
          <Col span={8} key={doctor.id}>
            <DoctorCard
              doctor={doctor}
              onClick={() => navigate(`/book-appointment/${doctor.id}`)}
            />
          </Col>
        ))}
      </Row>

      {/* No results message */}
      {filteredDoctors.length === 0 && (
        <div className="text-center my-4">
          No doctors found matching your search criteria
        </div>
      )}
    </div>
  );
};

export default Home;
