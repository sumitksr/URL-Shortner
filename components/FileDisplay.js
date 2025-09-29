"use client";

import { useState } from "react";

export default function FileDisplay({ fileData }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      // Use our download API endpoint
      const downloadUrl = `/api/download/${fileData.shortUrl}`;

      // Create a temporary link to download the file
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileData.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback: try direct Cloudinary URL
      window.open(fileData.cloudinaryUrl, "_blank");
    } finally {
      setDownloading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType?.startsWith("image/")) return "🖼️";
    if (fileType?.startsWith("video/")) return "🎥";
    if (fileType?.startsWith("audio/")) return "🎵";
    if (fileType?.includes("pdf")) return "📄";
    if (fileType?.includes("zip") || fileType?.includes("rar")) return "📦";
    if (fileType?.includes("text")) return "📝";
    return "📁";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <div className="max-w-2xl w-full bg-gray-900 p-8 rounded-xl shadow-xl text-center">
        <h1 className="text-2xl font-semibold mb-6">File Download</h1>

        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <div className="text-6xl mb-4">{getFileIcon(fileData.fileType)}</div>
          <h2 className="text-xl font-medium mb-2 break-all">
            {fileData.fileName}
          </h2>
          <div className="text-gray-400 space-y-1">
            <p>Size: {formatFileSize(fileData.fileSize)}</p>
            <p>Type: {fileData.fileType || "Unknown"}</p>
            <p>Uploaded: {fileData.createdAt}</p>
          </div>
        </div>

        <button
          onClick={handleDownload}
          disabled={downloading}
          className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {downloading ? "Downloading..." : "Download File"}
        </button>

        <p className="mt-4 text-sm text-gray-400">
          Click the button above to download this file
        </p>
      </div>
    </div>
  );
}
