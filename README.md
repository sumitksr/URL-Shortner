# URL Shortener

A full-stack URL shortener, data storage, and file sharing app built with **Next.js 15**, **MongoDB**, **Cloudinary**, and **Tailwind CSS**. This was my **first Next.js project**, designed to shorten long URLs, store custom data, or share files behind a short URL.

[🔗 Visit Live Demo](https://bitzipp.vercel.app)

## 🔧 Features

* 🔗 **URL Shortening**: Convert long URLs into short, shareable links.
* 📄 **Data Storage**: Save text or information under a short URL.
* 📁 **File Upload & Sharing**: Upload files and get shareable short links.
* 🧪 **Custom Slugs**: Optionally set your own short alias for URLs, data, or files.
* 🔁 **Smart Redirection & Display**:
  * If the type is `url`, it redirects to the original URL.
  * If the type is `data`, it displays the stored content.
  * If the type is `file`, it shows a download page with file information.
* 🌐 **MongoDB Atlas** for backend database.
* ☁️ **Cloudinary** for secure file storage and delivery.
* 🎨 Dark-themed responsive UI with Tailwind CSS.
* 📱 **No file size limits** - Upload any size file.

## 🛠️ Tech Stack

* **Frontend**: Next.js App Router (v15), React, Tailwind CSS
* **Backend**: Next.js API Routes, MongoDB (via Atlas)
* **File Storage**: Cloudinary
* **Deployment**: Vercel (Frontend + Serverless backend)

## 📁 Folder Structure

```
/app
  /api/generate  → API route to create short links
  /api/upload    → API route to upload files
  /api/url/[key] → API route to get URL data
  /[url]         → Dynamic route to resolve short URLs
  /file          → File upload page
  /file-download/[key] → File download page
/components      → Navbar, DataDisplay, etc.
/lib
  /mongodb.js    → MongoDB connection
  /cloudinary.js → Cloudinary configuration
```

## 🚀 Getting Started (Local Dev)

1. **Clone the repository**:

   ```bash
   git clone https://github.com/sumitksr/URL-Shortner.git
   cd URL-Shortner
   ```

2. **Install dependencies**:

   ```bash
   npm install
   npm install cloudinary
   ```

3. **Create `.env.local`**:

   ```env
   MONGODB_URI=your-mongodb-atlas-uri
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Run locally**:

   ```bash
   npm run dev
   ```

5. Visit `http://localhost:3000` in your browser.

## ✨ Example Use Cases

* `shorturl.com/abc123` → Redirects to long URL
* `shorturl.com/data123` → Shows saved notes, code, or any text
* `shorturl.com/file456` → Shows file download page with download button

## 📁 File Upload Features

* **Drag & Drop Interface**: Easy file selection with visual feedback
* **Custom URLs**: Set your own short alias for files
* **File Information**: Shows file name, size, and upload date
* **Direct Download**: One-click download with proper file naming
* **Secure Storage**: Files stored securely on Cloudinary
* **No Size Limits**: Upload files of any size

## 📦 Deployment

Deployed on [Vercel](https://vercel.com). MongoDB hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). Files stored on [Cloudinary](https://cloudinary.com).

---

## 📬 Contact

Made with ❤️ by [Sumit Kumar](https://github.com/sumitksr)
