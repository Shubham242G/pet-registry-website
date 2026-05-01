// // "use client";
// // import { useState, useEffect } from "react";
// // import { useAuth } from "../context/AuthContext";
// // import { useRouter } from "next/navigation";

// // export default function LoginModal({ isOpen, onClose, onSwitchToRegister }: any) {
// //   const { login, isAuthenticated } = useAuth();
// //   const router = useRouter();
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [errorMessage, setErrorMessage] = useState("");

// //   useEffect(() => {
// //     if (isAuthenticated) {
// //       router.push('/pages/dashboard');
// //       onClose();
// //     }
// //   }, [isAuthenticated, router, onClose]);

// //   if (!isOpen) return null;

// //   const handleLogin = async () => {
// //     setErrorMessage("");
// //     setIsLoading(true);

// //     try {
// //       await login(email, password);
// //     } catch (err: any) {
// //       setErrorMessage(err.message || "Login failed");
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
// //       <div className="bg-white p-6 rounded-xl w-96 space-y-4 relative shadow-xl">
// //         {/* Close Button */}
// //         <button
// //           onClick={onClose}
// //           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
// //           disabled={isLoading}
// //         >
// //           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
// //             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
// //           </svg>
// //         </button>

// //         <h2 className="text-xl font-bold text-gray-800">Login</h2>
        
// //         {errorMessage && (
// //           <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
// //             {errorMessage}
// //           </div>
// //         )}
        
// //         {/* Email Input */}
// //         <div className="space-y-1">
// //           <label className="block text-sm font-semibold text-gray-700">Email Address</label>
// //           <input 
// //             className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 bg-white"
// //             type="email"
// //             placeholder="Enter your email" 
// //             value={email}
// //             onChange={e => setEmail(e.target.value)} 
// //             disabled={isLoading}
// //           />
// //         </div>

// //         {/* Password Input */}
// //         <div className="space-y-1">
// //           <label className="block text-sm font-semibold text-gray-700">Password</label>
// //           <input 
// //             className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 bg-white" 
// //             type="password" 
// //             placeholder="Enter your password" 
// //             value={password}
// //             onChange={e => setPassword(e.target.value)} 
// //             disabled={isLoading}
// //           />
// //         </div>

// //         <button 
// //           onClick={handleLogin} 
// //           className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded-lg disabled:opacity-50 transition-colors duration-200 font-semibold"
// //           disabled={isLoading}
// //         >
// //           {isLoading ? "Logging in..." : "Login"}
// //         </button>
        
// //         <button 
// //           onClick={onSwitchToRegister} 
// //           className="text-sm text-orange-500 hover:text-orange-600 transition-colors duration-200"
// //           disabled={isLoading}
// //         >
// //           Don't have an account? Register
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";
// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useRouter } from "next/navigation";

// export default function LoginModal({ isOpen, onClose, onSwitchToRegister }: any) {
//   const { login } = useAuth();
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   if (!isOpen) return null;

//   const handleLogin = async () => {
//     setErrorMessage("");
//     setIsLoading(true);

//     try {
//       await login(email, password);
//       // Force redirect to dashboard
//       window.location.href = "/pages/dashboard";
//       onClose();
//     } catch (err: any) {
//       setErrorMessage(err.message || "Invalid email or password");
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-xl w-96 space-y-4 relative shadow-xl">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//           disabled={isLoading}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>

//         <h2 className="text-xl font-bold text-gray-800">Login</h2>
        
//         {errorMessage && (
//           <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
//             {errorMessage}
//           </div>
//         )}
        
//         <div className="space-y-1">
//           <label className="block text-sm font-semibold text-gray-700">Email Address</label>
//           <input 
//             className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white"
//             type="email"
//             placeholder="Enter your email" 
//             value={email}
//             onChange={e => setEmail(e.target.value)} 
//             disabled={isLoading}
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="block text-sm font-semibold text-gray-700">Password</label>
//           <input 
//             className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white" 
//             type="password" 
//             placeholder="Enter your password" 
//             value={password}
//             onChange={e => setPassword(e.target.value)} 
//             disabled={isLoading}
//           />
//         </div>

//         <button 
//           onClick={handleLogin} 
//           className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded-lg disabled:opacity-50 font-semibold"
//           disabled={isLoading}
//         >
//           {isLoading ? "Logging in..." : "Login"}
//         </button>
        
//         <button 
//           onClick={onSwitchToRegister} 
//           className="text-sm text-orange-500 hover:text-orange-600"
//           disabled={isLoading}
//         >
//           Don't have an account? Register
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }: any) {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleLogin = async () => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      await login(email, password);
      // Wait a moment for state to update, then redirect
      setTimeout(() => {
        router.push("/pages/dashboard");
        onClose();
      }, 100);
    } catch (err: any) {
      setErrorMessage(err.message || "Invalid email or password");
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 space-y-4 relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          disabled={isLoading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-bold text-gray-800">Login</h2>
        
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
            {errorMessage}
          </div>
        )}
        
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-700">Email Address</label>
          <input 
            className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white"
            type="email"
            placeholder="Enter your email" 
            value={email}
            onChange={e => setEmail(e.target.value)} 
            disabled={isLoading}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-700">Password</label>
          <input 
            className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white" 
            type="password" 
            placeholder="Enter your password" 
            value={password}
            onChange={e => setPassword(e.target.value)} 
            disabled={isLoading}
          />
        </div>

        <button 
          onClick={handleLogin} 
          className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded-lg disabled:opacity-50 font-semibold"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        
        <button 
          onClick={onSwitchToRegister} 
          className="text-sm text-orange-500 hover:text-orange-600"
          disabled={isLoading}
        >
          Don't have an account? Register
        </button>
      </div>
    </div>
  );
}