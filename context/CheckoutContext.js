import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext(null);

export function CheckoutProvider({ children, initialCart }) {
  const [cartItems, setCartItems] = useState(initialCart?.cartItems || []);
  const [shippingFee] = useState(initialCart?.shipping_fee || 50);
  const [discount] = useState(initialCart?.discount_applied || 0);
  const [shippingAddress, setShippingAddress] = useState(null);

  function updateQuantity(productId, delta) {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product_id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(productId) {
    setCartItems((prev) =>
      prev.filter((item) => item.product_id !== productId)
    );
  }

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0
  );

  const grandTotal = subtotal + shippingFee - discount;

  return (
    <CheckoutContext.Provider
      value={{
        cartItems,
        shippingFee,
        discount,
        subtotal,
        grandTotal,
        shippingAddress,
        setShippingAddress,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) {
    throw new Error("useCheckout must be used inside CheckoutProvider");
  }
  return ctx;
}
