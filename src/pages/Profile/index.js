/**
 * Profile Component
 * Displays user profile information and appointments
 * Different views for doctors and regular users
 */

import React from "react";
import { Tabs } from "antd"; // Ant Design tabs component
import Appointments from "./Appointments"; // Component for displaying appointments
import DoctorForm from "../DoctorForm"; // Form component for doctor details
import moment from "moment"; // Library for date formatting

function Profile() {
  // Get user data from localStorage for role-based rendering
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      {/* Tab container for profile sections */}
      <Tabs>
        {/* Appointments Tab
            Shows all appointments for the logged-in user */}
        <Tabs.TabPane tab="Appointments " key="1">
          <Appointments />
        </Tabs.TabPane>

        {/* Profile Information Tab
            Shows different views based on user role */}
        <Tabs.TabPane tab="Profile" key="2">
          {/* Doctor Profile View
              Renders doctor form for updating professional details */}
          {user.role === "doctor" && <DoctorForm />}

          {/* Regular User Profile View
              Shows basic user information */}
          {user.role !== "doctor" && (
            <div className="my-1  bg-white p-1 flex flex-col gap-1">
              {/* User's Name */}
              <div className="flex gap-2">
                <h4>
                  <b>Name : {user.name}</b>
                </h4>
              </div>

              {/* User's Email */}
              <div className="flex gap-2 ">
                <h4>
                  <b>Email : {user.email}</b>
                </h4>
              </div>

              {/* Account Creation Date
                  Formatted using moment.js for better readability */}
              <div className="flex gap-2">
                <h4>
                  <b>
                    Created On :{" "}
                    {moment(user?.createdAt).format("DD-MM-YYYY hh:mm A")}
                  </b>
                </h4>
              </div>
            </div>
          )}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
