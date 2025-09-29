import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    
    const client = await clientPromise;
    const collection = client.db("shortner").collection("urls");
    
    const doc = await collection.findOne({ shorturl: slug, type: "file" });
    
    if (!doc) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }



    // Fetch the file from Cloudinary
    const response = await fetch(doc.cloudinaryUrl);
    
    if (!response.ok) {
      console.error("Cloudinary fetch failed:", response.status, response.statusText);
      return NextResponse.json(
        { error: "Failed to fetch file from storage" },
        { status: 500 }
      );
    }

    const fileBuffer = await response.arrayBuffer();
    
    // Return the file with proper headers
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': doc.fileType || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${doc.fileName}"`,
        'Content-Length': doc.fileSize.toString(),
      },
    });

  } catch (error) {
    console.error('🔥 Error in GET /api/download/[slug]:', error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}