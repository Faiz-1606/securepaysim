import { useCheckout } from "../context/CheckoutContext";

export default function OrderSummary({ compact = false }) {
  const { subtotal, shippingFee, discount, grandTotal, cartItems } =
    useCheckout();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Order Summary
      </h2>

      {/* Item breakdown for compact mode (payment page) */}
      {compact && (
        <div className="mb-4 space-y-2">
          {cartItems.map((item) => (
            <div
              key={item.product_id}
              className="flex justify-between text-sm text-gray-600"
            >
              <span className="truncate pr-2">
                {item.product_name}{" "}
                <span className="text-gray-400">× {item.quantity}</span>
              </span>
              <span className="shrink-0 font-medium">
                ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
              </span>
            </div>
          ))}
          <hr className="mt-3" />
        </div>
      )}

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-medium text-gray-900">
            ₹{shippingFee.toLocaleString("en-IN")}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount applied</span>
            <span>− ₹{discount.toLocaleString("en-IN")}</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-900">
          Grand Total
        </span>
        <span className="text-lg font-bold text-brand-green">
          ₹{grandTotal.toLocaleString("en-IN")}
        </span>
      </div>

      <p className="mt-3 text-xs text-gray-400 text-center">
        All prices are inclusive of GST where applicable.
      </p>
    </div>
  );
}
