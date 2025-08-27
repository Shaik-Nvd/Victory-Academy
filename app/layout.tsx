import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Victory Academy - Job Oriented Courses & Training Institute",
  description:
    "Learn in-demand skills with hands-on, job-oriented courses at Victory Academy. Get 100% job assistance with 200+ courses in IT, CADD, Digital Marketing, and more. ISO Certified training institute in Bangalore.",
  keywords:
    "Victory Academy, job oriented courses, training institute, IT courses, CADD training, digital marketing, placement assistance, Bangalore, certification courses",
  authors: [{ name: "Victory Academy" }],
  creator: "Victory Academy",
  publisher: "Victory Academy",
  robots: "index, follow",
  openGraph: {
    title: "Victory Academy - Job Oriented Courses & Training Institute",
    description:
      "Learn in-demand skills with hands-on, job-oriented courses. Get 100% job assistance and start your career today.",
    url: "https://victoryacademy.live",
    siteName: "Victory Academy",
    images: [
      {
        url: "/images/victory-logo.png",
        width: 1200,
        height: 630,
        alt: "Victory Academy Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Victory Academy - Job Oriented Courses & Training Institute",
    description:
      "Learn in-demand skills with hands-on, job-oriented courses. Get 100% job assistance and start your career today.",
    images: ["/images/victory-logo.png"],
  },
  icons: {
    icon: [
      { url: "/app/icon.png", type: "image/svg+xml" },
      { url: "/app/icon.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/app/icon.png",
    apple: "/app/icon.png",
  },
  manifest: "/manifest.json",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
