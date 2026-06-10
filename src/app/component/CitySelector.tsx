"use client";

import { useState, useEffect } from "react";

interface CitySelectorProps {
  selectedCity: string;
  onChange: (city: string) => void;
  error?: string;
}

const cities = [
  { value: "ghaziabad", label: "Ghaziabad", price: "₹1499", registrationFee: 1499 },
  { value: "delhi", label: "Delhi", price: "₹999", registrationFee: 999 },
  { value: "noida", label: "Noida", price: "₹999", registrationFee: 999 },
  { value: "gurgaon", label: "Gurgaon", price: "₹999", registrationFee: 999 },
  { value: "faridabad", label: "Faridabad", price: "₹999", registrationFee: 999 },
  { value: "other", label: "Other City", price: "₹999", registrationFee: 999 },
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
            {city.label} (Registration {city.price})
          </option>
        ))}
      </select>
      
      {selectedCity && selectedCityData && (
        <div style={{
          marginTop: "12px",
          padding: "12px 14px",
          background: "#FFF0E4",
          borderRadius: "9px",
          border: "1px solid rgba(232, 96, 10, 0.18)"
        }}>
          <p style={{
            color: "#4A2C14",
            fontSize: "12.5px",
            fontFamily: "'DM Sans', sans-serif",
            margin: 0
          }}>
            Registration fee for <strong>{selectedCityData.label}</strong>: 
            <span style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#E8600A",
              marginLeft: "8px"
            }}>
              {selectedCityData.price}
            </span>
          </p>
          <p style={{
            color: "#7A5C40",
            fontSize: "11px",
            fontFamily: "'DM Sans', sans-serif",
            marginTop: "6px",
            marginBottom: 0
          }}>
            This fee applies to each pet you register. One-time payment for lifetime registration.
          </p>
        </div>
      )}
      
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