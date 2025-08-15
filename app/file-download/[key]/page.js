"use client";
import { useState, useEffect } from "react";
import { PacmanLoader } from "react-spinners";
import Link from "next/link";

export default function FileDownload({ params }) {
  const [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const response = await fetch(`/api/url/${params.key}`);
        const result = await response.json();

        if (response.ok && result.type === 'file') {
          setFileData(result);
        } else {
          setError("File not found or invalid link");
        }
      } catch (err) {
        setError("Error loading file");
      } finally {
        setLoading(false);
      }
    };

    fetchFileData();
  }, [params.key]);

  const handleDownload = () => {
    if (fileData && fileData.url) {
      const link = document.createElement('a');
      link.href = fileData.url;
      link.download = fileData.fileName || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <PacmanLoader color="#ffffff" size={25} />
          <p className="mt-4">Loading file...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold mb-4">File Not Found</h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-green-400 text-6xl mb-4">📁</div>
          <h1 className="text-3xl font-bold mb-2">File Ready for Download</h1>
          <p className="text-gray-400">Click the download button below to get your file</p>
        </div>

        {/* File Information */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">File Name</h3>
              <p className="text-white break-all">{fileData.fileName}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">File Size</h3>
              <p className="text-white">
                {fileData.fileSize ? `${(fileData.fileSize / 1024 / 1024).toFixed(2)} MB` : 'Unknown'}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Upload Date</h3>
              <p className="text-white">
                {fileData.createdAt ? new Date(fileData.createdAt).toLocaleDateString() : 'Unknown'}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">File Type</h3>
              <p className="text-white capitalize">{fileData.type}</p>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="text-center mb-8">
          <button
            onClick={handleDownload}
            className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition transform hover:scale-105"
          >
            📥 Download File
          </button>
        </div>

        {/* Direct Link */}
        <div className="bg-blue-900 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-blue-200 mb-2">Direct Download Link</h3>
          <a
            href={fileData.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-blue-100 underline break-all"
          >
            {fileData.url}
          </a>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
