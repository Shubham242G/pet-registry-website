"use client";

import { useState, useEffect } from "react";

interface CitySelectorProps {
  selectedCity: string;
  onChange: (city: string, price: number) => void;
  error?: string;
}

// ✅ ALL VALID CITIES - Display final prices including GST
const cities = [
  { value: "ghaziabad", label: "Ghaziabad", finalPrice: 1599, displayPrice: "₹1,599" },
  { value: "gurgaon", label: "Gurgaon", finalPrice: 1499, displayPrice: "₹1,499" },
  { value: "delhi", label: "Delhi", finalPrice: 999, displayPrice: "₹999" },
  { value: "noida", label: "Noida", finalPrice: 999, displayPrice: "₹999" },
  { value: "faridabad", label: "Faridabad", finalPrice: 999, displayPrice: "₹999" },
  { value: "jaipur", label: "Jaipur", finalPrice: 999, displayPrice: "₹999" },
  { value: "mumbai", label: "Mumbai", finalPrice: 999, displayPrice: "₹999" },
  { value: "thane", label: "Thane", finalPrice: 999, displayPrice: "₹999" },
];

// Tag delivery costs
const TAG_DELIVERY_COSTS = {
  ghaziabad: 268,
  delhi: 258,
  noida: 258,
  gurgaon: 258,
  faridabad: 258,
  jaipur: 258,
  mumbai: 258,
  thane: 258,
};

export default function CitySelector({ selectedCity, onChange, error }: CitySelectorProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityValue = e.target.value;
    const selectedCityData = cities.find(c => c.value === cityValue);
    if (selectedCityData && onChange) {
      // ✅ Pass the final price including GST
      onChange(cityValue, selectedCityData.finalPrice);
    }
  };

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
        onChange={handleCityChange}
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
            {city.label} — {city.displayPrice} (incl. GST)
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