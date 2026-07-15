import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  // 1. Claude
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
        max_tokens: 600,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (claude.ok) {
      const data = await claude.json();
      return NextResponse.json({ content: data.content[0].text, source: "Claude" });
    }
  } catch {}

  // 2. Grok
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
        max_tokens: 600,
      }),
    });
    if (grok.ok) {
      const data = await grok.json();
      return NextResponse.json({ content: data.choices[0].message.content, source: "Grok" });
    }
  } catch {}

  // 3. Static fallback
  return NextResponse.json({ content: "Lệnh Scalp BTC: Vào " + Math.round(63000 * 0.998) + " - TP " + Math.round(63000 * 1.015) + " - SL " + Math.round(63000 * 0.991) + ". DYOR." });
}
