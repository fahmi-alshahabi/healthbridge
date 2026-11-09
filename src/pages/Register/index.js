/**
 * Register Component
 * Handles user registration functionality including form validation and submission
 * Includes redirect logic for authenticated users
 */

// Import required dependencies and components
import { Form, message } from "antd"; // Ant Design components for form and notifications
import React, { useEffect } from "react";
import { useDispatch } from "react-redux"; // Redux dispatch hook for state management
import { Link, useNavigate } from "react-router-dom"; // Router components for navigation
import { CreateUser } from "../../apicalls/users"; // API call for user creation
import { ShowLoader } from "../../redux/loaderSlice"; // Redux action for loading state

function Register() {
  // Initialize hooks for navigation and Redux dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * Handle form submission
   * Creates new user account and handles success/error responses
   * @param {Object} values - Form values (name, email, password)
   */
  const onFinish = async (values) => {
    try {
      // Show loading state
      dispatch(ShowLoader(true));

      // Make API call to create user with form values
      const response = await CreateUser({
        ...values,
        role: "user", // Set default role as "user"
      });

      // Hide loading state
      dispatch(ShowLoader(false));

      // Handle successful registration
      if (response.success) {
        message.success(response.message);
        navigate("/login"); // Redirect to login page
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      // Handle registration error
      dispatch(ShowLoader(false));
      message.error(error.message);
    }
  };

  /**
   * Check authentication status on component mount
   * Redirects to home page if user is already logged in
   */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // Main container with centered content
    <div className="register-b flex justify-center items-center h-screen">
      {/* Registration form */}
      <Form
        layout="vertical"
        className="w-600 bg-white h-600 p-2 form-container"
        onFinish={onFinish}
      >
        {/* Form header */}
        <h2
          className="h2-r uppercase my-1 cursor-pointer"
          onClick={() => navigate("/mainpage")}
        >
          <strong className="text-primary">HEALTH</strong>
          <strong className="text-secondary">BRIDGE</strong>
        </h2>
        <hr className="mb-1" />

        {/* Form input fields */}
        {/* Name input */}
        <Form.Item label="Name" name="name">
          <input placeholder="Name" className="mb-1 input-r" type="text" />
        </Form.Item>

        {/* Email input */}
        <Form.Item label="Email" name="email">
          <input
            placeholder="email@gmail.com"
            className="mb-1 input-r"
            type="email"
          />
        </Form.Item>

        {/* Password input */}
        <Form.Item label="Password" name="password">
          <input
            placeholder="Password"
            className="mb-2 input-r"
            type="password"
          />
        </Form.Item>

        {/* Submit button */}
        <button
          className="button-r button-r:hover cursor-pointer contained-btn my-1 w-full"
          type="submit"
        >
          REGISTER
        </button>

        {/* Login page link for existing users */}
        <Link className="underline" to="/login">
          Already have an account? <strong>Sign In</strong>
        </Link>
      </Form>
    </div>
  );
}

export default Register;
