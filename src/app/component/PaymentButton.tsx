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

      // Include tag delivery info in the order
      const orderResponse = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: amount,
          petId,
          petName,
          tagDeliveryOption,
          tagDeliveryCost,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok || !orderData.success) {
        throw new Error(orderData.error || "Failed to create order");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Tailio",
        description: `Registration fee for ${petName}`,
        order_id: orderData.orderId,

        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },

        handler: async (response: any) => {
          try {
            const verifyResponse = await fetch("/api/payment/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                petId: petId,
                amount: amount * 100,
                tagDeliveryOption,
                tagDeliveryCost,
              }),
            });

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
            onFailure?.(err.message || "Payment verification failed");
          }
        },

        modal: {
          ondismiss: () => {
            setIsLoading(false);
            onFailure?.("Payment cancelled");
          },
        },

        prefill: {
          name: "",
          email: "",
          contact: "",
        },

        theme: {
          color: "#FF8C42",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      console.error("Payment error:", error);
      onFailure?.(error.message || "Payment failed");
      setIsLoading(false);
    }
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
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          if (!isLoading) {
            e.currentTarget.style.background = "#e07a2e";
            e.currentTarget.style.transform = "scale(1.02)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isLoading) {
            e.currentTarget.style.background = "#FF8C42";
            e.currentTarget.style.transform = "scale(1)";
          }
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