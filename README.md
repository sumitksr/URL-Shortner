# BitZipp - Multi-Purpose URL Shortener & File Sharing Platform

A comprehensive full-stack platform built with **Next.js 15**, **MongoDB**, **Cloudinary**, and **Tailwind CSS**. BitZipp combines URL shortening, data storage, and file sharing in one elegant solution with beautiful animations and modern UI.

[🔗 Visit Live Demo](https://bitzipp.vercel.app)

## ✨ Features

### 🔗 URL Shortening

- Convert long URLs into short, shareable links
- Custom aliases for personalized short URLs
- Instant redirection with analytics tracking
- Clean, memorable URLs: `bitzipp.vercel.app/abc123`

### 📄 Data Storage (Pastebin-like)

- Store and share text, code snippets, notes, or any data
- Large textarea with character counter
- Syntax highlighting support for code
- Perfect for sharing configurations, logs, or documentation

### 📁 File Upload & Sharing

- Upload any file type up to 10MB
- Drag & drop interface with file validation
- Powered by Cloudinary for reliable storage
- Direct download links with file metadata
- Support for images, documents, videos, archives, and more

### 🎨 Modern UI/UX

- Beautiful gradient backgrounds and glass-morphism effects
- Smooth animations and transitions
- Responsive design for all devices
- Dark theme with neon accents
- Loading states with PacmanLoader
- Error handling with shake animations

### 🔧 Advanced Features

- Admin panel for managing all shortened URLs and data
- MongoDB Atlas for scalable database storage
- Next.js 15 App Router with server components
- API routes for all CRUD operations
- Environment-based configuration

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 18, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB Atlas
- **File Storage**: Cloudinary for file uploads and management
- **UI Components**: Custom animations, PacmanLoader (react-spinners)
- **Styling**: Tailwind CSS with custom animations and gradients
- **Deployment**: Vercel (Frontend + Serverless backend)

## 📁 Project Structure

```
/app
  /api
    /generate     → Create short links for URLs/data
    /upload       → Handle file uploads to Cloudinary
    /download     → File download endpoint
    /get/[key]    → Admin API for managing data
    /url/[key]    → Fetch URL/data by short key
  /data           → Data storage page (Pastebin-like)
  /file           → File upload page
  /authr/[key]    → Admin panel for URL management
  /[url]          → Dynamic route to resolve short URLs
  globals.css     → Custom animations and styles

/components
  /Navbar.js      → Navigation with active states
  /DataDisplay.js → Display stored text data
  /FileDisplay.js → File download interface
  /URLList.js     → Admin URL management

/handlers
  /submit.js      → Form submission logic

/lib
  /mongodb.js     → Database connection
```

## 🚀 Getting Started (Local Development)

1. **Clone the repository**:

   ```bash
   git clone https://github.com/sumitksr/URL-Shortner.git
   cd URL-Shortner
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Setup** - Create `.env.local`:

   ```env
   # MongoDB Atlas Connection
   MONGODB_URI=your-mongodb-atlas-connection-string

   # Cloudinary Configuration (for file uploads)
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret

   # Admin API Key (for URL management)
   API_KEY=your-secret-admin-key

   # Base URL (for production)
   NEXT_PUBLIC_BASE_URL=https://bitzipp.vercel.app
   ```

4. **Database Setup**:

   - Create a MongoDB Atlas cluster
   - Create a database named `shortner`
   - Create a collection named `urls`

5. **Cloudinary Setup** (for file uploads):

   - Sign up at [Cloudinary](https://cloudinary.com)
   - Get your cloud name, API key, and API secret
   - Add them to your `.env.local`

6. **Run the development server**:

   ```bash
   npm run dev
   ```

7. **Visit your app**:
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 💡 Use Cases & Examples

### URL Shortening

- `bitzipp.vercel.app/abc123` → Redirects to your long URL
- Perfect for social media, emails, and marketing campaigns

### Data Storage

- `bitzipp.vercel.app/notes456` → Displays your saved text/code
- Share configuration files, code snippets, or documentation
- Pastebin alternative with custom URLs

### File Sharing

- `bitzipp.vercel.app/file789` → Download page for your uploaded file
- Share images, documents, videos up to 10MB
- Temporary file hosting with direct download links

### Admin Management

- `bitzipp.vercel.app/authr/your-api-key` → Manage all your URLs and data
- View, edit, and delete shortened URLs
- Analytics and usage tracking

### Database & Storage Setup

- **MongoDB**: Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)
- **File Storage**: [Cloudinary](https://cloudinary.com) (free tier: 25GB storage, 25GB bandwidth)


## 📬 Contact

Made with ❤️ by [Sumit Kumar](https://github.com/sumitksr)

## 🔧 API Endpoints

### Public Endpoints

- `POST /api/generate` - Create shortened URL or data storage
- `GET /[shortUrl]` - Resolve and redirect/display content
- `POST /api/upload` - Upload files (with Cloudinary)
- `GET /api/download/[slug]` - Download files

### Admin Endpoints (Requires API Key)

- `GET /api/get/[key]` - List all URLs and data
- `DELETE /api/get/[key]` - Delete specific URL/data entry

## 🛡️ Security Features

- Environment variable protection for sensitive data
- API key authentication for admin functions
- File size validation (10MB limit)
- Input sanitization and validation
- Secure MongoDB connections with Atlas

## 🎯 Performance Optimizations

- Next.js 15 App Router for optimal performance
- Server-side rendering where appropriate
- Image optimization through Cloudinary
- Efficient MongoDB queries with indexing
- Lazy loading and code splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for database hosting
- [Cloudinary](https://cloudinary.com/) for file storage and management
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Vercel](https://vercel.com/) for seamless deployment

---

## 📬 Contact & Support

**Made with ❤️ by [Sumit Kumar](https://github.com/sumitksr)**

- 🐙 GitHub: [@sumitksr](https://github.com/sumitksr)
- 🌐 Live Demo: [bitzipp.vercel.app](https://bitzipp.vercel.app)
- 📧 Issues: [GitHub Issues](https://github.com/sumitksr/URL-Shortner/issues)

If you found this project helpful, please consider giving it a ⭐ on GitHub!
