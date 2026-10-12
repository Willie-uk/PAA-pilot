import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL } from "../utility/common";
import { Loader } from "lucide-react";

// Define request type (you can extend this if needed)
interface RequestType {
  _id: string;
  category: string;
  county: string;
  date: string;
}

const AllRequests: React.FC = () => {
  const [requests, setRequests] = useState<RequestType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{ data: RequestType[] }>(
          `${API_URL}/all-requests`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setRequests(response.data.data);
      } catch (err: any) {
        console.error("Error fetching requests:", err);
        setError(err.response?.data?.message || "Failed to fetch requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleBack = (): void => {
    navigate(-1);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div
      className="container mt-4"
      style={{ overflowX: "scroll", scrollbarWidth: "none" }}
    >
      <h1 className="my-5">All Requests Data</h1>
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
          className="table table-striped"
          style={{ minWidth: "600px" }}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Category</th>
              <th scope="col">County</th>
              <th scope="col">Date (mm/dd/yy)</th>
            </tr>
          </thead>
          <motion.tbody>
            {requests.map((request, index) => (
              <motion.tr key={request._id} variants={itemVariants}>
                <th scope="row">{index + 1}</th>
                <td>{request.category}</td>
                <td>{request.county}</td>
                <td>{new Date(request.date).toLocaleString()}</td>
              </motion.tr>
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

export default AllRequests;
