import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  const { key } = await params;
  const secret = process.env.API_KEY;
  if (!secret)
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 }
    );
  if (key !== secret)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const client = await clientPromise;
    const coll = client.db("shortner").collection("urls");
    const all = await coll.find({}).toArray();
    return NextResponse.json(all, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Could not fetch data" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { key } = await params;
  const secret = process.env.API_KEY;
  if (!secret)
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 }
    );
  if (key !== secret)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  try {
    const client = await clientPromise;
    const coll = client.db("shortner").collection("urls");
    const res = await coll.deleteOne({ _id: new ObjectId(id) });
    if (res.deletedCount === 0)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Could not delete" }, { status: 500 });
  }
}
