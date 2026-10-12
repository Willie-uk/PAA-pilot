import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utility/common";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface User {
  _id: string;
  name: string;
  email: string;
  picture?: string;
  isAdmin: boolean;
  provider: string;
  createdAt: string;
  stats: {
    requestsCount: number;
    feedbackCount: number;
    confidentialCount: number;
    medicAppsCount: number;
  };
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [adminPass, setAdminPass] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState("");

  const [exportPass, setExportPass] = useState("");
  const [showExportPrompt, setShowExportPrompt] = useState(false);
  const [exportError, setExportError] = useState("");
  const [exporting, setExporting] = useState(false);

  const navigate = useNavigate();

  const handleAdminVerify = async () => {
    try {
      setVerifying(true);
      const res = await axios.post(
        `${API_URL}/admin`,
        { pass: adminPass },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setIsVerified(true);
        setVerifyError("");
      } else {
        setVerifyError(res.data.message || "Invalid admin pass");
      }
    } catch (err: any) {
      setVerifyError(err.response?.data?.message || "Verification failed");
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    if (!isVerified) return;

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.post<{ data: User[] }>(
          `${API_URL}/admin-users`,
          { pass: adminPass },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUsers(res.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [isVerified]);

  const handleExport = () => {
    setShowExportPrompt(true);
    setExportPass("");
    setExportError("");
  };

  const confirmExport = async () => {
    try {
      setExporting(true);
      const res = await axios.post(
        `${API_URL}/admin`,
        { pass: exportPass },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.data.success) {
        setExportError("Invalid admin pass");
        return;
      }

      const ws = XLSX.utils.json_to_sheet(
        users.map((u) => ({
          Name: u.name,
          Email: u.email,
          Provider: u.provider,
          Admin: u.isAdmin ? "Yes" : "No",
          "Date Joined": new Date(u.createdAt).toLocaleString(),
          Requests: u.stats?.requestsCount ?? 0,
          Feedbacks: u.stats?.feedbackCount ?? 0,
          Confidential: u.stats?.confidentialCount ?? 0,
          "Medic Apps": u.stats?.medicAppsCount ?? 0,
        }))
      );

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Users");
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      saveAs(blob, "paa_users.xlsx");

      setShowExportPrompt(false);
    } catch (err: any) {
      setExportError("Export failed");
    } finally {
      setExporting(false);
    }
  };

  const handleBack = () => navigate("/paa", { replace: true });

  const filteredUsers = users
    .filter((u) =>
      [u.name, u.email, u.provider]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "requests") {
        return (b.stats?.requestsCount ?? 0) - (a.stats?.requestsCount ?? 0);
      }
      return 0;
    });

  useEffect(() => {
    if (verifyError) {
      const timer = setTimeout(() => {
        setVerifyError("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [verifyError]);

  useEffect(() => {
    if (exportError) {
      const timer = setTimeout(() => {
        setExportError("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [exportError]);

  if (!isVerified) {
    return (
      <div className="container d-flex flex-column justify-content-center align-items-center mt-5">
        <h3 className="mb-3">Admin Pass Required</h3>
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Enter Admin Pass"
          value={adminPass}
          onChange={(e) => setAdminPass(e.target.value)}
          style={{ maxWidth: "300px", borderRadius: "10px" }}
        />
        <button
          className="btn btn-dark"
          onClick={handleAdminVerify}
          disabled={verifying}
        >
          {verifying ? "Verifying..." : "Verify"}
        </button>
        {verifyError && (
          <div
            className="bg-danger fixed-top w-75 mx-auto mt-3 d-flex justify-content-between py-1"
            role="alert"
            style={{ zIndex: 1051, borderRadius: "15px" }}
          >
            <p className="text-center w-100 text-white">{verifyError}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container mt-4" style={{ overflowX: "auto" }}>
      <h1 className="my-5">
        All <span className="text-secondary fw-bold">PAA</span> Registered Users
      </h1>

      {showExportPrompt && (
        <div className="mb-4 p-3 border rounded bg-light">
          <h5>Admin Pass Required to Export</h5>
          <input
            type="password"
            className="form-control my-2"
            placeholder="Enter Admin Pass"
            value={exportPass}
            onChange={(e) => setExportPass(e.target.value)}
            style={{ maxWidth: "300px" }}
          />
          <div className="d-flex gap-2">
            <button
              className="btn btn-success"
              onClick={confirmExport}
              disabled={exporting}
            >
              {exporting ? "Verifying..." : "Confirm Export"}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowExportPrompt(false)}
            >
              Cancel
            </button>
          </div>
          {exportError && (
            <div
              className="bg-danger fixed-top w-75 mx-auto mt-3 d-flex justify-content-between py-1"
              role="alert"
              style={{
                zIndex: 1051,
                borderRadius: "15px",
                display: exportError ? "flex" : "none",
              }}
            >
              <p className="text-center w-100 text-white">{exportError}</p>
            </div>
          )}
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
        <h4>
          Total Users: <strong>{users.length}</strong> | Showing:{" "}
          <strong>{filteredUsers.length}</strong>
        </h4>
      </div>

      <input
        type="text"
        placeholder="Search by name, email, or provider"
        className="form-control mb-4"
        style={{ maxWidth: "400px", borderRadius: "10px" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="d-flex gap-2 flex-wrap">
        <select
          className="form-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="requests">Most Requests</option>
        </select>
        <button className="btn btn-success" onClick={handleExport}>
          Export to Excel
        </button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="d-flex justify-content-center">
          <Loader className="animate-spin-loader mx-auto" size={24} />
        </div>
      ) : (
        <motion.table
          className="table table-striped my-4"
          style={{ minWidth: "1200px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Provider</th>
              <th>Admin</th>
              <th>Date Joined</th>
              <th>Requests</th>
              <th>Feedbacks</th>
              <th>Confidential</th>
              <th>Medic Apps</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.provider}</td>
                <td>{user.isAdmin ? "Yes" : "No"}</td>
                <td>
                  {new Date(user.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </td>
                <td>{user.stats?.requestsCount ?? 0}</td>
                <td>{user.stats?.feedbackCount ?? 0}</td>
                <td>{user.stats?.confidentialCount ?? 0}</td>
                <td>{user.stats?.medicAppsCount ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </motion.table>
      )}

      <button className="btn btn-dark my-3 px-4" onClick={handleBack}>
        Back
      </button>
    </div>
  );
};

export default AdminUsers;
