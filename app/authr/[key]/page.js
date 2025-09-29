import URLList from '@/components/URLList';

export const dynamic = 'force-dynamic';

export default async function Page({ params }) {
  const { key } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/get/${encodeURIComponent(key)}`,
    { cache: 'no-store' }
  );
  const data = res.ok ? await res.json() : [];

  return (
    <div className="min-h-screen bg-black px-6 py-10">
      <div className="max-w-xl mx-auto bg-gray-900 p-8 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Manage Your Shortened URLs & Data
        </h1>
        <URLList initialData={data} apiKey={key} />
      </div>
    </div>
  );
}
