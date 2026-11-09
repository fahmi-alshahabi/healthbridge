/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { message, Tabs } from "antd";
import UsersList from "./UsersList";
import DoctorsList from "./DoctorsList";
import { useDispatch } from "react-redux";
import { ShowLoader } from "../../redux/loaderSlice";
import { GetUserById } from "../../apicalls/users";

function Admin() {
  const [isAdmin, setIsAdmin] = React.useState(false); // Tracks if user is an admin
  const user = JSON.parse(localStorage.getItem("user")); // Get user from localStorage
  const dispatch = useDispatch(); // Redux dispatch function

  // Check if the user is an admin
  const verifyAdminStatus = async () => {
    try {
      dispatch(ShowLoader(true));
      const response = await GetUserById(user.id);

      if (response.success && response.data.role === "admin") {
        setIsAdmin(true);
      } else {
        throw new Error("You are not an admin");
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(ShowLoader(false));
    }
  };

  useEffect(() => {
    verifyAdminStatus();
  }, []);

  return (
    isAdmin && (
      <div className="bg-white p-1">
        <Tabs>
          <Tabs.TabPane tab="Users" key="1">
            <UsersList />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Doctors" key="2">
            <DoctorsList />
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  );
}

export default Admin;
