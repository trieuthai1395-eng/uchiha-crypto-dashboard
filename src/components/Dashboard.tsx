"use client";
import { useState, useEffect, useCallback } from "react";
import SharinganEye from "./SharinganEye";
import PriceSection from "./PriceSection";
import TradeSection from "./TradeSection";
import { Prices } from "@/lib/data";

async function fetchCoinPrices(): Promise<Prices | null> {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true"
    );
    if (!res.ok) throw new Error("API lỗi");
    const d = await res.json();
    return {
      btc: { price: d.bitcoin?.usd ?? null, change: d.bitcoin?.usd_24h_change ?? null },
      eth: { price: d.ethereum?.usd ?? null, change: d.ethereum?.usd_24h_change ?? null },
    };
  } catch { return null; }
}

const S = {
  dashboard: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #0a0a0a, #1a1a2e, #0f0f23)",
    position: "relative" as const,
    overflowX: "hidden" as const,
    color: "#00ff9f",
    fontFamily: "'Roboto Mono', monospace",
  },
  header: {
    position: "relative" as const, textAlign: "center" as const,
    padding: "40px 20px 56px",
    borderBottom: "2px solid #ffcc00",
    background: "linear-gradient(180deg, #1a1a2e, transparent)",
  },
  headerTitle: {
    fontSize: "clamp(2rem,6vw,4rem)", fontWeight: 900,
    color: "#ffcc00",
    textShadow: "0 0 30px #ffcc00, 0 0 60px #ff6600",
    letterSpacing: "0.2em",
  },
  headerSub: {
    fontSize: "1rem",
    color: "#00ff9f88",
    letterSpacing: "0.3em",
  },
  mainGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(500px,1fr))",
    gap: "20px", padding: "30px",
    maxWidth: "1600px", margin: "0 auto",
  },
};

export default function Dashboard() {
  const [prices, setPrices] = useState<Prices>({
    btc: { price: null, change: null },
    eth: { price: null, change: null },
  });
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
    const id = setInterval(loadPrices, 30000);
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
      const data = await res.json();
      const text = data.content || "Optimus Prime đang phân tích...";
      setAiContent(p => ({ ...p, [key]: text }));
    } catch {
      setAiContent(p => ({ ...p, [key]: "Lỗi kết nối Autobot." }));
    }
    setAiLoading(p => ({ ...p, [key]: false }));
  }, []);

  return (
    <div style={S.dashboard}>
      <header style={S.header}>
        <h1 style={S.headerTitle}>TRANSFORMER CRYPTO COMMAND</h1>
        <p style={S.headerSub}>OPTIMUS PRIME INTELLIGENCE DASHBOARD</p>
      </header>

      <main style={S.mainGrid}>
        <PriceSection prices={prices} loading={loading} lastUpdate={lastUpdate} />

        <TradeSection 
          prices={prices} 
          onGenerateAI={generateAI} 
          aiContent={aiContent} 
          aiLoading={aiLoading} 
        />
      </main>
    </div>
  );
}
