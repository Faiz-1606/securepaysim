import Head from "next/head";
import Link from "next/link";

export default function Layout({ children, title = "Ecoyaan Checkout" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Ecoyaan – sustainable living, simplified."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        {/* Top nav */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              {/* simple leaf icon */}
              <svg
                className="w-6 h-6 text-brand-green"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17 8C8 10 5.9 16.17 3.82 21h2.72c.44-1.73 1.28-3.38 2.76-4.81C9.37 15.18 11 15 13 15c4 0 7-3 7-7 0-1-.13-2.02-.44-2.95L17 8z" />
              </svg>
              <span className="font-bold text-brand-dark text-lg tracking-tight">
                Ecoyaan
              </span>
            </Link>

            <span className="text-gray-300 text-xl ml-1">|</span>
            <span className="text-sm text-gray-500 font-medium">
              Secure Checkout
            </span>

            <div className="ml-auto flex items-center gap-1 text-xs text-gray-400">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c0-1.657-1.343-3-3-3S6 9.343 6 11v4h12v-4c0-1.657-1.343-3-3-3s-3 1.343-3 3z"
                />
                <rect x="4" y="15" width="16" height="6" rx="1" strokeWidth={2} />
              </svg>
              SSL secured
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8">
          {children}
        </main>

        <footer className="text-center py-4 text-xs text-gray-400 border-t border-gray-100">
          © {new Date().getFullYear()} Ecoyaan. All rights reserved.
        </footer>
      </div>
    </>
  );
}
