import { type JSX } from "react";
import "../App.css";
import xvg from "../images/logo.jpg";
import MyComponent from "./Typed";

function CardSection(): JSX.Element {
  return (
    <div>
      <div className="container px-4 py-5" id="custom-cards">
        <MyComponent />
        <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
          <div className="col">
            <div
              className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg"
              style={{
                backgroundImage:
                  "radial-gradient(at 100% 100%, rgba(111,88,116,0.7) 0px, transparent 50%),radial-gradient(at 90% 0%, #0a2961 0px, transparent 50%),radial-gradient(at 18% 16%, rgba(58,3,130,0.79) 0px, transparent 50%),radial-gradient(at 100% 40%, rgba(76,21,147,0.22) 0px, transparent 50%),radial-gradient(at 0% 100%, #74517b 0px, transparent 50%)",
              }}
            >
              <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h2 className="pt-1 mt-1 mb-4 display-6 lh-1 fw-bold">
                  Do you know about diabetes?...How can you manage it?
                </h2>
                <ul className="d-flex list-unstyled mt-auto">
                  <li className="me-auto">
                    <img
                      src={xvg}
                      alt="paa"
                      width="32"
                      height="32"
                      className="rounded-circle border border-white"
                    />
                  </li>
                  <li className="d-flex align-items-center me-3">
                    <svg className="bi me-2" width="1em" height="1em"></svg>
                    <small>#diabetes</small>
                  </li>
                  <li className="d-flex align-items-center">
                    <svg className="bi me-2" width="1em" height="1em"></svg>
                    <small style={{ fontSize: "10px" }}>@2025</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col">
            <div
              className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg"
              style={{
                background:
                  "linear-gradient(rgba(0,0,0,0), #151b25, #151516),linear-gradient(90deg, #172538, #18263a 50%)",
              }}
            >
              <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h2 className="pt-1 mt-1 mb-4 display-6 lh-1 fw-bold">
                  Regular monitoring can help in the control.
                </h2>
                <ul className="d-flex list-unstyled mt-auto">
                  <li className="me-auto">
                    <img
                      src={xvg}
                      alt="paa"
                      width="32"
                      height="32"
                      className="rounded-circle border border-white"
                    />
                  </li>
                  <li className="d-flex align-items-center me-3">
                    <svg className="bi me-2" width="1em" height="1em"></svg>
                    <small>#hypertension</small>
                  </li>
                  <li className="d-flex align-items-center">
                    <svg className="bi me-2" width="1em" height="1em"></svg>
                    <small style={{ fontSize: "10px" }}>@2025</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col">
            <div
              className="card card-cover h-100 overflow-hidden text-white paa-os1 rounded-5 shadow-lg"
              style={{
                background:
                  "linear-gradient(165deg, #2c4735 0%, #1d243e 60%, #101124 90%)",
              }}
            >
              <div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                <h2 className="pt-1 mt-1 mb-4 display-6 lh-1 fw-bold">
                  Let's spread awareness and love to them.
                </h2>
                <ul className="d-flex list-unstyled mt-auto">
                  <li className="me-auto">
                    <img
                      src={xvg}
                      alt="paa"
                      width="32"
                      height="32"
                      className="rounded-circle border border-white"
                    />
                  </li>
                  <li className="d-flex align-items-center me-3">
                    <svg className="bi me-2" width="1em" height="1em"></svg>
                    <small>#autism</small>
                    <small>#celebralpalsy</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSection;
