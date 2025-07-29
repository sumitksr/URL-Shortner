"use client";
import { useState } from "react";
import { handleSubmit as submitHandler } from "@/handlers/submit";
import { PacmanLoader } from "react-spinners";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customShortUrl, setCustomShortUrl] = useState("");
  const [type, setType] = useState("url");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortenedUrl("");

    try {
      const res = await submitHandler(originalUrl, customShortUrl, type);
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
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-xl mx-auto bg-gray-900 p-8 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Shorten your URL or Save Data
        </h1>

        {loading ? (
          <div className="flex justify-center py-10">
            <PacmanLoader color="#ffffff" size={25} />
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Original URL or Data */}
            <div>
              <label htmlFor="original" className="block mb-2 font-medium">
                {type === "url" ? "Original URL" : "Data"}
              </label>
              <input
                type="text"
                id="original"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                required
                placeholder={
                  type === "url"
                    ? "example.com or https://example.com"
                    : "Paste your data here"
                }
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Custom Slug */}
            <div>
              <label
                htmlFor="customShortUrl"
                className="block mb-2 font-medium"
              >
                Custom Short URL (optional)
              </label>
              <input
                type="text"
                id="customShortUrl"
                value={customShortUrl}
                onChange={(e) => setCustomShortUrl(e.target.value)}
                placeholder="custom-alias"
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Type Selector */}
            <div>
              <label htmlFor="type" className="block mb-2 font-medium">
                Type
              </label>
              <select
                id="type"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
              >
                <option value="url">URL</option>
                <option value="data">Data</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded font-semibold hover:bg-blue-700 transition"
            >
              {type === "url" ? "Shorten URL" : "Save Data"}
            </button>
          </form>
        )}

        {/* Result */}
        {shortenedUrl && !loading && (
          <div className="mt-6 p-4 bg-green-900 rounded text-green-200 break-all">
            <p className="mb-1 font-semibold">Shortened URL:</p>
            <a
              href={`/${shortenedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-300 hover:text-blue-500"
            >
              {`${typeof window !== "undefined" ? window.location.origin : ""}/${shortenedUrl}`}
            </a>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="mt-6 p-4 bg-red-900 rounded text-red-300">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}



 //   useEffect(() => {
  //   const wakeUpBackend = async () => {
  //     try {
  //       await fetch("https://your-backend-url.onrender.com/ping"); // or just "/"
  //       console.log("Backend woken up");
  //     } catch (error) {
  //       console.error("Error waking up backend:", error);
  //     }
  //   };

  //   wakeUpBackend();
  // }, []);