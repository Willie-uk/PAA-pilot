import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, type SetStateAction } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Logo from "../assets/logo.jpg";
import QRCode from "qrcode";
import { API_URL } from "../utility/common";

// Define the shape of the route state
interface LocationState {
  id?: string;
  category?: string;
  county?: string;
  date?: string;
  receiptCode?: string;
  phoneNumber?: string;
}

// Define the shape of the receipt data returned by API
interface ReceiptData {
  info?: string;
  [key: string]: any; // In case other fields are present
}

const ReceiptPage = () => {
  const { state } = useLocation();
  const { id, category, county, date, receiptCode, phoneNumber } = (state ||
    {}) as LocationState;
  const navigate = useNavigate();

  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  useEffect(() => {
    if (!id) {
      setError("");
      return;
    }

    const fetchReceiptData = async () => {
      setError(null);

      try {
        const response = await axios.get(`${API_URL}/receipt-data/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            category,
            county,
            date,
            receiptCode,
            phoneNumber,
          },
        });

        if (response.data.success) {
          setReceiptData(response.data.receipt);
        } else {
          setError("No receipt data available.");
        }
      } catch (error: any) {
        console.error("Error fetching receipt data", error);
        setError(
          error.response?.data?.message || "Error fetching receipt data."
        );
      }
    };

    fetchReceiptData();
  }, [id, category, county, date, receiptCode, phoneNumber]);

  const handleBack = () => {
    navigate("/paa", { replace: true });
  };

  useEffect(() => {
    if (receiptCode) {
      QRCode.toDataURL(receiptCode)
        .then((url: SetStateAction<string | null>) => setQrCodeDataUrl(url))
        .catch((err: any) => console.error("Failed to generate QR code:", err));
    }
  }, [receiptCode]);

  return (
    <div
      className="d-flex flex-column text-center align-items-center py-2"
      style={{ height: "100vh" }}
    >
      <motion.h1 className="mt-3" variants={childVariants}>
        Successful Request
      </motion.h1>

      <motion.div className="my-3" variants={childVariants}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="#008000"
          className="bi bi-check-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </svg>
      </motion.div>
      <motion.div
        className="card card-receipt d-flex flex-column text-center p-2 mx-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          maxWidth: "300px",
          width: "100%",
          borderRadius: "30px",
          backgroundColor: "#d2d2d2",
        }}
      >
        <motion.div
          className="bg-white d-flex flex-column text-center px-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ width: "100%", borderRadius: "22px", position: "relative" }}
        >
          <motion.div
            className="d-flex align-items-center mb-3 justify-content-between mx-2"
            variants={childVariants}
            style={{ borderBottom: "1px dashed #ccc", paddingBottom: "10px" }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{ width: "60px", borderRadius: "50%" }}
            />
            <h3>PAA Receipt</h3>
          </motion.div>
          <motion.p variants={childVariants}>
            <strong>Category:</strong> {category}
          </motion.p>
          <motion.p variants={childVariants}>
            <strong>County:</strong> {county}
          </motion.p>
          <motion.p variants={childVariants}>
            <strong>Date:</strong>{" "}
            {date ? new Date(date).toLocaleString() : "N/A"}
          </motion.p>
          <motion.p variants={childVariants}>
            <strong>On Phone Number:</strong> {phoneNumber || "N/A"}
          </motion.p>

          <motion.p
            variants={childVariants}
            className="text-secondary"
            style={{
              fontSize: "12px",
              borderBottom: "1px dashed #ccc",
              paddingBottom: "10px",
            }}
          >
            Your request is underway. You will receive the {category} details on
            your phone number. Check your email for a receipt.
          </motion.p>
          <motion.div
            className="d-flex align-items-center mb-3 justify-content-between mx-2"
            style={{
              borderBottom: "1px dashed #ccc",
              paddingBottom: "10px",
              position: "relative",
            }}
          >
            {qrCodeDataUrl && (
              <motion.img
                src={qrCodeDataUrl}
                alt="QR Code"
                style={{ width: "80px", marginBottom: "10px" }}
                variants={childVariants}
              />
            )}
            <motion.h3 variants={childVariants}>{receiptCode}</motion.h3>
            <div
              style={{
                width: "20px",
                height: "30px",
                borderRadius: "50%",
                position: "absolute",
                right: "-25px",
                backgroundColor: "#d2d2d2",
              }}
            ></div>
            <div
              style={{
                width: "20px",
                height: "30px",
                borderRadius: "50%",
                position: "absolute",
                left: "-25px",
                backgroundColor: "#d2d2d2",
              }}
            ></div>
          </motion.div>

          <motion.button
            className="btn btn-dark"
            style={{ borderRadius: "14px" }}
            onClick={handleBack}
            variants={childVariants}
          >
            Ok
          </motion.button>

          <motion.span
            className="text-secondary mb-4"
            style={{ fontSize: "12px" }}
            variants={childVariants}
          >
            Remember to observe the Terms & Conditions and Privacy Policy
          </motion.span>

          {receiptData && (
            <motion.div variants={childVariants}>
              <p>
                <strong>Additional Info:</strong> {receiptData.info}
              </p>
            </motion.div>
          )}

          {error && (
            <motion.p className="error text-danger" variants={childVariants}>
              {error}
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ReceiptPage;
