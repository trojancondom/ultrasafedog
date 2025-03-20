"use client"
import { Twitter, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import SafeUploader from "@/components/safe-uploader"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Social buttons at the top */}
      <div className="container mx-auto pt-4 px-4 flex justify-end gap-2">
        <Button
          onClick={() => window.open("https://x.com/UltraSafeDog", "_blank")}
          variant="ghost"
          size="sm"
          className="text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          <Twitter className="w-4 h-4 mr-2" />X
        </Button>

        <Button
          onClick={() => window.open("https://t.me/ULTRASAFEDOG", "_blank")}
          variant="ghost"
          size="sm"
          className="text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          {/* Telegram icon */}
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.05-.2-.06-.06-.16-.04-.23-.02-.1.02-1.62 1.03-4.58 3.03-.43.3-.82.45-1.17.44-.39-.01-1.13-.22-1.68-.4-.68-.23-1.22-.35-1.17-.74.02-.2.3-.4.81-.6 3.15-1.37 5.26-2.27 6.33-2.71 3.02-1.24 3.65-1.46 4.06-1.46.09 0 .29.02.42.12.11.07.18.21.21.33.03.14.02.28.01.41z" />
          </svg>
          Telegram
        </Button>

        <Button
          onClick={() => window.open("https://dexscreener.com", "_blank")}
          variant="ghost"
          size="sm"
          className="text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          <BarChart2 className="w-4 h-4 mr-2" />
          DexScreener
        </Button>
      </div>

      <header className="container mx-auto py-6 px-4 flex flex-col items-center justify-center">
        {/* Replace Next.js Image with standard img tag */}
        <img
          src="/images/USDdog.jpg"
          alt="Ultra Safe Dog Logo"
          width={75}
          height={75}
          className="rounded-full border-2 border-yellow-500 mb-2 h-[75px] w-[75px] object-cover"
        />
        <span className="font-bold text-2xl">Ultra Safe Dog</span>
      </header>

      <main className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-xl text-gray-300">
            Upload your valuable digital assets to store them securely in the Ultra Safe Dog vault.
          </p>
        </div>

        <SafeUploader />
      </main>

      <footer className="container mx-auto py-8 px-4 border-t border-gray-700 mt-12">
        <div className="flex justify-center items-center">
          <p>© 2025 Ultra Safe Dog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

