import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  // Claude
  try {
    const claude = await fetch('https://api.anthropic.com/v1/messages', {
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
    if (claude.ok) {
      const data = await claude.json();
      return NextResponse.json({ content: data.content[0].text });
    }
  } catch {}

  // Grok
  try {
    const grok = await fetch('https://api.x.ai/v1/chat/completions', {
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
    if (grok.ok) {
      const data = await grok.json();
      return NextResponse.json({ content: data.choices[0].message.content });
    }
  } catch {}

  // Gemini
  try {
    const gemini = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      }),
    });
    if (gemini.ok) {
      const data = await gemini.json();
      return NextResponse.json({ content: data.candidates[0].content.parts[0].text });
    }
  } catch {}

  return NextResponse.json({ content: "Lỗi tất cả API. Kiểm tra credit." });
}
