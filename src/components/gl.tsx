import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Clock } from "lucide-react";

const GoogleLoginComponent: React.FC = () => {
  const navigate = useNavigate();
  const { googleLogin } = useAuthStore();

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
        const { email } = user;

        await googleLogin(email);
        navigate("/paa", { replace: true });
      } catch (err) {
        console.error("Google login error", err);
      }
    },
    onError: () => {
      console.log("Google Login Failed");
    },
    flow: "implicit", // or "auth-code" if using server-side exchange
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

export default GoogleLoginComponent;
