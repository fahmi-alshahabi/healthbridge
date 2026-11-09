/* eslint-disable react-hooks/exhaustive-deps */
// Import necessary components and hooks from Ant Design, React, and Redux
import { message, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetAllDoctors, UpdateDoctor } from "../../apicalls/doctors";
import { ShowLoader } from "../../redux/loaderSlice";

// Component to display the list of doctors
function DoctorsList() {
  // State to manage the list of doctors
  const [doctors, setDoctors] = React.useState([]);

  // Redux dispatch function for managing actions
  const dispatch = useDispatch();

  // Fetch and set doctor data
  const fetchDoctors = async () => {
    try {
      dispatch(ShowLoader(true)); // Start loader
      const response = await GetAllDoctors(); // API call to fetch doctors

      if (response.success) {
        setDoctors(response.data); // Update doctors state
      } else {
        throw new Error(response.message); // Handle unsuccessful response
      }
    } catch (error) {
      message.error(error.message); // Show error message
    } finally {
      dispatch(ShowLoader(false)); // Stop loader
    }
  };

  // Update doctor status
  const updateDoctorStatus = async (statusPayload) => {
    try {
      dispatch(ShowLoader(true)); // Start loader
      const response = await UpdateDoctor(statusPayload); // API call to update status

      if (response.success) {
        message.success(response.message); // Success message
        fetchDoctors(); // Refresh doctor data
      } else {
        throw new Error(response.message); // Handle unsuccessful response
      }
    } catch (error) {
      message.error(error.message); // Show error message
    } finally {
      dispatch(ShowLoader(false)); // Stop loader
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchDoctors();
  }, []);

  // Table column configuration
  const tableColumns = [
    { title: "First Name", dataIndex: "firstName" },
    { title: "Last Name", dataIndex: "lastName" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },
    { title: "Speciality", dataIndex: "speciality" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => status.toUpperCase(), // Display status in uppercase
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        const actionButtons = [];

        if (record.status === "pending") {
          actionButtons.push(
            <span
              key="reject"
              className=" cursor-pointer red-button"
              onClick={() =>
                updateDoctorStatus({ ...record, status: "rejected" })
              }
            >
              Reject
            </span>,
            <span
              key="approve"
              className="cursor-pointer green-button"
              onClick={() =>
                updateDoctorStatus({ ...record, status: "approved" })
              }
            >
              Approve
            </span>
          );
        } else if (record.status === "approved") {
          actionButtons.push(
            <span
              key="block"
              className="red-button cursor-pointer"
              onClick={() =>
                updateDoctorStatus({ ...record, status: "blocked" })
              }
            >
              Block
            </span>
          );
        } else if (record.status === "blocked") {
          actionButtons.push(
            <span
              key="unblock"
              className="green-button cursor-pointer"
              onClick={() =>
                updateDoctorStatus({ ...record, status: "approved" })
              }
            >
              Unblock
            </span>
          );
        }

        return <div className="flex gap-1">{actionButtons}</div>;
      },
    },
  ];

  return (
    <div>
      <Table columns={tableColumns} dataSource={doctors} />
    </div>
  );
}

// Export the DoctorsList component
export default DoctorsList;
