import Link from "next/link";
import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found – Ecoyaan</title>
      </Head>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
        <span className="text-6xl mb-4">🌿</span>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <p className="text-gray-500 mb-6">
          Oops! This page seems to have composted away.
        </p>
        <Link
          href="/"
          className="px-5 py-2.5 bg-brand-green text-white rounded-xl font-medium hover:bg-brand-dark transition-colors text-sm"
        >
          Back to Cart
        </Link>
      </div>
    </>
  );
}
