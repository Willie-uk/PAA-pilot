import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import ForgotPass from "./pages/ForgotPass";
import ResetPasswordPage from "./pages/ResetPass";
import VerifyEmail from "./pages/VerifyEmail";
import Contact from "./info/Contact";
import About from "./info/About";
import Notification from "./info/Notification";
import Request from "./pages/Request";

import { useAuthStore } from "./store/authStore";
import { Loader } from "lucide-react";
import ReceiptPage from "./pages/Receipt";
import MedicSignup from "./pages/Medic";
import Analysis from "./pages/Analysis";
import Feedback from "./pages/Feedback";
import AllRequest from "./pages/AllRequest";
import PilotPage from "./components/PilotPage";
import AdminRequest from "./pages/AllAdminRequest";
import AdminConfidential from "./pages/AllConfidential";
import AdminFeedback from "./pages/AdminFeedback";
import AdminMedics from "./pages/AllMedics";
import AdminUsers from "./pages/Wote";
import PaymentPage from "./blocks/gateA";

const App: React.FC = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth)
    return (
      <div className="d-flex items-center justify-center h-screen">
        <Loader className="animate-spin-loader" size={20} />
      </div>
    );

  return (
    <Router>
      <Routes>
        {/* ✅ Public Routes with redirect if already logged in */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/" element={<PilotPage />} />

        {/* 🔐 Protected User Route */}
        <Route path="/paa" element={<Home />} />
        <Route path="/paa/request" element={<Request />} />
        <Route path="/receipt" element={<ReceiptPage />} />
        <Route path="/paa/medic" element={<MedicSignup />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/paa/analysis" element={<Analysis />} />
        <Route path="/paa/f" element={<Feedback />} />
        <Route path="/paa/all/requests" element={<AllRequest />} />

        {/* 📢 Public Info Routes */}
        <Route path="/paa/c" element={<Contact />} />
        <Route path="/paa/a" element={<About />} />
        <Route path="/paa/n" element={<Notification />} />

        {/* 🔒 Example Admin Route (add real admin page) */}
        <Route path="/admin/requests" element={<AdminRequest />} />
        <Route path="/admin/confidential" element={<AdminConfidential />} />
        <Route path="/admin/feedback" element={<AdminFeedback />} />
        <Route path="/admin/medics" element={<AdminMedics />} />
        <Route path="/admin/all" element={<AdminUsers />} />

        {/* ❓ Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
