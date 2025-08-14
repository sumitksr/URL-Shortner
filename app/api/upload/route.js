import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import cloudinary from '@/lib/cloudinary';

function generateRandomSlug() {
  return Math.random().toString(36).substring(2, 8);
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const customShortUrl = formData.get('customShortUrl');

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("shortner");
    const collection = db.collection("urls");

    // Generate short URL
    let slug = customShortUrl?.trim();
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

    // Convert file to buffer for Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          public_id: `files/${slug}`,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    // Create document for database
    const doc = {
      type: 'file',
      shorturl: slug,
      url: result.secure_url,
      fileName: file.name,
      fileSize: file.size,
      cloudinaryId: result.public_id,
      createdAt: new Date(),
    };

    await collection.insertOne(doc);

    return NextResponse.json({
      message: "File uploaded successfully",
      success: true,
      data: {
        shortUrl: slug,
        fileName: file.name,
        fileSize: file.size,
        downloadUrl: result.secure_url,
      },
    });

  } catch (error) {
    console.error('🔥 Error in POST /api/upload:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
