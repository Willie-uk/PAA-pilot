import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL } from "../utility/common";
import { Loader } from "lucide-react";

interface User {
  name: string;
  email: string;
  phoneNumber: string;
}

interface ConfidentialType {
  _id: string;
  name: string;
  phoneNumber: string;
  message: string;
  createdAt: string;
  user?: User;
}

const AdminConfidential: React.FC = () => {
  const [confidentials, setConfidentials] = useState<ConfidentialType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [adminPass, setAdminPass] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState("");

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

    const fetchConfidentials = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{ data: ConfidentialType[] }>(
          `${API_URL}/admin-confidential`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setConfidentials(response.data.data);
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Failed to fetch confidentials"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchConfidentials();
  }, [isVerified]);

  const handleBack = () => {
    navigate("/paa", { replace: true });
  };

  const filtered = confidentials.filter((conf) => {
    const text =
      `${conf.name} ${conf.user?.email} ${conf.phoneNumber} ${conf.message}`.toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    if (verifyError) {
      const timer = setTimeout(() => {
        setVerifyError("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [verifyError]);

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
        All <span className="text-secondary fw-bold">PAA</span> Confidential
        Messages
      </h1>

      <input
        type="text"
        placeholder="Search by name, email, phone or message"
        className="form-control mb-4"
        style={{ maxWidth: "400px", borderRadius: "10px" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {error && (
        <div
          className="alert alert-danger"
          style={{
            backgroundColor: "red",
            width: "100%",
            color: "#fff",
            borderRadius: "15px",
          }}
        >
          {error}
        </div>
      )}

      {loading ? (
        <div className="d-flex justify-content-center">
          <Loader className="animate-spin-loader mx-auto" size={24} />
        </div>
      ) : (
        <motion.table
          className="table table-striped my-4"
          style={{ minWidth: "1000px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Date (dd/mm/yy)</th>
              <th>Acc Name</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <motion.tbody>
            {filtered.map((conf, index) => (
              <React.Fragment key={conf._id}>
                <motion.tr>
                  <th>{index + 1}</th>
                  <td>{conf.name}</td>
                  <td>{conf.user?.email}</td>
                  <td>
                    {new Date(conf.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })}
                  </td>
                  <td>{conf.user?.name}</td>
                  <td>{conf.phoneNumber}</td>
                </motion.tr>
                <motion.tr>
                  <td colSpan={6}>
                    <strong>Message:</strong> {conf.message}
                  </td>
                </motion.tr>
              </React.Fragment>
            ))}
          </motion.tbody>
        </motion.table>
      )}

      <p className="text-secondary">
        Scroll to the right to see the whole data table.
      </p>

      <button
        className="btn btn-dark my-3 px-4"
        style={{ borderRadius: "15px" }}
        onClick={handleBack}
      >
        Back
      </button>
    </div>
  );
};

export default AdminConfidential;
