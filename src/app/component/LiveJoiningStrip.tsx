"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const petNames = [
  "Bruno",
  "Max",
  "Luna",
  "Bella",
  "Rocky",
  "Charlie",
  "Milo",
  "Simba",
  "Coco",
  "Leo",
  "Buddy",
  "Oscar",
  "Ruby",
  "Daisy",
  "Zara",
  "Toby",
  "Rosie",
  "Shadow",
  "Lucky",
  "Bailey",
];

const phrases = [
  "just completed registration",
  "is now officially registered",
  "joined the Tailio registry",
  "has been added to the registry",
];

function getRandom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function LiveJoinStrip() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const updateMessage = () => {
      const name = getRandom(petNames);
      const phrase = getRandom(phrases);
      setMessage(`🐾 ${name} ${phrase}`);
    };

    updateMessage();

    const interval = setInterval(() => {
      updateMessage();
    }, 5000); // change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-orange-50 border-t border-b border-orange-100 h-10 flex items-center justify-center relative z-10">
      <AnimatePresence mode="wait">
        <motion.p
          key={message}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5 }}
          className="text-sm text-orange-700 font-medium"
        >
          {message}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}