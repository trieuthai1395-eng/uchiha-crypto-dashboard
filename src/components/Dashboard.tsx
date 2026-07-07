"use client";
import { useState, useEffect, useCallback } from "react";
import SharinganEye from "./SharinganEye";
import PriceSection from "./PriceSection";
import TradeSection from "./TradeSection";
import { Prices, MACRO_DATA, CASHFLOW_DATA, NEWS_DATA, PLANETS } from "@/lib/data";

async function fetchCoinPrices(): Promise<Prices | null> {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true&include_market_cap=true"
    );
    if (!res.ok) throw new Error("API lỗi");
    const d = await res.json();
    return {
      btc: { price: d.bitcoin?.usd ?? null, change: d.bitcoin?.usd_24h_change ?? null, mcap: d.bitcoin?.usd_market_cap ?? null },
      eth: { price: d.ethereum?.usd ?? null, change: d.ethereum?.usd_24h_change ?? null, mcap: d.ethereum?.usd_market_cap ?? null },
    };
  } catch { return null; }
}

function CrowIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 30" fill="none">
      <path d="M20 20 C14 18 8 14 5 8 C3 5 4 2 7 3 C9 4 10 6 12 5 C15 4 16 2 20 2 C24 2 25 4 28 5 C30 6 31 4 33 3 C36 2 37 5 35 8 C32 14 26 18 20 20Z"
        fill="#1a0505" stroke="#8b0000" strokeWidth="0.5" />
      <path d="M20 20 L22 28 L20 26 L18 28 Z" fill="#1a0505" />
      <path d="M14 20 L10 26 L12 24 L11 28 Z" fill="#1a0505" />
      <path d="M26 20 L30 26 L28 24 L29 28 Z" fill="#1a0505" />
      <circle cx="15" cy="8" r="1.5" fill="#cc0000" />
      <circle cx="25" cy="8" r="1.5" fill="#cc0000" />
    </svg>
  );
}

const S = { /* Giữ nguyên styles cũ, tao bỏ bớt để ngắn */ };

export default function Dashboard() {
  const [prices, setPrices] = useState<Prices>({ btc: { price: null, change: null, mcap: null }, eth: { price: null, change: null, mcap: null } });
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState("");
  const [aiContent, setAiContent] = useState<Record<string, string>>({});
  const [aiLoading, setAiLoading] = useState<Record<string, boolean>>({});

  const loadPrices = useCallback(async () => {
    setLoading(true);
    const data = await fetchCoinPrices();
    if (data) setPrices(data);
    setLastUpdate(new Date().toLocaleTimeString("vi-VN"));
    setLoading(false);
  }, []);

  useEffect(() => {
    loadPrices();
    const id = setInterval(loadPrices, 60000);
    return () => clearInterval(id);
  }, [loadPrices]);

  const generateAI = useCallback(async (key: string, prompt: string) => {
    setAiLoading(p => ({ ...p, [key]: true }));
    try {
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      const text = data.content || "Phản hồi rỗng từ Sharingan...";
      setAiContent(p => ({ ...p, [key]: text }));
    } catch (err) {
      console.error(err);
      setAiContent(p => ({ ...p, [key]: "Lỗi kết nối AI. Kiểm tra ANTHROPIC_API_KEY." }));
    }
    setAiLoading(p => ({ ...p, [key]: false }));
  }, []);

  return (
    // Giữ nguyên phần JSX cũ của mày, chỉ thay đổi các onClick prompt cho ngắn và mạnh hơn
    // Ví dụ cho Macro:
    <button className="ai-btn" onClick={() => generateAI("macro", "Phân tích macro crypto realtime. Đưa lệnh LONG/SHORT BTC ETH. 150 từ tiếng Việt.")} disabled={aiLoading.macro}>
      {aiLoading.macro ? "⏳..." : "🔥 Phân Tích Macro · AI Vision"}
    </button>
    // Tương tự cho các button khác
  );
}
