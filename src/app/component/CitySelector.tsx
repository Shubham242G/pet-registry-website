"use client";

import { useState, useEffect } from "react";

interface CitySelectorProps {
  selectedCity: string;
  onChange: (city: string, price: number) => void;
  error?: string;
}

// Base prices (municipal fee + service fee + GST)
const cities = [
  { value: "ghaziabad", label: "Ghaziabad", basePrice: 1532.82, displayPrice: "₹1,532.82" },
  { value: "delhi", label: "Delhi", basePrice: 942.82, displayPrice: "₹942.82" },
  { value: "noida", label: "Noida", basePrice: 942.82, displayPrice: "₹942.82" },
  { value: "gurgaon", label: "Gurgaon", basePrice: 942.82, displayPrice: "₹942.82" },
];

// Tag delivery costs
const TAG_DELIVERY_COSTS = {
  ghaziabad: 268, // Extra for delivery
  delhi: 258,
  noida: 258,
  gurgaon: 258,
};

// Total with tag delivery
const getTotalWithDelivery = (city: string, basePrice: number) => {
  const deliveryCost = TAG_DELIVERY_COSTS[city as keyof typeof TAG_DELIVERY_COSTS] || 258;
  return basePrice + deliveryCost;
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
      onChange(cityValue, selectedCityData.basePrice);
    }
  };

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
            {city.label} — {city.displayPrice}
          </option>
        ))}
      </select>
      
      {selectedCityData && (
        <div style={{
          marginTop: "12px",
          padding: "12px 16px",
          background: "#FFF0E4",
          borderRadius: "9px",
          outline: "1px solid #FFCCA0",
          outlineOffset: "-1px",
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px"
          }}>
            <span style={{
              color: "#2C1A0E",
              fontSize: "13px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500
            }}>
              Base Registration Fee
            </span>
            <span style={{
              color: "#E8600A",
              fontSize: "18px",
              fontFamily: "'Fraunces', serif",
              fontWeight: 900
            }}>
              {selectedCityData.displayPrice}
            </span>
          </div>
          
          {/* Show tag delivery info */}
          <div style={{
            marginTop: "8px",
            paddingTop: "8px",
            borderTop: "1px solid rgba(44, 26, 14, 0.10)"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "4px"
            }}>
              <span style={{
                color: "#7A5C40",
                fontSize: "11px",
                fontFamily: "'DM Sans', sans-serif"
              }}>
                📦 Tag Delivery (optional)
              </span>
              <span style={{
                color: "#7A5C40",
                fontSize: "11px",
                fontFamily: "'DM Sans', sans-serif"
              }}>
                +₹{TAG_DELIVERY_COSTS[selectedCity as keyof typeof TAG_DELIVERY_COSTS] || 258}
              </span>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "4px",
              marginTop: "4px"
            }}>
              <span style={{
                color: "#2C1A0E",
                fontSize: "12px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600
              }}>
                Total with Home Delivery
              </span>
              <span style={{
                color: "#E8600A",
                fontSize: "16px",
                fontFamily: "'Fraunces', serif",
                fontWeight: 700
              }}>
                ₹{getTotalWithDelivery(selectedCity, selectedCityData.basePrice).toFixed(2)}
              </span>
            </div>
          </div>
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