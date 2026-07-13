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
    <div style={{ border: "2px solid #ffcc00", padding: "15px", background: "#1a1a2e" }}>
      <div style={{ fontSize: "1.1rem", color: "#ffcc00", marginBottom: "15px" }}>KHẨN NGHỊ GIAO DỊCH · TRADE SIGNAL</div>

      {/* Tabs */}
      <div style={{ display: "flex", marginBottom: "15px", borderBottom: "1px solid #ffcc00" }}>
        <div 
          onClick={() => setActiveTab("scalp")} 
          style={{ padding: "10px 20px", cursor: "pointer", borderBottom: activeTab === "scalp" ? "3px solid #00ff9f" : "3px solid transparent", color: activeTab === "scalp" ? "#00ff9f" : "#888" }}
        >
          ⚡ LỆNH CÁ LIA THIA (Scalp)
        </div>
        <div 
          onClick={() => setActiveTab("swing")} 
          style={{ padding: "10px 20px", cursor: "pointer", borderBottom: activeTab === "swing" ? "3px solid #00ff9f" : "3px solid transparent", color: activeTab === "swing" ? "#00ff9f" : "#888" }}
        >
          🌙 LỆNH NUÔI TUẦN (Swing)
        </div>
      </div>

      {/* Scalp */}
      {activeTab === "scalp" && (
        <div>
          <div style={{ color: "#ffcc00", marginBottom: "10px" }}>BTC / USDT - LONG</div>
          <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
            <div>VÀO LỆNH: <span style={{ color: "#ff8800" }}>{Math.round(bp * 0.998)}</span></div>
            <div>CHỐT LỜI: <span style={{ color: "#00ff9f" }}>{Math.round(bp * 1.015)}</span></div>
            <div>CẮT LỖ: <span style={{ color: "#cc0000" }}>{Math.round(bp * 0.991)}</span></div>
          </div>
          <button 
            onClick={() => onGenerateAI("scalp", "Sinh lệnh scalping BTC ETH realtime. Entry TP SL. Tiếng Việt.")}
            disabled={aiLoading.scalp}
            style={{ background: "#00ff9f", color: "#000", padding: "10px 20px", border: "none", cursor: "pointer" }}
          >
            Sinh Lệnh Scalp AI
          </button>
          {aiContent.scalp && <div style={{ marginTop: "15px", color: "#c8a882" }}>{aiContent.scalp}</div>}
        </div>
      )}

      {/* Swing */}
      {activeTab === "swing" && (
        <div>
          <div style={{ color: "#ffcc00", marginBottom: "10px" }}>BTC / USDT - LONG</div>
          <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
            <div>MUA VÀO: <span style={{ color: "#ff8800" }}>{Math.round(bp * 0.97)}</span></div>
            <div>MỤC TIÊU: <span style={{ color: "#00ff9f" }}>{Math.round(bp * 1.12)}</span></div>
            <div>DỪNG LỖ: <span style={{ color: "#cc0000" }}>{Math.round(bp * 0.93)}</span></div>
          </div>
          <button 
            onClick={() => onGenerateAI("swing", "Sinh lệnh swing BTC ETH. Tiếng Việt.")}
            disabled={aiLoading.swing}
            style={{ background: "#00ff9f", color: "#000", padding: "10px 20px", border: "none", cursor: "pointer" }}
          >
            Sinh Lệnh Swing AI
          </button>
          {aiContent.swing && <div style={{ marginTop: "15px", color: "#c8a882" }}>{aiContent.swing}</div>}
        </div>
      )}
    </div>
  );
}
