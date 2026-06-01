import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UCHIHA RESEARCH · Itachi Crypto Dashboard",
  description: "Crypto Intelligence Dashboard — BTC, ETH, Pi Network. Giá thời gian thực, phân tích macro, tín hiệu giao dịch có chiêm tinh học.",
  keywords: ["crypto", "bitcoin", "ethereum", "pi network", "dashboard", "chiêm tinh", "giao dịch"],
  openGraph: {
    title: "UCHIHA RESEARCH · Itachi Crypto Dashboard",
    description: "Những đôi mắt Sharingan thấu hiểu thị trường tài chính",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
