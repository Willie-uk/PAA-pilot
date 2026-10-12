import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL } from "../utility/common";
import { Loader } from "lucide-react";

interface User {
  name: string;
  email: string;
}

interface Feedback {
  _id: string;
  feedback: string;
  rating: number;
  createdAt: string;
  user?: User;
}

const AdminFeedback: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [adminPass, setAdminPass] = useState("");
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState("");

  const navigate = useNavigate();

  // Admin verification before accessing page
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
        setIsVerified(true); // No localStorage — stateless verification
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
    if (verifyError) {
      const timer = setTimeout(() => {
        setVerifyError("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [verifyError]);

  useEffect(() => {
    if (!isVerified) return;

    const fetchFeedback = async () => {
      setLoading(true);
      try {
        const res = await axios.get<{ data: Feedback[] }>(
          `${API_URL}/admin-feedback`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFeedbacks(res.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch feedback");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [isVerified]);

  const handleBack = () => navigate("/paa", { replace: true });

  const filteredFeedbacks = feedbacks.filter((f) => {
    const combined = `${f.user?.name || ""} ${f.user?.email || ""} ${
      f.feedback
    } ${f.rating}`.toLowerCase();
    return combined.includes(searchTerm.toLowerCase());
  });

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
        All <span className="text-secondary fw-bold">PAA</span> Feedback
        Messages
      </h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name, email, feedback or rating"
        className="form-control mb-4"
        style={{ maxWidth: "400px", borderRadius: "10px" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {error && <div className="alert alert-danger">{error}</div>}

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
              <th>Feedback</th>
              <th>Rating (★)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.map((f, index) => (
              <tr key={f._id}>
                <td>{index + 1}</td>
                <td>{f.user?.name}</td>
                <td>{f.user?.email}</td>
                <td>{f.feedback}</td>
                <td>{f.rating}★</td>
                <td>
                  {new Date(f.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </td>
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

export default AdminFeedback;
