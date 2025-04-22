import type React from "react"
import type { Metadata } from "next"
import { Source_Code_Pro } from "next/font/google"
import "./globals.css"

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-source-code-pro",
})

export const metadata: Metadata = {
  title: "Adam Holding | Analyst",
  description: "Personal portfolio of Adam Holding, Analyst and Vibe Developer",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={sourceCodePro.variable}>
      <body>{children}</body>
    </html>
  )
}

// import './globals.css'