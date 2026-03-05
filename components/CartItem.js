export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCheckout();

  return (
    <div className="flex items-start gap-4 py-4 border-b last:border-b-0">
      {/* Product image */}
      <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.product_name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 leading-snug">
          {item.product_name}
        </p>
        <p className="mt-1 text-sm text-brand-green font-semibold">
          ₹{item.product_price.toLocaleString("en-IN")}
        </p>

        {/* Qty control */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(item.product_id, -1)}
            className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="text-sm font-medium w-4 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.product_id, 1)}
            className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Line total + remove */}
      <div className="text-right shrink-0">
        <p className="text-sm font-semibold text-gray-900">
          ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
        </p>
        <button
          onClick={() => removeItem(item.product_id)}
          className="mt-2 text-xs text-red-400 hover:text-red-600 transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
