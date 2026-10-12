import React from "react";
import { ReactTyped } from "react-typed"; // Import ReactTyped from react-typed

const MyComponent: React.FC = () => {
  return (
    <div style={{ height: "80px" }}>
      <h1
        className="pb-2 text-center fw-bold"
        style={{ color: "#663399", fontFamily: "'Abril Fatface', cursive" }}
      >
        Hi, wait a second...
        <span className="auto-type">
          <ReactTyped
            strings={[
              "Do you check your vitals?",
              "How often?",
              "Do you keep records?",
            ]}
            typeSpeed={60}
            backSpeed={20}
            loop
            style={{
              color: "#da70d6",
              fontFamily: "'Kaushan Script', cursive",
            }}
          />
        </span>
      </h1>
    </div>
  );
};

export default MyComponent;
