import "bootstrap/dist/css/bootstrap.min.css";
import xvg from "../images/logo.jpg";
import xvb from "../images/paa-bg-main-1.png";
import xvb1 from "../images/paa-bg-main-2.png";
import random1 from "../images/random1.jpg";
import random2 from "../images/random2.jpg";
import random3 from "../images/random3.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PilotPage = () => {
  const staggeredItems = {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1, // Stagger delay of 0.1s between elements
        duration: 0.5,
      },
    }),
  };

  return (
    <motion.div initial="hidden" animate="show">
      <motion.div
        custom={1}
        variants={staggeredItems}
        className="section-header sticky-top shadow"
        style={{ backdropFilter: "blur(30px)", borderRadius: "25px" }}
      >
        <nav className="navbar navbar-expand-sm paa-animse">
          <div className="container-fluid px-4">
            <img
              style={{ width: "60px", height: "60px", borderRadius: "50%" }}
              src={xvg}
              alt="Logo"
            />
            <div className="px-2" id="navbarNav">
              <ul className="navbar-nav ms-auto d-flex flex-row">
                <li className="nav-item me-2">
                  <Link className="nav-link" to="/login">
                    Log in
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-dark rounded-pill" to="/signup">
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </motion.div>

      <header className="text-center py-5">
        <div className="container">
          <motion.h1
            custom={2}
            variants={staggeredItems}
            className="gradient-text fw-bold pacifico-regular"
          >
            Patient Assist
          </motion.h1>
          <motion.h1
            custom={3}
            variants={staggeredItems}
            className="display-4 fw-bold"
          >
            Explore medical evolution
            <br /> with Tech.
          </motion.h1>
          <motion.p
            custom={4}
            variants={staggeredItems}
            className="lead text-muted"
          >
            Get medical services at the comfort of your home as a patient.
          </motion.p>
          <motion.div
            custom={5}
            variants={staggeredItems}
            className="d-flex justify-content-center"
          >
            <a className="btn btn-dark rounded-pill me-3" href="/login">
              Join for free
            </a>
            <a className="btn btn-outline-dark rounded-pill" href="/login">
              More about us
            </a>
          </motion.div>
        </div>
      </header>

      <motion.div
        custom={6}
        variants={staggeredItems}
        className="d-flex justify-content-center align-items-center px-4"
      >
        <div
          className="bg-dark p-2 d-flex justify-content-center align-items-center"
          style={{ borderRadius: "30px" }}
        >
          <img
            src={xvb}
            alt="Pic1"
            className="img-fluid"
            style={{ borderRadius: "25px" }}
          />
        </div>
      </motion.div>

      <motion.div custom={7} variants={staggeredItems} className=" px-4 py-5">
        <section className="text-center p-5">
          <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
            <div className="search-container">
              <input
                type="text"
                className="form-control mb-4"
                placeholder="Search for caregivers..."
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-evenly">
              <button
                className="ps-2 btn btn-secondary px-4 text-center my-2"
                style={{ backgroundColor: "#111" }}
              >
                Elderly Care
              </button>
              <button
                className="ps-2 btn btn-secondary px-4 text-center my-2"
                style={{ backgroundColor: "#111" }}
              >
                Child Care
              </button>
              <button
                className="ps-2 btn btn-secondary px-4 text-center my-2"
                style={{ backgroundColor: "#111" }}
              >
                Special Needs Care
              </button>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
            <div className="col">
              <div className="card mb-4" style={{ border: "none" }}>
                <div className="py-3">
                  <h4 className="my-0 fw-normal">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      fill="green"
                      className="bi bi-shield-fill-check"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7 7 0 0 0 1.048-.625 11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793z"
                      />
                    </svg>
                  </h4>
                </div>
                <div className="card-body">
                  <h3
                    className="card-title pricing-card-title"
                    style={{ color: "#c1c1c1" }}
                  >
                    Trusted Professionals
                  </h3>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>All caregivers are thoroughly vetted and certified.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card mb-4" style={{ border: "none" }}>
                <div className="py-3">
                  <h4 className="my-0 fw-normal">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      fill="green"
                      className="bi bi-clock-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                    </svg>
                  </h4>
                </div>
                <div className="card-body">
                  <h3
                    className="card-title pricing-card-title"
                    style={{ color: "#c1c1c1" }}
                  >
                    Flexible Scheduling
                  </h3>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>Book caregivers according to your schedule.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card mb-4" style={{ border: "none" }}>
                <div className="py-3">
                  <h4 className="my-0 fw-normal">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      fill="green"
                      className="bi bi-person-raised-hand"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6 6.207v9.043a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H6.236a1 1 0 0 1-.447-.106l-.33-.165A.83.83 0 0 1 5 2.488V.75a.75.75 0 0 0-1.5 0v2.083c0 .715.404 1.37 1.044 1.689L5.5 5c.32.32.5.754.5 1.207" />
                      <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                    </svg>
                  </h4>
                </div>
                <div className="card-body">
                  <h3
                    className="card-title pricing-card-title"
                    style={{ color: "#c1c1c1" }}
                  >
                    Comprehensive Support
                  </h3>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>We provide support every step of the way.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>

      <motion.div
        custom={8}
        variants={staggeredItems}
        className="px-4 pt-5 my-5 text-center border-bottom"
      >
        <h1 className="display-4 fw-bold text-body-emphasis">
          Find the Best Caregivers for Your Loved Ones
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            We understand that finding the right caregiver for your loved ones
            is a deeply personal journey. Our platform connects you with highly
            qualified, compassionate caregivers who are dedicated to providing
            exceptional care tailored to your unique needs. Whether you're
            looking for support for elderly parents, child care, or assistance
            for individuals with special needs, we're here to make the process
            simple and stress-free.
          </p>
        </div>
        <div className="overflow-hidden" style={{ maxHeight: "30vh" }}>
          <div className="container px-5">
            <img
              src={xvb1}
              className="img-fluid border rounded-3 shadow-lg mb-4"
              alt="..."
              width="900"
              height="700"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>

      <motion.div custom={9} variants={staggeredItems} className=" px-4 py-5">
        <section className="text-center p-5">
          <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h2 className="fw-bold">How it works</h2>
          </div>
          <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
            <div className="col">
              <div className="card mb-4" style={{ border: "none" }}>
                <div className="py-3">
                  <h4 className="my-0 fw-normal">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      fill="#007bff"
                      className="bi bi-person-fill-add"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                    </svg>
                  </h4>
                </div>
                <div className="card-body">
                  <h3
                    className="card-title pricing-card-title"
                    style={{ color: "#c1c1c1" }}
                  >
                    1. Signup for free
                  </h3>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>Create a free account and tell us your preference</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card mb-4" style={{ border: "none" }}>
                <div className="py-3">
                  <h4 className="my-0 fw-normal">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      fill="#007bff"
                      className="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                  </h4>
                </div>
                <div className="card-body">
                  <h3
                    className="card-title pricing-card-title"
                    style={{ color: "#c1c1c1" }}
                  >
                    2. Find a Caregiver
                  </h3>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>Search and select the best caregiver for you.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card mb-4" style={{ border: "none" }}>
                <div className="py-3">
                  <h4 className="my-0 fw-normal">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      fill="#007bff"
                      className="bi bi-check2-all"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0" />
                      <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708" />
                    </svg>
                  </h4>
                </div>
                <div className="card-body">
                  <h3
                    className="card-title pricing-card-title"
                    style={{ color: "#c1c1c1" }}
                  >
                    3. Book and Relax
                  </h3>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>Book your caregiver and enjoy peace of mind.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>

      <motion.div
        custom={10}
        variants={staggeredItems}
        className="container col-xxl-8 px-4 py-5"
      >
        <section className="text-center bg-light p-5">
          <h2 className="text-secondary fw-bold">
            Reviews from client's family
          </h2>
          <div className="my-4">
            <p>"Amazing service! The caregivers are top-notch."</p>
            <h4>* Jane Lockwood</h4>
          </div>
          <div className="my-4">
            <p>"I found the perfect caregiver for my mom. Highly recommend!"</p>
            <h4>* Halima Nasha</h4>
          </div>
          <div className="d-flex gap-2 justify-content-center py-5">
            <span className="badge d-flex align-items-center p-1 pe-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-pill">
              <img
                className="rounded-circle me-1"
                width="24"
                height="24"
                src={random1}
                alt=""
              />
              Jane
            </span>
            <span className="badge d-flex align-items-center p-1 pe-2 text-secondary-emphasis bg-secondary-subtle border border-secondary-subtle rounded-pill">
              <img
                className="rounded-circle me-1"
                width="24"
                height="24"
                src={random2}
                alt=""
              />
              Halima
            </span>
            <span className="badge d-flex align-items-center p-1 pe-2 text-dark-emphasis bg-light-subtle border border-dark-subtle rounded-pill">
              <img
                className="rounded-circle me-1"
                width="24"
                height="24"
                src={random3}
                alt=""
              />
              Sanah
            </span>
          </div>
        </section>
      </motion.div>

      <motion.div
        custom={11}
        variants={staggeredItems}
        className="text-center my-5"
      >
        <small className="text-secondary">Patient Assist</small>
        <div className="d-flex justify-content-center mt-2">
          <p className="mx-2" style={{ color: "#d5d5d5" }}>
            Secure
          </p>
          <p className="mx-2" style={{ color: "#d5d5d5" }}>
            Guaranteed
          </p>
          <p className="mx-2" style={{ color: "#d5d5d5" }}>
            Trusted
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PilotPage;
