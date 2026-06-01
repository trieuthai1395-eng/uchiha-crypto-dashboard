"use client";

import { useState } from "react";
import { Prices, formatPrice, PI_MOCK_PRICE } from "@/lib/data";

interface TradeSectionProps {
  prices: Prices;
  onGenerateAI: (key: string, prompt: string) => void;
  aiContent: Record<string, string>;
  aiLoading: Record<string, boolean>;
}

export default function TradeSection({ prices, onGenerateAI, aiContent, aiLoading }: TradeSectionProps) {
  const [activeTab, setActiveTab] = useState<"scalp" | "swing">("scalp");

  const bp = prices.btc.price;
  const ep = prices.eth.price;

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

        {/* ── SCALP ── */}
        {activeTab === "scalp" && (
          <div>
            {/* BTC Scalp */}
            <div className="trade-card">
              <div className="trade-type scalp">⚡ SCALPING · CÁ LIA THIA</div>
              <div className="trade-row">
                <div className="trade-pair">BTC / USDT</div>
                <div className="trade-dir-long">LONG</div>
              </div>
              <div className="trade-levels">
                <div className="level-box">
                  <span className="level-label">VÀO LỆNH</span>
                  <span className="level-val entry">{formatPrice(bp ? bp * 0.998 : 93800)}</span>
                </div>
                <div className="level-box">
                  <span className="level-label">CHỐT LỜI</span>
                  <span className="level-val tp">{formatPrice(bp ? bp * 1.015 : 95650)}</span>
                </div>
                <div className="level-box">
                  <span className="level-label">CẮT LỖ</span>
                  <span className="level-val sl">{formatPrice(bp ? bp * 0.991 : 93380)}</span>
                </div>
              </div>
              <div className="trade-meta">Đòn bẩy: 3-5x · Khung thời gian: 1H · R:R = 1:2.5</div>
              <div className="astro-block">
                <div className="astro-label">🔮 Chiêm Tinh Học · Scalp BTC</div>
                <div className="astro-text">
                  Mặt Trăng đang quá cảnh Thiên Bình — năng lượng cân bằng tạm thời trước khi phá vỡ. Mars trong
                  Bạch Dương kích hoạt xung lực ngắn hạn cực mạnh. Cửa sổ vàng: 14:00–18:00 giờ VN khi Mars đạt
                  đỉnh chu kỳ. Tránh 2 giờ quanh trăng non — chakra thị trường biến động khó lường.
                </div>
              </div>
            </div>

            {/* ETH Scalp */}
            <div className="trade-card">
              <div className="trade-type scalp">⚡ SCALPING · CÁ LIA THIA</div>
              <div className="trade-row">
                <div className="trade-pair">ETH / USDT</div>
                <div className="trade-dir-long">LONG</div>
              </div>
              <div className="trade-levels">
                <div className="level-box">
                  <span className="level-label">VÀO LỆNH</span>
                  <span className="level-val entry">{formatPrice(ep ? ep * 0.997 : 3529)}</span>
                </div>
                <div className="level-box">
                  <span className="level-label">CHỐT LỜI</span>
                  <span className="level-val tp">{formatPrice(ep ? ep * 1.018 : 3604)}</span>
                </div>
                <div className="level-box">
                  <span className="level-label">CẮT LỖ</span>
                  <span className="level-val sl">{formatPrice(ep ? ep * 0.993 : 3516)}</span>
                </div>
              </div>
              <div className="trade-meta">Đòn bẩy: 2-4x · Khung thời gian: 15M-1H · R:R = 1:3</div>
              <div className="astro-block">
                <div className="astro-label">🔮 Chiêm Tinh Học · Scalp ETH</div>
                <div className="astro-text">
                  Sao Thủy thuận hành — tốc độ giao tiếp và phản ứng thị trường tăng mạnh, lý tưởng cho ETH scalp.
                  Jupiter tạo góc tích cực với Venus: dòng tiền tổ chức vào ETH tăng trong 48-72h tới.
                  Tránh 3-4 ngày đầu tháng âm lịch — thủy triều năng lượng chạm đáy.
                </div>
              </div>
            </div>

            <button
              className="ai-btn"
              onClick={() => onGenerateAI("scalp",
                `Hãy phân tích kỹ thuật chi tiết cho lệnh scalping BTC và ETH bằng tiếng Việt với phong cách Itachi Uchiha — huyền bí, lạnh lùng, chính xác như Sharingan. Giá BTC hiện tại: ${formatPrice(bp)}, ETH: ${formatPrice(ep)}. Phân tích: (1) Setup vào lệnh & vùng thanh khoản, (2) RSI + MACD + Volume tín hiệu, (3) Kháng cự/hỗ trợ chính, (4) Chiêm tinh học: hành tinh nào đang ảnh hưởng, giờ giao dịch tốt nhất hôm nay. 200-250 từ.`
              )}
              disabled={aiLoading.scalp}
            >
              {aiLoading.scalp ? "⏳ Mắt Sharingan đang phân tích..." : "👁 Phân Tích AI · Scalp Signal"}
            </button>
            {aiContent.scalp && <div className="ai-response">{aiContent.scalp}</div>}
          </div>
        )}

        {/* ── SWING ── */}
        {activeTab === "swing" && (
          <div>
            {/* BTC Swing */}
            <div className="trade-card">
              <div className="trade-type swing">🌙 SWING TRADE · NUÔI THEO TUẦN</div>
              <div className="trade-row">
                <div className="trade-pair">BTC / USDT</div>
                <div className="trade-dir-long">LONG</div>
              </div>
              <div className="trade-levels">
                <div className="level-box">
                  <span className="level-label">MUA VÀO</span>
                  <span className="level-val entry">{formatPrice(bp ? bp * 0.97 : 91200)}</span>
                </div>
                <div className="level-box">
                  <span className="level-label">MỤC TIÊU</span>
                  <span className="level-val tp">{formatPrice(bp ? bp * 1.12 : 105600)}</span>
                </div>
                <div className="level-box">
                  <span className="level-label">DỪNG LỖ</span>
                  <span className="level-val sl">{formatPrice(bp ? bp * 0.93 : 87650)}</span>
                </div>
              </div>
              <div className="trade-meta">Giữ: 1-3 tuần · Spot hoặc x2 · R:R = 1:4</div>
              <div className="astro-block">
                <div className="astro-label">🔮 Chiêm Tinh Học · Swing BTC</div>
                <div className="astro-text">
                  Jupiter hội tụ Mặt Trời tháng tới — chu kỳ bùng nổ tài chính vĩ đại. Lịch sử ghi nhận BTC tăng
                  trung bình 23% trong giai đoạn Jupiter-Sun conjunction. Trăng tròn ngày 15 âm sẽ là đỉnh cảm xúc
                  thị trường — chốt lời một phần. Năng lượng Scorpio cai quản tài chính sâu thẳm đang hoạt động
                  mạnh. Mua tích lũy khi BTC test EMA 21D.
                </div>
              </div>
            </div>

            {/* ETH Swing */}
            <div className="trade-card">
              <div className="trade-type swing">🌙 SWING TRADE · NUÔI THEO TUẦN</div>
              <div className="trade-row">
                <div className="trade-pair">ETH / USDT</div>
                <div className="trade-dir-long">LONG</div>
              </div>
              <div className="trade-levels">
                <div className="level-box">
                  <span className="level-label">MUA VÀO</span>
                  <span className="level-val entry">{formatPrice(ep ? ep * 0.96 : 3398)}</span>
                </div>
                <div className="level-box">
                  <span className="level-label">MỤC TIÊU</span>
                  <span className="level-val tp">{formatPrice(ep ? ep * 1.15 : 4071)}</span>
                </div>
                <div className="level-box">
                  <span className="level-label">DỪNG LỖ</span>
                  <span className="level-val sl">{formatPrice(ep ? ep * 0.925 : 3274)}</span>
                </div>
              </div>
              <div className="trade-meta">Giữ: 2-4 tuần · Spot · R:R = 1:3.8</div>
              <div className="astro-block">
                <div className="astro-label">🔮 Chiêm Tinh Học · Swing ETH</div>
                <div className="astro-text">
                  ETH được bảo hộ bởi cung Song Tử và Thiên Bình — những cung của công nghệ và đổi mới. Venus tạo
                  góc 120° với Uranus (hành tinh công nghệ): catalyst bất ngờ sắp xuất hiện. EIP upgrade và Layer-2
                  adoption sẽ được kích hoạt khi Sao Thủy rời nghịch hành vào cuối tháng. Đây là cửa sổ tích lũy
                  của Itachi.
                </div>
              </div>
            </div>

            {/* PI Swing */}
            <div className="trade-card">
              <div className="trade-type swing">🌙 SWING TRADE · NUÔI THEO TUẦN</div>
              <div className="trade-row">
                <div className="trade-pair">PI NETWORK</div>
                <div className="trade-dir-accumulate">TÍCH LŨY</div>
              </div>
              <div className="trade-levels">
                <div className="level-box">
                  <span className="level-label">MUA VÀO</span>
                  <span className="level-val entry">$1.20 – 1.40</span>
                </div>
                <div className="level-box">
                  <span className="level-label">MỤC TIÊU 1</span>
                  <span className="level-val tp">$2.50</span>
                </div>
                <div className="level-box">
                  <span className="level-label">MỤC TIÊU 2</span>
                  <span className="level-val tp">$5.00</span>
                </div>
              </div>
              <div className="trade-meta" style={{ color: "#c9a84c88" }}>
                ⚠ Rủi ro cao · Chỉ dùng vốn dư · Chờ tin mainnet chính thức
              </div>
              <div className="astro-block">
                <div className="astro-label">🔮 Chiêm Tinh Học · Pi Network</div>
                <div className="astro-text">
                  Pi mang năng lượng của Neptune — hành tinh ảo tưởng và tiềm năng vô cực. Khi Neptune hòa hợp
                  Sao Mộc trong Q3 2025, những dự án "ngủ đông" sẽ thức dậy mạnh mẽ. Mainnet launch sẽ kích hoạt
                  luồng Pluto — biến đổi hoàn toàn định giá. Chòm Song Ngư bảo hộ PI. Theo dõi ngày 11 & 22
                  hàng tháng — cửa sổ năng lượng Pi đạt đỉnh.
                </div>
              </div>
            </div>

            <button
              className="ai-btn"
              onClick={() => onGenerateAI("swing",
                `Phân tích swing trade cho BTC, ETH và Pi Network bằng tiếng Việt, phong cách huyền bí như Itachi Uchiha đang nhìn vào tương lai qua Sharingan. Giá BTC: ${formatPrice(bp)}, ETH: ${formatPrice(ep)}, Pi: $${PI_MOCK_PRICE}. Gồm: (1) Chu kỳ thị trường hiện tại, (2) On-chain signals mạnh nhất, (3) Phân tích Daily/Weekly chart, (4) Chiêm tinh học: các hành tinh chính tháng này tác động thế nào, ngày nào trong tuần tới nên mua. 220-280 từ.`
              )}
              disabled={aiLoading.swing}
            >
              {aiLoading.swing ? "⏳ Triệu hồi Izanagi..." : "🌙 Phân Tích AI · Swing Signal"}
            </button>
            {aiContent.swing && <div className="ai-response">{aiContent.swing}</div>}
          </div>
        )}
      </div>
    </section>
  );
}
