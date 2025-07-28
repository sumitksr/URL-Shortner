"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { handleSubmit as submitHandler } from "@/handlers/submit";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customShortUrl, setCustomShortUrl] = useState("");

  function handleChange(e) {
    const { id, value } = e.target;
    if (id === "originalUrl") {
      setOriginalUrl(value);
    } else if (id === "customShortUrl") {
      setCustomShortUrl(value);
    }
  }

  function onSubmit(e) {
    submitHandler(e, originalUrl, customShortUrl);
  }

  return (
    <div>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Shorten your URL</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="originalUrl" className="block mb-1">
              Original URL
            </label>
            <input
              type="url"
              id="originalUrl"
              value={originalUrl}
              onChange={handleChange}
              required
              placeholder="Enter your URL"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="customShortUrl" className="block mb-1">
              Custom Short URL
            </label>
            <input
              type="text"
              id="customShortUrl"
              value={customShortUrl}
              onChange={handleChange}
              placeholder="Custom alias (optional)"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Shorten URL
          </button>
        </form>
      </div>
    </div>
  );
}
