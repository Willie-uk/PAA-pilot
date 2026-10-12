import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Clock } from "lucide-react";

const GoogleSignup: React.FC = () => {
  const navigate = useNavigate();
  const { googleSignup } = useAuthStore();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          },
        );
        const user = await res.json();
        const { name, email, picture } = user;

        await googleSignup(name, email, picture);
        navigate("/paa");
      } catch (err) {
        console.error("Google signup error", err);
      }
    },
    onError: () => {
      console.log("Google Signup Failed");
    },
    flow: "implicit", // or "auth-code"
  });

  return (
    <button
      onClick={() => login()}
      className="btn btn-dark w-100 mb-3 d-flex align-items-center justify-content-center border"
      style={{ borderRadius: "14px" }}
    >
      <Clock className="me-4" />

      <p className="mb-0">Continue with Google</p>
    </button>
  );
};

export default GoogleSignup;
