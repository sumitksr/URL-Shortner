import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const secret = process.env.API_KEY;
  if (!secret) {
    console.error("API_KEY not set");
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  const incomingKey = params.key;

  if (incomingKey !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db   = client.db("shortner");
    const coll = db.collection("urls");

    const allDocs = await coll.find({}).toArray();
    return NextResponse.json(allDocs, { status: 200 });
  } catch (err) {
    console.error("GET /api/get/[key] error:", err);
    return NextResponse.json({ error: "Could not fetch data" }, { status: 500 });
  }
}
