"use client";
import { useState, useEffect, useCallback } from "react";
import SharinganEye from "./SharinganEye";
import PriceSection from "./PriceSection";
import TradeSection from "./TradeSection";
import { Prices, MACRO_DATA, CASHFLOW_DATA, NEWS_DATA, PLANETS } from "@/lib/data";

async function fetchCoinPrices(): Promise<Prices | null> {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true"
    );
    if (!res.ok) throw new Error("API lỗi");
    const d = await res.json();
    return {
      btc: { price: d.bitcoin?.usd ?? null, change: d.bitcoin?.usd_24h_change ?? null },
      eth: { price: d.ethereum?.usd ?? null, change: d.ethereum?.usd_24h_change ?? null },
    };
  } catch { return null; }
}

function CrowIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 30" fill="none">
      <path d="M20 20 C14 18 8 14 5 8 C3 5 4 2 7 3 C9 4 10 6 12 5 C15 4 16 2 20 2 C24 2 25 4 28 5 C30 6 31 4 33 3 C36 2 37 5 35 8 C32 14 26 18 20 20Z" fill="#1a0505" stroke="#8b0000" strokeWidth="0.5" />
      <path d="M20 20 L22 28 L20 26 L18 28 Z" fill="#1a0505" />
      <path d="M14 20 L10 26 L12 24 L11 28 Z" fill="#1a0505" />
      <path d="M26 20 L30 26 L28 24 L29 28 Z" fill="#1a0505" />
      <circle cx="15" cy="8" r="1.5" fill="#cc0000" />
      <circle cx="25" cy="8" r="1.5" fill="#cc0000" />
    </svg>
  );
}

const S = {
  dashboard: { minHeight: "100vh", background: "radial-gradient(ellipse at 20% 0%, #1a000822, transparent 50%), linear-gradient(180deg,#080008,#050005)", position: "relative" as const, overflowX: "hidden" as const },
  header: { position: "relative" as const, textAlign: "center" as const, padding: "40px 20px 56px", borderBottom: "1px solid #cc000033" },
  headerTitle: { fontSize: "clamp(1.5rem,5vw,3.2rem)", fontWeight: 900, color: "#cc0000", textShadow: "0 0 20px #cc0000" },
  mainGrid: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "16px", padding: "24px", maxWidth: "1400px", margin: "0 auto" },
};

export default function Dashboard() {
  const [prices, setPrices] = useState<Prices>({ btc: { price: null, change: null }, eth: { price: null, change: null } });
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
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      const text = data.content || "Phản hồi rỗng từ Sharingan...";
      setAiContent(p => ({ ...p, [key]: text }));
    } catch {
      setAiContent(p => ({ ...p, [key]: "Lỗi kết nối AI." }));
    }
    setAiLoading(p => ({ ...p, [key]: false }));
  }, []);

  return (
    <div style={S.dashboard}>
      {/* Header */}
      <header style={S.header}>
        <h1 style={S.headerTitle}>UCHIHA RESEARCH</h1>
      </header>

      {/* Main Grid */}
      <main style={S.mainGrid}>
        <PriceSection prices={prices} loading={loading} lastUpdate={lastUpdate} />

        {/* Macro */}
        <section className="card">
          <button className="ai-btn" onClick={() => generateAI("macro", "Phân tích macro crypto realtime. Đưa lệnh LONG/SHORT BTC ETH. 150 từ tiếng Việt.")} disabled={aiLoading.macro}>
            {aiLoading.macro ? "⏳..." : "🔥 Phân Tích Macro · AI Vision"}
          </button>
          {aiContent.macro && <div className="ai-response">{aiContent.macro}</div>}
        </section>

        {/* Tin tức */}
        <section className="card">
          <button className="ai-btn" onClick={() => generateAI("news", "Tóm tắt tin nóng crypto realtime. 150 từ tiếng Việt.")} disabled={aiLoading.news}>
            {aiLoading.news ? "⏳..." : "🐦 Tin Nóng · AI Intel"}
          </button>
          {aiContent.news && <div className="ai-response">{aiContent.news}</div>}
        </section>

        {/* Chiêm tinh */}
        <section className="card">
          <button className="ai-btn" onClick={() => generateAI("astro", "Phân tích chiêm tinh crypto realtime. Đưa lệnh. 150 từ tiếng Việt.")} disabled={aiLoading.astro}>
            {aiLoading.astro ? "⏳..." : "👁 Chiêm Tinh · Mangekyō"}
          </button>
          {aiContent.astro && <div className="ai-response">{aiContent.astro}</div>}
        </section>
      </main>
    </div>
  );
}
