// src/pages/PaymentPage.tsx
import axios from "axios";
import { useState } from "react";

const PaymentPage = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    const sanitizedPhone = phone.trim().replace(/\s+/g, "");

    if (!sanitizedPhone.match(/^2547\d{8}$/)) {
      alert("Please enter a valid Safaricom number starting with 2547...");
      return;
    }

    const confirm = window.confirm(
      `Proceed to pay KES 100 with phone ${sanitizedPhone}?`
    );

    if (!confirm) return;

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:8000/api/payments/pay", {
        phone: sanitizedPhone,
        amount: 100, // fixed amount
      });

      console.log("Payment Response:", res.data);
      alert("STK Push Sent. Complete the payment on your phone.");
    } catch (err: any) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Request Nurse & Pay</h2>
      <input
        placeholder="Enter Phone (2547...)"
        className="form-control mb-3"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button
        className="btn btn-dark w-100"
        onClick={handlePay}
        disabled={loading}
      >
        {loading ? "Sending..." : "Pay KES 100"}
      </button>
    </div>
  );
};

export default PaymentPage;
