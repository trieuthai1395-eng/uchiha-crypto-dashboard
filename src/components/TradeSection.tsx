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
    <section className="card section-full">
      <div className="card-inner">
        <div className="section-title">
          <span>⚔</span> Khuyến Nghị Giao Dịch · Trade Signal
        </div>

        {/* Tabs */}
        <div className="tabs">
          <div className={`tab${activeTab === "scalp" ? " active" : ""}`} onClick={() => setActiveTab("scalp")}>
            🗡 Lệnh Cá Lia Thia (Scalp)
          </div>
          <div className={`tab${activeTab === "swing" ? " active" : ""}`} onClick={() => setActiveTab("swing")}>
            🌙 Lệnh Nuôi Theo Tuần (Swing)
          </div>
        </div>

        {activeTab === "scalp" && (
          <div>
            <div className="trade-card">
              <div className="trade-type scalp">⚡ SCALPING · CÁ LIA THIA</div>
              <div className="trade-row">
                <div className="trade-pair">BTC / USDT</div>
                <div className="trade-dir-long">LONG</div>
              </div>
              <div className="trade-levels">
                <div className="level-box">
                  <span className="level-label">VÀO LỆNH</span>
                  <span className="level-val entry">{Math.round(bp * 0.998)}</span>
                </div>
                <div className="level-box">
                  <span className="level-label">CHỐT LỜI</span>
                  <span className="level-val tp">{Math.round(bp * 1.015)}</span>
                </div>
                <div className="level-box">
                  <span className="level-label">CẮT LỖ</span>
                  <span className="level-val sl">{Math.round(bp * 0.991)}</span>
                </div>
              </div>
              <div className="trade-meta">Đòn bẩy: 3-5x · Khung 1H</div>
            </div>

            <button
              className="ai-btn"
              onClick={() => onGenerateAI("scalp", "Phân tích scalping BTC ETH realtime. Đưa entry TP SL. Tiếng Việt.")}
              disabled={aiLoading.scalp}
            >
              {aiLoading.scalp ? "⏳..." : "👁 Sinh Lệnh Scalp AI"}
            </button>
            {aiContent.scalp && <div className="ai-response">{aiContent.scalp}</div>}
          </div>
        )}

        {activeTab === "swing" && (
          <div>
            <div className="trade-card">
              <div className="trade-type swing">🌙 SWING · NUÔI TUẦN</div>
              <div className="trade-row">
                <div className="trade-pair">BTC / USDT</div>
                <div className="trade-dir-long">LONG</div>
              </div>
              <div className="trade-levels">
                <div className="level-box">
                  <span className="level-label">MUA VÀO</span>
                  <span className="level-val entry">{Math.round(bp * 0.97)}</span>
                </div>
                <div className="level-box">
                  <span className="level-label">MỤC TIÊU</span>
                  <span className="level-val tp">{Math.round(bp * 1.12)}</span>
                </div>
                <div className="level-box">
                  <span className="level-label">DỪNG LỖ</span>
                  <span className="level-val sl">{Math.round(bp * 0.93)}</span>
                </div>
              </div>
              <div className="trade-meta">Giữ 1-3 tuần</div>
            </div>

            <button
              className="ai-btn"
              onClick={() => onGenerateAI("swing", "Phân tích swing trade BTC ETH. Đưa lệnh dài hạn. Tiếng Việt.")}
              disabled={aiLoading.swing}
            >
              {aiLoading.swing ? "⏳..." : "🌙 Sinh Lệnh Swing AI"}
            </button>
            {aiContent.swing && <div className="ai-response">{aiContent.swing}</div>}
          </div>
        )}
      </div>
    </section>
  );
}
