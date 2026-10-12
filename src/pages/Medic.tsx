import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { API_URL } from "../utility/common";

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Interface for medic form data
interface MedicData {
  name: string;
  email: string;
  phone: string;
  social: string;
  role: string;
}

function MedicSignup() {
  const [medicData, setMedicData] = useState<MedicData>({
    name: "",
    email: "",
    phone: "",
    social: "",
    role: "",
  });

  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setMedicData({
      ...medicData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(`${API_URL}/medic`, medicData);
      setMessage(response.data.message);
      window.location.reload();
    } catch (error: any) {
      setError(
        error.response ? error.response.data.error : "Something went wrong!"
      );
    }
  };

  return (
    <div className="container mt-5 d-flex flex-column align-items-center justify-content-center w-100">
      <div className="d-flex flex-column text-center align-items-center w-100">
        <h2 className="text-center mt-5">Medics Platform</h2>
        <p className="text-center text-secondary mb-5">
          For medics application only.
        </p>

        <motion.form
          className="px-2"
          onSubmit={handleSubmit}
          style={{ maxWidth: "800px", width: "100%" }}
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeInUp} className="mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your full name"
              name="name"
              value={medicData.name}
              style={{ borderRadius: "15px" }}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your Email"
              style={{ borderRadius: "15px" }}
              name="email"
              value={medicData.email}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-3">
            <input
              type="number"
              className="form-control"
              id="phone"
              name="phone"
              placeholder="Enter your Phone number"
              style={{ borderRadius: "15px" }}
              value={medicData.phone}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-3">
            <input
              type="number"
              className="form-control"
              id="social"
              name="social"
              placeholder="Enter your ID Number"
              style={{ borderRadius: "15px" }}
              value={medicData.social}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-3">
            <select
              className="form-select"
              id="role"
              name="role"
              style={{ borderRadius: "15px" }}
              value={medicData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select a role</option>
              <option value="nurse">Nurse</option>
              <option value="physiotherapist">Physiotherapist</option>
              <option value="caregiver">Caregiver</option>
            </select>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <button
              type="submit"
              style={{ borderRadius: "15px" }}
              className="btn btn-dark px-5"
            >
              Sign Up
            </button>
          </motion.div>
        </motion.form>

        {message && (
          <div
            className="alert alert-success mt-3"
            style={{
              backgroundColor: "#000",
              width: "100%",
              color: "#fff",
              borderRadius: "15px",
            }}
          >
            {message}
          </div>
        )}

        {error && (
          <div
            className="alert alert-danger mt-3"
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
      </div>
    </div>
  );
}

export default MedicSignup;
