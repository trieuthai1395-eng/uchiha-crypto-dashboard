// ── Types ───────────────────────────────────────────────────────────────────────
export interface PriceData { price: number | null; change: number | null; mcap: number | null; }
export interface Prices    { btc: PriceData; eth: PriceData; }

// ── Pi mock (chỉnh tại đây) ─────────────────────────────────────────────────────
export const PI_MOCK_PRICE  = 1.42;
export const PI_MOCK_CHANGE = 5.21;

// ── Formatters ──────────────────────────────────────────────────────────────────
export const formatPrice  = (n: number | null) =>
  n ? `$${Number(n).toLocaleString("en-US", { maximumFractionDigits: 0 })}` : "---";
export const formatMcap   = (n: number | null) =>
  n ? `$${(n / 1e9).toFixed(1)}B` : "---";
export const formatChange = (n: number | null) =>
  n !== null ? `${n > 0 ? "+" : ""}${Number(n).toFixed(2)}%` : "---";

// ── Cashflow data ───────────────────────────────────────────────────────────────
export const CASHFLOW_DATA = [
  { label: "BTC ETF Inflow",        pct: 78, color: "#ff6600" },
  { label: "Stablecoin Supply",      pct: 65, color: "#c9a84c" },
  { label: "DeFi TVL",               pct: 52, color: "#cc0000" },
  { label: "VN-Index vs Crypto",     pct: 40, color: "#888888" },
  { label: "Smart Money Signal",     pct: 85, color: "#ff4400" },
] as const;

// ── Macro data ──────────────────────────────────────────────────────────────────
export const MACRO_DATA = [
  { topic: "TRUMP",          text: "Ký lệnh hành pháp ủng hộ Bitcoin dự trữ quốc gia. Chính sách thuế quan mới với TQ có thể gây biến động mạnh cho crypto ngắn hạn." },
  { topic: "ELON MUSK",      text: "Tiếp tục ủng hộ DOGE mạnh mẽ. Tesla tái chấp nhận BTC. X (Twitter) đang tích hợp ví điện tử, catalyst lớn cho crypto mainstream." },
  { topic: "FED / LÃI SUẤT", text: "Fed giữ lãi suất 5.25-5.5%. Thị trường kỳ vọng cắt giảm cuối 2025. Dollar mạnh tạo áp lực lên BTC ngắn hạn — cơ hội mua tốt." },
  { topic: "SEC",             text: "ETF Bitcoin spot đã được phê duyệt lịch sử. SEC tiếp tục điều tra sàn giao dịch. Quy định stablecoin đang được soạn thảo tại Quốc Hội." },
  { topic: "ĐỊA CHÍNH TRỊ",  text: "Căng thẳng Nga-Ukraine & Trung Đông leo thang. Lịch sử cho thấy BTC là tài sản trú ẩn — dòng tiền chạy vào gold và BTC khi chiến tranh." },
  { topic: "QANON / BÓNG TỐI", text: "Thuyết âm mưu tài chính: các ngân hàng trung ương phối hợp in tiền ngầm. Crypto là hàng rào chống lại hệ thống fiat sụp đổ dần." },
] as const;

// ── News data ───────────────────────────────────────────────────────────────────
export const NEWS_DATA = [
  { title: "Bitcoin phá vỡ kháng cự $95K — whale tích lũy mạnh trước chu kỳ halving tiếp theo 2028", time: "2 giờ trước",  tags: ["BTC","WHALE"] },
  { title: "Ethereum Layer 2 đạt kỷ lục giao dịch — phí gas giảm 90% so với mainnet, adoption bùng nổ", time: "4 giờ trước",  tags: ["ETH","L2"] },
  { title: "Pi Network hé lộ roadmap mainnet mới — cộng đồng 47 triệu người phấn khích toàn cầu",       time: "6 giờ trước",  tags: ["PI","NEWS"] },
  { title: "BlackRock nắm giữ 310,000 BTC qua ETF — tín hiệu institutional adoption lịch sử",           time: "8 giờ trước",  tags: ["BTC","ETF"] },
  { title: "Stablecoin supply chạm $200 tỷ — tiền mặt khổng lồ đang chờ bơm vào thị trường",            time: "10 giờ trước", tags: ["STABLE","BULL"] },
] as const;

// ── Planetary data ──────────────────────────────────────────────────────────────
export const PLANETS = [
  { symbol: "☀️", name: "MẶT TRỜI",         pos: "Song Tử",    effect: "Kích hoạt trao đổi & giao dịch ngắn hạn. Năng lượng giao tiếp mạnh." },
  { symbol: "🌙", name: "MẶT TRĂNG",        pos: "Ma Kết",     effect: "Cảm xúc thị trường ổn định. Tập trung vào nền tảng dài hạn." },
  { symbol: "♂",  name: "SÁO TINH (Mars)",  pos: "Bạch Dương", effect: "Xung lực mua bán cực cao. Cẩn thận FOMO & quyết định bốc đồng." },
  { symbol: "♃",  name: "MỘC TINH (Jupiter)",pos: "Kim Ngưu",  effect: "Mở rộng tài chính. Chu kỳ tích lũy dài hạn được vũ trụ ủng hộ." },
  { symbol: "♄",  name: "THỔ TINH (Saturn)", pos: "Song Ngư",  effect: "Thử thách & kiểm tra. Đòn bẩy cao = nguy hiểm. Quản lý rủi ro." },
  { symbol: "♅",  name: "THIÊN VƯƠNG (Uranus)",pos: "Kim Ngưu",effect: "Đột phá công nghệ bất ngờ. ETH và Layer-2 hưởng lợi trực tiếp." },
  { symbol: "♇",  name: "DIÊM VƯƠNG (Pluto)", pos: "Ma Kết",   effect: "Biến đổi cấu trúc tài chính toàn cầu. BTC là kẻ thụ hưởng cuối." },
] as const;
