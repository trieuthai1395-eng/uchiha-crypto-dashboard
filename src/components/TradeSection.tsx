"use client";
import { useState } from "react";
import { Prices } from "@/lib/data";

interface TradeSectionProps {
  prices: Prices;
  onGenerateAI: (key: string, prompt: string) => void;
  aiContent: Record<string, string>;
  aiLoading: Record<string, boolean>;
}

export default function TradeSection({ prices, onGenerateAI, aiContent, aiLoading }: TradeSectionProps) {
  const [activeTab, setActiveTab] = useState<"scalp" | "swing">("scalp");
  const bp = prices.btc.price || 76000;
  const ep = prices.eth.price || 2620;

  return (
    <div style={{ border: "2px solid #ffcc00", padding: "20px", background: "#1a1a2e" }}>
      <div style={{ fontSize: "1.2rem", color: "#ffcc00", marginBottom: "15px" }}>KHẨN NGHỊ GIAO DỊCH · TRADE SIGNAL</div>

      <div style={{ display: "flex", marginBottom: "15px" }}>
        <div onClick={() => setActiveTab("scalp")} style={{ padding: "10px", cursor: "pointer", color: activeTab === "scalp" ? "#00ff9f" : "#888", borderBottom: activeTab === "scalp" ? "3px solid #00ff9f" : "none" }}>
          ⚡ LỆNH CÁ LIA THIA
        </div>
        <div onClick={() => setActiveTab("swing")} style={{ padding: "10px", cursor: "pointer", color: activeTab === "swing" ? "#00ff9f" : "#888", borderBottom: activeTab === "swing" ? "3px solid #00ff9f" : "none" }}>
          🌙 LỆNH NUÔI TUẦN
        </div>
      </div>

      {activeTab === "scalp" && (
        <div>
          <div>BTC / USDT - LONG</div>
          <div style={{ display: "flex", gap: "30px", margin: "15px 0" }}>
            <div>VÀO LỆNH: <span style={{ color: "#ff8800" }}>{Math.round(bp * 0.998)}</span></div>
            <div>CHỐT LỜI: <span style={{ color: "#00ff9f" }}>{Math.round(bp * 1.015)}</span></div>
            <div>CẮT LỖ: <span style={{ color: "#cc0000" }}>{Math.round(bp * 0.991)}</span></div>
          </div>
          <button 
            onClick={() => onGenerateAI("scalp", "Sinh lệnh scalping BTC ETH realtime. Entry TP SL.")}
            disabled={aiLoading.scalp}
            style={{ background: "#00ff9f", color: "#000", padding: "12px 24px", border: "none", cursor: "pointer", fontWeight: "bold" }}
          >
            Sinh Lệnh Scalp AI
          </button>
          <button onClick={() => addToLog("Lệnh Scalp BTC")} style={{ marginLeft: "10px", background: "#ffcc00", color: "#000", padding: "12px 24px", border: "none", cursor: "pointer" }}>
            Lưu Lệnh
          </button>
          {aiContent.scalp && <div style={{ marginTop: "15px", color: "#c8a882" }}>{aiContent.scalp}</div>}
        </div>
      )}

      {activeTab === "swing" && (
        <div>
          <div>BTC / USDT - LONG</div>
          <div style={{ display: "flex", gap: "30px", margin: "15px 0" }}>
            <div>MUA VÀO: <span style={{ color: "#ff8800" }}>{Math.round(bp * 0.97)}</span></div>
            <div>MỤC TIÊU: <span style={{ color: "#00ff9f" }}>{Math.round(bp * 1.12)}</span></div>
            <div>DỪNG LỖ: <span style={{ color: "#cc0000" }}>{Math.round(bp * 0.93)}</span></div>
          </div>
          <button 
            onClick={() => onGenerateAI("swing", "Sinh lệnh swing BTC ETH.")}
            disabled={aiLoading.swing}
            style={{ background: "#00ff9f", color: "#000", padding: "12px 24px", border: "none", cursor: "pointer", fontWeight: "bold" }}
          >
            Sinh Lệnh Swing AI
          </button>
          <button onClick={() => addToLog("Lệnh Swing BTC")} style={{ marginLeft: "10px", background: "#ffcc00", color: "#000", padding: "12px 24px", border: "none", cursor: "pointer" }}>
            Lưu Lệnh
          </button>
          {aiContent.swing && <div style={{ marginTop: "15px", color: "#c8a882" }}>{aiContent.swing}</div>}
        </div>
      )}
    </div>
  );
}
