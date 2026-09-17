import type { Metadata } from "next"
import "./globals.css"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[#10131a]">{children}</body>
    </html>
  )
}
