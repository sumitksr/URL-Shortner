"use client";
import { useState } from "react";
import { PacmanLoader } from "react-spinners";
import Link from "next/link";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [customShortUrl, setCustomShortUrl] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file");
      return;
    }

    setLoading(true);
    setError("");
    setUploadedUrl("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      if (customShortUrl) {
        formData.append("customShortUrl", customShortUrl);
      }

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log('Upload response:', result);

      if (response.ok) {
        console.log('Setting uploaded URL:', result.data.shortUrl);
        setUploadedUrl(result.data.shortUrl);
      } else {
        setError(result.error || "Upload failed");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-xl mx-auto bg-gray-900 p-8 rounded-xl shadow-xl">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 transition flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center">
          Upload and Share Files
        </h1>

        {loading ? (
          <div className="flex justify-center py-10">
            <PacmanLoader color="#ffffff" size={25} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* File Upload */}
            <div>
              <label htmlFor="file" className="block mb-2 font-medium">
                Select File
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition">
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  required
                  className="hidden"
                  accept="*/*"
                />
                <label
                  htmlFor="file"
                  className="cursor-pointer block"
                >
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-4"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-lg font-medium text-gray-300">
                    {file ? file.name : "Click to select a file"}
                  </span>
                </label>
              </div>
              {file && (
                <div className="mt-3 p-3 bg-gray-800 rounded text-sm">
                  <p className="text-gray-300">
                    <span className="font-medium">Selected:</span> {file.name}
                  </p>
                </div>
              )}
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

            <button
              type="submit"
              disabled={!file}
              className="w-full bg-green-600 text-white px-4 py-3 rounded font-semibold hover:bg-green-700 transition disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              Upload File
            </button>
          </form>
        )}

        {/* Result */}
        {uploadedUrl && !loading && (
          <div className="mt-6 p-4 bg-green-900 rounded text-green-200 break-all">
            <p className="mb-1 font-semibold">File uploaded successfully!</p>
            <p className="mb-2 text-sm">Share this link:</p>
            <a
              href={`/${uploadedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-300 hover:text-blue-500"
            >
              {`${typeof window !== "undefined" ? window.location.origin : ""}/${uploadedUrl}`}
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
