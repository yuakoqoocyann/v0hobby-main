import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Link from "next/link"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <Suspense fallback={<div>Loading...</div>}>
          <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="max-w-4xl mx-auto px-6 py-3">
              <div className="flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-700">
                  趣味コミュニティ
                </Link>
                <div className="flex items-center gap-4">
                  <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                    ホーム
                  </Link>
                  <Link
                    href="/profile"
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    プロフィール
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </Suspense>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
