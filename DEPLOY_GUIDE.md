# 🔴 UCHIHA RESEARCH — Hướng Dẫn Deploy Vercel

> *"Những người biết cách deploy, sẽ thống trị bóng tối." — Itachi Uchiha (có thể)*

---

## 📁 Cấu Trúc Thư Mục

```
uchiha-research/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── claude/
│   │   │       └── route.ts       ← API proxy cho Anthropic (bảo vệ API key)
│   │   ├── globals.css            ← Toàn bộ CSS theme Itachi
│   │   ├── layout.tsx             ← Root layout Next.js
│   │   └── page.tsx               ← Entry point
│   ├── components/
│   │   ├── Dashboard.tsx          ← Main component (layout + sections 1-6)
│   │   ├── PriceSection.tsx       ← Giá BTC, ETH, Pi
│   │   ├── SharinganEye.tsx       ← SVG Sharingan
│   │   └── TradeSection.tsx       ← Lệnh scalp + swing + chiêm tinh
│   └── lib/
│       └── data.ts                ← Data tĩnh, types, formatters
├── .env.example                   ← Mẫu env (copy → .env.local)
├── .gitignore
├── next.config.js
├── package.json
└── tsconfig.json
```

---

## 🚀 Deploy Lên Vercel — 3 Cách

### Cách 1: Deploy Nhanh Qua Vercel CLI (Khuyên Dùng)

```bash
# Bước 1: Cài Node.js 18+ nếu chưa có
# https://nodejs.org/

# Bước 2: Clone hoặc copy toàn bộ thư mục uchiha-research/

# Bước 3: Vào thư mục dự án
cd uchiha-research

# Bước 4: Cài dependencies
npm install

# Bước 5: Test local trước
cp .env.example .env.local
# Mở .env.local và điền API key thật:
# ANTHROPIC_API_KEY=sk-ant-...

npm run dev
# Mở http://localhost:3000 — Dashboard sẽ chạy!

# Bước 6: Cài Vercel CLI
npm i -g vercel

# Bước 7: Login Vercel
vercel login

# Bước 8: Deploy!
vercel --prod
# Vercel tự detect Next.js, tự cấu hình build
```

---

### Cách 2: Deploy Qua GitHub + Vercel Dashboard

```bash
# Bước 1: Push code lên GitHub
git init
git add .
git commit -m "feat: Uchiha Research Crypto Dashboard"
git remote add origin https://github.com/YOUR_USERNAME/uchiha-research.git
git push -u origin main
```

Sau đó:
1. Vào **https://vercel.com** → **New Project**
2. Import repository từ GitHub
3. Vercel tự detect **Next.js** → click **Deploy**
4. Sau deploy xong → vào **Settings** → **Environment Variables**
5. Thêm: `ANTHROPIC_API_KEY` = `sk-ant-xxxxxxxx`
6. **Redeploy** để apply env var

---

### Cách 3: Drag & Drop (Nhanh nhất)

```bash
# Build production bundle
npm install
npm run build

# Kéo thả thư mục .next/ lên vercel.com/new
```

---

## 🔑 Cấu Hình API Key

### Lấy Anthropic API Key:
1. Đăng ký tại **https://console.anthropic.com/**
2. Vào **API Keys** → **Create Key**
3. Copy key dạng: `sk-ant-api03-xxxxxxxxx`

### Thêm vào Vercel:
```
Vercel Dashboard
  → Your Project
  → Settings
  → Environment Variables
  → Add New:
      Name:  ANTHROPIC_API_KEY
      Value: sk-ant-api03-xxxxxxxxx
      Environment: Production, Preview, Development (chọn cả 3)
  → Save
  → Deployments → Redeploy
```

---

## ⚙️ Chỉnh Giá Pi Network

Mở file `src/lib/data.ts`, tìm dòng:

```typescript
export const PI_MOCK_PRICE  = 1.42;   // ← Đổi giá ở đây
export const PI_MOCK_CHANGE = 5.21;   // ← Đổi % thay đổi 24h
```

Save → Vercel tự động redeploy (nếu kết nối GitHub).

---

## 🛠 Lệnh Hữu Ích

```bash
npm run dev      # Chạy development mode (http://localhost:3000)
npm run build    # Build production
npm run start    # Chạy production build local
npm run lint     # Kiểm tra lỗi TypeScript/ESLint
```

---

## 🐛 Xử Lý Lỗi Thường Gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| Giá hiện `---` | CoinGecko rate limit | Tự động dùng fallback mock. Chờ 1 phút. |
| AI button không hoạt động | Thiếu API key | Kiểm tra `ANTHROPIC_API_KEY` trong Vercel env |
| Build fail TypeScript | Lỗi type | Chạy `npm run lint` để xem chi tiết |
| Font không load | Chặn Google Fonts | Sử dụng font local hoặc unblock CDN |

---

## 🌐 Domain Tùy Chỉnh (Optional)

```
Vercel Dashboard → Your Project → Settings → Domains
→ Add Domain: uchiha-research.com (hoặc bất kỳ domain bạn có)
→ Cấu hình DNS theo hướng dẫn của Vercel
```

---

## 📊 Tính Năng Dashboard

| Section | Mô Tả | Data Source |
|---------|-------|-------------|
| Giá Coins | BTC, ETH real-time + Pi mock | CoinGecko API (free) |
| Dòng Tiền | Cashflow bars + AI phân tích | Static + Claude AI |
| Macro | Trump/Musk/FED/SEC/War | Static + Claude AI |
| Tin Tức | 5 tin crypto nóng | Static + Claude AI |
| Trade Scalp | BTC/ETH scalping signals | Tính từ giá live |
| Trade Swing | BTC/ETH/Pi swing signals | Tính từ giá live |
| Chiêm Tinh | Hành tinh + ngày tốt/xấu | Static + Claude AI |

---

*Được xây dựng bởi Itachi Uchiha — người hiểu rằng kiến thức thật sự là vũ khí mạnh nhất.*

⚠️ **DISCLAIMER**: Đây là công cụ nghiên cứu và giải trí. Không phải lời khuyên tài chính. DYOR.
"Update deploy" 
