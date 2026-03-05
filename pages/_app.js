import { CheckoutProvider } from "../context/CheckoutContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  const { cartData, ...rest } = pageProps;

  return (
    <CheckoutProvider initialCart={cartData}>
      <Component {...rest} />
    </CheckoutProvider>
  );
}
