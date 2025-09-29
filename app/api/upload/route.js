import { v2 as cloudinary } from 'cloudinary';
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function generateRandomSlug() {
  return Math.random().toString(36).substring(2, 8);
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const providedSlug = formData.get('customShortUrl');

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determine resource type based on file type
    let resourceType = "auto";
    if (file.type.startsWith('image/')) {
      resourceType = "image";
    } else if (file.type.startsWith('video/')) {
      resourceType = "video";
    } else {
      resourceType = "raw"; // For PDFs and other non-media files
    }

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: resourceType,
          folder: "bitzipp-files",
          type: "upload",
          access_mode: "public",
          use_filename: true,
          unique_filename: false,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    // Generate short URL slug
    const client = await clientPromise;
    const db = client.db("shortner");
    const collection = db.collection("urls");

    let slug = providedSlug?.trim();
    if (!slug) {
      do {
        slug = generateRandomSlug();
      } while (await collection.findOne({ shorturl: slug }));
    } else {
      const exists = await collection.findOne({ shorturl: slug });
      if (exists) {
        return NextResponse.json(
          { error: "Short URL already exists", success: false },
          { status: 400 }
        );
      }
    }

    // Save to database
    const doc = {
      type: "file",
      shorturl: slug,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      cloudinaryUrl: uploadResult.secure_url,
      cloudinaryPublicId: uploadResult.public_id,
      resourceType: resourceType,
      createdAt: new Date(),
    };



    await collection.insertOne(doc);

    return NextResponse.json({
      message: "File uploaded successfully",
      success: true,
      data: { shortUrl: slug },
    });

  } catch (err) {
    console.error("🔥 Error in POST /api/upload:", err);
    
    // Handle Cloudinary specific errors
    if (err.message && err.message.includes('File size too large')) {
      return NextResponse.json(
        { error: "File size too large. Maximum file size is 10MB. Please choose a smaller file." },
        { status: 400 }
      );
    }
    
    if (err.http_code === 400 && err.message) {
      return NextResponse.json(
        { error: err.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}