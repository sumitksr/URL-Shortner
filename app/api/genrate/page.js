import clientPromise from "@/lib/mongodb";
export async function POST() {
  const client = await clientPromise;
  const db = client.db("shortner");
  const collection = db.collection("urls");

  return Response.json({ message: "Hello World" });
}
