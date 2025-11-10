import { Icon } from "@iconify/react";

export default function CardInput() {
  return (
    <div className="max-w-sm mx-auto mt-10 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center gap-4 border border-gray-200">
      <Icon
        icon="mdi:credit-card-off-outline"
        width="50"
        className="text-red-500"
      />
      <h3 className="text-xl font-semibold text-gray-800 text-center">
        Payment Option Unavailable
      </h3>
      <p className="text-sm text-gray-500 text-center">
        This payment method is currently not available. Please try another
        option or check back later.
      </p>
    </div>
  );
}
