import React from "react";
import { motion } from "framer-motion";
import Footer from "../paa/Footer";

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
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Contact: React.FC = () => {
  return (
    <motion.div
      className="px-5 my-5"
      initial="hidden"
      animate="show"
      variants={staggerContainer}
    >
      <motion.h1 className="fw-bold my-4" variants={fadeInUp}>
        Patient assist Contact Page
      </motion.h1>
      <motion.p variants={fadeInUp}>
        Feel free to contact us at any time.
      </motion.p>

      <motion.div className="d-flex gap-2 flex-column" variants={fadeInUp}>
        <div className="d-flex gap-2">
          <motion.div
            className="card col-md-6"
            style={{ borderRadius: "25px" }}
            variants={fadeInUp}
          >
            <div className="card-body">
              <h5 className="card-title text-start fw-bold">Email:</h5>
              <p className="card-text" style={{ color: "grey" }}>
                For general inquiries and information, email us at{" "}
                <a
                  href="mailto:patientassist.uk@gmail.com"
                  style={{ textDecoration: "none" }}
                >
                  patientassist.uk@gmail.com
                </a>
              </p>
            </div>
          </motion.div>

          <motion.div
            className="card col-md-6"
            style={{ borderRadius: "25px" }}
            variants={fadeInUp}
          >
            <div className="card-body">
              <h5 className="card-title text-start fw-bold">Phone:</h5>
              <p className="card-text" style={{ color: "grey" }}>
                Speak with a member of our team by calling us at{" "}
                <span className="text-primary">+254791354093</span>
              </p>
            </div>
          </motion.div>
        </div>

        <div className="d-flex gap-2">
          <motion.div
            className="card col-md-6"
            style={{ borderRadius: "25px" }}
            variants={fadeInUp}
          >
            <div className="card-body">
              <h5 className="card-title text-start fw-bold">Visit Us:</h5>
              <p className="card-text" style={{ color: "grey" }}>
                Current location will be updated once upgrade is complete.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="card col-md-6"
            style={{ borderRadius: "25px" }}
            variants={fadeInUp}
          >
            <div className="card-body">
              <h5 className="card-title text-start fw-bold">Our community:</h5>
              <p className="card-text" style={{ color: "grey" }}>
                Join the fastest growing community in medic field, any of the
                three category is acceptable.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div className="my-5" variants={fadeInUp}>
        <p>
          To chat in a private mode, go to the main page and click the
          "Confidential button", then specify the mode of communication; either
          an email, whatsapp, or private mode web.
        </p>
      </motion.div>

      <Footer />
    </motion.div>
  );
};

export default Contact;
