// hooks/useAdminGate.ts
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../utility/common";

export const useAdminGate = () => {
  const [isAllowed, setIsAllowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const verifyAdminPass = async (pass: string) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${API_URL}/admin`,
        { pass },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setIsAllowed(true);
      } else {
        setError(res.data.message);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return { isAllowed, verifyAdminPass, loading, error };
};
