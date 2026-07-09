"use client";

import { useState, useEffect, useCallback } from "react";
import SharinganEye from "./SharinganEye";
import PriceSection from "./PriceSection";
import TradeSection from "./TradeSection";
import { Prices } from "@/lib/data";

// ── Fetch giá CoinGecko ─────────────────────────────────────────────────────────
async function fetchCoinPrices(): Promise<Prices | null> {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true&include_market_cap=true"
    );
    if (!res.ok) throw new Error("API lỗi");
    const d = await res.json();
    return {
  btc: { price: d.bitcoin?.usd ?? null, change: d.bitcoin?.usd_24h_change ?? null },
  eth: { price: d.ethereum?.usd ?? null, change: d.ethereum?.usd_24h_change ?? null },
};
  } catch { return null; }
}

// ── Crow icon ───────────────────────────────────────────────────────────────────
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

// ── Styles inline (layout-level) ────────────────────────────────────────────────
const S = {
  dashboard: {
    minHeight: "100vh",
    background: "radial-gradient(ellipse at 20% 0%, #1a000822, transparent 50%), radial-gradient(ellipse at 80% 0%, #0d000522, transparent 50%), linear-gradient(180deg,#080008,#050005 30%,#000)",
    position: "relative" as const,
    overflowX: "hidden" as const,
  },
  scanline: {
    position: "fixed" as const, top: 0, left: 0, width: "100%", height: "3px",
    background: "linear-gradient(transparent,#cc000011,transparent)",
    animation: "scan 8s linear infinite",
    pointerEvents: "none" as const, zIndex: 9999,
  },
  noise: {
    position: "fixed" as const, inset: 0, pointerEvents: "none" as const,
    zIndex: 9998, opacity: 0.12,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
  },
  emberField: { position: "fixed" as const, inset: 0, pointerEvents: "none" as const, zIndex: 1, overflow: "hidden" },
  ember: (i: number) => ({
    position: "absolute" as const, bottom: 0,
    left: `${5 + i * 7}%`,
    width: "2px", height: "2px", borderRadius: "50%",
    background: "#ff6600", boxShadow: "0 0 4px #ff4400",
    animation: `ember-rise ${5 + (i % 3)}s linear infinite`,
    animationDelay: `${i * 0.45}s`,
    opacity: 0.7,
  }),
  header: {
    position: "relative" as const, textAlign: "center" as const,
    padding: "40px 20px 56px",
    borderBottom: "1px solid #cc000033",
    background: "linear-gradient(180deg,#0d0005,transparent)",
    overflow: "hidden",
  },
  headerTitle: {
    fontFamily: "'Cinzel Decorative', cursive",
    fontSize: "clamp(1.5rem,5vw,3.2rem)", fontWeight: 900,
    color: "#cc0000",
    textShadow: "0 0 20px #cc0000, 0 0 40px #8b000066, 0 0 80px #4a000033",
    letterSpacing: "0.15em",
    animation: "sharingan-pulse 3s ease-in-out infinite",
  },
  headerSub: {
    fontFamily: "'Cinzel', serif", fontSize: "0.72rem",
    color: "#c8a88277", letterSpacing: "0.4em",
    marginTop: "6px", textTransform: "uppercase" as const,
  },
  eyeRow: { display: "flex", alignItems: "center", justifyContent: "center", gap: "28px", marginBottom: "14px" },
  eyeBlink: (delay = 0) => ({ animation: `blink-eye 5s ${delay}s ease-in-out infinite` }),
  crowRow: { display: "flex", justifyContent: "center", gap: "18px", marginBottom: "14px", opacity: 0.6 },
  crowFloat: (i: number) => ({ animation: `drift 4s ${i}s ease-in-out infinite` }),
  tagRow: { display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap" as const, marginTop: "10px" },
  fireRow: {
    position: "absolute" as const, bottom: 0, left: 0, right: 0,
    height: "52px", display: "flex", alignItems: "flex-end",
    justifyContent: "space-around", overflow: "hidden", pointerEvents: "none" as const,
  },
  flame: (i: number) => ({
    width: "8px", height: "30px",
    background: "linear-gradient(to top,#ff4400,#ff8800aa,transparent)",
    borderRadius: "50% 50% 0 0",
    animation: `flicker ${0.8 + i * 0.1}s ${i * 0.12}s ease-in-out infinite alternate`,
    filter: "blur(2px)", opacity: 0.7,
  }),
  mainGrid: {
    display: "grid", gridTemplateColumns: "repeat(2,1fr)",
    gap: "16px", padding: "24px",
    maxWidth: "1400px", margin: "0 auto",
  },
  footer: {
    textAlign: "center" as const, padding: "40px 20px",
    borderTop: "1px solid #cc000022",
    fontFamily: "'Cinzel',serif", fontSize: "0.62rem",
    color: "#c8a88233", letterSpacing: "0.3em",
  },
};

// ── Main Dashboard ──────────────────────────────────────────────────────────────
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
    if (data) {
      setPrices(data);
    } 
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
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || "Phản hồi rỗng từ Sharingan...";
      setAiContent(p => ({ ...p, [key]: text }));
    } catch {
      setAiContent(p => ({ ...p, [key]: "Chakra kết nối thất bại. Kiểm tra ANTHROPIC_API_KEY trong Vercel Environment Variables." }));
    }
    setAiLoading(p => ({ ...p, [key]: false }));
  }, []);

  return (
    <>
      {/* Ambient FX */}
      <div style={S.emberField}>
        {[...Array(13)].map((_, i) => <div key={i} style={S.ember(i)} />)}
      </div>
      <div style={S.scanline} />
      <div style={S.noise} />

      <div style={S.dashboard}>

        {/* ════ HEADER ════ */}
        <header style={S.header}>
          <div style={S.crowRow}>
            {[0,1,2].map(i => (
              <div key={i} style={S.crowFloat(i)}><CrowIcon size={18} /></div>
            ))}
          </div>

          <div style={S.eyeRow}>
            <div style={S.eyeBlink(0)}><SharinganEye size={54} spinning /></div>
            <div>
              <h1 style={S.headerTitle}>UCHIHA RESEARCH</h1>
              <p style={S.headerSub}>Crypto Intelligence Dashboard · Những đôi mắt thấu hiểu tất cả</p>
            </div>
            <div style={S.eyeBlink(2.5)}><SharinganEye size={54} spinning /></div>
          </div>

          <div style={S.tagRow}>
            <span className="tag tag-red">PHÂN TÍCH CHUYÊN SÂU</span>
            <span className="tag tag-ember">REAL-TIME DATA</span>
            <span className="tag tag-gold">CHIÊM TINH HỌC</span>
            <span className="tag tag-mist">TIẾNG VIỆT 100%</span>
          </div>

          {/* Fire effect */}
          <div style={S.fireRow}>
            {[...Array(10)].map((_, i) => <div key={i} style={S.flame(i)} />)}
          </div>
        </header>

        {/* ════ MAIN GRID ════ */}
        <main style={S.mainGrid}>

          {/* ── 1. Giá Coins ── */}
          <PriceSection prices={prices} loading={loading} lastUpdate={lastUpdate} />

          {/* ── 2. Dòng Tiền ── */}
          <section className="card" style={{ gridColumn: "1 / -1" }}>
            <div className="card-inner">
              <div className="section-title">
                <CrowIcon size={14} /> Phân Tích Dòng Tiền · Capital Flow
              </div>
              {CASHFLOW_DATA.map((item, i) => (
                <div key={i}>
                  <div className="bar-label">
                    {item.label}
                    <span style={{ float: "right", color: item.color, fontWeight: 700 }}>{item.pct}%</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{
                      width: `${item.pct}%`,
                      background: `linear-gradient(90deg,${item.color}55,${item.color})`,
                    }} />
                  </div>
                </div>
              ))}
              <div className="analysis-block" style={{ marginTop: "10px" }}>
                <div className="analysis-label">Nhận Định Tổng Thể — Mắt Sharingan</div>
                <p className="analysis-text">
                  Dòng tiền tổ chức chảy mạnh vào BTC qua ETF (78% bullish). Stablecoin supply tăng 65% — tiền mặt đang nằm chờ
                  cơ hội triển khai. Thị trường VN-Index có tương quan nghịch chiều: khi VN-Index điều chỉnh, một phần vốn thông
                  minh dịch chuyển sang crypto. Smart Money đang tích lũy âm thầm ở mức 85% cường độ — tín hiệu không thể bỏ qua.
                </p>
                <div className="tag-row">
                  <span className="tag tag-ember">BULLISH TỔNG THỂ</span>
                  <span className="tag tag-gold">TÍCH LŨY DÀI HẠN</span>
                  <span className="tag tag-red">CẢNH BÁO FOMO</span>
                  <span className="tag tag-mist">DCA THEO THÁNG</span>
                </div>
              </div>
              <button className="ai-btn"
                onClick={() => generateAI("cashflow",
                  "Phân tích dòng tiền crypto hiện tại bằng tiếng Việt. Tập trung: BTC ETF inflow xu hướng, stablecoin supply on-chain, tương quan VN-Index với BTC, smart money indicator. Dùng ngôn ngữ huyền bí mạnh mẽ như Itachi Uchiha — lạnh lùng, chính xác, đáng sợ. 180-220 từ."
                )} disabled={aiLoading.cashflow}>
                {aiLoading.cashflow ? "⏳ Triệu hồi Sharingan..." : "⚔ Phân Tích Dòng Tiền · AI Vision"}
              </button>
              {aiContent.cashflow && <div className="ai-response">{aiContent.cashflow}</div>}
            </div>
          </section>

          {/* ── 3. Macro & Địa Chính Trị ── */}
          <section className="card">
            <div className="card-inner">
              <div className="section-title">🌐 Macro & Địa Chính Trị</div>
              <div className="macro-grid">
                {MACRO_DATA.map((item, i) => (
                  <div key={i} className="macro-item">
                    <div className="macro-topic">{item.topic}</div>
                    <p className="macro-text">{item.text}</p>
                  </div>
                ))}
              </div>
              <button className="ai-btn"
                onClick={() => generateAI("macro",
                  "Phân tích tác động của các yếu tố vĩ mô lên crypto bằng tiếng Việt: chính sách Trump (thuế quan, Bitcoin reserve), hành động Musk (DOGE, Tesla), FED lãi suất, SEC regulation, căng thẳng địa chính trị Nga-Ukraine-Trung Đông. Phong cách Itachi: lạnh lùng, nhìn thấu bản chất, 180-220 từ."
                )} disabled={aiLoading.macro}>
                {aiLoading.macro ? "⏳ Triệu hồi Amaterasu..." : "🔥 Phân Tích Macro · AI Vision"}
              </button>
              {aiContent.macro && <div className="ai-response">{aiContent.macro}</div>}
            </div>
          </section>

          {/* ── 4. Tin Tức Crypto ── */}
          <section className="card">
            <div className="card-inner">
              <div className="section-title"><CrowIcon size={14} /> Tin Tức Crypto · Dark Intel</div>
              {NEWS_DATA.map((news, i) => (
                <div key={i} className="news-item">
                  <div className="news-dot" />
                  <div>
                    <p className="news-title">{news.title}</p>
                    <div className="news-meta">
                      {news.time}&nbsp;·&nbsp;
                      {news.tags.map(t => (
                        <span key={t} className="tag tag-red" style={{ fontSize: "0.5rem" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <button className="ai-btn"
                onClick={() => generateAI("news",
                  "Tóm tắt 5 tin tức crypto quan trọng nhất hiện tại bằng tiếng Việt. Với mỗi tin: tiêu đề ngắn + tác động ngắn hạn (1-3 ngày) + tác động dài hạn (1-3 tháng). Phong cách Itachi: súc tích, sắc bén, đáng sợ như Crow Genjutsu. 180-220 từ."
                )} disabled={aiLoading.news}>
                {aiLoading.news ? "⏳ Kích hoạt Crow Genjutsu..." : "🐦 Tóm Tắt Tin Tức · AI Intel"}
              </button>
              {aiContent.news && <div className="ai-response">{aiContent.news}</div>}
            </div>
          </section>

          {/* ── 5. Trade Recommendation ── */}
          <TradeSection prices={prices} onGenerateAI={generateAI} aiContent={aiContent} aiLoading={aiLoading} />

          {/* ── 6. Chiêm Tinh Tổng Quát ── */}
          <section className="card section-full">
            <div className="card-inner">
              <div className="section-title">🔮 Chiêm Tinh Tổng Quát · Celestial Intelligence</div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "20px", marginBottom: "16px" }}>
                {/* Cột trái: vị trí hành tinh */}
                <div>
                  <div className="analysis-label" style={{ marginBottom: "10px" }}>⭐ VỊ TRÍ HÀNH TINH HIỆN TẠI</div>
                  {PLANETS.map((p, i) => (
                    <div key={i} className="planet-row">
                      <div className="planet-symbol">{p.symbol}</div>
                      <div>
                        <div className="planet-name">{p.name}</div>
                        <div className="planet-pos">Trong {p.pos}</div>
                      </div>
                      <div style={{ flex: 1, marginLeft: "8px" }}>
                        <div className="planet-effect">{p.effect}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cột phải: nhận định */}
                <div>
                  <div className="analysis-label" style={{ marginBottom: "10px" }}>📜 NHẬN ĐỊNH THÁNG NÀY</div>
                  <div className="analysis-block">
                    <div className="analysis-label">🌑 Năng Lượng Tổng Thể</div>
                    <p className="analysis-text">
                      Jupiter-Mars trine — cấu hình thiên văn cực thuận lợi cho tài chính và đầu tư. Người sinh
                      tháng 10-11 (Thiên Bình, Bọ Cạp) có trực giác thị trường sắc bén đặc biệt trong giai đoạn này.
                      Năng lượng tổng thể: <strong style={{ color: "#ff6600" }}>BULLISH MẠNH</strong>.
                    </p>
                  </div>
                  <div className="analysis-block">
                    <div className="analysis-label">⚡ Cảnh Báo Saturn Square</div>
                    <p className="analysis-text">
                      Sao Thổ vuông góc Sao Diêm Vương — trong lịch sử thường báo hiệu correction 15-25% trước khi
                      bùng nổ mới. Không dùng đòn bẩy quá 5x. Quản lý rủi ro là vũ khí tối thượng của Itachi.
                    </p>
                  </div>
                  <div className="analysis-block">
                    <div className="analysis-label">✨ Lịch Giao Dịch Tối Ưu</div>
                    <p className="analysis-text">
                      <strong style={{ color: "#c9a84c" }}>Ngày tốt:</strong> Thứ 3 (Mars) và Thứ 5 (Jupiter).<br />
                      <strong style={{ color: "#ff6600" }}>Giờ vàng:</strong> 09:00-11:00 và 15:00-17:00 giờ VN.<br />
                      <strong style={{ color: "#cc0000" }}>Tránh:</strong> Thứ 7, Chủ Nhật và 2h quanh trăng non.
                    </p>
                  </div>
                  <div className="tag-row">
                    <span className="tag tag-ember">JUPITER TRINE MARS</span>
                    <span className="tag tag-gold">SONG TỬ SEASON</span>
                    <span className="tag tag-red">SATURN SQUARE</span>
                    <span className="tag tag-mist">TRĂNG TRÒN THÁNG NÀY</span>
                  </div>
                </div>
              </div>

              <div className="blood-divider" />

              <button className="ai-btn"
                onClick={() => generateAI("astro",
                  "Phân tích chiêm tinh học toàn diện cho thị trường crypto tháng này bằng tiếng Việt. Bao gồm: (1) Tổng quan các hành tinh chính đang ở đâu và tác động lên BTC/ETH/Pi, (2) Chu kỳ Mặt Trăng và ý nghĩa với trader, (3) Ngày tốt/xấu cụ thể trong tuần tới, (4) Lời tiên tri của Itachi Uchiha về thị trường dựa trên chiêm tinh. Phong cách: huyền bí, thơ ca, đáng sợ — như Itachi đang nhìn vào tương lai qua đôi mắt Mangekyō Sharingan. 280-320 từ tiếng Việt."
                )} disabled={aiLoading.astro}>
                {aiLoading.astro ? "⏳ Mở Mangekyō Sharingan..." : "👁 Triệu Hồi AI Chiêm Tinh · Mangekyō Vision"}
              </button>
              {aiContent.astro && <div className="ai-response">{aiContent.astro}</div>}
            </div>
          </section>

        </main>

        {/* ════ FOOTER ════ */}
        <footer style={S.footer}>
          <div style={{ animation: "sharingan-pulse 3s infinite", display: "inline-block" }}>
            <SharinganEye size={26} />
          </div>
          <div style={{ marginTop: "12px" }}>UCHIHA RESEARCH · ITACHI CRYPTO INTELLIGENCE DASHBOARD</div>
          <div style={{ marginTop: "5px", fontStyle: "italic", color: "#c8a88244" }}>
            "Những người có sức mạnh thật sự không cần phải nói về nó." — Itachi Uchiha
          </div>
          <div style={{ marginTop: "6px", color: "#c8a88222", letterSpacing: "0.2em" }}>
            Built with Next.js 15 · CoinGecko API · Claude AI
          </div>
          <div style={{ marginTop: "10px", fontSize: "0.5rem", opacity: 0.35, letterSpacing: "0.15em" }}>
            ⚠ KHÔNG PHẢI LỜI KHUYÊN TÀI CHÍNH · TỰ CHỊU TRÁCH NHIỆM GIAO DỊCH · DYOR · NFA
          </div>
        </footer>
      </div>
    </>
  );
}
