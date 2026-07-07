"use client";
import { useState, useEffect, useCallback } from "react";
import PriceSection from "./PriceSection";
import { Prices } from "@/lib/data";

async function fetchCoinPrices(): Promise<Prices | null> {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true");
    if (!res.ok) throw new Error("API lỗi");
    const d = await res.json();
    return {
      btc: { price: d.bitcoin?.usd ?? null, change: d.bitcoin?.usd_24h_change ?? null },
      eth: { price: d.ethereum?.usd ?? null, change: d.ethereum?.usd_24h_change ?? null },
    };
  } catch { return null; }
}

export default function Dashboard() {
  const [prices, setPrices] = useState({ btc: { price: null, change: null }, eth: { price: null, change: null } });
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState("");
  const [aiCommand, setAiCommand] = useState("");
  const [tradeLog, setTradeLog] = useState<any[]>([]);
  const [aiLoading, setAiLoading] = useState(false);

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

  const generateCommand = useCallback(async () => {
    setAiLoading(true);
    try {
      const prompt = `Giá BTC ${prices.btc.price}, ETH ${prices.eth.price}. Phân tích ngắn và đưa ra lệnh LONG/SHORT scalping + swing cho BTC ETH. Đưa entry, TP, SL cụ thể.`;
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const command = data.content || "Không sinh được lệnh.";
      setAiCommand(command);
    } catch {
      setAiCommand("Lỗi sinh lệnh.");
    }
    setAiLoading(false);
  }, [prices]);

  const addToLog = () => {
    if (aiCommand) {
      setTradeLog(prev => [...prev, { time: new Date().toLocaleTimeString(), command: aiCommand, status: "OPEN" }]);
    }
  };

  const closeTrade = (index: number) => {
    setTradeLog(prev => prev.map((trade, i) => i === index ? { ...trade, status: "CLOSED" } : trade));
  };

  return (
    <div style={{ padding: "20px", background: "#000", color: "#fff", minHeight: "100vh" }}>
      <h1>ITACHI TRADING DASHBOARD</h1>
      <PriceSection prices={prices} loading={loading} lastUpdate={lastUpdate} />

      <button onClick={generateCommand} disabled={aiLoading} style={{ padding: "10px 20px", margin: "10px 0" }}>
        {aiLoading ? "Đang sinh lệnh..." : "Sinh Lệnh Động"}
      </button>

      {aiCommand && (
        <div style={{ background: "#1a0000", padding: "15px", margin: "10px 0" }}>
          <strong>Lệnh AI:</strong><br />{aiCommand}
          <button onClick={addToLog} style={{ marginLeft: "10px" }}>Thêm vào Nhật Ký</button>
        </div>
      )}

      <h2>Nhật Ký Lệnh</h2>
      {tradeLog.map((trade, index) => (
        <div key={index} style={{ background: "#111", padding: "10px", margin: "5px 0" }}>
          {trade.time} - {trade.command} <strong>[{trade.status}]</strong>
          {trade.status === "OPEN" && <button onClick={() => closeTrade(index)}>Chốt Lệnh</button>}
        </div>
      ))}
    </div>
  );
}
