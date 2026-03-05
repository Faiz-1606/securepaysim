import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import OrderSummary from "../components/OrderSummary";
import StepIndicator from "../components/StepIndicator";
import { useCheckout } from "../context/CheckoutContext";

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI", icon: "📲" },
  { id: "card", label: "Credit / Debit Card", icon: "💳" },
  { id: "netbanking", label: "Net Banking", icon: "🏦" },
  { id: "cod", label: "Cash on Delivery", icon: "💰" },
];

export default function PaymentPage() {
  const router = useRouter();
  const { shippingAddress, grandTotal } = useCheckout();
  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [loading, setLoading] = useState(false);

  // If someone lands here directly without filling shipping, push them back
  useEffect(() => {
    if (!shippingAddress) {
      router.replace("/shipping");
    }
  }, [shippingAddress, router]);

  if (!shippingAddress) return null;

  async function handlePay() {
    setLoading(true);
    // Simulate a network call / payment gateway processing delay
    await new Promise((resolve) => setTimeout(resolve, 1800));
    router.push("/success");
  }

  return (
    <Layout title="Payment – Ecoyaan">
      <StepIndicator current={3} />

      <h1 className="text-xl font-bold text-gray-900 mb-6">
        Review & Pay
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Shipping address review */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-900">
                Delivering to
              </h2>
              <button
                onClick={() => router.push("/shipping")}
                className="text-xs text-brand-green hover:underline font-medium"
              >
                Change
              </button>
            </div>
            <div className="text-sm text-gray-700 space-y-0.5">
              <p className="font-semibold text-gray-900">
                {shippingAddress.fullName}
              </p>
              <p>{shippingAddress.email}</p>
              <p>+91 {shippingAddress.phone}</p>
              <p>
                {shippingAddress.city}, {shippingAddress.state} –{" "}
                {shippingAddress.pinCode}
              </p>
            </div>
          </div>

          {/* Payment method selector */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">
              Payment Method
            </h2>
            <div className="space-y-3">
              {PAYMENT_METHODS.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedMethod === method.id
                      ? "border-brand-green bg-brand-pale/50 ring-1 ring-brand-green"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={selectedMethod === method.id}
                    onChange={() => setSelectedMethod(method.id)}
                    className="accent-brand-green"
                  />
                  <span className="text-lg">{method.icon}</span>
                  <span className="text-sm font-medium text-gray-800">
                    {method.label}
                  </span>
                  {selectedMethod === method.id && (
                    <span className="ml-auto text-xs text-brand-green font-medium">
                      Selected
                    </span>
                  )}
                </label>
              ))}
            </div>

            {/* Simulated UPI input */}
            {selectedMethod === "upi" && (
              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  UPI ID
                </label>
                <input
                  type="text"
                  placeholder="yourname@upi"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-pale transition"
                />
              </div>
            )}

            {selectedMethod === "card" && (
              <div className="mt-4 space-y-3">
                <input
                  type="text"
                  placeholder="Card number"
                  maxLength={19}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-pale transition"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    maxLength={7}
                    className="px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-pale transition"
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    maxLength={4}
                    className="px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-pale transition"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => router.push("/shipping")}
              className="sm:w-32 py-3 rounded-xl border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={handlePay}
              disabled={loading}
              className="flex-1 py-3.5 bg-brand-green hover:bg-brand-dark text-white font-semibold rounded-xl transition-colors duration-200 shadow-sm flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Processing…
                </>
              ) : (
                <>
                  🔒 Pay Securely – ₹{grandTotal.toLocaleString("en-IN")}
                </>
              )}
            </button>
          </div>

          <p className="text-center text-xs text-gray-400">
            Your payment info is encrypted and never stored on our servers.
          </p>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <OrderSummary compact />
        </div>
      </div>
    </Layout>
  );
}
