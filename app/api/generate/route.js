import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

function generateRandomSlug() {
  return Math.random().toString(36).substring(2, 8);
}

export async function POST(request) {
  try {
    const { type, url, data, shorturl: providedSlug } = await request.json();

    if (type !== "url" && type !== "data") {
      return NextResponse.json(
        { error: 'Type is required ("url" or "data")' },
        { status: 400 }
      );
    }

    // Validate payload
    if (type === "url") {
      if (!url || !url.includes(".")) {
        return NextResponse.json(
          { error: "A valid URL is required" },
          { status: 400 }
        );
      }
    } else {
      if (!data) {
        return NextResponse.json(
          { error: "Data payload is required for type `data`" },
          { status: 400 }
        );
      }
    }

    // Connect & choose collection
    const client = await clientPromise;
    const db = client.db("shortner");
    const collection = db.collection("urls");

    // Generate or check slug uniqueness
    let slug = providedSlug?.trim();
    if (!slug) {
      do {
        slug = generateRandomSlug();
      } while (await collection.findOne({ shorturl: slug }));
    } else {
      if (await collection.findOne({ shorturl: slug })) {
        return NextResponse.json(
          { error: "Short URL already exists" },
          { status: 400 }
        );
      }
    }

    // Build document
    const doc = {
      type,
      shorturl: slug,
      createdAt: new Date(),
    };

    if (type === "url") {
      doc.url = url.startsWith("http")
        ? url
        : `http://${url}`;
    } else {
      doc.data = data;
    }

    await collection.insertOne(doc);

    return NextResponse.json(
      { message: "finished", success: true, data: { shortUrl: slug } },
      { status: 200 }
    );
  } catch (err) {
    console.error("🔥 [generate] error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
