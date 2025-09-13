// src/app/api/telegram-proxi/route.js
export async function POST(request) {
  try {
    const body = await request.json();

    const telegramResponse = await fetch(
      "https://api.telegram.org/bot7933033563:AAGeVEYEzAQ6NUuVYkxNsXgANSi0xvRN4sg/sendMessage",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.text();
      console.error("Telegram API error:", errorData);
      return new Response(JSON.stringify({ error: "Telegram API error" }), {
        status: telegramResponse.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await telegramResponse.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
