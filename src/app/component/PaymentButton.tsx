"use client";

import { useState } from "react";
import Script from "next/script";

interface PaymentButtonProps {
  petId: string;
  petName: string;
  amount: number;
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
  onSuccess,
  onFailure,
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

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

        // FIX: Added method config — this is what was causing QR-only display.
        // Without this, Razorpay defaults to showing only a QR code in test mode.
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
        className="w-full bg-[#FF8C42] hover:bg-[#e07a2e] text-white py-3 rounded-lg font-bold transition disabled:opacity-50"
      >
        {isLoading ? "Processing..." : `Pay ₹${amount} to Register →`}
      </button>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
    </>
  );
}