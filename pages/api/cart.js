// pages/api/cart.js
// Mock API route – simulates a backend returning cart data.
// In production this would call a real database / service.

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Slight artificial delay so SSR looks realistic in dev
  const data = {
    cartItems: [
      {
        product_id: 101,
        product_name: "Bamboo Toothbrush (Pack of 4)",
        product_price: 299,
        quantity: 2,
        image: "https://via.placeholder.com/150",
      },
      {
        product_id: 102,
        product_name: "Reusable Cotton Produce Bags",
        product_price: 450,
        quantity: 1,
        image: "https://via.placeholder.com/150",
      },
    ],
    shipping_fee: 50,
    discount_applied: 0,
  };

  res.status(200).json(data);
}
