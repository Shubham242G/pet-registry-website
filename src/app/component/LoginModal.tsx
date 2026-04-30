"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }: any) {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async () => {
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("All fields required");
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
      onClose();
      router.push("/pages/dashboard");
    } catch (err: any) {
      setErrorMessage(err.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 space-y-4">
        <h2 className="text-xl font-bold">Login</h2>

        {errorMessage && <div className="text-red-500">{errorMessage}</div>}

        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button onClick={handleLogin} disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </button>

        <button onClick={onSwitchToRegister}>Go to Register</button>
      </div>
    </div>
  );
}