import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Không có prompt" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Chưa có API Key Claude" }, { status: 500 });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1000,
        temperature: 0.7,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Claude API Error:", data);
      return NextResponse.json({ error: data.error?.message || "Lỗi Claude API" }, { status: response.status });
    }

    return NextResponse.json({ 
      content: data.content?.[0]?.text || "Không có phản hồi từ AI" 
    });

  } catch (error: any) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Lỗi server: " + error.message }, { status: 500 });
  }
}
