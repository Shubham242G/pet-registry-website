"use client";

import { useState, useEffect } from "react";

interface CitySelectorProps {
  selectedCity: string;
  onChange: (city: string) => void;
  error?: string;
}

const cities = [
  { value: "ghaziabad", label: "Ghaziabad", price: "₹1532.82", registrationFee: 1532.82 },
  { value: "delhi", label: "Delhi", price: "₹942.82", registrationFee: 942.82 },
  { value: "noida", label: "Noida", price: "₹942.82", registrationFee: 942.82 },
  { value: "gurgaon", label: "Gurgaon", price: "₹942.82", registrationFee: 942.82 },
];

export default function CitySelector({ selectedCity, onChange, error }: CitySelectorProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const selectedCityData = cities.find(c => c.value === selectedCity);

  return (
    <div className="space-y-2" style={{ marginBottom: "20px" }}>
      <label style={{
        display: "block",
        color: "#2C1A0E",
        fontSize: isMobile ? "11px" : "12px",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600,
        letterSpacing: "0.12px",
        marginBottom: "5px"
      }}>
        Which city do you reside in? <span style={{ color: "#E8600A" }}>*</span>
      </label>
      
      <p style={{
        color: "#7A5C40",
        fontSize: isMobile ? "11px" : "12px",
        fontFamily: "'DM Sans', sans-serif",
        marginBottom: "12px"
      }}>
        Your registration fee is based on your city. Select your city to see the applicable price.
      </p>
      
      <select
        value={selectedCity}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 14px",
          background: "#FAF6EF",
          borderRadius: "9px",
          fontSize: "13.5px",
          fontFamily: "'DM Sans', sans-serif",
          color: "#2C1A0E",
          outline: "1px solid rgba(44, 26, 14, 0.18)",
          outlineOffset: "-1px",
          border: "none",
          cursor: "pointer"
        }}
      >
        <option value="">Select your city</option>
        {cities.map((city) => (
          <option key={city.value} value={city.value}>
            {city.label} 
          </option>
        ))}
      </select>
      
      
      
      {error && (
        <p style={{
          color: "#DC2626",
          fontSize: "12px",
          fontFamily: "'DM Sans', sans-serif",
          marginTop: "8px"
        }}>
          {error}
        </p>
      )}
    </div>
  );
}