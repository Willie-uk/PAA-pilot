import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Welcome: React.FC = () => {
  const { user } = useAuthStore();

  // Get the current hour
  const currentHour = new Date().getHours();

  // Determine the greeting based on the time of day
  let greeting: string;
  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 16) {
    greeting = "Good Afternoon";
  } else if (currentHour < 20) {
    greeting = "Good Evening";
  } else {
    greeting = "Happy Night";
  }

  // Determine if the business is open or closed (Open: 8 AM to 5 PM)
  const isOpen: boolean = currentHour >= 8 && currentHour < 17;
  const businessStatus: string = isOpen ? "Open" : "Closed";

  // Conditional color styles for open/closed status
  const statusStyle: React.CSSProperties = {
    color: isOpen ? "#007bff" : "orange",
  };

  return (
    <div className="container d-flex flex-column" style={{ marginTop: "80px" }}>
      <div className="w-100 d-flex d-md-none">
        <ul
          className="mx-auto px-2 d-flex align-items-center py-2 my-2 list-unstyled overflow-scroll"
          style={{
            backgroundColor: "#e1e1e1",
            borderRadius: "15px",
            scrollbarWidth: "none",
          }}
        >
          <li className="nav-item ms-4">
            <Link
              className="nav-link paa-link-hover active text-decoration-none"
              to="/paa"
            >
              Home
            </Link>
          </li>
          <li className="nav-item ms-4">
            <Link
              className="nav-link paa-link-hover text-decoration-none"
              to="/paa/a"
            >
              About
            </Link>
          </li>
          <li className="nav-item ms-4">
            <Link
              className="nav-link paa-link-hover text-decoration-none"
              to="/paa/n"
            >
              Notification
            </Link>
          </li>
          <li className="nav-item ms-4">
            <Link
              className="nav-link paa-link-hover text-decoration-none"
              to="/paa/c"
            >
              Contact
            </Link>
          </li>
          <li className="nav-item ms-4">
            <Link
              className="nav-link paa-link-hover text-decoration-none"
              to="/paa/analysis"
            >
              Analysis
            </Link>
          </li>
          <li className="nav-item ms-4">
            <Link
              className="nav-link paa-link-hover text-decoration-none"
              to="/a/request"
            >
              Data
            </Link>
          </li>
        </ul>
      </div>
      <div className="d-flex align-items-end my-3 justify-content-around">
        <h1 className="display-6">
          {greeting}, {user?.name}!
        </h1>
        <h2
          className="d-none d-sm-flex"
          style={{ ...statusStyle, fontSize: "14px" }}
        >
          Status: {businessStatus}
        </h2>
      </div>
    </div>
  );
};

export default Welcome;
