'use client';

import { useState, useMemo } from 'react';
import { format } from 'date-fns';

export default function URLList({ initialData, apiKey }) {
  const [items, setItems] = useState(initialData);
  const [asc, setAsc] = useState(false);

  const sorted = useMemo(() => {
    return [...items].sort((a, b) => {
      const da = new Date(a.createdAt);
      const db = new Date(b.createdAt);
      return asc ? da - db : db - da;
    });
  }, [items, asc]);

  const deleteItem = async (id) => {
    if (!confirm('Really delete?')) return;
    const res = await fetch(`/api/get/${apiKey}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setItems(items.filter((it) => it._id !== id));
    } else {
      alert('Delete failed');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Your Entries</h2>
        <button
          onClick={() => setAsc(!asc)}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
        >
          {asc ? 'Oldest First' : 'Newest First'}
        </button>
      </div>

      {sorted.map((it) => (
        <div
          key={it._id}
          className="bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition"
        >
          <div className="flex justify-between items-center">
            <a
              href={`/${it.shorturl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-300 hover:text-blue-200"
            >
              {it.shorturl}
            </a>
            <button
              onClick={() => deleteItem(it._id)}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition"
            >
              Delete
            </button>
          </div>
          <div className="mt-4 text-gray-200 break-words">
            {it.type === 'url' ? (
              <a
                href={it.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-300 hover:text-blue-200"
              >
                {it.url}
              </a>
            ) : (
              <pre className="whitespace-pre-wrap">{it.data}</pre>
            )}
          </div>
          <div className="mt-3 text-sm text-gray-400">
            {format(new Date(it.createdAt), 'yyyy-MM-dd HH:mm:ss')}
          </div>
        </div>
      ))}

      {sorted.length === 0 && (
        <p className="text-center text-gray-400">No entries found.</p>
      )}
    </div>
  );
}
