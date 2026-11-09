/**
 * Appointments Component
 * Displays and manages appointments for both doctors and patients
 * Only doctors can approve/reject appointments
 */

import { message, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  GetDoctorAppointments,
  GetUserAppointments,
  UpdateAppointmentStatus,
} from "../../apicalls/appointments";
import { ShowLoader } from "../../redux/loaderSlice";

function Appointments() {
  const [appointments, setAppointments] = React.useState([]);
  const dispatch = useDispatch();
  // Store user data for role-based permissions
  const user = JSON.parse(localStorage.getItem("user"));

  /**
   * Fetches appointments data based on user role
   */
  const getData = async () => {
    const response =
      user.role === "doctor"
        ? await GetDoctorAppointments(user.id)
        : await GetUserAppointments(user.id);

    if (response.success) {
      setAppointments(response.data);
    }
  };

  /**
   * Updates the status of an appointment
   * Only accessible to doctors
   * @param {string} id - Appointment ID
   * @param {string} status - New status ('approved' or 'cancelled')
   */
  const onUpdate = async (id, status) => {
    try {
      dispatch(ShowLoader(true));
      const response = await UpdateAppointmentStatus(id, status);

      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(ShowLoader(false));
    }
  };

  // Define table columns configuration
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Time",
      dataIndex: "slot",
    },
    {
      title: "Doctor",
      dataIndex: "doctorName",
    },
    {
      title: "Patient",
      dataIndex: "userName",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    // Only show action column for doctors
    ...(user.role === "doctor"
      ? [
          {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
              <div className="flex gap-1">
                {/* Only show action buttons for pending appointments */}
                {record.status === "pending" && (
                  <>
                    <span
                      className="red-button cursor-pointer text-red-600"
                      onClick={() => onUpdate(record.id, "cancelled")}
                    >
                      Reject
                    </span>
                    <span
                      className=" cursor-pointer text-green-600 green-button"
                      onClick={() => onUpdate(record.id, "approved")}
                    >
                      Approve
                    </span>
                  </>
                )}
              </div>
            ),
          },
        ]
      : []), // Empty array if user is not a doctor
  ];

  // Fetch appointments data on component mount
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Table columns={columns} dataSource={appointments || []} />;
}

export default Appointments;
