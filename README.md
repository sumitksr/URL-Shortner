# URL Shortener

A full-stack URL shortener and data storage app built with **Next.js 15**, **MongoDB**, and **Tailwind CSS**. This was my **first Next.js project**, designed to shorten long URLs or store custom data behind a short URL.

[🔗 Visit Live Demo](https://bitzipp.vercel.app)

## 🔧 Features

* 🔗 **URL Shortening**: Convert long URLs into short, shareable links.
* 📄 **Data Storage**: Save text or information under a short URL.
* 🧪 **Custom Slugs**: Optionally set your own short alias.
* 🔁 **Redirection or Display**:

  * If the type is `url`, it redirects.
  * If the type is `data`, it displays the stored content.
* 🌐 **MongoDB Atlas** for backend database.
* 🎨 Dark-themed responsive UI with Tailwind CSS.



## 🛠️ Tech Stack

* **Frontend**: Next.js App Router (v15), React, Tailwind CSS
* **Backend**: Next.js API Routes, MongoDB (via Atlas)
* **Deployment**: Vercel (Frontend + Serverless backend)

## 📁 Folder Structure

```
/app
  /api/generate  → API route to create short links
  /[url]         → Dynamic route to resolve short URLs
/components      → Navbar, DataDisplay, etc.
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
   ```

3. **Create `.env.local`**:

   ```env
   MONGODB_URI=your-mongodb-atlas-uri
   ```

4. **Run locally**:

   ```bash
   npm run dev
   ```

5. Visit `http://localhost:3000` in your browser.

## ✨ Example Use Cases

* `shorturl.com/abc123` → Redirects to long URL
* `shorturl.com/data123` → Shows saved notes, code, or any text

## 📦 Deployment

Deployed on [Vercel](https://vercel.com). MongoDB hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

---

## 📬 Contact

Made with ❤️ by [Sumit Kumar](https://github.com/sumitksr)
