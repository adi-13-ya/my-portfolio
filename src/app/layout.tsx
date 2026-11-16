import type { Metadata } from "next";
import "./globals.css";
import CursorWrapper from "./components/effects/CursorWrapper";
import ThemeProvider from "./components/ThemeContext";


export const metadata: Metadata = {
  title: "Aditya Gujar | AI Security Researcher & Builder",
  description: "Portfolio of Aditya Gujar — B.Tech IT student at VIT (CGPA 9.52, top 2% of branch), researcher in LLM security and multilingual prompt-injection defense, patent co-inventor, and builder of intelligent systems. Styled after Stranger Things and Locke & Key.",
  keywords: ["Aditya Gujar", "Portfolio", "AI Security", "LLM Security", "Prompt Injection", "Machine Learning", "Post-Quantum Cryptography", "VIT", "Research"],
  authors: [{ name: "Aditya Gujar" }],
  openGraph: {
    title: "Aditya Gujar | AI Security Researcher & Builder",
    description: "Explore the portfolio of Aditya Gujar — LLM security researcher, patent co-inventor, and builder of intelligent systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ThemeProvider>
          <CursorWrapper />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
