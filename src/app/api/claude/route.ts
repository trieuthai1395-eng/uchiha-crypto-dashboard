import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    // Thử Claude trước
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 800,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (claudeResponse.ok) {
      const data = await claudeResponse.json();
      return NextResponse.json({ content: data.content[0].text, source: "Claude" });
    }

    // Fallback Grok (xAI)
    const grokResponse = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROK_API_KEY || ''}`,
      },
      body: JSON.stringify({
        model: "grok-beta",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 800,
      }),
    });

    if (grokResponse.ok) {
      const data = await grokResponse.json();
      return NextResponse.json({ content: data.choices[0].message.content, source: "Grok" });
    }

    return NextResponse.json({ content: "Cả Claude và Grok đều lỗi. Kiểm tra credit." });
  } catch (error) {
    return NextResponse.json({ content: "Lỗi kết nối AI." });
  }
}
