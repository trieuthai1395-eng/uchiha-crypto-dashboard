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
    background: "radial-gradient(ellipse at 20% 0%, #1a000822, transparent 50%), linear-gradient(180deg,#080008,#050005)",
    position: "relative" as const,
    overflowX: "hidden" as const,
  },
  header: {
    position: "relative" as const, textAlign: "center" as const,
    padding: "40px 20px 56px",
    borderBottom: "1px solid #cc000033",
  },
  headerTitle: {
    fontSize: "clamp(1.5rem,5vw,3.2rem)", fontWeight: 900,
    color: "#cc0000",
    textShadow: "0 0 20px #cc0000",
  },
  mainGrid: {
    display: "grid", gridTemplateColumns: "repeat(2,1fr)",
    gap: "16px", padding: "24px",
    maxWidth: "1400px", margin: "0 auto",
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
      const data = await res.json();
      const text = data.content || "Phản hồi rỗng...";
      setAiContent(p => ({ ...p, [key]: text }));
    } catch {
      setAiContent(p => ({ ...p, [key]: "Lỗi kết nối AI." }));
    }
    setAiLoading(p => ({ ...p, [key]: false }));
  }, []);

  return (
    <div style={S.dashboard}>
      <header style={S.header}>
        <h1 style={S.headerTitle}>UCHIHA RESEARCH</h1>
        <p>Crypto Intelligence Dashboard</p>
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
