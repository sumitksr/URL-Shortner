import clientPromise from "@/lib/mongodb";
import { redirect } from "next/navigation";
import DataDisplay from "@/components/DataDisplay";

export default async function Page({ params }) {
  const { url } = params;

  const client = await clientPromise;
  const db = client.db("shortner");
  const collection = db.collection("urls");

  const doc = await collection.findOne({ shorturl: url });

  if (!doc) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <h1 className="text-2xl">URL not found</h1>
      </div>
    );
  }

  if (doc.type === "url") {
    redirect(doc.url);
  }

  // If it's not a URL, render our client component with the saved data
  return <DataDisplay data={doc.data} />;
}
