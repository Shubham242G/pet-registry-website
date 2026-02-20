"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }: any) {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleRegister = async () => {
    await register(username, email, password);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 space-y-4">
        <h2 className="text-xl font-bold">Register</h2>
        <input className="border p-2 w-full" placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <input className="border p-2 w-full" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input className="border p-2 w-full" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button onClick={handleRegister} className="bg-orange-500 text-white w-full py-2 rounded">Register</button>
        <button onClick={onSwitchToLogin} className="text-sm text-orange-500">Switch to Login</button>
      </div>
    </div>
  );
}
