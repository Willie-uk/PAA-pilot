import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL } from "../utility/common";
import { Loader } from "lucide-react";

interface Medic {
  _id: string;
  name: string;
  email: string;
  phone: string;
  social: string;
  role: string;
  createdAt: string;
}

const AdminMedics: React.FC = () => {
  const [medics, setMedics] = useState<Medic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

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
    if (verifyError) {
      const timer = setTimeout(() => {
        setVerifyError("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [verifyError]);

  useEffect(() => {
    if (!isVerified) return;

    const fetchMedics = async () => {
      setLoading(true);
      try {
        const res = await axios.get<{ data: Medic[] }>(
          `${API_URL}/admin-medics`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setMedics(res.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch medics");
      } finally {
        setLoading(false);
      }
    };

    fetchMedics();
  }, [isVerified]);

  const handleBack = () => navigate("/paa", { replace: true });

  const filteredMedics = medics.filter((m) =>
    [m.name, m.email, m.phone, m.role]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

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
        All <span className="text-secondary fw-bold">PAA</span> Registered
        Medics
      </h1>

      <input
        type="text"
        placeholder="Search by name, email, phone, or role"
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
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Social ID</th>
              <th>Date (dd/mm/yy)</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedics.map((medic, index) => (
              <tr key={medic._id}>
                <td>{index + 1}</td>
                <td>{medic.name}</td>
                <td>{medic.email}</td>
                <td>{medic.phone}</td>
                <td>{medic.role}</td>
                <td>{medic.social}</td>
                <td>
                  {new Date(medic.createdAt).toLocaleDateString("en-GB", {
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

export default AdminMedics;
