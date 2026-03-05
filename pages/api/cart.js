// pages/api/cart.js
// Mock API route – simulates a backend returning cart data.
// Data lives in lib/cartData.js so getServerSideProps can import it directly
// without making a self-referential HTTP call (which breaks on Vercel).

const cartData = require("../../lib/cartData");

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  res.status(200).json(cartData);
}
