export async function handleSubmit(e, originalUrl, customShortUrl) {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/genrate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: originalUrl,
        shorturl: customShortUrl,
      }),
    });
    
    const data = await response.json();
    console.log("Response data:", data);
    return data;
  } catch (error) {
    console.error("Error submitting URL:", error);
    throw error;
  }
}