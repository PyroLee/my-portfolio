import { Inter } from "next/font/google";
import "./globals.css";
/* No SmoothScroll import needed */

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "【你的名字】简历 — 让每一平方米仓储更高效",
  description:
    "WES 系统实施工程师。主导从需求调研到交付落地的全链路闭环，助力苏州汇川等大型项目成功上线，以技术重塑仓储效率。",
  keywords: ["WMS", "WES", "实施工程师", "智慧物流", "仓储自动化", "个人简历"],
  authors: [{ name: "你的名字" }],
  openGraph: {
    title: "【你的名字】的简历 — 让每一平方米仓储更高效",
    description:
      "WES 系统实施工程师。主导从需求调研到交付落地的全链路闭环，以技术重塑仓储效率。",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      {/* ignore extensions modifying body class to prevent hydration mismatch */}
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
