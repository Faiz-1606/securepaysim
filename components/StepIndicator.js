const STEPS = ["Cart", "Shipping", "Payment"];

export default function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((step, idx) => {
        const stepNum = idx + 1;
        const isDone = current > stepNum;
        const isActive = current === stepNum;

        return (
          <div key={step} className="flex items-center">
            {/* Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all
                  ${
                    isDone
                      ? "bg-brand-green border-brand-green text-white"
                      : isActive
                      ? "border-brand-green text-brand-green bg-white"
                      : "border-gray-300 text-gray-400 bg-white"
                  }`}
              >
                {isDone ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={`mt-1 text-xs font-medium ${
                  isActive
                    ? "text-brand-green"
                    : isDone
                    ? "text-brand-green"
                    : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>

            {/* Connector */}
            {idx < STEPS.length - 1 && (
              <div
                className={`w-16 sm:w-24 h-0.5 mb-5 mx-1 ${
                  current > stepNum ? "bg-brand-green" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
