'use client'

import Link from "next/link"

export default function Home() {
  return (
    <main
      className="
        min-h-screen
        flex items-center justify-center
        bg-gradient-to-br
        from-slate-200 via-blue-100 to-slate-300
        dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a]
        transition-colors duration-500
        px-6
      "
    >
      <div
        className="
          text-center
          bg-white/80 dark:bg-[#1e293b]/80
          backdrop-blur-xl
          p-12
          rounded-3xl
          shadow-2xl
          border border-blue-200 dark:border-slate-700
          max-w-2xl w-full
        "
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 dark:text-blue-300">
          Monitoring & Control System
        </h1>

        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Sistem monitoring kualitas air tambak udang dengan implementasi sensor virtual Dissolved Oxygen menggunakan
          pendekatan regresi linear
        </p>

        <div className="mt-10">
          <Link
            href="/menu/profile"
            className="
              inline-block
              bg-blue-600 hover:bg-blue-700
              text-white
              px-8 py-4
              rounded-xl
              font-semibold
              shadow-lg
              transition-all
              hover:scale-105
            "
          >
            Get Started
          </Link>
        </div>
      </div>
    </main>
  )
}