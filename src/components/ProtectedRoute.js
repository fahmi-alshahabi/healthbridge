/**
 * @component
 * @param {Object} props
 * @param {ReactNode} props.children - Child components to render in the protected route
 */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // Initialize navigation hook for programmatic routing
  const navigate = useNavigate();

  // Get user data from localStorage on component mount
  // This is used for displaying user information in the header
  const user = JSON.parse(localStorage.getItem("user"));

  /**
   * Authentication Check Effect
   * Runs on component mount to verify user authentication
   * Redirects to login page if no user is found
   */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    // Security check: Redirect unauthorized users to login
    if (!user) {
      navigate("/login");
    }
    // Disable exhaustive-deps warning as we only want this to run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="colour-main ">
      <div className="layout p-1 register-b">
        {/* Header Bar
          Contains app branding and user controls
          Fixed at the top of the layout */}
        <div className="header bg-white p-2 flex justify-between items-center">
          {/* App Logo/Branding
            Clickable to navigate to home page */}

          <div className="flex">
            <h2 className="cursor-pointer" onClick={() => navigate("/")}>
              <strong className="text-primary">HEALTH</strong>
              <strong className="text-secondary"> BRIDGE</strong>
            </h2>
          </div>
          {/* User Controls Section
            Only rendered if a user is logged in
            Contains profile information and logout option */}
          {user && (
            <div className="flex b gap-3 items-center">
              <h4
                class="uppercase cursor-pointer underline press-to-go-back"
                onClick={() => navigate("/contact")}
              >
                CONTACT
              </h4>
              <h4
                class="uppercase cursor-pointer underline press-to-go-back"
                onClick={() => navigate("/mainpage")}
              >
                Main Page
              </h4>
              {/* User Profile Display
                Shows user icon and name
                Clickable to navigate to profile/admin page */}
              <div className="flex gap-1 items-center">
                <i className="ri-shield-user-line"></i>
                <h4
                  className="uppercase cursor-pointer underline press-to-go-back"
                  onClick={() => {
                    // Role-based navigation:
                    // Admins go to admin dashboard
                    // Regular users go to profile
                    if (user.role === "admin") navigate("/admin");
                    else navigate("/profile");
                  }}
                >
                  {user.name}
                </h4>
              </div>

              {/* Logout Control
                Removes user session and redirects to login */}
              <i
                className="ri-logout-box-r-line press-to-go-back-logout-button"
                onClick={() => {
                  // Clear user session
                  localStorage.removeItem("user");
                  // Redirect to login page
                  navigate("/login");
                }}
              ></i>
            </div>
          )}
        </div>

        {/* Main Content Area
          Renders the child components passed to ProtectedRoute */}
        <div className="content my-1">{children}</div>
      </div>
    </div>
  );
}

export default ProtectedRoute;
