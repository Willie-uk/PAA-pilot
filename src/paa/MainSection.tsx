import React, { useState } from "react";
import { Link } from "react-router-dom";
import xvl from "../images/paa.main.svg.png";
import xyz from "../images/clinic5.jpg";
import xyy from "../images/clinic6.jpg";
import xyx from "../images/clinic7.jpg";
import "../App.css";
import PaaPopup from "./PaaPopup";
import Confidential from "./Confidential";
import Emmergency from "./Emmergency";

const MainSection: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openEmmergency, setOpenEmmergency] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");

  const openCategoryModal = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setOpenModal(true);
  };

  return (
    <div id="mainSection">
      <div className="container col-12 px-4">
        <div className="row flex-lg-row align-items-center g-5 pt-2 pb-1">
          <div className="col-lg-6 paa-slide-top">
            <div className="flex col-12 border shadow rounded-5 flex-column overflow-hidden">
              <section
                className="status-sections"
                style={{ scrollbarWidth: "none" }}
              >
                <div className="status">
                  <div className="status-wrapperz">
                    <img
                      src={xyz}
                      alt="Story 1"
                      className="status-image"
                      onClick={() => openCategoryModal("Care Giver")}
                    />
                  </div>
                  <span className="status-username">Care Giver</span>
                </div>
                <div className="status">
                  <div className="status-wrapperz">
                    <img
                      src={xyy}
                      alt="Story 2"
                      className="status-image"
                      onClick={() => openCategoryModal("Physiotherapist")}
                    />
                  </div>
                  <span className="status-username">Physiotherapist</span>
                </div>
                <div className="status">
                  <div className="status-wrapperz">
                    <img
                      src={xyx}
                      alt="Story 3"
                      className="status-image"
                      onClick={() => openCategoryModal("Nurse")}
                    />
                  </div>
                  <span className="status-username">Nurse</span>
                </div>
                {openModal && (
                  <PaaPopup closeModal={setOpenModal} category={category} />
                )}
              </section>
              <div className="col-12 d-grid mt-1 gap-2 container p-3 mb-1 bg-body-tertiary rounded paa-main-section">
                <button
                  style={{ borderRadius: "15px" }}
                  className="btn btn-primary"
                  type="button"
                  onClick={() => setOpenForm(true)}
                >
                  Confidential Help
                </button>
                {openForm && <Confidential closeModal={setOpenForm} />}

                <button
                  style={{ borderRadius: "15px" }}
                  className="btn btn-primary"
                  type="button"
                  onClick={() => setOpenEmmergency(true)}
                >
                  Emergency
                </button>
                {openEmmergency && (
                  <Emmergency closeModal={setOpenEmmergency} />
                )}

                <button
                  style={{ borderRadius: "15px" }}
                  className="btn btn-primary"
                  type="button"
                >
                  <Link
                    to="/paa/medic"
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    Medics Application
                  </Link>
                </button>
              </div>
            </div>
          </div>

          <div className="col-10 col-sm-8 col-lg-6 d-none d-lg-block paa-slow-top">
            <img
              src={xvl}
              className="d-block mx-lg-auto img-fluid"
              alt="themes"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
