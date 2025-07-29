import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Helper to generate a random 6-character string
function generateRandomShortUrl() {
  return Math.random().toString(36).substring(2, 8);
}

export async function POST(request) {
  const body = await request.json();

  // Must always have a type
  if (!body.type) {
    return NextResponse.json(
      { error: "Type is required (\"url\" or \"data\")" },
      { status: 400 }
    );
  }

  const client = await clientPromise;
  const db = client.db("shortner");
  const collection = db.collection("urls");

  // Generate or validate shorturl
  if (!body.shorturl || body.shorturl.trim() === "") {
    let candidate;
    let exists;
    do {
      candidate = generateRandomShortUrl();
      exists = await collection.findOne({ shorturl: candidate });
    } while (exists);
    body.shorturl = candidate;
  } else {
    // If provided, make sure it’s unique
    const dup = await collection.findOne({ shorturl: body.shorturl });
    if (dup) {
      return NextResponse.json(
        { message: "Short URL already exists", success: false },
        { status: 400 }
      );
    }
  }

  if (body.type === "url") {
    // URL‐shortening logic
    if (!body.url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }
    if (!body.url.includes(".")) {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }
    if (
      !body.url.startsWith("http://") &&
      !body.url.startsWith("https://")
    ) {
      body.url = "http://" + body.url;
    }

    await collection.insertOne({
      type: "url",
      url: body.url,
      shorturl: body.shorturl,
      createdAt: new Date(),
    });

  } else if (body.type === "data") {
    // Data‐saving logic
    if (!body.data) {
      return NextResponse.json(
        { error: "Data payload is required for type `data`" },
        { status: 400 }
      );
    }

    await collection.insertOne({
      type: "data",
      data: body.data,
      shorturl: body.shorturl,
      createdAt: new Date(),
    });

  } else {
    return NextResponse.json(
      { error: `Unknown type "${body.type}"` },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      message: "finished",
      success: true,
      data: { shortUrl: body.shorturl },
    },
    { status: 200 }
  );
}
