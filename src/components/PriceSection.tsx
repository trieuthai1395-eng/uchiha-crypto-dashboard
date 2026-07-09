"use client";

import { Prices } from "@/lib/data";

interface PriceSectionProps {
  prices: Prices;
  loading: boolean;
  lastUpdate: string;
}

export default function PriceSection({ prices, loading, lastUpdate }: PriceSectionProps) {
  return (
    <section className="card section-full">
      <div className="card-inner">
        <div className="section-title">
          <span>👁</span>
          Giám Sát Thị Trường · Live Prices
          {!loading && lastUpdate && (
            <span className="live-badge" style={{ marginLeft: "auto" }}>
              <span className="live-dot" />
              LIVE · {lastUpdate}
            </span>
          )}
        </div>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner-dot" />
            <div className="spinner-dot" />
            <div className="spinner-dot" />
          </div>
        ) : (
          <div className="price-cards-row">
            {/* BTC */}
            <div className="price-card">
              <div className="rune-bg">₿</div>
              <div className="price-label">BITCOIN</div>
              <div className="price-coin">BTC / USD</div>
              <div className="price-usd">{formatPrice(prices.btc.price)}</div>
              <div className={prices.btc.change !== null && prices.btc.change >= 0 ? "price-change-pos" : "price-change-neg"}>
                {formatChange(prices.btc.change)} (24h)
              </div>
              <div className="price-mcap">Market Cap: {formatMcap(prices.btc.mcap)}</div>
              <div className="corner-mark">SHARINGAN · BTC</div>
              <span className="live-badge" style={{ marginTop: "6px", display: "flex" }}>
                <span className="live-dot" />CoinGecko Live
              </span>
            </div>

            {/* ETH */}
            <div className="price-card">
              <div className="rune-bg">Ξ</div>
              <div className="price-label">ETHEREUM</div>
              <div className="price-coin">ETH / USD</div>
              <div className="price-usd">{formatPrice(prices.eth.price)}</div>
              <div className={prices.eth.change !== null && prices.eth.change >= 0 ? "price-change-pos" : "price-change-neg"}>
                {formatChange(prices.eth.change)} (24h)
              </div>
              <div className="price-mcap">Market Cap: {formatMcap(prices.eth.mcap)}</div>
              <div className="corner-mark">AMATERASU · ETH</div>
              <span className="live-badge" style={{ marginTop: "6px", display: "flex" }}>
                <span className="live-dot" />CoinGecko Live
              </span>
            </div>

            {/* PI */}
            <div className="price-card">
              <div className="rune-bg">π</div>
              <div className="price-label">PI NETWORK</div>
              <div className="price-coin">PI / USD</div>
              <div className="price-usd">${PI_MOCK_PRICE.toFixed(2)}</div>
              <div className="price-change-pos">+{PI_MOCK_CHANGE}% (24h)</div>
              <div className="price-mcap">Ước tính · Mainnet chờ phê duyệt</div>
              <div className="corner-mark">SUSANOO · PI</div>
              <span className="mock-badge" style={{ marginTop: "6px", display: "flex" }}>
                ⚠ Giá Tham Khảo Mock
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
