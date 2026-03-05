# Ecoyaan Checkout Flow

A simplified checkout flow built as part of the Ecoyaan frontend engineering assignment. The app walks a user through three steps — reviewing their cart, entering a shipping address, and completing a simulated payment.

---

## Live Demo

> Deploy link goes here (Vercel)

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 14 (Pages Router) |
| Styling | Tailwind CSS |
| State | React Context API |
| Mock backend | Next.js API routes |

---

## How to Run Locally

**Prerequisites:** Node.js ≥ 18

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd ecoyaan

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Screens / Flow

```
/ (Cart)  →  /shipping  →  /payment  →  /success
```

1. **Cart** – Lists products fetched via `getServerSideProps` from `/api/cart`. Supports quantity adjustment and item removal. Shows an order summary panel.
2. **Shipping** – Form with field-level validation (email format, 10-digit mobile, 6-digit PIN, required fields). Pre-fills from context if the user navigates back.
3. **Payment** – Shows shipping address summary and selectable payment method (UPI / Card / Net Banking / COD). Simulates a 1.8 s processing delay before redirecting to the success page.
4. **Success** – Displays a unique order ID, amount paid, estimated delivery date, and a plastic-free packaging note. Redirects back to index if accessed directly.

---

## Architectural Choices

### Pages Router + `getServerSideProps`
I went with the Pages Router rather than the newer App Router because the assignment explicitly called out `getServerSideProps`. This keeps the SSR boundary explicit and easy to audit. The cart data is fetched server-side on every request so prices / stock are always up to date.

### Context API for state
The cart state and shipping address are lifted into a single `CheckoutContext` that wraps the entire app in `_app.js`. The initial cart data from SSR is injected via `pageProps.cartData` so there's no client-side waterfall. Context was preferred over Redux / Zustand to keep the bundle lean; the state shape is simple enough that a reducer wouldn't add much.

### Form validation
Validation runs on blur (field-level) and again on submit (full form). This gives instant per-field feedback without being too aggressive on first render. The errors object is kept in local component state rather than a form library to keep dependencies minimal.

### Component structure

```
components/
  CartItem.js        – single line item with qty controls
  OrderSummary.js    – reusable price breakdown panel
  StepIndicator.js   – progress bar shown across steps
  Layout.js          – shared header / footer shell

context/
  CheckoutContext.js – cart items, totals, shipping address

pages/
  api/cart.js        – mock GET endpoint
  index.js           – Cart page (SSR)
  shipping.js        – Address form
  payment.js         – Payment step
  success.js         – Order confirmation
  404.js             – Custom not found
```

---

## Notes

- The payment step is **simulated** — no real payment gateway is integrated.
- Images are served from `via.placeholder.com` as placeholders (configured in `next.config.js`).
- The app is fully responsive and works on mobile, tablet, and desktop viewports.
