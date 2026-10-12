import React, { useState, type ChangeEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Loader } from "lucide-react";
import { API_URL } from "../utility/common";

interface LocationState {
  category?: string;
  county?: string;
}

const Request: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { category, county } = (location.state || {}) as LocationState;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [requestDetails] = useState({
    category: category || "",
    county: county || "",
  });

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
  };

  const isPhoneNumberValid = () => {
    return phoneNumber.length === 10 && /^\d+$/.test(phoneNumber);
  };

  const handleContinue = async () => {
    const selectedDate = new Date();

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_URL}/submit-request`,
        {
          category: requestDetails.category,
          county: requestDetails.county,
          date: selectedDate,
          phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data.success) {
        navigate("/receipt", {
          state: { ...requestDetails, phoneNumber, date: selectedDate },
          replace: true,
        });
      } else {
        setError("Failed to submit request");
      }
    } catch (error: any) {
      console.error("Error sending request data", error);
      setError(error.response?.data?.message || "Error submitting request");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/paa", { replace: true });
  };

  return (
    <motion.div
      className="container mt-4 d-flex align-items-center justify-content-center flex-column"
      style={{ height: "100vh" }}
    >
      <h2 className="text-center mb-4 display-4">Confirm your Request</h2>

      <p className="text-center">
        You are requesting a {requestDetails.category} from{" "}
        {requestDetails.county}?
      </p>

      <div className="mb-3 d-none">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <input
          type="text"
          className="form-control"
          id="category"
          value={requestDetails.category}
          readOnly
        />
      </div>

      <div className="mb-3 d-none">
        <label htmlFor="county" className="form-label">
          County
        </label>
        <input
          type="text"
          className="form-control"
          id="county"
          value={requestDetails.county}
          readOnly
        />
      </div>

      <div className="mt-4 w-100">
        <input
          type="number"
          className="form-control mx-auto"
          id="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="Enter your phone number eg. 07... or 01..."
          style={{ borderRadius: "15px", width: "100%", maxWidth: "800px" }}
          required
        />
      </div>

      <p className="mb-4 form-label text-center" style={{ color: "#d1d1d1" }}>
        Your phone number where {requestDetails.category}'s details will be sent
      </p>

      {error && (
        <div
          className="alert py-1"
          style={{
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: "15px",
          }}
        >
          {error}
        </div>
      )}

      <div className="d-flex justify-content-center gap-2">
        <button
          style={{ borderRadius: "14px" }}
          className="btn btn-danger w-50"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="btn btn-dark w-50 py-2"
          type="submit"
          style={{ borderRadius: "14px" }}
          disabled={isLoading || !isPhoneNumberValid()}
          onClick={handleContinue}
        >
          {isLoading ? (
            <Loader className="animate-spin-loader" size={24} />
          ) : (
            "Continue"
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default Request;
