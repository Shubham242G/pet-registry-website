"use client";

import { useState } from "react";
import Script from "next/script";

interface PaymentButtonProps {
  petId: string;
  petName: string;
  amount: number;
  tagDeliveryOption: string;
  tagDeliveryCost: number;
  onSuccess: () => void;
  onFailure?: (error: string) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function PaymentButton({
  petId,
  petName,
  amount,
  tagDeliveryOption,
  tagDeliveryCost,
  onSuccess,
  onFailure,
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      console.log("💰 Amount:", amount);

      const validAmount = Number(amount);

      if (isNaN(validAmount) || validAmount <= 0) {
        throw new Error("Invalid payment amount");
      }

      const payload = {
        amount: validAmount,
        petId,
        petName,
        tagDeliveryOption,
        tagDeliveryCost: Number(tagDeliveryCost) || 0,
      };

      console.log("📦 Sending payment request:", payload);
      console.log("🌐 API URL:", API_URL);

      const orderResponse = await fetch(
        `${API_URL}/payment/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const orderData = await orderResponse.json();

      console.log("📦 Order response:", orderData);

      if (!orderResponse.ok || !orderData.success) {
        throw new Error(orderData.error || "Failed to create order");
      }

      if (typeof window.Razorpay === "undefined") {
        await loadRazorpaySDK();
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Tailio",
        description: `Registration fee for ${petName}`,
        order_id: orderData.orderId,

        handler: async (response: any) => {
          try {
            const verifyResponse = await fetch(
              `${API_URL}/payment/verify-payment`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  petId,
                  amount: validAmount * 100,
                  tagDeliveryOption,
                  tagDeliveryCost: Number(tagDeliveryCost) || 0,
                }),
              }
            );

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              setIsLoading(false);
              onSuccess();
            } else {
              setIsLoading(false);
              onFailure?.(verifyData.error || "Payment verification failed");
            }
          } catch (err: any) {
            setIsLoading(false);
            onFailure?.(err.message);
          }
        },

        modal: {
          ondismiss: () => {
            setIsLoading(false);
            onFailure?.("Payment cancelled");
          },
        },

        theme: {
          color: "#FF8C42",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      console.error(error);
      setIsLoading(false);
      onFailure?.(error.message);
    }
  };

  const loadRazorpaySDK = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.Razorpay) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
      document.body.appendChild(script);
    });
  };

  return (
    <>
      <button
        onClick={handlePayment}
        disabled={isLoading}
        style={{
          width: "100%",
          padding: "12px 20px",
          background: isLoading ? "#EBE1CE" : "#FF8C42",
          borderRadius: 9,
          border: "none",
          cursor: isLoading ? "not-allowed" : "pointer",
          color: isLoading ? "#A68660" : "white",
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        {isLoading ? "Processing..." : `Pay ₹${amount.toFixed(2)} to Register →`}
      </button>

      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
    </>
  );
}