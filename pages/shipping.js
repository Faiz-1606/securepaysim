
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import OrderSummary from "../components/OrderSummary";
import StepIndicator from "../components/StepIndicator";
import { useCheckout } from "../context/CheckoutContext";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli",
  "Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  pinCode: "",
  city: "",
  state: "",
};

function validate(values) {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required";
  } else if (values.fullName.trim().length < 3) {
    errors.fullName = "Name must be at least 3 characters";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^[6-9]\d{9}$/.test(values.phone.trim())) {
    errors.phone = "Enter a valid 10-digit Indian mobile number";
  }

  if (!values.pinCode.trim()) {
    errors.pinCode = "PIN code is required";
  } else if (!/^\d{6}$/.test(values.pinCode.trim())) {
    errors.pinCode = "PIN code must be exactly 6 digits";
  }

  if (!values.city.trim()) {
    errors.city = "City is required";
  }

  if (!values.state) {
    errors.state = "Please select a state";
  }

  return errors;
}

function Field({ label, error, children, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
          <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = (hasError) =>
  `w-full px-3.5 py-2.5 rounded-lg border text-sm text-gray-900 outline-none transition-shadow focus:ring-2 ${
    hasError
      ? "border-red-400 focus:ring-red-100"
      : "border-gray-300 focus:border-brand-green focus:ring-brand-pale"
  }`;

export default function ShippingPage() {
  const router = useRouter();
  const { setShippingAddress, shippingAddress } = useCheckout();

  const [form, setForm] = useState(shippingAddress || initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validate(form);
    if (fieldErrors[name]) {
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      // Mark all fields as touched to surface all errors
      const allTouched = Object.keys(form).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      );
      setTouched(allTouched);
      return;
    }
    setShippingAddress(form);
    router.push("/payment");
  }

  return (
    <Layout title="Shipping Address – Ecoyaan">
      <StepIndicator current={2} />

      <h1 className="text-xl font-bold text-gray-900 mb-6">
        Shipping Address
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5"
          >
            {/* Full Name */}
            <Field label="Full Name" required error={touched.fullName && errors.fullName}>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Rahul Sharma"
                className={inputClass(touched.fullName && errors.fullName)}
              />
            </Field>

            {/* Email & Phone row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Email Address" required error={touched.email && errors.email}>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="rahul@example.com"
                  className={inputClass(touched.email && errors.email)}
                />
              </Field>

              <Field label="Phone Number" required error={touched.phone && errors.phone}>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-500 select-none">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="9876543210"
                    maxLength={10}
                    className={`${inputClass(touched.phone && errors.phone)} pl-12`}
                  />
                </div>
              </Field>
            </div>

            {/* PIN Code, City, State row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="PIN Code" required error={touched.pinCode && errors.pinCode}>
                <input
                  type="text"
                  name="pinCode"
                  value={form.pinCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="560001"
                  maxLength={6}
                  className={inputClass(touched.pinCode && errors.pinCode)}
                />
              </Field>

              <Field label="City" required error={touched.city && errors.city}>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Bengaluru"
                  className={inputClass(touched.city && errors.city)}
                />
              </Field>

              <Field label="State" required error={touched.state && errors.state}>
                <select
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${inputClass(touched.state && errors.state)} bg-white appearance-none`}
                >
                  <option value="">Select state</option>
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => router.push("/")}
                className="sm:w-32 py-3 rounded-xl border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-brand-green hover:bg-brand-dark text-white font-semibold rounded-xl transition-colors duration-200 shadow-sm"
              >
                Review & Pay →
              </button>
            </div>
          </form>
        </div>

        {/* Order summary sidebar */}
        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </Layout>
  );
}
