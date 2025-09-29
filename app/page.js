"use client";
import { useState } from "react";
import { handleSubmit as submitHandler } from "@/handlers/submit";
import { PacmanLoader } from "react-spinners";

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
      const res = await submitHandler(originalUrl, customShortUrl, "url");
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-6 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-pulse-slow">
            Shorten Your URLs
          </h1>
          <p className="text-gray-400 text-lg animate-slide-up">
            Transform long URLs into short, shareable links instantly
          </p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-800 animate-slide-up-delayed hover:shadow-3xl transition-all duration-300 hover:scale-[1.01]">
          {loading ? (
            <div className="flex justify-center py-10">
              <PacmanLoader color="#ffffff" size={25} />
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Original URL */}
              <div>
                <label
                  htmlFor="original"
                  className="block mb-3 font-medium text-gray-300"
                >
                  🔗 Enter your long URL
                </label>
                <input
                  type="text"
                  id="original"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  required
                  placeholder="https://example.com/very/long/url/path"
                  className="w-full p-4 bg-gray-800/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                />
              </div>

              {/* Custom Slug */}
              <div>
                <label
                  htmlFor="customShortUrl"
                  className="block mb-3 font-medium text-gray-300"
                >
                  ✨ Custom alias (optional)
                </label>
                <input
                  type="text"
                  id="customShortUrl"
                  value={customShortUrl}
                  onChange={(e) => setCustomShortUrl(e.target.value)}
                  placeholder="my-custom-link"
                  className="w-full p-4 bg-gray-800/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                🚀 Shorten URL
              </button>
            </form>
          )}

          {/* Result */}
          {shortenedUrl && !loading && (
            <div className="mt-8 p-6 bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-xl border border-green-700/50 backdrop-blur-sm animate-bounce-in">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">✅</span>
                <p className="font-semibold text-lg text-green-200">
                  Your shortened URL is ready!
                </p>
              </div>
              <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-600">
                <a
                  href={`/${shortenedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-400 font-mono text-sm md:text-base break-all transition-colors duration-200"
                >
                  https://bitzipp.vercel.app/{shortenedUrl}
                </a>
              </div>
              <p className="mt-3 text-sm text-green-300 flex items-center">
                <span className="mr-1">🔄</span>
                Share this link to redirect to your original URL
              </p>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="mt-8 p-6 bg-gradient-to-r from-red-900/50 to-pink-900/50 rounded-xl border border-red-700/50 backdrop-blur-sm animate-shake">
              <div className="flex items-center">
                <span className="text-2xl mr-2">❌</span>
                <div>
                  <p className="font-semibold text-red-200">Error:</p>
                  <p className="text-red-300">{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
