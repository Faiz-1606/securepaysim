// Single source of truth for cart mock data.
// Imported by both the API route and getServerSideProps directly,
// so there's no self-referential HTTP call that breaks in serverless environments.

const cartData = {
  cartItems: [
    {
      product_id: 101,
      product_name: "Bamboo Toothbrush (Pack of 4)",
      product_price: 299,
      quantity: 2,
      image: "/placeholder.svg",
    },
    {
      product_id: 102,
      product_name: "Reusable Cotton Produce Bags",
      product_price: 450,
      quantity: 1,
      image: "/placeholder.svg",
    },
  ],
  shipping_fee: 50,
  discount_applied: 0,
};

export default cartData;
