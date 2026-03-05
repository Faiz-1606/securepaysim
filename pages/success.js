import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useCheckout } from "../context/CheckoutContext";

function generateOrderId() {
  return "ECO" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function SuccessPage() {
  const router = useRouter();
  const { shippingAddress, grandTotal, cartItems } = useCheckout();
  const [orderId] = useState(generateOrderId);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const t = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t);
  }, []);

  // If someone navigates here without a shipping address, redirect to cart
  useEffect(() => {
    if (!shippingAddress) {
      router.replace("/");
    }
  }, [shippingAddress, router]);

  if (!shippingAddress) return null;

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);
  const deliveryStr = estimatedDelivery.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <>
      <Head>
        <title>Order Confirmed – Ecoyaan</title>
      </Head>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div
          className={`max-w-md w-full bg-white rounded-2xl border border-gray-200 shadow-md p-8 text-center transition-all duration-500 ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Animated checkmark */}
          <div className="flex items-center justify-center mb-5">
            <div className="w-20 h-20 rounded-full bg-brand-pale flex items-center justify-center">
              <svg
                className="w-10 h-10 text-brand-green"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Order Placed! 🎉
          </h1>
          <p className="text-gray-500 text-sm mb-5">
            Thank you,{" "}
            <span className="font-semibold text-gray-700">
              {shippingAddress.fullName}
            </span>
            . Your payment was successful.
          </p>

          {/* Order details box */}
          <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2.5 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Order ID</span>
              <span className="font-mono font-semibold text-gray-900">
                #{orderId}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Amount Paid</span>
              <span className="font-semibold text-brand-green">
                ₹{grandTotal.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Items</span>
              <span className="font-medium text-gray-900">
                {cartItems.reduce((a, i) => a + i.quantity, 0)} items
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Delivering to</span>
              <span className="font-medium text-gray-900 text-right max-w-[55%]">
                {shippingAddress.city}, {shippingAddress.state} −{" "}
                {shippingAddress.pinCode}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Est. Delivery</span>
              <span className="font-medium text-gray-900">{deliveryStr}</span>
            </div>
          </div>

          {/* Eco message */}
          <div className="bg-brand-pale border border-brand-light/30 rounded-xl p-3.5 mb-6 flex items-start gap-2.5 text-left">
            <svg
              className="w-5 h-5 text-brand-green shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17 8C8 10 5.9 16.17 3.82 21h2.72c.44-1.73 1.28-3.38 2.76-4.81C9.37 15.18 11 15 13 15c4 0 7-3 7-7 0-1-.13-2.02-.44-2.95L17 8z" />
            </svg>
            <p className="text-xs text-brand-dark">
              Your order will be shipped in{" "}
              <span className="font-semibold">100% plastic-free packaging</span>
              . You&apos;re making a difference! 🌱
            </p>
          </div>

          <Link
            href="/"
            className="inline-block w-full py-3 bg-brand-green hover:bg-brand-dark text-white font-semibold rounded-xl transition-colors duration-200 text-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
}
