"use client";
import { useState } from "react";
import { PacmanLoader } from "react-spinners";

export default function FilePage() {
  const [file, setFile] = useState(null);
  const [customShortUrl, setCustomShortUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      
      // Check file size (10MB limit)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (selectedFile.size > maxSize) {
        setError("File size too large. Maximum file size is 10MB. Please choose a smaller file.");
        setFile(null);
        return;
      }
      
      setError(""); // Clear any previous errors
      setFile(selectedFile);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check file size (10MB limit)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (selectedFile.size > maxSize) {
        setError("File size too large. Maximum file size is 10MB. Please choose a smaller file.");
        setFile(null);
        return;
      }
      
      setError(""); // Clear any previous errors
      setFile(selectedFile);
    }
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (!file) {
      setError("Please select a file");
      return;
    }

    setLoading(true);
    setError("");
    setShortenedUrl("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("customShortUrl", customShortUrl);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      
      if (json.success) {
        setShortenedUrl(json.data.shortUrl);
      } else {
        setError(json.error || "Something went wrong");
      }
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-800 animate-slide-up hover:shadow-3xl transition-all duration-300 hover:scale-[1.01]">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent animate-pulse-slow">
          Upload & Share Files
        </h1>
        <p className="text-gray-300 text-center mb-8 animate-fade-in">
          Upload any file to get a shareable download link
        </p>

        {loading ? (
          <div className="flex justify-center py-10">
            <PacmanLoader color="#ffffff" size={25} />
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6">
            {/* File Upload Area */}
            <div>
              <label className="block mb-3 font-medium text-lg">
                Select File
              </label>
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? "border-blue-500 bg-blue-900/20"
                    : "border-gray-600 hover:border-gray-500"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {file ? (
                  <div className="space-y-2">
                    <div className="text-green-400 text-lg">✓ File Selected</div>
                    <div className="text-white font-medium">{file.name}</div>
                    <div className="text-gray-400">{formatFileSize(file.size)}</div>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="text-red-400 hover:text-red-300 text-sm underline"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-4xl text-gray-400">📁</div>
                    <div className="text-lg">Drop your file here or click to browse</div>
                    <div className="text-gray-400 text-sm">
                      Supports all file types • Max size: 10MB
                    </div>
                  </div>
                )}
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
                placeholder="my-file-link"
                className="w-full p-4 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:bg-gray-800/70"
              />
              <div className="mt-2 text-sm text-gray-400">
                Leave empty for auto-generated link
              </div>
            </div>

            <button
              type="submit"
              disabled={!file}
              className="w-full bg-purple-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-purple-700 transition text-lg disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              Upload File
            </button>
          </form>
        )}

        {/* Result */}
        {shortenedUrl && !loading && (
          <div className="mt-8 p-6 bg-purple-900 rounded-lg text-purple-200 break-all">
            <p className="mb-3 font-semibold text-lg">Your file link is ready!</p>
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
            <p className="mt-3 text-sm text-purple-300">
              Share this link to let others download your file
            </p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="mt-8 p-6 bg-red-900 rounded-lg text-red-300">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}