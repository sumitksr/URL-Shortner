export const runtime = "nodejs"; 

import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

function generateRandomSlug() {
  return Math.random().toString(36).substring(2, 8);
}

export async function POST(request) {
  try {
    const { type, url, data, shorturl: providedSlug } = await request.json();

    // Validations (same as before)…

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

    const doc = {
      type,
      shorturl: slug,
      createdAt: new Date(),
    };

    if (type === "url") {
      doc.url = url.startsWith("http") ? url : `http://${url}`;
    } else {
      doc.data = data;
    }

    await collection.insertOne(doc);

    return NextResponse.json({
      message: "finished",
      success: true,
      data: { shortUrl: slug },
    });
  } catch (err) {
    console.error("🔥 Error in POST /api/generate:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
