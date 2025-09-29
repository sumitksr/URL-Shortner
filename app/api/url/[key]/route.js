import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { key } = await params;
    
    const client = await clientPromise;
    const collection = client.db("shortner").collection("urls");
    
    const doc = await collection.findOne({ shorturl: key });
    
    if (!doc) {
      return NextResponse.json(
        { error: "URL not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(doc, { status: 200 });
  } catch (error) {
    console.error('🔥 Error in GET /api/url/[key]:', error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
