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
          Giám Sát Thị Trường · Live Prices
          {!loading && lastUpdate && (
            <span style={{ marginLeft: "auto", color: "#0f0" }}>
              LIVE · {lastUpdate}
            </span>
          )}
        </div>
        {loading ? (
          <div>Đang tải giá...</div>
        ) : (
          <div>
            <div>BTC: ${prices.btc.price} ({prices.btc.change}%)</div>
            <div>ETH: ${prices.eth.price} ({prices.eth.change}%)</div>
          </div>
        )}
      </div>
    </section>
  );
}
