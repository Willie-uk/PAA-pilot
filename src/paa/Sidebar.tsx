import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import {
  Home,
  User,
  Bell,
  Mail,
  BarChart3,
  LineChart,
  Power,
} from "lucide-react";

const Sidebar: React.FC = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    navigate("/login");
  };

  return (
    <div id="sideBar">
      <div className="container nav-expand-sm">
        <div className="nav flex-column paa-sidebar">
          <Link
            className="btn paa-anim tooltip"
            to="/paa"
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Home"
          >
            <Home size={16} />
          </Link>

          <Link
            className="btn paa-anim tooltip"
            to="/paa/c"
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Contact"
          >
            <User size={16} />
          </Link>

          <Link
            className="btn paa-anim tooltip"
            to="/paa/n"
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Notifications"
          >
            <Bell size={16} />
          </Link>

          <a
            className="btn paa-anim tooltip"
            href="mailto:patientassist@gmail.com"
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Email"
          >
            <Mail size={16} />
          </a>

          <Link
            className="btn paa-anim tooltip"
            to="/paa/analysis"
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Analysis"
          >
            <BarChart3 size={16} />
          </Link>

          <Link
            className="btn paa-anim tooltip"
            to="/paa/all/requests"
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Data"
          >
            <LineChart size={16} />
          </Link>

          <a
            className="btn paa-anim mt-5 tooltip"
            role="button"
            onClick={handleLogout}
            style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Logout"
          >
            <Power size={18} className="text-danger" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
