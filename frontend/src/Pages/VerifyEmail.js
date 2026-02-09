import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";

const VerifyEmail = () => {
  const { token } = useParams();
  const { verifyEmail } = useAuth();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const result = await verifyEmail(token);
        setStatus("success");
        setMessage(result.message);
      } catch (error) {
        setStatus("error");
        setMessage(error);
      }
    };

    if (token) {
      verify();
    }
  }, [token, verifyEmail]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Email Verification</h2>

        {status === "verifying" && (
          <div className="alert alert-info">Verifying your email...</div>
        )}

        {status === "success" && (
          <>
            <div className="alert alert-success">{message}</div>
            <p className="auth-links">
              <Link to="/login">Proceed to Login</Link>
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="alert alert-error">{message}</div>
            <p className="auth-links">
              <Link to="/register">Back to Register</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
