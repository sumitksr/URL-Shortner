import clientPromise from "@/lib/mongodb";
import { redirect } from "next/navigation";


export default async function Page({ params }) {
  const { url } = params;

  const client = await clientPromise;
  const db = client.db("shortner");
  const collection = db.collection("urls");

  const doc = await collection.findOne({ shorturl: url });

  if (doc && doc.url) {
    redirect(doc.url);
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-black">
      <h1 className="text-2xl">URL not found</h1>
    </div>
  );
}