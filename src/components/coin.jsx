// import { useState } from "react";
import { Icon } from "@iconify/react";
import { QRCodeCanvas } from "qrcode.react";

export default function CoinPayment({ amount, ethAddress }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(ethAddress);
  };
  const EthUri = `ethereum:${ethAddress}?value=${amount}`;

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow p-4 flex flex-col items-center space-y-4">
      <div className="w-full flex justify-between items-center bg-gray-50 rounded-lg p-3 border border-gray-200">
        <span className="text-gray-600 text-sm">Amount:</span>
        <span className="font-medium text-gray-800">{amount}</span>
      </div>

      <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
        <QRCodeCanvas value={EthUri} size={120} />
      </div>
      {/* <div className="w-full flex justify-between items-center bg-gray-50 rounded-lg p-3 border border-gray-200">
        <p className="text-xs text-gray-500 mt-1 break-all text-center">
          {ethAddress}
        </p>
        <button
          onClick={handleCopy}
          className="mt-1 px-3 py-1 bg-gray-600 text-white rounded-lg text-sm flex items-center gap-1 hover:bg-gray-700 transition"
        >
          <Icon icon="mdi:content-copy" width="16" />
        </button>
      </div> */}
      <div className="w-full flex flex-col space-y-2">
        {/* Address with ellipsis and copy */}
        <div className="flex justify-between items-center bg-gray-50 rounded-lg p-3 border border-gray-200">
          <p className="text-xs text-gray-500 truncate" title={ethAddress}>
            {ethAddress}
          </p>
          <button
            onClick={handleCopy}
            className="px-3 py-1 bg-gray-600 text-white rounded-lg text-sm flex items-center gap-1 hover:bg-gray-700 transition"
          >
            <Icon icon="mdi:content-copy" width="16" />
          </button>
        </div>

        {/* Warning / Notes */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-md text-xs text-yellow-800 space-y-1">
          <p>⚠️ Ensure you send the exact amount of coin.</p>
          <p>
            ⚠️ Only send Ethereum<b>(ETH)</b> to this address.
          </p>
          <p>⚠️ Sending any other coin may result in loss of funds.</p>
          <p>⚠️ Send your payment hash(prove) to the support.</p>
        </div>
      </div>
    </div>
  );
}
