import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import "../App.css";

interface PaaPopupProps {
  closeModal: (value: boolean) => void;
  category: string;
}

const PaaPopup: React.FC<PaaPopupProps> = ({ closeModal, category }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSelect = (county: string) => {
    navigate("/paa/request", { state: { category, county } });
    closeModal(false);
  };

  const counties: string[] = [
    "Nairobi",
    "Nakuru",
    "Mombasa",
    "Kisumu",
    "Kilifi",
    "Uasin Gishu",
    "Kiambu",
    "Kericho",
    "Laikipia",
    "Nyeri",
    "Kisii",
    "Kakamega",
    "Machakos",
    "Kajiado",
    "Meru",
    "Other Counties",
  ];

  const modalVariants: Variants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 100, transition: { duration: 0.3 } },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.2,
      },
    }),
  };

  return (
    <AnimatePresence>
      <motion.div
        className="paa-modal-background"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
      >
        <motion.div className="paa-modal-container slide-up">
          <div className="paa-modal-title mx-auto">
            <h4 className="fw-normal text-secondary">Select your County</h4>
            <button
              onClick={() => closeModal(false)}
              style={{ border: "none", background: "transparent" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="#d5d5d5"
                className="bi bi-x-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
              </svg>
            </button>
          </div>

          <div className="paa-modal-body mt-4">
            {counties.map((county, index) => (
              <motion.button
                key={index}
                type="button"
                className="pop-w btn mx-auto"
                onClick={() => handleSelect(county)}
                style={{ backgroundColor: "#f1f1f1", borderRadius: "12px" }}
                custom={index}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={buttonVariants}
              >
                {county}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaaPopup;
