"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }: any) {
  const { register } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleRegister = async () => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      await register(username, email, password);
      onClose();
      onSwitchToLogin();
    } catch (err: any) {
      setErrorMessage(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 space-y-4">
        <h2 className="text-xl font-bold">Register</h2>

        {errorMessage && <div className="text-red-500">{errorMessage}</div>}

        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button onClick={handleRegister} disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </button>

        <button onClick={onSwitchToLogin}>Go to Login</button>
      </div>
    </div>
  );
}