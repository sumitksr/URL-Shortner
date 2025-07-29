import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  
  if (!body || !body.url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }
  
  // Check if URL contains a dot
  if (!body.url.includes(".")) {
    return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
  }
  
  // Prepend http:// if protocol is missing
  if (!body.url.startsWith("http://") && !body.url.startsWith("https://")) {
    body.url = "http://" + body.url;
  }
  
  const client = await clientPromise;
  const db = client.db("shortner");
  const collection = db.collection("urls");

  const doc = await collection.findOne({ shorturl: body.shorturl });
  if (doc) {
    return NextResponse.json(
      { message: "Short URL already exists", success: false },
      { status: 400 }
    );
  }
  
  const result = await collection.insertOne({
    url: body.url,
    shorturl: body.shorturl,
    createdAt: new Date(),
  });

  return NextResponse.json(
    { message: "finished", success: true, data: result },
    { status: 200 }
  );
}
