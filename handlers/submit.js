export async function handleSubmit(originalUrl, customShortUrl, type) {
  // Build the payload exactly how the API expects it
  const payload = {
    type,                    // "url" or "data"
    shorturl: customShortUrl || "",
  };

  if (type === "url") {
    payload.url = originalUrl;
  } else {
    payload.data = originalUrl;
  }

  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = await res.json();
  console.log("Response data:", json);
  return json;
}
