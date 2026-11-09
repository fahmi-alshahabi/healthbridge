import React, { useEffect } from "react";
import { message, Table } from "antd";
import { useDispatch } from "react-redux";
import { GetAllUsers } from "../../apicalls/users";
import { ShowLoader } from "../../redux/loaderSlice";

function UsersList() {
  const [users, setUsers] = React.useState([]); // State to store user list
  const dispatch = useDispatch(); // Redux dispatch

  // Fetch user data from the API
  const fetchUsers = async () => {
    dispatch(ShowLoader(true));
    try {
      const response = await GetAllUsers();
      if (response.success) {
        setUsers(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(ShowLoader(false));
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Table columns configuration
  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Role", dataIndex: "role", render: (role) => role.toUpperCase() },
  ];

  return <Table columns={columns} dataSource={users} />;
}

export default UsersList;
