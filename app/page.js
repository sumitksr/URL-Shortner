"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { handleSubmit as submitHandler } from "@/handlers/submit";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customShortUrl, setCustomShortUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortenedUrl("");

    try {
      const res = await submitHandler(e, originalUrl, customShortUrl);
      if (res.success) {
        setShortenedUrl(res.data.shortUrl);
      } else {
        setError(res.error || "Something went wrong");
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-xl mx-auto bg-gray-900 p-8 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Shorten your URL</h1>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label htmlFor="originalUrl" className="block mb-2 font-medium">
              Original URL
            </label>
            <input
              type="url"
              id="originalUrl"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
              placeholder="https://example.com"
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="customShortUrl" className="block mb-2 font-medium">
              Custom Short URL
            </label>
            <input
              type="text"
              id="customShortUrl"
              value={customShortUrl}
              onChange={(e) => setCustomShortUrl(e.target.value)}
              placeholder="custom-alias (optional)"
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white px-4 py-3 rounded font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Processing..." : "Shorten URL"}
          </button>
        </form>

        {shortenedUrl && (
          <div className="mt-6 p-4 bg-green-900 rounded text-green-200 break-all">
            <p className="mb-1 font-semibold">Shortened URL:</p>
            <a href={shortenedUrl} target="_blank" className="underline">
              {shortenedUrl}
            </a>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-900 rounded text-red-300">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
