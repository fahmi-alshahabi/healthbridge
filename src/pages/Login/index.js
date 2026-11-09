/* eslint-disable react-hooks/exhaustive-deps */
import { Form, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/users";
import { ShowLoader } from "../../redux/loaderSlice";

/**
 * Login Component
 * Handles user authentication and login functionality
 * Includes form validation, API integration, and navigation logic
 * @returns {JSX.Element} Login form interface
 */
function Login() {
  // Initialize hooks for navigation and state management
  const navigate = useNavigate(); // Used for programmatic navigation
  const dispatch = useDispatch(); // Used to dispatch Redux actions

  /**
   * Handle form submission
   * Processes user login credentials and manages authentication flow
   * @param {Object} values - Form values containing email and password
   */
  const onFinsh = async (values) => {
    try {
      // Show loading state
      dispatch(ShowLoader(true));

      // Attempt to login user with provided credentials
      const response = await LoginUser(values);

      // Hide loading state after response received
      dispatch(ShowLoader(false));

      if (response.success) {
        // Display success message to user
        message.success(response.message);

        // Store user data in localStorage, excluding password for security
        localStorage.setItem(
          "user",
          JSON.stringify({ ...response.data, password: "" })
        );

        // Redirect to home page after successful login
        navigate("/");
      } else {
        // If login unsuccessful, throw error with response message
        throw new Error(response.message);
      }
    } catch (error) {
      // Handle any errors during login process
      dispatch(ShowLoader(false));
      message.error(error.message);
    }
  };

  /**
   * Check authentication status on component mount
   * Redirects to home page if user is already logged in
   */
  useEffect(() => {
    // Retrieve user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // If user exists, redirect to home page
    if (user) navigate("/");
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    // Main container with center alignment
    <div className="register-b flex justify-center items-center h-screen">
      {/* Login form with vertical layout */}
      <Form
        layout="vertical"
        className="w-600 bg-white h-600 p-2 form-container"
        onFinish={onFinsh}
      >
        <h2
          className="h2-r uppercase my-1 cursor-pointer"
          onClick={() => navigate("/mainpage")}
        >
          <strong className="text-primary">HEALTH</strong>
          <strong className="text-secondary">BRIDGE</strong>
        </h2>
        <hr className="mb-1" />

        <Form.Item label="Email" name="email">
          <input
            placeholder="email@gmail.com"
            className="mb-1 input-r"
            type="email"
          />
        </Form.Item>

        <Form.Item label="Password" name="password">
          <input
            placeholder="Password"
            className="mb-2 input-r"
            type="password"
          />
        </Form.Item>

        <div className="divgap">
          <button
            className="button-r button-r:hover cursor-pointer contained-btn my-1 w-full"
            type="submit"
          >
            Login
          </button>

          {/* Registration link */}
          <Link className="underline" to="/register">
            Don't have an account? <strong>Sign Up</strong>
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default Login;
