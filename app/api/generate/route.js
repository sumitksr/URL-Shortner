import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Generate a random 6-character alphanumeric slug
function generateRandomSlug() {
  return Math.random().toString(36).substring(2, 8);
}

export async function POST(request) {
  const { type, url, data, shorturl: providedSlug } = await request.json();

  // 1️⃣ type is mandatory
  if (type !== "url" && type !== "data") {
    return NextResponse.json(
      { error: 'Type is required ("url" or "data")' },
      { status: 400 }
    );
  }

  // 2️⃣ Validate based on type
  if (type === "url") {
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }
    if (!url.includes(".")) {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }
  } else { // data
    if (!data) {
      return NextResponse.json(
        { error: "Data payload is required for type `data`" },
        { status: 400 }
      );
    }
  }

  // 3️⃣ Connect to MongoDB
  const client = await clientPromise;
  const db = client.db("shortner");
  const collection = db.collection("urls");

  // 4️⃣ Generate or verify uniqueness of slug
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

  // 5️⃣ Build the document
  const doc = {
    type,
    shorturl: slug,
    createdAt: new Date(),
  };

  if (type === "url") {
    // Prepend protocol if missing
    const normalizedUrl =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `http://${url}`;
    doc.url = normalizedUrl;
  } else {
    doc.data = data;
  }

  // 6️⃣ Insert and respond
  await collection.insertOne(doc);

  return NextResponse.json(
    {
      message: "finished",
      success: true,
      data: { shortUrl: slug },
    },
    { status: 200 }
  );
}
