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
      const text = data.content || "Autobot đang phân tích...";
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
    <div style={{ background: "#0a0a0a", color: "#00ff9f", minHeight: "100vh", fontFamily: "'Courier New', monospace", padding: "20px" }}>
      <div style={{ textAlign: "center", padding: "40px", borderBottom: "3px solid #00ff9f" }}>
        <h1 style={{ fontSize: "3.5rem", color: "#ffcc00", textShadow: "0 0 40px #ffcc00" }}>TRANSFORMER CRYPTO COMMAND</h1>
        <p style={{ color: "#00ff9f" }}>OPTIMUS PRIME SYSTEM ONLINE</p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "30px" }}>
        <div style={{ flex: 1, minWidth: "400px", border: "2px solid #00ff9f", padding: "20px" }}>
          <PriceSection prices={prices} loading={loading} lastUpdate={lastUpdate} />
        </div>

        <div style={{ flex: 1, minWidth: "400px", border: "2px solid #ffcc00", padding: "20px" }}>
          <TradeSection 
            prices={prices} 
            onGenerateAI={generateAI} 
            aiContent={aiContent} 
            aiLoading={aiLoading} 
          />
        </div>
      </div>

      <div style={{ marginTop: "30px", border: "2px solid #ffcc00", padding: "20px" }}>
        <h2 style={{ color: "#ffcc00" }}>NHẬT KÝ LỆNH</h2>
        {tradeLog.length === 0 ? (
          <p>Chưa có lệnh. Sinh lệnh và lưu lại.</p>
        ) : (
          tradeLog.map((trade, index) => (
            <div key={index} style={{ background: "#1a1a2e", padding: "15px", margin: "8px 0", borderLeft: "4px solid #00ff9f" }}>
              {trade.time} - {trade.command} <strong>[{trade.status}]</strong>
              {trade.status === "OPEN" && <button onClick={() => closeTrade(index)} style={{ marginLeft: "15px", color: "#ffcc00" }}>Chốt Lệnh</button>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
