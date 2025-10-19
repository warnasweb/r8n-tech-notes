
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "R8n — Interactive Infographics",
  description: "Interactive infographics built with Next.js, Tailwind & Framer Motion",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="wm antialiased">{children}</body>
    </html>
  )
}
