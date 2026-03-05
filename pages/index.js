import { useRouter } from "next/router";
import Layout from "../components/Layout";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import StepIndicator from "../components/StepIndicator";
import { useCheckout } from "../context/CheckoutContext";

export default function CartPage() {
  const router = useRouter();
  const { cartItems } = useCheckout();

  function handleProceed() {
    router.push("/shipping");
  }

  return (
    <Layout title="Your Cart – Ecoyaan">
      <StepIndicator current={1} />

      <h1 className="text-xl font-bold text-gray-900 mb-6">
        Shopping Cart
        <span className="ml-2 text-sm font-normal text-gray-500">
          ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
        </span>
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <svg
            className="mx-auto w-14 h-14 mb-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8M7 13L5.4 5M17 21a1 1 0 100-2 1 1 0 000 2zm-10 0a1 1 0 100-2 1 1 0 000 2z"
            />
          </svg>
          <p className="font-medium">Your cart is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart items list */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <CartItem key={item.product_id} item={item} />
                ))}
              </div>
            </div>

            {/* Eco note */}
            <div className="mt-4 flex items-start gap-3 bg-brand-pale border border-brand-light/30 rounded-xl p-4">
              <svg
                className="w-5 h-5 text-brand-green shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17 8C8 10 5.9 16.17 3.82 21h2.72c.44-1.73 1.28-3.38 2.76-4.81C9.37 15.18 11 15 13 15c4 0 7-3 7-7 0-1-.13-2.02-.44-2.95L17 8z" />
              </svg>
              <p className="text-sm text-brand-dark">
                By choosing these products you're helping reduce{" "}
                <span className="font-semibold">single-use plastic waste</span>.
                Thank you for shopping sustainably!
              </p>
            </div>
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <OrderSummary />

            <button
              onClick={handleProceed}
              disabled={cartItems.length === 0}
              className="w-full py-3.5 bg-brand-green hover:bg-brand-dark text-white font-semibold rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              Proceed to Checkout →
            </button>

            <p className="text-center text-xs text-gray-400">
              Free returns within 7 days &nbsp;·&nbsp; Secure payment
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
}

// getServerSideProps runs server-side on every request.
export async function getServerSideProps() {
  return {
    props: {
      cartData: {
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
      },
    },
  };
}
