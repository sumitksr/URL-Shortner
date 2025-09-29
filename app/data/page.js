"use client";
import { useState } from "react";
import { handleSubmit as submitHandler } from "@/handlers/submit";
import { PacmanLoader } from "react-spinners";

export default function DataPage() {
  const [data, setData] = useState("");
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
      const res = await submitHandler(data, customShortUrl, "data");
      if (res.success) {
        setShortenedUrl(res.data.shortUrl);
      } else {
        setError(res.error || "Something went wrong");
      }
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-800 animate-slide-up hover:shadow-3xl transition-all duration-300 hover:scale-[1.01]">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent animate-pulse-slow">
          Store & Share Data
        </h1>
        <p className="text-gray-300 text-center mb-8 animate-fade-in">
          Paste your text, code, or any data to create a shareable link
        </p>

        {loading ? (
          <div className="flex justify-center py-10">
            <PacmanLoader color="#ffffff" size={25} />
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Data Input */}
            <div>
              <label htmlFor="data" className="block mb-3 font-medium text-lg">
                Your Data
              </label>
              <textarea
                id="data"
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
                placeholder="Paste your text, code, notes, or any data here..."
                rows={15}
                className="w-full p-4 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 font-mono text-sm resize-y hover:bg-gray-800/70"
              />
              <div className="mt-2 text-sm text-gray-400">
                {data.length} characters
              </div>
            </div>

            {/* Custom Slug */}
            <div>
              <label
                htmlFor="customShortUrl"
                className="block mb-3 font-medium text-lg"
              >
                Custom Short URL (optional)
              </label>
              <input
                type="text"
                id="customShortUrl"
                value={customShortUrl}
                onChange={(e) => setCustomShortUrl(e.target.value)}
                placeholder="my-custom-link"
                className="w-full p-4 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:bg-gray-800/70"
              />
              <div className="mt-2 text-sm text-gray-400">
                Leave empty for auto-generated link
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              🚀 Create Data Link
            </button>
          </form>
        )}

        {/* Result */}
        {shortenedUrl && !loading && (
          <div className="mt-8 p-6 bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-lg border border-green-700/50 backdrop-blur-sm text-green-200 break-all animate-bounce-in">
            <p className="mb-3 font-semibold text-lg">
              Your data link is ready!
            </p>
            <div className="bg-gray-800 p-4 rounded border">
              <a
                href={`/${shortenedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-300 hover:text-blue-500 font-mono"
              >
                https://bitzipp.vercel.app/{shortenedUrl}
              </a>
            </div>
            <p className="mt-3 text-sm text-green-300">
              Share this link to let others view your data
            </p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="mt-8 p-6 bg-gradient-to-r from-red-900/50 to-pink-900/50 rounded-lg border border-red-700/50 backdrop-blur-sm text-red-300 animate-shake">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
