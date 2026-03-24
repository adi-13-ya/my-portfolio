import type { Metadata } from "next";
import "./globals.css";
import CursorWrapper from "./components/effects/CursorWrapper";


export const metadata: Metadata = {
  title: "Aditya Gujar | Portfolio from the Upside Down",
  description: "Results-driven technologist ranked among the top 5 in IT at VIT, skilled in data structures, algorithms, and machine learning. Explore my projects, skills, and experience in a Stranger Things themed portfolio.",
  keywords: ["Aditya Gujar", "Portfolio", "Developer", "AI", "Machine Learning", "Deep Learning", "Web Development", "VIT"],
  authors: [{ name: "Aditya Gujar" }],
  openGraph: {
    title: "Aditya Gujar | Portfolio from the Upside Down",
    description: "Explore the portfolio of Aditya Gujar — AI enthusiast, developer, and builder of intelligent systems.",
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
        <CursorWrapper />
        {children}
      </body>
    </html>
  );
}
