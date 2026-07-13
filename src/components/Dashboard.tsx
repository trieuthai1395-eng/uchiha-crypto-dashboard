"use client";
import { useState, useEffect, useCallback } from "react";
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

export default function Dashboard() {
  const [prices, setPrices] = useState<Prices>({
    btc: { price: null, change: null },
    eth: { price: null, change: null },
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState("");
  const [aiContent, setAiContent] = useState<Record<string, string>>({});
  const [aiLoading, setAiLoading] = useState<Record<string, boolean>>({});
  const [tradeLog, setTradeLog] = useState<any[]>([]);

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
      const text = data.content || "Đang phân tích...";
      setAiContent(p => ({ ...p, [key]: text }));
    } catch {
      setAiContent(p => ({ ...p, [key]: "Lỗi kết nối." }));
    }
    setAiLoading(p => ({ ...p, [key]: false }));
  }, []);

  const addToLog = (command: string) => {
    setTradeLog(prev => [...prev, { time: new Date().toLocaleTimeString(), command, status: "OPEN" }]);
  };

  const closeTrade = (index: number) => {
    setTradeLog(prev => prev.map((t, i) => i === index ? { ...t, status: "CLOSED" } : t));
  };

  return (
    <div style={{ background: "#0a0a0a", color: "#00ff9f", minHeight: "100vh", fontFamily: "'Courier New', monospace" }}>
      {/* Header */}
      <div style={{ textAlign: "center", padding: "30px", borderBottom: "2px solid #ffcc00" }}>
        <h1 style={{ fontSize: "2.8rem", color: "#ffcc00", textShadow: "0 0 20px #ffcc00" }}>TRANSFORMER CRYPTO COMMAND</h1>
        <p style={{ color: "#00ff9f", letterSpacing: "4px" }}>OPTIMUS PRIME SYSTEM</p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px", maxWidth: "1600px", margin: "0 auto" }}>
        {/* Giám sát thị trường */}
        <div style={{ flex: 1, minWidth: "400px" }}>
          <PriceSection prices={prices} loading={loading} lastUpdate={lastUpdate} />
        </div>

        {/* Lệnh */}
        <div style={{ flex: 1, minWidth: "400px" }}>
          <TradeSection 
            prices={prices} 
            onGenerateAI={generateAI} 
            aiContent={aiContent} 
            aiLoading={aiLoading} 
          />
        </div>
      </div>

      {/* Nhật ký lệnh */}
      <div style={{ padding: "20px", borderTop: "1px solid #ffcc00", margin: "20px" }}>
        <h2>Nhật Ký Lệnh</h2>
        {tradeLog.map((trade, index) => (
          <div key={index} style={{ background: "#1a1a2e", padding: "10px", margin: "5px 0", borderLeft: "4px solid #ffcc00" }}>
            {trade.time} - {trade.command} <strong>[{trade.status}]</strong>
            {trade.status === "OPEN" && <button onClick={() => closeTrade(index)} style={{ marginLeft: "10px" }}>Chốt Lệnh</button>}
          </div>
        ))}
      </div>
    </div>
  );
}
