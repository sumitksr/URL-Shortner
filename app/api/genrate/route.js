import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Helper to generate a random 6-character string
function generateRandomShortUrl() {
  return Math.random().toString(36).substring(2, 8);
}

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

  // When shorturl is not provided, generate one and ensure uniqueness
  if (!body.shorturl || body.shorturl.trim() === "") {
    let candidate, exists;
    do {
      candidate = generateRandomShortUrl();
      exists = await collection.findOne({ shorturl: candidate });
    } while (exists);
    body.shorturl = candidate;
  }
  
  // Check if provided shorturl already exists
  const doc = await collection.findOne({ shorturl: body.shorturl });
  if (doc) {
    return NextResponse.json(
      { message: "Short URL already exists", success: false },
      { status: 400 }
    );
  }
  
  await collection.insertOne({
    url: body.url,
    shorturl: body.shorturl,
    createdAt: new Date(),
  });

  return NextResponse.json(
    { message: "finished", success: true, data: { shortUrl: body.shorturl } },
    { status: 200 }
  );
}
