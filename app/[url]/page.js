import clientPromise from "@/lib/mongodb";
import { redirect } from "next/navigation";
import DataDisplay from "@/components/DataDisplay";
import FileDisplay from "@/components/FileDisplay";

export default async function Page({ params }) {
  const { url } = await params;

  const client = await clientPromise;
  const db = client.db("shortner");
  const collection = db.collection("urls");

  const doc = await collection.findOne({ shorturl: url });

  if (!doc) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <h1 className="text-2xl">URL not found</h1>
      </div>
    );
  }

  if (doc.type === "url") {
    redirect(doc.url);
  }

  if (doc.type === "file") {
    // Convert MongoDB document to plain object for client component
    const fileData = {
      fileName: doc.fileName,
      fileSize: doc.fileSize,
      fileType: doc.fileType,
      cloudinaryUrl: doc.cloudinaryUrl,
      shortUrl: doc.shorturl,
      createdAt: doc.createdAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    };
    return <FileDisplay fileData={fileData} />;
  }

  return <DataDisplay data={doc.data} />;
}
