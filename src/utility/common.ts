export const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8000"
    : "https://patient-assist-web-server.onrender.com/api/auth";
