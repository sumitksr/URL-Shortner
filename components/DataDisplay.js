"use client";

import { useState } from "react";

export default function DataDisplay({ data }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Data</h1>
      <textarea
        readOnly
        value={data}
        className="w-full max-w-5xl h-screen bg-gray-800 border border-gray-600 rounded p-4 text-white resize-none font-mono text-sm"
      />
      <button
        onClick={handleCopy}
        className="mt-4 px-6 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
      >
        {copied ? "Copied!" : "Copy to Clipboard"}
      </button>
    </div>
  );
}
