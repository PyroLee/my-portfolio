import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "../../components/ThemeProvider/ThemeProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { getDictionary } from "../dictionaries";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    keywords: dict.metadata.keywords,
    authors: [{ name: "Kendrick Li" }],
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      type: "website",
    },
  };
}

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default async function RootLayout({ children, params }) {
  const { lang } = await params;

  return (
    <html
      lang={lang === "zh" ? "zh-CN" : "en"}
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="light">
          {children}
        </ThemeProvider>
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
