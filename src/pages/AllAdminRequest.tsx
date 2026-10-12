import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { API_URL } from "../utility/common";
import { Loader } from "lucide-react";

interface User {
  name: string;
  email: string;
  phoneNumber: string;
}

interface RequestType {
  _id: string;
  category: string;
  county: string;
  phoneNumber: string;
  date: string;
  receiptCode?: string;
  user: User;
}

const AdminRequest = () => {
  const [requests, setRequests] = useState<RequestType[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<RequestType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [countyFilter, setCountyFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [adminPass, setAdminPass] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState("");

  const [exportPass, setExportPass] = useState("");
  const [showExportPrompt, setShowExportPrompt] = useState(false);
  const [exportError, setExportError] = useState("");
  const [exporting, setExporting] = useState(false);

  const navigate = useNavigate();

  const handleAdminVerify = async () => {
    try {
      setVerifying(true);
      const res = await axios.post(
        `${API_URL}/admin`,
        { pass: adminPass },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setIsVerified(true);
        setVerifyError("");
      } else {
        setVerifyError(res.data.message || "Invalid admin pass");
      }
    } catch (err: any) {
      setVerifyError(err.response?.data?.message || "Verification failed");
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    if (!isVerified) return;

    const fetchRequests = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{ data: RequestType[] }>(
          `${API_URL}/admin-requests`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setRequests(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [isVerified]);

  useEffect(() => {
    const filtered = requests.filter((r) => {
      const combined = `${r.category} ${r.county} ${r.phoneNumber} ${
        r.receiptCode ?? ""
      } ${r.user?.name ?? ""} ${r.user?.email ?? ""}`.toLowerCase();
      const matchSearch = combined.includes(searchTerm.toLowerCase());

      const matchCategory = categoryFilter
        ? r.category === categoryFilter
        : true;
      const matchCounty = countyFilter ? r.county === countyFilter : true;
      const matchMonth = monthFilter
        ? new Date(r.date).toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric",
          }) === monthFilter
        : true;

      return matchSearch && matchCategory && matchCounty && matchMonth;
    });

    setFilteredRequests(filtered);
  }, [searchTerm, categoryFilter, countyFilter, monthFilter, requests]);

  const handleExport = () => {
    setShowExportPrompt(true);
    setExportPass("");
    setExportError("");
  };

  const confirmExport = async () => {
    try {
      setExporting(true);
      const res = await axios.post(
        `${API_URL}/admin`,
        { pass: exportPass },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.data.success) {
        setExportError("Invalid admin pass");
        return;
      }

      // Verified, export Excel
      const ws = XLSX.utils.json_to_sheet(
        filteredRequests.map((r) => ({
          Category: r.category,
          County: r.county,
          Date: new Date(r.date).toLocaleString(),
          "Phone Number": r.phoneNumber,
          "Receipt Code": r.receiptCode || "",
          "User Name": r.user?.name ?? "",
          "User Email": r.user?.email ?? "",
        }))
      );

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Requests");
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      saveAs(blob, "patient_requests.xlsx");

      setShowExportPrompt(false);
    } catch (err: any) {
      setExportError(
        err.response?.data?.message || "Export verification failed"
      );
    } finally {
      setExporting(false);
    }
  };

  const handleBack = () => {
    navigate("/paa", { replace: true });
  };

  const uniqueCategories = [...new Set(requests.map((r) => r.category))];
  const uniqueCounties = [...new Set(requests.map((r) => r.county))];
  const uniqueMonths = [
    ...new Set(
      requests.map((r) =>
        new Date(r.date).toLocaleDateString("en-GB", {
          month: "long",
          year: "numeric",
        })
      )
    ),
  ];

  useEffect(() => {
    if (verifyError) {
      const timer = setTimeout(() => {
        setVerifyError("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [verifyError]);
  useEffect(() => {
    if (exportError) {
      const timer = setTimeout(() => {
        setExportError("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [exportError]);

  if (!isVerified) {
    return (
      <div className="container d-flex flex-column justify-content-center align-items-center mt-5">
        <h3 className="mb-3">Admin Pass Required</h3>
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Enter Admin Pass"
          value={adminPass}
          onChange={(e) => setAdminPass(e.target.value)}
          style={{ maxWidth: "300px", borderRadius: "10px" }}
        />
        <button
          className="btn btn-dark"
          onClick={handleAdminVerify}
          disabled={verifying}
        >
          {verifying ? "Verifying..." : "Verify"}
        </button>
        {verifyError && (
          <div
            className="bg-danger fixed-top w-75 mx-auto mt-3 d-flex justify-content-between py-1"
            role="alert"
            style={{ zIndex: 1051, borderRadius: "15px" }}
          >
            <p className="text-center w-100 text-white">{verifyError}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container mt-4" style={{ overflowX: "scroll" }}>
      <h1 className="my-5">
        All <span className="text-secondary fw-bold">PAA</span> Requests
      </h1>
      {/* Export Modal Prompt */}
      {showExportPrompt && (
        <div className="mb-4 p-3 border rounded bg-light">
          <h5>Admin Pass Required to Export</h5>
          <input
            type="password"
            className="form-control my-2"
            placeholder="Enter Admin Pass"
            value={exportPass}
            onChange={(e) => setExportPass(e.target.value)}
            style={{ maxWidth: "300px" }}
          />
          <div className="d-flex gap-2">
            <button
              className="btn btn-success"
              onClick={confirmExport}
              disabled={exporting}
            >
              {exporting ? "Verifying..." : "Confirm Export"}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowExportPrompt(false)}
            >
              Cancel
            </button>
          </div>
          {exportError && (
            <div
              className="bg-danger fixed-top w-75 mx-auto mt-3 d-flex justify-content-between py-1"
              role="alert"
              style={{ zIndex: 1051, borderRadius: "15px" }}
            >
              <p className="text-center w-100 text-white">{exportError}</p>
            </div>
          )}
        </div>
      )}
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <h4>
          Total Requests: <strong>{requests.length}</strong> | Showing:{" "}
          <strong>{filteredRequests.length}</strong>
        </h4>
        <button className="btn btn-success my-2" onClick={handleExport}>
          Export to Excel
        </button>
      </div>

      <input
        type="text"
        className="form-control my-3"
        placeholder="Search any field..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="row mb-3">
        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={countyFilter}
            onChange={(e) => setCountyFilter(e.target.value)}
          >
            <option value="">All Counties</option>
            {uniqueCounties.map((county) => (
              <option key={county}>{county}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
          >
            <option value="">All Dates</option>
            {uniqueMonths.map((month) => (
              <option key={month}>{month}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div
          className="alert alert-danger"
          style={{
            backgroundColor: "red",
            width: "100%",
            color: "#fff",
            borderRadius: "15px",
          }}
        >
          {error}
        </div>
      )}

      {loading ? (
        <div className="d-flex justify-content-center">
          <Loader className="animate-spin-loader mx-auto" size={24} />
        </div>
      ) : (
        <motion.table
          className="table table-striped my-4"
          style={{ minWidth: "1000px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Category</th>
              <th>County</th>
              <th>Date</th>
              <th>Phone Number</th>
              <th>Receipt Code</th>
              <th>Account Name</th>
              <th>Account Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((r, index) => {
              const rowMatch = `${r.category} ${r.county} ${r.phoneNumber} ${
                r.receiptCode ?? ""
              } ${r.user?.name} ${r.user?.email}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
              return (
                <tr
                  key={r._id}
                  style={
                    rowMatch && searchTerm ? { backgroundColor: "#ffffcc" } : {}
                  }
                >
                  <td>{index + 1}</td>
                  <td>{r.category}</td>
                  <td>{r.county}</td>
                  <td>{new Date(r.date).toLocaleString()}</td>
                  <td>{r.phoneNumber}</td>
                  <td>{r.receiptCode}</td>
                  <td>{r.user?.name}</td>
                  <td>{r.user?.email}</td>
                </tr>
              );
            })}
          </tbody>
        </motion.table>
      )}

      <p className="text-secondary">
        Scroll to the right to see the full table.
      </p>

      <button className="btn btn-dark mb-5" onClick={handleBack}>
        Back
      </button>
    </div>
  );
};

export default AdminRequest;
