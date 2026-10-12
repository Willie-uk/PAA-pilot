import React, { useState, type FormEvent } from "react";
import xvg from "../images/logo.jpg";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { motion } from "framer-motion";
import { API_URL } from "../utility/common";

interface ConfidentialProps {
  closeModal: (value: boolean) => void;
}

const Confidential: React.FC<ConfidentialProps> = ({ closeModal }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<"dark" | "danger" | "">("");

  const submitConfidentialMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = { name, phoneNumber, message };

    try {
      await axios.post(`${API_URL}/confidential`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setAlertMessage("Confidential message submitted successfully!");
      setAlertType("dark");
      setTimeout(() => {
        closeModal(false);
      }, 2000);
    } catch (error) {
      setAlertMessage("Failed, please try again.");
      setAlertType("danger");
      setTimeout(() => {
        closeModal(false);
      }, 2000);
    }
  };

  return (
    <div id="confident">
      <div className="paa-modal-background">
        <motion.div
          className="paa-modal-container pb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <motion.div
            className="modal-header mb-2 w-100 d-flex justify-content-between pe-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <img
              style={{ width: "60px", height: "60px" }}
              src={xvg}
              alt="logo"
            />
            <button
              type="button"
              className="btn-close"
              onClick={() => closeModal(false)}
            ></button>
          </motion.div>

          <div className="modal-body pb-2 mt-4">
            {alertMessage && (
              <Alert
                className="text-center"
                style={{
                  borderRadius: "15px",
                  backgroundColor: alertType === "dark" ? "#000" : "#dc3545",
                  color: "#fff",
                }}
                variant={alertType}
              >
                {alertMessage}
              </Alert>
            )}

            <div className="col-md-12 form-box">
              <motion.form
                className="row g-3 needs-validation"
                onSubmit={submitConfidentialMessage}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
              >
                <motion.div
                  className="col-md-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.9 }}
                >
                  <input
                    style={{ borderRadius: "15px" }}
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </motion.div>

                <motion.div
                  className="col-md-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.2 }}
                >
                  <input
                    style={{ borderRadius: "15px" }}
                    type="number"
                    className="form-control"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </motion.div>

                <motion.div
                  className="col-md-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <input
                    style={{ borderRadius: "15px" }}
                    type="text"
                    className="form-control"
                    placeholder="Confidential message here"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </motion.div>

                <motion.div
                  className="col-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <button
                    type="submit"
                    style={{ borderRadius: "15px" }}
                    className="btn btn-primary mt-3"
                  >
                    Submit
                  </button>
                </motion.div>
              </motion.form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Confidential;
