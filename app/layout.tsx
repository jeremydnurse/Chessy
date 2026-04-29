import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Chess vs Claude',
  description: 'Play Stockfish in the browser. Drop a screenshot to start from any position.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="flex items-center gap-4 px-4 py-2 border-b bg-white text-sm">
          <span className="font-bold text-lg mr-2">Chessy</span>
          <Link href="/" className="hover:text-blue-600">Play</Link>
          <Link href="/learn" className="hover:text-blue-600">Learn</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
