import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Spinner } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { API_URL } from "../utility/common";

interface MedicFeedback {
  feedback: string;
  rating: number;
}

function Feedback() {
  const [medicData, setMedicData] = useState<MedicFeedback>({
    feedback: "",
    rating: 0,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMedicData({ ...medicData, [name]: value });
  };

  const handleRatingChange = (newRating: number) => {
    setMedicData({ ...medicData, rating: newRating });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/feedback`, medicData);
      setMessage(response.data.message);
      setLoading(false);
      window.location.reload();
    } catch (error: any) {
      setError(error.response?.data?.error || "Something went wrong!");
      setLoading(false);
    }
  };

  const staggeredItems = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
    <div className="container mt-5 d-flex flex-column align-items-center justify-content-center w-100">
      <div className="d-flex flex-column text-center align-items-center w-100">
        <motion.h2
          className="text-center mt-5 text-primary"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Share Your Feedback
        </motion.h2>

        <motion.ul
          className="text-start text-secondary mb-5"
          initial="hidden"
          animate="visible"
          variants={staggeredItems}
        >
          <motion.li custom={0} variants={staggeredItems}>
            Concerns about the services.
          </motion.li>
          <motion.li custom={1} variants={staggeredItems}>
            Complaints or issues with service providers.
          </motion.li>
          <motion.li custom={2} variants={staggeredItems}>
            Account issues or misconduct reports.
          </motion.li>
        </motion.ul>

        <motion.p
          className="text-start text-secondary mb-5"
          initial="hidden"
          animate="visible"
          variants={staggeredItems}
        >
          Your feedback is valuable to us. Please share your experience and rate
          our service.
        </motion.p>

        <motion.form
          className="px-4 py-4 shadow-sm rounded bg-light"
          onSubmit={handleSubmit}
          style={{ maxWidth: "800px", width: "100%" }}
          initial="hidden"
          animate="visible"
          variants={staggeredItems}
        >
          <motion.div className="mb-3" custom={1} variants={staggeredItems}>
            <StarRatings
              rating={medicData.rating}
              starRatedColor="#ffd700"
              starHoverColor="#ffc107"
              changeRating={handleRatingChange}
              numberOfStars={5}
              name="rating"
              starDimension="35px"
              starSpacing="5px"
            />
            <small className="d-block mt-2">
              Select a rating from 1 to 5 stars
            </small>
          </motion.div>

          <motion.div className="mb-3" custom={2} variants={staggeredItems}>
            <textarea
              className="form-control"
              id="feedback"
              placeholder="Write your feedback here..."
              name="feedback"
              value={medicData.feedback}
              style={{ borderRadius: "15px", minHeight: "100px" }}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.div
            className="text-center"
            custom={3}
            variants={staggeredItems}
          >
            <button
              type="submit"
              style={{ borderRadius: "15px" }}
              className="btn btn-dark px-5"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Loading...</span>
                </>
              ) : (
                "Send Feedback"
              )}
            </button>
          </motion.div>
        </motion.form>

        {message && (
          <div
            className="alert mt-3 py-1 text-center"
            style={{
              borderRadius: "15px",
              backgroundColor: "#000",
              color: "#fff",
              maxWidth: "600px",
            }}
          >
            {message}
          </div>
        )}

        {error && (
          <div
            className="alert alert-danger mt-3 py-1 text-center"
            style={{ borderRadius: "15px", maxWidth: "600px" }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default Feedback;
