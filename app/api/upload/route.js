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

    console.log('🔥 Generated slug:', slug);

    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || 
        !process.env.CLOUDINARY_API_KEY || 
        !process.env.CLOUDINARY_API_SECRET) {
      console.error('🔥 Cloudinary environment variables not configured');
      
      // Fallback: Store file metadata only (for development/testing)
      const doc = {
        type: 'file',
        shorturl: slug,
        url: `#file-${slug}`, // Placeholder URL
        fileName: file.name,
        fileSize: file.size,
        cloudinaryId: null,
        createdAt: new Date(),
        status: 'metadata_only' // Indicate this is just metadata
      };

      await collection.insertOne(doc);
      
      return NextResponse.json({
        message: "File metadata saved (upload service not configured)",
        success: true,
        data: {
          shortUrl: slug,
          fileName: file.name,
          fileSize: file.size,
          downloadUrl: `#file-${slug}`,
          note: "File upload service not configured in production"
        },
      });
    }

    console.log('🔥 File received:', {
      name: file.name,
      size: file.size,
      type: file.type
    });

    // Convert file to buffer for Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log('🔥 File converted to buffer, size:', buffer.length);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          public_id: `files/${slug}`,
        },
        (error, result) => {
          if (error) {
            console.error('🔥 Cloudinary upload error:', error);
            reject(error);
          } else {
            console.log('🔥 Cloudinary upload success:', result.public_id);
            resolve(result);
          }
        }
      ).end(buffer);
    });

    console.log('🔥 Cloudinary result:', result);

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
    console.log('🔥 Database record created');

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
    
    // Provide more specific error messages
    if (error.message?.includes('Cloudinary')) {
      return NextResponse.json(
        { error: 'File upload service error' },
        { status: 500 }
      );
    }
    
    if (error.message?.includes('MongoDB')) {
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
